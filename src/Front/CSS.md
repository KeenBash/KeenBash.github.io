---
category:
  - Front
tag:
  - CSS
---

# CSS

[CSS参考](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/First_steps)

- [CSS](#css)
  - [CSS概述](#css概述)
    - [CSS语法](#css语法)
    - [函数](#函数)
    - [默认行为](#默认行为)
    - [@规则](#规则)
      - [@import](#import)
      - [@media](#media)
    - [速记属性](#速记属性)
    - [注释](#注释)
    - [CSS 工作流程](#css-工作流程)
  - [使用 CSS](#使用-css)
    - [添加 CSS](#添加-css)
      - [外部样式表](#外部样式表)
      - [内部样式表](#内部样式表)
      - [内联样式](#内联样式)
    - [选择器](#选择器)
      - [元素选择器](#元素选择器)
      - [类选择器](#类选择器)
      - [id 选择器](#id-选择器)
      - [选择器列表](#选择器列表)
      - [标签属性选择器](#标签属性选择器)
      - [伪类与伪元素](#伪类与伪元素)
      - [子代选择器](#子代选择器)
      - [后代选择器](#后代选择器)
      - [相邻兄弟选择器](#相邻兄弟选择器)
      - [通用兄弟选择器](#通用兄弟选择器)
      - [同时使用选择器和选择符](#同时使用选择器和选择符)
      - [通配选择器](#通配选择器)
    - [层叠与继承](#层叠与继承)
      - [层叠](#层叠)
      - [继承](#继承)
      - [优先级](#优先级)
  - [CSS排版](#css排版)
    - [盒模型](#盒模型)
      - [块级盒子](#块级盒子)
      - [内联盒子](#内联盒子)
      - [display](#display)
    - [盒模型的各个部分](#盒模型的各个部分)
      - [外边距](#外边距)
      - [边框](#边框)
      - [内边距](#内边距)
    - [背景](#背景)
      - [背景颜色](#背景颜色)
      - [背景图片](#背景图片)
      - [背景大小](#背景大小)
      - [背景定位](#背景定位)
      - [圆角](#圆角)
    - [文本方向](#文本方向)
      - [书写模式](#书写模式)
      - [溢出](#溢出)
    - [CSS 的值与单位](#css-的值与单位)
      - [绝对长度单位](#绝对长度单位)
      - [相对长度单位](#相对长度单位)
      - [百分比](#百分比)
      - [数字](#数字)
      - [颜色](#颜色)
    - [基本文本和字体样式](#基本文本和字体样式)
      - [字体种类](#字体种类)
      - [默认字体](#默认字体)
      - [引入字体](#引入字体)
      - [字体栈](#字体栈)
      - [文本装饰](#文本装饰)
      - [文本对齐](#文本对齐)
      - [行高](#行高)
    - [链接状态](#链接状态)

## CSS概述

### CSS语法

CSS (层叠样式表) 是一门基于规则的语言 —— 你能定义用于你的网页中特定元素样式的一组规则。

```css
h1 {
    color: red;
    font-size: 5em;
}
```

语法由一个 **选择器 (selector)** 起头。接着输入一对大括号{ }。在大括号内部定义一个或多个形式为 **属性 (property):值 (value);** 的 **声明 (declarations)** 。每个声明都指定了我们所选择元素的一个属性，之后跟一个我们想赋给这个属性的值。

>**警告：** 如果属性未知或某个值对给定属性无效，则声明被视为无效，并被浏览器的 CSS 引擎完全忽略。

### 函数

`calc()` 函数。这个函数允许您在 CSS 中进行简单的计算。

```html
<div class="outer">
    <div class="box">
        The inner box is 90% - 30px.
    </div>
</div>
```

```css
.outer {
    border: 5px solid black;
}

.box {
    padding: 10px;
    width: calc(90% - 30px);
    background-color: rebeccapurple;
    color: white;
}
```

在上面的 calc() 示例中，我要求此框的宽度为包含块宽度的 90%，减去 30 像素。

### 默认行为

标题默认使用大号粗体；列表旁总有项目符号。这是因为浏览器自带一个包含默认样式的样式表，默认对任何页面有效。

不过你可能对浏览器的默认样式不太满意。没关系，只需选定那个元素，加一条 CSS 规则即可。就拿我们的无序列表 \<ul> 举个例子吧，它自带项目符号，不过要是你跟它有仇，你就可以这样移除它们：

```css
li {
  list-style-type: none;
}
```

[list-style-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type) 页首提供互动性示例，试试 square，它能把默认的小黑球变成方框框。

### @规则

#### @import

要将额外的样式表导入主 CSS 样式表，可以使用 `@import`

```css
@import 'styles2.css';
```

#### @media

您将遇到的最常见的 @rule 之一是 `@media`，它允许您使用 [媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries) 来应用 CSS，仅当某些条件成立 (例如，当屏幕分辨率高于某一数量，或屏幕宽度大于某一宽度时)。

```css
body {
    background-color: pink;
}

@media (min-width: 30em) {
    body {
        background-color: blue;
    }
}
```

在上面的 CSS 中，我们将给 \<body> 元素一个粉红色的背景色。但是，我们随后使用 @media 创建样式表的一个部分，该部分仅适用于视口大于 30em 的浏览器。如果浏览器的宽度大于 30em，则背景色将为蓝色。

### 速记属性

如 font, background, padding, border, and margin 等属性称为速记属性 -- 这是因为它们允许您在一行中设置多个属性值，从而节省时间并使代码更整洁。

```css
padding: 10px 15px 15px 5px;
```

与这四行代码是等价的：

```css
padding-top: 10px;
padding-right: 15px;
padding-bottom: 15px;
padding-left: 5px;
```

### 注释

CSS 中的注释以 `/*` 开头，以 `*/` 结尾。

### CSS 工作流程

下面的步骤是浏览加载网页的简化版本，而且不同的浏览器在处理文件的时候会有不同的方式，但是下面的步骤基本都会出现。

1. 浏览器载入 HTML 文件（比如从网络上获取）。
2. 将 HTML 文件转化成一个 DOM（Document Object Model），DOM 是文件在计算机内存中的表现形式。
3. 接下来，浏览器会拉取该 HTML 相关的大部分资源，比如嵌入到页面的图片、视频和 CSS 样式。JavaScript 则会稍后进行处理。
4. 浏览器拉取到 CSS 之后会进行解析，根据选择器的不同类型（比如 element、class、id 等等）把他们分到不同的“桶”中。浏览器基于它找到的不同的选择器，将不同的规则（基于选择器的规则，如元素选择器、类选择器、id 选择器等）应用在对应的 DOM 的节点中，并添加节点依赖的样式（这个中间步骤称为渲染树）。
5. 上述的规则应用于渲染树之后，渲染树会依照应该出现的结构进行布局。
6. 网页展示在屏幕上（这一步被称为着色）。

## 使用 CSS

### 添加 CSS

应用 CSS 有三种方式可以实现，而目前我们更倾向于利用最普遍且有用的方式——在文档的开头链接外部 CSS。

#### 外部样式表

```html
<link rel="stylesheet" href="styles.css">
```

\<link> 语句块里面，我们用属性 rel，让浏览器知道有 CSS 文档存在（所以需要遵守 CSS 样式的规定），并利用属性 href 指定，寻找 CSS 文件的位置。

#### 内部样式表

内部样式表是指不使用外部 CSS 文件，而是将 CSS 放在 HTML 文件 \<head> 标签里的 `<style>` 标签之中。

```html
<style>
h1 {
    color: red;
    font-size: 5em;
}
</style>
```

#### 内联样式

内联样式表存在于 HTML 元素的 `style` 属性之中。其特点是每个 CSS 表只影响一个元素。

```html
<h1 style="color: lightpink;font-size: 5rem;">inline cascading style sheeets</h1>
```

>**警告：** 除非你有充足的理由，否则不要这样做！ 它难以维护（在需要更新时，你必须在修改同一个文档的多处地方），并且这种写法将文档结构和文档表现混合起来了，这使得代码变得难以阅读和理解。

### 选择器

选择器所选择的元素，叫做“选择器的对象”。

```html
<ul>
    <li>项目一</li>
    <li class="special">项目二</li>
    <li>项目 <em>三</em></li>
</ul>
```

#### 元素选择器

根据元素 **标签** 名选定元素。

```css
h1 { }
```

#### 类选择器

可以给 HTML 元素加个 **类名（class）**，再选中那个类名。在 CSS 中，要选中这个 special 类，只需在选择器的开头加个西文句点（.）

```css
.special {
    color: orange;
    font-weight: bold;
}
```

有时你会发现选择器中，HTML 元素选择器 跟 类 一起出现

```css
li.special {
    color: orange;
    font-weight: bold; 
}
```

这个意思是说，“选中每个包含 special 类的 li 元素”。

#### id 选择器

根据元素设定的 **id** 选择元素。

```css
#id { }
```

#### 选择器列表

如果我的 h1 和 .special 类有相同的 CSS，那么我可以把它们写成两个分开的规则。

我也可以将它们组合起来，在它们之间加上一个`逗号","`，变为选择器列表。

```css
h1, 
.special {
    color: blue;
}
```

>**注意：** 当你使用选择器列表时，如果任何一个选择器无效 (存在语法错误)，那么整条规则都会被忽略。无论是 h1 还是这个 class 都不会被样式化。

#### 标签属性选择器

根据标签包含的 **属性名** 选择元素。

```css
a[title] { }

a[href="https://example.com"] { }
```

#### 伪类与伪元素

CSS [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) 是添加到选择器的关键字，用于指定所选元素的特殊状态。

[伪元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements) 是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式。

伪类选择器，用来样式化一个元素的特定状态。例如`:hover`伪类会在鼠标指针悬浮到一个元素上的时候选择这个元素：

```css
a:hover { }
```

伪元素选择器，选择一个元素的某个部分而不是元素自己。例如，::first-line是会选择一个元素（下面的情况中是\<p>）中的第一行。

```css
p::first-line { }
```

当我们修改一个链接的样式时我们需要定位（针对）\<a>（锚）标签。取决于是否是未访问的、访问过的、被鼠标悬停的、被键盘定位的，亦或是正在被点击当中的状态，这个标签有着不同的状态。

```css
a:link {
    color: pink;
}

a:visited {
    color: green;
}
```

上面的 CSS 代码使得没有被访问的链接颜色变为粉色、访问过的链接变为绿色。

你可以改变链接被鼠标悬停的时候的样式，例如鼠标悬停时移除下划线。

```css
a:hover {
    text-decoration: none;
}
```

#### 子代选择器

最后一组选择器可以将其他选择器组合起来，更复杂的选择元素。下面的示例用运算符（>）选择了 \<article> 元素的初代子元素。

```css
article > p { }
```

#### 后代选择器

在我们的文档中有两个 \<em> 元素 —— 一个在段落内，另一个在列表项内。仅选择嵌套在 \<li> 元素内的 \<em> 我们可以使用一个称为 **后代选择符** 的选择器，它只是单纯地在两个选择器之间加上一个空格。

```css
li em {
    color: rebeccapurple;
}
```

该选择器将选择 \<li> 内部的任何 \<em> 元素（\<li>的后代）。

#### 相邻兄弟选择器

在 HTML 文档中设置直接出现在 h1 标题后面并且与标题具有相同层级的 p 段落样式，为此需在两个选择器之间添加一个 + 号 (成为 相邻选择符 )

```css
h1 + p {
    font-size: 200%;
}
```

#### 通用兄弟选择器

兄弟选择符，位置无须紧邻，只须同层级，A~B 选择A元素之后所有同层级B元素。

```css
h1 ~ p {}
```

选择与 h1 同一级的 p 元素。

#### 同时使用选择器和选择符

你可以同时使用 选择器 和 选择符 。

```css
body h1 + p .special {
    color: yellow;
    background-color: black;
    padding: 5px;
}
```

#### 通配选择器

它可以匹配任意类型的 HTML 元素。

```css
*[lang^=en]{
  color:green;
}
```

### 层叠与继承

#### 层叠

样式表层叠 —— 简单的说，就是 CSS 规则的顺序很重要。当应用两条同级别的规则到一个元素的时候，写在后面的就是实际使用的规则。

```css
p {
  color: red;
}

p {
  color: blue;
}
```

在上面的代码块中，我们为 p 选择器定义了两个规则，但是段落最后是蓝色的。这是因为将其设置为蓝色的声明将出现在样式表的后面，而稍后的样式将覆盖以前的样式。

#### 继承

继承也需要在上下文中去理解 —— 一些设置在父元素上的 CSS 属性是可以被子元素继承的，有些则不能。

举一个例子，如果你设置一个元素的 color 和 font-family，每个在里面的元素也都会有相同的属性，除非你直接在元素上设置属性。

一些属性是不能继承的——举个例子如果你在一个元素上设置 width 为 50% ，所有的后代不会是父元素的宽度的 50% 。

#### 优先级

浏览器是根据优先级来决定当多个规则有不同选择器对应相同的元素的时候需要使用哪个规则。它基本上是一个衡量选择器具体选择哪些区域的尺度。

在我们同时使用了 类选择器 和 元素选择器 的一个例子中，类将获胜，一个类被描述为比元素选择器更具体，所以它获胜了。

一个选择器的优先级可以说是由三个不同的值（或分量）相加，可以认为是`百（ID）十（类）个（元素）`—— 三位数的三个位数：

- ID：选择器中包含**ID 选择器**则百位得一分。
- 类：选择器中包含**类选择器**、**属性选择器**或者**伪类**则十位得一分。
- 元素：选择器中包含 **元素**、**伪元素选择器**则个位得一分。

>**备注：** 通用选择器（*）、组合符（+、>、~、' '）和调整优先级的选择器（:where()）不会影响优先级。

| 选择器 | ID | 类 | 元素 | 优先级 |
| --- | --- | --- | --- | --- |
| h1 | 0 | 0 | 1 | 0-0-1 |
| h1 + p::first-letter | 0 | 0 | 3 | 0-0-3 |
| li > a[href*="en-US"] > .inline-warning | 0 | 2 | 2 | 0-2-2 |
| #identifier | 1 | 0 | 0 | 1-0-0 |
| button:not(#mainBtn, .cta) | 1 | 0 | 1 | 1-0-1 |

内联样式，即 style 属性内的样式声明，优先于所有普通的样式，无论其优先级如何。这样的声明没有选择器，但它们的优先级可以理解为 1-0-0-0；即无论选择器中有多少个 ID，它总是比其它任何优先级的权重都要高。

## CSS排版

### 盒模型

在 CSS 中我们广泛地使用两种“盒子” —— 块级盒子 (block box) 和 内联盒子 (inline box)。这两种盒子会在页面流（page flow）和元素之间的关系方面表现出不同的行为

#### 块级盒子

一个被定义成块级的（block）盒子会表现出以下行为：

- 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
- 每个盒子都会换行
- width 和 height 属性可以发挥作用
- 内边距（padding）, 外边距（margin）和 边框（border）会将其他元素从当前盒子周围“推开”

#### 内联盒子

如果一个盒子对外显示为 inline，那么他的行为如下：

- 盒子不会产生换行。
- width 和 height 属性将不起作用。
- 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
- 水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。

#### display

有个块级段落，里面有两个 \<span> 元素。正常情况下是 inline，但是其中一个加了 block 类，设置属性 display: block。display 属性可以改变盒子的外部显示类型是块级还是内联，这将会改变它与布局中的其他元素的显示方式。

### 盒模型的各个部分

完整的 CSS 盒模型应用于块级盒子，内联盒子只使用盒模型中定义的部分内容。模型定义了盒的每个部分 —— margin, border, padding, and content —— 合在一起就可以创建我们在页面上看到的内容。

CSS 中组成一个块级盒子需要：

- Content box: 这个区域是用来显示内容，大小可以通过设置 width 和 height.
- Padding box: 包围在内容区域外部的空白区域；大小通过 padding 相关属性设置。
- Border box: 边框盒包裹内容和内边距。大小通过 border 相关属性设置。
- Margin box: 这是最外面的区域，是盒子和其他元素之间的空白区域。大小通过 margin 相关属性设置。

#### 外边距

外边距是盒子周围一圈看不到的空间。它会把其他元素从盒子旁边推开。外边距属性值可以为正也可以为负。设置负值会导致和其他内容重叠。

我们可以使用 margin 属性一次控制一个元素的所有边距，或者每边单独使用等价的普通属性控制：

- margin-top
- margin-right
- margin-bottom
- margin-left

#### 边框

边框是在边距和填充框之间绘制的。如果您正在使用标准的盒模型，边框的大小将添加到框的宽度和高度。

可以使用 border 属性一次设置所有四个边框的宽度、颜色和样式。

```css
.box {
  border: 1px solid black;
}
```

分别设置每边的宽度、颜色和样式，可以使用：

- border-top
- border-right
- border-bottom
- border-left

设置所有边的颜色、样式或宽度，请使用以下属性：

- border-width
- border-style
- border-color

设置单边的颜色、样式或宽度，可以使用最细粒度的普通属性之一：

- border-top-width
- border-top-style
- ......

#### 内边距

内边距位于边框和内容区域之间。与外边距不同，您不能有负数量的内边距，所以值必须是 0 或正的值。应用于元素的任何背景都将显示在内边距后面，内边距通常用于将内容推离边框。

我们可以使用padding简写属性控制元素所有边，或者每边单独使用等价的普通属性：

- padding-top
- padding-right
- padding-bottom
- padding-left

### 背景

#### 背景颜色

background-color 属性定义了 CSS 中任何元素的背景颜色。属性接受任何有效的\<color>值。背景色扩展到元素的内容和内边距的下面。

#### 背景图片

background-image 属性允许在元素的背景中显示图像。

```css
body {
    background-image: url(star.png);
}
```

#### 背景大小

我们可以使用 background-size属性，它可以设置长度或百分比值，来调整图像的大小以适应背景。

#### 背景定位

background-position 属性允许您选择背景图像显示在其应用到的盒子中的位置。它使用的坐标系中，框的左上角是 (0,0)，框沿着水平 (x) 和垂直 (y) 轴定位。

你可以使用像top和right这样的关键字，或者使用 长度值 和 百分比：

#### 圆角

通过使用 border-radius 属性和与方框的每个角相关的长边来实现方框的圆角。可以使用两个长度或百分比作为值，第一个值定义水平半径，第二个值定义垂直半径。在很多情况下，您将只传递一个值，这两个值都将使用。

### 文本方向

#### 书写模式

CSS 中的书写模式是指文本的排列方向是横向还是纵向的。writing-mode 属性使我们从一种模式切换到另一种模式。

```css
h1 {
    writing-mode: vertical-rl;
}
```

writing-mode的三个值分别是：

- horizontal-tb: 块流向从上至下。对应的文本方向是横向的。
- vertical-rl: 块流向从右向左。对应的文本方向是纵向的。
- vertical-lr: 块流向从左向右。对应的文本方向是纵向的。

#### 溢出

overflow 属性

overflow属性是你控制一个元素溢出的方式，它告诉浏览器你想怎样处理溢出。overflow的默认值为visible，这就是我们的内容溢出的时候，我们在默认情况下看到它们的原因。

如果你想在内容溢出的时候把它裁剪掉，你可以在你的盒子上设置overflow: hidden。

如果你用了overflow: scroll，那么你的浏览器总会显示滚动条，即使没有足够多引起溢出的内容。

```css
.box {
    border: 1px solid #333333;
    width: 200px;
    height: 100px;
    overflow-y: scroll;
}
```

```html
<div class="box">This box has a height and a width. This means that if there is too much content to be displayed within the assigned height, there will be an overflow situation. If overflow is set to hidden then any overflow will not be visible.</div>

<p>This content is outside of the box.</p>
```

我们仅仅需要在y轴方向上滚动，但是我们在两个方向上都有了滚动条。你可以使用overflow-y属性，设置overflow-y: scroll来仅在y轴方向滚动。

### CSS 的值与单位

#### 绝对长度单位

px 像素

#### 相对长度单位

em 在 font-size 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width

rem 根元素的字体大小

#### 百分比

百分比的问题在于，它们总是相对于其他值设置的。例如，如果将元素的字体大小设置为百分比，那么它将是元素父元素字体大小的百分比。如果使用百分比作为宽度值，那么它将是父值宽度的百分比。

#### 数字

有些值接受数字，不添加任何单位。

接受无单位数字的属性的一个例子是不透明度属性（opacity ），它控制元素的不透明度 (它的透明程度)。此属性接受 0(完全透明) 和 1(完全不透明) 之间的数字。

#### 颜色

内置颜色关键词 [color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)

十六进制 RGB 值 #02798b

RGB 和 RGBA 的值

RGBA 颜色——它们的工作方式与 RGB 颜色完全相同，因此你可以使用任何 RGB 值，但是有第四个值表示颜色的 alpha 通道，它控制不透明度。如果将这个值设置为0，它将使颜色完全透明，而设置为1将使颜色完全不透明。

### 基本文本和字体样式

用于样式文本的 CSS 属性通常可以分为两类。

- 字体样式: 作用于字体的属性，会直接应用到文本中，比如使用哪种字体，字体的大小是怎样的，字体是粗体还是斜体，等等。
- 文本布局风格: 作用于文本的间距以及其他布局功能的属性，比如，允许操纵行与字之间的空间，以及在内容框中，文本如何对齐。

#### 字体种类

要在你的文本上设置一个不同的字体，你可以使用 `font-family` 属性，这个允许你为浏览器指定一个字体 (或者一个字体的列表)，然后浏览器可以将这种字体应用到选中的元素上。如果字体不可用，那么就会用浏览器默认的字体代替 default font.

#### 默认字体

CSS 定义了 5 个常用的字体名称：serif, sans-serif, monospace, cursive, 和 fantasy.

![默认字体](https://s2.loli.net/2022/12/15/p1JFEZg5L68f4ox.png)

#### 引入字体

在 CSS 的开始处有一个`@font-face`块，它指定要下载的字体文件。

```css
@font-face {
    font-family: "myFont";
    src: url("myFont.ttf");
}
```

在线字体服务通常会为你存储和服务字体，这样你就不用担心写@font-face代码了，通常只需要在你的网站上插入一两行代码就可以让一切都运行。

#### 字体栈

```css
p {
    font-family: "Trebuchet MS", Verdana, sans-serif;
}
```

在这种情况下，浏览器从列表的第一个开始，然后查看在当前机器中，这个字体是否可用。如果不可用，它就移到列表中的下一个字体，然后再检查。

>**备注：** 有一些字体名称不止一个单词，比如Trebuchet MS ，那么就需要用引号包裹。

#### 文本装饰

CSS 提供了 4 种常用的属性来改变文本的样子：

1. font-style: 用来打开和关闭文本 italic (斜体)。可能的值如下 (你很少会用到这个属性，除非你因为一些理由想将斜体文字关闭斜体状态)：

   - normal: 将文本设置为普通字体 (将存在的斜体关闭)
   - italic: 如果当前字体的斜体版本可用，那么文本设置为斜体版本；如果不可用，那么会利用 oblique 状态来模拟 italics。
   - oblique: 将文本设置为斜体字体的模拟版本，也就是将普通文本倾斜的样式应用到文本中。

2. font-weight: 设置文字的粗体大小。这里有很多值可选 (比如 -light, -normal, -bold, -extrabold, -black, 等等), 不过事实上你很少会用到 normal 和 bold以外的值：

   - normal, bold: 普通或者加粗的字体粗细
   - lighter, bolder: 将当前元素的粗体设置为比其父元素粗体更细或更粗一步。100–900: 数值粗体值，如果需要，可提供比上述关键字更精细的粒度控制。

3. text-transform: 允许你设置要转换的字体。值包括：

   - none: 防止任何转型。
   - uppercase: 将所有文本转为大写。
   - lowercase: 将所有文本转为小写。
   - capitalize: 转换所有单词让其首字母大写。
   - full-width: 将所有字形转换成全角，即固定宽度的正方形，类似于等宽字体，允许拉丁字符和亚洲语言字形（如中文，日文，韩文）对齐。

4. text-decoration: 设置/取消字体上的文本装饰 (你将主要使用此方法在设置链接时取消设置链接上的默认下划线。) 可用值为：

   - none: 取消已经存在的任何文本装饰。
   - underline: 文本下划线。
   - overline: 文本上划线
   - line-through: 穿过文本的线。
  
    你应该注意到 text-decoration 可以一次接受多个值。

#### 文本对齐

text-align 属性用来控制文本如何和它所在的内容盒子对齐。可用值如下，并且在与常规文字处理器应用程序中的工作方式几乎相同：

- left: 左对齐文本。
- right: 右对齐文本。
- center: 居中文字
- justify: 使文本展开，改变单词之间的差距，使所有文本行的宽度相同。你需要仔细使用，它可以看起来很可怕。特别是当应用于其中有很多长单词的段落时。如果你要使用这个，你也应该考虑一起使用别的东西，比如 hyphens，打破一些更长的词语。

#### 行高

line-height 属性设置文本每行之间的高，可以接受大多数单位 length and size units，不过也可以设置一个无单位的值，作为乘数，通常这种是比较好的做法。无单位的值乘以 font-size 来获得 line-height。当行与行之间拉开空间，正文文本通常看起来更好更容易阅读。推荐的行高大约是 1.5–2 (双倍间距。) 所以要把我们的文本行高设置为字体高度的 1.5 倍，你可以使用这个：

```css
line-height: 1.5;
```

### 链接状态

每一个状态都可以用对应的 **伪类** 来应用样式：

- Link (没有访问过的): 这是链接的默认状态，当它没有处在其他状态的时候，它可以使用:link 伪类来应用样式。
- Visited: 这个链接已经被访问过了 (存在于浏览器的历史纪录), 它可以使用 :visited 伪类来应用样式。
- Hover: 当用户的鼠标光标刚好停留在这个链接，它可以使用 :hover 伪类来应用样式。
- Focus: 一个链接当它被选中的时候 (比如通过键盘的 Tab 移动到这个链接的时候，或者使用编程的方法来选中这个链接 HTMLElement.focus()) 它可以使用 :focus 伪类来应用样式。
- Active: 一个链接当它被激活的时候 (比如被点击的时候)，它可以使用 :active 伪类来应用样式。