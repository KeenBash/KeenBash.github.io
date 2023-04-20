---
category:
  - Front
tag:
  - JQuery
---

# JQuery

[JQuery参考](https://www.w3cschool.cn/jquery/)

- [JQuery](#jquery)
  - [jQuery](#jquery-1)
    - [引入 jQuery](#引入-jquery)
    - [jQuery 语法](#jquery-语法)
    - [文档就绪事件](#文档就绪事件)
    - [jQuery 选择器](#jquery-选择器)
    - [jQuery 事件](#jquery-事件)
    - [jQuery DOM 操作](#jquery-dom-操作)
      - [text()、html() 以及 val()](#texthtml-以及-val)
      - [attr()](#attr)
    - [jQuery 添加元素](#jquery-添加元素)
    - [jQuery 删除元素](#jquery-删除元素)
    - [jQuery 操作 CSS](#jquery-操作-css)
    - [jQuery 遍历](#jquery-遍历)
      - [向上遍历 DOM 树](#向上遍历-dom-树)
      - [向下遍历 DOM 树](#向下遍历-dom-树)
      - [在 DOM 树中水平遍历](#在-dom-树中水平遍历)
      - [过滤](#过滤)
  - [jQuery AJAX](#jquery-ajax)
    - [$.ajax()](#ajax)
    - [$.get() 方法](#get-方法)
    - [$.post() 方法](#post-方法)

## jQuery

### 引入 jQuery

在线引入

```html
<script src="https://code.jquery.com/jquery-3.6.2.min.js"></script>
```

本地引入

### jQuery 语法

jQuery 语法是通过选取 HTML 元素，并对选取的元素执行某些操作。

基础语法： $(selector).action()

- 美元符号定义 jQuery
- 选择符（selector）"查询"和"查找" HTML 元素
- jQuery 的 action() 执行对元素的操作

>**备注：** jQuery 使用的语法是 XPath 与 CSS 选择器语法的组合。
>
>**备注：** 您可以通过全名 JQuery 方法替代简写的 $ 方式来使用 jQuery

### 文档就绪事件

您也许已经注意到在我们的实例中的所有 jQuery 函数位于一个 document ready 函数中：

```javascript
$(document).ready(function(){

// 开始写 jQuery 代码...

}); 
```

这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码。

简洁写法（与以上写法效果相同）:

```javascript
$(function(){

// 开始写 jQuery 代码...

}); 
```

### jQuery 选择器

```java
$("button").click(function(){
    $("p").hide();
});
```

jQuery 选择器基于元素的 id、类、类型、属性、属性值等"查找"（或选择）HTML 元素。它基于已经存在的 CSS 选择器，除此之外，它还有一些自定义的选择器。

这意味着他选择元素的方法也类似于 document.querySelector(), 不过是使用$()方式。

下面的例子把所有 p 元素的背景颜色更改为红色：

```javascript
$("p").css("background-color","red");
```

### jQuery 事件

常见 DOM 事件：

|鼠标事件|键盘事件|表单事件|文档/窗口事件|
|---|---|---|---|
|click|keypress|submit|load|
|dblclick|keydown|change|resize|
|mouseenter|keyup|focus|scroll|
|mouseleave||blur|unload
|hover|

在 jQuery 中，大多数 DOM 事件都有一个等效的 jQuery 方法。

页面中指定一个点击事件：

```javascript
$("p").click(function(){      
    // action goes here!!        
});
```

`hover()`方法用于模拟光标悬停事件。

当鼠标移动到元素上时，会触发指定的第一个函数(mouseenter)，当鼠标移出这个元素时，会触发指定的第二个函数(mouseleave)。

```javascript
$("#p1").hover(function(){
    alert("You entered p1!");
    },
    function(){
    alert("Bye! You now leave p1!");
});
```

### jQuery DOM 操作

#### text()、html() 以及 val()

三个用于 DOM 操作的 jQuery 方法：

- text() - 设置或返回所选元素的文本内容
- html() - 设置或返回所选元素的内容（包括 HTML 标记）
- val() - 设置或返回表单字段的值

```javascript
$("#btn1").click(function(){
    $("#test").val("Hello");
    alert("Value: " + $("#test").val());
});
```

上面的三个 jQuery 方法：text()、html() 以及 val()，同样拥有**回调函数**。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。

```javascript
$("#btn1").click(function(){
  $("#test1").text(function(i,origText){
    return "Old text: " + origText + " New text: Hello world!
    (index: " + i + ")";
  });
});

```

#### attr()

attr() 方法也用于设置/改变属性值。

```javascript
$("button").click(function(){
    $("#link").attr("href", url);
    alert($("#link").attr("href"));
});
```

attr() 方法也允许您同时设置多个属性。

```javascript
$("button").click(function(){
  $("#link").attr({
    "href" : url,
    "title" : title
  });
});
```

attr()，也提供回调函数如上。

### jQuery 添加元素

我们将学习用于添加新内容的四个 jQuery 方法：

- append() - 在被选元素内部的结尾插入指定内容
- prepend() - 在被选元素内部的开头插入指定内容
- after() - 在被选元素之后插入内容
- before() - 在被选元素之前插入内容

append() 和 prepend() 方法能够通过参数接收无限数量的新元素。可以通过 jQuery 来生成文本/HTML（就像上面的例子那样），或者通过 JavaScript 代码和 DOM 元素。

```javascript
function appendText() {
    // 使用 HTML 标签创建文本 
    let txt1 = "<p>Text</p>";
    // 使用 jQuery 创建文本               
    let txt2 = $("<p></p>").text("Text");
    // 使用 DOM 创建文本 text 
    let txt3 = document.createElement("p");  
    txt3.innerHTML = "文本"; 
    // 追加新元素               
    $("p").append(txt1,txt2,txt3);         
}
```

### jQuery 删除元素

如需删除元素和内容，一般可使用以下两个 jQuery 方法：

- remove() - 删除被选元素（及其子元素）
- empty() - 从被选元素中删除子元素

过滤被删除的元素

jQuery remove() 方法也可接受一个参数，允许您对被删元素进行过滤。

该参数可以是任何 jQuery 选择器的语法。

```javascript
$("p").remove(".italic");
```

### jQuery 操作 CSS

jQuery 拥有若干进行 CSS 操作的方法。我们将学习下面这些：

- addClass() - 向被选元素添加一个或多个类
- removeClass() - 从被选元素删除一个或多个类
- toggleClass() - 对被选元素进行添加/删除类的切换操作
- css() - 设置或返回样式属性

在添加类时，您也可以选取多个元素，用逗号隔开

css() 方法

如需返回指定的 CSS 属性的值，请使用如下语法：

```javascript
css("propertyname");
```

如需设置指定的 CSS 属性，请使用如下语法：

```javascript
css("propertyname","value");
```

设置多个 CSS 属性语法类似json键值对

```javascript
css({"k1":"v1","k2":"v2"});
```

### jQuery 遍历

#### 向上遍历 DOM 树

这些 jQuery 方法很有用，它们用于向上遍历 DOM 树：

- parent() - 返回被选元素的直接父元素
- parents() - 返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (\<html>)。
- parentsUntil() - 返回介于两个给定元素之间的所有祖先元素。

parentsUntil()

```javascript
$(document).ready(function(){
  $("span").parentsUntil("div");
});
```

#### 向下遍历 DOM 树

下面是两个用于向下遍历 DOM 树的 jQuery 方法：

- children() - 返回被选元素的所有直接子元素
- find() - 返回被选元素的后代元素，一路向下直到最后一个后代

#### 在 DOM 树中水平遍历

有许多有用的方法让我们在 DOM 树进行水平遍历：

- siblings() - 返回被选元素的所有同胞元素
- next() - 返回被选元素的下一个同胞元素
- nextAll() - 返回被选元素的所有跟随的同胞元素
- nextUntil() - 返回介于两个给定参数之间的所有跟随的同胞元素
- prev()
- prevAll()
- prevUntil()

#### 过滤

三个最基本的过滤方法是：

- first() - 返回被选元素的首个元素
- last() - 返回被选元素的最后一个元素
- eq() - 返回被选元素中带有指定索引号的元素

```javascript
$(document).ready(function(){
  $("p").eq(1);
});
```

## jQuery AJAX

### \$.ajax()

参数：

- type：请求方式GET/POST
- url: 请求地址 url
- data：发送到服务器的数据
- dataType：预期服务器返回的数据类型
- contentType：设置请求头
- success：请求成功时调用此函数
- error：请求失败时调用此函数

```javascript
$('#bt').click(function () {
    $.ajax({
        type: "get",        
        url: "js/data.txt", 
        dataType: "json",   
        success: function (data) {   
            // Dom 操作
        }
    });
});
```

### \$.get() 方法

```javascript
$.get(URL,data,callback);
```

- URL 参数规定您希望请求的 URL。
- data 参数规定连同请求发送的数据。
- callback 参数是请求成功后所执行的函数名。

### \$.post() 方法

```javascript
$.post(URL,data,callback); 
```

- URL 参数规定您希望请求的 URL。
- data 参数规定连同请求发送的数据。
- callback 参数是请求成功后所执行的函数名。

```javascript
$("button").click(function(){
  $.post("url",
  {
    name:"Donald Duck",
    city:"Duckburg"
  },
  function(data,status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});
```
