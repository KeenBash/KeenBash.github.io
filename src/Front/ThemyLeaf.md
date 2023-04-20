---
category:
  - Front
tag:
  - ThemyLeaf
---

# ThemyLeaf

[官方文档](https://www.thymeleaf.org/documentation.html)

- [ThemyLeaf](#themyleaf)
  - [命名空间](#命名空间)
  - [语法介绍](#语法介绍)
    - [表达式](#表达式)
      - [变量表达式${}](#变量表达式)
      - [选择变量表达式\*{}](#选择变量表达式)
      - [表达式@](#表达式-1)
    - [行内写法](#行内写法)
    - [th 属性](#th-属性)
    - [公共页面](#公共页面)
      - [引入](#引入)
      - [传递参数](#传递参数)
  - [导入依赖](#导入依赖)
  - [SSM整合ThemyLeaf](#ssm整合themyleaf)
    - [配置spring-mvc.xml](#配置spring-mvcxml)
    - [使用](#使用)
  - [SpringBoot整合](#springboot整合)

## 命名空间

```html
xmlns:th="http://www.thymeleaf.org"
```

## 语法介绍

### 表达式

#### 变量表达式${}

使用`${...}`包裹的表达式被称为变量表达式，该表达式具有以下功能：

- 获取对象的属性和方法
- 使用内置的基本对象
- 使用内置的工具对象

1.获取对象的属性和方法

使用变量表达式可以获取对象的属性和方法，例如，获取 person 对象的 lastName 属性，表达式形式如下：

```html
${person.lastName}
```

2.使用内置的基本对象

使用变量表达式还可以使用内置基本对象，获取内置对象的属性，调用内置对象的方法。Thymeleaf 中常用的内置基本对象如下：

- request：HttpServletRequest 对象（仅在 Web 应用中可用）；
- response：HttpServletResponse 对象（仅在 Web 应用中可用）；
- session：HttpSession 对象（仅在 Web 应用中可用）；
- servletContext：ServletContext 对象（仅在 Web 应用中可用）。

例如，我们通过以下 2 种形式，都可以获取到 session 对象中的 map 属性：

```html
${#session.getAttribute('map')}
${session.map}
```

3.使用内置的工具对象

除了能使用内置的基本对象外，变量表达式还可以使用一些内置的工具对象。

- strings：字符串工具对象，常用方法有：equals、equalsIgnoreCase、length、trim、toUpperCase、toLowerCase、indexOf、substring、replace、startsWith、endsWith，contains 和 containsIgnoreCase 等；
- numbers：数字工具对象，常用的方法有：formatDecimal 等；
- bools：布尔工具对象，常用的方法有：isTrue 和 isFalse 等；
- arrays：数组工具对象，常用的方法有：toArray、length、isEmpty、contains 和 containsAll 等；
- lists/sets：List/Set 集合工具对象，常用的方法有：toList、size、isEmpty、contains、containsAll 和 sort 等；
- maps：Map 集合工具对象，常用的方法有：size、isEmpty、containsKey 和 containsValue 等；
- dates：日期工具对象，常用的方法有：format、year、month、hour 和 createNow 等。

例如，我们可以使用内置工具对象 strings 的 equals 方法，来判断字符串与对象的某个属性是否相等，代码如下。

```html
${#strings.equals('编程',name)}
```

#### 选择变量表达式*{}

选择变量表达式与变量表达式功能基本一致，只是在变量表达式的基础上增加了与 th:object 的配合使用。当使用 th:object 存储一个对象后，我们可以在其后代中使用选择变量表达式（`*{...}`）获取该对象中的属性，其中，“*”即代表该对象。

```html
<div th:object="${session.user}" >
    <p th:text="*{fisrtName}">firstname</p>
</div>
```

> th:object 用于存储一个临时变量，该变量只在该标签及其后代中有效

#### 表达式@

### 行内写法

直接在标签内写[[${xxx}]]

### th 属性

|属性|描述|示例|
|---|---|---|
|th:id|替换 HTML 的 id 属性|`<input  id="html-id"  th:id="thymeleaf-id"/>`|
|th:text|文本替换，转义特殊字符|`<h1 th:text="hello，bianchengbang" >hello</h1>`|
|th:utext|文本替换，不转义特殊字符|`<div th:utext="'<h1>欢迎来到编程帮！</h1>'" >欢迎你</div>`|

`th:each`用法

```html
<tr th:each="teacher,count:${teachers.list}">
```

迭代下标变量用法：

状态变量定义在一个th:每个属性和包含以下数据:

- index: 当前迭代对象的迭代索引，从0开始，这是索引属性；
- count: 当前迭代对象的迭代索引，从1开始，这个是统计属性；
- size: 迭代变量元素的总量，这是被迭代对象的大小属性；
- current: 当前迭代变量；
- even/odd: 布尔值，当前循环是否是偶数/奇数（从0开始计算）；
- first: 布尔值，当前循环是否是第一个；
- last: 布尔值，当前循环是否是最后一个；

`th:if`用于判断

用法:

`th:if="${xx} lt 'x'"` <-----------> `xx < x`

thymeleaf 判断表达式：

- gt：great than（大于）>
- ge：great equal（大于等于）>=
- eq：equal（等于）==
- lt：less than（小于）<
- le：less equal（小于等于）<=
- ne：not equal（不等于）!=

### 公共页面

#### 引入

include insert replace

将公共页面片段抽取出来，存放在 commons.html 中，代码如下。

```html
<div th:fragment="fragment-name">
    <span>公共页面片段</span>
</div>
```

th:replace：将代码块片段整个替换使用了 th:replace 属性的 HTML 标签中

在页面 fragment.html 中引入 commons.html 中声明的页面片段，可以通过以下方式实现。

```html
<!-- th:replace 片段名引入 -->
<div th:replace="commons::fragment-name"></div>
```

可以用id, 然后使用`commons::#id`选择

#### 传递参数

引用公共页面片段时，我们可以通过以下 2 种方式，将参数传入到被引用的页面片段中：

- 模板名::选择器名或片段名(参数1=参数值1,参数2=参数值2)
- 模板名::选择器名或片段名(参数值1,参数值2)

> 注：
> 若传入参数较少时，一般采用第二种方式，直接将参数值传入页面片段中
> 若参数较多时，建议使用第一种方式，明确指定参数名和参数值

```html
<!--th:replace 片段名引入-->
<div th:replace="commons::fragment-name(var1='replace-name',var2='replace-name2')"></div>
```

在声明页面片段时，我们可以在片段中声明并使用这些参数，例如：

```html
<!--使用 var1 和 var2 声明传入的参数，并在该片段中直接使用这些参数 -->
<div th:fragment="fragment-name(var1,var2)">
    <p th:text="'参数1:'+${var1} + '-------------------参数2:' + ${var2}">...</p>
</div>
```

## 导入依赖

```xml
<dependency>
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf-spring5</artifactId>
    <version>3.0.15.RELEASE</version>
</dependency>
```

## SSM整合ThemyLeaf

### 配置spring-mvc.xml

默认视图解析器

```xml
<!-- 默认视图解析器 -->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/pages/"/>
    <property name="suffix" value=".html"/>
    <property name="order" value="2"/>
</bean>
```

转换为themyleaf

```xml
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

```

### 使用

## SpringBoot整合

导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

查看自动配置了什么 ThemyleafProperties

配好了 SpringTemplateEngine
