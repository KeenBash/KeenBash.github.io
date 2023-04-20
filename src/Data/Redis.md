---
category:
  - Data
tag:
  - Redis
---

# Redis

- [Redis](#redis)
  - [安装Redis](#安装redis)
  - [基本通用操作](#基本通用操作)
    - [存入\&修改数据](#存入修改数据)
    - [删除](#删除)
    - [获取数据](#获取数据)
    - [设置数据过期时间](#设置数据过期时间)
    - [检查多久过期](#检查多久过期)
    - [常用操作](#常用操作)
  - [基本数据类型](#基本数据类型)
    - [String](#string)
    - [Hash](#hash)
    - [List](#list)
    - [set](#set)
      - [HashSet（默认）](#hashset默认)
      - [SortedSet](#sortedset)
  - [持久化](#持久化)
    - [RDB](#rdb)
      - [配置自动保存](#配置自动保存)
    - [AOF](#aof)
  - [事务和锁](#事务和锁)
    - [事务](#事务)
    - [锁](#锁)
  - [使用java与redis交互](#使用java与redis交互)
    - [Jedis框架](#jedis框架)
      - [jedis连接池](#jedis连接池)
    - [SpringDataRedis-Lettuce](#springdataredis-lettuce)
      - [改用jedis](#改用jedis)
    - [序列化RedisSerializer](#序列化redisserializer)
      - [json序列化](#json序列化)
      - [StringRedisTemplate](#stringredistemplate)
    - [管理事务](#管理事务)
  - [Redis的应用](#redis的应用)
    - [Redis做缓存](#redis做缓存)
    - [Token持久化存储](#token持久化存储)

## 安装Redis

NoSQL(Not Only SQL)用途，频繁使用数据

Redis英文全称是Remote Dictionary Server官网[redis](https://redis.io/)

[xftp传输失败](https://blog.csdn.net/weixin_42030357/article/details/96185533)

jemalloc缺失make MALLOC=libc

[Ubuntu安装Redis6.2.6](https://blog.csdn.net/qq_53686534/article/details/123885301)

[Redis？它主要用来什么的](https://blog.csdn.net/u014723137/article/details/125658176)

[安装到ubuntu](https://blog.csdn.net/m0_54850825/article/details/126540414)

[Ubuntu安装redis后redis.conf配置为空](https://blog.csdn.net/weixin_43097301/article/details/89366196)

在ubuntu里使用命令apt install redis安装

!!ubuntu默认apt安装版本5.0.7, 改手动安装6.2.6版本并加入远程连接密码12345678

```linux
wget https://download.redis.io/releases/redis-6.2.6.tar.gz
```

sudo service redis restart  # 重启

redis-cli  # 连接客户端

redis-cli -a 密码

redis-cli ping  # 检查连接

/>PONG

验证密码 auth 12345678

外部连接redis, 修改配置文件

注释 bind

修改 protected-mode 为 no

requiredPass 12345678

配置文件位置 /etc/redis/redis.conf

本地存储位置 /var/lib/redis/

## 基本通用操作

redis默认16个数据库（0-15），默认使用0

可以通过 select 语句切换数据库

```sql
select 序号

-- 查询命令帮助
help @string

-- 检查数据类型
type key
```

### 存入&修改数据

```sql
-- 单个键值对
set key value

-- 多个键值对
mset key value [k2 v2...]

-- 冒号分割，层级结构
-- 项目名:业务名:类型:id
-- value可以存序列化json字符串的值
set object:field1:part1 value
```

### 删除

```sql
-- 可以多于一个key, 空格隔开
del key [k2...]
```

### 获取数据

```sql
get key
mget key [k2...]
```

### 设置数据过期时间

```sql
-- 插入时设置
set key value ex 秒
set key value px 毫秒

-- 插入后设置
-- 所以需要这个键存在，不存在返回0
expire key seconds
```

### 检查多久过期

```sql
-- time to live生存时间
ttl key
-- (integer) -2 返回-2即过期了，或者应该说是不存在这个key
-- (integer) -1 返回-1即代表永久有效

pttl key 查看毫秒
persist
```

### 常用操作

```sql
-- 查看所有键
-- redis单线程，不建议查所有键
keys *

-- 查询某个键是否存在
exists key [k2...]

-- 随机拿key
randomkey

-- 移动数据到另一个数据库
move key DbIndex

-- 修改键名
-- 如果newkey已经存在，那么原来key里面的值将会被取代
rename key newkey
-- 检查newkey是否已存在，返回0代表已存在
renamenx key newkey

-- 自增value
-- 返回更改后的数值
incr key
-- a += b 定义不长
incrby key num
-- 自减
decr key
```

## 基本数据类型

### String

默认都是保存的字符串类型，不同格式存储编码方式不同

- string:
- int:
- float:

### Hash

类似java中的嵌套Map

```java
Map<String, Map<String, String>>
```

>> redis中的hash不能再往下嵌套了

```sql
-- 添加hash类型数据
hset key field value [field1 value1...]

-- 获取数据
hget key field

-- 获取所有
hgetall key

-- 查看hash中存了多少个键值对
hlen key

-- 一次性获取所有的字段
hkeys key

-- 一次性获取所有字段的值
hvals key
```

### List

类似java中的LinkedList双向链表，支持正向反向索引。

我们可以向一个已存在或是不存在的list中添加数据

```sql
-- 向列表头部添加元素
lpush key element
-- 向列表尾部添加元素
rpush key element
-- 在指定元素前/后插入元素
linsert key before/after 指定元素 添加元素
```

获取元素

```sql
-- 根据下标获取元素
lindex key 下标
-- 获取并移除头部元素
lpop key
-- 获取并移除尾部元素
rpop key
-- 获取指定范围内的元素
lrange key start end
lrange d 0 -1
```

list应用场景参考以下：

- lpush+lpop=Stack（栈）
- lpush+rpop=Queue（队列）
- blpop/brpop（阻塞队列）没有元素时等待指定时间
- lpsh+ltrim=Capped Collection（有限集合）
- lpush+brpop=Message Queue（消息队列）

### set

#### HashSet（默认）

value为null的HashMap

无需，不允许重复元素，不支持随机访问，查找快

支持交集，并集，差集 好友列表共同关注之类

添加元素

```sql
-- 添加元素
sadd key member...

-- 查看有多少元素
scard key
-- 判断是否是成员
sismember key member
-- 列出所有成员，不是插入顺序
smembers key

-- 随机移除
spop key
-- 移除指定
srem key member
```

集合之间的运算

```sql
-- 差集
sdiff key1 key2 
-- 交集
sinter key1 key2
-- 并集
sunion key1 key2
```

#### SortedSet

底层跳表加hash表

添加带权重的元素，从小到大

排行榜

```sql
zadd key score member 

zcard
zrem
zrange ... withscores

-- 通过分数段查看
zrangebyscore key start stop 
-- 统计分数段内数量
zcount key start stop
-- 根据分数获取指定值排名
zrank key member
```

## 持久化

两种方式，一种是直接存储数据，一种是存储操作过程

### RDB

将数据保存到本地

默认保存在 /var/lib/redis/dump.rdb，可修改默认保存地址

```sql
-- 主线程保存
save

-- 另外开一个线程保存
bgsave
```

保存后我们可以使用 shutdown 关闭服务器

quit退出交互程序

#### 配置自动保存

```sql
-- 300秒内有10个写入就保存
save 300 10
```

### AOF

以日志的形式将每次执行的命令保存

三种时间策略

- always: 每次
- everysec: 每秒（默认配置）
- no:

把redis.conf配置文件里的appendonly no --> yes

aof重写机制优化，语句压缩

手动重写 bgrewriteaof

配置文件中配置自动重写

```conf
# 百分比
auto-aof-rewrite-percentage 100
# 达到
auto-aof-rewrite-min-size 64mb
```

## 事务和锁

### 事务

将命令存入队列中，然后统一取出执行

开启事务 multi

执行命令 ...

提交事务 exec

中途取消 discard

### 锁

redis乐观锁，并不认为会有人抢占资源，所以会直接对数据进行操作，在操作时再确认是否有人抢占资源

mysql悲观锁，时刻认为会有人抢占资源，禁止一切外来访问，直到释放锁

redis中可以使用`watch`来监视一个目标，如果执行事务之前 被监视目标 发生了修改，则取消此次事务

```sql
watch key
```

## 使用java与redis交互

Jedis, Lettuce, Redisson

### Jedis框架

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.7.1</version>
</dependency>
```

连接redis数据库，创建一个Jedis对象

```java
Jedis jedis = new Jedis("192.168.73.130", 6379);
jedis.set("b", "666");
jedis.close();
```

测试类，jedis的操作api和redis命令行一致

```java
@SpringBootTest
public class JedisTest {
    private Jedis jedis;

    @BeforeEach
    void setJedis() {
        jedis = new Jedis("192.168.73.130", 6379);
        jedis.auth("12345678");
        jedis.select(0);
    }

    @Test
    public void testJedis() {
        jedis.set("j", "k");
        System.out.println("j = " + jedis.get("j"));
    }


    @AfterEach
    void downJedis() {
        if (jedis != null) {
            jedis.close();
        }
    }
}
```

#### jedis连接池

jedis本身是线程不安全的，并且频繁的创建和销毁会有性能损耗，因此推荐使用jedis连接池代替jedis的直连方式

？新版默认连接池？

```java
public class JedisConnectionFactory {

    private static final JedisPool jedisPool;

    static {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        // 最大连接
        jedisPoolConfig.setMaxTotal(8);
        // 最大空闲连接
        jedisPoolConfig.setMaxIdle(8);
        // 最小空闲连接
        jedisPoolConfig.setMinIdle(0);
        // 最长等待时间
        // jedisPoolConfig.setMaxWaitMillis(200);// Deprecated
        jedisPoolConfig.setMaxWait(Duration.ofMillis(200));
        jedisPool = new JedisPool(jedisPoolConfig,
                "192.168.73.130",
                6379,
                1000,
                "12345678");
    }

    public static Jedis getJedis() {
        return jedisPool.getResource();
    }
}
```

### SpringDataRedis-Lettuce

SpringDataRedis提供了对jedis和lettuce的整合

提供了统一的操作方式RedisTemplate

？添加连接池依赖？

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- ？添加连接池依赖？ -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

配置redis，远程连接用url

```yaml
spring:
  # redis
  redis:
    host: 192.168.73.130
    port: 6379
    database: 0
    password: 12345678
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
        max-wait: 100
    # jedis:pool
```

使用template

- template.opsForValue
- template.opsForHash
- template.opsForList
- template.opsForSet
- template.opsForZSet

template 通用操作

```java
@Autowired
RedisTemplate template;

@Test
void contextLoads() {
    // 操作
    template.opsForValue().set("c","spring");
    template.opsForValue().get("c");
    template.delete("b");
    template.hasKey("b");
}
```

#### 改用jedis

### 序列化RedisSerializer

> 注入byName：template引发问题，改redisTemplate

使用StringRedisTemplate不会键名序列化乱码

普通RedisTemplate不指定泛型\<String, String>

d会序列化成以下

\xac\xed\x00\x05t\x00\x01d

默认使用jdk的序列化器，内存占用大，可读性差、

#### json序列化

不太推荐序列化为json保存数据，会带来额外开销，除开web传输数据

一般都要求键和值都为string

修改序列化方式，springbootweb包含jackson

```java
@Bean
public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory){
    RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
    // 设置连接工厂
    redisTemplate.setConnectionFactory(redisConnectionFactory);
    // 设置序列化工具
    GenericJackson2JsonRedisSerializer jsonRedisSerializer = new GenericJackson2JsonRedisSerializer();

    // Key和HashKey采用String序列化
    redisTemplate.setKeySerializer(RedisSerializer.string());
    redisTemplate.setHashKeySerializer(RedisSerializer.string());
    // Value和HashValue采用JSON序列化
    redisTemplate.setValueSerializer(jsonRedisSerializer);
    redisTemplate.setHashValueSerializer(jsonRedisSerializer);
    return redisTemplate;
}
```

fastjson序列化

#### StringRedisTemplate

键值都是string方式

需要借助序列化工具手动序列化和反序列化

kyro序列化

### 管理事务

借助jdbc驱动和mysql事务管理@Transactional注解

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

配置数据源

新建一个service.RedisService.java

```java
@Service
public class RedisService {

    StringRedisTemplate template;

    @Autowired
    public void setTemplate(StringRedisTemplate template) {
        this.template = template;
    }

    @PostConstruct
    public void init(){
        // 开启事务
        template.setEnableTransactionSupport(true);
    }

    @Transactional
    public void test(){
        template.multi();
        template.opsForValue().set("a", "sb");
        template.exec();
    }
}
```

## Redis的应用

### Redis做缓存

mybatis缓存，默认二级缓存是单机的，我们希望多台服务器访问数据库使用同一个二级缓存。需要实现mybatis的cache接口，把RedisTemplate注入

导入mybatis starter

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.3.0</version>
</dependency>
```

cache.MybatisRedisCache.java

```java
public class MybatisRedisCache implements Cache {

    private final String id;
    private static RedisTemplate<Object, Object> template;

    // 构造方法必须带string接收id
    public MybatisRedisCache(String id){
        this.id = id;
    }

    public static void setTemplate(RedisTemplate<Object, Object> template){
        MybatisRedisCache.template = template;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void putObject(Object key, Object value) {
        // 向redis缓存数据并设置超时时间
        template.opsForValue().set(key, value, 60, TimeUnit.SECONDS);
    }

    @Override
    public Object getObject(Object key) {
        // 获取缓存数据
        return template.opsForValue().get(key);
    }

    @Override
    public Object removeObject(Object key) {
        // 删除
        return template.delete(key);
    }

    @Override
    public void clear() {
        // 清空数据库
        // 使用Connection对象
        template.execute((RedisCallback<Void>) connection -> {
            connection.flushDb();
            return null;
        });
    }

    @Override
    public int getSize() {
        // 这里也是connection对象
        return Objects.requireNonNull(template.execute(RedisServerCommands::dbSize)).intValue();
    }
}
```

config.MybatisConfig.java

```java
@Configuration
public class MybatisConfig {

    RedisTemplate<Object, Object> redisTemplate;

    @Autowired
    MybatisConfig(RedisTemplate<Object, Object> redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    @PostConstruct
    public void init(){
        MybatisRedisCache.setTemplate(redisTemplate);
    }
}
```

使用mapper.CacheMapper.java

应该有配置全局的

```java
@CacheNamespace(implementation = MybatisRedisCache.class)
@Mapper
public interface CacheMapper {

    @Select("select * from student where sid = 2")
    String getStudent();
}
```

测试

```java
@Autowired
CacheMapper mapper;

@Test
public void test() {
    mapper.getStudent();
    mapper.getStudent();
    mapper.getStudent();
}
```

### Token持久化存储

先加web依赖

再spring security

实现
