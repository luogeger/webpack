## webpack

[webpack](www.jianshu.com/p/42e11515c10f)

### 手动编译 
- main依赖greeter, 再把main打包编译成bundle.js
    - `webpack app/main.js public/bundle.js` 
    - 如果没有全局安装webpack, 命令行：`node_modules/.bin/webpack app/main.js public/bundle.js`
        
        
### 通过配置文件来使用webpack
> 配置文件其实也是一个简单的JavaScript模块，我们可以把所有的与打包相关的信息放在里面
```javascript
    module.exports = {
        entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
        output: {
            path: __dirname + "/public",//打包后的文件存放的地方
            filename: "bundle.js"//打包后输出文件的文件名
        }
    }
    
    // “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
```
- 有了这个配置之后，再打包文件，只需在终端里运行`webpack`，这个命令会自动引用`webpack.config.js`的配置选项


### 更快捷的执行打包任务`npm start`
- 不能用`run`、`dev`, 不能有`test`, 不能有注释


### 生成Source Maps（使调试更容易）
- 需要配置`devtool`-> `devtool: 'eval-source-map'`


### 使用webpack构建本地服务器
- 想不想让你的浏览器监听你的代码的修改，并自动刷新显示修改后的结果，其实`Webpack`提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现你想要的这些功能，不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖
```markdown
    npm install --save-dev webpack-dev-server
```

- devserver作为webpack配置选项中的一项，以下是它的一些配置选项，更多配置可参考[这里](https://webpack.js.org/configuration/dev-server/)

|devserver的配置选项|功能描述|
|:--:|:--:|
| contentBase| 	默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）|  
| port  | 设置默认监听端口，如果省略，默认为”8080“ | 
| inline  | 设置为true，当源文件改变时会自动刷新页面 | 
| historyApiFallback | 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html | 

- 把这些命令加到webpack的配置文件中，现在的配置文件webpack.config.js如下所示

```javascript
    // 目前的webpack.config.js文件
    module.exports = {
      devtool: 'eval-source-map',
    
      entry:  __dirname + "/app/main.js",
      output: {
        path: __dirname + "/public",
        filename: "bundle.js"
      },
    
      devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
      } 
    }
```

- 在`package.json`中的`scripts`对象中添加如下命令，用以开启本地服务器：
```json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack",
        "server": "webpack-dev-server --open"
    }
```

- 在终端中输入`npm run server`即可在本地的`8080`端口查看结果



### Loaders
```markdown
通过使用不同的`loader`，`webpack`有能力调用外部的脚本或工具，实现对不同格式的文件的处理
比如: 分析转换scss为css，把ES6转换为现代浏览器兼容的JS文件，对React而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件
```

- Loaders需要单独安装并且需要在`webpack.config.j`s中的`modules`关键字下进行配置，Loaders的配置包括以下几方面：
    - `test`：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
    - `loader`：loader的名称（必须）
    - `include/exclude`:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
    - `query`：为loaders提供额外的设置选项（可选）