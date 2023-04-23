---
category:
  - Spring
tag:
  - SpringBoot
---

# SpringBoot

> 定时任务shedule
> 7.18. Sending Email

[SpringBoot](https://spring.io/projects/spring-boot#learn)

- [SpringBoot](#springboot)
  - [HelloSpringBoot](#hellospringboot)
    - [项目构建](#项目构建)
    - [SpringBoot特点](#springboot特点)
      - [依赖管理](#依赖管理)
      - [自动配置](#自动配置)
    - [底层注解](#底层注解)
      - [@Configuration](#configuration)
      - [@Conditional](#conditional)
      - [@ImportResource](#importresource)
      - [@ConfigurationProperties](#configurationproperties)
    - [自动配置原理](#自动配置原理)
    - [最佳实例](#最佳实例)
  - [拓展应用](#拓展应用)
    - [devtools](#devtools)
    - [Spring Initializr](#spring-initializr)
    - [yaml配置文件](#yaml配置文件)
      - [数据类型](#数据类型)
    - [注释处理器](#注释处理器)
  - [Web](#web)
    - [资源匹配](#资源匹配)
    - [静态资源配置原理](#静态资源配置原理)
    - [请求参数处理](#请求参数处理)
      - [RESTFul风格支持](#restful风格支持)
      - [请求映射原理](#请求映射原理)
    - [传参类型](#传参类型)
    - [请求处理源码解析](#请求处理源码解析)
      - [自定义参数绑定原理（Person person)](#自定义参数绑定原理person-person)
    - [响应处理源码解析](#响应处理源码解析)
    - [视图解析与模板引擎](#视图解析与模板引擎)
      - [视图解析源码解析](#视图解析源码解析)
    - [常用功能](#常用功能)
      - [拦截器interceptor](#拦截器interceptor)
      - [文件上传](#文件上传)
      - [异常处理机制](#异常处理机制)
      - [原生组件注入](#原生组件注入)
    - [参数校验](#参数校验)
      - [对于传输对象校验](#对于传输对象校验)
      - [对于请求参数校验](#对于请求参数校验)
      - [全局数据绑定](#全局数据绑定)
      - [统一异常处理](#统一异常处理)
      - [分组校验](#分组校验)
      - [嵌套校验](#嵌套校验)
      - [集合校验](#集合校验)
      - [自定义spring validation](#自定义spring-validation)
      - [自定义 message](#自定义-message)
      - [编程式校验](#编程式校验)
      - [快速失败](#快速失败)
  - [Spring任务](#spring任务)
    - [启动和销毁](#启动和销毁)
    - [定时任务](#定时任务)
      - [@Scheduled](#scheduled)
      - [Quartz](#quartz)
      - [可视化任务管理-动态任务](#可视化任务管理-动态任务)
    - [Spring异步任务@Async](#spring异步任务async)
  - [数据访问](#数据访问)
    - [自定义使用Druid数据源](#自定义使用druid数据源)
    - [整合mybatis](#整合mybatis)
    - [MybatisPlus](#mybatisplus)
    - [redis](#redis)
    - [JUnit 5](#junit-5)
  - [SpringBoot Actuator指标监控](#springboot-actuator指标监控)
  - [Swagger2](#swagger2)
    - [Swagger2 配置](#swagger2-配置)
    - [创建接口](#创建接口)
  - [日志管理](#日志管理)
  - [profile](#profile)
    - [外部化配置](#外部化配置)
  - [自定义starter](#自定义starter)
  - [SpringBoot启动过程](#springboot启动过程)

## HelloSpringBoot

在maven项目添加springboot

添加parent标签

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.12.RELEASE</version>
</parent>
```

添加web依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

主类run

```java
@SpringBootApplication
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }
}
```

编写controller

```java
@Controller
public class HelloController {

    @RequestMapping("/hello")
    @ResponseBody
    public String hello() {
        return "Spring boot 你好！";
    }
}
```

配置文件application.properties

[application.properties](https://docs.spring.io/spring-boot/docs/2.5.0/reference/html/application-properties.html)

```properties
server.port=8888
```

打包为jar包，可以直接运行，不需要再配置其他

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

注意点：

- cmd快速编辑模式（不过应该都是部署在linux上啊）

fat jar

### 项目构建

- 使用<https://start.spring.io/>构建springboot项目包，存在访问不稳定构建失败等问题
- 使用<https://start.aliyun.com/>构建springboot项目包，版本不是特别新
- 使用 Spring Boot 中文社区搭建的 <https://start.springboot.io/>
- Maven 手动构建

> 可以先构建然后修改parent版本

### SpringBoot特点

#### 依赖管理

父项目做依赖管理

spring-boot-starter-parent --->

spring-boot-dependencies里面的properties标签几乎声明了所有的依赖版本

导入starter场景启动器，无需关注版本，自动版本仲裁，可以自己修改版本

重写properties标签里的版本标签就会覆盖版本

springboot场景依赖名称：

- 官方依赖 `spring-boot-starter-\*`
- 第三方 `\*-spring-boot-starter`

[官方依赖](https://docs.spring.io/spring-boot/docs/2.5.0/reference/html/using.html#using.build-systems.starters)

#### 自动配置

配置Tomcat

配置SpringMvc

配置Web

```java
// 返回ioc容器
ConfigurableApplicationContext context = SpringApplication.run(MainApplication.class, args);

// 查看容器里的组件，返回数组
context.getBeanDefinitionNames()
```

默认包扫描：主程序 `MainApplication` 当前以及子包

指定包扫描 @SpringBootApplication(scanBasePackages="com.boot")

@SpringBootApplication为合成注解，相当于

- @SpringBootConfiguration
- @EnableAutoConfiguration
- @ComponentScan("com.boot")

配置默认值映射到一个Properties类

配置按条件加载

### 底层注解

#### @Configuration

告诉springboot这是一个配置类，在里边注册@Bean。配置类本身也是一个bean，是个代理对象

```java
MyConfig bean = context.getBean(MyConfig.class)

User u1 = bean.user();
User u2 = bean.user();

User u3 = context.getBean(User.class);

// 三者相等
```

代理bean的方法 @Configuration(proxyBeanMethods = true) 默认true，代理对象调用方法。springboot总会检查这个组件是否在容器中，保持组件单实例。改为false则不是代理对象

- full(true) 和 lite(false) 模式（感觉有点像单例和原型）

true解决**组件依赖**，利用代理对象实现

false不会检查存在，都会新建bean，启动快

`@Import` 导入强制注册为bean，也可以引入config，以及自定义的selector

```java
@Import(User.class)

@Import(第三方.class)

@Import(MyConfig.class)

@Import(MySelector.class)
```

#### @Conditional

@Conditional 条件装配，有很多派生注解

- @ConditionalOnBean name, class当有这个名字的bean才注册bean，可以加在类上
- @ConditionalOnMissingBean
- @ConditionalOnClass
- @ConditionalOnMissingClass

#### @ImportResource

@ImportResource 原生配置文件引入

用法： @ImportResource("classpath:beans.xml") 引入xml配置文件

#### @ConfigurationProperties

properties文件配置绑定

```properties
user.name=john
user.age=19
```

```java
// prefix alias for value
// 只有容器中的组件才可以
@ConfigurantionProperties(prefix = "user")
@Component
public class User{
    private String name;
    private Integer age;
}
```

另一种绑定方法，不需要显式注册成为容器，@EnableConfigurationProperties(User.class) 写在config类上。

配合User类上@ConfigurantionProperties(prefix = "user")实现配置绑定

实际上会自动注册为组件

> 区别于@Value

### 自动配置原理

@SpringBootApplication拆解

1.@SpringBootConfiguration代表是一个配置类

2.@ComponentScan指定扫描

3.@EnableAutoConfiguration拆解

```java
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {

}
```

3.1@AutoConfigurationPackage 自动配置包

```java
// Registrar是内部static类用于批量注册组件
@Import(AutoConfigurationPackages.Registrar.class)
public @interface AutoConfigurationPackage {

}
```

AutoConfigurationPackages.Registrar.class --->

```java
static class Registrar implements ImportBeanDefinitionRegistrar, DeterminableImports {

    @Override
    public void registerBeanDefinitions(AnnotationMetadata metadata, BeanDefinitionRegistry registry) {
        // new PackageImports(metadata).getPackageNames()包名
        // 把某一个包下的组件批量注册
        register(registry, new PackageImports(metadata).getPackageNames().toArray(new String[0]));
    }
}
```

3.2@Import(AutoConfigurationImportSelector.class)

```java
public class AutoConfigurationImportSelector implements DeferredImportSelector, BeanClassLoaderAware, ResourceLoaderAware, BeanFactoryAware, EnvironmentAware, Ordered {

    @Override
    public String[] selectImports(AnnotationMetadata annotationMetadata) {
        if (!isEnabled(annotationMetadata)) {
            return NO_IMPORTS;
        }
        // getAutoConfigurationEntry(annotationMetadata);
        // 给容器批量导入一些组件
        AutoConfigurationEntry autoConfigurationEntry = getAutoConfigurationEntry(annotationMetadata);
        return StringUtils.toStringArray(autoConfigurationEntry.getConfigurations());
    }
}
```

getAutoConfigurationEntry --->

```java
protected AutoConfigurationEntry getAutoConfigurationEntry(AnnotationMetadata annotationMetadata) {
    if (!isEnabled(annotationMetadata)) {
        return EMPTY_ENTRY;
    }
    AnnotationAttributes attributes = getAttributes(annotationMetadata);
    // getCandidateConfigurations(annotationMetadata, attributes);
    // 获取候选配置
    List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes);
    configurations = removeDuplicates(configurations);
    Set<String> exclusions = getExclusions(annotationMetadata, attributes);
    checkExcludedClasses(configurations, exclusions);
    configurations.removeAll(exclusions);
    configurations = getConfigurationClassFilter().filter(configurations);
    fireAutoConfigurationImportEvents(configurations, exclusions);
    return new AutoConfigurationEntry(configurations, exclusions);
}
```

getCandidateConfigurations --->

```java
protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
    // SpringFactoriesLoader.loadFactoryNames
    // 利用工厂加载 Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) 得到所有组件
    List<String> configurations = SpringFactoriesLoader.loadFactoryNames(getSpringFactoriesLoaderFactoryClass(),
            getBeanClassLoader());
    Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you "
            + "are using a custom packaging, make sure that file is correct.");
    return configurations;
}
```

loadSpringFactories --->

```java
private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
    MultiValueMap<String, String> result = (MultiValueMap)cache.get(classLoader);
    if (result != null) {
        return result;
    } else {
        try {
            // META-INF/spring.factories
            Enumeration<URL> urls = classLoader != null ? classLoader.getResources("META-INF/spring.factories") : ClassLoader.getSystemResources("META-INF/spring.factories");
            MultiValueMap<String, String> result = new LinkedMultiValueMap();

            while(urls.hasMoreElements()) {
                URL url = (URL)urls.nextElement();
                UrlResource resource = new UrlResource(url);
                Properties properties = PropertiesLoaderUtils.loadProperties(resource);
                Iterator var6 = properties.entrySet().iterator();

                while(var6.hasNext()) {
                    Map.Entry<?, ?> entry = (Map.Entry)var6.next();
                    String factoryTypeName = ((String)entry.getKey()).trim();
                    String[] var9 = StringUtils.commaDelimitedListToStringArray((String)entry.getValue());
                    int var10 = var9.length;

                    for(int var11 = 0; var11 < var10; ++var11) {
                        String factoryImplementationName = var9[var11];
                        result.add(factoryTypeName, factoryImplementationName.trim());
                    }
                }
            }

            cache.put(classLoader, result);
            return result;
        } catch (IOException var13) {
            throw new IllegalArgumentException("Unable to load factories from location [META-INF/spring.factories]", var13);
        }
    }
}
```

spring.factories --->

```factories
# spring一启动就需要加载的所有自动配置类
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
...
```

getBeanDefinitionCount()

默认全部加载，但是按照条件装配 @ConditionalOnXXX 规则，最终会按需加载

@Bean方法传入的参数不需要@Autowired，会在容器中寻找

绑定 XXXProperties

```java
@EnableConfigurationProperties(XXXProperties.class)
public class XXXAutoConfiguration {
    private XXXProperties xxxProperties;
    XXXAutoConfiguration(XXXProperties xxxProperties){
        this.xxxProperties = xxxProperties;
    }
}
```

修改配置：

- @Bean覆盖
- properties

加载顺序 XXXAutoConfiguration ---> 加载组件配置 ---> 绑定XXXProperties ---> application.prpperties

### 最佳实例

1. 引入场景依赖
2. 查看自动配置了什么（选做）
   - 自己分析
   - 配置文件 application.properties 中 debug=true 开启自动配置报告， 打印列表 Negative 为不生效配置
3. 是否需要修改
   - 参照文档修改配置项
   - 自定义加入或者替换组件
   - 自定义器 XXXCustomizer

自定义banner

## 拓展应用

### devtools

ReStart

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

快速装载修改，只需要 build 也可以按`ctrl` + `f9`

如果需要Reload需要其他依赖

### Spring Initializr

快速创建springboot项目

![图 2](https://s2.loli.net/2023/01/29/7FHBL4lPVC5oTDd.png)  

### yaml配置文件

- key: value
- 缩进表示层级关系
- 缩进只允许空格，不允许tab
- 缩进空格数不重要，只要同层级左对齐即可
- \#表示注释
- ''内容会被转义输出字符串，""不会

#### 数据类型

字面量：单个的不可再分的值 String boolean Date Integer int

对象：键值对 map object

```yaml
# 行内写法 
k: {k1: v1,k2: v2}
# 多行写法
K: 
  k1: v1
  k2: v2
```

数组: array list set

```yaml
# 行内写法 
k: [k1,k2]
# 多行写法
K: 
 - v1
 - v2
```

两个配置读取冲突与合并，先读properties再yaml

> yaml引用pom文件的内容
> `@project.artifactId@`

### 注释处理器

configuration-processor，自己写的类注释提示

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

打包排除

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            
            <configuration>
                <excludes>
                    <exclude>
                        <dependency>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-configuration-processor</artifactId>
                            <optional>true</optional>
                        </dependency>
                    </exclude>
                </excludes>
            </configuration>

        </plugin>
    </plugins>
</build>
```

## Web

SpringMvc自动配置概览

- 内容协商解析器和BeanName视图解析器
- 静态资源
- 自动注册 Converter，GenericConverter，Formatter
- 支持 HttpMessageConverters (内容协商)
- 自动注册 MessageCodesResolver (国际化)
- 静态 index.html 支持
- 自定义 Favicon
- 自动使用 ConfigurableWebBindingInitializer (DataBinder负责将请求数据绑定到JavaBean)

### 资源匹配

静态资源目录类路径 resources 下的 /static，/resources，/public，/META-INF/resources

静态资源默认 /**，修改匹配

访问匹配顺序先看controller，再静态，然后404

加静态资源前缀，但是**其他资源映射有问题**，访问index.html也要加/res

```yaml
spring:
  mvc:
    static-path-pattern: /res/**
```

访问：当前项目 + static-path-pattern + 静态资源名

localhost:8080/res/doge.png

自定义静态资源目录

```yaml
spring:
  resources:
    static-locations: classpath:/haha/
```

> 提示：新版本改为了spring.web.resources.static-locations

webjars映射

Welcome Page 欢迎页功能

默认 index.html 放静态资源目录，如果加了前缀需要增加前缀访问，测试2.7.6依然存在这个问题

Custome Favicon 自定义图标 favicon.ico

### 静态资源配置原理

WebMvcAutoConfiguration

```java
@AutoConfiguration(after = { DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class, ValidationAutoConfiguration.class })
@ConditionalOnWebApplication(type = Type.SERVLET)
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10)
public class WebMvcAutoConfiguration {}
```

查看自动配置类中有一个静态类 WebMvcAutoConfigurationAdapter

```java
@Configuration(proxyBeanMethods = false)
@Import(EnableWebMvcConfiguration.class)
@EnableConfigurationProperties({ WebMvcProperties.class, WebProperties.class })
@Order(0)
public static class WebMvcAutoConfigurationAdapter implements WebMvcConfigurer, ServletContextAware {

    // 从容器中取出其他配置器
    // ResourceHandlerRegistrationCustomizer
        public WebMvcAutoConfigurationAdapter(WebProperties webProperties, 
                WebMvcProperties mvcProperties,
                ListableBeanFactory beanFactory, ObjectProvider<HttpMessageConverters> messageConvertersProvider,
                ObjectProvider<ResourceHandlerRegistrationCustomizer> resourceHandlerRegistrationCustomizerProvider,
                ObjectProvider<DispatcherServletPath> dispatcherServletPath,
                ObjectProvider<ServletRegistrationBean<?>> servletRegistrations) {
        this.resourceProperties = webProperties.getResources();
        this.mvcProperties = mvcProperties;
        this.beanFactory = beanFactory;
        this.messageConvertersProvider = messageConvertersProvider;
        this.resourceHandlerRegistrationCustomizer = resourceHandlerRegistrationCustomizerProvider.getIfAvailable();
        this.dispatcherServletPath = dispatcherServletPath;
        this.servletRegistrations = servletRegistrations;
        this.mvcProperties.checkConfiguration();
    }


    // 资源处理的默认规则
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if (!this.resourceProperties.isAddMappings()) {
            logger.debug("Default resource handling disabled");
            return;
        }
        // 下面两个方法
        // 处理webjars资源
        addResourceHandler(registry, "/webjars/**", "classpath:/META-INF/resources/webjars/");

        // this.mvcProperties.getStaticPathPattern()资源匹配前缀
        addResourceHandler(registry, this.mvcProperties.getStaticPathPattern(), (registration) -> {
            // this.resourceProperties.getStaticLocations()四个静态资源位置
            registration.addResourceLocations(this.resourceProperties.getStaticLocations());
            if (this.servletContext != null) {
                ServletContextResource resource = new ServletContextResource(this.servletContext, SERVLET_LOCATION);
                registration.addResourceLocations(resource);
            }
        });
    }

    private void addResourceHandler(ResourceHandlerRegistry registry, String pattern, String... locations) {
        addResourceHandler(registry, pattern, (registration) -> registration.addResourceLocations(locations));
    }

    private void addResourceHandler(ResourceHandlerRegistry registry, String pattern, Consumer<ResourceHandlerRegistration> customizer) {
        if (registry.hasMappingForPattern(pattern)) {
            return;
        }
        ResourceHandlerRegistration registration = registry.addResourceHandler(pattern);
        customizer.accept(registration);
        registration.setCachePeriod(getSeconds(this.resourceProperties.getCache().getPeriod()));
        registration.setCacheControl(this.resourceProperties.getCache().getCachecontrol().toHttpCacheControl());
        registration.setUseLastModified(this.resourceProperties.getCache().isUseLastModified());
        customizeResourceHandlerRegistration(registration);
    }
}
```

WebMvcProperties.class ---> spring.mvc

WebProperties ---> spring.web

> 以前版本是 ResourceProperties ---> spring.resources
> 现在WebProperties内部有一个Resources类

欢迎页的问题 在WebMvcAutoConfiguration内部static class EnableWebMvcConfiguration

```java
// HandlerMapping 处理器映射，保存了每一个Handler能处理哪些请求

@Bean
public WelcomePageHandlerMapping welcomePageHandlerMapping(ApplicationContext applicationContext,
        FormattingConversionService mvcConversionService, ResourceUrlProvider mvcResourceUrlProvider) {
    WelcomePageHandlerMapping welcomePageHandlerMapping = new WelcomePageHandlerMapping(
            // 破案了this.mvcProperties.getStaticPathPattern()
            new TemplateAvailabilityProviders(applicationContext), applicationContext, getWelcomePage(),
            this.mvcProperties.getStaticPathPattern());
    welcomePageHandlerMapping.setInterceptors(getInterceptors(mvcConversionService, mvcResourceUrlProvider));
    welcomePageHandlerMapping.setCorsConfigurations(getCorsConfigurations());
    return welcomePageHandlerMapping;
}
```

WelcomePageHandlerMapping --->

```java
WelcomePageHandlerMapping(TemplateAvailabilityProviders templateAvailabilityProviders,
        ApplicationContext applicationContext, Resource welcomePage, String staticPathPattern) {
    // 要用欢迎页 必须/**
    if (welcomePage != null && "/**".equals(staticPathPattern)) {
        logger.info("Adding welcome page: " + welcomePage);
        setRootViewName("forward:index.html");
    }
    // controller /**
    else if (welcomeTemplateExists(templateAvailabilityProviders, applicationContext)) {
        logger.info("Adding welcome page template: index");
        setRootViewName("index");
    }
}

```

### 请求参数处理

请求映射 @RequestMapping

获取配置定义的值

```java
@Value("${test.name}")
String name;
```

#### RESTFul风格支持

HiddenHttpMethodFilter 手动开启

`spring.mvc.hiddenmethod.filter.enabled=true` 默认false

```java
@Bean
@ConditionalOnMissingBean(HiddenHttpMethodFilter.class)
@ConditionalOnProperty(prefix = "spring.mvc.hiddenmethod.filter", name = "enabled")
public OrderedHiddenHttpMethodFilter hiddenHttpMethodFilter() {
    return new OrderedHiddenHttpMethodFilter();
}
```

HiddenHttpMethodFilter --->

```java
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    HttpServletRequest requestToUse = request;
    if ("POST".equals(request.getMethod()) && request.getAttribute("javax.servlet.error.exception") == null) {
        // methodParam = "_method"
        String paramValue = request.getParameter(this.methodParam);
        if (StringUtils.hasLength(paramValue)) {
            String method = paramValue.toUpperCase(Locale.ENGLISH);
            if (ALLOWED_METHODS.contains(method)) {
                // HttpMethodRequestWrapper把请求包装
                requestToUse = new HttpMethodRequestWrapper(request, method);
            }
        }
    }

    filterChain.doFilter((ServletRequest)requestToUse, response);
}

// 包装
private static class HttpMethodRequestWrapper extends HttpServletRequestWrapper {
    private final String method;

    public HttpMethodRequestWrapper(HttpServletRequest request, String method) {
        super(request);
        this.method = method;
    }

    public String getMethod() {
        return this.method;
    }
}
```

put delete 表单发送

```html
<form action="/user" method="post">
    <input name="_method" type="hidden" value="PUT"/>
</form>
```

原理：

- post请求带上"_method"
- HiddenHttpMethodFilter拦截
- 获取_method携带参数
- request包装
- 过滤器放行

客户端直接发送如postman, 不需要开启 HiddenHttpMethodFilter

自定义"_method"

#### 请求映射原理

![图 1](https://s2.loli.net/2022/12/29/1WmcANj89FnY4Jt.png)  

DispatcherServlet ---> doDispatch

```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
    HttpServletRequest processedRequest = request;
    HandlerExecutionChain mappedHandler = null;
    boolean multipartRequestParsed = false;

    WebAsyncManager asyncManager = WebAsyncUtils.getAsyncManager(request);

    try {
        ModelAndView mv = null;
        Exception dispatchException = null;

        try {
            processedRequest = checkMultipart(request);
            multipartRequestParsed = (processedRequest != request);

            // 决定哪个handler(controller方法)处理当前请求
            // getHandler
            mappedHandler = getHandler(processedRequest);
            if (mappedHandler == null) {
                noHandlerFound(processedRequest, response);
                return;
            }

            // 为当前handler寻找adapter
            HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

            // Process last-modified header, if supported by the handler.
            String method = request.getMethod();
            boolean isGet = HttpMethod.GET.matches(method);
            if (isGet || HttpMethod.HEAD.matches(method)) {
                long lastModified = ha.getLastModified(request, mappedHandler.getHandler());
                if (new ServletWebRequest(request, response).checkNotModified(lastModified) && isGet) {
                    return;
                }
            }

            if (!mappedHandler.applyPreHandle(processedRequest, response)) {
                return;
            }

            // Actually invoke the handler.
            mv = ha.handle(processedRequest, response, mappedHandler.getHandler());

            if (asyncManager.isConcurrentHandlingStarted()) {
                return;
            }

            applyDefaultViewName(processedRequest, mv);
            mappedHandler.applyPostHandle(processedRequest, response, mv);
        }
        catch (Exception ex) {
            dispatchException = ex;
        }
        catch (Throwable err) {
            // As of 4.3, we're processing Errors thrown from handler methods as well,
            // making them available for @ExceptionHandler methods and other scenarios.
            dispatchException = new NestedServletException("Handler dispatch failed", err);
        }
        processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
    }
    catch (Exception ex) {
        triggerAfterCompletion(processedRequest, response, mappedHandler, ex);
    }
    catch (Throwable err) {
        triggerAfterCompletion(processedRequest, response, mappedHandler,
                new NestedServletException("Handler processing failed", err));
    }
    finally {
        if (asyncManager.isConcurrentHandlingStarted()) {
            // Instead of postHandle and afterCompletion
            if (mappedHandler != null) {
                mappedHandler.applyAfterConcurrentHandlingStarted(processedRequest, response);
            }
        }
        else {
            // Clean up any resources used by a multipart request.
            if (multipartRequestParsed) {
                cleanupMultipart(processedRequest);
            }
        }
    }
}
```

HandlerMapping 处理器映射

- RequestMappingHandlerMapping 保存项目所有@ReRequestMapping和handler映射规则
- WelcomePageHandlerMapping
- BeanNameUrlHandlerMapping
- RouterFunctionMapping
- SimpleUrlHandlerMapping

放在WebMvcAutoConfiguration

![图 3](https://s2.loli.net/2023/01/30/bMjuwTx9K8SJge5.png)  

自定义HandlerMapping

### 传参类型

普通参数和基本注解

![图 2](https://s2.loli.net/2022/12/29/DueFMQSldECzabJ.png)  

注解：

- @RequestParam("user") String user 请求参数映射，/xxxx?user=xxx&&
- @PathVariable("id") Integer id 获取路径变量，配合 @GetMapping("/obj/{id}")
  - /obj/{id}/owner/{name}两个路径变量可以封装到Map\<String, String>
- @RequestHeader("User-Agent") String ua 获取请求头信息，可以用 Map\<String, String> headers 获取全部
- @CookieValue("") Cookie cookie 获取Cookie
- @RequestBody 获取请求体，放参数里
  - postMethod(@RequestBody String content)
- @RequestAttribute
  - 在HttpServletRequest request中 request.setAttribute("k","v")
  - 请求转发通过@RequestAttribute("k") String k获取
  - 可以在HttpServletRequest原生获取request.getAttribute
  
@MatrixVariable矩阵变量，springboot默认禁用，手动开启，必须应用在路径变量中

- /cars/{path;low=34;brand=byd,audi,yd}
- 页面开发cookie禁用，session里面的内容怎么使用
  - session.set(a,b) ---> jsession ---> cookie ---> 请求携带
  - url重写：/abc;jsessionid=xxxx
- MyConfig implements WebMvcConfigurer
- 重写方法configurePathMatch
- 或者注入bean, WebMvcConfigurer, 在内部new对象里面重写

```java
// 重写方法
@Override
public void configurePathMatch(PathMatchConfigurer configurer) {
    UrlPathHelper urlPathHelper = new UrlPathHelper();
    // 不移除分号后面内容，使矩阵变量可以生效
    urlPathHelper.setRemoveSemicolonContent(false);
    configurer.setUrlPathHelper(urlPathHelper);
}

// 注册bean
public WebMvcConfigurer webMvcConfigurer(){
    return new WebMvcConfigurer(){
        @Override
        ...
    }
}
```

![图 4](https://s2.loli.net/2023/01/31/KH3sSW8aV7uIwJv.png)  

### 请求处理源码解析

DispatcherServlet ---> doDispatch方法

HandlerAdapter

- RequestMappingHandlerAdapter
- HandlerFunctionAdapter
- HttpRequestHandlerAdapter
- SimpleControllerHandlerAdapter

执行目标方法 invokeHandlerMethod 确定方法参数的每一个值

参数解析器 argumentResolvers 先检查是否支持解析，然后执行解析

返回值处理器 returnValueHandlers

servletAPI 原生方法

复杂参数

将所有数据放在ModelAndViewContainer

#### 自定义参数绑定原理（Person person)

自定义类型参数封装 POJO

ServletModelAttributeProcessor

WebDataBinder binder = binderFactory.createBinder(webRequest, atribute, name) web数据绑定器，将请求参数的值绑定到指定的javaBean里面

利用它里面的Converters将请求数据转成指定类型数据。再次封装到javabean里

bindRequestParameters

GenericConversionService

自定义Conveter：

在配置类重写addFormatters(FormatterRegistry registry)

```java
@Override
public void addFormatters(FormatterRegistry registry) {
    // 原类型String转为目标类型
    registry.addConverter(new Converter<Object1, Object2>() {
        @Override
        public Object2 convert(Object1 source) {
            // 转换方法
            return null;
        }
    });
}
```

request域放数据（request.setAttribute） Map，Model，

### 响应处理源码解析

响应json

```xml
<dependency>
    <!-- 包含jackson相关依赖 -->
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-json</artifactId>
    <version>2.5.0</version>
    <scope>compile</scope>
</dependency>
```

返回值解析器 returnValueHandlers 原理：

1. 判断是否支持这种类型返回值 supportReturnType
2. 调用 handleReturnValue 进行处理
3. RequestResponseBodyMethodProcessor 处理 @ResponseBody
   1. 利用MessageConverters进行处理 将数据写为json
      1. 内容协商（浏览器默认会以请求头的方式告诉服务器接收什么类型accept）
      2. 服务器
      3.

支持的返回值类型：

- ModelAndView
- Model
- View
- ResponseEntity
- ResponseBodyEmitter
- StreamingResponseBody
- HttpEntity
- HttpHeaders
- Callable
- DeferredResult
- ListenableFuture
- CompletionStage
- WebAsyncTask
- 有 @ModelAttribute 注解
- 有 @ResponseBody 注解 ---> RequestResponseBodyMethodProcessor

HttpMessageConverters 消息转换器原理

是否支持将此对象转为MediaType类型，如Person ---> json

默认的MessageConverter

内容协商原理，根据客户端接收能力不同，返回不同数据

只需要修改accept: application/json;

1. 判断当前响应头中是否已经有确定的媒体类型MediaType
2. 获取客户端（postman，浏览器）支持接收的内容类型。（获取客户端accept请求头）
   - contentNegotiationManager 内容协商管理器 默认使用基于请求头的策略
   - ContentNegotiationStrategy
   - format=xml参数 基于请求参数的内容协商 配置spring.contentnegotiation.favor-parameter=true
3. 遍历循环所有当前MessageConverter
4. 找到支持的converter
5. 客户端需要与服务端能力
6. 进行内容最佳匹配，浏览器发送接收权重
7. 转化

基于请求参数的内容协商

MessageConverter:

1. @ResponseBody 调用 RequestResponseBodyMethodProcessor 处理
2. 处理方法的返回值通过 MessageConverter处理
3. 内容协商找最佳处理

自定义 extendMessageConverter 添加

implements HttpMessageConverters 实现自定义转换方法（MediaType.parseMediaTypes("application/my-fun")

自定义参数format

![图 5](https://s2.loli.net/2023/02/03/nYtRUe7HsqgpJCL.png)  

```java
configureContentNegotiation(){
    Map<String, MediaType>
    new parameterContentNegotiationStrategy
    // 注册策略
}
```

添加Header

### 视图解析与模板引擎

thymeleaf

构建后台管理

抽取页面模板fragment

包括js, css都可以

#### 视图解析源码解析

视图处理方式：转发、重定向、自定义视图

1. 所有数据放在ModelAndViewContainer里面，包括数据和视图地址
2. 方法的参数是一个自定义类型对象，把他重新放到ModelAndViewContainer
3. 任何目标方法执行完成以后都会返回ModelAndView
4. processDispatchResult 处理派发结果，页面应该如何响应
   1. render(mv, request, response);进行页面渲  染逻辑
      1. 所有视图解析器尝试是否能根据当前返回值得到View对象
      2. 得到了 redirect:/main.html --> Themyleaf new RedirectView()
      3. contentnegotiationViewResolver 里面包含所有的视图解析器
      4. 视图调用render方法

### 常用功能

#### 拦截器interceptor

LoginInterceptor implements HandlerInterceptor

HandlerInterceptor：

afterCompletion postHandle preHandle

新建一个config类实现WebMvcConfigurer接口，在里面重写addInterceptor方法添加拦截器

```java
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/login","/static/**");
    }
}
```

静态资源放行

拦截重定向

request.sendRedirect

转发

request.addAttribute

request.getRequestsDispatcher

拦截器原理：

1. 根据当前请求，找到HandlerExcutionChain
2. 先来**顺序**执行所有拦截器的preHandle方法
   1. 返回true放行往下执行
   2. false触发根据倒序after方法
3. 如果任何一个拦截器返回false，直接跳出不执行目标方法
4. 所有返回true

#### 文件上传

前端多文件上传\<input>里加multiple

单文件上传 @RequestPart("filename") MultipartFile file1，多文件上传MultipartFile[]接收

file1的方法获取上传文件信息

储存到服务器

修改上传大小自动配置

**上传**源码解析 MultipartAutoConfiguration

自动配置好了 StandardServletMultipartResolver 文件上传解析器

1. 使用文件上传解析器判断（isMultipart）并封装（resolveMultipart，返回MultipartHttpServletRequest）文件上传请求
2. 参数解析器来解析请求中的文件内容封装成MultipartFile
3. 将request中的文件信息封装为Map\<String, MultipartFile>

FileCopyUtils文件复制工具类

#### 异常处理机制

默认情况下/error处理所有错误的映射

对于客户端返回json包含错误信息，浏览器端响应错误页面

自定义异常页面/templates/error/404.html(5xx.html)

json

**异常处理**源码解析

自己处理异常

- 400
- 404
- 502

GlobalExceptionHandler

@ExceptionHandler(ArithmeticException.class)

自定义异常页面

@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "用户数量太多")

#### 原生组件注入

使用**原生组件**servlet, filter, listener

- servlet:

我的servlet@WebServlet(urlPattern = "/")

主配置类@ServletComponentScan(package = "")

直接响应，未经过spring的拦截器（DispatcherServlet匹配）

- filter：

@WebFilter(urlPatterns = "")

MyFilter implements Filter

- listener：

@WebListner

implements ServletContextListener

通过@Configuration注册servlet

- RegistrationBean

MyRegistConfig @Configuration

```java
@Bean
public ServletRegistrationBean myServlet(){
    MyServlet servlet = new MyServlet();
    return new ServletRegistrationBean(servlet, "/my","/my/*")
}

// FilterRegistratjionBean类似

// 保证依赖的组件是单例的
```

**DispatcherServlet**注入原理

DispatcherServletAutoConfiguration

内部类DispatcherServletRegistrationConfiguration绑定配置WebMvcProperties.class

通过ServletRegistrationBean注册

自定义的Servlet和DispatcherServlet同级，而springboot里写的请求规则属于DispatcherServlet下，所以拦截不生效

- 嵌入式servlet容器:

ServletWebServerApplicationContext启动时寻找ServletWebServerFactory

TomcatServletWebServerFactory条件装配

jetty

导入自己需要的web服务器排除tomcat

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

定制Servlet容器

XXXCustomizer

直接自定义ConfigurableServletWebServerFactory

@EnableWebMvc全面接管，静态资源，视图解析，欢迎页等全部失效，需要自己重写

implements WebMvcConfigurer

### 参数校验

[官方文档](https://docs.jboss.org/hibernate/stable/validator/reference/en-US/html_single/)

参考博客文章：

<https://www.cnblogs.com/chentianming/p/13424303.html>

<https://cloud.tencent.com/developer/article/1862260>

JSR提供的校验注解：

- @Null 被注解的元素必须为 null
- @NotNull 被注解的元素必须不为 null
- @AssertTrue 被注解的元素必须为 true
- @AssertFalse 被注解的元素必须为 false
- @Min(value) 被注解的元素必须是一个数字，其值必须大于等于指定的最小值
- @Max(value) 被注解的元素必须是一个数字，其值必须小于等于指定的最大值
- @DecimalMin(value) 被注解的元素必须是一个数字，其值必须大于等于指定的最小值
- @DecimalMax(value) 被注解的元素必须是一个数字，其值必须小于等于指定的最大值
- @Size(max=, min=) 被注解的元素的大小必须在指定的范围内
- @Digits(integer, fraction) 被注解的元素必须是一个数字，其值必须在可接受的范围内
- @Past 被注解的元素必须是一个过去的日期
- @Future 被注解的元素必须是一个将来的日期
- @Pattern(regex=,flag=) 被注解的元素必须符合指定的正则表达式

Hibernate Validator提供的校验注解：

- @NotBlank(message =) 验证字符串非 null，且长度必须大于0
- @Email 被注解的元素必须是电子邮箱地址
- @Length(min=,max=) 被注解的字符串的大小必须在指定的范围内
- @NotEmpty 被注解的字符串的必须非空
- @Range(min=,max=,message=) 被注解的元素必须在合适的范围内

Validation从 Boot 2.3 开始不再集成在 mvc 里，我们需要显式添加

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

> 注意以下几个点：
> 静态字段和属性无法验证
> 不建议对字段和随附的getter方法进行注释，因为这将导致对该字段进行两次验证?存疑

#### 对于传输对象校验

Post请求的 @RequestBody DTO对象，DTO对象字段上标注校验注解

校验通过，才会执行业务逻辑处理，不通过会封装错误代码返回，抛出 MethodArgumentNotValidException 异常

不加 @RequestBody 注解，无法绑定对应实体，校验失败抛出的则是 BindException

> @Length默认只支持String，不支持Long，Integer等需要自定义validator
> 而且限制长度同时也需要参数非空@NotNull注解，否则为空不会校验失败

#### 对于请求参数校验

@RequestParam 和 @PathVariable

必须在Controller类上标注 @Validated 注解，并在入参上声明约束注解(如@Min等)。

校验失败抛出的是ConstraintViolationException

#### 全局数据绑定

我们可以将一些公共的数据定义在添加了 @ControllerAdvice 注解的类中，这样，在每一个 Controller 的接口中，就都能够访问导致这些数据。

```java
@ControllerAdvice
public class MyGlobalExceptionHandler {

    @ModelAttribute(name = "md")
    public Map<String,Object> mydata() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("age", 99);
        map.put("gender", "男");
        return map;
    }
}
```

使用 @ModelAttribute 注解标记该方法的返回数据是一个全局数据，默认情况下，这个全局数据的 key 就是返回的变量名，value 就是方法返回值，当然开发者可以通过 @ModelAttribute 注解的 name 属性去重新指定 key。

> 如果接收两个对象，存在属性字段名相同的情况无法绑定？
> 前端直接传递

#### 统一异常处理

```java
@RestControllerAdvice
public class CommonExceptionHandler {

    /**
     * Post请求不加 @RequestBody 注解，校验失败抛出的则是 BindException
     */
    @ExceptionHandler(BindException.class)
    public Result exceptionHandler(BindException ex) {
        BindingResult bindingResult = ex.getBindingResult();
        StringBuilder sb = new StringBuilder("绑定失败：");
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            sb.append(fieldError.getField())
                    .append(": ")
                    .append(fieldError.getDefaultMessage())
                    .append(", ");
        }
        return Result.fail(sb.toString());
    }

    /**
     * 处理 @RequestBody DTO对象 验证异常
     * MethodArgumentNotValidException
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        BindingResult bindingResult = ex.getBindingResult();
        StringBuilder sb = new StringBuilder("接收数据校验失败：");
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            sb.append(fieldError.getField())
                    .append(": ")
                    .append(fieldError.getDefaultMessage())
                    .append(", ");
        }
        return Result.fail(sb.toString());
    }

    /**
     * 处理 @RequestParam 和 @PathVariable 注解参数异常
     * ConstraintViolationException
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public Result handleConstraintViolationException(ConstraintViolationException ex) {
        Set<ConstraintViolation<?>> violations = ex.getConstraintViolations();
        StringBuilder sb = new StringBuilder("请求参数校验失败：");
        for (ConstraintViolation<?> violation : violations) {
            sb.append(violation.getPropertyPath().toString().split("\\.")[1])
                    .append(": ")
                    .append(violation.getMessage())
                    .append(", ");
        }
        return Result.fail(sb.toString());
    }

}
```

> BindResult 可以紧跟在请求参数里，可以自行处理异常

#### 分组校验

多个方法需要使用同一个DTO类来接收参数，而不同方法的校验规则很可能是不一样的

所有参数都需要指定组别，不指定就是默认组

默认组，在校验实体内加入内嵌接口

```java
// groups不指定参数就是默认组
public interface Default {
}
// 拓展其他组

// 此处为在方法参数上指定组
@Validated(User.Update.class)
```

> 分组接口也是可以继承的

#### 嵌套校验

```java
@Valid
private Goods goods;

public class Goods {
    @NotNull(groups = User.Update.class)
    private String goods1;
}
```

对于引用的对象校验需要添加 @Valid 注解，如果有组别区分，引用对象内也可添加组别

#### 集合校验

请求参数为List接收时，无法对list里面的每一个元素都检验

自定义一个List

```java
@Data
public class ValidList<E> implements List<E> {
    // 使用该注解就不需要手动重新 List 中的方法了
    @Delegate
    @Valid
    public List<E> list = new ArrayList<>();
    // ...
}    
```

@Delegate，为 lombok 的注解，表示该属性的所有对象的实例方法都将被该类代理。

#### 自定义spring validation

比如定义一个检查Long类型长度的校验注解

```java
@Target({FIELD, PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LongLengthValidator.class)
@Documented
public @interface LongLength {

    long min() default 0;

    long max() default 18;

    // 调用Length的消息
    String message() default "{org.hibernate.validator.constraints.Length.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
```

验证器

```java
public class LongLengthValidator implements ConstraintValidator<LongLength, Long> {

    private static final Log LOG = LoggerFactory.make(MethodHandles.lookup());
    private Long min;
    private Long max;

    @Override
    public void initialize(LongLength parameters) {
        min = parameters.min();
        max = parameters.max();
        validateParameters();
    }

    private void validateParameters() {
        if (min < 0) {
            throw LOG.getMinCannotBeNegativeException();
        }
        if (max < 0) {
            throw LOG.getMaxCannotBeNegativeException();
        }
        if (max < min) {
            throw LOG.getLengthCannotBeNegativeException();
        }
    }

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        long length = value.toString().length();
        return length >= min && length <= max;
    }
}
```

```java
// 内部注解，同一个元素上指定多个该注解时使用
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
@Documented
public @interface List {
    Length[] value();
}
```

#### 自定义 message

？？？存疑

定义错误提示文本，在 resources 目录下新建一个 MyMessage.properties 文件，内容如下：

```properties
student.id.notnull=id 不能为空
student.name.notnull=name 不能为空
student.name.length=name 最小长度为 2 ，最大长度为 10
student.email.error=email 地址非法
student.age.error=年龄不能超过 150
```

在 SpringMVC 配置中，加载这个配置文件

```xml
<bean class="org.springframework.validation.beanvalidation.LocalValidatorFactoryBean" id="validatorFactoryBean">
    <property name="providerClass" value="org.hibernate.validator.HibernateValidator"/>
    <property name="validationMessageSource" ref="bundleMessageSource"/>
</bean>
<bean class="org.springframework.context.support.ReloadableResourceBundleMessageSource" id="bundleMessageSource">
    <property name="basenames">
        <list>
            <value>classpath:MyMessage</value>
        </list>
    </property>
    <property name="defaultEncoding" value="UTF-8"/>
    <property name="cacheSeconds" value="300"/>
</bean>
<mvc:annotation-driven validator="validatorFactoryBean"/>
```

使用配置类

```java
@Bean
public LocalValidatorFactoryBean validatorFactoryBean() {
    LocalValidatorFactoryBean factoryBean = new LocalValidatorFactoryBean();
    factoryBean.setProviderClass(HibernateValidator.class);
    factoryBean.setValidationMessageSource(bundleMessageSource());
    return factoryBean;
}

@Bean
public ReloadableResourceBundleMessageSource bundleMessageSource() {
    ReloadableResourceBundleMessageSource source = new ReloadableResourceBundleMessageSource();
    source.setBasename("classpath:validationMessage");
    source.setDefaultEncoding("UTF-8");
    source.setCacheSeconds(300);
    return source;
}
```

使用 @NotNull(message = "{notnull.msg}")

> 如何使自定义消息更加灵活呢
> 参照一下length.message

#### 编程式校验

注入javax.validation.Validator或者通过工厂类获取

```java
 ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
Validator validator = factory.getValidator();
```

#### 快速失败

Spring Validation默认会校验完所有字段，然后才抛出异常。可以通过一些简单的配置，开启Fali Fast模式，一旦校验失败就立即返回。

```java
@Bean
public Validator validator() {
    ValidatorFactory validatorFactory = Validation.byProvider(HibernateValidator.class)
            .configure()
            // 快速失败模式
            .failFast(true)
            .buildValidatorFactory();
    return validatorFactory.getValidator();
}
```

@Valid和@Validated区别

![图 1](https://s2.loli.net/2023/04/13/qFyiRgkpO36rsQz.png)  

maven多环境打包隔离

![图 1](https://s2.loli.net/2023/01/05/yIGYCt8qnPkON1d.png)  

## Spring任务

### 启动和销毁

Spring Boot 中针对系统启动任务提供了两种解决方案，分别是 CommandLineRunner 和 ApplicationRunner

```java
@Component
@Order(100)
public class MyCommandLineRunner1 implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        // 参数来自项目启动
    }
}
```

ApplicationRunner 和 CommandLineRunner 功能一致，用法也基本一致，唯一的区别主要体现在对参数的处理上，ApplicationRunner 可以接收更多类型的参数

```java
@Component
@Order(98)
public class MyApplicationRunner1 implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 获取非kv参数
        List<String> nonOptionArgs = args.getNonOptionArgs();
        System.out.println("MyApplicationRunner1>>>"+nonOptionArgs);
        // 获取key集合
        Set<String> optionNames = args.getOptionNames();
        for (String key : optionNames) {
            // 根据key获取value
            System.out.println("MyApplicationRunner1>>>"+key + ":" + args.getOptionValues(key));
        }
        // 获取所有参数
        String[] sourceArgs = args.getSourceArgs();
        System.out.println("MyApplicationRunner1>>>"+Arrays.toString(sourceArgs));
    }
}
```

### 定时任务

#### @Scheduled

项目创建成功后，添加 @EnableScheduling 注解，开启定时任务

首先使用 @Scheduled 注解开启一个定时任务。使用 cron 表达式，可以非常丰富的描述定时任务的时间。

#### Quartz

项目创建完成后，也需要添加开启定时任务的注解 @EnableScheduling

Quartz 在使用过程中，有两个关键概念，一个是JobDetail（要做的事情），另一个是触发器（什么时候做），要定义 JobDetail，需要先定义 Job，Job 的定义有两种方式：

第一种方式，直接定义一个Bean：

```java
@Component
public class MyJob1 {
    public void sayHello() {
        System.out.println("MyJob1>>>"+new Date());
    }
}
```

关于这种定义方式说两点：

1. 首先将这个 Job 注册到 Spring 容器中。
2. 这种定义方式有一个缺陷，就是无法传参。

第二种定义方式，则是继承 QuartzJobBean 并实现默认的方法：

```java
public class MyJob2 extends QuartzJobBean {
    HelloService helloService;
    public HelloService getHelloService() {
        return helloService;
    }
    public void setHelloService(HelloService helloService) {
        this.helloService = helloService;
    }
    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        helloService.sayHello();
    }
}
public class HelloService {
    public void sayHello() {
        System.out.println("hello service >>>"+new Date());
    }
}
```

和第1种方式相比，这种方式支持传参，任务启动时，executeInternal 方法将会被执行。

Job 有了之后，接下来创建类，配置 JobDetail 和 Trigger 触发器，如下：

```java
@Configuration
public class QuartzConfig {
    // JobDetail
    @Bean
    MethodInvokingJobDetailFactoryBean methodInvokingJobDetailFactoryBean() {
        MethodInvokingJobDetailFactoryBean bean = new MethodInvokingJobDetailFactoryBean();
        bean.setTargetBeanName("myJob1");
        bean.setTargetMethod("sayHello");
        return bean;
    }
    @Bean
    JobDetailFactoryBean jobDetailFactoryBean() {
        JobDetailFactoryBean bean = new JobDetailFactoryBean();
        bean.setJobClass(MyJob2.class);
        JobDataMap map = new JobDataMap();
        map.put("helloService", helloService());
        bean.setJobDataMap(map);
        return bean;
    }
    // Trigger
    @Bean
    SimpleTriggerFactoryBean simpleTriggerFactoryBean() {
        SimpleTriggerFactoryBean bean = new SimpleTriggerFactoryBean();
        bean.setStartTime(new Date());
        bean.setRepeatCount(5);
        bean.setJobDetail(methodInvokingJobDetailFactoryBean().getObject());
        bean.setRepeatInterval(3000);
        return bean;
    }
    @Bean
    CronTriggerFactoryBean cronTrigger() {
        CronTriggerFactoryBean bean = new CronTriggerFactoryBean();
        bean.setCronExpression("0/10 * * * * ?");
        bean.setJobDetail(jobDetailFactoryBean().getObject());
        return bean;
    }

    @Bean
    SchedulerFactoryBean schedulerFactoryBean() {
        SchedulerFactoryBean bean = new SchedulerFactoryBean();
        bean.setTriggers(cronTrigger().getObject(), simpleTriggerFactoryBean().getObject());
        return bean;
    }
    @Bean
    HelloService helloService() {
        return new HelloService();
    }
}
```

JobDetail 的配置有两种方式：MethodInvokingJobDetailFactoryBean 和 JobDetailFactoryBean 。1.使用 MethodInvokingJobDetailFactoryBean 可以配置目标 Bean 的名字和目标方法的名字，这种方式不支持传参。2.使用 JobDetailFactoryBean 可以配置 JobDetail ，任务类继承自 QuartzJobBean ，这种方式支持传参，将参数封装在 JobDataMap 中进行传递。

Trigger 是指触发器，Quartz 中定义了多个触发器，这里展示其中两种的用法，SimpleTrigger 和 CronTrigger 。SimpleTrigger 有点类似于前面说的 @Scheduled 的基本用法。CronTrigger 则有点类似于 @Scheduled 中 cron 表达式的用法。

#### 可视化任务管理-动态任务

### Spring异步任务@Async

## 数据访问

导入jdbc场景spring-boot-starter-data-jdbc

没有导入驱动，需要自己导入驱动如mysql-connector-java，有默认仲裁，但是如果自己版本低，可以覆盖

数据源自动配置DataSourceAutoConfiguration

事务管理器的自动配置DataSourceTransactionManagerAutoConfiguration

jdbctemplate自动配置JdbcTemplateAutoConfiguration

根据type配置对应数据源

```yaml
spring:
  datasource:
    url: jdbc:mysql://192.168.73.130:3306/book_manage
    username: root
    password: 12345678
    driver-class-name: com.mysql.cj.jdbc.Driver
```

### 自定义使用Druid数据源

[druid](https://github.com/alibaba/druid)

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>${druid.version}</version>
</dependency>
```

通过config类注册Druid数据源为bean（条件装配，容器中没有配置数据源才会使用默认的Hikari数据源）

通过**配置文件**设置数据源

然后配置绑定

```java
@ConfigurationProperties("spring.datasource")
@Bean
public DataSource dataSource() throws SQLException {
    DruidDataSource dataSource =  new DruidDataSource();
    // 开启监控功能
    dataSource.setFilters("stat");
    return dataSource;
}
```

配置Druid的监控页功能

通过代码的方式注册statViewServlet
然后开启stat监控功能

```java
@Bean
public ServletRegistrationBean<StatViewServlet> statViewServlet(){
    StatViewServlet statViewServlet = new StatViewServlet();
    return new ServletRegistrationBean<>(statViewServlet, "/druid/*");
}
```

WebStatFilter采集web-jdbc关联监控数据关联web url

```java
@Bean
public FilterRegistrationBean<WebStatFilter> webStatFilter(){
    WebStatFilter webStatFilter = new WebStatFilter();
    FilterRegistrationBean<WebStatFilter> registrationBean = new FilterRegistrationBean<WebStatFilter>(webStatFilter);
    registrationBean.setUrlPatterns(Arrays.asList("/*"));
    registrationBean.addInitParameter("exclusions","*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
    return registrationBean;
}
```

配置防火墙wall防御，原来stat上添加wall

`dataSource.setFilters("stat,wall");`

session监控和spring监控

添加登录账户和密码

```java
servletRegistrationBean.addInitParameter("loginUsername", "admin");
servletRegistrationBean.addInitParameter("loginPassword", "123456");
```

在配置文件application.properties里开启filter（因为已经绑定属性）

spring.datasource.filters=stat,wall

导入**druid使用starter**简化操作，即不需要config配置类了

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.9</version>
</dependency>
```

扩展配置项`spring.datasource.druid`

解析DruidDataSourceAutoConfigure

- DruidSpringAopConfiguration用于监控springBean
- DruidStatViewServletConfiguration用于开启监控页
- DruidWebStatFilterConfiguration
- DruidFilterConfiguration

```java
String FILTER_STAT_PREFIX = "spring.datasource.druid.filter.stat";
String FILTER_CONFIG_PREFIX = "spring.datasource.druid.filter.config";
String FILTER_ENCODING_PREFIX = "spring.datasource.druid.filter.encoding";
String FILTER_SLF4J_PREFIX = "spring.datasource.druid.filter.slf4j";
String FILTER_LOG4J_PREFIX = "spring.datasource.druid.filter.log4j";
String FILTER_LOG4J2_PREFIX = "spring.datasource.druid.filter.log4j2";
String FILTER_COMMONS_LOG_PREFIX = "spring.datasource.druid.filter.commons-log";
String FILTER_WALL_PREFIX = "spring.datasource.druid.filter.wall";
String FILTER_WALL_CONFIG_PREFIX = "spring.datasource.druid.filter.wall.config";
```

开启并配置

```yaml
spring:
  datasource:
    druid:
      filters: stat,wall
      stat-view-servlet:
        enabled: true
        login-username: admin
        login-password: 123456
        reset-enable: false
      web-stat-filter:
        enabled: true
        url-pattern: /*
        exclusions: '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*'
```

### 整合mybatis

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.3.0</version>
</dependency>
```

通过配置xml的方式使用mybatis

```yaml
mybatis:
  config-location: classpath:mybatis/mybatis-config.xml
  mapper-locations: classpath:mybatis/mapper/*.xml

```

不写配置xml写在application里使用mybatis.configuration

@EnableConfigurationProperties(MybatisProperties.class)

只要我们标注了@Mapper就会被自动扫描进来或者@MapperScan

开启驼峰名字映射

```yaml
mybatis:
  configuration:
    map-underscore-to-camel-case: true
```

返回id自增组件

在mapper类方法上加注解

@Option(useGeneratedKeys = true, keyProperty = "id")

### MybatisPlus

[MybatisPlus](https://baomidou.com/)

MybatisX插件

查看自动配置项

创建（Create）、读取（Read）、更新（Update）和删除（Delete）

Mapper接口继承BaseMapper

Service接口继承IService

Service接口实现类继承ServiceImpl\<Mapper, Entity>并实现接口

@TableField(exist = false)指定数据库中不存在而实体存在字段

@TableName指定表名

@TableId指定Id

需要配置分页插件

```java
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
    return interceptor;
}
```

MybatisPlus分页，service.page()查出分页数据

Page对象构造（当前页，展示数）

```java
Page<Book> bookPage = new Page<>(1, 2);
bookService.page(bookPage).getRecords().forEach(System.out::println);
```

![图 6](https://s2.loli.net/2023/03/02/MQyu36H1Wq9EFoC.png)  

### redis

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

Lettuce连接工厂Jedis连接工厂

自动注入了RedisTemplate\<Obj, Obj>，StringRedisTemplate\<Str, Str>使用这两个就可以操作redis

连接redis

```yaml
spring:
  redis:
    host: 192.168.73.130
    database: 0
```

修改为Jedis，导入Jedis依赖，然后配置文件指定client-type: jedis

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```

redis统计url访问**次数统计**opsForValue().increment(url)

> Filter和Interceptor的选择
> Filter是Servlet的原生组件，脱离spring也能使用
> Interceptor是spring定义的组件，可以使用spring的自动装配

做缓存

### JUnit 5

[JUnit 5](https://junit.org/junit5/)

场景依赖`spring-boot-starter-test`

从spring boot 2.2.0 版本开始引入JUnit 5

JUnit 5 = JUnit platform + **JUnit Jupiter** + JUnit Vintage

2.4已经移除自带的vintage，兼容 JUnit 4，需要手动引入vintage

@SpringBootTest注解标注测试类，然后@Test标注测试方法

- @Transactional测试完成后自动回滚
- @DisplayName("")标注名称
- @BeforeEach每一个测试方法运行之前都要运行标注的方法  @BeforeAll所有测试之前运行一次，这个注解必须标注方法为static
- @AfterEach  @AfterAll
- @Disabled禁用
- @Timeout(value = 5, unit = TimeUnit.SECONDS)超时则不通过

**assertions断言**，断定一定发生，没发生则出现问题\

简单断言Assertions.assertEquals(a, b);以及一些判断相等的方法

组合断言assertAll

异常断言assertThrows

超时断言

快速失败fail("")

前置条件assumption假设

嵌套测试，测试类内部嵌套class加注解@Nested外层的test不能驱动内层的before，内层的test可以驱动外层的before

参数化测试@ParameterizedTest与@ValueSource(ints = {1, 2, 3, 4, 5})

从junit4转为junit5的[注意事项](https://junit.org/junit5/docs/current/user-guide/#migrating-from-junit4)

## SpringBoot Actuator指标监控

Actuator

引入场景依赖

```xml
<dependency>
    <groupId>org.springframework.boot </groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

监控端点endpoint，监控端点的暴露JMX，WEB

<http://localhost:8080/actuator>

默认开启所有监控端点并以web的方式暴露出来

```yaml
management:
  endpoints:
    enabled-by-default: true
    web:
      exposure:
        include: '*'
```

- **Health** 监控健康状况

配置health显示详细信息

```yaml
management: 
  endpoint:
    health:
      show-details: always
```

- **Metrics** 运行时指标，详细的、层级的、空间指标信息

- **Loggers** 日志记录

关闭默认开启所有端口，暴露需要的端口，隐藏不需要的端口，独立通过endpoint开启

```yaml
endpoint:
  metrics:
    enable: true
```

jconsole

![图 7](https://s2.loli.net/2023/03/03/priLuQ9DWdsozqY.png)  

定制Endpoint

```java
@Component
public class MyHealthIndicator extends AbstractHealthIndicator {
    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {
        // 检查逻辑
        if (1 == 1) {
            builder.up();
        } else {
            // builder.down();
            builder.status(Status.DOWN);
        }

        builder.withDetail("code", 666);
    }
}
```

显示结果

```json
"my": {
    "status": "UP",
    "details": {
    "code": 666
    }
},
```

自定义info

InfoContributor

定制Metrics信息

可视化界面admin server

需要创建server端和client端

## Swagger2

### Swagger2 配置

Swagger2 的配置也是比较容易的，在项目创建成功之后，只需要开发者自己提供一个 Docket 的 Bean 即可，如下：

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .pathMapping("/")
                .select()
                .apis(RequestHandlerSelectors.basePackage("org.javaboy.controller"))
                .paths(PathSelectors.any())
                .build().apiInfo(new ApiInfoBuilder()
                        .title("SpringBoot整合Swagger")
                        .description("SpringBoot整合Swagger，详细信息......")
                        .version("9.0")
                        .contact(new Contact("啊啊啊啊","blog.csdn.net","aaa@gmail.com"))
                        .license("The Apache License")
                        .licenseUrl("http://www.javaboy.org")
                        .build());
    }
}
```

这里提供一个配置类，首先通过 @EnableSwagger2 注解启用 Swagger2 ，然后配置一个 Docket Bean，这个 Bean 中，配置映射路径和要扫描的接口的位置，在 apiInfo 中，主要配置一下 Swagger2 文档网站的信息，例如网站的 title，网站的描述，联系人的信息，使用的协议等等。

### 创建接口

```java
@RestController
@Api(tags = "用户管理相关接口")
@RequestMapping("/user")
public class UserController {
    
    @PostMapping("/")
    @ApiOperation("添加用户的接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "username", value = "用户名", defaultValue = "李四"),
            @ApiImplicitParam(name = "address", value = "用户地址", defaultValue = "深圳", required = true)
    })
    public RespBean addUser(String username, @RequestParam(required = true) String address) {
        return new RespBean();
    }
    
    @GetMapping("/")
    @ApiOperation("根据id查询用户的接口")
    @ApiImplicitParam(name = "id", value = "用户id", defaultValue = "99", required = true)
    public User getUserById(@PathVariable Integer id) {
        User user = new User();
        user.setId(id);
        return user;
    }

    @PutMapping("/{id}")
    @ApiOperation("根据id更新用户的接口")
    public User updateUserById(@RequestBody User user) {
        return user;
    }
}
```

1. @Api 注解可以用来标记当前 Controller 的功能。
2. @ApiOperation 注解用来标记一个方法的作用。
3. @ApiImplicitParam 注解用来描述一个参数，可以配置参数的中文含义，也可以给参数设置默认值，这样在接口测试的时候可以避免手动输入。
4. 如果有多个参数，则需要使用多个 @ApiImplicitParam 注解来描述，多个 @ApiImplicitParam 注解需要放在一个 @ApiImplicitParams 注解中。\
5. 需要注意的是，@ApiImplicitParam 注解中虽然可以指定参数是必填的，但是却不能代替 @RequestParam(required = true) ，前者的必填只是在 Swagger2 框架内必填，抛弃了 Swagger2 ，这个限制就没用了，所以假如开发者需要指定一个参数必填， @RequestParam(required = true) 注解还是不能省略。
6. 如果参数是一个对象（例如上文的更新接口），对于参数的描述也可以放在实体类中。例如下面一段代码：

```java
@ApiModel
public class User {
    @ApiModelProperty(value = "用户id")
    private Integer id;
    @ApiModelProperty(value = "用户名")
    private String username;
    @ApiModelProperty(value = "用户地址")
    private String address;
}
```

> 如果我们的 Spring Boot 项目中集成了 Spring Security，那么如果不做额外配置，Swagger2 文档可能会被拦截，此时只需要在 Spring Security 的配置类中重写 configure 方法，添加如下过滤即可

## 日志管理

## profile

> 日志的切换

切换开发和生产配置文件

> @Value("${person.name:李四}")
> private String name;
> 快速将配置文件的值绑定到对象
> :冒号后面代表拿不到时的默认值

文件命名application-prod.properties

切换指定后缀spring.profile.active=后缀

```yaml
spring:
  profiles:
    active: prod
```

默认配置文件永远都会加载

打包后切换配置java -jar *.jar --spring-.profile.active=test

还可以传入其他配置如--person.name=haha

profile用于条件装配

@ConfigurationProperties("person")标注类，内容绑定也会随着profile切换而跟着切换

@Profile("prod")指定类标注，当prod生效时，此类才会生效，标注方法也是如此

profile组

spring.profiles.group.myprod[0]=prod

然后指定为myprod使用配置

### 外部化配置

外部配置源：java属性文件、yaml文件、环境变量、命令行参数

@Value("${JAVA_HOME}")可以获取环境变量的值

优先级

配置文件查找位置

![图 8](https://s2.loli.net/2023/03/04/nB5R3oFdKAENQGk.png)  

配置文件加载顺序，后装载的会覆盖先装载的

## 自定义starter

starter启动原理

场景启动器starter说明依赖

新建一个空白项目然后创建两个子项目，一个普通maven项目，一个springboot项目

![图 10](https://s2.loli.net/2023/03/05/QAWNdEO2M4urhmX.png)  

在boot-my-spring-starter里只要pom.xml里面引入自动配置包依赖

```xml
<dependency>
    <groupId>my.boot</groupId>
    <artifactId>boot-my-spring-starter-autoconfigure</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```

boot-my-spring-starter-autoconfigure

先删除不需要的文件，然后创建HelloProperties用于配置绑定

```java
@ConfigurationProperties("my.boot.hello")
public class HelloProperties {

    private String prefix;
    private String suffix;

    // getter and setter
}
```

然后创建类HelloService，这个是我们将要引用的功能

```java
/**
 * 默认不要放容器中
 */
public class HelloService {

    @Autowired
    HelloProperties helloProperties;

    public String sayHello(String name){
        return helloProperties.getPrefix() + "：" + name + helloProperties.getSuffix();
    }
}
```

然后创建自动配置类HelloServiceAutoConfigurantion

```java
@Configuration
@EnableConfigurationProperties(HelloProperties.class)
public class HelloServiceAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean(HelloService.class)
    public HelloService helloService(){
        HelloService helloService = new HelloService();
        return helloService;
    }
}
```

之后在自动配置包的resource目录下创建META-INF/spring.factories

```java
# auto-configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
my.boot.auto.HelloServiceAutoConfiguration
```

install安装到本地仓库，别的项目引入启动包可以使用

在配置文件里可以配置

```properties
my.boot.hello.prefix=你好
my.boot.hello.suffix=先生
```

自动注入HelloService即可使用

```java
@Autowired
HelloService helloService;
```

2.7.0之后新增的`@AutoConfiguration`注解？

## SpringBoot启动过程

从SpringApplication.run(BootApplication.class, args);
