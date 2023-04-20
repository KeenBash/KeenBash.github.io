---
category:
  - Extension
tag:
  - Blog
---

# Sara项目总结

## 权限系统

自己实现的权限系统带注解loginCheck

PoetryCache定时器线程池和缓存实体对象Entity

用来存对应登录用户的相关数据数据和token, 类似UserDetail和authticationToken

getToken拿的是请求头的token, 然后根据token再从缓存池中拿用户

每验证一次token重置过期时间，也就是长时间未登录才过期token

> 那我是不是可以在userdetail里面放token
> 这个缓存池的作用是一个简易版redis
> 这个注解类似@PreAuthorize

### 缓存池

```java
// 定时器线程池，用于清除过期缓存
private final static ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();

// 每一次put都清除原来的Future对象，重新设置Future
public static void put(String key, Object data, long expire) {
    // 清除原键值对
    Entity entity = map.get(key);
    if (entity != null) {
        Future oldFuture = entity.getFuture();
        if (oldFuture != null) {
            oldFuture.cancel(true);
        }
    }

    // 设置过期时间
    if (expire > 0) {
        Future future = executor.schedule(() -> {
            map.remove(key);
        }, expire, TimeUnit.SECONDS);
        map.put(key, new Entity(data, future));
    } else {
        //不设置过期时间
        map.put(key, new Entity(data, null));
    }
}

// 缓存实体类
private static class Entity {
    // 键值对的value
    private Object value;
    // 定时器Future
    private Future future;
}
```

## 程序启动任务

拿到网站预先需要的数据，比如网站信息公告，分类数据，管理员等放到缓存池中

启动tioWebsocketStarter

## 前后端交互

PoetryResult.java需要实现序列化接口

```java
// 还可以优化code
@Data
public class PoetryResult<T> implements Serializable {
    // Java的序列化机制是通过在运行时判断类的serialVersionUID来验证版本的一致性
    // 反序列化时验证两者的值不一致就反序列失败
    private static final long serialVersionUID = 1L;

    private int code;
    private String message;
    private T data;
    private long currentTimeMillis = System.currentTimeMillis();

    public PoetryResult() {
        this.code = 200;
    }

    public PoetryResult(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public PoetryResult(T data) {
        this.code = 200;
        this.data = data;
    }

    public PoetryResult(String message) {
        this.code = 500;
        this.message = message;
    }

    public static <T> PoetryResult<T> fail(String message) {
        return new PoetryResult<>(message);
    }

    public static <T> PoetryResult<T> fail(CodeMsg codeMsg) {
        return new PoetryResult<>(codeMsg.getCode(), codeMsg.getMsg());
    }

    public static <T> PoetryResult<T> fail(Integer code, String message) {
        return new PoetryResult<>(code, message);
    }

    public static <T> PoetryResult<T> success(T data) {
        return new PoetryResult<>(data);
    }

    public static <T> PoetryResult<T> success() {
        return new PoetryResult<>();
    }
}
```

## 注册检查

正则表达式检查合法性，按道理其他的方法都需要完备的参数检查

## 登录

登录前端传过来的是加密的密文，需要先解密

```java
password = new String(SecureUtil.aes(CommonConst.CRYPOTJS_KEY.getBytes(StandardCharsets.UTF_8)).decrypt(password));
```

密码类型多合一验证，也就是或语句

用token直接登录，访问链接用token做请求参数

### 它的token实现

好像是生成UUID，然后缓存保存用token做key，用户信息做值

同时也保存了一个以前缀加用户id的key，token作值附上过期时间

## 获取验证码

绑定手机和邮箱

手机验证码

邮箱验证码

## 全局异常处理器

判断异常类型 instanceof 返回PoetryResult<?>

## 聊天室系统
