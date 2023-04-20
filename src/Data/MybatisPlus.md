---
category:
  - Data
tag:
  - MybatisPlus
---

# MybatisPlus

[MybatisPlus](https://baomidou.com/)

因为 MP 底层是 MyBatis，所以 MP 只是帮您注入了常用 CRUD 到 MyBatis 里，注入之前是动态的（根据您的 Entity 字段以及注解变化而变化），但是注入之后是静态的（等于 XML 配置中的内容）。

## 快速上手

依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.2</version>
</dependency>
```

### 注解

- @TableName()

表名注解，标识实体类对应的表

excludeProperty 需要排除的属性名

- @TableId

主键注解

type 指定主键类型

- @TableField

exist 是否为数据库表字段

### 内置方法

<https://baomidou.com/pages/49cc81/>

继承`BaseMapper<Type>`

### wrapper方法

---

[雪花算法](https://zhuanlan.zhihu.com/p/433690272)

### Service

```java
public interface ArticleService extends IService<Article> {
}
```

```java
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {
}
```

### easycode插件

![图 1](https://s2.loli.net/2023/03/11/sc7IBNKpClGWdhT.png)  

### 分页插件

PaginationInnerInterceptor

---

逻辑删除

```yaml
mybatis-plus:
  configuration:
    # 日志
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      # 指定逻辑删除
      logic-delete-field: delFlag
      logic-delete-value: 1
      logic-not-delete-value: 0
      # 主键自增
      # 默认是雪花+UUID
      id-type: auto
```
