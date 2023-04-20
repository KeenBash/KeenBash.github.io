---
category:
  - Extension
tag:
  - Redis
  - Cache
  - SpringBoot
---

# hmdp-redis

maptobean

beantomap

copybean

copybeanlist

## 短信登录

tomcat sessionid session

保存验证码

发送验证码

校验验证码

### 登录校验

拦截器

```java
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 获取请求携带的session
        HttpSession session = request.getSession();
        // 获取session中的用户
        UserDTO user = (UserDTO) session.getAttribute(SystemConstants.LOGIN_USER_PREFIX);
        // 用户不存在，拦截
        if (user == null){
            // 返回状态，应该统一处理形式
            response.setStatus(401);
            return false;
        }
        // 存在，保存用户信息到ThreadLocal
        // todo: 为什么放ThreadLocal，为了线程内
        UserDtoHolder.saveUser(user);
        // 放行
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 这个在什么时候执行？
        UserDtoHolder.removeUser();
    }
}
```

保存用户信息到ThreadLocal（为什么）类似context为了对象信息共享

### session共享问题

多台tomcat并不共享session存储空间，当请求切换到不同tomcat服务时导致数据丢失问题

解决办法，换用redis

### redis

拦截器加@Component不行？

拦截器链

## 商户查询缓存

### 缓存更新策略

内存淘汰 超时剔除 主动更新

主动更新策略：删除缓存、更新缓存

保证缓存与数据库操作的同时成功或失败

单体事务，分布式tcc

先操作数据库再删除缓存

（延迟双删？）

[LocalDateTime](https://blog.csdn.net/weixin_63326871/article/details/129313018)

```java
@JsonDeserialize(using = LocalDateTimeDeserializer.class)
@JsonSerialize(using = LocalDateTimeSerializer.class)
@JsonIgnore
```

### 缓存穿透

缓存穿透是指客户端请求的数据在缓存和数据库都不存在

缓存空对象，缓存空值到redis，但是如果id都不一样，造成内存消耗，可以设置ttl，但是也会有短期数据不一致

布隆过滤器，查询redis之前加一层，不存在的时候一定不存在，存在的时候可能不存在

```java
/**
 * 缓存穿透
 *
 * @param id 店铺id
 * @return shop
 */
private Shop queryWithPassThrough(Long id) {
    // 从redis查询商铺缓存
    Shop shop;
    try {
        shop = (Shop) redisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
    } catch (ClassCastException e) {
        // 说明存的是空值
        return null;
    }

    // 判断是否存在
    if (shop != null) {
        // redis中有数据直接返回
        return shop;
    }

    // 查数据库
    shop = getById(id);
    // 数据库不存在，返回错误
    if (shop == null) {
        // 空值写入redis
        redisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
        return null;
    }
    // 存在，写入redis
    redisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, shop, CACHE_SHOP_TTL, TimeUnit.MINUTES);
    return shop;
}
```

### 缓存雪崩

缓存雪崩是指同一时段大量的缓存key失效或者redis服务器宕机

分散过期时间，比如加随机值

redis集群

给缓存降级限流策略

添加多级缓存

### 缓存击穿

热点key，被高并发访问并且缓存重建业务较复杂的key突然失效了，大量访问直击数据库

互斥锁，重建线程获取锁，其他线程获取锁失败休眠一会再重试，性能差

逻辑过期，（热点数据永不过期？），值添加expire: xxx，如果发现逻辑时间已过期，获取锁，开新线程完成重建，写入缓存重置逻辑过期时间，自己返回旧数据，其他线程获取锁失败在未完成重建时也返回旧数据，数据一致性问题

![图 1](https://s2.loli.net/2023/03/31/LndB8PIz2aF9V1C.png)  

#### 互斥锁

setnx key不存在才往里面写，key存在无法写，只能set写

也就是 setnx lock 获取锁，del lock 释放锁，防止出现问题，设置有效期

可以拆分过程  
1.查询缓存  
2.重建  
2.1获取锁  
2.2查数据库，写回redis  
2.3释放锁

多线程测试工具[jemeter](https://blog.csdn.net/kk_lzvvkpj/article/details/129860590)

postman可以多线程模拟高并发发起请求吗？不能，是串行

```java
/**
 * 缓存击穿，互斥锁
 *
 * @param id 店铺id
 * @return shop
 */
private Shop queryWithMutex(Long id) {
    // 从redis查询商铺缓存
    Shop shop;
    try {
        shop = (Shop) redisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
    } catch (ClassCastException e) {
        return null;
    }

    // 判断是否存在
    if (shop != null) {
        // redis中有数据直接返回
        return shop;
    }

    // 缓存重建
    try {
        // 获取互斥锁
        boolean isLock = tryLock(LOCK_SHOP_KEY + id);
        // 判断是否成功
        if (!isLock) {
            // 失败，休眠重试
            Thread.sleep(50);
            // todo: 查询重试，等待重建好。改while？自旋？
            return queryWithMutex(id);
        }

        // 获取锁成功，查数据库
        shop = getById(id);
        // 模拟重建延时
        Thread.sleep(1000);

        // 不存在，返回错误
        if (shop == null) {
            // 空值写入redis
            redisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
            return null;
        }
        // 存在，写入redis
        redisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, shop, CACHE_SHOP_TTL, TimeUnit.MINUTES);
    } catch (Exception e) {
        throw new RuntimeException(e);
    } finally {
        // 释放互斥锁
        unLock(LOCK_SHOP_KEY + id);
    }
    return shop;
}

private boolean tryLock(String key) {
    Boolean lock = redisTemplate.opsForValue().setIfAbsent(key, "", LOCK_SHOP_TTL, TimeUnit.SECONDS);
    // 底层拆箱机制会调用booleanValue()会造成空指针异常
    return Boolean.TRUE.equals(lock);
}

private void unLock(String key) {
    redisTemplate.delete(key);
}
```

#### 逻辑过期

数据**预热**，一定需要先预热热点key

获取锁成功应该再次检测redis缓存是否过期。如果存在无需重建？释放锁的同时其他线程拿到了锁

```java
private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);

/**
* 缓存击穿，逻辑过期
*
* @param id 店铺id
* @return shop
*/
private Shop queryWithLogicalExpire(Long id) {
    // 从redis查询商铺缓存
    RedisData redisData;
    try {
        redisData = (RedisData) redisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
    } catch (ClassCastException e) {
        // 说明存的是空值
        return null;
    }
    if (redisData == null) {
        return null;
    }

    // 检查逻辑过期时间
    LocalDateTime localDateTime = redisData.getExpireTime();
    Shop shop = (Shop) redisData.getData();
    // 未过期
    if (localDateTime.isAfter(LocalDateTime.now())) {
        return shop;
    }

    // 过期重建
    // 获取互斥锁
    boolean isLock = tryLock(LOCK_SHOP_KEY + id);
    // 判断是否成功
    if (isLock) {
        // 成功，创建新线程重建
        CACHE_REBUILD_EXECUTOR.submit(() -> {
            try {
                saveShopToRedis(id, 60L);
            } catch (Exception e) {
                throw new RuntimeException(e);
            } finally {
                // 释放互斥锁
                unLock(LOCK_SHOP_KEY + id);
            }
        });
    }
    // 返回的是旧的数据，存在数据不一致问题
    return shop;
}

```

### 缓存工具封装

![图 2](https://s2.loli.net/2023/04/01/LHpdqEbDK8Vzhki.png)  

## 优惠券秒杀

### 全局唯一id

> 构造器注入原来不需要加 `@Autowire`，只要注册为了组件吧
> 配合前端加密传输与后端解密
> MVCC机制?多版本并发控制

全局id生成器，高可用、唯一性、高性能、递增性、安全性

不使用自增id，id规律太明显，受单表数据量的限制

（雪花算法？）

符号位      时间戳31bit                      序列号32bit  
0 - 0000000 00000000 00000000 - 00000000 00000000 00000000 00000000

- 符号位永远为0
- 时间戳，以秒为单位
- 秒内计算器，支持每秒产生2^32个不同id

```java
@Component
public class RedisIdGenerator {

    private static final long BEGIN_TIMESTAMP = 1672531200L;

    public static final int SERIAL_BIT = 32;

    private final StringRedisTemplate redisTemplate;


    public RedisIdGenerator(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public long nextId(String keyPrefix){
        // 生成时间戳
        LocalDateTime now = LocalDateTime.now();
        long subTimestamp = now.toEpochSecond(ZoneOffset.UTC) - BEGIN_TIMESTAMP;

        // redis生成序列号
        String date = now.format(DateTimeFormatter.ofPattern("yyyy:MM:dd"));
        Long count = redisTemplate.opsForValue().increment("icr:" + keyPrefix + ":" + date);
        // 拼接并返回
        if (count == null){
            return -1L;
        }
        return subTimestamp << SERIAL_BIT | count;
    }
}
```

### 实现优惠券秒杀下单

### 超卖问题

![图 3](https://s2.loli.net/2023/04/02/WRoV7nNK3zJyLer.png)  

加锁

悲观锁&乐观锁

乐观锁

版本号法

CAS自旋

查询时的库存和修改时的库存

> 数据库update行锁<https://blog.csdn.net/zhizhengguan/article/details/122112773>

### 一人一单

> nginx反代

但是集群模式下单机锁synchronized会失效

Idea模拟集群

## 分布式锁

分布式锁，多进程可见、互斥、高可用、高性能、安全性

Mysql、Redis、Zookeeper

![图 4](https://s2.loli.net/2023/04/03/3hMGo2fRmPl4xZT.png)  

setnx🔒

### 分布式锁误删问题

![图 5](https://s2.loli.net/2023/04/03/uVyNcYqQZE2vM3d.png)  

释放锁把其他锁删了，释放时判断自己线程和锁的线程是不是同一个（但是不同进程线程id可能一样，加uuid）

但是只能解决误删，还是有可能两个线程进入业务代码

### 分布式锁的原子性问题

判断以为是自己的锁的时候，stw

lua脚本解决多条命令原子性问题

redis.call('set', 'name', 'jack')

eval "return redis.call('set', 'name', 'jack')" 0代表需要key类型参数个数

eval "return redis.call('set', KEYS[1], ARGV[1])" 1 name rose

取参数 KEYS[] ARGV[] 一定大写

```lua
 -- 比较线程标示与锁中的标示是否一致
if(redis.call('get', KEYS[1]) = ARGV[1]) 
then
    -- 释放锁
    return redis.call('del', KEYS[1])
end
return 0
```

```java
public static final DefaultRedisScript<Long> UNLOCK_SCRIPT;
static {
    UNLOCK_SCRIPT = new DefaultRedisScript<>();
    UNLOCK_SCRIPT.setLocation(new ClassPathResource("unlock.lua"));
    UNLOCK_SCRIPT.setResultType(Long.TYPE);
}

stringRedisTemplate.execute(UNLOCK_SCRIPT,
        Collections.singletonList(KEY_PREFIX + lockName),
        THREAD_ID_PREFIX + Thread.currentThread().getId());
```

## Redisson

不可重入，同一个线程无法多次获取同一把锁

不可重试，获取锁只尝试一次就返回false，没有重试机制

超时释放，执行业务时间长导致锁释放

主从一致性问题，redis集群主从同步存在延迟，写主读从

Redisson是一个在redis的基础上实现的java驻内存数据网格（in-memory data grid），分布式工具集合，包括分布式锁

```java
@Bean
public RedissonClient redissonClient() {
    // 配置Redisson
    Config config = new Config();
    // config.useClusterServers()设置多节点
    config.useSingleServer()
            .setAddress("redis://192.168.73.130:6379")
            .setPassword("12345678");
    return Redisson.create(config);
}
```

```java
RLock lock = redissonClient.getLock("keyName");
        // 尝试获取锁
        boolean isLock = lock.tryLock(1, 10, TimeUnit.SECONDS);
```

### Redisson可重入锁原理

存储哈希结构，但是哈希没有setnx

![图 6](https://s2.loli.net/2023/04/03/zSsYEUpwjIcrKDV.png)  

![图 7](https://s2.loli.net/2023/04/03/1nGvdKzmiVaxuI6.png)  

底层lua脚本来保证原子性

### 锁重试和watchdog机制?

发布订阅

看门狗

## 秒杀优化

### 异步秒杀思路

> lua库存没有也会报错

先让你抢到单，然后再慢慢异步扣减数据库

订单缓存redis

set

![图 9](https://s2.loli.net/2023/04/04/Xc8ZOjYqMaGRBgp.png)  

1. 新增秒杀优惠券的同时，将优惠券信息保存到Redis中
2. 基于lua脚本，判断秒杀库存、一人一单，决定用户是否抢购成功
3. 如果抢购成功，将优惠券id和用户id封装后存入阻塞队列
4. 开启线程任务，不断从阻塞队列中获取信息，实现异步下单功能

jdk内部阻塞队列有安全问题等

## Redis消息队列

消息队列（Message Queue）

- 消息队列：存储和管理消息
- 生产者：发送消息到消息队列
- 消费者：从消息队列获取消息并处理消息

redis实现消息队列

- list blpush, brpop
- PubSub 发布订阅
- Stream

## 达人探店

### 发布探店笔记

标题文字图片

评论

todo: 改对象存储

### 查看探店笔记

> 不需要先登录才能看笔记

### 点赞功能

> 点赞这种数据和评论放mongodb
> 需要知道是谁点的赞而且要持久化保存
> 可以MySQl保存一个关联表，（第一次从数据库取点赞id缓存）然后redis先缓存，在异步定时任务写入数据库
> 如果点赞数据是先在前端增加，检测到刷新，退出，以及设定的时间等才提交点赞数据

同一个用户只能点赞一次，再次点击则取消点赞

```java
private void isBlogLiked(Blog blog) {
    // 判断当前用户是否点赞
    Long userId = UserDtoHolder.getUser().getId();
    String blogKey = BLOG_LIKED_KEY + blog.getId();
    Boolean isMember = stringRedisTemplate.opsForSet().isMember(blogKey, userId.toString());
    blog.setIsLike(Boolean.TRUE.equals(isMember));
}
```

```java
@Override
public Result likeBlog(Long id) {
    // 判断当前用户是否点赞
    Long userId = UserDtoHolder.getUser().getId();
    String blogKey = BLOG_LIKED_KEY + id;
    Boolean isMember = stringRedisTemplate.opsForSet().isMember(blogKey, userId.toString());
    if (Boolean.FALSE.equals(isMember)) {
        // 点赞
        boolean isSuccess = update()
                .setSql("liked = liked + 1")
                .eq("id", id)
                .update();
        if (isSuccess) {
            stringRedisTemplate.opsForSet().add(blogKey, userId.toString());
        }
    }else {
        // 再点一次就是移除
        boolean isSuccess = update()
                .setSql("liked = liked - 1")
                .eq("id", id)
                .update();
        if (isSuccess) {
            stringRedisTemplate.opsForSet().remove(blogKey, userId.toString());
        }
    }
    return Result.ok();
}
```

### 详情页点赞数据

根据点赞时间排序

sortedSet无ismember

查分数判断是否存在

zscore

排名

zrange key 0 4

## 好友关注

### 关注和取关

> 逻辑删除,定时任务,空闲的时候在真正删除

### 共同关注

> 但是直接放redis里是不是有点牵强

求交集sinter

我觉得应该只要点击查共同关注的时候取当前用户和对方的关注取交集，可以借助redis也可以只用数据库语句

> MySql没有求交集和差集的语句，只能通过union改造

### 关注推送

> 我记得哪里讲过推模式和拉模式
> 如果用户取消关注怎么保证统一性？

feed流，投喂流，无限下拉刷新获取新的信息

Timeline：不做内容筛选，简单按照内容的发布顺序排序，常用于好友或关注。例如朋友圈

智能排序：推送用户感兴趣的

- 拉模式：读扩散，只有读的时候才拉取，然后再按照时间排序
- 推模式：写扩散，发消息直接推送到所有
- 推拉结合：读写混合，发布者根据粉丝数目分为推拉，粉丝也根据活跃程度推拉

### 滚动分页查询收件箱

> 不用时间戳而使用递增generateKey

### 附近商户功能

GEO数据类型，实际上是zset，geohash转score

### 用户签到

bitMap

setbit getbit

### UV

UV

PV
