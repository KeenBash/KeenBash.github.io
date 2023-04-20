# SSMTemplate配置实例介绍

**更新**加入了整合shiro和thymeleaf，文件SSMTemplate-shiro-thymeleaf

这是SSM框架模板的使用介绍，整合了mybatis, hikari数据源, SpringMVC, log4j日志, junit, lombok, jacksson等依赖的文件集合，包含了这些依赖的基础配置和文件框架。

idea:2022.1  
mysql:8.0.26  
spring:5.3.23

项目的github链接地址：[SSMTemplate](https://github.com/KeenBash/SSMTemplate)

模板文件结构

![Snipaste_2022-11-29_16-44-49.png](https://s2.loli.net/2022/11/29/jzyZ5GwS8aTfAKE.png)

目录

- [SSMTemplate配置实例介绍](#ssmtemplate配置实例介绍)
  - [如何使用?](#如何使用)
    - [导入整合包](#导入整合包)
    - [配置Tomcat](#配置tomcat)
    - [修改包名](#修改包名)
    - [修改数据库](#修改数据库)
    - [修改日志输出路径](#修改日志输出路径)
    - [启动项目](#启动项目)
  - [解析配置文件](#解析配置文件)
    - [pom.xml](#pomxml)
    - [jdbc.properties](#jdbcproperties)
    - [log4j.properties](#log4jproperties)
    - [mybatis-config.xml](#mybatis-configxml)
    - [spring-config.xml](#spring-configxml)
    - [spring-mvc](#spring-mvc)
    - [web.xml](#webxml)
    - [测试类](#测试类)
  - [解决问题](#解决问题)
    - [@ResponseBody乱码](#responsebody乱码)

## 如何使用?

### 导入整合包

下载文件解压后，打开IDEA直接`OPEN`导入

![Snipaste_2022-11-29_16-38-44.png](https://s2.loli.net/2022/11/29/zvC2TSBWtdG1DRA.png)

如果出现类为红色下划线错误，关掉重新打开项目就好了

![Snipaste_2022-11-29_18-39-00.png](https://s2.loli.net/2022/11/29/KqjnwPlg9bZyh1p.png)

### 配置Tomcat

点击右上角`Add configuration`

![Snipaste_2022-11-29_16-43-29.png](https://s2.loli.net/2022/11/29/SRfCMeXOtWQPoru.png)

选择`Tomcat Server` `Local`

![Snipaste_2022-11-29_16-45-06.png](https://s2.loli.net/2022/11/29/kXrPJIiRAnl78cD.png)

右边点击`Deployment`，点击`+`号，选择第二个包部署

![Snipaste_2022-11-29_16-45-34.png](https://s2.loli.net/2022/11/29/EHtOXq27g6hyzaS.png)

在下方修改部署名为`/`

![Snipaste_2022-11-29_16-45-46.png](https://s2.loli.net/2022/11/29/vUj3ohSc6EXYTBw.png)

### 修改包名

包名为`com.ssm.template`

使用idea的重命名可以自动修改其他的java类的包名，但是xml配置文件还需要自己手动修改一下

具体涉及到如下几个文件

spring-config.xml

![Snipaste_2022-11-29_18-07-32.png](https://s2.loli.net/2022/11/29/i4Vk9JByfs2rAEq.png)

![Snipaste_2022-11-29_18-07-42.png](https://s2.loli.net/2022/11/29/IpatgeuqJ1loEwr.png)

spring-mvc.xml

![Snipaste_2022-11-29_22-53-49.png](https://s2.loli.net/2022/11/29/LtSAKkbsu12nw3m.png)

还有pom文件的相关名称

如果看到`properties`文件乱码可以到设置修改编码为`UTF-8`即可

![Snipaste_2022-11-29_18-06-47.png](https://s2.loli.net/2022/11/29/sMjVn8ZOw9zmYty.png)

### 修改数据库

默认使用的是Hikari数据库连接池和Mysql数据库。

`jdbc.properties`修改为自己的数据库连接，默认有一个测试实体类`Student`，字段为`name``sid`。根据自己使用修改比如修改为Druid。

### 修改日志输出路径

`log4j.properties`文件默认没有配置文件输出，可以修改自己日志路径和添加filelog输出。

### 启动项目

启动Tomcat

出现首页如图则可以愉快地编写自己的代码了。

![Snipaste_2022-11-29_16-46-30.png](https://s2.loli.net/2022/11/29/zijLSqXUIZ9M3mV.png)

访问`/json`可以看到响应的json数据。

<small>ps.测试数据库使用的`@Autowire`属性自动注入，建议使用构造器注入和set注入</small>

![Snipaste_2022-11-29_18-09-44.png](https://s2.loli.net/2022/11/29/JU6XfghvRCFu7nY.png)

## 解析配置文件

### pom.xml

记得修改`groupId`等内容

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ssm.template</groupId>
    <artifactId>SSMTemplate</artifactId>
    <version>1.0-SNAPSHOT</version>
    <name>SSMTemplate</name>
    <packaging>war</packaging>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.source>1.8</maven.compiler.source>
        <junit.version>5.8.2</junit.version>
        <spring.version>5.3.23</spring.version>
    </properties>

    <dependencies>
        <!-- web -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
        </dependency>

        <!-- 数据库 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.30</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.11</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.7</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>com.zaxxer</groupId>
            <artifactId>HikariCP</artifactId>
            <version>3.4.5</version>
        </dependency>

        <!-- 工具 -->
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper</artifactId>
            <version>5.3.2</version>
        </dependency>
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
            <version>1.4</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.24</version>
        </dependency>
        <!--jackson java对象转换为json对象 @ResponseBody-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.14.0</version>
        </dependency>

        <!-- 日志 -->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.36</version>
        </dependency>

        <!-- 测试 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.3.2</version>
            </plugin>
        </plugins>
    </build>
</project>
```

### jdbc.properties

```properties
hikari.driver=com.mysql.cj.jdbc.Driver
hikari.url=jdbc:mysql://localhost:3306/book_manage
hikari.username=root
hikari.password=80root
```

### log4j.properties

```properties
# 定义根: log4j.rootLogger = [ level ] , appenderName
log4j.rootLogger=DEBUG, console
# console 将日志输出到控制台
# logfile 将日志输出到文件中

################# 屏蔽输出 ################
# log4j.logger.包名设置日志输出等级，优先级高于rootLogger
log4j.logger.org.springframework=ERROR
log4j.logger.org.mybatis.spring=ERROR
log4j.logger.org.apache.ibatis=ERROR
log4j.logger.com.zaxxer.hikari=ERROR


################# 控制台 ################
log4j.appender.console=org.apache.log4j.ConsoleAppender
# 使用流的形式输出到控制台
log4j.appender.console.Target=System.out
# 输出DEBUG以上级别
log4j.appender.console.Threshold=DEBUG
# 配置console设置为自定义布局模式
log4j.appender.console.layout=org.apache.log4j.PatternLayout
# 配置console日志的输出格式
# %r耗费毫秒数 %p日志的优先级 %t线程名 %C所属类名通常为全类名 %L代码中的行号 %x线程相关联的NDC %m日志 %n换行
log4j.appender.console.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n


################# 滚动日志 ################
# RollingFileAppender文件大小到达指定尺寸的时候产生新的日志文件
log4j.appender.fileLog=org.apache.log4j.RollingFileAppender
# 保存编码格式
log4j.appender.fileLog.Encoding=UTF-8
# 输出DEBUG以上级别
log4j.appender.fileLog.Threshold=DEBUG
# 输出文件位置
log4j.appender.fileLog.File=F:/myLog.log
# 后缀可以是KB, MB, GB达到该大小后创建新的日志文件
log4j.appender.fileLog.MaxFileSize=1MB
# 设置追加写
log4j.appender.fileLog.File.Append=true
# 设置滚动文件的索引最大值3，指可以产生log, log.1, log.2, log.3, 四个日志文件
log4j.appender.fileLog.MaxBackupIndex=5
# 配置fileLog为自定义布局模式
log4j.appender.fileLog.layout=org.apache.log4j.PatternLayout
log4j.appender.fileLog.layout.ConversionPattern=[%-5p] %d(%r) --> [%t] %l: %m %x %n
```

### mybatis-config.xml

可以在配置相关设置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <settings>
        <!-- 指定日志输出框架 -->
        <setting name="logImpl" value="log4j"/>
        <!-- 自动映射数据库中的下划线到驼峰属性 -->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>

    <plugins>
        <!-- 分页插件 -->
        <plugin interceptor="com.github.pagehelper.PageInterceptor"/>
    </plugins>

</configuration>
```

### spring-config.xml

如果用到自己编写aop需要自己导入aop的命名空间，然后使用标签`<aop:config>`配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           https://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/tx
                           http://www.springframework.org/schema/tx/spring-tx.xsd">

    <!-- 包扫描 -->
    <context:component-scan base-package="com.ssm.template.service"/>

    <!-- 导入jdbc.properties -->
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <!-- Hikari连接池 -->
    <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource">
        <property name="driverClassName" value="${hikari.driver}"/>
        <property name="jdbcUrl" value="${hikari.url}"/>
        <property name="username" value="${hikari.username}"/>
        <property name="password" value="${hikari.password}"/>
    </bean>

    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
        <!-- 设置映射文件的路径，只有映射文件的包和mapper接口的包不一致时需要设置 -->
        <property name="mapperLocations" value="classpath:mapper/*.xml"/>

        <!-- 分页插件 -->
        <!-- 这里可以设置插件，mybatis-config也可以 -->
        <!-- <property name="plugins"> -->
        <!--     <array> -->
        <!--         <bean class="com.github.pagehelper.PageInterceptor"/> -->
        <!--     </array> -->
        <!-- </property> -->
    </bean>

    <!-- 扫描mapper接口的代理实现类 -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.ssm.template.mapper"/>
    </bean>

    <!-- 事务 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 开启事务注解 -->
    <tx:annotation-driven transaction-manager="transactionManager"/>

</beans>

```

### spring-mvc

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           https://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/mvc
                           https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!-- 包扫描控制层 -->
    <context:component-scan base-package="com.ssm.template.controller"/>

    <!-- 静态资源放行 -->
    <mvc:default-servlet-handler/>

    <!-- 注解驱动 -->
    <mvc:annotation-driven/>

    <!-- 视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/pages/"/>
        <property name="suffix" value=".html"/>
    </bean>

    <!-- 配置MultipartResolver，文件分片上传 -->
    <!-- 在控制层@RequestParam CommonsMultipartFile file获取文件流 -->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <!-- 设置文件上传大小 100 * 1024 * 1024 -->
        <property name="maxUploadSize" value="10485760"/>
        <property name="defaultEncoding" value="UTF-8"/>
    </bean>

</beans>

```

### web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!-- 监听器，加载spring-config配置文件 -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring-config.xml</param-value>
    </context-param>
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!-- 加载spring-mvc配置文件 -->
    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
        <async-supported>true</async-supported>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!-- 注册编码过滤器，解决中文乱码问题 -->
    <filter>
        <filter-name>encodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!-- RESTFul支持 -->
    <filter>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

</web-app>
```

### 测试类

引入spring context环境的测试类

```java
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssm.template.entity.Student;
import com.ssm.template.service.StudentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

// 引入spring context环境的测试类
@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = {"classpath:spring-config.xml", "classpath:spring-mvc.xml"})
public class MainTest {

    @Autowired
    StudentService service;

    @Test
    public void test1() {
        // 测试分页
        PageHelper.startPage(1, 4);
        List<Student> students = service.getStudents();
        PageInfo<Student> info = new PageInfo<>(students);
        System.out.println(info);
    }

}

```

## 解决问题

在spring-mvc.xml里

### @ResponseBody乱码

```xml
<!-- 注解驱动 -->
<mvc:annotation-driven>
    <mvc:message-converters>
        <!-- 消息转换器，解决response乱码 -->
        <bean class="org.springframework.http.converter.StringHttpMessageConverter">
            <property name="defaultCharset" value="UTF-8"/>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>
```
