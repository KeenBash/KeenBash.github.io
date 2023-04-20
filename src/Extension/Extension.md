---
category:
  - Extension
tag:
  - SpringBoot
---

# 拓展知识

## 对象命名

### 实体对象

- PO(Persistent Object): 持久化对象，封装数据库返回的对象
- VO(View Object): 视图对象，用于将数据封装返回给前端展示
- DTO(Data Transfer Object): 数据传输对象，可以用于后端接收前端请求参数的封装（展示层与服务层）
- BO(Business Object): 业务对象，把业务逻辑封装成一个对象
- DO(Domain Object): 领域对象，

按照规范来说mapper返回的都应该是po持久层对象，但是复杂查询一般会产生嵌套对象，一般将mapper分解，所有的mapper都返回持久层对象，对象的组装在sevice完成然后组装成dto，不过这样会导致sql执行过多，关于这个有很多讨论，

- 1就是分库分表之后，你无法在sql里面进行嵌套和链接
- 2就是使业务逻辑比较好维护
- 3这样相当于在应用中使用了哈希关联？
- 4查询分解可以减少锁的竞争

### 业务层

- entity/bean
- service---impl接口实现和service接口定义
- dao/mapper
- manager?
- converter层？复杂映射转换?
- cache
- utils
- handler
- intercepter
- config

### 对象转换

```java
public class BeanCopyUtils {

    private BeanCopyUtils() {
    }

    /**
     * 拷贝bean对象
     *
     * @param source 源对象
     * @param target 目标类
     * @param <T>    指定泛型
     * @return 返回目标对象
     */
    public static <T> T copyBean(Object source, Class<T> target) {
        // 创建目标对象
        T result;
        try {
            result = target.newInstance();
            // 属性拷贝
            BeanUtils.copyProperties(source, result);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    /**
     * 拷贝bean对象列表
     *
     * @param sources 源对象列表
     * @param target  目标类
     * @param <O>     源对象泛型
     * @param <T>     目标对象泛型
     * @return 返回目标对象列表
     */
    public static <O, T> List<T> copyBeanList(List<O> sources, Class<T> target) {
        return sources.stream()
                .map(o -> copyBean(o, target))
                .collect(Collectors.toList());
    }
}
```

## 全局异常处理

## 数据库

### where 1 = 1

在静态 SQL 中
向已经具有 WHERE 1=1 的查询添加条件时，此后的所有条件都将包含 AND，因此在注释掉试验查询的条件时更容易。

在动态 SQL 中
这也是以编程方式构建 SQL 查询时的常见做法。从“WHERE 1=1”开始，然后附加其他条件，例如“ and customer.id=:custId”，具体取决于是否提供了客户 ID。这允许开发人员在查询中附加以“and ...”开头的下一个条件。

而且查询优化器几乎肯定会删除它
