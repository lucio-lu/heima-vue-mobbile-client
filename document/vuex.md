## vuex

### 基本使用

#### 1. 下载、安装

``` html
<script src="">
```

``` powershell
npm install vuex --save
```

``` powershell
yarn add vuex
```

#### 2. 导入和注册

``` javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

#### 3. 创建最简单的Store实例

```` javascript
const store = new Vuex.Store({
    state:{ // 相当于组件中的 data
        count: 0
    },
    mutations:{ // 相当于组件中的 methods
        increment (state){
            state.count++
        }
    }
})
````

#### 4. 挂载到vue实例

``` javascript
const vm = new Vue({
    ...,
    store,
    ...
})
```

#### 5. 访问

``` javascript
this.$store.state.***
```



