import{_ as s,Y as a,Z as t,$ as e,a0 as i,a1 as l,a2 as d,E as r}from"./framework-945e1ba3.js";const c={},o=e("h1",{id:"git",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#git","aria-hidden":"true"},"#"),i(" Git")],-1),u={href:"https://www.bilibili.com/video/BV1vy4y1s7k6/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://git-scm.com/book/zh/v2",target:"_blank",rel:"noopener noreferrer"},m=d(`<h2 id="git-工作机制" tabindex="-1"><a class="header-anchor" href="#git-工作机制" aria-hidden="true">#</a> Git 工作机制</h2><ul><li>版本控制系统（VCS）</li></ul><p>集中式版本控制(svn)，只由中央服务器管理版本。其它大部分系统以文件变更列表的方式存储信息，将它们存储的信息看作是一组基本文件和每个文件随时间逐步累积的差异 （它们通常称作 <strong>基于差异（delta-based）</strong> 的版本控制）。</p><p>分布式版本控制(git)，远程库管理提交，本地git clone同时获得版本信息，版本控制在本地。Git 更像是把数据看作是对小型文件系统的一系列快照。 在 Git中，每当你提交更新或保存项目状态时，它基本上就会对当时的全部文件创建一个快照并保存这个快照的索引。为了效率，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 Git 对待数据更像是一个 <strong>快照流</strong>。</p><p>Git 用以计算校验和的机制叫做 SHA-1 散列（hash，哈希）。</p><ul><li>git init：初始化工作区</li><li>工作区：存放代码的区域</li><li>git add：添加到暂存区</li><li>暂存区：临时存储</li><li>git commit：提交本地库</li><li>本地库：历史版本(.git)</li><li>git push：推送远程库</li><li>远程库：代码托管</li></ul><p>代码托管中心</p><ul><li>互联网： <ul><li>Github</li><li>Gitee</li></ul></li><li>局域网 <ul><li>Gitlab</li></ul></li></ul><p>可以通过以下命令查看所有的配置以及它们所在的文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#$ git config --list
$ git config --list --show-origin 
...
file:F:/Git/etc/gitconfig       init.defaultbranch=master
file:C:/Users/KEEN/.gitconfig   user.name=XuChangeShine
file:C:/Users/KEEN/.gitconfig   user.email=XuChangeShine@163.com
file:C:/Users/KEEN/.gitconfig   http.sslverify=false
file:C:/Users/KEEN/.gitconfig   http.postbuffer=524288000
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重复的变量名，这种情况下，Git 会使用它找到的每一个变量的最后一个配置。</p><h2 id="基础指令" tabindex="-1"><a class="header-anchor" href="#基础指令" aria-hidden="true">#</a> 基础指令</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ git help
#初始化工作区  
start a working area (see also: git help tutorial)
  clone     Clone a repository into a new directory
  init      Create an empty Git repository or reinitialize an existing one

#操作当前改变  
work on the current change (see also: git help everyday)
  add       Add file contents to the index
  mv        Move or rename a file, a directory, or a symlink
  restore   Restore working tree files
  rm        Remove files from the working tree and from the index

#检查历史和状态  
examine the history and state (see also: git help revisions)
  bisect    Use binary search to find the commit that introduced a bug
  diff      Show changes between commits, commit and working tree, etc
  grep      Print lines matching a pattern
  log       Show commit logs
  show      Show various types of objects
  status    Show the working tree status

#成长、标记和调整你的共同历史  
grow, mark and tweak your common history
  branch    List, create, or delete branches
  commit    Record changes to the repository
  merge     Join two or more development histories together
  rebase    Reapply commits on top of another base tip
  reset     Reset current HEAD to the specified state
  switch    Switch branches
  tag       Create, list, delete or verify a tag object signed with GPG

#合作  
collaborate (see also: git help workflows)
  fetch     Download objects and refs from another repository
  pull      Fetch from and integrate with another repository or a local branch
  push      Update remote refs along with associated objects
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3><p>win .gitconfig</p><p>git签名，和登录GitHub的账号没有任何关系</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">user</span><span class="token punctuation">]</span></span>
  <span class="token key attr-name">name</span> <span class="token punctuation">=</span> <span class="token value attr-value">XuChangeShine</span>
  <span class="token key attr-name">email</span> <span class="token punctuation">=</span> <span class="token value attr-value">XuChangeShine@163.com</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gitbash" tabindex="-1"><a class="header-anchor" href="#gitbash" aria-hidden="true">#</a> GitBash</h3><p>提供简易Linux环境，可以使用Linux命令</p><p>查看隐藏目录 <code>ll -a</code></p><p>vim指令</p><p>清屏 <code>ctrl + l</code></p><h3 id="常用指令" tabindex="-1"><a class="header-anchor" href="#常用指令" aria-hidden="true">#</a> 常用指令</h3><ul><li>初始化本地库 <code>git init</code></li><li>查看本地库状态 <code>git status</code></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>On branch master #当前分支
No commits yet #还未提交
Untracked files:
  (use &quot;git add &lt;file&gt;...&quot; to include in what will be committed)
        GitWork.docx
nothing added to commit but untracked files present (use &quot;git add&quot; to track)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>添加文件到暂存区 <code>git add file/*</code></li><li>对已暂存文件与最后一次提交的文件差异 <code>git diff --staged</code></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ git add hello.txt
warning: LF will be replaced by CRLF in hello.txt.
The file will have its original line endings in your working directory

$ git status
Changes to be committed:
  (use &quot;git rm --cached &lt;file&gt;...&quot; to unstage) #删除暂存某个文件new file
        new file:   hello.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>删除暂存区文件 <code>git rm --cached file</code></li><li>提交本地库 <code>git commit -m &quot;version log&quot;</code></li></ul><p>Git 提供了一个跳过使用暂存区域的方式， 只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把所有<strong>已经跟踪过</strong>的文件暂存起来一并提交，从而跳过 git add 步骤。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#提交版本号，完整版本号前七位
[master (root-commit) 64dfad2] hello

$ git reflog #日志
64dfad2 (HEAD -&gt; master) HEAD@{0}: commit (initial): hello

$ git log #详细日志
commit 64dfad220f11778724bdd239b305db66fbfa13fb (HEAD -&gt; master)
Author: XuChangeShine &lt;XuChangeShine@163.com&gt;
Date:   Thu Apr 27 11:32:59 2023 +0800

    hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改暂存区文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Changes not staged for commit:
  (use &quot;git add &lt;file&gt;...&quot; to update what will be committed) #暂存新版
  (use &quot;git restore &lt;file&gt;...&quot; to discard changes in working directory) #恢复之前版本，会丢弃这次修改
        modified:   hello.txt
#取消暂存某个文件（和前面git rm一样效果）
git reset HEAD &lt;file&gt;
git restore --staged &lt;file&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>版本重设 <code>git reset --hard 版本号id</code></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ git reflog
04740c0 (HEAD -&gt; master) HEAD@{0}: reset: moving to 04740c0
75973b7 HEAD@{1}: commit: 3
04740c0 (HEAD -&gt; master) HEAD@{2}: commit: sec
64dfad2 HEAD@{3}: commit (initial): hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>reset会修改HEAD的指向，但不会创建新的分支</p><p>--soft – 暂存区和工作目录都不会被改变<br> --mixed – 默认选项。暂存区和你指定的提交同步，但工作目录不受影响<br> --hard – 暂存区和工作目录都同步到你指定的提交</p><p>一旦reset HEAD~xxx，HEAD就会指向历史commit，之后的commit其实还在，但看不到了</p><p>如果在此基础上有新的提交，就真的丢弃了HEAD之后的提交</p><p>重设后还能回到比 指定版本 新的 当前版本吗？可以</p><p>使用git reflog查看日志再git reset</p><h3 id="extension" tabindex="-1"><a class="header-anchor" href="#extension" aria-hidden="true">#</a> extension</h3><ul><li>git rm</li><li>git mv</li><li>git commit --amend修补提交</li><li>git tag 标签</li><li>git rebase 变基<br> 可以使用 rebase 命令将提交到某一分支上的所有修改都移至另一分支上</li><li>git pick-cherry 优选基</li></ul><h2 id="分支branch" tabindex="-1"><a class="header-anchor" href="#分支branch" aria-hidden="true">#</a> 分支branch</h2><p>分支的底层也是指针的引用，链表和头插？目录树</p><p>使用分支可以并行推进多个功能的开发</p><ul><li><p>查看当前分支 <code>git branch -v</code></p></li><li><p>创建分支 <code>git brance 新分支</code></p></li><li><p>切换分支 <code>git checkout 分支名</code>/<code>git switch 分支名</code></p></li></ul><h3 id="合并分支merge" tabindex="-1"><a class="header-anchor" href="#合并分支merge" aria-hidden="true">#</a> 合并分支merge</h3><ul><li>合并分支 <code>git merge 分支</code></li></ul><p>冲突：两个分支在同一个文件修改，必须人为决定</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Auto-merging hello.txt
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>冲突发生后会在代码里标注冲突</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
实验冲突
=======
我是冲突
&gt;&gt;&gt;&gt;&gt;&gt;&gt; master
手动修改合并，再添加暂存区

提交时哪怕暂存区只有一个文件也不能部分提交
$ git commit -m &quot;conflict&quot; hello.txt
在合并冲突时不能进行部分提交  
fatal: cannot do a partial commit during a merge.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="远程协作" tabindex="-1"><a class="header-anchor" href="#远程协作" aria-hidden="true">#</a> 远程协作</h2><ul><li><p>push 推送本地代码到远程库</p></li><li><p>clone 克隆远程代码到本地</p></li><li><p>pull 拉取更新本地代码</p></li><li><p>fork 复刻代码到另一个远程库</p></li></ul><p>另一个远程库pull request原远程库，审核再合并</p><p>可以通过 <code>git remote show &lt;alas&gt;</code> 看到更多的信息，它会列出远程仓库的 URL 与跟踪分支的信息。</p><h3 id="github" tabindex="-1"><a class="header-anchor" href="#github" aria-hidden="true">#</a> Github</h3><ul><li><p>创建远程仓库别名 <code>git remote add 别名 远程库链接</code>（不起别名默认origin）</p></li><li><p>查看当前别名 <code>git remote -v</code></p></li><li><p>推送本地库到远程仓库 <code>git push 别名 分支</code></p></li></ul><p>此时弹出登录github（凭据管理器）</p><ul><li>拉取远程库到本地库 git pull (fetch与pull区别)</li></ul><p>git fetch是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。</p><p>而git pull 则是将远程主机的最新内容拉下来后直接合并，即：<strong>git pull = git fetch + git merge</strong>，这样可能会产生冲突，需要手动解决。</p><ul><li>克隆远程库到本地 <code>git clone 链接</code></li></ul><p>克隆会做如下操作：</p><ol><li>拉取代码</li><li>初始化本地仓库</li><li>创建别名，默认是origin</li></ol><ul><li><p>授权提交，github添加Collaborates，生成邀请地址</p></li><li><p>pull request</p></li><li><p>SSH 免密登录</p></li></ul><p>ssh-keygen -t rsa -C &quot;Comments&quot;</p><h3 id="gitee" tabindex="-1"><a class="header-anchor" href="#gitee" aria-hidden="true">#</a> Gitee</h3><h3 id="gitlab" tabindex="-1"><a class="header-anchor" href="#gitlab" aria-hidden="true">#</a> GitLab</h3><h2 id="gitignore" tabindex="-1"><a class="header-anchor" href="#gitignore" aria-hidden="true">#</a> .gitignore</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>target/
.mvn/
!**/src/main/**/target/
!**/src/test/**/target/
mvnw
mvnw.cmd

### IntelliJ IDEA ###
.idea/
*.iws
*.iml
*.ipr

### Eclipse ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/
build/
!**/src/main/**/build/
!**/src/test/**/build/

### VS Code ###
.vscode/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集成idea" tabindex="-1"><a class="header-anchor" href="#集成idea" aria-hidden="true">#</a> 集成IDEA</h2><p>VCS(Version Control Setting)</p><p>rebase和merge?</p><p>checkout切换分支</p><p>冲突合并界面</p><h2 id="数据恢复大法" tabindex="-1"><a class="header-anchor" href="#数据恢复大法" aria-hidden="true">#</a> 数据恢复大法</h2><ul><li><p>回退版本git reset</p></li><li><p>已经commit过的文件删除了 git status查看文件状态 git restore 文件名</p></li><li><p>添加到暂存区的<strong>新文件</strong>手动删除了，提交也不会出现那个文件，但是切换分区重新会出现</p></li><li><p>重命名一个文件，然后新建一个同名文件</p></li></ul>`,78);function g(b,h){const n=r("ExternalLinkIcon");return a(),t("div",null,[o,e("p",null,[e("a",u,[i("Git视频教程"),l(n)])]),e("p",null,[e("a",v,[i("Git官方教程"),l(n)])]),m])}const f=s(c,[["render",g],["__file","Git.html.vue"]]);export{f as default};
