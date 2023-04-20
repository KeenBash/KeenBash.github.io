---
category:
  - Extension
tag:
  - Blog
  - SpringBoot
---


# Blog 开发

- 》更加好的前后端分离实例ResponseResult
ResponseResult<?>
- 》全局异常处理
- 》Dto和Vo的实例
- 》日志解耦，可以使用aop加注解
- 》原生sql语句与mp使用wrapper
- 》数据库自动实现添加创建时间和修改时间与mp实现有什么不同
- 》注入mapper与注入service
- 》全局字符串常量与枚举类
<https://www.zhihu.com/question/33659578>
- 》程序终止时viewCount未写入mybatis
SpringBoot @PostConstruct和@PreDestroy使用
注: @PreDestroy已经从jdk 11版本开始移除了，所以在使用时需要额外引入javax.annotation-api：
实现接口DisposableBean
- 》article更新只有在内容更新时才自动填充更新时间
- 》HttpServletResponse类定义的代码
- 》MediaType.APPLICATION_JSON_VALUE、
- 》为什么都是逻辑删除

博客系统

[docker部署](https://blog.csdn.net/qq_52030824/article/details/127982206?)

maven多模块以及多模块之间的调用问题install根

公共部分framework

前台

后台

## 前端功能

### 需求分析

使用VO优化

联系
DTO类和VO类都是在java程序开发过程中用来接收数据和返回数据的类

区别
DTO代表服务层需要接收的数据和返回的数据

VO代表展示层需要显示的数据

字面值处理，使用常量类

封装Bean拷贝工具类

lombok链式

时间格式转化，配置fastjson

登录未带token异常处理

- 统一异常处理

前端token过期检查

- 评论文章
  
根评论

子评论

**问题：**评论头像？

id找不到可能是已删除，user判空，toUser判空

- 发送评论

SecurityUtils

配置MP字段自动填充，所以这个和数据库完成这个操作有什么区别呢

java.lang.String cannot be cast to org.blog.domain.entity.LoginUser

token失效后用postman发送成功。不带token发送成功

友链评论type

- 个人中心

- 头像上传

使用oss,七牛云

测试使用七牛云对象存储

```xml
<dependency>
    <groupId>com.qiniu</groupId>
    <artifactId>qiniu-java-sdk</artifactId>
    <version>[7.7.0, 7.7.99]</version>
</dependency>
```

对应文件夹滚动名称

上传实现

前端上传好像没带token?

评论区头像问题

- 注册账号

validation参数校验

- Aop实现日志记录接口调用信息

自定义注解知识

- 更新浏览次数

1. 应用启动时把浏览量存入redis
2. 访问时更新到redis
3. 定时存入mysql数据库（定时任务）
4. 从redis中获取viewCount

CommandLineRunner

定时任务，xxl-job

@EnableScheduling

cron表达式

[在线Cron表达式生成器](https://cron.qqe2.com/index-old.html)

秒（0-59）  分钟（0-59）  小时（0-23）  日（1-最后）  月（1-12）  周（1日-7） 年

\*

,数组 1,2,3 每个

\- 1-3

/ 0/5 0~5

包括多个地方查浏览量

- swagger2

knife4j

@EnableSwagger2

<http://localhost:7777/swagger-ui.html>

swagger配置文件SwaggerConfig

```java
@Configuration
public class SwaggerConfig {

    @Bean
    public Docket customDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("org.blog.controller"))
                .build();
    }

    private ApiInfo apiInfo() {
        Contact contact = new Contact("团队名", "http://localhost:8080", "my@email.cn");
        return new ApiInfoBuilder()
                .title("标题")
                .description("描述")
                .contact(contact)
                .version("1.0.1")
                .build();
    }
}
```

在实体类中添加说明

在实体类上使用注解​​​@ApiModel​​​ 在字段上使用注解​​@ApiModelProperty​​

controller中添加说明

在类上添加注解​​​@Api​​​，在方法上添加注解​​@ApiOperation​​

@Api注解

```java
@Api(tags = "评论接口", description = "评论相关接口")
```

@ApiOperation

```java
@ApiOperation(value = "友链评论列表", notes = "获取友链评论")
```

@Api参数描述

## 后端界面

动态路由

getInfo接口

菜单

getRouters接口

登出

java.lang.String cannot be cast to org.blog.domain.entity.LoginUser原因是holder里面没有这个东西能够让自己转换

标签管理

```java
@TableField(fill = FieldFill.INSERT)
private Long createBy;
@TableField(fill = FieldFill.INSERT)
private Date createTime;
@TableField(fill = FieldFill.INSERT_UPDATE)
private Long updateBy;
@TableField(fill = FieldFill.INSERT_UPDATE)
private Date updateTime;
```

都是逻辑删除

- 导出excel

- 接口权限控制

自定义权限获取接口以及校验

是否置顶代码写反了

角色先跳过

## 最佳实例

