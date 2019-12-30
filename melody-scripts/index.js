// 复写配置
const path = require('path');
const fs = require('fs');

// 复写create配置,支持类修饰器
console.log('===复写create配置-支持类的修饰器===');
const createTargetPath = path.resolve(__dirname,'./../node_modules/babel-preset-react-app/create.js');
const tsConfigTargetPath = path.resolve(__dirname,'./../node_modules/uri-js/tsconfig.js');
const createSourcePath = path.resolve(__dirname,'./create.js');
const tsConfigSourcePath = path.resolve(__dirname,'./tsconfig.json');
const createSource =  fs.readFileSync(createSourcePath,'utf-8');
const tsconfigSource = fs.readFileSync(tsConfigSourcePath,'utf-8');

if(!createSource||!tsconfigSource){
    throw new Error('别忘记npm install啊老哥')
}
fs.writeFileSync(createTargetPath,createSource,'utf-8');
fs.writeFileSync(tsConfigTargetPath,tsconfigSource,'utf-8');
console.log("===复写create配置-支持类的修饰器完毕===")
console.log("===复写所有配置完毕===")


