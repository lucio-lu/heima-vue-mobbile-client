## 黑马 webpack

https://www.bilibili.com/video/av50680998/

### base

常见的静态资源

js: .js .jsx .coffee .ts

css: .css .less .sass .scss

images: .jpg .pgn .gif .bmp .svg

font files: .svg .ttf .eot .woff .woff2

template files: .ejs .jade .vue



警惕资源多得缺点：

1. 而此请求多，网页加载速度慢。
2. 处理复杂得依赖关系，一个包引用到另一个包

解决办法：

1. css js: 合并压缩
2. 图片：精灵图，图片得Base64编码
3. 可以使用requireJS解决依赖关系

Gulp，基于 task 任务

webpack 基于整个项目进行构建

webpack是前端得一个构建工具，它是基于Node.js开发出来得一个前端工具 [https://webpack.github.io](https://webpack.github.io/)

老师用的版本是 Node v6.11.1 npm v3.10.10



### webpack

#### install webpack

```javascript 
// 1. 导入jquery
import $ from 'jquery'
// import *** from ***   是ES6中导入模块的方式，但浏览器还不识别：Uncaught SyntaxError: Unexpected identifier
```

``` powershell
npm i webpack -g

npm i webpack --save-dev
```

webpack建议是本地安装，如果全局安装，执行脚本时候可以直接输入`webpack`，但本地安装会报错没有找个指令，新本的npm可以使用`npx`命令，可以使用后面会讲到的在`package.json`配置`NPM`的脚本，然后`npm run dev`。

@@@在p93中，老师用的是`webpack@3.6.0`，`@4.0`及以后的版本，`webpack`和`webpack-cli`被分离，所以需要额外安装`webpack-cli`

``` powershell
npm i -D webpack-cli
```



#### run webpack

@@@在p93中，根据教程输入命令会报错

```powershell
webpack .\src\main.js .\dist\bundle.js
```

```
ERROR in multi ./src/main.js ./dist/bundle.js
Module not found: Error: Can't resolve '.\dist\bundle.js' in 'C:\Users\lucio\Desktop\vuejs_heima\05base\day_08_webpack'
@ multi ./src/main.js ./dist/bundle.js main[1]
```

报错原因是因为老师用得是webpack@3.6.0版本，而我们用得是最新版本(@4.40.2)。更换打包命令为：

```powershell
npx webpack .\src\main.js -o .\dist\bundle.js
```

```powershell
Hash: a719d501e301fd560f61
Version: webpack 4.40.2
Time: 3040ms
Built at: 2019-09-17 16:16:22
   Asset      Size  Chunks             Chunk Names
bundle.js  87.7 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[1] ./src/main.js 384 bytes {0} [built]
   + 1 hidden module


WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```

time：这次打包所花费得事件

Asset:打包这次生成的文件

Size:这次生成文件的大小

Chunks:这次打包的分块

chunk Names:这次打包的名称

``` html
<!-- <script src="./main.js"></script> -->
<!-- 更改引用，引用webpack打包的js文件 -->
<script src="../dist/bundle.js"></script>
```

结论：

1. webpack能够处理js文件的相互依赖关系
2. webpack能够处理js的兼容问题



#### config enrty & output

``` powershell
npx webpack
```

``` powershell
ERROR in Entry module not found: Error: Can't resolve './src' in 'C:\Users\lucio\Desktop\vuejs_heima\05base\day_08_webpack'
```

entry defaule: ./src/index.js，要修改默认参数，需要修改 `webpack.config.js`

``` javascript
// webpack.config.js
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'), //'./src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
  }
}
```

1. 系统命令是否指定出入口
2. 查找并解析 webpack.config.js
3. 默认值
4. 报错



#### webpack config base

webpack有4个概念必须要了解，这里的内容后面都会讲到，我的笔记在这里先做一个整理，四个最基础的概念：

1. entry(入口文件)
2. output(输出)
3. loader：加载第三方模块，webpack自身只能理解js，这些第三方模块可以把其他类型文件转换为wabpack可以理解的模块，然后再利用webpack打包
4. plugins(插件)：loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

``` javascript
const path = require('path')
const htmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  //mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'), //'./src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [ // 插件都要放在plugins中
    new htmlWebPackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    })
  ],
  module: { // 这是loader
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  }
};

// 1. 如果命令形式没有指定入口和出口
// 2. 查找webpack.config.js
// 3. 解析config
// 4. 根据config对象指定得入口和出口进行打包构建
```



### webpack-dev-server

监听代码，自动打包编译，类似nodemon

``` powershell
npm i webpack-dev-server -D
```

p95中，这个工具要求本地必须有webpack，即使全局已经安装了也不行

#### npm run & webpack.json

``` json
"scripts":{"dev": "npx webpack-dev-server --open --port 3000 --contentBase src --hot"}
```

``` powershell
$ npm run dev
> webpack output is served from /
```

输出表示webpack输出文件正在托关于根路径，这就意味着我们要访问文件，只要从根路径开始就能访问。

#### 托管在内存中

webpack-dev-server 打包的文件并没有存入磁盘，直接托管到内存中，所以我们在项目中访问不到。**所以访问的时候直接在根目录开始访问**

```html
<!-- <script src="./main.js"></script> -->
<!-- <script src="../dist/bundle.js"></script> -->
<script src="/bundle.js"></script>
```

#### webpack.config.js : devServer

``` javascript
const webpack = require('webpack') // 启用热更新的第2部

module.exports = {
    devserver:{
        open: true,
        port: 3000,
        contentBase: 'src',
        hot: true // 启用热更新的第1步
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin() // 启用热更新第3步
    ]
}
```

按老师得版本，如果把npm得命令用webpack.config保存的话，需要找3步，但实际我用新的wepback相关得包得时候，发现只需要第一步就能正常运行了，当然，完全实现这3步也能运行

### plugin

#### html-webpack-plugin

##### 把页面也托管到内存中

``` powershell
npm i html-webpack-plugin -D
```

``` javascript
//webpack.config.js
const path = require('path')
// 1. 导入再内存中生成的HTML页面的插件
// 插件都要放到plugins中
const htmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
    plugins:[
        new htmlWebPackPlugin({
            template:path.join(__dirname, './src/index.html'),
            filename:'index.html'
        })
    ]
}
```

@@@ 我看到这里才发现，为什么这里是require而不是import ** from **

##### 自动添加引用

查看html源代码，发现内存中的页面自动多了一个javascript引用，所以可以把物理磁盘上的html文件的引用可以删除

```html
<script type="text/javascript" src="bundle.js"></script></body>
```



### loader

#### import .css

``` html
<!-- 会发起二次请求，所以不推荐这么做 -->
<link rel="stylesheet" href="./css/index.css">
```

``` javascript
// 使用import导入样式表
import './css/index.css'
```

``` powershell
ERROR in ./src/css/index.css 1:3
Module parse failed: Unexpected token (1:3)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> li {
|     list-style: none;
| }
 @ ./src/main.js 8:0-24
```

这个报错的大致意思是，没有合适的css loader来解析css语法。因为webpack只能处理js，无法处理css。

``` powershell
npm i style-loader css-loader -D
```

``` javascript
const path = require('path')
module.exports = {
    module:{ // 这个节点用于配置所有第三方模块加载器
        rules:[
            { test: /\.css$/, use:['style-loader', 'css-loader'] }
        ]
    }
}
```

多个loader的调用顺序是从右到左调用，先调用`css-loader`，然后交给`style-loader`处理，最后交给`webpack`打包。



##### webpack打包css

webpack把css和js都打包到一个js文件中了，这个css被打包成了如下代码，（开始两行和最后一行，是本来就有的，中间的是css打包的内容）

```javascript
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"li {\\r\\n    list-style: none;\\r\\n}\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/css/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
```



#### import .less

``` javascript
import './css/index.less'
```

``` powershell
ERROR in ./src/css/index.lass 1:2
Module parse failed: Unexpected token (1:2)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> ul{
|     padding:0;
|     margin:0;
 @ ./src/main.js 9:0-25
```

``` powershell
npm i less-loader -D
```

``` powershell
npm WARN less-loader@5.0.0 requires a peer of less@^2.3.1 || ^3.0.0 but none is installed. You must install peer dependencies yourself.
```

``` powershell
npm i less -D
```

``` javascript
const path = require('path')
module.exports = {
    module:{
        rules:[
            { test: /\.less$/, use:['style-loader', 'css-loader', 'less-loader'] }
        ]
    }
}
```

less 是 less-loader 内部依赖，不需要显示安装。

less是css，less-loader解析成css之后，还需要css-loader和style-loader解析css，最后再有webpack打包





#### import .scss

``` javascript
import './css/index.scss'
```

``` powershell
ERROR in ./src/css/index.scss 1:9
Module parse failed: Unexpected token (1:9)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> html,body{
|     margin:0;
|     padding: 0;
 @ ./src/main.js 10:0-25
```

``` powershell
npm i sass-loader -D
```

``` powershell
npm WARN sass-loader@8.0.0 requires a peer of node-sass@^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN sass-loader@8.0.0 requires a peer of sass@^1.3.0 but none is installed. You must install peer dependencies yourself.
npm WARN sass-loader@8.0.0 requires a peer of fibers@>= 3.1.0 but none is installed. You must install peer dependencies yourself.
```

``` powershell
 npm i node-sass sass fibers -D
```

``` javascript
const path = require('path')
module.exports = {
    module:{
        rules:[
            { test: /\.scss$/, use:['style-loader', 'css-loader', 'sass-loader'] }
        ]
    }
}
```



#### url-loader

##### images

处理图片路径的load

``` css
.bgtest {
    width: 300px;
    height: 300px;
    background: url('../images/image-test.jpg.jpg');
    background-size: cover;
}
```

``` powershell
ERROR in ./src/images/image-test.jpg.jpg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
(Source code omitted for this binary file)
 @ ./src/css/index.css (./node_modules/css-loader/dist/cjs.js!./src/css/index.css) 4:38-98
 @ ./src/css/index.css
 @ ./src/main.js
```

``` powershell
npm i url-loader -D
```

``` javascript
module: {
  rules: [
    { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader' }
  ]
}
```

老师说`url-loder`内部依赖`filer-loader`，但实际上我只需要安装`url-loader`就可以正常运行了，而且安装完`url-loader`也并没有提示我依赖其他包。

`url-loader` 会自动把图片转码

``` css 
background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAwRXhpZgAATU0AKgAAAAgA…En979BS5UHMw+0Sf3v0FPlQuZh9ok/vfoKXKh8zD7TJ/e/QU+VBzMkWRnXDHIIPb2rOxof/9k=);
```

``` javascript
{ test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=36864&name=[hash:8]-[name].[ext]' }
```

教学视频里说，通过参数limit，设置的值小于或等于图片的大小，就不会是自动base64压缩了，但我并没有测试成功，而且我不像在这里花太多时间了，所以base64编码找个问题跳过。@@@



##### fonts

(这节有点麻烦，所以这节笔记比较详细)

我们使用bootstrap的字体，首先尝试最基础的引用方式，但因为我们项目启动托管的是src目录，所以无法访问到 `node_modules` 目录，因此我们要修改 `package.json` 的 `--contentBase` 的命令。

``` json 
"scripts": { "dev": "npx webpack-dev-server --open --port 3000 --contentBase src --hot" }
```

另外需要注意，老师用的是 **bootstrap@3.x.x** 版本，而现在已经是@4+版本了，所以请注意安装的版本。(@4.x好像dist文件下没有fonts文件夹了，默认没有字体)

``` powershell
npm i bootstrap@3
```

okay，测试通过！！！然后把 `<link>` 去除，使用 `import` 的方式引用 `bootstrap`

``` javascript
import '../node_modules/bootstrap/dist/css/bootstrap.css'
```

``` powershell
ERROR in ./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf 1:0
Module parse failed: Unexpected character ' ' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
(Source code omitted for this binary file)
 @ ./node_modules/bootstrap/dist/css/bootstrap.css (./node_modules/css-loader/dist/cjs.js!./node_modules/bootstrap/dist/css/bootstrap.css) 8:38-90
 @ ./node_modules/bootstrap/dist/css/bootstrap.css
 @ ./src/main.js
```

会报很错误，虽然有很多行错误信息，其实是5个Error，分别提示你无法解析 `.tff` `.woff` `.woff2` `.eot` `.svg` 文件。

``` javascript
  module: {
    rules: [
      { test: /\.(ttf|woff|woff2|eot|svg)$/, use: 'url-loader' }
    ]
  }
```



#### babel

``` javascript
class Person {
    static info = { name: 'zs', age: 20 }
}
console.log(Person.info)
```

``` powershell
ERROR in ./src/main.js 8:16
Module parse failed: Unexpected token (8:16)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|
| class Person {
>     static info = { name: 'zs', age: 20 }
| }
|
```

报错原因，webpack 无法处理 `static` 关键字。

在 webpack 中，默认只能处理一部分 ES6 的新语法，一些更高级的 ES6 语法 webpack 处理不了。这时候，就需要借助于第三方的 loader。第三方 loader 把高级语法转换为低级语法，然后再交给 webpack 去打包处理。

``` powershell
npm i babel-core babel-loader babel-plugin-transform-runtime -D
npm i babel-preset-env babel-preset-stage-0 -D
```

> 第一套包是转换工具，第二套包是语法插件

``` javascript
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }
```

> 注意，一定要使用 `exclude` 属性去除 node_modules 目录，不然会把该目录下的js全部打包编译，并且即使打包完成也无法运行。

在根目录下创建文件 **.babelrc**， 并如下编辑

``` json
{
    "presets": ["env", "stage-0"],
    "plugins": ["transform-runtime"]
}
```

``` powershell
ERROR in ./src/main.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
Error: Cannot find module '@babel/core'
Require stack:
 [...]

 babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
```

如果报错，根据报错提示修改就行，比如我报错：当前使用 `babel-loader@8`，需要 `babel/core@7` 版本，如果我继续使用 `babel/core@6` 版本，请安装 `babel-loader@7`。

于是我卸载了 `babel-loader@8` 重新安装了 `babel-loader@7` 就运行成功了。



### 开始Vue开发

#### 网页形式

##### install

###### 不用webpack：

1. `<script>` 引用 `Vue` 包
2. 创建一个html容器
3. `new Vue` 得到一个 vm 实例

###### 使用webpack：

1. install `vue`

``` powershell
npm i vue -S
```

2. 创建一个html容器

``` html
<div id="app"></div>
```

3. import `vue`

``` javascript
import Vue from 'vue'
```

4. create an instance of vue

``` javascript
var vm = new Vue({ el:'#app' })
```



##### import vue 报错

```powershell
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

npm 查找文件顺序

1. 查找node_modules文件夹，如果当前目录没有，会一级一级网上查找。
2. 在 node_modules 中，根据报名，找对应这个包的文件夹
3. 在文件夹中，找到一个叫 package.json 的包配置文件
4. 在 package.json 文件中，查找一个 main 属性，mian 属性指定了包被加载时的入口文件。

package.json中的"main": "dist/vue.runtime.common.js"，而我们需要导入的是"dist/vue.js"，有两种方式：

1. 导入指定文件

```` javascript
import Vue from '../node_modules/vue/dist/vue.js'
````

2. 修改 `webpack.config.js`

```javascript
{ resolve: { alias: { "vue$": "vue/dist/vue.js" } } }
```



#### vue 文件形式

vue文件有3部分组成：`<template>` `<script>` `<style>`

``` javascript
import Vue from 'vue'
import login from './login.vue'
```



##### install vue-loader

``` powershell
npm i vue-loader vue-template-compiler -D
```

```javasc
module: {
  rules: [
    { test: /\.vue$/, use: 'vue-loader' }
  ]
}
```



`vue-loader` 内部依赖 `vue-template-compiler`。并且安装完成 `vue-loader` 会提示需要安装 `css-loader`。

``` powershell
npm WARN vue-loader@15.7.1 requires a peer of css-loader@* but none is installed. You must install peer dependencies yourself.
```

``` powershell
[vue-loader] vue-template-compiler must be installed as a peer dependency, or a compatible compiler implementation must be passed via options.
```



##### vue-loader v15 报错

``` powershell
ERROR in ./src/login.vue
Module Error (from ./node_modules/vue-loader/lib/index.js):
[vue-loader] vue-template-compiler must be installed as a peer dependency, or a compatible compiler implementation must be passed via options.
 @ ./src/main.js 6:0-31 10:18-23

ERROR in ./src/login.vue
Module Error (from ./node_modules/vue-loader/lib/index.js):
vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
 @ ./src/main.js 6:0-31 10:18-23

ERROR in ./src/login.vue
Module build failed (from ./node_modules/vue-loader/lib/index.js):
TypeError: Cannot read property 'parseComponent' of undefined
```

vue-loader@15 现在需要配合一个 webpack 插件才能正确使用：

``` javascript
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // ...
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

[一篇解决这个bug的博客](https://blog.csdn.net/cominglately/article/details/80555210) 

[vue-lodaer 官网](https://vue-loader.vuejs.org/zh/migrating.html#%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E4%B8%8D%E5%85%BC%E5%AE%B9%E5%8F%98%E6%9B%B4) 



其实现在的 `vue-loader`，`component` 和 `render` 都可以，而不是视频里说的必须要使用 `render` 函数

``` javascript
components: { login },
//render: c => c(login)
```



### mint ui

https://mint-ui.github.io/#!/zh-cn

https://mint-ui.github.io/docs/#/

``` powershell
npm i mint-ui -S
```

``` javascript
// main.js
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
```



（@@@我在项目环节，发现其实不需要下面的步骤@@需要再回过头去看）

全局导入`mint`，打包文件太大，所以需要**按需导入**

``` powershell
npm i babel-plugin-component -D
```

.babelrc

``` json
{
  "presets": [
    ["es2015", { "modules": false }]
  ],
  "plugins": [["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]
}
```

``` javas
// main.js
import routes from './router.js'
import Vue from 'vue'
```

import 'mint-ui/lib/style.css'  // @@@奇怪的是老师把这句话注掉了，但仍旧有样式



### MUI

MUI不同于Mint-UI，MUI只是开发出来的一套好用的代码片段，里面提供了配套样式和配套的HTML代码，类似于 Bootstrap；而 Mint-UI是真正的组件库，是使用Vue技术封装出来的成套的组件，可以无缝的和VUE项目进行集成开发。

因此，从体验上来说，Mint-UI体验更好，因为这是别人帮我们开发好的现成Vue组件；

理论上，任何项目都可以使用MUI或者Bootstrap，但是，Mint-UI只适用于Vue项目；

https://github.com/dcloudio/mui

并不是vue封装出来的组件，所以不能通过Vue.use()注册，要想bootstrap一样使用。

> MUI 不能使用npm下载，需要手动从github上下载拷贝

1. Download ZIP
2. 解压
3. dist copy to 'src - lib - mui(dist)'
4. import './lib/mui/css/mui.min.css'
5. 去examples里头找到你要的样例，然后复制 html code



### vue-resource

``` powershell
npm i vue-resource -S
```

https://github.com/pagekit/vue-resource

https://www.npmjs.com/package/vue-resource



### 项目

day7 p134 /api/getlunbotu



46211

21000