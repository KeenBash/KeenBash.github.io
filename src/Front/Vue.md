---
category:
  - Front
tag:
  - Vue
---

# Vue

[Vue2](https://v2.cn.vuejs.org/)

- [Vue](#vue)
  - [快速上手](#快速上手)
    - [el挂载点](#el挂载点)
    - [data属性](#data属性)
    - [methods属性](#methods属性)
  - [Vue指令](#vue指令)
    - [v-text](#v-text)
    - [v-html](#v-html)
    - [v-on](#v-on)
    - [v-show](#v-show)
    - [v-if](#v-if)
    - [v-bind](#v-bind)
    - [v-for](#v-for)
    - [v-model](#v-model)
  - [axios](#axios)
  - [element](#element)

## 快速上手

Vue 是一套用于**构建用户界面**的**渐进式框架**

```html
<body>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <div id="app">
        {{ msg }}
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                msg: "Hello Vue!"
            }
        })
    </script>
</body>
```

### el挂载点

el: "#app" css选择器，id选择器，建议挂div

### data属性

```html
<div id="app">
    <p>{{ msg }}</p>
    <p>{{ msg.key }}</p>
    <p>{{ arr }}</p>
    <p>{{ arr[0] }}</p>
</div>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            msg: {
                key: "test",
                value: "demo"
            },
            arr: ["hello", "vue"]
        }
    })
</script>
```

### methods属性

添加方法

```javascript
var app = new Vue({
    el: "#app",
    data: {
        msg: "msg"
    },
    methods: {
        f1: function(){
            alert("Hi")
        }
    }
})
```

## Vue指令

### v-text

设置标签的文本值textContent，会全替换

{{ 插值表达式 }} 还支持表达式

```html
<div id="app">
    <p v-text="msg + '?'"></p>
    <p>测试{{ msg + "!" }}</p>
</div>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            msg: "test"
        }
    })
</script>
```

### v-html

设置标签的innerHTML

```javascript
data: {
    content: "<h1>Hello</h1>"
}
```

### v-on

为元素绑定事件

- v-on:click
- v-on:mouseenter
- v-on:dbclick

支持替换成`@click`

```html
<div id="app" @click="func">
    <input type="button" value="点一下">
</div>
<script>
    var app = new Vue({
        el: "#app",
        methods: {
            func: function () {
                alert("Hi")
            }
        }
    })
</script>
```

传递参数

```javascript
@click="func(p1)"
func: function (p1) {   
}
```

时间修饰符

@keyup.enter="func" 松开回车触发

可以用this获取当前元素

参数为event时是原生 DOM 事件

### v-show

根据表达式的真假，切换元素的显示和隐藏，改变的是display

```html
<div id="app">
    <input type="button" v-show="isShow" @click="change" value="按钮1">
    <input type="button" v-show="!isShow" @click="change" value="按钮2">
    <input type="button" v-show="age >= 18" value="按钮3">
</div>
<script>
    var app = new Vue({
        el: "#app",
        data:{
            isShow: true,
            age: 26
        },
        methods:{
            change: function(){
                this.isShow = !this.isShow
            }
        }
    })
</script>
```

### v-if

根据表达式的真假，切换元素的显示和隐藏（直接操纵元素），直接移除

### v-bind

设置元素的属性

- v-bind:src
- v-bind:class
  
  ```html
  <img v-bind:class="isActive?'active':''">
  <img v-bind:class="{active:isActive}">
  ```

简写直接`:class`

### v-for

```html
<div id="app">
    <ul>
        <li v-for="(todo, index) in todos">
            {{ index + ". " + todo.text }}
        </li>
    </ul>
</div>
<script>
    var app4 = new Vue({
        el: '#app',
        data: {
            todos: [
                { text: '学习 JavaScript' },
                { text: '学习 Vue' },
                { text: '整个牛项目' }
            ]
        }
    })
</script>
```

### v-model

双向数据绑定

```html
<div id="app">
    <p>{{msg}}</p>
    <input type="text" v-model="msg"/>
</div>
<script>
    var app4 = new Vue({
        el: '#app',
        data: {
            msg: "消息"
        }
    })
</script>
```

## axios

[axios](https://www.axios-http.cn/)

```html
<body>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <div id="app">
        <input type="button" @click="geti" value="点我Get" />
        <input type="button" @click="posti" value="点我Post" />
        <p>{{msg}}</p>
    </div>
    <script>
        var app4 = new Vue({
            el: '#app',
            data: {
                msg: "消息"
            },
            methods: {
                geti: function () {
                    // 保存对象
                    var m = this
                    axios.get("https://autumnfish.cn/api/joke")
                        .then(function (response) {
                            console.log(response)
                            console.log(response.data)
                            m.msg = response.data
                        }, function (err) {
                            console.log(err)
                        })
                },
                posti: function () {
                    var m = this
                    axios.post("https://autumnfish.cn/api/user/reg", {
                        username: "jack"
                    }).then(function (response) {
                        console.log(response)
                        console.log(response.data.msg)
                        m.msg = response.data
                    }, function (err) {
                        console.log(err)
                    })
                }
            }
        })
    </script>
</body>
```

## element

[element](https://element.eleme.cn/#/zh-CN)
