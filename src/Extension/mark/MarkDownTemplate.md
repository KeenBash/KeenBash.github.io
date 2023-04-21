# MarkDown示例代码

[Markdown](http://www.markdown.cn/)

- [MarkDown示例代码](#markdown示例代码)
  - [Markdown All in One](#markdown-all-in-one)
    - [快捷键](#快捷键)
    - [代码提示](#代码提示)
  - [Markdow语法](#markdow语法)
    - [标题](#标题)
    - [强调](#强调)
    - [列表](#列表)
    - [图片](#图片)
    - [链接](#链接)
    - [引用](#引用)
    - [任务列表](#任务列表)
    - [表格](#表格)
    - [emoji](#emoji)
    - [数学](#数学)
    - [分割线](#分割线)

## Markdown All in One

### 快捷键

命令面板 `ctrl + shift + p`

Vscode代码提示键 `ctrl + 空格`

格式化代码 `shift + alt + f`

**粗体** `ctrl + b`

*斜体* `ctrl + i`

~~删除线~~ `alt + s`

标题级别增加 `ctrl + shift + ]`

标题级别减少 `ctrl + shift + [`

切换数学环境 `ctrl + m`

表格|以及对齐|方式
:---|:---:|---:
左对齐|居中对齐|右对齐

### 代码提示

在路径修改了简化了默认提示  
`F:\Microsoft VS Code\resources\app\extensions\markdown-basics\snippets\markdown.code-snippets`

单行代码 `code`

代码块 `codeblock`

链接 `link`

图片 `image`

标题 `h1`~`h6`

有序列表 `olist`

无序列表 `ulist`

删除线 `del`

粗体 `b`

斜体 `i`

分割线 `rule`

## Markdow语法  

### 标题

```markdown
# 这是 <h1> 一级标题 </h1> 
## 这是 <h2> 二级标题 </h2> 
### 这是 <h3> 三级标题 </h3> 
#### 这是 <h4> 四级标题 </h4> 
##### 这是 <h5> 五级标题 </h5> 
###### 这是 <h6> 六级标题 </h6> 
```

### 强调

```markdown
*这会是 斜体 的文字*
_这会是 斜体 的文字_

**这会是 粗体 的文字**
__这会是 粗体 的文字__

_你也 **组合** 这些符号_

```

~~这个文字将会被横线删除~~

<u>这是一条下划线</u>

<small>这里是较小的文字</small>

### 列表

无序列表

- Item 1
- Item 2
  - Item a
  - Item b

有序列表

1. Item 1
2. Item 2
   1. Item 2a
3. Item 3
   1. Item 3a
   2. Item 3b

### 图片

原生方式

![可莉](https://s2.loli.net/2022/12/01/o9HvUtPspRJa4Db.jpg)

html方式，可以调整大小和居中方式

<img src="https://s2.loli.net/2022/12/01/o9HvUtPspRJa4Db.jpg" width = "300" alt="可莉" align=center />

### 链接

<https://github.com>

[GitHub](https://github.com)

### 引用

正如 Kanye West 所说：

> We're living the future so
> the present is our past.

### 任务列表

- [x] @mentions, #refs, [baidu](http://www.baidu.com), **formatting**, and tags supported
- [ ] this is an incomplete item

### 表格

表格对齐控制 `:---|:---:|---:`

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column

### emoji

windows10 打开emoji `win + ;`😀😂

不过win带的emoji和代码写的不太一样

[:emoji:代码参考](https://www.webfx.com/tools/emoji-cheat-sheet/)

:smile:
:shit:
:cry:

### 数学

[数学公式参考](https://blog.csdn.net/Liu_PiPiPi/article/details/121613743)

$$
\left[
\begin{matrix}
1 & 2 & 3\\
4 & 5 & 6 \\
7 & 8 & 9
\end{matrix}
\right]
\tag{3}
$$

### 分割线

---
