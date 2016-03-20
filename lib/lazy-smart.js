// 调用执行命令行
var shell = require("shelljs");

// 支持在脚本中直接执行命令
require('shelljs/global');

// 解析获取命令行参数
var argv = require('yargs').argv;


// 初始化
exports.init = function (options) {

  exports.copy(options);
  exports.install(options);
  exports.build(options);
  exports.initGit(options);
  exports.run(options);

};

// 复制文件
exports.copy = function (options) {
  mkdir(options.name);
  console.log('create folder successfully!');

  cd(options.name);

  console.log('copying....please wait a while....');
  // 正式环境使用
  //cp('-r', process.argv[1] + '/src/' + options.architecture + '/.', shell.pwd());
  //本地调试使用
  cp('-r', '/Users/youngwind/www/lazy-smart/src/' + options.architecture + '/.', shell.pwd());
  console.log("copy done!");
};

// 装包
exports.install = function (options) {
  console.log('start install npm package and bower package');
  shell.exec("npm install & bower install");
  console.log('package install done!');
};

// 构建项目,有gulp和wenpack两种
exports.build = function (options) {
  console.log('start building...');
  if (options.architecture === "ejs+gulp") {
    shell.exec("gulp");
  } else {
    shell.exec("webpack");
  }
  console.log('build done!');
};

// 初始化git
exports.initGit = function (options) {
  "\nsrc/common/config.js\n".toEnd('./.gitignore');
  shell.exec("git init && git add . && git commit -m 'first commit'");
  shell.exec("git remote add origin git@code.smartstudy.com:" + options.gitOwner + "/" + options.gitName + ".git");
  shell.exec("git push -u origin master");
  console.log('init git done!')
};

// 运行
exports.run = function (options) {
  console.log('project initialize done! please follow the readme.md.')
};
