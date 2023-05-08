---
category:
  - Extension
tag:
  - Git
---

# Git

[Git视频教程](https://www.bilibili.com/video/BV1vy4y1s7k6/)

[Git官方教程](https://git-scm.com/book/zh/v2)

## Git 工作机制

- 版本控制系统（VCS）

集中式版本控制(svn)，只由中央服务器管理版本。其它大部分系统以文件变更列表的方式存储信息，将它们存储的信息看作是一组基本文件和每个文件随时间逐步累积的差异 （它们通常称作 **基于差异（delta-based）** 的版本控制）。

分布式版本控制(git)，远程库管理提交，本地git clone同时获得版本信息，版本控制在本地。Git 更像是把数据看作是对小型文件系统的一系列快照。 在 Git中，每当你提交更新或保存项目状态时，它基本上就会对当时的全部文件创建一个快照并保存这个快照的索引。为了效率，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 Git 对待数据更像是一个 **快照流**。

Git 用以计算校验和的机制叫做 SHA-1 散列（hash，哈希）。

- git init：初始化工作区
- 工作区：存放代码的区域
- git add：添加到暂存区
- 暂存区：临时存储
- git commit：提交本地库
- 本地库：历史版本(.git)
- git push：推送远程库
- 远程库：代码托管

代码托管中心

- 互联网：
  - Github
  - Gitee
- 局域网
  - Gitlab

可以通过以下命令查看所有的配置以及它们所在的文件：

```text
#$ git config --list
$ git config --list --show-origin 
...
file:F:/Git/etc/gitconfig       init.defaultbranch=master
file:C:/Users/KEEN/.gitconfig   user.name=XuChangeShine
file:C:/Users/KEEN/.gitconfig   user.email=XuChangeShine@163.com
file:C:/Users/KEEN/.gitconfig   http.sslverify=false
file:C:/Users/KEEN/.gitconfig   http.postbuffer=524288000
...
```

重复的变量名，这种情况下，Git 会使用它找到的每一个变量的最后一个配置。

## 基础指令

```text
$ git help
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
```

### 配置文件

win .gitconfig

git签名，和登录GitHub的账号没有任何关系

```ini
[user]
  name = XuChangeShine
  email = XuChangeShine@163.com
```

### GitBash

提供简易Linux环境，可以使用Linux命令

查看隐藏目录 `ll -a`

vim指令

清屏 `ctrl + l`

### 常用指令

- 初始化本地库 `git init`
- 查看本地库状态 `git status`

```text
On branch master #当前分支
No commits yet #还未提交
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        GitWork.docx
nothing added to commit but untracked files present (use "git add" to track)
```

- 添加文件到暂存区 `git add file/*`
- 对已暂存文件与最后一次提交的文件差异 `git diff --staged`

```text
$ git add hello.txt
warning: LF will be replaced by CRLF in hello.txt.
The file will have its original line endings in your working directory

$ git status
Changes to be committed:
  (use "git rm --cached <file>..." to unstage) #删除暂存某个文件new file
        new file:   hello.txt
```

- 删除暂存区文件 `git rm --cached file`
- 提交本地库 `git commit -m "version log"`

Git 提供了一个跳过使用暂存区域的方式， 只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把所有**已经跟踪过**的文件暂存起来一并提交，从而跳过 git add 步骤。

```text
#提交版本号，完整版本号前七位
[master (root-commit) 64dfad2] hello

$ git reflog #日志
64dfad2 (HEAD -> master) HEAD@{0}: commit (initial): hello

$ git log #详细日志
commit 64dfad220f11778724bdd239b305db66fbfa13fb (HEAD -> master)
Author: XuChangeShine <XuChangeShine@163.com>
Date:   Thu Apr 27 11:32:59 2023 +0800

    hello
```

修改暂存区文件

```text
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed) #暂存新版
  (use "git restore <file>..." to discard changes in working directory) #恢复之前版本，会丢弃这次修改
        modified:   hello.txt
#取消暂存某个文件（和前面git rm一样效果）
git reset HEAD <file>
git restore --staged <file>
```

- 版本重设 `git reset --hard 版本号id`

```text
$ git reflog
04740c0 (HEAD -> master) HEAD@{0}: reset: moving to 04740c0
75973b7 HEAD@{1}: commit: 3
04740c0 (HEAD -> master) HEAD@{2}: commit: sec
64dfad2 HEAD@{3}: commit (initial): hello
```

reset会修改HEAD的指向，但不会创建新的分支

--soft  – 暂存区和工作目录都不会被改变  
--mixed – 默认选项。暂存区和你指定的提交同步，但工作目录不受影响  
--hard  – 暂存区和工作目录都同步到你指定的提交  

一旦reset HEAD~xxx，HEAD就会指向历史commit，之后的commit其实还在，但看不到了

如果在此基础上有新的提交，就真的丢弃了HEAD之后的提交

重设后还能回到比 指定版本 新的 当前版本吗？可以

使用git reflog查看日志再git reset

### extension

- git rm
- git mv
- git commit --amend修补提交
- git tag 标签
- git rebase 变基  
可以使用 rebase 命令将提交到某一分支上的所有修改都移至另一分支上  
- git pick-cherry 优选基

## 分支branch

分支的底层也是指针的引用，链表和头插？目录树

使用分支可以并行推进多个功能的开发

- 查看当前分支 `git branch -v`

- 创建分支 `git brance 新分支`

- 切换分支 `git checkout 分支名`/`git switch 分支名`

### 合并分支merge

- 合并分支 `git merge 分支`

冲突：两个分支在同一个文件修改，必须人为决定

```text
Auto-merging hello.txt
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

冲突发生后会在代码里标注冲突

```text
<<<<<<< HEAD
实验冲突
=======
我是冲突
>>>>>>> master
手动修改合并，再添加暂存区

提交时哪怕暂存区只有一个文件也不能部分提交
$ git commit -m "conflict" hello.txt
在合并冲突时不能进行部分提交  
fatal: cannot do a partial commit during a merge.
```

## 远程协作

- push 推送本地代码到远程库
- clone 克隆远程代码到本地
- pull 拉取更新本地代码

- fork 复刻代码到另一个远程库

另一个远程库pull request原远程库，审核再合并

可以通过 `git remote show <alas>` 看到更多的信息，它会列出远程仓库的 URL 与跟踪分支的信息。

### Github

- 创建远程仓库别名 `git remote add 别名 远程库链接`（不起别名默认origin）

- 查看当前别名 `git remote -v`

- 推送本地库到远程仓库 `git push 别名 分支`

此时弹出登录github（凭据管理器）

- 拉取远程库到本地库 git pull (fetch与pull区别)

git fetch是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。

而git pull 则是将远程主机的最新内容拉下来后直接合并，即：**git pull = git fetch + git merge**，这样可能会产生冲突，需要手动解决。

- 克隆远程库到本地 `git clone 链接`

克隆会做如下操作：

1. 拉取代码
2. 初始化本地仓库
3. 创建别名，默认是origin

- 授权提交，github添加Collaborates，生成邀请地址

- pull request

- SSH 免密登录

ssh-keygen -t rsa -C "Comments"

### Gitee

### GitLab

## .gitignore

```text
target/
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
```

## 集成IDEA

VCS(Version Control Setting)

rebase和merge?

checkout切换分支

冲突合并界面

## 数据恢复大法

- 回退版本git reset

- 已经commit过的文件删除了 git status查看文件状态 git restore 文件名

- 添加到暂存区的**新文件**手动删除了，提交也不会出现那个文件，但是切换分区重新会出现

- 重命名一个文件，然后新建一个同名文件
