import{_ as s,Y as r,Z as t,$ as e,a0 as a,a1 as i,a2 as n,E as d}from"./framework-945e1ba3.js";const p={},o=e("h1",{id:"mysql",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#mysql","aria-hidden":"true"},"#"),a(" MySql")],-1),c={href:"https://blog.csdn.net/wavehaha/article/details/114730222",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"Ubuntu的mysql密码：12345678",-1),h={href:"https://blog.csdn.net/weixin_42189863/article/details/125113978",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,"远程连接mysql数据库",-1),b={href:"https://blog.csdn.net/weixin_44843859/article/details/109313087",target:"_blank",rel:"noopener noreferrer"},_=n(`<p>借助navicat保存sql文件转储数据库</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.datasource.url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://192.168.73.130:3306/security_test</span>
<span class="token key attr-name">spring.datasource.username</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token key attr-name">spring.datasource.password</span><span class="token punctuation">=</span><span class="token value attr-value">12345678</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据库理论" tabindex="-1"><a class="header-anchor" href="#数据库理论" aria-hidden="true">#</a> 数据库理论</h2><ul><li>码：码就是能唯一标识实体的属性，对应表中的列。</li><li>候选码：若关系中的某一属性或属性组的值能唯一的标识一个元组，而其它属性和子集都不能再标识，则称该属性组为候选码。</li><li>主码: 主码是从候选码中选出来的。</li><li>主属性：候选码中出现过的属性称为主属性。</li><li>非主属性：不包含在任何一个候选码中的属性称为非主属性。</li></ul><h3 id="er图" tabindex="-1"><a class="header-anchor" href="#er图" aria-hidden="true">#</a> ER图</h3><p>ER 图全称是 Entity Relationship Diagram（实体联系图）</p><p>ER 图由下面 3 个要素组成：</p><ul><li>实体 ：通常是现实世界的业务对象，实体使用矩形框表示。</li><li>属性 ：即某个实体拥有的属性，属性使用椭圆形表示。</li><li>联系 ：即实体与实体之间的关系，联系使用菱形框表示。</li></ul><h3 id="范式" tabindex="-1"><a class="header-anchor" href="#范式" aria-hidden="true">#</a> 范式</h3><ul><li>1NF(第一范式)：属性不可再分。</li><li>2NF(第二范式)：1NF 的基础之上，消除了非主属性对于码的部分依赖。</li><li>3NF(第三范式)：3NF 在 2NF 的基础之上，消除了非主属性对于码的传递依赖 。</li></ul><h3 id="dml-ddl-dql" tabindex="-1"><a class="header-anchor" href="#dml-ddl-dql" aria-hidden="true">#</a> DML DDL DQL</h3><ul><li>DML 数据库操纵语言（Data Manipulation Language），是指对数据库中表记录的操作，主要包括表记录的插入、更新、删除和查询</li><li>DDL 数据定义语言（Data Definition Language），对数据库内部的对象进行创建、删除、修改的操作语言。涉及到表的定义、结构的修改，</li><li>另外，由于select不会对表进行破坏，所以有的地方也会把select单独区分开叫做数据库查询语言 DQL（Data Query Language）。</li></ul><h3 id="数据库设计" tabindex="-1"><a class="header-anchor" href="#数据库设计" aria-hidden="true">#</a> 数据库设计</h3><ol><li>需求分析: 分析用户的需求，包括数据、功能和性能需求。</li><li>概念结构设计: 主要采用 E-R 模型进行设计，包括画 E-R 图。</li><li>逻辑结构设计: 通过将 E-R 图转换成表，实现从 E-R 模型到关系模型的转换。</li><li>物理结构设计: 主要是为所设计的数据库选择合适的存储结构和存取路径。</li><li>数据库实施: 包括编程、测试和试运行。</li><li>数据库的运行和维护: 系统的运行与数据库的日常维护。</li></ol><h2 id="mysql基础" tabindex="-1"><a class="header-anchor" href="#mysql基础" aria-hidden="true">#</a> MySQL基础</h2><ul><li>字符集</li></ul><p>utf8mb3与utf8mb4</p><ul><li>交集并集差集</li></ul><p>利用join</p><h3 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h3><ul><li>A atomicity 原子性 事务要么完成，要么不完成</li><li>C consistency 一致性 事务执行前后数据保持一致</li><li>I isolation 隔离性 事务的执行不受外部影响</li><li>D durability 持久性 事务一旦提交发生的修改就是永久存储</li></ul><p>只有保证了事务的持久性、原子性、隔离性之后，一致性才能得到保障。也就是说 A、I、D 是手段，C 是目的！</p><p>并发事务问题</p><ul><li>脏读dirty read 一个事务读取到另一个事务还没有提交的修改</li><li>丢失修改lost to modify</li><li>不可重复读unrepeatable read 一个事务先后读取同一个数据的结果不同</li><li>幻读phantom read 没有某行数据，再执行插入时提示已经存在此行数据，但是当select查询时又无法查到数据。因为重复读的前后一致导致的幻读。</li></ul><p>事务的隔离级别</p><ul><li>读未提交 read uncommitted</li><li>读已提交 ream committed</li><li>可重复读 repeatable read</li><li>串行化 serializable</li></ul><h2 id="mysql进阶" tabindex="-1"><a class="header-anchor" href="#mysql进阶" aria-hidden="true">#</a> MySQL进阶</h2>`,27),y={href:"https://www.bilibili.com/video/BV1Kr4y1i7ru",target:"_blank",rel:"noopener noreferrer"},v=n('<p>MySQL基础架构</p><p><img src="https://s2.loli.net/2023/05/02/xpLMbKJz8Ci4T7e.png" alt="图 2" loading="lazy"></p><p>连接层 服务层 引擎层 插件式架构，存储引擎是基于表的，而不是数据库。 存储层</p><h3 id="存储引擎" tabindex="-1"><a class="header-anchor" href="#存储引擎" aria-hidden="true">#</a> 存储引擎</h3><p><img src="https://s2.loli.net/2023/05/02/YBjg7tZV1sWzTRq.png" alt="图 3" loading="lazy"></p><p>可以通过 <code>show engines</code> 命令来查看 MySQL 支持的所有存储引擎。</p><p>MySQL 5.5.5 之前，MyISAM 是 MySQL 的默认存储引擎。5.5.5 版本之后，InnoDB 是 MySQL 的默认存储引擎。</p><p>创建表的时候指定引擎。</p><ul><li>InnoDB: 事务、外键、行级锁（支持聚集索引）</li></ul><p>存储文件结构 .ibd，表结构、数据和索引 .frm 表结构的文件（mysql8中废弃，表结构合并在.ibd文件中）。</p><p>ibd2sdi，可以将ibd文件中的冗余存储的sdi信息提取出来，并以json的格式输出到终端</p><p>TableSpace(表空间) --&gt; Segment(段) --&gt; Extent(区 1M) --&gt; Page(页 16K) -- Row(行)</p><p>适用场景：高一致性，多更新和插入</p><ul><li>MyISAM: 不支持事务、外键，只有表锁（非聚集索引）</li></ul><p>最大的问题就是异常崩溃后无法安全恢复数据？innoDB有 redo log</p><p>存储文件结构 .myd 表数据 .myi 索引 .frm 表结构的文件（mysql8中废弃，出现了新的.sdi（json）文件替代）</p><p>适用场景：读和插入为主</p><h3 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h3><p>索引的优缺点</p><p>优点：使用索引可以大大加快数据的检索速度。通过创建唯一性索引，可以保证数据库表中每一行数据的唯一性。</p><p>缺点：创建索引和维护索引需要耗费许多时间。当对表中的数据进行增删改的时候，如果数据有索引，那么索引也需要动态的修改，会降低 SQL 执行效率。索引需要使用物理文件存储，也会耗费一定空间。</p><h4 id="索引方案" tabindex="-1"><a class="header-anchor" href="#索引方案" aria-hidden="true">#</a> 索引方案</h4><p>B树（多路平衡查找树）</p><p>B树和B+树的区别</p><p>B树的所有节点都会存储对应数据，查找是不稳定的。而B+树非叶子节点只做索引，而叶子节点才存放对应数据，查找是稳定的。</p><p>B树的每一个节点都包含key和value，因此经常访问的元素可能离根节点更近，因此访问也更迅速。由于B+树在内部节点上不包含数据信息，因此在内存页中能够存放更多的key。 B+树的叶子结点都是相连的，便于区间查找和搜索。</p><p>MySQL中的B+树叶子节点之间是双向链表连接，提高区间访问的效率</p><ul><li>MyISAM</li></ul>',28),g={href:"https://blog.csdn.net/glenshappy/article/details/127414701",target:"_blank",rel:"noopener noreferrer"},f=n('<p>MyISAM引擎使用B+Tree作为索引结构，叶子节点的data域存放的是<strong>数据记录的地址</strong>。</p><p><img src="https://s2.loli.net/2023/05/03/MCaqK91Q6z5iUF7.png" alt="图 4" loading="lazy"></p><p>将表中的记录按照记录的插入顺序单独存储在一个文件中，称之为数据文件。这个文件并不划分为若干个数据页，有多少记录就往这个文件中写入。</p><p>使用MyISAM存储引擎的表会把索引信息存储到一个单独的索引文件中。MyISAM会单独为表的主键创建一个索引，只不过在索引的叶子节点中存储的不是完整的用户记录，而是<strong>主键值＋数据记录地址</strong>的组合。</p><p>根据数据记录地址再从表数据文件中查找。</p><p>非聚簇索引一定回表查询吗？在覆盖索引的情况下不需要回表查询了</p><ul><li>InnoDB</li></ul><p>聚集索引：必须存在，并且只有一个，根据主键生成，如果没有主键，则使用唯一且不允许存在 null 值的一列，否则，会自动生成一个 6Byte 的自增主键索引。叶子节点存储完整行数据。</p><p>二级索引：根据某一列或者多列建立索引，叶子节点存放主键id，如果需要的数据满足索引覆盖，那么不需要再回表查询。否则，需要更加查找出来的主键id再回表查询。创建联合索引注意顺序（最左前缀法则）</p><h4 id="索引失效" tabindex="-1"><a class="header-anchor" href="#索引失效" aria-hidden="true">#</a> 索引失效</h4>',10),M={href:"https://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247503394&idx=1&sn=6e5b7b2c9bd9002a4b2dfa69273069b3",target:"_blank",rel:"noopener noreferrer"},S=n(`<p>主要是在联合索引中</p><p>1.跳过列，根据最左前缀法则，如果跳过某一列，索引将部分失效，也就是后面查询的列无法利用索引。在where子句的and顺序不影响，但必须存在。比如（a,b,c)中，只有a是有序的，bc都是无序的。</p><p>2.范围查询，大于小于号，比如<code>and age &gt; 0 and status = &#39;0&#39;</code>，status有联合索引，但是因为大于号导致后面不走索引，可以修改为大于等于。因为对于联合索引，是先按照 a 字段的值排序，然后在 a 字段的值相同的情况下，再按照 b 字段的值进行排序。因为有等于可以迅速确定扫描的起始位置一定是先等于的情况。</p><p>3.索引列运算，不要在索引列上进行运算，否则会导致索引失效。函数，8.0以后可以根据函数运算结果建立函数索引。算术运算。</p><p>4.字符串不加引号，如果索引字段是字符串类型，但是在条件查询中，输入的参数是整型的话，你会在执行计划的结果发现这条语句会走全表扫描(因为会执行对字符串类型Cast为整数类型操作)。但是如果索引字段是整型类型，查询条件中的输入参数即使是字符串，是不会导致索引失效，还是可以走索引扫描。(对where = 后字符串cast为整型)。MySQL 在遇到数字字符串和数字比较的时候，会自动把字符串转为数字，然后再进行比较。</p><p>5.模糊查询，以%开头查询会失效，但如果是以%结尾不会失效</p><p>6.or条件查询，前一个列有索引，后一个没有索引，也不会用到索引</p><p>7.数据分布的影响，MySQL优化器自动评估，可以认为use建议，force强制，ignore忽略</p><h4 id="使用索引" tabindex="-1"><a class="header-anchor" href="#使用索引" aria-hidden="true">#</a> 使用索引</h4><p>1.覆盖索引，需要的数据列能在索引中全找到，这样就不用回表查询</p><p>2.前缀索引，根据前缀建立索引</p><p>3.单列索引和联合索引建议联合索引</p><h3 id="sql性能分析" tabindex="-1"><a class="header-anchor" href="#sql性能分析" aria-hidden="true">#</a> SQL性能分析</h3><ul><li>SQL指令执行频率</li></ul><div class="language-MySQL line-numbers-mode" data-ext="MySQL"><pre class="language-MySQL"><code>-- GLOBAL/SESSION 7个&#39;_&#39;
-- 因为连接池的关系，使用可视化工具查询1次不一定是增加1
SHOW GLOBAL STATUS LIKE &#39;Com_______&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>慢查询日志</li></ul>`,16),L={href:"https://zhuanlan.zhihu.com/p/368269559",target:"_blank",rel:"noopener noreferrer"},q=e("p",null,"记录所有执行时间超过指定时间的SQL语句，默认没有开启。",-1),x={href:"https://serverfault.com/questions/1021349/unknown-variable-slow-query-log-1",target:"_blank",rel:"noopener noreferrer"},Q=n(`<div class="language-MySQL line-numbers-mode" data-ext="MySQL"><pre class="language-MySQL"><code>SHOW VARIABLES LIKE &#39;slow_query_log%&#39;;
--&gt; slow_query_log  OFF

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Explain执行计划</li></ul><p>直接在sql语句之前添加explain/desc</p><p>各列属性</p><p><img src="https://s2.loli.net/2023/05/03/6zvDV1dJU4ygeQ7.png" alt="图 5" loading="lazy"></p><h3 id="sql优化" tabindex="-1"><a class="header-anchor" href="#sql优化" aria-hidden="true">#</a> SQL优化</h3><ul><li>插入优化</li></ul><p>批量插入数据</p><p>手动提交事务，默认是一条语句一个事务</p><p>主键按顺序插入</p><p>大批量数据使用load</p><ul><li>主键优化</li></ul><p>页分裂和页合并</p><p>尽量降低主键长度</p><ul><li><p>order by优化</p></li><li><p>group by优化</p></li><li><p>limit优化</p></li></ul><p>覆盖索引加子查询</p><ul><li>count优化</li></ul><p>MyISAM会存储表行，而InnoDB需要一行一行计数</p><ul><li>update优化</li></ul><p>无索引会加表锁</p><h3 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h3><h3 id="mvcc-多版本并发控制" tabindex="-1"><a class="header-anchor" href="#mvcc-多版本并发控制" aria-hidden="true">#</a> MVCC 多版本并发控制</h3>`,22);function k(B,D){const l=d("ExternalLinkIcon");return r(),t("div",null,[o,e("p",null,[e("a",c,[a("在 Ubuntu 20.04 上安装 MySQL"),i(l)])]),u,e("p",null,[e("a",h,[a("MYSQL设置密码时显示Failed!"),i(l)])]),m,e("p",null,[e("a",b,[a("解决Navicat 连接mysql报错：Can‘t connect to MYSQL server on “ip address“(10061)"),i(l)])]),_,e("p",null,[e("a",y,[a("MySQL学习视频"),i(l)])]),v,e("p",null,[e("a",g,[a("MyISAM中的索引方案"),i(l)])]),f,e("p",null,[e("a",M,[a("索引失效场景"),i(l)])]),S,e("p",null,[e("a",L,[a("慢查询日志"),i(l)])]),q,e("p",null,[e("a",x,[a("https://serverfault.com/questions/1021349/unknown-variable-slow-query-log-1"),i(l)])]),Q])}const w=s(p,[["render",k],["__file","MySql.html.vue"]]);export{w as default};
