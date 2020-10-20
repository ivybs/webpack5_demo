/*
index.js：webpack入口起点文件
1.运行指令：
    开发环境： webpack ./src/index.js -o ./dist/main.js --mode=development
        webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/build.js
        整体打包环境，是开发环境
    生产环境：webpack ./src/index.js -o ./dist/main.js --mode=production
2.结论：
    （1）webpack能处理js/json,不能处理css/img等其他资源
    （2）生产环境比开发环境多一个压缩Js代码
    （3）生产环境和开发环境将es6模块编译成浏览器能识别的模块化
*/

import data from './data';
import './index.less'

console.log(data);

function add(x,y) {
    return x + y;
}

console.log(add(1,2))