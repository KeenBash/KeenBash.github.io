---
category:
  - Front
tag:
  - HTML
---

# HTML

[html参考](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML)

- [HTML](#html)
  - [元素概述element](#元素概述element)
    - [块级元素block](#块级元素block)
    - [内联元素inline](#内联元素inline)
    - [空元素empty](#空元素empty)
    - [布尔属性boolean](#布尔属性boolean)
    - [实体引用\&](#实体引用)
  - [首部head](#首部head)
    - [基本元素](#基本元素)
    - [作者author和描述description](#作者author和描述description)
    - [站点图标favicon](#站点图标favicon)
    - [CSS 和 JavaScript](#css-和-javascript)
    - [设定主语言lang](#设定主语言lang)
  - [主体body](#主体body)
    - [段落p](#段落p)
    - [标题h](#标题h)
    - [列表](#列表)
      - [无序ul](#无序ul)
      - [有序ul](#有序ul)
    - [强调](#强调)
      - [斜体强调em](#斜体强调em)
      - [粗体强调strong](#粗体强调strong)
      - [粗体字i、 斜体字b、下划线u](#粗体字i-斜体字b下划线u)
    - [超链接](#超链接)
      - [基础链接a](#基础链接a)
      - [链接图片a\\img](#链接图片aimg)
      - [链接片段#id](#链接片段id)
      - [下载链接download](#下载链接download)
    - [描述列表dl](#描述列表dl)
    - [引用](#引用)
      - [块引用blockquote](#块引用blockquote)
      - [行内引用q](#行内引用q)
      - [引文cite](#引文cite)
    - [缩略语abbr](#缩略语abbr)
    - [展示代码code](#展示代码code)
    - [标记时间和日期time](#标记时间和日期time)
  - [网站结构](#网站结构)
    - [语义化元素](#语义化元素)
    - [无语义元素](#无语义元素)
    - [换行br与水平分割线hr](#换行br与水平分割线hr)
  - [多媒体与嵌入](#多媒体与嵌入)
    - [图片img](#图片img)
    - [视频video](#视频video)
      - [嵌入视频](#嵌入视频)
      - [格式兼容](#格式兼容)
      - [html5新特性](#html5新特性)
    - [音频audio](#音频audio)
    - [iframe](#iframe)
    - [矢量图svg](#矢量图svg)
  - [表格table](#表格table)
  - [表单form](#表单form)
    - [表单数据校验](#表单数据校验)
      - [客户端校验](#客户端校验)
      - [服务器端校验](#服务器端校验)
      - [使用内置表单数据校验](#使用内置表单数据校验)
      - [required 属性](#required-属性)
      - [正则表达式校验](#正则表达式校验)
      - [限制输入的长度](#限制输入的长度)
      - [自定义错误信息](#自定义错误信息)

## 元素概述element

### 块级元素block

块级元素在页面中以块的形式展现 —— 相对于其前面的内容它会出现在新的一行，其后的内容也会被挤到下一行展现。块级元素通常用于展示页面上结构化的内容，例如段落、列表、导航菜单、页脚等等。

### 内联元素inline

内联元素通常出现在块级元素中并环绕文档内容的一小部分，而不是一整个段落或者一组内容。内联元素不会导致文本换行。

### 空元素empty

不是所有元素都拥有开始标签，内容，结束标签。一些元素只有一个标签，通常用来在此元素所在位置插入/嵌入一些东西。例如：元素\<img>是用来在元素\<img>所在位置插入一张指定的图片。

### 布尔属性boolean

有时你会看到没有值的属性，它是合法的。这些属性被称为布尔属性，他们只能有跟它的属性名一样的属性值。例如 disabled 属性，他们可以标记表单输入使之变为不可用 (变灰色)，此时用户不能向他们输入任何数据。

```html
<input type="text" disabled="disabled">
<!-- 可以将其写成以下形式 -->
<input type="text" disabled>
```

### 实体引用&

在 HTML 中，字符 <、>、"、' 和 & 是特殊字符，通过以下字符可以引用：

| 原义字符 | 等价字符引用 |
| --- | --- |
| < | `&lt;` |
| > | `&gt;` |
| " | `&quot;` |
| ' | `&apos;` |
| & | `&amp;` |

## 首部head

### 基本元素

```html
<head>
    <meta charset="utf-8">
    <title>我的测试页面</title>
</head>
```

`<title>`元素是一项元数据，用于表示整个 HTML 文档的标题。

`<meta>`元数据：元数据就是描述数据的数据。

`<meta charset="utf-8">`指定你的文档中字符的编码。

### 作者author和描述description

```html
<meta name="author" content="Chris Mills">
<meta name="description" content="The MDN Web Docs">
```

许多 \<meta> 元素包含了 `name` 和 `content` 属性，这两个 meta 元素定义你的页面的作者和提供页面的简要描述。

在引擎里搜索，会看到 \<meta> description 和 \<title> 元素的内容在搜索结果里显示。

>**备注：** 许多 \<meta> 特性已经不再使用。例如，keyword \<meta> 元素（\<meta name="keywords" content="fill, in, your, keywords, here">）——提供关键词给搜索引擎，根据不同的搜索词，查找到相关的网站——已经被搜索引擎忽略了，因为作弊者填充了大量关键词到 keyword，错误地引导搜索结果。

### 站点图标favicon

可以在元数据中添加对自定义图标（favicon，为“favorites icon”的缩写）的引用，这些将在特定的场合（浏览器的收藏，或书签列表）中显示。

页面添加图标的方式有：

1. 将其保存在与网站的索引页面相同的目录中，以 .ico 格式保存（大多数浏览器将支持更通用的格式，如 .gif 或 .png，但使用 ICO 格式将确保它能在如 Internet Explorer 6 那样古老的浏览器显示）
2. 将以下行添加到 HTML 的 \<head> 中以引用它：

    ```html
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    ```

>**备注：** 如果你的网站使用了内容安全策略（Content Security Policy，CSP）来增加安全性，这个策略会应用在图标上。如果你遇到了图标没有被加载的问题，你需要确认 Content-Security-Policy 响应头的 img-src 指令没有禁止访问图标。

### CSS 和 JavaScript

在 HTML 中引用 CSS 和 JavaScript，它们分别使用 `<link>` 元素以及 `<script>` 元素。

`<link>` 元素经常位于文档的头部。这个 link 元素有 2 个属性，rel="stylesheet" 表明这是文档的样式表，而 href 包含了样式表文件的路径：

```html
<link rel="stylesheet" href="my-stylesheet.css">
```

`<script>` 用来引入 JavaScript 代码，src 属性来指向需要加载的 JavaScript 文件路径。script 元素没必要非要放在文档的 \<head> 中，也可以放在 \<body> 中。同时最好加上 defer 以告诉浏览器在解析完成 HTML 后再加载 JavaScript。这样可以确保在加载脚本之前浏览器已经解析了所有的 HTML 内容（如果脚本尝试访问某个不存在的元素，浏览器会报错）。实际上还有很多方法可用于处理加载 JavaScript 的问题，但这是现代浏览器中最可靠的一种方法。

```html
<script src="my-js-file.js" defer></script>
```

### 设定主语言lang

这个可以通过添加 lang 属性到 HTML 开始的标签中来实现。

```html
<!-- lang="en-US" -->
<html lang="zh-CN">
<!-- <html lang="zh"> -->
```

还可以将文档的分段设置为不同的语言。例如，我们可以把日语部分设置为日语。

```html
<p>Japanese example: <span lang="ja">ご飯が熱い。</span>.</p>
```

## 主体body

### 段落p

每个段落是通过 \<p> 元素标签进行定义的。

### 标题h

h1 ~ h6 六个标题元素标签，每个元素代表文档中不同级别的内容。

您应该最好只对每个页面使用一次 `<h1>` — 这是顶级标题，所有其他标题位于层次结构中的下方。

在另一方面，你可以让任一元素看起来像一个顶级标题，如下

```html
<span style="font-size: 32px; margin: 21px 0;">这是顶级标题吗？</span>
```

### 列表

#### 无序ul

unordered list，每份无序的清单从 `<ul>` 元素开始——需要包裹清单上所有被列出的项目，然后就是用 `<li>` 元素把每个列出的项目单独包裹起来。

```html
<ul>
    <li>豆浆</li>
    <li>油条</li>
    <li>豆汁</li>
    <li>焦圈</li>
</ul>
```

#### 有序ul

ordered list，这个标记的结构和无序列表一样，需要用 `<ol>` 元素将所有项目包裹。

### 强调

#### 斜体强调em

在 HTML 中我们用 `<em>`（emphasis）元素来标记这样的情况。这样做既可以让文档读起来更有趣，也可以被屏幕阅读器识别出来，并以不同的语调发出。

```html
<p>I am <em>glad</em> you weren't <em>late</em>.</p>
```

#### 粗体强调strong

在 HTML 中我们用 `<strong>` (strong importance) 元素来标记这样的情况。这样做既可以让文档更加地有用，也可以被屏幕阅读器识别出来，并以不同的语调发出。

```html
<p>This liquid is <strong>highly toxic</strong>.</p>
```

#### 粗体字i、 斜体字b、下划线u

迄今为止我们已经讨论的元素都是意义清楚的语义元素。`<b>`, `<i>`, 和 `<u>` 的情况却有点复杂。它们出现于人们要在文本中使用粗体、斜体、下划线但 CSS 仍然不被完全支持的时期。像这样的元素，仅仅影响表象而且没有语义，被称为 **表象元素（presentational elements）** 并且不应该再被使用。

### 超链接

#### 基础链接a

```html
<a href="https://www.mozilla.org/zh-CN/" title="了解 Mozilla 使命以及如何参与贡献的最佳站点。">Mozilla 主页</a>
```

通过将文本（或其它内容，见块级链接) 包裹在 `<a>` 元素内，并给它一个 href 属性（也称为超文本引用或目标，它将包含一个网址）来创建一个基本链接。

`href`这个属性声明超链接的 web 地址，当这个链接被点击浏览器会跳转至 href 声明的 web 地址。例如：href="https://www.mozilla.org/"。

`title`标题title属性为超链接声明额外的信息，比如你将链接至的那个页面。例如：title="The Mozilla homepage"。当鼠标悬停在超链接上面时，这部分信息将以工具提示的形式显示。

`target`目标target属性用于指定链接如何呈现出来。例如，target="_blank"将在新标签页中显示链接。如果你希望在当前标签页显示链接，忽略这个属性即可。

#### 链接图片a\img

你可以将一些内容转换为链接，例如你想要将一个图像转换为链接，你只需把引用了图像文件的 \<img> 元素放到 \<a> 标签内。

```html
<a href="https://www.mozilla.org/zh-CN/">
    <img src="mozilla-image.png" alt="链接至 Mozilla 主页的 Mozilla 标志">
</a>
```

#### 链接片段#id

超链接除了可以链接到文档外，也可以链接到 HTML 文档的特定部分（被称为文档片段）要做到这一点，你必须首先给要链接到的元素分配一个 id 属性

```html
<h2 id="Mailing_address">邮寄地址</h2>
```

然后链接到那个特定的 id，你可以在 URL 的结尾使用一个#号指向它

```html
<p>要提供意见和建议，请将信件邮寄至<a href="contacts.html#Mailing_address">我们的地址</a>。</p>
```

你甚至可以在同一份文档下，通过链接文档片段，来链接到同一份文档的另一部分

```html
<p>本页面底部可以找到<a href="#Mailing_address">公司邮寄地址</a>。</p>
```

#### 下载链接download

可以使用 download 属性来提供一个默认的保存文件名。

```html
<a href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=zh-CN"
    download="firefox-latest-64bit-installer.exe">
    下载最新的 Firefox 中文版 - Windows（64 位）
</a>
```

### 描述列表dl

描述列表 (description list)，这种列表的目的是标记一组项目及其相关描述，例如术语和定义，或者是问题和答案等。

描述列表使用与其他列表类型不同的闭合标签— `<dl>`; 此外，每一项都用 `<dt>` (description term) 元素闭合。每个描述都用 `<dd>` (description definition) 元素闭合。

浏览器的默认样式会在描述列表的描述部分（description definition）和描述术语（description terms）之间产生缩进。

```html
<dl>
    <dt>内心独白</dt>
        <dd>戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。</dd>
    <dt>语言独白</dt>
        <dd>戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。</dd>
    <dt>旁白</dt>
        <dd>戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。</dd>
</dl>
```

![显示结果](https://s2.loli.net/2022/12/14/6ZSweiJX3yGs19H.png)  

### 引用

#### 块引用blockquote

用 `<blockquote>` 元素包裹起来表示，并且在 `cite` 属性里用 URL 来指向引用的资源。

```html
<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
    <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
    Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
</blockquote>
```

#### 行内引用q

使用 `<q>` 元素，元素会被引号包围。

#### 引文cite

`cite`属性内容不会被浏览器显示、屏幕阅读器阅读，需使用 JavaScript 或 CSS，浏览器才会显示cite的内容。如果你想要确保引用的来源在页面上是可显示的，更好的方法是为\<cite>元素附上链接，引文默认的字体样式为斜体。

```html
<p>According to the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
        <cite>MDN blockquote page</cite></a>:
</p>
```

### 缩略语abbr

`<abbr>`——它常被用来包裹一个缩略语（abbreviation）或缩写，并且提供缩写的解释（包含在title属性中）。

```html
<p><abbr title="美国国家航空航天局（National Aeronautics and Space Administration）">NASA</abbr> 做了一些动人心弦的事情。</p>
```

### 展示代码code

`<code>`: 用于标记计算机通用代码。

`<pre>`: 用于保留空白字符（通常用于代码块）——如果您在文本中使用缩进或多余的空白，浏览器将忽略它，您将不会在呈现的页面上看到它。但是，如果您将文本包含在\<pre>\</pre>标签中，那么空白将会以与你在文本编辑器中看到的相同的方式渲染出来。

`<kbd>`: 用于标记输入电脑的键盘（或其他类型）输入。

### 标记时间和日期time

HTML 还支持将时间和日期标记为可供机器识别的格式的 `<time>` 元素，\<time> 元素允许你附上清晰的、可被机器识别的 时间/日期 来实现这种需求。

```html
<time datetime="2016-01-20">2016 年 1 月 20 日</time>
```

## 网站结构

style.css

```css
/* 一般设置 */

html,
body {
    margin: 0;
    padding: 0;
}

html {
    font-size: 10px;
    background-color: #a9a9a9;
}

body {
    width: 70%;
    margin: 0 auto;
}

/* 文字排版 */

h1,
h2,
h3 {
    font-family: 'Sonsie One', 'ZCOOL KuaiLe', cursive;
    color: #2a2a2a;
}

p,
input,
li {
    font-family: 'Open Sans Condensed', sans-serif;
    color: #2a2a2a;
}

h1 {
    font-size: 4rem;
    text-align: center;
    color: white;
    text-shadow: 2px 2px 10px black;
}

h2 {
    font-size: 3rem;
    text-align: center;
}

h3 {
    font-size: 2.2rem;
}

p,
li {
    font-size: 1.6rem;
    line-height: 1.5;
}

/* 标题布局 */

nav,
article,
aside,
footer {
    background-color: white;
    padding: 1%;
}

nav {
    height: 50px;
    background-color: #66ccff;
    display: flex;
    margin-bottom: 10px;
}

nav ul {
    padding: 0;
    list-style-type: none;
    flex: 2;
    display: flex;
}

nav li {
    display: inline;
    text-align: center;
    flex: 1;
}

nav a {
    display: inline-block;
    font-size: 2rem;
    text-transform: uppercase;
    text-decoration: none;
    color: black;
    transition-duration: 200ms;
}

nav form {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 2em;
}

nav a:hover {
    color: white;
    text-shadow: 0 0 10px wheat;
    transition-duration: 200ms;
}

input {
    font-size: 1.6rem;
    height: 32px;
}

input[type="search"] {
    flex: 3;
}

input[type="submit"] {
    flex: 1;
    margin-left: 1rem;
    background: #333;
    border: 0;
    color: white;
}

/* 主体布局 */

main {
    display: flex;
}

article {
    flex: 4;
}

aside {
    flex: 1;
    margin-left: 10px;
    background-color: #66ccff;
}

aside li {
    padding-bottom: 10px;
}

footer {
    margin-top: 10px;
}
```

index.html

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">

    <title>二次元俱乐部</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Sonsie+One" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=ZCOOL+KuaiLe&amp;subset=chinese-simplified" rel="stylesheet">
    <link href="style.css" rel="stylesheet">

    <!--以下三行修复了使用旧版本 Internet Explorer 时 HTML5 语义元素运行不正常的问题-->
    <!--[if lt IE 9]>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script元素没必要非要放在文档的>
    <![endif]-->
</head>

<body>
    <!-- 以下是本站所有网页的统一主标题 -->

    <header>
        <h1>聆听电子天籁之音</h1>
    </header>

    <nav>
        <ul>
            <li><a href="#">主页</a></li>
            <li><a href="#">作品</a></li>
            <li><a href="#">项目</a></li>
            <li><a href="#">联系我们</a></li>
        </ul>

        <!-- 搜索栏是站点内导航的一个非线性的方式。 -->

        <form>
            <input type="search" name="q" placeholder="要搜索的内容">
            <input type="submit" value="搜索">
        </form>
    </nav>

    <!-- 以下是网页主体内容 -->
    <main>

        <!-- 包含一个 article（一篇文章） -->
        <article>
            <h2>火星演唱会火热售票中</h2>

            <p>洛天依是上海禾念推出的一套采用Vocaloid语音合成技术的数据库及虚构角色。歌声样本取自中国配音演员山新和日本歌手鹿乃，ideolo为“Vocaloid™ China Project”设计出该角色。</p>

            <h3>九九八十一</h3>

            <p>世尊如来佛 诘问着我的执着 当年我瑶池刻 闹得痛快并未想过太多 状罪责 拿捏了我的业果 可顽心不服错 不思过 齐天大圣地上行者</p>

            <p>那传说 忘却了我的寂寞 英雄名不堪得 何必较我混沌徒费口沫 这人间 毕竟我真正走过 一途平九百波 九千错 凌云渡成正果但我 有九九八十一种不舍</p>

            <h3>达拉崩吧</h3>

            <p>龘䶛䨻䎱㸞蚮䡶䴞䴝䯬䬛䰕㹚砍向㱎䖘䵈䶁䘔䶑䘓鋱䩳䵷㒪䪉䉥，然后㱎䖘䵈䶁䘔䶑䘓鋱䩳䵷㒪䪉䉥咬了龘䶛䨻䎱㸞蚮䡶䴞䴝䯬䬛䰕㹚。最后龘䶛䨻䎱㸞蚮䡶䴞䴝䯬䬛䰕㹚他战胜了㱎䖘䵈䶁䘔䶑䘓鋱䩳䵷㒪䪉䉥，救出了公主䥸䝟䳮䟑䎘䫱䉷䰯䕈䟐䬝，回到了䥰龘䰕䘋㽌䇁䵄䵻䬛蟿䆉㖀城。国王听说龘䶛䨻䎱㸞蚮䡶䴞䴝䯬䬛䰕㹚他打败了㱎䖘䵈䶁䘔䶑䘓鋱䩳䵷㒪䪉䉥，就把公主䥸䝟䳮䟑䎘䫱䉷䰯䕈䟐䬝嫁给龘䶛䨻䎱㸞蚮䡶䴞䴝䯬䬛䰕㹚。
            </p>

            <p>龘䶛䨻䎱、公主䥸䝟幸福地像个童话，他们生下一个孩子也在天天渐渐长大，为了避免以后麻烦，孩子称作王浩然，他的全名十分难念，我不想说一遍……</p>
        </article>

        <!-- 侧边栏在主内容右侧 -->
        <aside>
            <h2>相关链接</h2>

            <ul>
                <li><a href="#">言和</a></li>
                <li><a href="#">乐正绫</a></li>
                <li><a href="#">初音未来</a></li>
                <li><a href="#">三无 Marblue</a></li>
                <li><a href="#">二次元欢迎你</a></li>
            </ul>
        </aside>

    </main>

    <!-- 以下是本站所有网页的统一页脚 -->

    <footer>
        <p>© 2050 保留所有权利 | 宇 PPP 备 0054444944 号</p>
    </footer>

</body>

</html>
```

### 语义化元素

为了实现语义化标记，HTML 提供了明确这些区段的专用标签，例如：

`<main>` 存放每个页面独有的内容。每个页面上只能用一次 \<main>，且直接位于 \<body> 中。最好不要把它嵌套进其它元素。

`<article>` 包围的内容即一篇文章，与页面其它部分无关（比如一篇博文）。

`<section>` 与 \<article> 类似，但 \<section> 更适用于组织页面使其按功能（比如迷你地图、一组文章标题和摘要）分块。一般的最佳用法是：以 标题 作为开头；也可以把一篇 \<article> 分成若干部分并分别置于不同的 \<section> 中，也可以把一个区段 \<section> 分成若干部分并分别置于不同的 \<article> 中，取决于上下文。

`<aside>` 包含一些间接信息（术语条目、作者简介、相关链接，等等）。

`<header>` 是简介形式的内容。如果它是 \<body> 的子元素，那么就是网站的全局页眉。如果它是 \<article> 或\<section> 的子元素，那么它是这些部分特有的页眉（此 \<header> 非彼 标题）。

`<nav>` 包含页面主导航功能。其中不应包含二级链接等内容。

`<footer>` 包含了页面的页脚部分。

### 无语义元素

有时你会发现，对于一些要组织的项目或要包装的内容，现有的语义元素均不能很好对应。

`<span>` 是一个内联的无语义元素，最好只用于无法找到更好的语义元素来包含内容时，或者不想增加特定的含义时。

`<div>` 是一个块级无语义元素，应仅用于找不到更好的块级元素时，或者不想增加特定的意义时。

>**警告：** \<div> 非常便利但容易被滥用。由于它们没有语义值，会使 HTML 代码变得混乱。要小心使用，只有在没有更好的语义方案时才选择它，而且要尽可能少用，否则文档的升级和维护工作会非常困难。

### 换行br与水平分割线hr

`<br>` 可在段落中进行换行。

`<hr>` 元素在文档中生成一条水平分割线。

## 多媒体与嵌入

### 图片img

```html
<figure>
    <img src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg"
        alt="一只恐龙头部和躯干的骨架，它有一个巨大的头，长着锋利的牙齿。" width="400" height="341">
    <figcaption>曼彻斯特大学博物馆展出的一只霸王龙的化石</figcaption>
</figure>

```

我们可以用`<img>`元素来把图片放到网页上。它是一个空元素（它不需要包含文本内容或闭合标签），最少只需要一个 src （一般读作其全称 *source*）来使其生效。src 属性包含了指向我们想要引入的图片的路径，可以是相对路径或绝对 URL，就像 \<a> 元素的 href 属性一样。

>**警告：** 在得到授权之前永远不要把你的src属性指向其他人网站上的图片。这被称为"盗链（hotlinking）"。同样，盗取其他人的带宽也是违法的。而且这会降低你的页面的加载速度，而且图片可能会在不受你控制的情况下被移走或用别的令人尴尬的东西替换掉。  

`alt`备选文本，它的值应该是对图片的文字描述，用于在图片无法显示或不能被看到的情况

`width&height`宽度和高度，你可以用宽度和高度属性来指定你的图片的高度和宽度（你可以用多种方式找到你的图片的宽度和高度。你不应该使用 HTML 属性来改变图片的大小。

`title`图片标题，你可以给图片增加title属性来提供需要更进一步的支持信息，这会给我们一个鼠标悬停提示，看起来就像链接标题。

然而，这并不是推荐的 —— title 有很多易访问性问题，主要是基于这样一个事实，即屏幕阅读器的支持是不可预测的，大多数浏览器都不会显示它，除非您在鼠标悬停时。

HTML5 的 `<figure>` 和 `<figcaption>` 元素，为图片提供一个语义容器，在标题和图片之间建立清晰的关联。

注意 \<figure> 里不一定要是一张图片，只要是一个这样的独立内容单元：

- 用简洁、易懂的方式表达意图。
- 可以置于页面线性流的某处。
- 为主要内容提供重要的补充说明。

\<figure> 可以是几张图片、一段代码、音视频、方程、表格或别的。

>**备注：** 像\<img>和\<video>这样的元素有时被称之为替换元素，因为这样的元素的内容和尺寸由外部资源（像是一个图片或视频文件）所定义，而不是元素自身。

### 视频video

#### 嵌入视频

`<video>` 允许你轻松地嵌入一段视频

```html
<video src="rabbit320.webm" controls>
    <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

`src` 属性指向你想要嵌入网页当中的视频资源，他们的使用方式完全相同。

`controls`用户必须能够控制视频和音频的回放功能。你可以使用 controls 来包含浏览器提供的控件界面，同时你也可以使用合适的 JavaScript API 创建自己的界面。界面中至少要包含开始、停止以及调整音量的功能。

\<video> 标签内的内容

这个叫做后备内容 — 当浏览器不支持 \<video> 标签的时候，就会显示这段内容，这使得我们能够对旧的浏览器提供回退内容。

#### 格式兼容

```html
<video controls>
    <source src="rabbit320.mp4" type="video/mp4">
    <source src="rabbit320.webm" type="video/webm">
    <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

浏览器将会检查 \<source> 标签，并且播放第一个与其自身 codec 相匹配的媒体。

#### html5新特性

```html
<video controls width="400" height="400"
       autoplay loop muted
       poster="poster.png">
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

`width 和 height`你可以用属性控制视频的尺寸

`autoplay`这个属性会使音频和视频内容立即播放，即使页面的其他部分还没有加载完全

`loop`这个属性可以让音频或者视频文件循环播放。

`muted`这个属性会导致媒体播放时，默认关闭声音。

`poster`这个属性指向了一个图像的 URL，这个图像会在视频播放前显示。通常用于粗略的预览或者广告。

### 音频audio

`<audio>` 标签与 \<video> 标签的使用方式几乎完全相同。

```html
<audio controls>
    <source src="viper.mp3" type="audio/mp3">
    <source src="viper.ogg" type="audio/ogg">
    <p>你的浏览器不支持 HTML5 音频，可点击<a href="viper.mp3">此链接</a>收听。</p>
</audio>
```

\<audio> 标签不支持 width/height 属性 — 由于其并没有视觉部件，也就没有可以设置 width/height 的内容。

同时也不支持 poster 属性 — 同样，因为没有视觉部件。

### iframe

```html
<iframe src="https://developer.mozilla.org/zh-CN/docs/Glossary" width="100%" height="500" frameborder="0"
    allowfullscreen sandbox>
    <p> <a href="https://developer.mozilla.org/zh-CN/docs/Glossary">
            Fallback link for browsers that don't support iframes
        </a> </p>
</iframe>
```

`src`包含指向要嵌入文档的 URL 路径。

`width 和 height`这些属性指定你想要的 iframe 的宽度和高度。

`frameborder`如果设置为 1，则会告诉浏览器在此框架和其他框架之间绘制边框，这是默认行为。0 删除边框。不推荐这样设置，因为在 CSS 中可以更好地实现相同的效果。border: none;

`allowfullscreen`如果设置，\<iframe>则可以通过全屏 API 设置为全屏模式。

`sandbox`该属性需要在已经支持其它 \<iframe> 功能（例如 IE 10 及更高版本）但稍微更现代的浏览器上才能工作，该属性可以提高安全性设置。

>为了提高速度，在主内容完成加载后，使用 JavaScript 设置 iframe 的 src 属性是个好主意

### 矢量图svg

一个矢量图文件包含了图形和路径的定义，SVG 是用于描述矢量图像的XML语言。

```xml
<svg version="1.1"
        baseProfile="full"
        width="300" height="200"
        xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="black" />
    <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
```

要通过 \<img> 元素嵌入 SVG，你只需要在 src 属性中引用它`src="equilateral.svg"`。

内联 SVG，在 \<svg>\</svg>标签中引入 SVG 代码。

## 表格table

```html
<table>
    <tr>
        <th colspan="2">Animals</th>
    </tr>
    <tr>
        <th colspan="2">Hippopotamus</th>
    </tr>
    <tr>
        <th rowspan="2">Horse</th>
        <td>Mare</td>
    </tr>
    <tr>
        <td>Stallion</td>
    </tr>
    <tr>
        <th colspan="2">Crocodile</th>
    </tr>
    <tr>
        <th rowspan="2">Chicken</th>
        <td>Hen</td>
    </tr>
    <tr>
        <td>Rooster</td>
    </tr>
</table>
```

每一个表格的内容都包含在这两个标签中：`<table></table>`。

使用 `<th>` 元素添加标题。

使用 `<tr>` 元素（其中“tr”代表“table row”）可以定义每一行元素。

在表格中，最小的内容容器是单元格，是通过 `<td>` 元素创建的（其中“td”代表“table data”）。

表格中的标题和单元格有 `colspan` 和 `rowspan` 属性，这两个属性可以帮助我们实现不同的格占用。这两个属性接受一个没有单位的数字值，数字决定了它们的宽度或高度是几个单元格。比如，colspan="2" 使一个单元格的宽度是两个单元格。

```html
<table>
    <caption>How I chose to spend my money</caption>
    <thead>
        <tr>
            <th>Purchase</th>
            <th>Location</th>
            <th>Date</th>
            <th>Evaluation</th>
            <th>Cost (€)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Haircut</td>
            <td>Hairdresser</td>
            <td>12/09</td>
            <td>Great idea</td>
            <td>30</td>
        </tr>
        <tr>
            <td>Lasagna</td>
            <td>Restaurant</td>
            <td>12/09</td>
            <td>Regrets</td>
            <td>18</td>
        </tr>
        <tr>
            <td>Shoes</td>
            <td>Shoeshop</td>
            <td>13/09</td>
            <td>Big regrets</td>
            <td>65</td>
        </tr>
        <tr>
            <td>Toothpaste</td>
            <td>Supermarket</td>
            <td>13/09</td>
            <td>Good</td>
            <td>5</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="4">SUM</td>
            <td>118</td>
        </tr>
    </tfoot>
</table>
```

使用 `<caption>` 为你的表格增加一个标题，把 \<caption> 元素放入 \<table> 元素中。

添加 `<thead>`, `<tbody>` 和 `<tfoot>` 结构，由于你的表格在结构上有点复杂，如果把它们定义得更加结构化，那会帮助我们更能了解结构。一个明确的方法是使用 \<thead>, \<tbody> 和 \<tfoot>  这些元素允许你把表格中的部分标记为表头、正文、页脚部分。

## 表单form

[表单form](https://developer.mozilla.org/zh-CN/docs/Learn/Forms)

### 表单数据校验

#### 客户端校验

发生在浏览器端，表单数据被提交到服务器之前，这种方式相较于服务器端校验来说，用户体验更好，它能实时的反馈用户的输入校验结果，这种类型的校验可以进一步细分成下面这些方式：

- JavaScript 校验，这是可以完全自定义的实现方式；
- HTML5 内置校验，这不需要 JavaScript，而且性能更好，但是不能像 JavaScript 那样可自定义。

#### 服务器端校验

发生在浏览器提交数据并被服务器端程序接收之后 —— 通常服务器端校验都是发生在将数据写入数据库之前，如果数据没通过校验，则会直接从服务器端返回错误消息，并且告诉浏览器端发生错误的具体位置和原因，服务器端校验不像客户端校验那样有好的用户体验，因为它直到整个表单都提交后才能返回错误信息。但是服务器端校验是你的应用对抗错误/恶意数据的最后防线，在这之后，数据将被持久化至数据库。当今所有的服务端框架都提供了数据校验与清洁功能（让数据更安全）。

#### 使用内置表单数据校验

HTML5 一个特别有用的新功能就是，可以在不写一行脚本代码的情况下，即对用户的输入进行数据校验，这都是通过**表单元素的校验属性**实现的，这些属性可以让你定义一些规则，用于限定用户的输入，比如某个输入框是否必须输入，或者某个输入框的字符串的最小最大长度限制，或者某个输入框必须输入一个数字、邮箱地址等；还有数据必须匹配的模式。如果表单中输入的数据都符合这些限定规则，那么表示这个表单校验通过，否则则认为校验未通过。

#### required 属性

最简单的 HTML5 校验功能是 `required` 属性 — 如果要使输入成为必需的，则可以使用此属性标记元素。当设置此属性时，如果输入为空，该表单将不会提交（并将显示错误消息），输入也将被视为无效。

```html
<form>
  <label for="choose">Would you prefer a banana or cherry?</label>
  <input id="choose" name="i_like" required>
  <button>Submit</button>
</form>
```

```css
input:invalid {
  border: 2px dashed red;
}

input:valid {
  border: 2px solid black;
}

```

以上样式效果为：在校验失败时 输入框会有一个亮红色的虚线边框，在校验通过时会有一个更微妙的黑色边框。

#### 正则表达式校验

另一个常用的校验功能是 `pattern` 属性，以 Regular Expression 作为 value 值。正则表达式 (regex) 是一个可以用来匹配文本字符串中字符的组合的模式，所以它们是理想的表单校验器，也可以支持 JavaScript 中许多其它的用途。

```html
<form>
  <label for="choose">Would you prefer a banana or a cherry?</label>
  <input id="choose" name="i_like" required pattern="banana|cherry">
  <button>Submit</button>
</form>
```

>**备注：** 一些 \<input> 元素类型不需要 pattern 属性进行校验。指定特定 email 类型 就会使用匹配电子邮件格式的正则表达式来校验 (如果有 multiple 属性请用逗号来分割多个邮箱). 进一步来说，字段 url 类型则会自动校验输入的是否为一个合法的链接。

#### 限制输入的长度

所有文本框 (\<input> 或 \<textarea>) 都可以使用 minlength 和  maxlength 属性来限制长度。如果输入的字段长度小于 minlength 的值或大于 maxlength 值则无效。

在数字条目中 (i.e. \<input type="number">), 该 min 和 max 属性同样提供校验约束。如果字段的值小于min 属性的值或大于 max 属性的值，该字段则无效。

```html
<form>
  <div>
    <label for="choose">Would you prefer a banana or a cherry?</label>
    <input id="choose" name="i_like" required minlength="6" maxlength="6">
  </div>
  <div>
    <label for="number">How many would you like?</label>
    <input type="number" id="number" name="amount" value="1" min="1" max="10">
  </div>
  <div>
    <button>Submit</button>
  </div>
</form>
```

#### 自定义错误信息

```html
<form>
  <label for="mail">I would like you to provide me an e-mail</label>
  <input type="email" id="mail" name="mail">
  <button>Submit</button>
</form>
```

在 JavaScript 中，调用 setCustomValidity() 方法：

```javascript
let email = document.getElementById("mail");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I expect an e-mail, darling!");
  } else {
    email.setCustomValidity("");
  }
});
```
