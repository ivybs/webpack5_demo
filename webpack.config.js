/*
* webpack.config.js webpack的配置文件
* 所有构建工具都是基于nodejs平台运行了
* 模块化采用commonjs
* loader: 1.下载 2.使用（配置loader）
* plugins: 1.下载 npm i html-webpack-plugin -D
*          2.引入 3.使用
* */
// resolve用来拼接绝对路径的方法
const { resolve } = require('path');
//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    // 入口起点
    entry: './src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: "build.js",
        // 输出路径
        // __dirname nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname,'build'),
    },
    // loader的配置
    // 不同文件必须配置不同loader进行处理
    module: {
        rules: [

            // {
            //     // 匹配哪些文件
            //     test: /\.css$/,
            //     // 使用哪些loader进行处理
            //     use: [
            //         // use数组中loader执行顺序：从右到左，从下到上
            //         // 创建style便签，将js中的样式资源插入进行，添加到head中生效
            //         'style-loader',
            //         // 将css文件变成commonjs模块加载js中，里面的内容是样式字符串
            //         'css-loader']
            // },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 将less文件编译成css文件
                    // 需要下载 less-loader和less
                    "less-loader"
                ]
            },
            {
                // 问题：默认处理不了html中img的图片
                // 处理图片
                // 下载url-loader和file-loader
                test: /\.(jpg|png|gif)$/,
                // 只使用一个Loader的时候，可以直接用loader
                loader: 'url-loader',
                options: {
                    //图片大小小于8kb，就会被base64处理
                    //base64:减少请求数量（减轻服务器压力）、
                    // 图片体积会更大（文件请求速度更慢）
                    limit: 8*1024,
                    // 问题：因为url-loader是使用es6模块去解析的
                    // 而html-loader引入图片是commonjs，解析时会报错
                    // 解决 ： 关闭url-loader的es6模块，使用commonjs
                    esMoudles:false,
                    // 重命名图片文件 [ext]:取文件的原来的扩展名
                    // 不会重复打包同样的文件
                    name: '[hash:10].[ext]'
                }
            },
            // {
            //     test: /\.html$/,
            //     // 处理html文件的img图片，负责引入img,从而能够被url-loader进行处理
            //     loader: "html-loader"
            // },
            // 打包其他资源（除了html/js/css资源以外的资源）
            // {
            //     // 排除css/js/html资源
            //     exclude: /\.(css|js|html|less)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name:'[hash:10].[ext]'
            //     }
            // }
        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin
        //功能：默认会创建一个空的html，引入打包输出(output下的文件)的所有资源（js/css）
        //需求：需要有结构的html文件
        new HtmlWebpackPlugin(
            // 复制 ./src/index.html 文件，并自动引入打包输出的所有资源（js/css）
            {
                template: "./src/index.html"
            }
        )
    ],
    // 开发模式
    mode: "development",

    //开发服务器 devServer:用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    //特点：只会在内存中编译打包，不会有任何输出
    //启动devServer指令为 npx webpack-dev-server
    devServer:{
        contentBase:resolve(__dirname,'build'),
        //启动gzip压缩
        compress: true,
        //端口号
        port:3000
    }
}
