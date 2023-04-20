# Spring

[Spring](https://docs.spring.io/spring-framework/docs/5.2.24.RELEASE/spring-framework-reference/)

[参考博客文章](http://docs.javaboy.org/ssm/)

> 注解使用接口实现aop
> 事务
> JdbcTemplate

- [Spring](#spring)
  - [Spring IOC/DI](#spring-iocdi)
    - [导入pom依赖](#导入pom依赖)
    - [配置spring-config.xml](#配置spring-configxml)
    - [xml属性的注入](#xml属性的注入)
    - [加载context](#加载context)
    - [bean的作用域](#bean的作用域)
  - [Spring DI注解](#spring-di注解)
    - [创建MainConfig类](#创建mainconfig类)
    - [自动扫描注册bean](#自动扫描注册bean)
    - [@Autowire和@Resource](#autowire和resource)
    - [加载属于注解的context](#加载属于注解的context)
    - [加载其他配置文件](#加载其他配置文件)
    - [条件注解](#条件注解)
    - [多环境切换](#多环境切换)
    - [注解作用域](#注解作用域)
  - [Spring AOP](#spring-aop)
    - [execution表达式](#execution表达式)
    - [接口实现aop](#接口实现aop)
  - [Spring AOP注解](#spring-aop注解)
    - [注册aop类](#注册aop类)
    - [注解使用接口实现aop](#注解使用接口实现aop)
    - [aspectj](#aspectj)
  - [Aware 接口](#aware-接口)
  - [JdbcTemplate](#jdbctemplate)
  - [事务](#事务)
    - [隔离性](#隔离性)
    - [传播性](#传播性)
    - [回滚](#回滚)
  - [Test](#test)
  - [源码](#源码)
    - [spring架构](#spring架构)
    - [Core Container](#core-container)

## Spring IOC/DI

Ioc （Inversion of Control），中文叫做控制反转。这是一个概念，也是一种思想。控制反转，实际上就是指对一个对象的控制权的反转。

spring依赖注入(Spring Dependency Inject)

### 导入pom依赖

`spring-context`包含了多个必备依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.22</version>
</dependency>
```

### 配置spring-config.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context-4.2.xsd">

    <!-- 在xml中启用bean包扫描 -->
    <context:component-scan base-package="core.aop"/>

    <!-- 指定初始化方法 -->
    <bean id="student" class="core.bean.Student" init-method="init">

        <!-- 属性注入，需要有set方法 -->
        <property name="name" value="white"/>

        <!-- 对象注入 ref="school"，自动注入 -->
        <property name="school" ref="school"/>
        
        <!-- 集合类注入 -->
        <!-- list, array -->
        <property name="curriculum">
            <list>
                <value type="java.lang.String">math</value>
                <value>english</value>
            </list>
        </property>
        <!-- map -->
        <property name="score">
            <map>
                <entry key="数学" value="100"/>
                <entry key="英语" value="99"/>
            </map>
        </property>
    </bean>
</beans>
```

### xml属性的注入

构造器注入

```xml
<!-- 通过参数顺序 -->
<bean class="org.javaboy.Book" id="book">
    <constructor-arg index="0" value="1"/>
    <constructor-arg index="1" value="三国演义"/>
    <constructor-arg index="2" value="30"/>
</bean>
<!-- 通过参数名 -->
<bean class="org.javaboy.Book" id="book2">
    <constructor-arg name="id" value="2"/>
    <constructor-arg name="name" value="红楼梦"/>
    <constructor-arg name="price" value="40"/>
</bean>
```

set注入

```xml
<bean class="org.javaboy.Book" id="book3">
    <property name="id" value="3"/>
    <property name="name" value="水浒传"/>
    <property name="price" value="30"/>
</bean>
```

### 加载context

```java
// 加载xml文件按创建context
ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("spring-config.xml");
// 获取bean对象，通过name和通过class
Student student = (Student) context.getBean("student");
Student student1 = context.getBean(Student.class);
```

### bean的作用域

```xml
<!-- bean默认单例 scope="singleton" 原型"prototype"-->
<bean id="school" class="core.bean.School" scope="singleton"/>
```

## Spring DI注解

### 创建MainConfig类

添加`@Configuration`注解声明为配置类

在此类内可以通过`@Bean`注解注册bean

```java
// 默认情况下，Bean 的名字是类名首字母小写
@Bean
public Student student(){
    // 注入属性
    Student student = new Student();
    student.setName("name");
    // 注入list
    List<String> list = new ArrayList<>();
    list.add("english");
    list.add("math");
    student.setCurriculum(list);
    // 注入map
    Map<String, Integer> score = new HashMap<>();
    score.put("english", 100);
    score.put("math", 100);
    student.setScore(score);
    return student;
}
```

### 自动扫描注册bean

在bean类上添加注解`@Component`，然后在MainCoonfig类上添加包扫描注解`@ComponentScans`

```java
@ComponentScans({
    @ComponentScan("core.bean"),
    @ComponentScan("core.service.impl")
})
```

### @Autowire和@Resource

<https://blog.csdn.net/xhbzl/article/details/126765893>

`@Autowire`是byType注入

这个类型只可以有一个对象，否则就会报错。可以使用 @Qualifier 指定变量名

`@Resource`是byName注入

一个类存在多个实例，可以通过指定名字注入

### 加载属于注解的context

```java
AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(MainConfig.class);
Student student  = context.getBean(Student.class);
```

### 加载其他配置文件

在主配置加载xml配置文件

增加注解`@ImportResource("classpath:spring-config.xml")`

在主配置类加载其他配置类

增加注解`@Import(AnotherConfig.class)`

### 条件注解

条件注解就是在满足某一个条件的情况下，生效的配置

@Conditional("WhatConditon") 也就是implement Condition 接口，重写match方法的返回值为true则生效，否则不生效

### 多环境切换

@Profile("dev") 指定不同条件

### 注解作用域

声明@Scope("prototype")在bean上

## Spring AOP

spring面向切面(Spring Aspect Oriented Programming)

- 切点pointcut 要添加代码的地方，称作切点
- 通知advice 通知就是向切点动态添加的代码（增强）
- 切面aspect 切点+通知
- 连接点joinpoint 切点的定义

在spring-config.xml中添加以下配置

```xml
<!-- 在原命名空间基础上添加aop命名空间 -->
<beans xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/aop
                           http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!-- aop的xml配置 -->
    <!-- AopTest是aop方法类 -->
    <bean id="aopTest" class="core.aop.AopTest"/>
    <bean id="advice" class="core.aop.AopInterfaceTest"/>
    <aop:config>
        <!-- aop:advisor要放在aop:aspect之前 -->
        <aop:advisor advice-ref="advice" pointcut-ref="an"/>
        
        <!-- 切面aspect -->
        <aop:aspect ref="aopTest">
            <!-- 切点pointcut，execution表达式匹配 -->
            <aop:pointcut id="pc" expression="execution(* core.bean.Student.say())"/>
            <aop:before pointcut-ref="pc" method="sayBefore"/>
        </aop:aspect>

        <aop:aspect ref="aopTest">
            <!-- 切点pointcut，注解@annotation(Deprecated)匹配 -->
            <aop:pointcut id="an" expression="@annotation(Deprecated)"/>
            <aop:after method="sayAfter" pointcut-ref="an"/>
        </aop:aspect>
    </aop:config>
    
    <!-- 通过xml开启注解aop -->
    <aop:aspectj-autoproxy proxy-target-class="true">
    </aop:aspectj-autoproxy>

```

在xml中先注册接口实现类为bean，在`<aop:config>`标签内通过`<aop:advisor advice-ref="advice">`使用

> 注意：aop:advisor要放在aop:aspect之前

### execution表达式

定义切点

execution(修饰符如public 包名.类名.方法名(方法参数  使用..代表自动匹配))

`execution(* core.bean.Student.say(..))`

### 接口实现aop

实现Method<u>Before</u>Advice类

重写方法

```java
public class AopInterfaceTest implements MethodBeforeAdvice {
    
    @Override
    public void before(Method method, Object[] args, Object target) throws Throwable {
        System.out.println("方法名" + method.getName());
        System.out.println("参数列表" + Arrays.toString(args));
        System.out.println(target);
    }
}

```

## Spring AOP注解

### 注册aop类

在aop类上增加`@Aspect`注解，也需要注册为@Component

```java
// 注解配置切点，通过方法名引用
@Pointcut("execution(* core.bean.Student.say())")
public void pointCut(){}

@Before("pointCut()")
public void sayBefore(){
    System.out.println("before");
}

@After("pointCut()")
public void sayAfter(JoinPoint point){
    // JoinPoint point自动获取
    // 可以通过point的方法获取相关参数
    System.out.println(Arrays.toString(point.getArgs()));
    System.out.println("after");
}

@Around("pointCut()")
public Object sayAround(ProceedingJoinPoint joinPoint) throws Throwable {
    // 环绕方法会完全代理原方法体
    System.out.println("环绕方法之前");
    // 调用原方法
    Object obj = joinPoint.proceed();
    System.out.println("环绕方法之后");
    // 需要返回obj
    return obj;
}
```

### 注解使用接口实现aop

### aspectj

导入依赖`spring-aspects`增强默认aop功能

在配置类上增加注解`@EnableAspectJAutoProxy`可以开启aspectj实现的代理aop类方法，否则使用默认的

```xml
<!--  aspectj  -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>5.3.23</version>
</dependency>
```

## Aware 接口

Aware 接口，从字面上理解就是感知捕获。在实际开发中，我们可能会遇到一些类，需要获取到容器的详细信息，那就可以通过 Aware 接口来实现。

## JdbcTemplate

配置datasource和JdbcTemplate，然后注入JdbcTemplate使用

```java
@Configuration
public class JdbcConfig {
    @Bean
    DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUsername("root");
        dataSource.setPassword("123");
        dataSource.setUrl("jdbc:mysql:///test01");
        return dataSource;
    }
    @Bean
    JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }
}
```

> 配置Mybatis的连接有些不同

## 事务

- 隔离性
- 传播性

Spring 支持两种类型的事务，声明式事务和编程式事务。

编程式事务类似于 Jdbc 事务的写法，需要将事务的代码嵌入到业务逻辑中，这样代码的耦合度较高，而声明式事务通过 AOP 的思想能够有效的将事务和业务逻辑代码解耦，因此在实际开发中，声明式事务得到了广泛的应用，而编程式事务则较少使用

@EnableTransactionManagement 注解开启事务支持。

哪个方法需要事务就在哪个方法上添加 @Transactional 注解即可

### 隔离性

Spring 中默认的事务隔离级别是 default，即数据库本身的隔离级别是啥就是啥

<https://mp.weixin.qq.com/s/eTbWDz8NiM8L8BbIrNiLHQ>

### 传播性

事务传播行为是为了解决业务层方法之间互相调用的事务问题，当一个事务方法被另一个事务方法调用时，事务该以何种状态存在？例如新方法可能继续在现有事务中运行，也可能开启一个新事务，并在自己的事务中运行，等等，这些规则就涉及到事务的传播性。

### 回滚

默认情况下，事务只有遇到运行期异常（RuntimeException 的子类）以及 Error 时才会回滚，在遇到检查型（Checked Exception）异常时不会回滚。

像 1/0，空指针这些是 RuntimeException，而 IOException 则算是 Checked Exception，换言之，默认情况下，如果发生 IOException 并不会导致事务回滚。

如果我们希望发生 IOException 时也能触发事务回滚，那么可以按照如下方式配置：

```java
@Transactional(rollbackFor = IOException.class)
public void handle2() {
    jdbcTemplate.update("update user set money = ? where username=?;", 1, "zhangsan");
    accountService.handle1();
}
```

1. 事务只能应用到 public 方法上才会有效。
2. 事务需要从外部调用，Spring 自调事务用会失效。即相同类里边，A 方法没有事务，B 方法有事务，A 方法调用 B 方法，则 B 方法的事务会失效，这点尤其要注意，因为代理模式只拦截通过代理传入的外部方法调用，所以自调用事务是不生效的。
3. 建议事务注解 @Transactional 一般添加在实现类上，而不要定义在接口上，如果加在接口类或接口方法上时，只有配置基于接口的代理这个注解才会生效

## Test

```java
// spring集成junit
// 版本如果较旧则不是这两个注解
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = MainConfig.class)
public class MainTest {

    @Resource
    BookService service;

    @Test
    public void test(){
        System.out.println(service.getBooks());
    }
}
```

## 源码

### spring架构

![图 1](https://s2.loli.net/2023/04/17/l8qo4ZyxB5TXCMA.png)  

### Core Container

- Core：这个是 Spring 的核心模块，它里边主要是 Spring 框架的一些基础工具类，比如一些序列化工具、类型转换器、我们常用的优先级注解等等，都是它提供的。
- Beans：Beans 就没啥好说的，我们所熟知的 IoC/DI 就是由它提供的。
- Context：Context 虽然不像前两个模块那么基础，因为它是基于 Core 和 Beans 构建的，但是 Context 也是我们在 Web 项目中必不可少的工具，资源加载、Event 等等都需要 Context。
- Expression Language：SpEL 虽然归类于 Core Container，但是在目前前后端分离的背景下，其实 SpEL 的使用场景大大缩水。SpEL 是一个支持查询并在运行时可以操纵一个对象图的表达式语言，它的语法类似于统一 EL，但提供了更多的功能，而且它可以独立使用。
