---
category:
  - Spring
tag:
  - Jwt
---

# jwt

[快速上手](https://cloud.tencent.com/developer/article/2148676)

[java使用](https://www.bilibili.com/video/BV1cK4y197EM/)

JWT(json web token)

在传统的用户登录认证中，因为http是无状态的，所以都是采用session方式。用户登录成功，服务端会保存一个session，服务端会返回给客户端一个sessionId，客户端会把sessionId保存在cookie中，每次请求都会携带这个sessionId。

- [jwt](#jwt)
  - [JWT的结构解析](#jwt的结构解析)
  - [jwt认证流程](#jwt认证流程)
  - [jjwt的使用](#jjwt的使用)

## JWT的结构解析

![图 1](https://s2.loli.net/2023/03/08/d84saLIP9rRGzhg.png)  

第一部分我们称它为头部（header)，第二部分我们称其为载荷（payload)，第三部分是签证（signature)

- header

jwt的头部承载两部分信息：

1. 声明类型，这里是jwt
2. 声明加密的算法 通常直接使用 HMAC SHA256

完整的头部就像下面这样的JSON：

```json
{ 
    "typ": "JWT",
    "alg": "HS256"
}
```

- playload
  
载荷就是存放有效信息的地方。这个名字像是特指飞机上承载的货品，这些有效信息包含三个部分：标准中注册的声明、公共的声明、私有的声明。

标准中注册的声明 (建议但不强制使用) ：

- iss: jwt签发者
- sub: jwt所面向的用户
- aud: 接收jwt的一方
- exp: jwt的过期时间，这个过期时间必须要大于签发时间
- nbf: 定义在什么时间之前，该jwt都是不可用的
- iat: jwt的签发时间
- jti: jwt的唯一身份标识，主要用来作为一次性token，从而回避重放攻击

- signature
  
jwt的第三部分是一个签证信息，这个签证信息由三部分组成：header (base64后的)、payload (base64后的)、**secret**。

这个部分需要base64加密后的header和base64加密后的payload使用。连接组成的字符串，然后通过header中声明的加密方式进行加盐secret组合加密，然后就构成了jwt的第三部分

密钥secret是保存在服务端的，服务端会根据这个密钥进行生成token和验证

![图 2](https://s2.loli.net/2023/03/08/rhEeoLMcAgmBQTu.png)  

## jwt认证流程

在身份验证中，当用户成功登录系统时，授权服务器将会把 JSON Web Token 返回给客户端，用户需要*将此凭证信息存储在本地(cookie或浏览器缓存)。当用户发起新的请求时，需要在请求头中附带此凭证信息*，当服务器接收到用户请求时，会先检查请求头中有无凭证，是否过期，是否有效。如果凭证有效，将放行请求；若凭证非法或者过期，服务器将回跳到认证中心，重新对用户身份进行验证，直至用户身份验证成功。

前端负责在请求加上token.

## jjwt的使用

除了jjwt，还有其他的jwt组件如Java JWT，Nimbus JOSE+JWT

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

```java
/**
 * jwt工具类
 * jjwt版本0.9.1
 */
public class JwtUtil {

    // 默认超时时间
    public static final Long JWT_TTL = 60 * 60 * 1000L;

    // 签发者
    private static final String JWT_ISS = "signer";

    // 签名方式
    private static final SignatureAlgorithm JWT_ALG = SignatureAlgorithm.HS256;

    // key明文，不建议这样写
    private static final String JWT_KEY = "myJwtKey";

    private static String getUUID() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    private static SecretKey generateKey() {
        byte[] encoded = Base64.getEncoder().encode(JWT_KEY.getBytes());
        return new SecretKeySpec(encoded, "AES");
    }

    public static String generateToken(Map<String, Object> claims) {
        return generateToken(claims, null);
    }

    public static String generateToken(Map<String, Object> claims, Long ttlMillis) {
        JwtBuilder jwtBuilder = Jwts.builder();
        jwtBuilder
                // header
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", JWT_ALG.getValue())
                // payload
                .setId(getUUID())
                .addClaims(claims) // 可以自定义修改载荷
                .setIssuer(JWT_ISS);

        if (ttlMillis == null) {
            ttlMillis = JWT_TTL;
        }
        long nowMillis = System.currentTimeMillis();
        jwtBuilder.setIssuedAt(new Date(nowMillis))
                .setExpiration(new Date(nowMillis + ttlMillis));

        return jwtBuilder
                // signature
                .signWith(JWT_ALG, generateKey())
                .compact();

    }

    public static Claims parseToken(String token) {
        if (!StringUtils.hasText(token)){
            return null;
        }
        try{
            return Jwts.parser()
                    .setSigningKey(generateKey())
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("token无法解析");
        }
    }
}
```
