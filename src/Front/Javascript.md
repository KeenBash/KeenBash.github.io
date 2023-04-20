---
category:
  - Front
tag:
  - Javascript
---

# Javascript

[Javascript参考](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps)

- [Javascript](#javascript)
  - [概述](#概述)
    - [向页面添加 JavaScript](#向页面添加-javascript)
    - [async 和 defer](#async-和-defer)
    - [注释](#注释)
    - [变量](#变量)
    - [var 与 let 的区别](#var-与-let-的区别)
    - [变量类型](#变量类型)
    - [运算符](#运算符)
    - [字符串](#字符串)
    - [数组](#数组)
    - [函数（Function）](#函数function)
  - [事件](#事件)
    - [addEventListener() 和 removeEventListener()](#addeventlistener-和-removeeventlistener)
    - [事件对象](#事件对象)
    - [阻止默认行为](#阻止默认行为)
    - [事件冒泡及捕获](#事件冒泡及捕获)
    - [事件委托](#事件委托)
  - [对象](#对象)
    - [访问属性](#访问属性)
    - [对象原型](#对象原型)
    - [类与实例](#类与实例)
    - [json](#json)
  - [异步JavaScript](#异步javascript)
    - [回调](#回调)
    - [Promise](#promise)
    - [错误捕获](#错误捕获)
    - [Promise 术语](#promise-术语)
    - [async 和 await](#async-和-await)
    - [workers](#workers)
  - [客户端 Web API](#客户端-web-api)
    - [操作文档](#操作文档)
    - [文档对象模型](#文档对象模型)
    - [创建并放置新的节点](#创建并放置新的节点)
    - [移动和删除元素](#移动和删除元素)
    - [操作样式](#操作样式)
    - [从服务器获取数据](#从服务器获取数据)
      - [XMLHttpRequest](#xmlhttprequest)
      - [Fetch](#fetch)
    - [绘图](#绘图)
    - [视频和音频](#视频和音频)

## 概述

### 向页面添加 JavaScript

内部 JavaScript

```html
<script>

  // 在此编写 JavaScript 代码

</script>
```

外部 JavaScript

```css
<script src="script.js" async></script>
```

内联 JavaScript 处理器

```html
<button onclick="createParagraph()">点我呀</button>
<button onclick="alert('Hello, this is my old-fashioned event handler!');">Press me</button>
```

**然而请不要这样做。** 这将使 JavaScript 污染到 HTML，而且效率低下。对于每个需要应用 JavaScript 的按钮，你都得手动添加 onclick="createParagraph()" 属性。

可以使用纯 JavaScript 结构来通过一个指令选取所有按钮。下文的这段代码即实现了这一目的：

```javascript
function createParagraph() {
    let para = document.createElement('p');
    para.textContent = '你点击了这个按钮！';
    document.body.appendChild(para);
}

const buttons = document.querySelectorAll('button');

for(let i = 0; i < buttons.length ; i++) {
    buttons[i].addEventListener('click', createParagraph);
}
```

在上文的“内部”、“外部”示例中，JavaScript 调用于文档头处，解析 HTML 文档体之前。这样做是有隐患的，需要使用一些结构来避免错误发生。

“内部”示例使用了以下结构：

```javascript
document.addEventListener("DOMContentLoaded", function() {
  . . .
});
```

这是一个事件监听器，它监听浏览器的 `"DOMContentLoaded"` 事件，即 HTML 文档体加载、解释完毕事件。事件触发时将调用 " . . ." 处的代码，从而避免了错误发生。

“外部”示例中使用了 JavaScript 的一项现代技术（`async` “异步”属性）来解决这一问题，它告知浏览器在遇到 `<script>` 元素时不要中断后续 HTML 内容的加载。

```html
<script src="script.js" async></script>
```

>**备注：** “外部”示例中 async 属性可以解决调用顺序问题，因此无需使用 DOMContentLoaded 事件。而 async 只能用于外部脚本，因此不适用于“内部”示例。

解决此问题的**旧方法**是：把脚本元素放在文档体的底端（ \</body> 标签之前，与之相邻），这样脚本就可以在 HTML 解析完毕后加载了。此方案（以及上述的 DOMContentLoaded 方案）的问题是：只有在所有 HTML DOM 加载完成后才开始脚本的加载/解析过程。对于有大量 JavaScript 代码的大型网站，可能会带来显著的性能损耗。这也是 async 属性诞生的初衷。

### async 和 defer

上述的脚本阻塞问题实际有两种解决方案 —— `async` 和 `defer`。我们来依次讲解。

浏览器遇到 async 脚本时不会阻塞页面渲染，而是直接下载然后运行。这样脚本的运行次序就无法控制，只是脚本不会阻止剩余页面的显示。当页面的脚本之间彼此独立，且不依赖于本页面的其它任何脚本时，async 是最理想的选择。

比如，如果你的页面要加载以下三个脚本：

```html
<script async src="js/vendor/jquery.js"></script>
<script async src="js/script2.js"></script>
<script async src="js/script3.js"></script>
```

三者的调用顺序是不确定的。jquery.js 可能在 script2 和 script3 之前或之后调用，如果这样，后两个脚本中依赖 jquery 的函数将产生错误，因为脚本运行时 jquery 尚未加载。

解决这一问题可使用 defer 属性，脚本将按照在页面中出现的顺序加载和运行：

```html
<script defer src="js/vendor/jquery.js"></script>
<script defer src="js/script2.js"></script>
<script defer src="js/script3.js"></script>
```

添加 defer 属性的脚本将按照在页面中出现的顺序加载，因此第二个示例可确保 jquery.js 必定加载于 script2.js 和 script3.js 之前，同时 script2.js 必定加载于 script3.js 之前。

脚本调用策略小结：

- 如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 async。
- 如果脚本需要等待页面解析，且依赖于其它脚本，调用这些脚本时应使用 defer，将关联的脚本按所需顺序置于 HTML 中。

### 注释

注释非常有用，而且应该经常使用，尤其在大型应用中。注释分为两类：

在双斜杠后添加单行注释，比如：

// 我是一条注释

在 /\* 和 \*/ 之间添加多行注释，比如：
/*
  我也是
  一条注释
*/

### 变量

声明一个变量的语法是在 var 或 let 关键字之后加上这个变量的名字：

变量本质上是值（例如数字或字符串）的名称。你可以使用关键字 let 和一个名字来创建变量。

>**备注：** 在 JavaScript 中，所有代码指令都会以分号结尾';' — 如果忘记加分号，你的单行代码可能执行正常，但是在多行代码在一起的时候就可能出错。所以，最好是养成主动以分号作为代码结尾的习惯。

常量也用于对值进行命名，但其不像变量，在创建后讲无法修改这个值。你可以使用关键字 const 和一个名字来创建常量。

### var 与 let 的区别

原因是有些历史性的。回到最初创建 JavaScript 时，是只有 var 的。在大多数情况下，这种方法可以接受，但有时在工作方式上会有一些问题——它的设计会令人困惑或令人讨厌。因此，let 是在现代版本中的 JavaScript 创建的一个新的关键字，用于创建与 var 工作方式有些不同的变量，解决了过程中的问题。

首先，如果你编写一个声明并初始化变量的多行 JavaScript 程序，你可以在初始化一个变量之后用 var 声明它，它仍然可以工作。例如：

```javascript
myName = 'Chris';

function logName() {
  console.log(myName);
}

logName();

var myName;
```

使用 var 声明的变量将在任何代码执行前被创建，这被称为**变量提升**。这些变量的初始值为 undefined。
这意味着变量可以在声明之前使用，这个行为叫做 **“hoisting”** 。“hoisting”就像是把所有的变量声明移动到函数或者全局代码的开头位置。

```javascript
function do_something() {
  console.log(bar); // undefined
  var bar = 111;
  console.log(bar); // 111
}

// 可以隐式地将以上代码理解为：

function do_something() {
  var bar;
  console.log(bar); // undefined
  bar = 111;
  console.log(bar); // 111
}
```

let 允许你声明一个作用域被限制在块作用域中的变量、语句或者表达式。

let 声明的变量不会在作用域中被提升，它是在编译时才初始化。

从一个代码块的开始直到代码执行到声明变量的行之前，let 或 const 声明的变量都处于 **“暂时性死区”**（Temporal dead zone，TDZ）中。当变量处于暂时性死区之中时，其尚未被初始化，尝试访问变量将抛出 ReferenceError。当代码执行到声明变量所在的行时，变量被初始化为一个值。如果声明中未指定初始值，则变量将被初始化为 undefined。

### 变量类型

- Number

JavaScript 采用“遵循 IEEE 754 标准的双精度 64 位格式”（"double-precision 64-bit format IEEE 754 values"）表示数字。

在 JavaScript（除了BigInt）当中，**并不存在整数/整型 (Integer)。**因此在处理如下的场景时候，您一定要小心：

```javascript
console.log(3 / 2);             // 1.5,not 1
console.log(Math.floor(3 / 2)); // 1
```

在具体实现时，整数值通常被视为 32 位整型变量

- String

可以使用内置函数 parseInt() 将字符串转换为整型。该函数的第二个可选参数表示字符串所表示数字的基（进制）

```javascript
parseInt("123", 10); // 123
parseInt("010", 10); // 10
```

- Boolean

1. false、0、空字符串（""）、NaN、null 和 undefined 被转换为 false
2. 所有其他值被转换为 true

- Array

数组是一个单个对象，其中包含很多值，方括号括起来，并用逗号分隔。

Object

```javascript
let dog = { 
  name : 'Spot', 
  breed : 'Dalmatian' 
};
typeof dog;

dog.name访问
```

我们使用了一个名为typeof的特殊的操作符 ——它会返回所传递给它的变量的数据类型。

### 运算符

算术运算符

`**` 幂 取底数的指数次方，即指数所指定的底数相乘。它在 EcmaScript 2016 中首次引入。

>**备注：** 有时你可能会看到使用较旧的 Math.pow() 方法表达的指数，该方法的工作方式非常相似。例如，在 Math.pow(7, 3) 中，7 是基数，3 是指数

比较运算符

=== 严格等于 测试左右值是否相同

!== 严格不等于 测试左右值是否不相同

>**备注：** 您可能会看到有些人在他们的代码中使用 == 和 != 来判断相等和不相等，这些都是 JavaScript 中的有效运算符，但它们与 === / !==不同，前者测试值是否相同，但是数据类型可能不同，而后者的严格版本测试值和数据类型是否相同。严格的版本往往导致更少的错误，所以我们建议您使用这些严格的版本。

### 字符串

获取字符串的长度

这很简单 — 你可以很轻松的使用 `length` 属性。

检索特定字符串字符

在相关的注释中，您可以使用 **方括号表示法** 返回字符串中的任何字符 - 这意味着您可以在变量名的末尾包含方括号（[ ]）。

在字符串中查找子字符串并提取它

有时候你会想要找出一个较小的字符串是否存在于一个较大的字符串中（我们通常会说一个字符串中存在一个子字符串）。这可以使用`indexOf()`方法来完成，该方法需要一个parameter — 你想要搜索的子字符串。尝试以下：

```javascript
browserType.indexOf('zilla');
```

结果是 2，因为子字符串“zilla”从“mozilla”内的位置 2（0，1，2 —— 所以从第 3 个字符）开始。这样的代码可以用来过滤字符串。例如，假设我们有一个 Web 地址列表，但我们只想打印出包含“mozilla”的那些地址。当在主字符串中找不到子字符串时将返回 -1.

当你知道字符串中的子字符串开始的位置，以及想要结束的字符时，`slice()`可以用来提取它。尝试以下：

```javascript
browserType.slice(0,3);
```

>**备注：** slice()的第二个参数是可选的：如果没有传入这个参数，分片结束位置会在原始字符串的末尾。

替换字符串的某部分

您可以使用`replace()`方法将字符串中的一个子字符串替换为另一个子字符串。

```javascript
browserType = browserType.replace('moz','van');
```

### 数组

字符串和数组之间的转换

这是一个字符串方法，我们可以使用 `split()` 方法。在其最简单的形式中，这需要一个参数，您要将字符串分隔的字符，并返回分隔符之间的子串，作为数组中的项。

您也可以使用 `join()` 方法进行相反的操作，这是一个数组方法。

```javascript
let myNewString = myArray.join(',');
myNewString;
```

添加和删除数组项

要在数组末尾 添加 或 删除 一个项目，我们可以使用 push() 和 pop()。

`push()` 当方法调用完成时，将返回数组的新长度。

`pop()` 当方法调用完成时，将返回已删除的项目。

`unshift()` 和 `shift()` 从功能上与 push() 和 pop() 完全相同，只是它们分别作用于数组的开始，而不是结尾。

如果您有一个数值变量，您想要将其转换为字符串，并且不改变其他地方，或者您想将一个字符串转换为一个数字而不改变其其他地方，那么您可以使用以下两个构造：
如果可以的话， `Number` 对象将把传递给它的任何东西转换成一个数字。 试一试：

```javascript
let myString = '123';
let myNum = Number(myString);
typeof myNum;
```

另一方面，每个数字都有一个名为 `toString()` 的方法，它将把它转换成等价的字符串。 试试这个：

```javascript
let myNum = 123;
let myString = myNum.toString();
typeof myString;
```

### 函数（Function）

```javascript
function checkGuess() {
  alert('I am a placeholder');
}
```

## 事件

[事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events)

事件是您在编程时系统内发生的动作或者发生的事情——系统会在事件出现时产生或触发某种信号，并且会提供一个自动加载某种动作

每个可用的事件都会有一个**事件处理器**，也就是事件触发时会运行的代码块。当我们定义了一个用来回应事件被激发的代码块的时候，我们说我们**注册了一个事件处理器**。注意事件处理器有时候被叫做**事件监听器**——从我们的用意来看这两个名字是相同的，尽管严格地来说这块代码既监听也处理事件。监听器留意事件是否发生，然后处理器就是对事件发生做出的回应。

```javascript
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random()*(number+1));
}

btn.onclick = function() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}
```

代码第三部分就是事件处理器。btn 变量指向 button 元素，在 button 这种对象上可触发一系列的事件，因此也就可以使用事件处理器。我们通过将一个匿名函数（这个赋值函数包括生成随机色并赋值给背景色的代码）赋值给“点击”事件处理器参数，监听“点击”这个事件。

这个 `onclick` 是被用在这个情景下的事件处理器的属性，它就像 button 其他的属性（如 btn.textContent, or btn.style ), 但是有一个特别的地方 —— 当您将一些代码赋值给它的时候，只要事件触发代码就会运行。

将 btn.onclick 依次换成其他值，在浏览器中观察效果。

- btn.onfocus 及 btn.onblur — 颜色将于按钮被置于焦点或解除焦点时改变（尝试使用 Tab 移动至按钮上，然后再移开）。这些通常用于显示有关如何在置于焦点时填写表单字段的信息，或者如果表单字段刚刚填入不正确的值，则显示错误消息。
- btn.ondblclick — 颜色将仅于按钮被双击时改变。
- window.onkeypress, window.onkeydown, window.onkeyup — 当按钮被按下时颜色会发生改变。keypress 指的是通俗意义上的按下按钮 (按下并松开), 而 keydown 和 keyup 指的是按键动作的一部分，分别指按下和松开。注意如果你将事件处理器添加到按钮本身，它将不会工作 — 我们只能将它添加到代表整个浏览器窗口的 window 对象中。
- btn.onmouseover 和 btn.onmouseout — 颜色将会在鼠标移入按钮上方时发生改变，或者当它从按钮移出时。

### addEventListener() 和 removeEventListener()

该事件机制还提供了许多其他强大的特性和选项。请查看 [addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 和 [removeEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener) 参考页面。

这个函数和事件处理属性是类似的，但是语法略有不同。我们可以重写上面的随机颜色背景代码：

```javascript
const btn = document.querySelector('button');

function bgChange() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}

btn.addEventListener('click', bgChange);
```

这个机制带来了一些相较于旧方式的优点。有一个相对应的方法，removeEventListener()，这个方法移除事件监听器。例如，下面的代码将会移除上个代码块中的事件监听器：

```javascript
btn.removeEventListener('click', bgChange);
```

您也可以使用这个方法给同一个监听器注册多个处理器，但是类似 myElement.onclick 的方式将会使最后一个事件处理器覆盖其他处理器，也就是只有最后一个处理器会生效。

### 事件对象

有时候在事件处理函数内部，您可能会看到一个固定指定名称的参数，例如event，evt或简单的e。这被称为事件对象，它被自动传递给事件处理函数，以提供额外的功能和信息。例如，让我们稍稍重写一遍我们的随机颜色示例：

```javascript
function bgChange(e) {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  // document.body.style.backgroundColor = rndCol;
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}

btn.addEventListener('click', bgChange);
```

在这里，您可以看到我们在函数中包括一个事件对象e，并在函数中设置背景颜色样式在 `e.target` 上——它指的是按钮本身。事件对象 e 的 target 属性始终是事件刚刚发生的元素的引用。所以在这个例子中，我们在按钮上设置一个随机的背景颜色，而不是页面。

### 阻止默认行为

有时，你会遇到一些情况，你希望事件不执行它的默认行为。最常见的例子是 Web 表单，例如自定义注册表单。当你填写详细信息并按提交按钮时，自然行为是将数据提交到服务器上的指定页面进行处理，并将浏览器重定向到某种“成功消息”页面

当用户没有正确提交数据时，麻烦就来了 - 作为开发人员，你希望停止提交信息给服务器，并给他们一个错误提示，告诉他们什么做错了，以及需要做些什么来修正错误。

我们来看一个简单的例子。

```html
<form>
  <div>
    <label for="fname">First name: </label>
    <input id="fname" type="text">
  </div>
  <div>
    <label for="lname">Last name: </label>
    <input id="lname" type="text">
  </div>
  <div>
     <input id="submit" type="submit">
  </div>
</form>
<p></p>
```

这里我们用一个`onsubmit`事件处理程序（在提交的时候，在一个表单上发起submit事件）来实现一个非常简单的检查，用于测试文本字段是否为空。如果是，我们在事件对象上调用 `preventDefault()` 函数，这样就停止了表单提交，然后在我们表单下面的段落中显示一条错误消息，告诉用户什么是错误的：

```javascript
const form = document.querySelector('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const submit = document.getElementById('submit');
const para = document.querySelector('p');

form.onsubmit = function(e) {
  if (fname.value === '' || lname.value === '') {
    e.preventDefault();
    para.textContent = 'You need to fill in both names!';
  }
}
```

### 事件冒泡及捕获

当一个事件发生在具有父元素的元素上时，现代浏览器运行两个不同的阶段 - 捕获阶段和冒泡阶段。

在**捕获**阶段：

- 浏览器检查元素的最外层祖先\<html>，是否在捕获阶段中注册了一个onclick事件处理程序，如果是，则运行它。
- 然后，它移动到\<html>中单击元素的下一个祖先元素，并执行相同的操作，然后是单击元素再下一个祖先元素，依此类推，直到到达实际点击的元素。

在**冒泡**阶段，恰恰相反：

- 浏览器检查实际点击的元素是否在冒泡阶段中注册了一个onclick事件处理程序，如果是，则运行它
- 然后它移动到下一个直接的祖先元素，并做同样的事情，然后是下一个，等等，直到它到达\<html>元素。

在现代浏览器中，默认情况下，所有事件处理程序都在冒泡阶段进行注册。

这是令人讨厌的行为，但有一种方法来解决它！标准事件对象具有可用的名为 stopPropagation()的函数，当在事件对象上调用该函数时，它只会让当前事件处理程序运行，但事件不会在冒泡链上进一步扩大，因此将不会有更多事件处理器被运行 (不会向上冒泡)。

```JavaScript
video.onclick = function(e) {
  e.stopPropagation();
  video.play();
};
```

### 事件委托

如果你想要在大量子元素中单击任何一个都可以运行一段代码，您可以将事件监听器设置在其父节点上，并让子节点上发生的事件冒泡到父节点上，而不是每个子节点单独设置事件监听器。

## 对象

```javascript
var person = {
  name : {
    first : 'Bob',
    last : 'Smith'
  },
  age : 32,
  gender : 'male',
  interests : ['music', 'skiing'],
  bio : function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};
```

一个如上所示的对象被称之为对象的**字面量** (literal) —— 手动的写出对象的内容来创建一个对象。

### 访问属性

点表示法

```javascript
person.age
person.name.first
```

另外一种访问属性的方式是使用括号表示法 (bracket notation)，替代这样的代码

```javascript
person['age']
person['name']['first']
```

设置成员并不意味着你只能更新已经存在的属性的值，你完全可以创建新的成员，尝试以下代码：

```javascript
person['eyes'] = 'hazel'
person.farewell = function() { alert("Bye everybody!") }
```

括号表示法一个有用的地方是它不仅可以动态的去设置对象成员的值，还可以动态的去设置成员的名字。

比如说，我们想让用户能够在他们的数据里存储自己定义的值类型，通过两个 input 框来输入成员的名字和值，通过以下代码获取用户输入的值：

```javascript
var myDataName = 'height'
var myDataValue = '1.75m'
person[myDataName] = myDataValue
```

这是使用点表示法无法做到的，点表示法只能接受字面量的成员的名字，不接受变量作为名字。

### 对象原型

[对象原型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes)

JavaScript 常被描述为一种**基于原型的语言 (prototype-based language)**——每个对象拥有一个**原型对象**，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为**原型链 (prototype chain)**，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

准确地说，这些属性和方法定义在 Object 的构造器函数 (constructor functions) 之上的prototype属性上，而非对象实例本身。

在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是__proto__属性，是从构造函数的prototype属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。

>**备注：** 理解对象的原型（可以通过 Object.getPrototypeOf(obj)或者已被弃用的__proto__属性获得）与构造函数的 prototype 属性之间的区别是很重要的。前者是每个实例上都有的属性，后者是构造函数的属性。也就是说，Object.getPrototypeOf(new Foobar()) 和 Foobar.prototype 指向着同一个对象。

JavaScript 可以在没有特定的类定义的情况下创建对象。

尽管原型链看起来很像是继承的层级结构，并且在某些方面，原型链的行为与继承的行为也很类似，但是在其他方面，二者之间仍然存在区别。

在原型链中，每一个层级都代表了一个不同的对象，不同的对象之间通过 `__proto__` 属性链接起来。原型链的行为并不太像是继承，而更像是**委派（delegation）**。

### 类与实例

```javascript
class Person {

  name;

  constructor(name) {
    this.name = name;
  }

  introduceSelf() {
    console.log(`Hi! I'm ${this.name}`);
  }

}
```

由类创建实例的过程是由一个特别的函数——构造函数`constructor`所完成的。开发人员将类所需要的值传入构造函数，构造函数即可根据传入的值初始化实例的内部状态。

如果你不需要任何特殊的初始化内容，你可以省略构造函数，默认的构造函数会被自动生成

继承

对于上文给出的 Person 类，我们声明一个它的子类 Professor。我们使用 extends 关键字来声明这个类继承自另一个类。

```javascript
class Professor extends Person {

  teaches;

  constructor(name, teaches) {
    // 如果子类有任何自己的初始化内容需要完成，它也必须先使用 super() 来调用父类的构造函数，并传递父类构造函数期望的参数。
    super(name);
    this.teaches = teaches;
  }

  // 覆盖了父类的 introduceSelf() 方法
  introduceSelf() {
    console.log(`My name is ${this.name}, and I will be your ${this.teaches} professor.`);
  }

  // 添加了一个新的方法 grade()
  grade(paper) {
    const grade = Math.floor(Math.random() * (5 - 1) + 1);
    console.log(grade);
  }
}
```

封装

私有数据属性

在类的声明中，`#year` 是一个私有数据属性。我们可以构造一个 Student 对象，然后在内部使用 #year，但如果在类的外部尝试访问 #year，浏览器将会抛出错误。

私有方法

与私有数据属性一样，你也可以声明私有方法。而且名称也是以 # 开头，只能在类自己的方法中调用。

### json

JSON 是一种纯数据格式，它只包含属性，没有方法。JSON 要求在字符串和属性名称周围使用双引号。单引号无效。

对象和文本间的转换

parse(): 以 **文本字符串** 形式接受 JSON 对象作为参数，并返回相应的 对象。

stringify(): 接收一个 **对象** 作为参数，返回一个对应的 JSON 字符串。

```javascript
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text'; // now we're getting a string!
request.send();

request.onload = function() {
  var superHeroesText = request.response; // get the string from the response
  var superHeroes = JSON.parse(superHeroesText); // convert it to an object
  populateHeader(superHeroes);
  showHeroes(superHeroes);
}
```

正如您所想，stringify() 做相反的事情。

## 异步JavaScript

浏览器提供的许多功能（尤其是最有趣的那一部分）可能需要很长的时间来完成，因此需要异步完成，例如：

- 使用 [fetch()](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) 发起 HTTP 请求
- 使用 [getUserMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia) 访问用户的摄像头和麦克风
- 使用 [showOpenFilePicker() (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker) 请求用户选择文件以供访问

事件处理程序实际上就是异步编程的一种形式：你提供的函数（事件处理程序）将在事件发生时被调用（而不是立即被调用）。如果“事件”是“异步操作已经完成”，那么你就可以看到事件如何被用来通知调用者异步函数调用的结果的。

下面的例子展示了这样的操作。点击“点击发起请求”按钮来发送一个请求。我们将创建一个新的 [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 并监听它的 loadend 事件。而我们的事件处理程序则会在控制台中输出一个“完成！”的消息和请求的状态代码。

```html
<button id="xhr">点击发起请求</button>
<button id="reload">重载</button>

<pre readonly class="event-log"></pre>
```

```javascript
const log = document.querySelector('.event-log');
document.querySelector('#xhr').addEventListener('click', () => {
  log.textContent = '';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('loadend', () => {
    log.textContent = `${log.textContent}完成！状态码：${xhr.status}`;
  });

  xhr.open('GET', 'https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json');
  xhr.send();
  log.textContent = `${log.textContent}请求已发起\n`;
});

document.querySelector('#reload').addEventListener('click', () => {
  log.textContent = '';
  document.location.reload();
});
```

### 回调

事件处理程序是一种特殊类型的回调函数。而回调函数则是一个被传递到另一个函数中的会在适当的时候被调用的函数。正如我们刚刚所看到的：回调函数**曾经**是 JavaScript 中实现异步函数的主要方式。

事实上，现代 JavaScript 中异步编程的基础是 Promise.

### Promise

在 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 返回给调用者的时候，操作往往还没有完成，但 Promise 对象可以让我们操作最终完成时对其进行处理（无论成功还是失败）。

在上一篇文章中，我们使用 XMLHttpRequest API 进行 HTTP 请求。在这篇文章中，我们将使用 [fetch() API](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) ，一个现代的、基于 Promise 的、用于替代 XMLHttpRequest 的方法。

```javascript
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

console.log(fetchPromise);

fetchPromise.then( response => {
  console.log(`已收到响应：${response.status}`);
});

console.log("已发送请求……");
```

我们这一次将处理程序传递到返回的 Promise 对象的 then() 方法中。

Promise 的优雅之处在于 then() 本身也会返回一个 Promise，这个 Promise 将指示 then() 中调用的异步函数的完成状态。这意味着我们可以（当然也应该）把上面的代码改写成这样：

```javascript
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
  .then( response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then( json => {
    console.log(json[0].name);
  });

```

### 错误捕获

我们如何处理错误？fetch() API 可能因为很多原因抛出错误（例如，没有网络连接或 URL 本身存在问题），我们也会在服务器返回错误消息时抛出一个错误。

Promise 对象提供了一个 `catch()` 方法来支持错误处理。这很像 then()：你调用它并传入一个处理函数。然后，当异步操作成功时，传递给 then() 的处理函数被调用，而当异步操作失败时，传递给 catch() 的处理函数被调用。

```javascript
const fetchPromise = fetch('bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
  .then( response => {
    if (!response.ok) {
      throw new Error(`HTTP 请求错误：${response.status}`);
    }
    return response.json();
  })
  .then( json => {
    console.log(json[0].name);
  })
  .catch( error => {
    console.error(`无法获取产品列表：${error}`);
  });
```

### Promise 术语

首先，Promise 有三种状态：

- **待定（pending）**：初始状态，既没有被兑现，也没有被拒绝。这是调用 fetch() 返回 Promise 时的状态，此时请求还在进行中。
- **已兑现（fulfilled）**：意味着操作成功完成。当 Promise 完成时，它的 then() 处理函数被调用。
- **已拒绝（rejected）**：意味着操作失败。当一个 Promise 失败时，它的 catch() 处理函数被调用。

### async 和 await

async 关键字为你提供了一种更简单的方法来处理基于异步 Promise 的代码。在一个函数的开头添加 async，就可以使其成为一个异步函数。

```javascript
async function myFunction() {
  // 这是一个异步函数
}
```

在异步函数中，你可以在调用一个返回 Promise 的函数之前使用 await 关键字。这使得代码在该点上等待，直到 Promise 被完成，这时 Promise 的响应被当作返回值，或者被拒绝的响应被作为错误抛出。

```javascript
async function fetchProducts() {
  try {
    // 在这一行之后，我们的函数将等待 `fetch()` 调用完成
    // 调用 `fetch()` 将返回一个“响应”或抛出一个错误
    const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
    if (!response.ok) {
      throw new Error(`HTTP 请求错误：${response.status}`);
    }
    // 在这一行之后，我们的函数将等待 `response.json()` 的调用完成
    // `response.json()` 调用将返回 JSON 对象或抛出一个错误
    const json = await response.json();
    console.log(json[0].name);
  }
  catch(error) {
    console.error(`无法获取产品列表：${error}`);
  }
}

fetchProducts();
```

这里我们调用 await fetch()，我们的调用者得到的并不是 Promise，而是一个完整的 Response 对象，就好像 fetch() 是一个同步函数一样。

### workers

workers，它使您能够在单独执行 **线程** 中运行一些任务。

你的主代码和你的 worker 代码永远不能直接访问彼此的变量。Workers 和主代码运行在完全分离的环境中，只有通过相互发送消息来进行交互。特别是，这意味着 workers 不能访问 DOM（窗口、文档、页面元素等等）。

```javascript
// 在 "generate.js" 中创建一个新的 worker
const worker = new Worker('./generate.js');

// 当用户点击 "Generate primes" 时，给 worker 发送一条消息。
// 消息中的 command 属性是 "generate", 还包含另外一个属性 "quota"，即要生成的质数。
document.querySelector('#generate').addEventListener('click', () => {
  const quota = document.querySelector('#quota').value;
  worker.postMessage({
    command: 'generate',
    quota: quota
  });
});

// 当 worker 给主线程回发一条消息时，为用户更新 output 框，包含生成的质数（从 message 中获取）。
worker.addEventListener('message', message => {
  document.querySelector('#output').textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
  document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});

```

使用 worker.postMessage() 像 worker 发送一条消息。这条消息可以携带一个参数，在本示例中我们传递一个包含两个属性的 JSON 对象：

- command：一个用于标识我们希望 worker 所做事情的字符串（以防我们的 worker 可以做多个事情）。
- quota：要生成的质数的数量。

然后，我们向 worker 添加一个 message 消息处理器。这样 worker 就能告诉我们它是什么时候完成的，并且传递给我们任何结果数据。

现在到 worker 代码了。

```javascript
// 监听主线程中的消息。
// 如果消息中的 command 是 "generate"，则调用 `generatePrimse()`
addEventListener("message", message => {
  if (message.data.command === 'generate') {
    generatePrimes(message.data.quota);
  }
});

// 生成质数
function generatePrimes(quota) {

  // 生成质数...

  // 完成后给主线程发送一条包含我们生成的质数数量的消息消息。
  postMessage(primes.length);
}
```

worker 要做的第一件事情就是开始监听来自主脚本的消息。这通过使用 addEventListener() 实现，它在 worker 中是一个全局函数。在 message 事件处理器内部，事件的 data 属性包含一个来自主脚本的参数的副本。如果主脚本传递 generate 命令，我们就调用 generatePrimes()，传入来自消息事件的 quota 值。

## 客户端 Web API

### 操作文档

使用 [Document](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象来控制 HTML 和样式信息的文档对象模型（DOM）来实现

- window 是载入浏览器的标签，在 JavaScript 中用 [Window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 对象来表示，使用这个对象的可用方法，你可以返回窗口的大小（参见Window.innerWidth和Window.innerHeight），操作载入窗口的文档，存储客户端上文档的特殊数据（例如使用本地数据库或其他存储设备），为当前窗口绑定event handler，等等。
- navigator 表示浏览器存在于 web 上的状态和标识（即用户代理）。在 JavaScript 中，用 [Navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 来表示。你可以用这个对象获取一些信息，比如来自用户摄像头的地理信息、用户偏爱的语言、多媒体流等等。
- document（在浏览器中用 DOM 表示）是载入窗口的实际页面，在 JavaScript 中用 [Document](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象表示，你可以用这个对象来返回和操作文档中 HTML 和 CSS 上的信息。例如获取 DOM 中一个元素的引用，修改其文本内容，并应用新的样式，创建新的元素并添加为当前元素的子元素，甚至把他们一起删除。

### 文档对象模型

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Simple DOM example</title>
  </head>
  <body>
      <section>
        <img src="dinosaur.png" alt="A red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth.">
        <p>Here we will add a link to the <a href="https://www.mozilla.org/">Mozilla homepage</a></p>
      </section>
  </body>
</html>
```

有很多方法可以选择一个元素，并在一个变量中存储一个引用。`Document.querySelector()`是推荐的主流方法，它允许你使用 **CSS 选择器选择元素**，使用很方便。上面的querySelector()调用会匹配它在文档中遇到的第一个\<a>元素。如果想对多个元素进行匹配和操作，你可以使用Document.querySelectorAll()，这个方法匹配文档中每个匹配选择器的元素，并把它们的引用存储在一个array中。

```javascript
var link = document.querySelector('a');
link.textContent = 'Mozilla Developer Network';
link.href = 'https://developer.mozilla.org';
```

对于获取元素引用，还有一些更旧的方法，如：

- Document.getElementById()，选择一个id属性值已知的元素，例如\<p id="myId">My paragraph\</p>。ID 作为参数传递给函数，即 var elementRef = document.getElementById('myId')。
- Document.getElementsByTagName()，返回页面中包含的所有已知类型元素的数组。如\<p>s, \<a>。元素类型作为参数传递给函数，即var elementRefArray = document.getElementsByTagName('p').

### 创建并放置新的节点

```javascript
var sect = document.querySelector('section');
// 创建一个新的段落
var para = document.createElement('p');
para.textContent = 'We hope you enjoyed the ride.';
// 在后面追加新的段落
sect.appendChild(para);

// 内部链接的段落中添加文本节点
var text = document.createTextNode(' — the premier source for web development knowledge.');
var linkPara = document.querySelector('p');
linkPara.appendChild(text);

```

### 移动和删除元素

如果你想把具有内部链接的段落移到 sectioin 的底部，简单的做法是：

```javascript
sect.appendChild(linkPara);
```

删除节点也非常的简单，至少，你拥有要删除的节点和其父节点的引用。在当前情况下，我们只要使用Node.removeChild()即可，如下：

```javascript
sect.removeChild(linkPara);
```

要删除一个仅基于自身引用的节点可能稍微有点复杂，这也是很常见的。**没有方法会告诉节点删除自己**，所以你必须像下面这样操作。

```javascript
linkPara.parentNode.removeChild(linkPara);
```

### 操作样式

第一种方法是直接在想要动态设置样式的元素内部添加内联样式。这是用HTMLElement.style 属性来实现。这个属性包含了文档中每个元素的内联样式信息。你可以设置这个对象的属性直接修改元素样式。

```javascript
para.style.color = 'white';
para.style.backgroundColor = 'black';
para.style.padding = '10px';
para.style.width = '250px';
para.style.textAlign = 'center';
```

>**备注：** CSS 样式的 JavaSript 属性版本以小驼峰式命名法书写，而 CSS 版本带连接符号（backgroundColor 对 background-color）。确保你不会混淆，否则就不能工作。

现在我们改为使用 HTML 操作的常用方法 — Element.setAttribute() — 这里有两个参数，你想在元素上设置的属性，你要为它设置的值。在这种情况下，我们在段落中设置类名为 highlight：

```javascript
para.setAttribute('class', 'highlight');
```

### 从服务器获取数据

这是通过使用诸如 [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 之类的 API 或者 — 最近以来的 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) 来实现。这些技术允许网页直接处理对服务器上可用的特定资源的 HTTP 请求，并在显示之前根据需要对结果数据进行格式化。

>**备注：** 在早期，这种通用技术被称为 Asynchronous JavaScript and XML（Ajax），因为它倾向于使用XMLHttpRequest 来请求 XML 数据。但通常不是这种情况 (你更有可能使用 XMLHttpRequest 或 Fetch 来请求 JSON), 但结果仍然是一样的，术语“Ajax”仍然常用于描述这种技术。

#### XMLHttpRequest

```javascript
const poemDisplay = document.querySelector('pre');

// 创建 XHR 请求
let request = new XMLHttpRequest();
// 使用 open() 方法来指定 HTTP request method , 以及它的 URL
request.open('GET', url);
// 设置我们期待的响应类型，XHR 默认返回文本
request.responseType = 'text';
// 当 load 事件触发时（当响应已经返回时）这个事件会被运行
request.onload = function() {
  poemDisplay.textContent = request.response;
};
// 以上都是 XHR 请求的设置 — 在我们告诉它之前，它不会真正运行，这是通过 send() 完成的。
request.send();
```

#### Fetch

Fetch API 基本上是 XHR 的一个现代替代品 —— 它是最近在浏览器中引入的，它使异步 HTTP 请求在 JavaScript 中更容易实现，对于开发人员和在 Fetch 之上构建的其他 API 来说都是如此。

```javascript
fetch(url).then(function(response) {
  response.text().then(function(text) {
    poemDisplay.textContent = text;
  });
});
```

下面的代码块和我们原始的例子做的是相同的事，但它是不同的写法：

```javascript
fetch(url).then(function(response) {
  return response.text()
}).then(function(text) {
  poemDisplay.textContent = text;
});
```

### 绘图

[绘图](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics)

### 视频和音频

[视频和音频](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs)
