---
category:
  - Data
tag:
  - MySql
---

# MySql

[在 Ubuntu 20.04 上安装 MySQL](https://blog.csdn.net/wavehaha/article/details/114730222)

Ubuntu的mysql密码：12345678

[MYSQL设置密码时显示Failed!](https://blog.csdn.net/weixin_42189863/article/details/125113978)

远程连接mysql数据库

[解决Navicat 连接mysql报错：Can‘t connect to MYSQL server on “ip address“(10061)](https://blog.csdn.net/weixin_44843859/article/details/109313087)

借助navicat保存sql文件转储数据库

useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai

```properties
spring.datasource.url=jdbc:mysql://192.168.73.130:3306/security_test
spring.datasource.username=root
spring.datasource.password=12345678
```

## 数据库理论

- 码：码就是能唯一标识实体的属性，对应表中的列。
- 候选码：若关系中的某一属性或属性组的值能唯一的标识一个元组，而其它属性和子集都不能再标识，则称该属性组为候选码。
- 主码: 主码是从候选码中选出来的。
- 主属性：候选码中出现过的属性称为主属性。
- 非主属性：不包含在任何一个候选码中的属性称为非主属性。

### ER图

ER 图全称是 Entity Relationship Diagram（实体联系图）

ER 图由下面 3 个要素组成：

- 实体 ：通常是现实世界的业务对象，实体使用矩形框表示。
- 属性 ：即某个实体拥有的属性，属性使用椭圆形表示。
- 联系 ：即实体与实体之间的关系，联系使用菱形框表示。

### 范式

- 1NF(第一范式)：属性不可再分。
- 2NF(第二范式)：1NF 的基础之上，消除了非主属性对于码的部分依赖。
- 3NF(第三范式)：3NF 在 2NF 的基础之上，消除了非主属性对于码的传递依赖 。

### DML DDL DQL

- DML 数据库操纵语言（Data Manipulation Language），是指对数据库中表记录的操作，主要包括表记录的插入、更新、删除和查询
- DDL 数据定义语言（Data Definition Language），对数据库内部的对象进行创建、删除、修改的操作语言。涉及到表的定义、结构的修改，
- 另外，由于select不会对表进行破坏，所以有的地方也会把select单独区分开叫做数据库查询语言 DQL（Data Query Language）。

### 数据库设计

1. 需求分析: 分析用户的需求，包括数据、功能和性能需求。
2. 概念结构设计: 主要采用 E-R 模型进行设计，包括画 E-R 图。
3. 逻辑结构设计: 通过将 E-R 图转换成表，实现从 E-R 模型到关系模型的转换。
4. 物理结构设计: 主要是为所设计的数据库选择合适的存储结构和存取路径。
5. 数据库实施: 包括编程、测试和试运行。
6. 数据库的运行和维护: 系统的运行与数据库的日常维护。

## MySQL基础

- 字符集

utf8mb3与utf8mb4

- 交集并集差集

利用join

### 事务

- A atomicity 原子性 事务要么完成，要么不完成
- C consistency 一致性 事务执行前后数据保持一致
- I isolation 隔离性 事务的执行不受外部影响
- D durability 持久性 事务一旦提交发生的修改就是永久存储

只有保证了事务的持久性、原子性、隔离性之后，一致性才能得到保障。也就是说 A、I、D 是手段，C 是目的！

并发事务问题

- 脏读dirty read 一个事务读取到另一个事务还没有提交的修改
- 丢失修改lost to modify
- 不可重复读unrepeatable read 一个事务先后读取同一个数据的结果不同
- 幻读phantom read 没有某行数据，再执行插入时提示已经存在此行数据，但是当select查询时又无法查到数据。因为重复读的前后一致导致的幻读。

事务的隔离级别

- 读未提交 read uncommitted
- 读已提交 read committed
- 可重复读 repeatable read
- 串行化 serializable

## MySQL进阶

[MySQL学习视频](https://www.bilibili.com/video/BV1Kr4y1i7ru)

MySQL基础架构

![图 2](https://s2.loli.net/2023/05/02/xpLMbKJz8Ci4T7e.png)  

连接层
服务层
引擎层 插件式架构，存储引擎是基于表的，而不是数据库。
存储层

### 存储引擎

![图 3](https://s2.loli.net/2023/05/02/YBjg7tZV1sWzTRq.png)  

可以通过 `show engines` 命令来查看 MySQL 支持的所有存储引擎。

MySQL 5.5.5 之前，MyISAM 是 MySQL 的默认存储引擎。5.5.5 版本之后，InnoDB 是 MySQL 的默认存储引擎。

创建表的时候指定引擎。

- InnoDB: 事务、外键、行级锁（支持聚集索引）

存储文件结构  
.ibd，表结构、数据和索引  
.frm 表结构的文件（mysql8中废弃，表结构合并在.ibd文件中）。  

ibd2sdi，可以将ibd文件中的冗余存储的sdi信息提取出来，并以json的格式输出到终端

TableSpace(表空间) --> Segment(段) --> Extent(区 1M) --> Page(页 16K) -- Row(行)

适用场景：高一致性，多更新和插入

- MyISAM: 不支持事务、外键，只有表锁（非聚集索引）

最大的问题就是异常崩溃后无法安全恢复数据？innoDB有 redo log

存储文件结构  
.myd 表数据  
.myi 索引  
.frm 表结构的文件（mysql8中废弃，出现了新的.sdi（json）文件替代）  

适用场景：读和插入为主

### 索引

索引的优缺点

优点：使用索引可以大大加快数据的检索速度。通过创建唯一性索引，可以保证数据库表中每一行数据的唯一性。

缺点：创建索引和维护索引需要耗费许多时间。当对表中的数据进行增删改的时候，如果数据有索引，那么索引也需要动态的修改，会降低 SQL 执行效率。索引需要使用物理文件存储，也会耗费一定空间。

#### 索引方案

B树（多路平衡查找树）

B树和B+树的区别

B树的所有节点都会存储对应数据，查找是不稳定的。而B+树非叶子节点只做索引，而叶子节点才存放对应数据，查找是稳定的。

B树的每一个节点都包含key和value，因此经常访问的元素可能离根节点更近，因此访问也更迅速。由于B+树在内部节点上不包含数据信息，因此在内存页中能够存放更多的key。 B+树的叶子结点都是相连的，便于区间查找和搜索。

MySQL中的B+树叶子节点之间是双向链表连接，提高区间访问的效率

- MyISAM

[MyISAM中的索引方案](https://blog.csdn.net/glenshappy/article/details/127414701)

MyISAM引擎使用B+Tree作为索引结构，叶子节点的data域存放的是**数据记录的地址**。

![图 4](https://s2.loli.net/2023/05/03/MCaqK91Q6z5iUF7.png)  

将表中的记录按照记录的插入顺序单独存储在一个文件中，称之为数据文件。这个文件并不划分为若干个数据页，有多少记录就往这个文件中写入。

使用MyISAM存储引擎的表会把索引信息存储到一个单独的索引文件中。MyISAM会单独为表的主键创建一个索引，只不过在索引的叶子节点中存储的不是完整的用户记录，而是**主键值＋数据记录地址**的组合。

根据数据记录地址再从表数据文件中查找。

非聚簇索引一定回表查询吗？在覆盖索引的情况下不需要回表查询了

- InnoDB

聚集索引：必须存在，并且只有一个，根据主键生成，如果没有主键，则使用唯一且不允许存在 null 值的一列，否则，会自动生成一个 6Byte 的自增主键索引。叶子节点存储完整行数据。

二级索引：根据某一列或者多列建立索引，叶子节点存放主键id，如果需要的数据满足索引覆盖，那么不需要再回表查询。否则，需要更加查找出来的主键id再回表查询。创建联合索引注意顺序（最左前缀法则）

#### 索引失效

[索引失效场景](https://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247503394&idx=1&sn=6e5b7b2c9bd9002a4b2dfa69273069b3)

主要是在联合索引中

1.跳过列，根据最左前缀法则，如果跳过某一列，索引将部分失效，也就是后面查询的列无法利用索引。在where子句的and顺序不影响，但必须存在。比如（a,b,c)中，只有a是有序的，bc都是无序的。

2.范围查询，大于小于号，比如`and age > 0 and status = '0'`，status有联合索引，但是因为大于号导致后面不走索引，可以修改为大于等于。因为对于联合索引，是先按照 a 字段的值排序，然后在 a 字段的值相同的情况下，再按照 b 字段的值进行排序。因为有等于可以迅速确定扫描的起始位置一定是先等于的情况。

3.索引列运算，不要在索引列上进行运算，否则会导致索引失效。函数，8.0以后可以根据函数运算结果建立函数索引。算术运算。

4.字符串不加引号，如果索引字段是字符串类型，但是在条件查询中，输入的参数是整型的话，你会在执行计划的结果发现这条语句会走全表扫描(因为会执行对字符串类型Cast为整数类型操作)。但是如果索引字段是整型类型，查询条件中的输入参数即使是字符串，是不会导致索引失效，还是可以走索引扫描。(对where = 后字符串cast为整型)。MySQL 在遇到数字字符串和数字比较的时候，会自动把字符串转为数字，然后再进行比较。

5.模糊查询，以%开头查询会失效，但如果是以%结尾不会失效

6.or条件查询，前一个列有索引，后一个没有索引，也不会用到索引

7.数据分布的影响，MySQL优化器自动评估，可以认为use建议，force强制，ignore忽略

#### 使用索引

1.覆盖索引，需要的数据列能在索引中全找到，这样就不用回表查询

2.前缀索引，根据前缀建立索引

3.单列索引和联合索引建议联合索引

### SQL性能分析

- SQL指令执行频率

```MySQL
-- GLOBAL/SESSION 7个'_'
-- 因为连接池的关系，使用可视化工具查询1次不一定是增加1
SHOW GLOBAL STATUS LIKE 'Com_______';
```

- 慢查询日志

[慢查询日志](https://zhuanlan.zhihu.com/p/368269559)

记录所有执行时间超过指定时间的SQL语句，默认没有开启。

<https://serverfault.com/questions/1021349/unknown-variable-slow-query-log-1>

```MySQL
SHOW VARIABLES LIKE 'slow_query_log%';
--> slow_query_log  OFF

-- 永久开启，重启也不会失效
-- Linux下一般会放在/etc/my.cnf，/etc/mysql/my.cnf
-- sudo vim my.cnf 添加
[mysqld]
# 慢查询日志
slow_query_log=1
long_query_time=1
# log_queries_not_using_indexes=1 # 记录没使用索引的查询
-- 重启service mysql restart
-- 日志位置/var/lib/mysql/下
```

- Explain执行计划

直接在sql语句之前添加explain/desc

各列属性

![图 5](https://s2.loli.net/2023/05/03/6zvDV1dJU4ygeQ7.png)  

### SQL优化

- 插入优化

批量插入数据

手动提交事务，默认是一条语句一个事务

主键按顺序插入

大批量数据使用load

- 主键优化

页分裂和页合并

尽量降低主键长度

- order by优化

- group by优化

- limit优化

覆盖索引加子查询

- count优化

MyISAM会存储表行，而InnoDB需要一行一行计数

- update优化

无索引会加表锁

### 锁

### MVCC 多版本并发控制
