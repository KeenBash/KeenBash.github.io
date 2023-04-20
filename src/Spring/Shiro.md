# shiro

[官方文档](https://shiro.apache.org/documentation.html)

[shiro](https://blog.csdn.net/weixin_68509156/article/details/126186110)

[shiro整合ssm](https://cloud.tencent.com/developer/article/1980553)

shiro与springboot整合

- [shiro](#shiro)
  - [导入依赖包](#导入依赖包)
  - [配置web.xml](#配置webxml)
  - [配置spring-mvc](#配置spring-mvc)
    - [配置ehcache-shiro.xml](#配置ehcache-shiroxml)
  - [配置shiro.xml](#配置shiroxml)
  - [配置spring-config.xml](#配置spring-configxml)
  - [自定义realm](#自定义realm)
  - [生成六位随机盐值](#生成六位随机盐值)
  - [加密处理service](#加密处理service)
  - [访问controller](#访问controller)
    - [post登录](#post登录)
    - [@RequiresRoles()](#requiresroles)
  - [整合springboot](#整合springboot)

## 导入依赖包

```xml
<properties>
    <shiro.version>1.10.1</shiro.version>
</properties>

<!-- shiro-spring已经包含 core 和 web 依赖 -->
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-spring</artifactId>
    <version>${shiro.version}</version>
</dependency>
<!-- ehcache缓存 -->
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-ehcache</artifactId>
    <version>${shiro.version}</version>
</dependency>
```

## 配置web.xml

```xml
<!-- shiro过滤器 -->
<filter>
    <filter-name>shiroFilter</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>
<filter-mapping>
    <filter-name>shiroFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

## 配置spring-mvc

```xml
<!-- 启动shiro的注解 -->
<!-- 注意加载顺序，shiro注解加载顺序要放在开启mvc(@Controller)注解驱动后 -->
<bean id="lifecycleBeanPostProcessor"
        class="org.apache.shiro.spring.LifecycleBeanPostProcessor"/>
<bean class="org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator"
        depends-on="lifecycleBeanPostProcessor"/>
<bean class="org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor">
    <property name="securityManager" ref="webSecurityManager"/>
</bean>
```

### 配置ehcache-shiro.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache name="ehcache" updateCheck="false">

    <!-- 磁盘缓存位置 -->
    <diskStore path="java.io.tmpdir"/>
    <!-- 默认缓存 -->
    <defaultCache
            maxEntriesLocalHeap="1000"
            eternal="false"
            timeToIdleSeconds="3600"
            timeToLiveSeconds="3600"
            overflowToDisk="false">
    </defaultCache>

    <!-- 自定义登录记录缓存 锁定10分钟 -->
    <cache name="loginRecordCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true">
    </cache>

</ehcache>
```

## 配置shiro.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">


    <!-- 加密规则 -->
    <!-- 加salt在认证realm里 -->
    <bean id="matcher" class="org.apache.shiro.authc.credential.HashedCredentialsMatcher">
        <!-- 加密算法 -->
        <property name="hashAlgorithmName" value="MD5"/>
        <!-- 迭代次数 -->
        <property name="hashIterations" value="3"/>
    </bean>

    <!-- 自定义Realm -->
    <bean id="myRealm" class="com.ssm.template.realm.MyRealm">
        <!-- 使用加密器 -->
        <property name="credentialsMatcher" ref="matcher"/>
        <!-- 打开缓存 -->
        <property name="cachingEnabled" value="true"/>
        <property name="authorizationCachingEnabled" value="true"/>
        <property name="authenticationCachingEnabled" value="true"/>
        <!-- 设置缓存管理器 -->
        <property name="cacheManager" ref="ehCacheManager"/>
    </bean>

    <!-- 管理session -->
    <bean id="sessionManager" class="org.apache.shiro.web.session.mgt.DefaultWebSessionManager">
        <!-- 关闭首次登陆以及退出登陆后，地址会添加;jsession的问题 -->
        <property name="sessionIdUrlRewritingEnabled" value="false"/>
    </bean>

    <!-- rememberMeCookie -->
    <bean id="rememberMeCookie" class="org.apache.shiro.web.servlet.SimpleCookie">
        <property name="name" value="rememberMe"/>
        <property name="path" value="/"/>
        <property name="httpOnly" value="true"/>
        <!-- 7 * 24 * 60 * 60 -->
        <property name="maxAge" value="604800"/>
    </bean>

    <!-- rememberMeManager -->
    <bean id="rememberMeManager" class="org.apache.shiro.web.mgt.CookieRememberMeManager">
        <property name="cookie" ref="rememberMeCookie"/>
        <property name="cipherKey" value="1234567887654321"/>
    </bean>

    <!-- 配置缓存管理器 -->
    <bean id="ehCacheManager" class="org.apache.shiro.cache.ehcache.EhCacheManager">
        <!-- 引入缓存配置文件 -->
        <property name="cacheManagerConfigFile" value="classpath:ehcache-shiro.xml"/>
    </bean>


    <!-- 配置WebSecurityManager -->
    <bean id="webSecurityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
        <!-- 自定义realm -->
        <property name="realm" ref="myRealm"/>
        <!-- 管理session -->
        <property name="sessionManager" ref="sessionManager" />
        <!-- 记住我 -->
        <property name="rememberMeManager" ref="rememberMeManager"/>
        <!-- ehcache缓存 -->
        <property name="cacheManager" ref="ehCacheManager"/>
    </bean>

    <!-- 配置过滤器 -->
    <bean id="shiroFilter" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
        <property name="securityManager" ref="webSecurityManager"/>
        <property name="loginUrl" value="/login"/>
        <property name="filterChainDefinitions">
            <!-- 路径规则 -->
            <value>
                /home=user
                /manage=user
                /logout=logout
                /**=anon
            </value>
        </property>
    </bean>
</beans>
```

## 配置spring-config.xml

```xml
<!-- 引入shiro.xml -->
<!-- 注意配置文件加载顺序，出错会导致shiro配置失败 -->
<!-- 这里引入顺序为开启包扫描之下 -->
<import resource="classpath:shiro.xml"/>
```

## 自定义realm

```java
@Component
public class MyRealm extends AuthorizingRealm {

    UserService service;

    @Autowired
    public void setService(UserService service) {
        this.service = service;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        // 认证
        // 从token拿到用户名
        String username = token.getPrincipal().toString();
        // 从用户名拿到User对象
        User user = service.getUserByUsername(username);

        if (user != null) {
            // 验证密码在内部
            // 设置加盐验证
            return new SimpleAuthenticationInfo(user, user.getPassword(), ByteSource.Util.bytes(user.getSalt()), this.getName());
        }
        return null;
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        // 授权
        User user = (User) principals.getPrimaryPrincipal();
        String role = service.getRoleByUid(user.getUid());
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        if (role != null && role.length() > 0) {
            // 添加角色
            info.addRole(role);
        }
        // 授权不止可以添加角色role，还有其他
        return info;
    }

}

```

## 生成六位随机盐值

```java
public class RandomSalt {

    public static int numSalt() {
        Random random = new Random();
        return random.nextInt(899999) + 100000;
    }
}
```

## 加密处理service

```java
@Override
public void registerUser(String username, String password, String salt) {
    // 加密处理
    Md5Hash md5Hash = new Md5Hash(password, salt, 3);
    mapper.registerUser(username, md5Hash.toHex(), salt);
}
```

## 访问controller

### post登录

```java
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public String doLogin(String username,
                          String password,
                          @RequestParam(defaultValue = "false") boolean rememberMe) {
        // 获取Subject对象
        Subject subject = SecurityUtils.getSubject();
        // 封装为token
        // shiro的rememberMe
        UsernamePasswordToken token = new UsernamePasswordToken(username, password, rememberMe);
        // login
        try {
            subject.login(token);
            return "redirect:home";
        } catch (UnknownAccountException e) {
            System.out.println("用户名错误!");
        } catch (IncorrectCredentialsException e) {
            System.out.println("密码错误!");
        }
        return "login";
    }
```

### @RequiresRoles()

没有role访问会跳转到错误页面

```java
@RequestMapping("/manage")
@RequiresRoles("admin")
public String manage() {
    Subject subject = SecurityUtils.getSubject();
    System.out.println("subject.getPrincipal() = " + subject.getPrincipal());
    System.out.println("subject.hasRole('admin') = " + subject.hasRole("admin"));
    return "manage";
}
```

## 整合springboot

