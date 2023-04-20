# SpringSecurity

版本5.4.2

[SpringSecurity](https://docs.spring.io/spring-security/site/docs/5.4.2/reference/html5/)

[详解](https://blog.csdn.net/qq_22075913/article/details/125148535)

- [SpringSecurity](#springsecurity)
  - [入门](#入门)
    - [简单上手](#简单上手)
    - [基本原理](#基本原理)
      - [UserDetailsService接口](#userdetailsservice接口)
      - [PasswordEncoder接口](#passwordencoder接口)
  - [web权限方案](#web权限方案)
    - [认证](#认证)
      - [整合数据库使用](#整合数据库使用)
      - [自定义登录界面](#自定义登录界面)
      - [基于角色或权限的访问](#基于角色或权限的访问)
      - [没有权限跳转](#没有权限跳转)
    - [注解使用](#注解使用)
    - [用户注销](#用户注销)
    - [记住用户](#记住用户)
    - [CSRF](#csrf)
  - [前后端分离](#前后端分离)
    - [RBAC权限模型](#rbac权限模型)
    - [核心代码实现](#核心代码实现)
    - [登录](#登录)
    - [校验](#校验)
    - [登出](#登出)
    - [SecurityConfig](#securityconfig)
  - [异常处理](#异常处理)
    - [认证异常](#认证异常)
    - [授权异常](#授权异常)
  - [跨域](#跨域)

## 入门

用户认证（Authentication）和用户授权（Authorization）

### 简单上手

创建一个springboot项目，版本2.4.12，web依赖，引入security依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

编写测试controller，测试运行，需要登录

默认账号user

默认密码来自控制台日志Using generated security password:

### 基本原理

本质是一个过滤器链

![图 2](https://s2.loli.net/2023/03/07/Tm8dGa7gDoSshrz.png)  

**UsernamePasswordAuthenticationFilter**:负责处理我们在登陆页面填写了用户名密码后的登陆请求。自己实现验证后不在启用。

**ExceptionTranslationFilter：**处理过滤器链中抛出的任何AccessDeniedException和AuthenticationException 。

**FilterSecurityInterceptor：**负责权限校验的过滤器。

过滤器的加载

DelegatingFilterProxy

#### UserDetailsService接口

创建类继承UsernamePasswordAuthenticationFilter，重写方法

创建类实现UserDetailService，编写查询数据过程，返回User对象，这个User对象是安全框架提供的对象

#### PasswordEncoder接口

返回User对象里面的密码加密

## web权限方案

### 认证

认证流程

![图 1](https://s2.loli.net/2023/03/07/MEz9K2NZgGOblrJ.png)  

- Authentication接口: 它的实现类，表示当前访问系统的用户，封装了用户相关信息。
- AuthenticationManager接口：定义了认证Authentication的方法
- UserDetailsService接口：加载用户特定数据的核心接口。里面定义了一个根据用户名查询用户信息的方法。
- UserDetails接口：提供核心用户信息。通过UserDetailsService根据用户名获取处理的用户信息要封装成UserDetails对象返回。然后将这些信息封装到Authentication对象中。

设置登录的用户名和密码

1.配置文件

```properties
spring.security.user.name=admin
spring.security.user.password=admin
```

2.配置类

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String passwordEncoded = passwordEncoder.encode("123456");
        // 使用加密必须添加.passwordEncoder(passwordEncoder)说明加密器
        // 必须授予角色
        // auth.inMemoryAuthentication().passwordEncoder(passwordEncoder).withUser("root").password(passwordEncoded).roles("admin");这个不需要把PasswordEncoder注册为bean
        // 以下需要注册bean
        auth.inMemoryAuthentication().withUser("root").password(passwordEncoded).roles("admin");
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}

```

3.自定义编写实现类

编写实现类，返回User对象

```java
// 也许是有多个匹配，所以需要指定name
// 没有错误应该是有条件装配
@Service
public class MyUserDetailService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList("admin");
        return new User("security", new BCryptPasswordEncoder().encode("security"), authorities);
    }
}
```

创建配置类设置自定义的实现类

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService myDetailService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myDetailService).passwordEncoder(passwordEncoder());

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
```

#### 整合数据库使用

添加mybatisplus、mysql、lombok依赖

配置数据源信息

创建数据库security_test

创建表users，添加字段id、username、password

创建实体类User，加入注解@TableName("users")映射数据库表

创建mapper映射，继承BaseMapper

修改MyUserDetailService

```java
@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        // 根据用户名查询
        // mybatisplus包装
        QueryWrapper<MyUser> wrapper = new QueryWrapper<>();
        wrapper.eq("username", s);
        MyUser user = userMapper.selectOne(wrapper);

        if (user == null) {
            throw new UsernameNotFoundException("用户名不存在！");
        }
        // 权限表
        List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList("admin");
        return new User(user.getUsername(), new BCryptPasswordEncoder().encode(user.getPassword()), authorities);
    }
}

```

#### 自定义登录界面

配置类SecurityConfig，重写方法

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http.formLogin() // 自定义自己的登录页面
            .loginPage("/login.html") // 登录页面设置
            .loginProcessingUrl("/user/login") // 登录访问路径
            .defaultSuccessUrl("/test/index").permitAll() // 登录成功跳转路径
            .and().authorizeRequests()
            .antMatchers("/", "/test/hello", "/user/login").permitAll() // 设置不需要验证的路径
            .anyRequest().authenticated()
            .and().csrf().disable(); // 关闭csrf
}
```

#### 基于角色或权限的访问

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http.formLogin() // 自定义自己的登录页面
            .loginPage("/login.html") // 登录页面设置
            .loginProcessingUrl("/user/login") // 登录访问路径
            .defaultSuccessUrl("/test/index").permitAll() // 登录成功跳转路径

            .and().authorizeRequests()
            .antMatchers("/", "/test/hello", "/user/login").permitAll() // 设置不需要验证路径
            .antMatchers("/test/index").hasAuthority("admin") // 有admin权限才能访问
            .antMatchers("/test/index").hasRole("tester") // 有tester角色才能访问

            .anyRequest().authenticated()
            .and().csrf().disable(); // 关闭csrf
}
```

- hasAuthority具有指定权限则返回true

"admin,system"用于指定多个权限

- hasAnyAuthority具有任何提供的权限之一
- hasRole验证的时候需要添加"ROLE_"+"tester"
- hasAnyRole

#### 没有权限跳转

配置没有权限跳转自定义页面

```java
http.exceptionHandling().accessDeniedPage("/unauth");
```

### 注解使用

开启注解功能

@EnableGlobalMethodSecurity(securedEnabled = true)标注在启动类或配置类

- @Secured 用户具有某个角色，才可以访问方法（controller方法）

(securedEnabled = true, prePostEnabled = true)开启

- @PreAuthorize 进入方法前做权限验证，在controller方法上

@PreAuthorize(**"hasAnyAuthority('admin')"**) spel方法调用，返回布尔值以判断是否可用方法

- @PostAuthorize 方法执行之后校验权限
- @PostFilter 方法返回的数据过滤
- @PreFilter 传入方法的数据过滤

("filterObject.id%2 == 0")

### 用户注销

```java
// 用户注销
http.logout().logoutUrl("/logout")
        .logoutSuccessUrl("/test/hello").permitAll();
```

### 记住用户

创建数据库表username、series、token、last_used(根据当前时间戳更新)

配置PersistentTokenRepository，注入DataSource

```java
@Bean
public PersistentTokenRepository persistentTokenRepository(){
    JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
    jdbcTokenRepository.setDataSource(dataSource);
    // jdbcTokenRepository.setCreateTableOnStartup(true);
    return jdbcTokenRepository;
}
```

配置记住用户功能

```java
// 记住用户
http.rememberMe().tokenRepository(persistentTokenRepository())
        .tokenValiditySeconds(60)
        .userDetailsService(userDetailsService());
```

前端登录页面添加checkbox，name必须为remember-me

```html
<input type="checkbox" name="remember-me">记住我
```

### CSRF

[csrf](https://blog.csdn.net/freeking101/article/details/86537087)

跨站请求伪造（Cross-site request forgery）

Spring Security CSRF会针对PATCH，POST，PUT，Delete方法进行防护

开启csrf

在登录页添加隐藏项，需要配合Themyleaf获取token

```html
<input type="hidden" th:name="{_csrf.parameterName}" th:value="${_csrf.token}"/>
```

## 前后端分离

![图 3](https://s2.loli.net/2023/03/07/zy4MTF2BWnm1uH3.png)  

### RBAC权限模型

Role-Based Access Control

数据库权限，基于角色的权限控制模型，menu表

![图 4](https://s2.loli.net/2023/03/09/VRos81jza7BKZ2D.png)  

### 核心代码实现

参考IDEA测试代码security-test

### 登录

发起登录请求，LoginServiceImpl处理登录

```java
@Override
public ResponseResult login(DefUser user) {
    // 1.经过UsernamePasswordAuthentication
    // 拿到登录的用户名和密码
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
    // 2.调用ProviderManager的authenticate方法进行认证
    // 3.内部再调用UserDetailsService的loadUserByUsername获取用户信息和权限信息，返回UserDetail对象
    // 4.PasswordEncoder验证密码，正确则封装权限到Authentication
    Authentication authenticate = authenticationManager.authenticate(authenticationToken);
    if (Objects.isNull(authenticate)) {
        throw new UsernameNotFoundException("用户名或密码错误！");
    }

    // 5.查询到用户信息后根据userid生成token
    LoginUser loginUser = (LoginUser) authenticate.getPrincipal();
    String userid = loginUser.getDefUser().getId().toString();
    Map<String, Object> claims = new HashMap<>();
    claims.put("userid", userid);
    String jwt = JwtUtil.generateToken(claims);

    // redis存入LoginUser
    redisCache.setCacheObject("login:" + userid, loginUser);

    // 把token响应给前端
    Map<String, String> map = new HashMap<>();
    map.put("token", jwt);
    return new ResponseResult(200, "登陆成功", map);
}
```

自定义登录接口UserDetailServiceImpl

loadUserByUsername验证用户

```java
@Override
public UserDetails loadUserByUsername(String username) throws RuntimeException {
    // 查询用户信息
    LambdaQueryWrapper<DefUser> wrapper = new LambdaQueryWrapper<>();
    wrapper.eq(DefUser::getUsername, username);
    DefUser user = userMapper.selectOne(wrapper);

    // 判断用户是否为空
    // Objects.isNull()
    if (user == null) {
        throw new RuntimeException("用户不存在！");
    }

    // 查询数据库得到权限
    List<String> permissions = menuMapper.selectPermsByUserId(user.getId());

    // 封装UserDetail对象
    return new LoginUser(user, permissions);
}
```

### 校验

访问别的地址时，由前端封装token到请求头中

JwtAuthenticationTokenFilter过滤器校验token

```java
/**
 * 校验过滤器
 */
@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private RedisCache redisCache;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        // 获取token
        String token = httpServletRequest.getHeader("token");
        Claims claims = JwtUtil.parseToken(token);
        if (claims == null){
            // 放行
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        // 获取其中userid
        String userid = claims.get("userid").toString();
        // 根据userid从redis获取用户信息
        String redisKey = "login:" + userid;
        LoginUser loginUser = redisCache.getCacheObject(redisKey);
        if (loginUser == null) {
            throw new RuntimeException("token已失效");
        }

        // 存入SecurityContextHolder
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        // 放行
        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }
}
```

### 登出

```java
@Override
public ResponseResult logout() {
    // 获取SecurityContextHolder中的用户id
    UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
    LoginUser loginUser = (LoginUser) authentication.getPrincipal();
    Long userId = loginUser.getDefUser().getId();

    // 删除redis中的值
    redisCache.deleteObject("login:" + userId);
    return new ResponseResult(200, "注销成功");
}
```

### SecurityConfig

```java
@Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // 关闭csrf
                .csrf().disable()
                // 不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // 请求认证
                .authorizeRequests()
                // 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
                .antMatchers("/test/hello").permitAll()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();

        // 添加过滤器，注意过滤器顺序，在UsernamePasswordAuthenticationFilter之前
        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

        // 添加异常过滤器
        http.exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler);

        // 允许跨域访问
        http.cors();
    }
```

## 异常处理

[自定义异常](https://zhuanlan.zhihu.com/p/99041260)

在SpringSecurity中，如果我们在认证或者授权的过程中出现了异常会被ExceptionTranslationFilter捕获到。在ExceptionTranslationFilter中会去判断是认证失败还是授权失败出现的异常。

401 如果是**认证**过程中出现的异常会被封装成`AuthenticationException`然后调用**AuthenticationEntryPoint**对象的方法去进行异常处理。

403 ​如果是**授权**过程中出现的异常会被封装成`AccessDeniedException`然后调用**AccessDeniedHandler**对象的方法去进行异常处理。

需要自定义异常处理，我们只需要自定义AuthenticationEntryPoint和AccessDeniedHandler然后配置给SpringSecurity即可。

### 认证异常

```java
/**
 * 处理认证异常
 */
@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        ResponseResult result = new ResponseResult(HttpStatus.UNAUTHORIZED.value(), "用户认证失败，请重新登录");
        String json = JSON.toJSONString(result);
        // 处理异常
        WebUtil.renderString(response, json);
    }
}
```

### 授权异常

```java
/**
 * 处理授权异常
 * 主要是在用户在访问受保护资源时被拒绝而抛出的异常
 */
@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ResponseResult result = new ResponseResult(HttpStatus.FORBIDDEN.value(), "您的权限不足");
        String json = JSON.toJSONString(result);
        // 处理异常
        WebUtil.renderString(response, json);
    }
}
```

都需要在SecurityConfig中注册

```java
// 添加异常过滤器
http.exceptionHandling()
        .authenticationEntryPoint(authenticationEntryPoint)
        .accessDeniedHandler(accessDeniedHandler);
```

## 跨域

[SpringBoot配置Cors解决跨域请求问题](https://www.cnblogs.com/yuansc/p/9076604.html)

[用Postman调试跨域问题](https://www.jianshu.com/p/d98e3c372f16)

浏览器出于安全的考虑，使用 XMLHttpRequest对象发起 HTTP请求时必须遵守同源策略，否则就是跨域的HTTP请求，默认情况下是被禁止的。 同源策略要求源相同才能正常进行通信，即**协议、域名、端口号**都完全一致。

前后端分离项目，前端项目和后端项目一般都不是同源的，所以肯定会存在跨域请求的问题。

哪些操作不受同源策略限制

1. 页面中的链接，重定向以及表单提交是不会受到同源策略限制的；
2. 跨域资源的引入是可以的。但是JS不能读写加载的内容。如嵌入到页面中的\<script src="...">\</script>，\<img>，\<link>，\<iframe>等。
