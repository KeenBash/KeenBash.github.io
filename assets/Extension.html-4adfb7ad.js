import{_ as n,Y as s,Z as a,a2 as e}from"./framework-35f11a7f.js";const t={},p=e(`<h1 id="拓展知识" tabindex="-1"><a class="header-anchor" href="#拓展知识" aria-hidden="true">#</a> 拓展知识</h1><h2 id="对象命名" tabindex="-1"><a class="header-anchor" href="#对象命名" aria-hidden="true">#</a> 对象命名</h2><h3 id="实体对象" tabindex="-1"><a class="header-anchor" href="#实体对象" aria-hidden="true">#</a> 实体对象</h3><ul><li>PO(Persistent Object): 持久化对象，封装数据库返回的对象</li><li>VO(View Object): 视图对象，用于将数据封装返回给前端展示</li><li>DTO(Data Transfer Object): 数据传输对象，可以用于后端接收前端请求参数的封装（展示层与服务层）</li><li>BO(Business Object): 业务对象，把业务逻辑封装成一个对象</li><li>DO(Domain Object): 领域对象，</li></ul><p>按照规范来说mapper返回的都应该是po持久层对象，但是复杂查询一般会产生嵌套对象，一般将mapper分解，所有的mapper都返回持久层对象，对象的组装在sevice完成然后组装成dto，不过这样会导致sql执行过多，关于这个有很多讨论，</p><ul><li>1就是分库分表之后，你无法在sql里面进行嵌套和链接</li><li>2就是使业务逻辑比较好维护</li><li>3这样相当于在应用中使用了哈希关联？</li><li>4查询分解可以减少锁的竞争</li></ul><h3 id="业务层" tabindex="-1"><a class="header-anchor" href="#业务层" aria-hidden="true">#</a> 业务层</h3><ul><li>entity/bean</li><li>service---impl接口实现和service接口定义</li><li>dao/mapper</li><li>manager?</li><li>converter层？复杂映射转换?</li><li>cache</li><li>utils</li><li>handler</li><li>intercepter</li><li>config</li></ul><h3 id="对象转换" tabindex="-1"><a class="header-anchor" href="#对象转换" aria-hidden="true">#</a> 对象转换</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BeanCopyUtils</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">BeanCopyUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 拷贝bean对象
     *
     * <span class="token keyword">@param</span> <span class="token parameter">source</span> 源对象
     * <span class="token keyword">@param</span> <span class="token parameter">target</span> 目标类
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span>    指定泛型
     * <span class="token keyword">@return</span> 返回目标对象
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">T</span> <span class="token function">copyBean</span><span class="token punctuation">(</span><span class="token class-name">Object</span> source<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建目标对象</span>
        <span class="token class-name">T</span> result<span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            result <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 属性拷贝</span>
            <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 拷贝bean对象列表
     *
     * <span class="token keyword">@param</span> <span class="token parameter">sources</span> 源对象列表
     * <span class="token keyword">@param</span> <span class="token parameter">target</span>  目标类
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>O<span class="token punctuation">&gt;</span></span>     源对象泛型
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span>     目标对象泛型
     * <span class="token keyword">@return</span> 返回目标对象列表
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">O</span><span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">copyBeanList</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">O</span><span class="token punctuation">&gt;</span></span> sources<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sources<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>o <span class="token operator">-&gt;</span> <span class="token function">copyBean</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="全局异常处理" tabindex="-1"><a class="header-anchor" href="#全局异常处理" aria-hidden="true">#</a> 全局异常处理</h2><h2 id="数据库" tabindex="-1"><a class="header-anchor" href="#数据库" aria-hidden="true">#</a> 数据库</h2><h3 id="where-1-1" tabindex="-1"><a class="header-anchor" href="#where-1-1" aria-hidden="true">#</a> where 1 = 1</h3><p>在静态 SQL 中 向已经具有 WHERE 1=1 的查询添加条件时，此后的所有条件都将包含 AND，因此在注释掉试验查询的条件时更容易。</p><p>在动态 SQL 中 这也是以编程方式构建 SQL 查询时的常见做法。从“WHERE 1=1”开始，然后附加其他条件，例如“ and customer.id=:custId”，具体取决于是否提供了客户 ID。这允许开发人员在查询中附加以“and ...”开头的下一个条件。</p><p>而且查询优化器几乎肯定会删除它</p>`,16),c=[p];function l(i,o){return s(),a("div",null,c)}const r=n(t,[["render",l],["__file","Extension.html.vue"]]);export{r as default};
