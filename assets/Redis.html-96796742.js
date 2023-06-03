import{_ as p,Y as i,Z as l,$ as n,a0 as s,a1 as e,a2 as t,E as c}from"./framework-e3f91821.js";const o={},u=t('<h1 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h1><ul><li><a href="#redis">Redis</a><ul><li><a href="#%E5%AE%89%E8%A3%85redis">安装Redis</a></li><li><a href="#%E5%9F%BA%E6%9C%AC%E9%80%9A%E7%94%A8%E6%93%8D%E4%BD%9C">基本通用操作</a><ul><li><a href="#%E5%AD%98%E5%85%A5%E4%BF%AE%E6%94%B9%E6%95%B0%E6%8D%AE">存入&amp;修改数据</a></li><li><a href="#%E5%88%A0%E9%99%A4">删除</a></li><li><a href="#%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE">获取数据</a></li><li><a href="#%E8%AE%BE%E7%BD%AE%E6%95%B0%E6%8D%AE%E8%BF%87%E6%9C%9F%E6%97%B6%E9%97%B4">设置数据过期时间</a></li><li><a href="#%E6%A3%80%E6%9F%A5%E5%A4%9A%E4%B9%85%E8%BF%87%E6%9C%9F">检查多久过期</a></li><li><a href="#%E5%B8%B8%E7%94%A8%E6%93%8D%E4%BD%9C">常用操作</a></li></ul></li><li><a href="#%E5%9F%BA%E6%9C%AC%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B">基本数据类型</a><ul><li><a href="#string">String</a></li><li><a href="#hash">Hash</a></li><li><a href="#list">List</a></li><li><a href="#set">set</a><ul><li><a href="#hashset%E9%BB%98%E8%AE%A4">HashSet（默认）</a></li><li><a href="#sortedset">SortedSet</a></li></ul></li></ul></li><li><a href="#%E6%8C%81%E4%B9%85%E5%8C%96">持久化</a><ul><li><a href="#rdb">RDB</a><ul><li><a href="#%E9%85%8D%E7%BD%AE%E8%87%AA%E5%8A%A8%E4%BF%9D%E5%AD%98">配置自动保存</a></li></ul></li><li><a href="#aof">AOF</a></li></ul></li><li><a href="#%E4%BA%8B%E5%8A%A1%E5%92%8C%E9%94%81">事务和锁</a><ul><li><a href="#%E4%BA%8B%E5%8A%A1">事务</a></li><li><a href="#%E9%94%81">锁</a></li></ul></li><li><a href="#%E4%BD%BF%E7%94%A8java%E4%B8%8Eredis%E4%BA%A4%E4%BA%92">使用java与redis交互</a><ul><li><a href="#jedis%E6%A1%86%E6%9E%B6">Jedis框架</a><ul><li><a href="#jedis%E8%BF%9E%E6%8E%A5%E6%B1%A0">jedis连接池</a></li></ul></li><li><a href="#springdataredis-lettuce">SpringDataRedis-Lettuce</a><ul><li><a href="#%E6%94%B9%E7%94%A8jedis">改用jedis</a></li></ul></li><li><a href="#%E5%BA%8F%E5%88%97%E5%8C%96redisserializer">序列化RedisSerializer</a><ul><li><a href="#json%E5%BA%8F%E5%88%97%E5%8C%96">json序列化</a></li><li><a href="#stringredistemplate">StringRedisTemplate</a></li></ul></li><li><a href="#%E7%AE%A1%E7%90%86%E4%BA%8B%E5%8A%A1">管理事务</a></li></ul></li><li><a href="#redis%E7%9A%84%E5%BA%94%E7%94%A8">Redis的应用</a><ul><li><a href="#redis%E5%81%9A%E7%BC%93%E5%AD%98">Redis做缓存</a></li><li><a href="#token%E6%8C%81%E4%B9%85%E5%8C%96%E5%AD%98%E5%82%A8">Token持久化存储</a></li></ul></li></ul></li></ul><h2 id="安装redis" tabindex="-1"><a class="header-anchor" href="#安装redis" aria-hidden="true">#</a> 安装Redis</h2><p>NoSQL(Not Only SQL)用途，频繁使用数据</p>',4),d={href:"https://redis.io/",target:"_blank",rel:"noopener noreferrer"},r={href:"https://blog.csdn.net/weixin_42030357/article/details/96185533",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,"jemalloc缺失make MALLOC=libc",-1),v={href:"https://blog.csdn.net/qq_53686534/article/details/123885301",target:"_blank",rel:"noopener noreferrer"},m={href:"https://blog.csdn.net/u014723137/article/details/125658176",target:"_blank",rel:"noopener noreferrer"},b={href:"https://blog.csdn.net/weixin_43097301/article/details/89366196",target:"_blank",rel:"noopener noreferrer"},g={href:"https://zhuanlan.zhihu.com/p/584622091",target:"_blank",rel:"noopener noreferrer"},h=t(`<p>在ubuntu里使用命令apt install redis安装</p><p>!!ubuntu默认apt安装版本5.0.7, 改手动安装6.2.6版本并加入远程连接密码12345678</p><div class="language-linux line-numbers-mode" data-ext="linux"><pre class="language-linux"><code>wget https://download.redis.io/releases/redis-6.2.6.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>sudo service redis restart # 重启</p><p>redis-cli # 连接客户端</p><p>redis-cli -a 密码</p><p>redis-cli ping # 检查连接</p><p>/&gt;PONG</p><p>验证密码 auth 12345678</p><p>外部连接redis, 修改配置文件</p><p>注释 bind</p><p>修改 protected-mode 为 no</p><p>requiredPass 12345678</p><p>配置文件位置 /etc/redis/redis.conf</p><p>本地存储位置 /var/lib/redis/</p><h2 id="基本通用操作" tabindex="-1"><a class="header-anchor" href="#基本通用操作" aria-hidden="true">#</a> 基本通用操作</h2><p>redis默认16个数据库（0-15），默认使用0</p><p>可以通过 select 语句切换数据库</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> 序号

<span class="token comment">-- 查询命令帮助</span>
help <span class="token variable">@string</span>

<span class="token comment">-- 检查数据类型</span>
<span class="token keyword">type</span> <span class="token keyword">key</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="存入-修改数据" tabindex="-1"><a class="header-anchor" href="#存入-修改数据" aria-hidden="true">#</a> 存入&amp;修改数据</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 单个键值对</span>
<span class="token keyword">set</span> <span class="token keyword">key</span> <span class="token keyword">value</span>

<span class="token comment">-- 多个键值对</span>
mset <span class="token keyword">key</span> <span class="token keyword">value</span> <span class="token punctuation">[</span>k2 v2<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>

<span class="token comment">-- 冒号分割，层级结构</span>
<span class="token comment">-- 项目名:业务名:类型:id</span>
<span class="token comment">-- value可以存序列化json字符串的值</span>
<span class="token keyword">set</span> object:field1:part1 <span class="token keyword">value</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 可以多于一个key, 空格隔开</span>
del <span class="token keyword">key</span> <span class="token punctuation">[</span>k2<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取数据" tabindex="-1"><a class="header-anchor" href="#获取数据" aria-hidden="true">#</a> 获取数据</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>get <span class="token keyword">key</span>
mget <span class="token keyword">key</span> <span class="token punctuation">[</span>k2<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置数据过期时间" tabindex="-1"><a class="header-anchor" href="#设置数据过期时间" aria-hidden="true">#</a> 设置数据过期时间</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 插入时设置</span>
<span class="token keyword">set</span> <span class="token keyword">key</span> <span class="token keyword">value</span> ex 秒
<span class="token keyword">set</span> <span class="token keyword">key</span> <span class="token keyword">value</span> px 毫秒

<span class="token comment">-- 插入后设置</span>
<span class="token comment">-- 所以需要这个键存在，不存在返回0</span>
expire <span class="token keyword">key</span> seconds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="检查多久过期" tabindex="-1"><a class="header-anchor" href="#检查多久过期" aria-hidden="true">#</a> 检查多久过期</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- time to live生存时间</span>
ttl <span class="token keyword">key</span>
<span class="token comment">-- (integer) -2 返回-2即过期了，或者应该说是不存在这个key</span>
<span class="token comment">-- (integer) -1 返回-1即代表永久有效</span>

pttl <span class="token keyword">key</span> 查看毫秒
persist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用操作" tabindex="-1"><a class="header-anchor" href="#常用操作" aria-hidden="true">#</a> 常用操作</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查看所有键</span>
<span class="token comment">-- redis单线程，不建议查所有键</span>
<span class="token keyword">keys</span> <span class="token operator">*</span>

<span class="token comment">-- 查询某个键是否存在</span>
<span class="token keyword">exists</span> <span class="token keyword">key</span> <span class="token punctuation">[</span>k2<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>

<span class="token comment">-- 随机拿key</span>
randomkey

<span class="token comment">-- 移动数据到另一个数据库</span>
move <span class="token keyword">key</span> DbIndex

<span class="token comment">-- 修改键名</span>
<span class="token comment">-- 如果newkey已经存在，那么原来key里面的值将会被取代</span>
<span class="token keyword">rename</span> <span class="token keyword">key</span> newkey
<span class="token comment">-- 检查newkey是否已存在，返回0代表已存在</span>
renamenx <span class="token keyword">key</span> newkey

<span class="token comment">-- 自增value</span>
<span class="token comment">-- 返回更改后的数值</span>
incr <span class="token keyword">key</span>
<span class="token comment">-- a += b 定义不长</span>
incrby <span class="token keyword">key</span> num
<span class="token comment">-- 自减</span>
decr <span class="token keyword">key</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基本数据类型" tabindex="-1"><a class="header-anchor" href="#基本数据类型" aria-hidden="true">#</a> 基本数据类型</h2><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> String</h3><p>默认都是保存的字符串类型，不同格式存储编码方式不同</p><ul><li>string:</li><li>int:</li><li>float:</li></ul><h3 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> Hash</h3><p>类似java中的嵌套Map</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><blockquote><p>redis中的hash不能再往下嵌套了</p></blockquote></blockquote><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 添加hash类型数据</span>
hset <span class="token keyword">key</span> field <span class="token keyword">value</span> <span class="token punctuation">[</span>field1 value1<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>

<span class="token comment">-- 获取数据</span>
hget <span class="token keyword">key</span> field

<span class="token comment">-- 获取所有</span>
hgetall <span class="token keyword">key</span>

<span class="token comment">-- 查看hash中存了多少个键值对</span>
hlen <span class="token keyword">key</span>

<span class="token comment">-- 一次性获取所有的字段</span>
hkeys <span class="token keyword">key</span>

<span class="token comment">-- 一次性获取所有字段的值</span>
hvals <span class="token keyword">key</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> List</h3><p>类似java中的LinkedList双向链表，支持正向反向索引。</p><p>我们可以向一个已存在或是不存在的list中添加数据</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 向列表头部添加元素</span>
lpush <span class="token keyword">key</span> element
<span class="token comment">-- 向列表尾部添加元素</span>
rpush <span class="token keyword">key</span> element
<span class="token comment">-- 在指定元素前/后插入元素</span>
linsert <span class="token keyword">key</span> before<span class="token operator">/</span><span class="token keyword">after</span> 指定元素 添加元素
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取元素</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 根据下标获取元素</span>
lindex <span class="token keyword">key</span> 下标
<span class="token comment">-- 获取并移除头部元素</span>
lpop <span class="token keyword">key</span>
<span class="token comment">-- 获取并移除尾部元素</span>
rpop <span class="token keyword">key</span>
<span class="token comment">-- 获取指定范围内的元素</span>
lrange <span class="token keyword">key</span> <span class="token keyword">start</span> <span class="token keyword">end</span>
lrange d <span class="token number">0</span> <span class="token operator">-</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>list应用场景参考以下：</p><ul><li>lpush+lpop=Stack（栈）</li><li>lpush+rpop=Queue（队列）</li><li>blpop/brpop（阻塞队列）没有元素时等待指定时间</li><li>lpsh+ltrim=Capped Collection（有限集合）</li><li>lpush+brpop=Message Queue（消息队列）</li></ul><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> set</h3><h4 id="hashset-默认" tabindex="-1"><a class="header-anchor" href="#hashset-默认" aria-hidden="true">#</a> HashSet（默认）</h4><p>value为null的HashMap</p><p>无需，不允许重复元素，不支持随机访问，查找快</p><p>支持交集，并集，差集 好友列表共同关注之类</p><p>添加元素</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 添加元素</span>
sadd <span class="token keyword">key</span> member<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment">-- 查看有多少元素</span>
scard <span class="token keyword">key</span>
<span class="token comment">-- 判断是否是成员</span>
sismember <span class="token keyword">key</span> member
<span class="token comment">-- 列出所有成员，不是插入顺序</span>
smembers <span class="token keyword">key</span>

<span class="token comment">-- 随机移除</span>
spop <span class="token keyword">key</span>
<span class="token comment">-- 移除指定</span>
srem <span class="token keyword">key</span> member
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>集合之间的运算</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 差集</span>
sdiff key1 key2 
<span class="token comment">-- 交集</span>
sinter key1 key2
<span class="token comment">-- 并集</span>
sunion key1 key2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sortedset" tabindex="-1"><a class="header-anchor" href="#sortedset" aria-hidden="true">#</a> SortedSet</h4><p>底层跳表加hash表</p><p>添加带权重的元素，从小到大</p><p>排行榜</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>zadd <span class="token keyword">key</span> score member 

zcard
zrem
zrange <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> withscores

<span class="token comment">-- 通过分数段查看</span>
zrangebyscore <span class="token keyword">key</span> <span class="token keyword">start</span> stop 
<span class="token comment">-- 统计分数段内数量</span>
zcount <span class="token keyword">key</span> <span class="token keyword">start</span> stop
<span class="token comment">-- 根据分数获取指定值排名</span>
zrank <span class="token keyword">key</span> member
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="持久化" tabindex="-1"><a class="header-anchor" href="#持久化" aria-hidden="true">#</a> 持久化</h2><p>两种方式，一种是直接存储数据，一种是存储操作过程</p><h3 id="rdb" tabindex="-1"><a class="header-anchor" href="#rdb" aria-hidden="true">#</a> RDB</h3><p>将数据保存到本地</p><p>默认保存在 /var/lib/redis/dump.rdb，可修改默认保存地址</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 主线程保存</span>
<span class="token keyword">save</span>

<span class="token comment">-- 另外开一个线程保存</span>
bgsave
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存后我们可以使用 shutdown 关闭服务器</p><p>quit退出交互程序</p><h4 id="配置自动保存" tabindex="-1"><a class="header-anchor" href="#配置自动保存" aria-hidden="true">#</a> 配置自动保存</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 300秒内有10个写入就保存</span>
<span class="token keyword">save</span> <span class="token number">300</span> <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="aof" tabindex="-1"><a class="header-anchor" href="#aof" aria-hidden="true">#</a> AOF</h3><p>以日志的形式将每次执行的命令保存</p><p>三种时间策略</p><ul><li>always: 每次</li><li>everysec: 每秒（默认配置）</li><li>no:</li></ul><p>把redis.conf配置文件里的appendonly no --&gt; yes</p><p>aof重写机制优化，语句压缩</p><p>手动重写 bgrewriteaof</p><p>配置文件中配置自动重写</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># 百分比
auto-aof-rewrite-percentage 100
# 达到
auto-aof-rewrite-min-size 64mb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事务和锁" tabindex="-1"><a class="header-anchor" href="#事务和锁" aria-hidden="true">#</a> 事务和锁</h2><h3 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h3><p>将命令存入队列中，然后统一取出执行</p><p>开启事务 multi</p><p>执行命令 ...</p><p>提交事务 exec</p><p>中途取消 discard</p><h3 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h3><p>redis乐观锁，并不认为会有人抢占资源，所以会直接对数据进行操作，在操作时再确认是否有人抢占资源</p><p>mysql悲观锁，时刻认为会有人抢占资源，禁止一切外来访问，直到释放锁</p><p>redis中可以使用<code>watch</code>来监视一个目标，如果执行事务之前 被监视目标 发生了修改，则取消此次事务</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>watch <span class="token keyword">key</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用java与redis交互" tabindex="-1"><a class="header-anchor" href="#使用java与redis交互" aria-hidden="true">#</a> 使用java与redis交互</h2><p>Jedis, Lettuce, Redisson</p><h3 id="jedis框架" tabindex="-1"><a class="header-anchor" href="#jedis框架" aria-hidden="true">#</a> Jedis框架</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>redis.clients<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>jedis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.7.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>连接redis数据库，创建一个Jedis对象</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">&quot;192.168.73.130&quot;</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;666&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
jedis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类，jedis的操作api和redis命令行一致</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JedisTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Jedis</span> jedis<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">void</span> <span class="token function">setJedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">&quot;192.168.73.130&quot;</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">auth</span><span class="token punctuation">(</span><span class="token string">&quot;12345678&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testJedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;j&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;k&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;j = &quot;</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;j&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@AfterEach</span>
    <span class="token keyword">void</span> <span class="token function">downJedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>jedis <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            jedis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="jedis连接池" tabindex="-1"><a class="header-anchor" href="#jedis连接池" aria-hidden="true">#</a> jedis连接池</h4><p>jedis本身是线程不安全的，并且频繁的创建和销毁会有性能损耗，因此推荐使用jedis连接池代替jedis的直连方式</p><p>？新版默认连接池？</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JedisConnectionFactory</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">JedisPool</span> jedisPool<span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">JedisPoolConfig</span> jedisPoolConfig <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JedisPoolConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 最大连接</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMaxTotal</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 最大空闲连接</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMaxIdle</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 最小空闲连接</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMinIdle</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 最长等待时间</span>
        <span class="token comment">// jedisPoolConfig.setMaxWaitMillis(200);// Deprecated</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMaxWait</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofMillis</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedisPool <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JedisPool</span><span class="token punctuation">(</span>jedisPoolConfig<span class="token punctuation">,</span>
                <span class="token string">&quot;192.168.73.130&quot;</span><span class="token punctuation">,</span>
                <span class="token number">6379</span><span class="token punctuation">,</span>
                <span class="token number">1000</span><span class="token punctuation">,</span>
                <span class="token string">&quot;12345678&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Jedis</span> <span class="token function">getJedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> jedisPool<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="springdataredis-lettuce" tabindex="-1"><a class="header-anchor" href="#springdataredis-lettuce" aria-hidden="true">#</a> SpringDataRedis-Lettuce</h3><p>SpringDataRedis提供了对jedis和lettuce的整合</p><p>提供了统一的操作方式RedisTemplate</p><p>？添加连接池依赖？</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- ？添加连接池依赖？ --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>commons-pool2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置redis，远程连接用url</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment"># redis</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 192.168.73.130
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">database</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">12345678</span>
    <span class="token key atrule">lettuce</span><span class="token punctuation">:</span>
      <span class="token key atrule">pool</span><span class="token punctuation">:</span>
        <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token key atrule">max-idle</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">0</span>
        <span class="token key atrule">max-wait</span><span class="token punctuation">:</span> <span class="token number">100</span>
    <span class="token comment"># jedis:pool</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用template</p><ul><li>template.opsForValue</li><li>template.opsForHash</li><li>template.opsForList</li><li>template.opsForSet</li><li>template.opsForZSet</li></ul><p>template 通用操作</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token class-name">RedisTemplate</span> template<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">contextLoads</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 操作</span>
    template<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;spring&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    template<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;c&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    template<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    template<span class="token punctuation">.</span><span class="token function">hasKey</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="改用jedis" tabindex="-1"><a class="header-anchor" href="#改用jedis" aria-hidden="true">#</a> 改用jedis</h4><h3 id="序列化redisserializer" tabindex="-1"><a class="header-anchor" href="#序列化redisserializer" aria-hidden="true">#</a> 序列化RedisSerializer</h3><blockquote><p>注入byName：template引发问题，改redisTemplate</p></blockquote><p>使用StringRedisTemplate不会键名序列化乱码</p><p>普通RedisTemplate不指定泛型&lt;String, String&gt;</p><p>d会序列化成以下</p><p>\\xac\\xed\\x00\\x05t\\x00\\x01d</p><p>默认使用jdk的序列化器，内存占用大，可读性差、</p><h4 id="json序列化" tabindex="-1"><a class="header-anchor" href="#json序列化" aria-hidden="true">#</a> json序列化</h4><p>不太推荐序列化为json保存数据，会带来额外开销，除开web传输数据</p><p>一般都要求键和值都为string</p><p>修改序列化方式，springbootweb包含jackson</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> <span class="token function">redisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> redisConnectionFactory<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> redisTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 设置连接工厂</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>redisConnectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 设置序列化工具</span>
    <span class="token class-name">GenericJackson2JsonRedisSerializer</span> jsonRedisSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GenericJackson2JsonRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Key和HashKey采用String序列化</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">setKeySerializer</span><span class="token punctuation">(</span><span class="token class-name">RedisSerializer</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">setHashKeySerializer</span><span class="token punctuation">(</span><span class="token class-name">RedisSerializer</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Value和HashValue采用JSON序列化</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">setValueSerializer</span><span class="token punctuation">(</span>jsonRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">setHashValueSerializer</span><span class="token punctuation">(</span>jsonRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> redisTemplate<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>fastjson序列化</p><h4 id="stringredistemplate" tabindex="-1"><a class="header-anchor" href="#stringredistemplate" aria-hidden="true">#</a> StringRedisTemplate</h4><p>键值都是string方式</p><p>需要借助序列化工具手动序列化和反序列化</p><p>kyro序列化</p><h3 id="管理事务" tabindex="-1"><a class="header-anchor" href="#管理事务" aria-hidden="true">#</a> 管理事务</h3><p>借助jdbc驱动和mysql事务管理@Transactional注解</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置数据源</p><p>新建一个service.RedisService.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisService</span> <span class="token punctuation">{</span>

    <span class="token class-name">StringRedisTemplate</span> template<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setTemplate</span><span class="token punctuation">(</span><span class="token class-name">StringRedisTemplate</span> template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>template <span class="token operator">=</span> template<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 开启事务</span>
        template<span class="token punctuation">.</span><span class="token function">setEnableTransactionSupport</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Transactional</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        template<span class="token punctuation">.</span><span class="token function">multi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        template<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;sb&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        template<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redis的应用" tabindex="-1"><a class="header-anchor" href="#redis的应用" aria-hidden="true">#</a> Redis的应用</h2><h3 id="redis做缓存" tabindex="-1"><a class="header-anchor" href="#redis做缓存" aria-hidden="true">#</a> Redis做缓存</h3><p>mybatis缓存，默认二级缓存是单机的，我们希望多台服务器访问数据库使用同一个二级缓存。需要实现mybatis的cache接口，把RedisTemplate注入</p><p>导入mybatis starter</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.mybatis.spring.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mybatis-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.3.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cache.MybatisRedisCache.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MybatisRedisCache</span> <span class="token keyword">implements</span> <span class="token class-name">Cache</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> template<span class="token punctuation">;</span>

    <span class="token comment">// 构造方法必须带string接收id</span>
    <span class="token keyword">public</span> <span class="token class-name">MybatisRedisCache</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> template<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">MybatisRedisCache</span><span class="token punctuation">.</span>template <span class="token operator">=</span> template<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">putObject</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 向redis缓存数据并设置超时时间</span>
        template<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getObject</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取缓存数据</span>
        <span class="token keyword">return</span> template<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">removeObject</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 删除</span>
        <span class="token keyword">return</span> template<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 清空数据库</span>
        <span class="token comment">// 使用Connection对象</span>
        template<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">RedisCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> connection <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            connection<span class="token punctuation">.</span><span class="token function">flushDb</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里也是connection对象</span>
        <span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">RedisServerCommands</span><span class="token operator">::</span><span class="token function">dbSize</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>config.MybatisConfig.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MybatisConfig</span> <span class="token punctuation">{</span>

    <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">MybatisConfig</span><span class="token punctuation">(</span><span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> redisTemplate<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate <span class="token operator">=</span> redisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">MybatisRedisCache</span><span class="token punctuation">.</span><span class="token function">setTemplate</span><span class="token punctuation">(</span>redisTemplate<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用mapper.CacheMapper.java</p><p>应该有配置全局的</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@CacheNamespace</span><span class="token punctuation">(</span>implementation <span class="token operator">=</span> <span class="token class-name">MybatisRedisCache</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Mapper</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">CacheMapper</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">&quot;select * from student where sid = 2&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">getStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token class-name">CacheMapper</span> mapper<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    mapper<span class="token punctuation">.</span><span class="token function">getStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mapper<span class="token punctuation">.</span><span class="token function">getStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mapper<span class="token punctuation">.</span><span class="token function">getStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="token持久化存储" tabindex="-1"><a class="header-anchor" href="#token持久化存储" aria-hidden="true">#</a> Token持久化存储</h3><p>先加web依赖</p><p>再spring security</p><p>实现</p>`,158);function y(f,w){const a=c("ExternalLinkIcon");return i(),l("div",null,[u,n("p",null,[s("Redis英文全称是Remote Dictionary Server官网"),n("a",d,[s("redis"),e(a)])]),n("p",null,[n("a",r,[s("xftp传输失败"),e(a)])]),k,n("p",null,[n("a",v,[s("Ubuntu安装Redis6.2.6"),e(a)])]),n("p",null,[n("a",m,[s("Redis？它主要用来什么的"),e(a)])]),n("p",null,[n("a",b,[s("Ubuntu安装redis后redis.conf配置为空"),e(a)])]),n("p",null,[n("a",g,[s("设置开机自动启动"),e(a)])]),h])}const E=p(o,[["render",y],["__file","Redis.html.vue"]]);export{E as default};
