---
category:
  - Data
tag:
  - Mybatis
---

# Mybatis

mybatis-config.xml详细配置解析
xml使用数据源
XXXMapper.xml复杂查询，和自定义映射
注解XXXMapper复杂查询，和自定义映射
动态sql
mybatis缓存机制
日志
分页

- [Mybatis](#mybatis)
  - [Mybatis基础](#mybatis基础)
    - [导入pom依赖](#导入pom依赖)
    - [编写mybatis-config.xml配置文件](#编写mybatis-configxml配置文件)
    - [导入properties](#导入properties)
    - [使用mybatis连接数据库](#使用mybatis连接数据库)
    - [使用mapper.xml文件结合接口开发](#使用mapperxml文件结合接口开发)
    - [事务](#事务)
    - [注解开发](#注解开发)
  - [Spring整合Mybatis](#spring整合mybatis)
    - [导入多个依赖](#导入多个依赖)
    - [使用mybatis](#使用mybatis)
    - [去除web.xml配置文件并自定义数据源](#去除webxml配置文件并自定义数据源)
    - [在配置类使用jdbc.properties文件](#在配置类使用jdbcproperties文件)
    - [数据库事务](#数据库事务)
  - [Mybatis架构](#mybatis架构)
    - [全局配置](#全局配置)
    - [自定义typeHandlers](#自定义typehandlers)
    - [动态SQL](#动态sql)
    - [缓存](#缓存)
    - [主键回填](#主键回填)
  - [分页](#分页)
    - [原生方式实现分页](#原生方式实现分页)
    - [pagehelper](#pagehelper)
      - [通过xml方式注册插件](#通过xml方式注册插件)
      - [通过配置类方式注册插件](#通过配置类方式注册插件)
      - [使用分页插件](#使用分页插件)

## Mybatis基础

### 导入pom依赖

```xml
<!-- 连接mysql驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.30</version>
</dependency>
<!-- mybatis依赖 -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.11</version>
</dependency>
```

### 编写mybatis-config.xml配置文件

mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <!-- mysql5驱动包com.mysql.jdbc.Driver -->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <!-- 看一些帖子连接mysql8需要增加时区，但是这里没有连接失败也许是安装mysql的时候做了配置 -->
                <!-- 可增加的参数（应该可以<property name="useSSL" value="false"）
                ?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai -->
                <property name="url" value="jdbc:mysql://连接url"/>
                <property name="username" value="用户名"/>
                <property name="password" value="密码"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <!-- 添加单个mapper -->
        <!-- 如果是用mapper.xml结合mapper接口，需要确保两者在同一个路径内，可以都放在同一个包内，或者在resource包下创建同包路径的文件夹 -->
        <mapper class="接口包名"/>
        <mapper resource="mapper配置文件.xml"/>
        <!-- 添加包扫描 -->
        <package name="包路径"/>
    </mappers>
</configuration>
```

### 导入properties

jdbc.properties

```properties
hikari.driver=com.mysql.cj.jdbc.Driver
hikari.url=jdbc:mysql://localhost:3306/book_manage
hikari.username=root
hikari.password=80root
```

在configuration标签下导入

```xml
<!-- 使用properties -->
<properties resource="jdbc.properties"/>

<!-- 通过${key}使用 -->
<property name="driver" value="${hikari.driver}"/>
<property name="url" value="${hikari.url}"/>
<property name="username" value="${hikari.username}"/>
<property name="password" value="${hikari.password}"/>
```

### 使用mybatis连接数据库

```java
// 获得配置文件输入流
InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
// 创建SqlSessionFactory对象
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
// 获得SqlSession对象
// 默认openSession开启了自动提交，可以手动关闭
SqlSession sqlSession = sqlSessionFactory.openSession();
// 获取mapper
XXXMapper mapper = sqlSession.getMapper(XXXMapper.class);
```

编写sql工具类

```java
public class SqlUtils {

    private SqlUtils() {
    }

    private static final SqlSessionFactory factory;

    static {
        try {
            factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static SqlSession getSession(boolean autoCommit) {
        // 事务自动提交
        return factory.openSession(autoCommit);
    }

}

```

### 使用mapper.xml文件结合接口开发

在接口类内，写好对应方法名

```java
public interface StudentMapper {
    List<Student> getStudents();
}
```

创建相应StudentMapper.xml，编写相应sql语句，对于需要填充参数使用#{param}

> 使用 $ 符号执行的日志，可以看到，SQL 直接就拼接好了，没有参数。
> 使用 # 执行的日志，可以看到，这个日志中，使用了预编译的方式、
> 在 MyBatis 中，$ 相当于是参数拼接的方式，而 # 则相当于是占位符的方式。
> 但是有的时候你不得不使用 $ 符号，例如要传入列名或者表名的时候，这个时候必须要添加 @Param 注解，where子句则是 # 方式
> 果在动态 SQL 中使用了参数作为变量，那么也需要 @Param 注解，即使你只有一个参数。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.mybatis.mapper.StudentMapper">
    <select id="getStudents" resultType="com.mybatis.bean.Student">
        select *
        from student
    </select>
    <!-- 有参数用#{}带预处理的 -->
    <select id="getStudentById" resultType="com.mybatis.bean.Student">
        select *
        from student
        where id = #{id}
    </select>
    <!-- resultmap -->
</mapper>
```

当出现多参数方法时，使用`@Param`注解指定

```java
Student getStudentsById(@Param("id") String id);
```

创建service层，将功能实现整合，对外通过service调用

service--->impl和接口

StudentService

```java
public interface StudentService{
    List<Student> getStudents();
}
```

StudentServiceImpl

```java
public class StudentServiceImpl implements StudentService{

    @Override
    public List<Student> getStudents(){
        // 没有共用一个session，与事务提交有关 
        SqlSession session = SqlUtils.getSession(true);
        return session.getMapper(StudentMapper.class).getStudents();
    };
}
```

使用Service

```java
StudentService service = new StudentServiceImpl();
service.getStudents().forEach(System.out::println);
```

### 事务

事务默认开启自动提交，关闭事务的自动提交

```java
SqlSession session = factory.openSession(false);// 关闭自动提交
```

关闭后，手动提交和回滚

```java
session.commit();
session.rollback();
```

### 注解开发

使用注解可以不再使用XXXMapper.xml文件

而是直接在接口上加上对应注解和sql语句，例如下面语句

```java
@Select("select * from student")
List<Student> getStudents();
// 使用属性插入
@Insert("insert into student(name, gender) values(#{name}, #{gender})")
int addStudent(@Param("name") String name, @Param("gender") String gender);
// 对象映射插入
@Insert("insert into student(name, gender) values(#{name}, #{gender})")
int addStudent(Student student);
```

其他使用和以前一致

## Spring整合Mybatis

### 导入多个依赖

```xml
<!-- 持久层框架依赖 -->
<!-- 连接mysql驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.30</version>
</dependency>
<!-- spring整合mybatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.7</version>
</dependency>
<!-- mybatis依赖 -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.11</version>
</dependency>
<!-- spring jdbc依赖 -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.23</version>
</dependency>
<!-- Hikari数据库连接池 -->
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>3.4.5</version>
</dependency>
```

### 使用mybatis

在MainConfig类里面注册bean，导入mybatis模板引擎

```java
@Bean
public SqlSessionTemplate sqlSessionTemplate() throws IOException {
    return new SqlSessionTemplate(new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml")));
}
```

编辑好mybatis-config.xml配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/book_manage"/>
                <property name="username" value="root"/>
                <property name="password" value="80root"/>
            </dataSource>
        </environment>
    </environments>
</configuration>
```

然后将impl添加@Component注解，开启@ComponentScan包扫描

使用SqlSessionTemplate，@Resaurce注入，通过template.getMapper()方法获取mapper对象

```java
@Resource
SqlSessionTemplate template;

@Test
public void test1(){
    BookMapper mapper = template.getMapper(BookMapper.class);
    System.out.println(mapper.getBooks());
}
```

更加简洁的方法，在可以直接在BookServiceImpl里面注入BookMapper mapper（需要在配置类开启@MapperScan扫描mapper包），使用时注入BookService service

```java
@Resource
BookMapper mapper;

@Override
public Book getBook() {
    return mapper.getBook();
}
```

### 去除web.xml配置文件并自定义数据源

首先注册数据源DataSource，默认为PooledDataSource，这里使用Hikari数据库连接池

然后注册SqlSessionFactoryBean，注入并设置数据源

```java
@Bean
public DataSource dataSource(){
    // 默认PooledDataSource，这里使用Hikari数据库连接池
    HikariDataSource dataSource = new HikariDataSource();
    dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
    dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/book_manage");
    dataSource.setUsername("root");
    dataSource.setPassword("80root");
    return dataSource;
}

@Bean
public SqlSessionFactoryBean sqlSessionFactoryBean(@Autowired DataSource source{
    SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
    bean.setDataSource(source);
    return bean;
}
```

### 在配置类使用jdbc.properties文件

数据源

```java
@Bean
public DataSource dataSource() throws IOException {
    HikariDataSource dataSource = new HikariDataSource();// 配置数据源
    Properties prop = new Properties();// 使用properties文件保存连接数据
    prop.load(Resources.getResourceAsStream("jdbc.properties"));
    dataSource.setDriverClassName(prop.getProperty("hikari.driver"));
    dataSource.setJdbcUrl(prop.getProperty("hikari.url"));
    dataSource.setUsername(prop.getProperty("hikari.username"));
    dataSource.setPassword(prop.getProperty("hikari.password"));
    return dataSource;
}
```

### 数据库事务

开启数据库事务，在配置类加上注解@EnableTransactionManagement

然后把事务要做的事情封装到service层中的一个方法加上@Transactional注解即可

```java
@Transactional
@Override
public void testTx(String name, String sex) {
    // 测试事务
    mapper.testTX(name, sex);
    if (true) throw new RuntimeException("我是异常");
    mapper.testTX(name, sex);
}
```

## Mybatis架构

![图 1](https://s2.loli.net/2023/04/17/9WSID5kPtrgQAd6.png)  

1. mybatis 配置:mybatis-config.xml，此文件作为 mybatis 的全局配置文件，配置了 mybatis 的运行环境等信息。另一个 mapper.xml 文件即 sql 映射文件，文件中配置了操作数据库的 sql 语句。此文件需要在 mybatis-config.xml 中加载。
2. 通过 mybatis 环境等配置信息构造 SqlSessionFactory 即会话工厂
3. 由会话工厂创建 sqlSession 即会话，操作数据库需要通过 sqlSession 进行。
4. mybatis 底层自定义了 Executor 执行器接口操作数据库，Executor 接口有两个实现，一个是基本执行器、一个是缓存执行器。
5. Mapped Statement 也是 mybatis 一个底层封装对象，它包装了 mybatis 配置信息及 sql 映射信息等。mapper.xml 文件中一个 sql 对应一个 Mapped Statement 对象，sql 的 id 即是Mapped statement 的 id。
6. Mapped Statement 对 sql 执行输入参数进行定义，包括 HashMap、基本类型、pojo，Executor 通过 Mapped Statement 在执行 sql 前将输入的 java 对象映射至 sql 中，输入参数映射就是 jdbc 编程中对 preparedStatement 设置参数。
7. Mapped Statement 对 sql 执行输出结果进行定义，包括 HashMap、基本类型、pojo，Executor 通过 Mapped Statement 在执行 sql 后将输出结果映射至 java 对象中，输出结果映射过程相当于 jdbc 编程中对结果的解析处理过程。

### 全局配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <properties resource="db.properties"></properties>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://连接url"/>
                <property name="username" value="用户名"/>
                <property name="password" value="密码"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <!-- 添加包扫描 -->
        <!-- 这个配置也表示给包下的所有类取别名，默认的别名就是类名首字母小写。这个时候，我们在 Mapper 中，就可以利用 user 代替 User 全路径了-->
        <package name="包路径"/>
    </mappers>

    <settings>
        <setting name="lazyLoadingEnabled" value="true"/>
        <setting name="aggressiveLazyLoading" value="false"/>
    </settings>

</configuration>

```

全局配置中的文件非常多，主要有如下几方面：

- properties（属性）
- settings（全局配置参数）mapUnderscoreToCamelCase cacheEnabled
- typeAliases（类型别名）
- typeHandlers（类型处理器）
- objectFactory（对象工厂）
- plugins（插件）
- environments（环境集合属性对象）
- environment（环境子属性对象）
- transactionManager（事务管理）
- dataSource（数据源）
- mappers（映射器）

### 自定义typeHandlers

### 动态SQL

### 缓存

Mybatis  一级缓存的作用域是同一个 SqlSession，在同一个 sqlSession 中两次执行相同的 sql 语句，第一次执行完毕会将数据库中查询的数据写到缓存（内存），第二次会从缓存中获取数据将不再从数据库查询，从而提高查询效率。当一个 sqlSession 结束后该 sqlSession 中的一级缓存也就不存在了。Mybatis 默认开启一级缓存。

Mybatis 二级缓存是多个 SqlSession 共享的，其作用域是 mapper 的同一个 namespace，不同的 sqlSession 两次执行相同 namespace 下的 sql 语句且向 sql 中传递参数也相同即最终执行相同的 sql 语句，第一次执行完毕会将数据库中查询的数据写到缓存（内存），第二次会从缓存中获取数据将不再从数据库查询，从而提高查询效率。Mybatis 默认没有开启二级缓存需要在 setting 全局参数中配置开启二级缓存。

### 主键回填

这种方式比较简单，就是在插入节点上添加 useGeneratedKeys 属性，同时设置接收回传主键的属性。配置完成后，我们执行一个插入操作，插入时传入一个对象，插入完成后，这个对象的 id 就会被自动赋值，值就是刚刚插入成功的id。

```xml
<insert id="insertBook" useGeneratedKeys="true" keyProperty="id">
    insert into t_book (b_name,author) values (#{name},#{author});
</insert>
```

## 分页

### 原生方式实现分页

// todo

### pagehelper

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.3.2</version>
</dependency>
```

#### 通过xml方式注册插件

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

#### 通过配置类方式注册插件

在配置类的`SqlSessionFactoryBean`中加入`PageInterceptor`

```java
@Bean
public SqlSessionFactoryBean sqlSessionFactoryBean(@Autowired DataSource source){
    // 设置数据源
    SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
    bean.setDataSource(source);

    // 添加分页插件
    PageInterceptor pageInterceptor = new PageInterceptor();
    // properties文件设置属性
    // Properties p = new Properties();
    // p.setProperty("helperDialect","mysql");
    // pageInterceptor.setProperties(p);
    bean.setPlugins(pageInterceptor);
    return bean;
}
```

#### 使用分页插件

在查询所有的语句前，加入`PageHelper.startPage(pageNum, pageSize)`

```java
try (Page<Student> page = PageHelper.startPage(1, 3)) {
    List<Student> studentList = service.getStudent();
    // PageInfo<Student> pageInfo = new PageInfo<>(list, 导航分页页码数);
    PageInfo<Student> pageInfo = new PageInfo<>(studentList);
    System.out.println(pageInfo);
    // PageInfo包含的全部参数
    // PageInfo{
    // pageNum=1, pageSize=3, size=3,
    // startRow=1, endRow=3, total=11, pages=4,
    // list=Page{count=true, pageNum=1, pageSize=3, startRow=0, endRow=3, total=11, pages=4, reasonable=false, pageSizeZero=false}[list.toString内容],
    // prePage=0, nextPage=2,
    // isFirstPage=true, isLastPage=false,
    // hasPreviousPage=false, hasNextPage=true,
    // navigatePages=8, navigateFirstPage=1, navigateLastPage=4, navigatepageNums=[1, 2, 3, 4]
    // }
}
```
