---
category:
  - Front
tag:
  - Bootstrap
---

# Bootstrap

参考文档[bootstrap4](https://v4.bootcss.com/docs/)

- [Bootstrap](#bootstrap)
  - [bootstrap4引入](#bootstrap4引入)
    - [本地引入](#本地引入)
    - [在线引入](#在线引入)
  - [JavaScript相关](#javascript相关)
    - [插件的 data 属性 API](#插件的-data-属性-api)
    - [事件](#事件)
    - [编程式 API](#编程式-api)
  - [布局](#布局)
    - [移动设备适配viewport](#移动设备适配viewport)
    - [容器container](#容器container)
    - [栅格系统row\&col](#栅格系统rowcol)
    - [排版](#排版)
    - [强调](#强调)
    - [颜色](#颜色)
  - [基础控件](#基础控件)
    - [表格table](#表格table)
    - [图片img](#图片img)
    - [信息提示框alert](#信息提示框alert)
    - [按钮btn](#按钮btn)
      - [按钮状态active\&disabled](#按钮状态activedisabled)
      - [按钮组btn-group](#按钮组btn-group)
    - [进度条progress](#进度条progress)
    - [分页pagination](#分页pagination)
    - [卡片card](#卡片card)
    - [下拉菜单dropdown](#下拉菜单dropdown)
    - [折叠collapse](#折叠collapse)
      - [手风琴accordion](#手风琴accordion)
    - [导航nav](#导航nav)
    - [导航栏navbar](#导航栏navbar)
    - [表单form-control](#表单form-control)
      - [堆叠表单](#堆叠表单)
      - [文本框textarea](#文本框textarea)
      - [复选框checkbox](#复选框checkbox)
      - [单选框radio](#单选框radio)
      - [选择框select](#选择框select)
      - [开关custom-switch](#开关custom-switch)
      - [文件选择custom-file](#文件选择custom-file)
      - [滑动调节range](#滑动调节range)
      - [表单状态](#表单状态)
      - [组合示例](#组合示例)
    - [轮播carousel](#轮播carousel)
    - [模态框modal](#模态框modal)
    - [旋转图标spinner](#旋转图标spinner)

## bootstrap4引入

### 本地引入

### 在线引入

```html
<!-- Bootstrap4 核心 CSS 文件 -->
<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="external nofollow" target="_blank" >
 
<!-- jQuery 文件务必在 bootstrap.min.js 之前引入 -->
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js" rel="external nofollow" ></script>
 
<!-- 下拉菜单（dropdown）、弹出框（popover）和工具提示（tooltip）组件依赖 Popper -->
<script src="https://cdn.bootcss.com/popper.js/1.12.5/umd/popper.min.js" rel="external nofollow" ></script>
 
<!-- Bootstrap4 核心 JavaScript 文件 -->
<script src="https://cdn.bootcss.com/bootstrap/4.1.0/js/bootstrap.min.js" rel="external nofollow" ></script>
```

## JavaScript相关

### 插件的 data 属性 API

几乎所有的 Bootstrap 插件都可以通过带有 data 属性的 HTML 元素单独开启和配置（我们推荐 JavaScript API 为首选方式）。请确保 **仅在单个 HTML 元素上使用同一个插件的 data 属性** （例如，你不能通过同一按钮触发工具提示和模态框。）

### 事件

Bootstrap 为大多数插件的独特行为提供了自定义事件。通常，事件的命名以不定式或过去分词形式出现，例如，在事件开始时触发的事件名时不定式形式的（例如 show），在事件完成时触发的事件名是过去分词形式的（例如 shown）。

所有不定式形式命名的事件都提供 `preventDefault()` 功能。这就赋予了你在动作开始之前将其停止的能力。如果事件处理函数的返回值是 false，将自动调用 preventDefault()。

```javascript
$('#myModal').on('show.bs.modal', function (event) {
  if (!data) {
    return event.preventDefault() // 停止即将展示的模态框（modal）
  }
})
```

### 编程式 API

所有开放的 API 都是独立、可链式调用的方法，并且返回被操作的元素集合。

```javascript
$('.btn.danger').button('toggle').addClass('fat')
```

所有方法都可以接受三种参数形式：对象类型的参数、字符串类型的参数（将被当作是某个方法的名称）或没有参数（将以默认行为启动插件）

```javascript
$('#myModal').modal() // 以默认值启动插件
$('#myModal').modal({ keyboard: false }) // 启动插件时将 keyboard 设置为 false
$('#myModal').modal('show') // 启动插件并立即调用 show 方法
```

## 布局

### 移动设备适配viewport

为了让 Bootstrap 开发的网站对移动设备友好，确保适当的绘制和触屏缩放，需要在网页的 head 之中添加 viewport meta 标签，如下所示：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```

### 容器container

我们需要一个容器来包裹支持响应式布局`<div class="container">`

`container`类用于固定宽度并支持响应式布局容器

`container-fluid`用于 100% 宽度，占据全部视口（viewport）的容器

### 栅格系统row&col

该系统基于一个12列布局，Bootstrap4的网格系统是响应式的，列会根据屏幕大小自动重新排列。

![屏幕截图 2022-12-12 201657.png](https://s2.loli.net/2022/12/12/qn1TsfrHpkz6RJv.png)

网格每一行需要放在 container 容器中，这样就可以自动设置一些外边距与内边距。

Bootstrap 4 网格系统有以下 5 个类:

1. col- 针对所有设备
2. col-sm- 平板 - 屏幕宽度等于或大于 576px
3. col-md- 桌面显示器 - 屏幕宽度等于或大于 768px
4. col-lg- 大桌面显示器 - 屏幕宽度等于或大于 992px
5. col-xl- 超大桌面显示器 - 屏幕宽度等于或大于 1200px

使用 offset-\*-\* 偏移元素

```html
<div class="container">
    <div class="row">
        <div class="col-md-4">.col-md-4</div>
        <div class="col-md-4 offset-md-4">.col-md-4 .offset-md-4</div>
    </div>
    <div class="row">
        <div class="col-md-3 offset-md-3">.col-md-3 .offset-md-3</div>
        <div class="col-md-3 offset-md-3">.col-md-3 .offset-md-3</div>
    </div>
    <div class="row">
        <div class="col-md-6 offset-md-3">.col-md-6 .offset-md-3</div>
    </div>
</div>
```

### 排版

Bootstrap4 默认的 font-size 为 16px, line-height 为 1.5。

display 标题 h1~6 可以输出更大更粗的字体样式。

Bootstrap 提供了四个 display 类来控制标题的样式: display-1, display-2, display-3, display-4。

```html
<div class="container">
    <p>这是一个普通的段落。</p>
    <p class="lead">这是个文字突出的段落。</p>

    <p class="text-left">左对齐文本</p>
    <p class="text-center">居中对齐文本</p>
    <p class="text-right">右对齐文本</p>
    
    <p class="text-justify">该段落会根据屏幕的大小对超出屏幕的文字进行换行</p>
    <p class="text-nowrap">该段落不会根据屏幕的大小对超出屏幕的文字进行换行。</p>
</div>
```

### 强调

```html
<div class="container">
    <small>小字</small><br>
    <strong>强调</strong><br>
    <em>斜体</em><br>
    <mark>文本高亮</mark>
    <p>代码 <code>code</code> </p>
    <p>使用 组合键 <kbd>ctrl + s</kbd> 快速保存</p>
    <blockquote class="blockquote">
        <p>这是引用正文</p>
        <footer class="blockquote-footer">这是来源</footer>
    </blockquote>
</div>
```

### 颜色

基础颜色

![屏幕截图 2022-12-12 201657.png](https://s2.loli.net/2022/12/13/s63ECQoN2VDarS9.png)

程度颜色

![屏幕截图 2022-12-12 201657.png](https://s2.loli.net/2022/12/13/mnzYxfqda9iXTC6.png)

**注意:** 背景颜色不会设置文本的颜色，在一些实例中你需要与 text-\* 类一起使用。

```html
<div class="container">
    <h3>文字颜色</h3>
    <p class="text-muted">柔和 muted</p>
    <p class="text-primary">重要 primary</p>
    <p class="text-success">执行成功 success</p>
    <p class="text-info">提示信息 info</p>
    <p class="text-warning">警告 warning</p>
    <p class="text-danger">危险 danger</p>
    <p class="text-secondary">副标题</p>
    <p class="text-dark">深灰色文字</p>
    <p class="text-light">浅灰色文本（白色背景上看不清楚）。</p>
    <h3>背景颜色</h3>
    <p class="bg-primary text-white">重要的背景颜色。</p>
    <p class="bg-success text-white">执行成功背景颜色。</p>
    <p class="bg-info text-white">信息提示背景颜色。</p>
    <p class="bg-warning text-white">警告背景颜色</p>
    <p class="bg-danger text-white">危险背景颜色。</p>
    <p class="bg-secondary text-white">副标题背景颜色。</p>
    <p class="bg-dark text-white">深灰背景颜色。</p>
    <p class="bg-light text-dark">浅灰背景颜色。</p>
</div>
```

## 基础控件

### 表格table

| 类 | 用处 |
| --- | --- |
| table | 为任意\<table>添加基本样式 (只有横向分隔线) |
| table-striped | 在\<tbody>内添加斑马线形式的条纹 ( IE8 不支持) |
| table-bordered | 为所有表格的单元格添加边框 |
| table-hover | 在\<tbody>内的任一行启用鼠标悬停状态 |
| table-dark | 类可以为表格添加黑色背景 |
| table-\* | 设置单元格颜色 (primary...) |
| table-responsive | 类用于创建响应式表格：在屏幕宽度小于 992px 时会创建水平滚动条，如果大于 992px 则没有滚动条 |

你可以通过以下类设定在指定屏幕宽度下显示滚动条：

| 类名 | 屏幕宽度 |
| --- | --- |
| table-responsive-sm | < 576px |
| table-responsive-md | < 768px |
| table-responsive-lg | < 992px |
| table-responsive-xl | < 1200px |

```html
<div class="container">
    <h3>斑马线形式表格</h3>
    <p> table-striped 类在 tbody 内添加斑马线形式的条纹 </p>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Firstname</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Anna</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Debbie</td>
            </tr>
            <tr>
                <td>3</td>
                <td>John</td>
            </tr>
        </tbody>
    </table>
</div>
```

### 图片img

> **注意：**
>
> 在bootstrap4中重命名了图片相关的一些类，其中：
>
> - 重命名 img-responsive ​为 img-fluid​
> - 重命名 img-rounded ​为 rounded​
> - 重命名 img-circle ​为 rounded-circle​

向一个<img>元素添加类，轻松地在项目中样式化图片。

| 类名 | 效果 |
| --- | --- |
| img-fluid | 让图片支持响应式 |
| rounded | 让图片显示圆角效果 |
| rounded-circle | 设置椭圆形图片 |
| img-thumbnail | 用于设置图片缩略图(图片有边框) |
| float-right | 设置图片右对齐 |
| float-left | 设置图片左对齐 |

```html
<div class="container">
    <img src="https://www.w3cschool.cn/statics/images/course/cinqueterre.jpg" class="img-fluid rounded"
        alt="Cinque Terre" width="304" height="236">
    <img src="https://www.w3cschool.cn/statics/images/course/cinqueterre.jpg" class="img-fluid rounded-circle"
        alt="Cinque Terre" width="304" height="236">
</div>
```

### 信息提示框alert

提示框可以使用 alert 类, 后面加上指定特定意义的颜色类来实现`class="alert alert-primary"`

```html
<div class="container">
    <h3>提示框</h3>
    <div class="alert alert-success">
        <strong>成功!</strong> 指定操作成功提示信息。
    </div>
    <div class="alert alert-danger">
        <strong>错误!</strong> 失败的操作
    </div>
    <p>提示框添加链接alert-link</p>
    <div class="alert alert-primary">
        <strong>首选!</strong> 你应该认真阅读 <a href="#" class="alert-link">这条信息</a>。
    </div>
    <p>关闭提示框 需要poper支持</p>
    <div class="alert alert-secondary alert-dismissable">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>次要的!</strong> 显示一些不重要的信息。
    </div>
</div>
```

关闭提示框

```javascript
$('.alert').alert('close')
```

事件监听

`close.bs.alert`当 close 实例方法被调用时，该事件被立即触发。

`closed.bs.alert`当警告框（alert）已关闭时（并将等待 CSS transitions 执行完），该事件将被触发。

```javascript
$('#myAlert').on('closed.bs.alert', function () {
  // do something...
})
```

### 按钮btn

按钮类可用于 \<a>, \<button>, 或 \<input> 元素上

#### 按钮状态active&disabled

```html
<div class="container">
    <h3>按钮样式</h3>
    <button type="button" class="btn">基本按钮</button>
    <button type="button" class="btn btn-primary">主要按钮</button>
    <p>按钮设置边框 btn-outline-*</p>
    <button type="button" class="btn btn-outline-success">成功</button>
    <p>设置小号按钮 btn-sm, 大号按钮 btn-lg</p>
    <button type="button" class="btn btn-info btn-sm">信息</button>
    <p>块级按钮 btn-block</p>
    <button type="button" class="btn btn-warning btn-block">警告</button>
    <p>链接按钮 btn-link</p>
    <button type="button" class="btn btn-link">链接</button>
    <p>按钮状态</p>
    <button type="button" class="btn btn-primary">主要按钮</button>
    <button type="button" class="btn btn-primary active">点击后的按钮</button>
    <button type="button" class="btn btn-primary" disabled>禁止点击的按钮</button>
    <a href="#" class="btn btn-primary disabled">禁止点击的链接</a>
</div>
```

#### 按钮组btn-group

我们可以在 \<div> 元素上添加 btn-group 类来创建水平按钮组。

使用 btn-group-vertical 类来创建垂直的按钮组

内嵌下拉菜单

```html
<div class="container-fluid">
    <h3>内嵌按钮组</h3>
    <p>按钮组设置下拉菜单:</p>
    <div class="btn-group">
        <button type="button" class="btn btn-primary">Apple</button>
        <button type="button" class="btn btn-primary">Samsung</button>
        <div class="btn-group">
            <!-- 嵌入下拉菜单 dropdown -->
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                Sony
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Tablet</a>
                <a class="dropdown-item" href="#">Smartphone</a>
            </div>
        </div>
    </div>
</div>
```

### 进度条progress

进度条创建步骤：

1. 添加一个带有 progress 类的 \<div>
2. 接着，在上面的 \<div> 内，添加一个带有 progress-bar 的空的 \<div>
3. 添加一个带有百分比表示的宽度的 style 属性，例如 style="width:70%" 表示进度条在 70% 的位置

```html
<div class="container-fluid">
    <h3>进度条高度</h3>
    <p>进度条高度默认为 16px。我们可以使用 progress 的 height 属性来修改他：</p>
    <div class="progress" style="height:10px">
        <div class="progress-bar" style="width:40%"></div>
    </div>
    <h3>进度条文本标签</h3>
    <p>进度条使用 progress-bar 的 width 属性来设置进度</p>
    <div class="progress">
        <div class="progress-bar" style="width:30%">30%</div>
    </div>
    <div class="progress">
        <div class="progress-bar" style="width:50%">50%</div>
    </div>
    <div class="progress">
        <div class="progress-bar" style="width:70%">70%</div>
    </div>
    <h3>进度条颜色</h3>
    <p>颜色通过 bg-* 设定</p>
    <div class="progress">
        <div class="progress-bar bg-danger" style="width:30%"></div>
    </div>
    <h3>条纹的进度条</h3>
    <p>使用 .progress-bar-striped 类来设置条纹进度条</p>
    <div class="progress">
        <div class="progress-bar progress-bar-striped" style="width:30%"></div>
    </div>

    <h3>动画进度条</h3>
    <p>使用 .progress-bar-animated 类可以为进度条添加动画</p>
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" style="width:40%"></div>
    </div>
</div>
```

### 分页pagination

要创建一个基本的分页可以在 \<ul> 元素上添加 pagination 类，然后在 \<li> 元素上添加 page-item 类

```html
<div class="container">
    <h3>分页</h3>
    <p>当前页可以使用 active 类来高亮显示</p>
    <p>disabled 类可以设置分页链接不可点击</p>   
    <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item active"><a class="page-link" href="#">3</a></li>
        <li class="page-item disabled"><a class="page-link" href="#">Next</a></li>
    </ul>
</div>
```

### 卡片card

我们可以通过 Bootstrap4 的 card 与 card-body 类来创建一个简单的卡片

bg-\* 设置颜色

```html
<div class="container">
    <h3>图片头部和底部</h3>
    <p>图片在头部(card-img-top)</p>
    <p>图片在底部(card-img-bottom)</p>
    <div class="card">
        <div class="card-header">头部</div>
        <img class="card-img-top"
            src="https://www.w3cschool.cn/attachments/image/20180524/1527144620597215.png" alt="Card image"
            style="width:100%">

        <div class="card-body">
            <h3>文字覆盖图片</h3>
            <p>如果图片添加内容可以使用 .card-img-overlay 类:</p>
            <div class="card img-fluid" style="width:500px">
                <img class="card-img-top"
                    src="https://atts.w3cschool.cn/attachments/knowledge/201804/30601.png" alt="Card image"
                    style="width:100%">
                <div class="card-img-overlay">
                    <h4 class="card-title">W3Cschool</h4>
                    <p class="card-text">Some example text some example text. Some example text some example
                    </p>
                    <a href="#" class="btn btn-primary">See Profile</a>
                </div>
            </div>
        </div>

        <div class="card-footer">底部</div>
    </div>
</div>
```

### 下拉菜单dropdown

dropdown 类用来指定一个下拉菜单。

我们可以使用一个按钮或链接来打开下拉菜单，按钮或链接需要添加 dropdown-toggle 和 data-toggle="dropdown" 属性。

然后在下面创建一个 \<div> 元素上添加 dropdown-menu 类来设置实际下拉菜单，然后在下拉菜单的选项中添加 dropdown-item 类。

```html
<div class="container">
    <h3>下拉菜单</h3>
    <p>dropdown-divider 类用于在下拉菜单中创建一个水平的分割线</p>
    <p>dropdown-header 类用于在下拉菜单中添加标题</p>
    <div class="dropdown">
        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
            Dropdown button
        </button>
        <div class="dropdown-menu">
            <h5 class="dropdown-header">Dropdown header</h5>
            <a class="dropdown-item" href="#">Link 1</a>
            <a class="dropdown-item" href="#">Link 2</a>
            <div class="dropdown-divider"></div>
            <h5 class="dropdown-header">Dropdown header</h5>
            <a class="dropdown-item" href="#">Another link</a>
        </div>
    </div>
</div>
```

### 折叠collapse

collapse 类用于指定一个折叠元素 (实例中的 \<div>)，点击按钮后会在隐藏与显示之间切换。

控制内容的隐藏与显示，需要在 \<a> 或 \<button> 元素上添加 data-toggle="collapse" 属性。 data-target="#id" 属性是对应折叠的内容 (\<div id="demo">)。

\<a> 元素上你可以使用 href 属性来代替 data-target 属性

在Bootstrap4中，折叠的内容是默认隐藏的，我们可以通过添加 show 类让内容默认显示

```html
 <div class="container">
    <h3>简单的折叠</h3>
    <p>点击按钮内容会再显示与隐藏之间切换。</p>
    <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#demo">简单的折叠</button>
    <div id="demo" class="collapse show">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
</div>
```

#### 手风琴accordion

像手风琴风箱一样折叠

```html
<div class="accordion" id="accordionExample">

    <div class="card">
        <div class="card-header" id="head1">
            <h3 class="mb-0">
                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                    data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                    Collapsible Group Item #1
                </button>
            </h3>
        </div>
        <div id="collapse1" class="collapse show" aria-labelledby="head1"
            data-parent="#accordionExample">
            <div class="card-body">
                Some placeholder content for the first accordion panel. This panel is shown by default, thanks
                to the <code>.show</code> class.
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header" id="heading2">
            <h3 class="mb-0">
                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse"
                    data-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                    Collapsible Group Item #2
                </button>
            </h3>
        </div>
        <div id="collapse2" class="collapse" aria-labelledby="heading2" data-parent="#accordionExample">
            <div class="card-body">
                Some placeholder content for the second accordion panel. This panel is hidden by default.
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header" id="heading3">
            <h3 class="mb-0">
                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse"
                    data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                    Collapsible Group Item #3
                </button>
            </h3>
        </div>
        <div id="collapse3" class="collapse" aria-labelledby="heading3" data-parent="#accordionExample">
            <div class="card-body">
                And lastly, the placeholder content for the third and final accordion panel. This panel is
                hidden by default.
            </div>
        </div>
    </div>
</div>
```

### 导航nav

创建一个简单的水平导航栏，可以在 \<ul> 元素上添加 nav 类，在每个 \<li> 选项上添加 nav-item 类，在每个链接上添加 nav-link 类

flex-column 类用于创建垂直导航

justify-content-center 类设置导航居中显示

nav-justified 类设置导航项齐行等宽显示

设置选项卡是动态可切换的，在每个链接上添加 data-toggle="tab" 属性。 然后在每个选项对应的id属性上加入 tab-pane 类，需要 tab-content 包围这些选项

如果你希望有淡入效果可以在 tab-pane 后添加 fade类

改为胶囊状显示需要把 ul 的 nav-tabs 改为 nav-pills，修改 data-toggle="pill"

```html
<div class="container">
    <h3>选项卡切换</h3>
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#menu1">Menu 1</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#menu2">Menu 2</a>
        </li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
        <div id="home" class="container tab-pane active"><br>
            <h3>HOME</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.</p>
        </div>
        <div id="menu1" class="container tab-pane fade"><br>
            <h3>Menu 1</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.</p>
        </div>
        <div id="menu2" class="container tab-pane fade"><br>
            <h3>Menu 2</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam.</p>
        </div>
    </div>
</div>
```

### 导航栏navbar

使用 navbar 类来创建一个标准的导航栏，后面紧跟 navbar-expand-xl|lg|md|sm 类来创建响应式的导航栏 (大屏幕水平铺开，小屏幕垂直堆叠)。

nav标签包围ul

导航栏上的选项可以使用 \<ul> 元素并添加 class="navbar-nav" 类。 然后在 \<li> 元素上添加 nav-item 类，\<a> 元素上使用 nav-link 类

通过删除 navbar-expand-xl|lg|md|sm 类来创建垂直导航栏

**吞字问题改为header标签** 使用​ fixed-top​ 类来实现导航栏的顶部固定，fixed-bottom​ 类用于设置导航栏固定在底部

fixed-top 的原因？

```html
<header class="navbar navbar-expand-sm bg-dark navbar-dark">
    <!-- 设置logo -->
    <a class="navbar-brand" href="#">
        <img src="https://www.w3cschool.cn/attachments/image/20180524/1527144620597215.png" alt="logo"
            style="width:40px;">
    </a>
    <!-- 选项 -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="#">Link 1</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Link 2</a>
        </li>
        <!-- 下拉菜单 -->
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Link 3</a>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">link 1</a>
                <a class="dropdown-item" href="#">link 1</a>
            </div>
        </li>
    </ul>
    <!-- 搜索框 -->
    <form class="form-inline">
        <input class="form-control" type="text" placeholder="Search">
        <button class="btn btn-info" type="button">Search</button>
    </form>
</header>

<div class="container">
    <h3>折叠导航栏</h3>
    <p>通常，小屏幕上我们都会折叠导航栏，通过点击来显示导航选项。</p>
    <p>提示: 如果你删除 navbar-expand-md 类，导航链接会一直隐藏，且切换按钮会一直显示。</p>
</div>
<nav class="navbar navbar-expand-md bg-dark navbar-dark">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
        </ul>
    </div>
</nav>
<br>
```

### 表单form-control

表单元素 \<input>, \<textarea>, 和 \<select> 在使用 form-control 类的情况下，宽度都是设置为 100%。

#### 堆叠表单

登录

```html
<div class="container">
    <h3>堆叠表单</h3>
    <form>
        <div class="form-group">
            <label for="usr">Username:</label>
            <input type="text" class="form-control" id="usr" placeholder="Enter username">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd" placeholder="Enter password">
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox"> Remember me
            </label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
```

#### 文本框textarea

```html
<form>
    <div class="form-group">
        <label for="comment">评论:</label>
        <textarea class="form-control" rows="5" id="comment"></textarea>
    </div>
</form>
```

#### 复选框checkbox

可以选一个或多个

```html
<div class="container">
    <h3>表单控件: checkbox</h3>
    <p>以下实例包含了三个选项，最后一个是禁用的</p>
    <form>
        <div class="form-check">
            <label class="form-check-label">
                <input type="checkbox" class="form-check-input" value="">ption 1
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input type="checkbox" class="form-check-input" value="">ption 2
            </label>
        </div>
        <div class="form-check disabled">
            <label class="form-check-label">
                <input type="checkbox" class="form-check-input" value="" disabled>ption 3
            </label>
        </div>
    </form>
</div>
```

#### 单选框radio

```html
<div class="container">
    <h3>表单控件: radio</h3>
    <p>以下实例包含了三个选项，最后一个是禁用的</p>
    <form>
        <div class="radio">
            <label><input type="radio" name="optradio">ption 1</label>
        </div>
        <div class="radio">
            <label><input type="radio" name="optradio"> ption 2</label>
        </div>
        <div class="radio disabled">
            <label><input type="radio" name="optradio" disabled> ption 3</label>
        </div>
    </form>
</div>
```

#### 选择框select

```html
<div class="container">
    <h3>表单控件: select</h3>
    <form>
        <div class="form-group">
            <label for="sel1">单选下拉菜单</label>
            <select class="form-control" id="sel1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
        </div>
    </form>
</div>
```

#### 开关custom-switch

custom-control和custom-switch

```html
<div class="custom-control custom-switch">
    <input type="checkbox" class="custom-control-input" id="customSwitch1">
    <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
</div>
<div class="custom-control custom-switch">
    <input type="checkbox" class="custom-control-input" disabled id="customSwitch2">
    <label class="custom-control-label" for="customSwitch2">Disabled switch element</label>
</div>
```

#### 文件选择custom-file

```html
<div class="custom-file">
    <input type="file" class="custom-file-input" id="customFile">
    <label class="custom-file-label" for="customFile">Choose file</label>
</div>
```

#### 滑动调节range

```html
<form>
    <div class="form-group">
        <label for="formControlRange">Example Range input</label>
        <input type="range" class="form-control-range" id="formControlRange">
    </div>
</form>
```

#### 表单状态

```html
<form>
    <div class="form-row">
        <div class="col-md-6 mb-3">
            <label for="validationServer01">First name</label>
            <input type="text" class="form-control is-valid" id="validationServer01" value="Mark" required>
            <div class="valid-feedback">
                Looks good!
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="col-md-3 mb-3">
            <label for="validationServer04">State</label>
            <select class="custom-select is-invalid" id="validationServer04"
                aria-describedby="validationServer04Feedback" required>
                <option selected disabled value="">Choose...</option>
                <option>...</option>
            </select>
            <div id="validationServer04Feedback" class="invalid-feedback">
                Please select a valid state.
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="form-check">
            <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3"
                aria-describedby="invalidCheck3Feedback" required>
            <label class="form-check-label" for="invalidCheck3">
                Agree to terms and conditions
            </label>
            <div id="invalidCheck3Feedback" class="invalid-feedback">
                You must agree before submitting.
            </div>
        </div>
    </div>
    <button class="btn btn-primary" type="submit">Submit form</button>
</form>
```

#### 组合示例

```html
<div class="container">
    <form class="bd-example">
        <fieldset>
            <legend>Example legend</legend>
            <p>
                <label for="input">Example input</label>
                <input type="text" id="input" placeholder="Example input">
            </p>
            <p>
                <label for="select">Example select</label>
                <select id="select">
                    <option value="">Choose...</option>
                    <optgroup label="Option group 1">
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                    </optgroup>
                    <optgroup label="Option group 2">
                        <option value="">Option 4</option>
                        <option value="">Option 5</option>
                        <option value="">Option 6</option>
                    </optgroup>
                </select>
            </p>
            <p>
                <label>
                    <input type="checkbox" value="">
                    Check this checkbox
                </label>
            </p>
            <p>
                <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="">
                    Option one is this and that
                </label>
                <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                    Option two is something else that's also super long to demonstrate the wrapping of these fancy
                    form controls.
                </label>
                <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled="">
                    Option three is disabled
                </label>
            </p>
            <p>
                <label for="textarea">Example textarea</label>
                <textarea id="textarea" rows="3"></textarea>
            </p>
            <p>
                <label for="date">Example date</label>
                <input type="date" id="date">
            </p>
            <p>
                <label for="time">Example time</label>
                <input type="time" id="time">
            </p>
            <p>
                <label for="output">Example output</label>
                <output name="result" id="output">100</output>
            </p>
            <p>
                <button type="submit">Button submit</button>
                <input type="submit" value="Input submit button">
                <input type="reset" value="Input reset button">
                <input type="button" value="Input button">
            </p>
            <p>
                <button type="submit" disabled="">Button submit</button>
                <input type="submit" value="Input submit button" disabled="">
                <input type="reset" value="Input reset button" disabled="">
                <input type="button" value="Input button" disabled="">
            </p>
        </fieldset>
    </form>
</div>
```

### 轮播carousel

```html
<div id="demo" class="carousel slide" data-ride="carousel">
    <!-- 指示符 -->
    <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
    </ul>
    <!-- 轮播图片 -->
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="https://atts.w3cschool.cn/attachments/knowledge/201803/24575.png">
            <div class="carousel-caption">
                <h3>第一张图片描述标题</h3>
                <p>描述文字!</p>
            </div>
        </div>
        <div class="carousel-item">
            <img src="https://atts.w3cschool.cn/attachments/knowledge/201702/43125.png">
            <div class="carousel-caption">
                <h3>第二张图片描述标题</h3>
                <p>描述文字!</p>
            </div>
        </div>
        <div class="carousel-item">
            <img src="https://atts.w3cschool.cn/attachments/knowledge/201804/30601.png">
            <div class="carousel-caption">
                <h3>第三张图片描述标题</h3>
                <p>描述文字!</p>
            </div>
        </div>
    </div>
    <!-- 左右切换按钮 -->
    <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </a>
    <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
    </a>
</div>
```

### 模态框modal

模态框是覆盖在父窗体上的子窗体。通常，使用模态框的目的是用来显示来自一个单独的源的内容，而且可以在不离开父窗体的情况下有一些互动

```html
<div class="container">
    <h3>模态框实例</h3>
    <!-- 按钮：用于打开模态框 -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
        打开模态框
    </button>
    <!-- 模态框 -->
    <div class="modal fade" id="myModal">
        <!-- 通过添加 modal-sm 类来创建一个小模态框，modal-lg 类可以创建一个大模态框 -->
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <!-- 模态框头部 -->
                <div class="modal-header">
                    <h4 class="modal-title">模态框头部</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- 模态框主体 -->
                <div class="modal-body">
                    模态框内容..
                </div>
                <!-- 模态框底部 -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</div>
```

你也可以通过添加 modal-dialog-scrollable 到 modal-dialog 来创建一个允许滚动模态主体的可滚动模态。

### 旋转图标spinner

展示加载进度

```html
<button class="btn btn-primary" type="button" disabled>
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Loading...
</button>
<button class="btn btn-primary" type="button" disabled>
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    Loading...
</button>
```

bootstrap 类样式中的 mt mb ml mr mx my pt pb pl pr px py 含义
内边距（pading）外边距（margin）

m - 代表 margin
p - 代表 padding

t - 设置margin-top或padding-top
b - 设置margin-bottom或padding-bottom
l - 设置margin-left或padding-left
r - 设置margin-right或padding-right
x - 设置padding-left和padding-right或margin-left和margin-right
y - 设置padding-top和padding-bottom或margin-top和margin-bottom

空白 – 在元素的所有4个边上设置边距或填充

0 – 将边距或填充设置为0
1 – 将边距或填充设置为.25rem(如果font-size为16px则为4px)
2 – 将边距或填充设置为.5rem(如果字体大小为16px则为8px)
3 – 将边距或填充设置为1rem(如果字体大小为16px，则为16px)
4 – 将边距或填充设置为1.5rem(如果字体大小为16px，则为24px)
5 – 将边距或填充设置为3rem(如果font-size为16px则为48px)

mt-3 设置上边距3rem
