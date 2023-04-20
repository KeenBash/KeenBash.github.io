---
category:
  - JavaSE
tag:
  - 反射
  - 枚举
  - 注解
---

# Java

> CharSequence和String  
> java的时间格式，以及与数据库交互建议格式  
> 反射与自定义注解  
> 代理-静态代理-动态代理  
> java接口可以多继承  
> JSR 是 Java Specification Requests 的缩写，意思是“Java 规范提案”

## 反射

- Class
- Field
- Constructor
- Method

### Class

获取Class对象

```java
Class clazz = User.class;

// 通过已有实例对象获取类的 Class 对象
User user = new User();
Class clazz = user.getClass();

// 通过类的全限定名获取该类的 Class 对象
Class clazz = Class.forName("com.bean.user")
```

每个类的 Class 对象只有一个，也就是用上面三种方式获取的 Class 对象都是相同的。

### 构造对象

#### newInstance()

通过 Class 类的 newInstance() 方法创建对象，该方法要求该 Class 对应类有**public无参构造**方法。执行 newInstance()方法实际上就是使用对应类的无参构造方法来创建该类的实例，其代码的作用等价于Super sup = new Super()。

```java
Traget target = clazz.newInstance();
```

如果 Super 类没有无参构造方法，运行程序时则会抛出一个 InstantiationException 实例化异常。

#### 实例化私有对象

1. 获取 Class 对象
2. 通过 getDeclaredConstructor(Class<?>... parameterTypes) 获取到指定参数类型的构造方法
3. 接下来调用 setAccessible(true) 绕过private修饰符检查
4. 最后调用 newInstance() 传入相关参数，获取到类实例对象

```java
Constructor<User> constructor= User.class.getDeclaredConstructor(String.class);
// 忽略访问检查
constructor.setAccessible(true);
User user2 = constructor.newInstance("heihei");
```

> getConstructor()和getDeclaredConstructor()区别：  
> getDeclaredConstructor(Class\<?\>… parameterTypes)  
> 这个方法会返回指定参数类型的所有构造器，包括public的和非public的，当然也包括private的。  
> getConstructor(Class\<?\>… parameterTypes)  
> 只返回指定参数且类型访问权限是public的构造器。  

？？？？
每种功能内部以 Declared 细分：

有修饰的方法：可以获取该类内部包含的所有变量、方法和构造器，但是无法获取继承下来的信息

无修饰的方法：可以获取该类中修饰的变量、方法和构造器，可获取继承下来的信息

如果想获取类中**所有的（包括继承）**变量、方法和构造器，则需要同时调用和两个方法，用集合存储它们获得的变量、构造器和方法，以防两个方法获取到相同的东西。
？？？？

## enum

枚举与字符串常量

更加灵活的使用

## 注解

元注解

自定义注解

[Java注解之自定义注解实现](https://www.bilibili.com/read/cv13282317/)

[一小时搞明白自定义注解(Annotation)](https://mp.weixin.qq.com/s?__biz=MzA5MzI3NjE2MA==&mid=2650238479&idx=1&sn=cef582b5c5a15853f391d013a0747a9d&chksm=88639f60bf1416761f9da62e7b59c0d2f892d1b6f6e85a809f963dca593cffdcb14a9e171ddb&scene=27)

[aop实现自定义注解](https://blog.csdn.net/qq_22331931/article/details/106502625)

## 异常

检查型异常 throws?

非检查型异常
