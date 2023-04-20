---
category:
  - Spring
tag:
  - SpringMVC
---

# SpringMVC

- [SpringMVC](#springmvc)
  - [配置MVC环境](#配置mvc环境)
    - [导入webmvc依赖](#导入webmvc依赖)
    - [配置web.xml](#配置webxml)
    - [配置spring-mvc.xml](#配置spring-mvcxml)
    - [配置WebConfig类](#配置webconfig类)
    - [去除web.xml文件](#去除webxml文件)
  - [配置ThemyLeaf](#配置themyleaf)
    - [在mvc.xml](#在mvcxml)
    - [在WebConfig类](#在webconfig类)
  - [Controller](#controller)
    - [@RequestMapping](#requestmapping)
    - [@RequestParam](#requestparam)
    - [ModelAndView返回视图](#modelandview返回视图)
    - [String返回视图](#string返回视图)
    - [重定向和请求转发](#重定向和请求转发)
    - [@RequestBody](#requestbody)
    - [参数绑定](#参数绑定)
      - [自定义参数绑定](#自定义参数绑定)
    - [数据回显](#数据回显)
    - [Bean的web作用域](#bean的web作用域)
  - [RESTful风格](#restful风格)
    - [GET](#get)
    - [POST](#post)
    - [PUT](#put)
    - [DELETE](#delete)
  - [Interceptor拦截器](#interceptor拦截器)
    - [增加拦截器](#增加拦截器)
    - [注册拦截器](#注册拦截器)
  - [自定义异常处理](#自定义异常处理)
    - [自定义异常页面](#自定义异常页面)
    - [自定义404页面](#自定义404页面)
  - [JSON](#json)
    - [javascript解析json](#javascript解析json)
    - [fastjson](#fastjson)
  - [文件上传和下载](#文件上传和下载)
    - [文件上传](#文件上传)
    - [文件下载](#文件下载)
  - [SpringMVC 工作流程](#springmvc-工作流程)
    - [DispatcherServlet](#dispatcherservlet)
    - [两个容器](#两个容器)
    - [HandlerMapping](#handlermapping)
    - [HandlerAdapter](#handleradapter)
  - [拓展](#拓展)
    - [FlashMap](#flashmap)
    - [PathPattern](#pathpattern)
    - [参数、响应预处理](#参数响应预处理)

## 配置MVC环境

### 导入webmvc依赖

```xml
<!-- servlet依赖 -->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
    <scope>provided</scope>
</dependency>
<!-- webmvc依赖 -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.23</version>
</dependency>
```

### 配置web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!-- DispatcherServlet替换Tomcat自带的Servlet -->
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>

        <!-- 使用spring-mvc.xml配置文件 -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc.xml</param-value>
        </init-param>
        
        <!--开启注解-->
        <init-param>
            <param-name>contextClass</param-name>
            <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
        </init-param>
        
        <!--引用WebConfig配置类 -->
        <!-- <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>com.mvc.springmvctest.config.WebConfig</param-value>
        </init-param> -->
    </servlet>

    <!-- 匹配"/" -->
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

</web-app>
```

### 配置spring-mvc.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean class="org.javaboy.helloworld.MyController" name="/hello"/>
    <!--这个是处理器映射器，这种方式，请求地址其实就是一个 Bean 的名字，然后根据这个 bean 的名字查找对应的处理器-->
    <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping" id="handlerMapping">
        <property name="beanName" value="/hello"/>
    </bean>
    <bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter" id="handlerAdapter"/>
    
    <!--默认视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/pages/"/>
        <property name="suffix" value=".html"/>
    </bean>
</beans>

```

### 配置WebConfig类

```xml
<!--引用WebConfig配置类 -->
<init-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>com.mvc.springmvctest.config.WebConfig</param-value>
</init-param>
```

增加注解`@Configuration`和`@EnableWebMvc`

然后实现接口WebConfig implements `WebMvcConfigurer`

> @EnableWebMvc解释?

重写方法

```java
@Override
public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    // 开启默认servlet处理请求
    configurer.enable();
}

@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // 配置静态资源访问路径
    registry.addResourceHandler("/static/**")
            .addResourceLocations("/WEB-INF/static/");
}
```

增加`MainConfig`类用于管理与web无关的bean如数据库连接

### 去除web.xml文件

新建一个MainInit类继承类`AbstractAnnotationConfigDispatcherServletInitializer`

父类实现了基本逻辑

```java
public class MainInit extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        // 注册加载根配置类
        return new Class[]{MainConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        // 注册加载web配置类
        return new Class[]{WebConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        // 路径匹配
        return new String[]{"/"};
    }
}
```

## 配置ThemyLeaf

### 在mvc.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- thymeleaf模板解析器 -->
    <bean id="templateResolver" class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
        <property name="prefix" value="/WEB-INF/pages/"/>
        <property name="suffix" value=".html"/>
        <property name="characterEncoding" value="UTF-8"/>
    </bean>

    <!-- 配置模板引擎 -->
    <bean id="springTemplateEngine" class="org.thymeleaf.spring5.SpringTemplateEngine">
        <property name="templateResolver" ref="templateResolver"/>
    </bean>

    <!-- 配置视图解析器 -->
    <bean id="thymeleafViewResolver" class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
        <property name="characterEncoding" value="UTF-8"/>
        <property name="templateEngine" ref="springTemplateEngine"/>
        <property name="order" value="1"/>
    </bean>
</beans>

```

### 在WebConfig类

```java
@Bean
public SpringResourceTemplateResolver templateResolver(){
    // 配置模板解析器
    SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
    resolver.setSuffix(".html"); // 后缀
    resolver.setPrefix("/WEB-INF/template/"); // 前缀
    resolver.setCharacterEncoding("UTF-8"); // 解决web中文乱码
    return resolver;
}

@Bean
public SpringTemplateEngine springTemplateEngineK(@Autowired ITemplateResolver resolver){
    // 配置模板引擎，注入模板解析器
    SpringTemplateEngine engine = new SpringTemplateEngine();
    engine.setTemplateResolver(resolver);
    return engine;
}

@Bean
public ThymeleafViewResolver thymeleafViewResolver(@Autowired SpringTemplateEngine springTemplateEngine){
    // 配置视图解析器，注入模板引擎
    ThymeleafViewResolver resolver = new ThymeleafViewResolver();
    resolver.setOrder(1); // 可以存在多个视图解析器，指定它们的顺序
    resolver.setCharacterEncoding("UTF-8"); // 解决web中文乱码
    resolver.setTemplateEngine(springTemplateEngine);
    return resolver;
}
```

## Controller

### @RequestMapping

请求映射

@RequestMapping(value="/匹配路径", method="RequestMethod.GET")

通过`params={"",""}`指定必须包含参数，可以用!=否定

ant风格通配规则：`?`一个字符 `*`0~N个字符 `**`多级目录(AntPathmatcher)

> AntPathMatcher 是 Spring 中一种比较原始的路径匹配解决方案，虽然比较简单，但是它的效率很低，并且在处理 URL 编码的时候也很不方便。 因此，才有了 Spring5 中的 PathPattern。

### @RequestParam

服务端的接口变量名可能和前端不一致，这个时候我们可以通过 @RequestParam 注解来解决，同时还支持定义其他属性。

`@RequestParam`获取请求参数

`required`表示是否必须附上该参数，`defaultValue`表示设置默认值

<u>/index?username=test&password=test</u>

```java
@RequestMapping("/index")
public String index(@RequestParam(value = "username", required = false, defaultValue = "0") String username, Model model) {
    model.addAttribute("username", username);// 获取请求参数
    return "index";
}
```

> 可以使用javaweb提供的(HttpServletRequest request)注入，使用request的原生方法

### ModelAndView返回视图

```java
@RequestMapping("/index")
public ModelAndView index() {
    ModelAndView modelAndView = new ModelAndView("index");
    // 结合ThemyLeaf向<div th:text="${head}"></div>添加数据
    modelAndView.getModel().put("head", "Chapter 1");
    return modelAndView;
}
```

### String返回视图

```java
@RequestMapping("/index")
public String index(Model model) {
    // 通过自动获取的Model
    // 结合ThemyLeaf向<div th:text="${head}"></div>添加数据
    model.addAttribute("head", "Chapter 1");
    return "index";
}
```

### 重定向和请求转发

重定向`return "redirect:home";`

请求转发`return "forward:home";`

请求转发和重定向的区别：

1. 请求次数
重定向是浏览器向服务器发送一个请求并收到响应后再次向一个新地址发出请求，转发是服务器收到请求后为了完成响应跳转到一个新的地址；重定向至少请求两次，转发请求一次；
2. 地址栏不同
重定向地址栏会发生变化，转发地址栏不会发生变化；
3. 是否共享数据
重定向两次请求不共享数据，转发一次请求共享数据（在request级别使用信息共享，使用重定向必然出错）；
4. 跳转限制
重定向可以跳转到任意URL，转发只能跳转本站点资源；
5. 发生行为不同
重定向是客户端行为，转发是服务器端行为；

### @RequestBody

不返回视图页面，返回String字符串或者Obj对象

### 参数绑定

默认支持的参数类型，就是可以直接写在 @RequestMapping 所注解的方法中的参数类型，一共有四类：

- HttpServletRequest
- HttpServletResponse
- HttpSession
- Model/ModelMap

String、Integer、Boolean、Double 等等简单数据类型也都是支持的。

参数除了是简单数据类型之外，也可以是实体类。

前端传来的数组对象，服务端不可以使用 List 集合去接收，只能用数组。

#### 自定义参数绑定

特殊的数据类型，系统无法自动转换。例如前端传一个日期到后端，后端不是用字符串接收，而是使用一个 Date 对象接收，这个时候就会出现参数类型转换失败。

```java
@Component
public class DateConverter implements Converter<String, Date> {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    public Date convert(String source) {
        try {
            return sdf.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

接下来，在 SpringMVC 的配置文件中，配置该 Bean，使之生效。

### 数据回显

### Bean的web作用域

## RESTful风格

### GET

获取：路径/{参数}

```java
@RequestMapping(value = "/rest/{str}", method = RequestMethod.GET)
public String restGet(@PathVariable("str") String str, Model model) {
    // todo:接收中文乱码
    model.addAttribute("str", "GET:" + str);
    return "rest";
}
```

### POST

添加：通过表单post

当使用@Requestbody标示使用json格式请求，服务端通过数据传输对象接收

```java
@RequestMapping(value = "/rest", method = RequestMethod.POST)
public String restPost(@RequestParam("post") String post, Model model) {
    model.addAttribute("str", "POST:" + post);
    return "rest";
}
```

### PUT

修改：put发送表单

> put的幂等性

```java
@RequestMapping(value = "/rest", method = RequestMethod.PUT)
public String restPut(@RequestParam("put") String put, Model model) {
    // todo:如何发送put请求
    model.addAttribute("str", "PUT:" + put);
    return "rest";
}
```

### DELETE

删除：路径/{参数}，需要发送delete请求，直接访问是get请求

```java
@RequestMapping(value = "/rest/{str}", method = RequestMethod.DELETE)
public String restDelete(@PathVariable("str") String str, Model model) {
    // todo:如何发送delete请求
    model.addAttribute("str", "DELETE:" + str);
    return "rest";
}
```

## Interceptor拦截器

### 增加拦截器

实现接口`HandlerInterceptor`

```java
public class MainInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 访问但是获取到资源之前
        System.out.println("我是preHandle");
        // 返回true才会往下走
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 获取到资源之时
        System.out.println("我是postHandle: " + request.getRequestURL());
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 完成访问之后
        System.out.println("我是afterCompletion");
    }
}
```

### 注册拦截器

在WebConfig类中，重写方法`addInterceptors`

```java
@Override
public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new MainInterceptor())// 注册拦截器
            .addPathPatterns("/**")// 拦截器的匹配路径
            .excludePathPatterns("/rest/**");// 不进行拦截的路径
    registry.addInterceptor(new SubInterceptor())
            .addPathPatterns("/rest/**")
            .addPathPatterns("/500");
}
```

多个拦截器可以指定顺序 registry.order() 指定

## 自定义异常处理

### 自定义异常页面

新建一个异常controller类，加上注解`@ControllerAdvice`

```java
@ControllerAdvice
public class ErrorController {

    // @ExceptionHandler(异常类)
    @ExceptionHandler(Exception.class)
    public String error(Exception e, Model model){
        e.printStackTrace();
        model.addAttribute("error500", e.getMessage());
        return "500";
    }
}
```

### 自定义404页面

```xml
<!-- 自定义404页面 -->
<error-page>
    <error-code>404</error-code>
    <location>/WEB-INF/template/404.html</location>
</error-page>
```

在controller中走通用匹配路径，根据优先级访问

```java
@RequestMapping("**")
public String notFound(){
    return "404";
    // 返回404页面，没有web.xml根据错误代码定义页面那么好，不过只对外展示404这样也许可以
}
```

## JSON

### javascript解析json

```javascript
// 解析字符串为JSON格式对象
let json = '{"key":"value", "list":[1,2,3]}'
let obj = JSON.parse(json)
console.log(obj)
console.log(typeof(obj))

// 解析JSON格式对象为字符串
let obj1 = {"name":"pony","score":[98,99]}
let json1 = JSON.stringify(obj1)
console.log(json1)
console.log(typeof(json1))
```

### fastjson

导入pom依赖

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>2.0.14</version>
</dependency>
```

使用fastjson

```java
// 设置produces为application/json
// @ResponseBody返回体
@RequestMapping(value = "/json1", produces = "application/json")
@ResponseBody
public String json1() {
    // fastjson
    JSONObject json = new JSONObject();
    json.put("username", "white");
    json.put("1", 2);
    // json.toJSONString()会有转义符
    // 看网上说用StringEscapeUtils.unescapeJavaScript()但是测试也有
    // "{\"1\":2,\"username\":\"white\"}"
    // todo:怎么解决？直接返回对象而不是自己转json字符串
    return StringEscapeUtils.unescapeJavaScript(json.toJSONString());
}
```

不过，如果直接包装成对象返回便不会有转义符号

需要先配置好fastjson，spring默认解析是jackson

重写方法`configureMessageConverters`

```java
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
        // 限定类型只对返回为json的数据解析
        converter.setSupportedMediaTypes(Collections.singletonList(MediaType.APPLICATION_JSON));
        // 配置json解析器为fastjson
        converters.add(new FastJsonHttpMessageConverter());
    }
```

然后在controller中编写

```java
@RequestMapping(value = "/json2", produces = "application/json")
@ResponseBody
public User json2() {
    // 自动解析对象为json
    User user = new User();
    user.setUsername("小black");
    return user;
}
```

## 文件上传和下载

### 文件上传

CommonsMultipartResolver依赖第三方工具`commons-fileupload`

```xml
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.4</version>
</dependency>
```

配置`multipartResolver`

```xml
<!-- 配置MultipartResolver，文件分片上传 -->
<!-- 在控制层@RequestParam CommonsMultipartFile file获取文件流 -->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <!-- 设置文件上传大小 100 * 1024 * 1024 -->
    <property name="maxUploadSize" value="10485760"/>
    <property name="defaultEncoding" value="UTF-8"/>
</bean>
```

```java
// bean名称或者方法名必须为multipartResolver
@Bean("multipartResolver")
public CommonsMultipartResolver multipartResolver(){
    CommonsMultipartResolver resolver = new CommonsMultipartResolver();
    // 设置文件上传大小限制
    resolver.setMaxUploadSize(100 * 1024 * 1024);
    // 设置文件默认编码
    resolver.setDefaultEncoding("UTF-8");
    return resolver;
}
```

前端上传表单

```html
<form method="post" action="upload" enctype="multipart/form-data">
    <input type="file" name="file" value="选择文件">
    <br>
    <input type="submit" value="上传">
</form>
```

文件上传controller

`@RequestParam CommonsMultipartFile file`获取文件流

```java
@RequestMapping(value = "/upload", method = RequestMethod.POST, produces = "text/html;charset=utf-8")
@ResponseBody
public String upload(@RequestParam CommonsMultipartFile file) throws IOException {
    // 文件上传
    File f = new File("D:\\upload\\" + file.getOriginalFilename());
    // Path p = Paths.get("D:\\upload\\" + file.getOriginalFilename());
    if (file.isEmpty()){
        return "上传失败！";
    }
    // commons的流转换工具
    // 支持File和Path对象
    file.transferTo(f); 
    return file.getOriginalFilename() + ":上传成功" +
            "<br>路径为:" + f.getAbsolutePath();
}
```

> 上传重名使用UUID重命名文件
> 多文件上传使用数组接收即可

### 文件下载

`HttpServletResponse resp`获得响应

通过设置下载响应头下载`"content-disposition":"attachment;filename=filename"`

```java
@RequestMapping(value = "/download")
@ResponseBody
public void download(HttpServletResponse resp) throws IOException{
    String path = "D:\\upload\\test.mp4";
    // 从完整路径截取文件名称的方法
    String filename = path.substring(path.lastIndexOf("\\") + 1);
    //设置下载头和下载文件名称
    resp.setHeader("content-disposition","attachment;filename=" + URLEncoder.encode(filename,"UTF-8"));
    // 获取输入流
    InputStream inputStream = Files.newInputStream(Paths.get(path));
    // 输出流由客户端决定
    OutputStream outputStream = resp.getOutputStream();
    IOUtils.copy(inputStream, outputStream);
}
```

页面打开的方式

```java
@RequestMapping(value = "/download/pre")
@ResponseBody
public void downloadPre(HttpServletResponse resp) throws IOException{
    String path = "D:\\upload\\b.png";
    String filename = path.substring(path.lastIndexOf("\\") + 1);
    // 在线打开文件的方式
    resp.setHeader("content-disposition", "inline;fileName=" + URLEncoder.encode(filename,"UTF-8"));
    InputStream inputStream = Files.newInputStream(Paths.get(path));
    OutputStream outputStream = resp.getOutputStream();
    IOUtils.copy(inputStream, outputStream);
}
```

## SpringMVC 工作流程

![图 1](https://s2.loli.net/2023/04/14/PcRiDeXUEz3K8Gf.png)  

1. DispatcherServlet：前端控制器
用户请求到达前端控制器，它就相当于 mvc 模式中的c，DispatcherServlet 是整个流程控制的中心，相当于是 SpringMVC 的大脑，由它调用其它组件处理用户的请求，DispatcherServlet 的存在降低了组件之间的耦合性。

2. HandlerMapping：处理器映射器
HandlerMapping 是负责根据 request 请求找到对应的 Handler 处理器及 Interceptor 拦截器，将它们封装在 HandlerExecutionChain 对象中返回给前端控制器。

3. Handler：处理器
Handler 是继 DispatcherServlet 前端控制器的 后端控制器，在DispatcherServlet 的控制下 Handler 对具体的用户请求进行处理。（这里所说的 Handler 就是指我们的 Controller）。

4. HandlAdapter：处理器适配器
通过 HandlerAdapter 对处理器进行执行，这是适配器模式的应用，通过扩展适配器可以对更多类型的处理器进行执行。

5. ViewResolver：视图解析器
ViewResolver 负责将处理结果生成 View 视图，ViewResolver 首先根据逻辑视图名解析成物理视图名即具体的页面地址，再生成 View 视图对象，最后对 View 进行渲染将处理结果通过页面展示给用户。

### DispatcherServlet

DispatcherServlet 主要用作职责调度工作，本身主要用于控制流程，主要职责如下：

1. 文件上传解析，如果请求类型是 multipart 将通过 MultipartResolver 进行文件上传解析；
2. 通过 HandlerMapping，将请求映射到处理器（返回一个 HandlerExecutionChain，它包括一个处理器、多个 HandlerInterceptor 拦截器）；
3. 通过 HandlerAdapter 支持多种类型的处理器(HandlerExecutionChain 中的处理器)；
4. 通过 ViewResolver 解析逻辑视图名到具体视图实现；
5. 本地化解析；
6. 渲染具体的视图等；
7. 如果执行过程中遇到异常将交给 HandlerExceptionResolver 来解析

### 两个容器

当 Spring 和 SpringMVC 同时出现，我们的项目中将存在两个容器，一个是 Spring 容器，另一个是 SpringMVC 容器，Spring 容器通过 ContextLoaderListener 来加载，SpringMVC 容器则通过 DispatcherServlet 来加载，这两个容器不一样：

![图 2](https://s2.loli.net/2023/04/14/OCadNvx9zet13Is.png)  

> SSH(Spring+SpringMVC+Hibernate)

### HandlerMapping

- BeanNameUrlHandlerMapping
- SimpleUrlHandlerMapping
- RequestMappingHandlerMapping

### HandlerAdapter

- SimpleControllerHandlerAdapter
- HttpRequestHandlerAdapter
- RequestMappingHandlerAdapter

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 包扫描 -->
    <context:component-scan base-package="org.javaboy.helloworld"/>

    <!-- handler -->
    <bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping" id="handlerMapping"/>
    <bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter" id="handlerAdapter"/>

    <!-- 可以用这一行代替以上两行 -->
    <mvc:annotation-driven>

    <!-- 视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="viewResolver">
        <property name="prefix" value="."/>
        <property name="suffix" value="."/>
    </bean>
</beans>
```

## 拓展

### FlashMap

重定向的时候不通过地址栏传递参数的方法

```java
@Controller
public class OrderController {
    @PostMapping("/order")
    public String order(RedirectAttributes attr) {
        // addFlashAttribute：将参数放到 flashMap 中。
        // addAttribute：将参数放到 URL 地址中。
        attr.addFlashAttribute("site", "www.javaboy.org");
        attr.addAttribute("name", "微信公众号：江南一点雨");
        return "redirect:/orderlist";
    }

    @GetMapping("/orderlist")
    @ResponseBody
    public String orderList(Model model) {
        return (String) model.getAttribute("site");
    }
}
```

### PathPattern

PathPattern 会将 URL 规则预解析为 PathContainer，它对 URL 地址匹配的处理更加快速，PathPattern 与 AntPathMatcher 的差异主要体现在两个方面：

第一，PathPattern 只支持结尾部分使用 \**，如果在路径的中间使用 ** 就会报错，上文中第一个和第三个接口，在 PathPattern 模式下会报错。

因为在中间或者开始使用 \** 极易造成混乱，因此 PathPattern 只支持在结尾使用 **。

第二，PathPattern 支持使用诸如 {*path} 的方式进行路径匹配，这种写法也可以匹配到多层路径，并且将匹配到的值赋值给 path 变量，例如如下一个接口：

```java
@GetMapping("/javaboy/{*path}")
public void hello6(@PathVariable String path) {
    System.out.println("path = " + path);
}
```

如果请求路径是 <http://localhost:8080/javaboy/aa>，那么参数 path 的值就是 /aa；

如果请求路径是 <http://localhost:8080/javaboy/aa/bb/cc/dd>，那么参数 path 的值就是 /aa/bb/cc/dd；

默认情况下，SpringMVC 中使用的还是 AntPathMatcher，那么如何开启 PathPattern 呢？很简单，在 SpringBoot 项目中只需要添加如下配置即可：

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setPatternParser(new PathPatternParser());
    }
}
```

添加了这个配置后，在我们文章一开始贴出来的代码里，就会进入到 if 分支中，进而使用 PathPattern 去解析请求 URL。

### 参数、响应预处理

SpringMVC 中给我们提供了 ResponseBodyAdvice 和 RequestBodyAdvice，利用这两个工具可以对请求和响应进行预处理，非常方便。

