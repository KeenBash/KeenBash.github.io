const e=JSON.parse('{"key":"v-fbc4af86","path":"/Front/ThemyLeaf.html","title":"ThemyLeaf","lang":"zh-CN","frontmatter":{"category":["Front"],"tag":["ThemyLeaf"],"description":"ThemyLeaf 官方文档 ThemyLeaf 命名空间 语法介绍 表达式 变量表达式${} 选择变量表达式*{} 表达式@ 行内写法 th 属性 公共页面 引入 传递参数 导入依赖 SSM整合ThemyLeaf 配置spring-mvc.xml 使用 SpringBoot整合","head":[["meta",{"property":"og:url","content":"https://docs.keeend.eu.org/Front/ThemyLeaf.html"}],["meta",{"property":"og:site_name","content":"Jave Notebook"}],["meta",{"property":"og:title","content":"ThemyLeaf"}],["meta",{"property":"og:description","content":"ThemyLeaf 官方文档 ThemyLeaf 命名空间 语法介绍 表达式 变量表达式${} 选择变量表达式*{} 表达式@ 行内写法 th 属性 公共页面 引入 传递参数 导入依赖 SSM整合ThemyLeaf 配置spring-mvc.xml 使用 SpringBoot整合"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-20T13:35:24.000Z"}],["meta",{"property":"article:author","content":"Keen"}],["meta",{"property":"article:tag","content":"ThemyLeaf"}],["meta",{"property":"article:modified_time","content":"2023-04-20T13:35:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ThemyLeaf\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-20T13:35:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Keen\\",\\"url\\":\\"https://docs.keeend.eu.org/\\"}]}"]]},"headers":[{"level":2,"title":"命名空间","slug":"命名空间","link":"#命名空间","children":[]},{"level":2,"title":"语法介绍","slug":"语法介绍","link":"#语法介绍","children":[{"level":3,"title":"表达式","slug":"表达式","link":"#表达式","children":[]},{"level":3,"title":"行内写法","slug":"行内写法","link":"#行内写法","children":[]},{"level":3,"title":"th 属性","slug":"th-属性","link":"#th-属性","children":[]},{"level":3,"title":"公共页面","slug":"公共页面","link":"#公共页面","children":[]}]},{"level":2,"title":"导入依赖","slug":"导入依赖","link":"#导入依赖","children":[]},{"level":2,"title":"SSM整合ThemyLeaf","slug":"ssm整合themyleaf","link":"#ssm整合themyleaf","children":[{"level":3,"title":"配置spring-mvc.xml","slug":"配置spring-mvc-xml","link":"#配置spring-mvc-xml","children":[]},{"level":3,"title":"使用","slug":"使用","link":"#使用","children":[]}]},{"level":2,"title":"SpringBoot整合","slug":"springboot整合","link":"#springboot整合","children":[]}],"git":{"createdTime":1681997724000,"updatedTime":1681997724000,"contributors":[{"name":"XuChangeShine","email":"XuChangeShine@163.com","commits":1}]},"readingTime":{"minutes":5.39,"words":1618},"filePathRelative":"Front/ThemyLeaf.md","localizedDate":"2023年4月20日","excerpt":"<h1> ThemyLeaf</h1>\\n<p><a href=\\"https://www.thymeleaf.org/documentation.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">官方文档</a></p>\\n<ul>\\n<li><a href=\\"#themyleaf\\">ThemyLeaf</a>\\n<ul>\\n<li><a href=\\"#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4\\">命名空间</a></li>\\n<li><a href=\\"#%E8%AF%AD%E6%B3%95%E4%BB%8B%E7%BB%8D\\">语法介绍</a>\\n<ul>\\n<li><a href=\\"#%E8%A1%A8%E8%BE%BE%E5%BC%8F\\">表达式</a>\\n<ul>\\n<li><a href=\\"#%E5%8F%98%E9%87%8F%E8%A1%A8%E8%BE%BE%E5%BC%8F\\">变量表达式${}</a></li>\\n<li><a href=\\"#%E9%80%89%E6%8B%A9%E5%8F%98%E9%87%8F%E8%A1%A8%E8%BE%BE%E5%BC%8F\\">选择变量表达式*{}</a></li>\\n<li><a href=\\"#%E8%A1%A8%E8%BE%BE%E5%BC%8F-1\\">表达式@</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E8%A1%8C%E5%86%85%E5%86%99%E6%B3%95\\">行内写法</a></li>\\n<li><a href=\\"#th-%E5%B1%9E%E6%80%A7\\">th 属性</a></li>\\n<li><a href=\\"#%E5%85%AC%E5%85%B1%E9%A1%B5%E9%9D%A2\\">公共页面</a>\\n<ul>\\n<li><a href=\\"#%E5%BC%95%E5%85%A5\\">引入</a></li>\\n<li><a href=\\"#%E4%BC%A0%E9%80%92%E5%8F%82%E6%95%B0\\">传递参数</a></li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E5%AF%BC%E5%85%A5%E4%BE%9D%E8%B5%96\\">导入依赖</a></li>\\n<li><a href=\\"#ssm%E6%95%B4%E5%90%88themyleaf\\">SSM整合ThemyLeaf</a>\\n<ul>\\n<li><a href=\\"#%E9%85%8D%E7%BD%AEspring-mvcxml\\">配置spring-mvc.xml</a></li>\\n<li><a href=\\"#%E4%BD%BF%E7%94%A8\\">使用</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#springboot%E6%95%B4%E5%90%88\\">SpringBoot整合</a></li>\\n</ul>\\n</li>\\n</ul>","copyright":{"author":"Keen"},"autoDesc":true}');export{e as data};
