#!/usr/bin/env node
'use strict';

var inquirer = require("inquirer");
var lazySmart = require("./lazy-smart");
var shell = require("shelljs");

var questions = [

  // 项目名称
  {
    type: "input",
    name: "name",
    message: "please input your project name",
    validate: function (value) {

      if (!value) {
        return "project name can not be null"
      }

      // 检查文件夹是否已存在
      var ls = shell.ls();
      if (ls.indexOf(value) !== -1) {
        return "File exists, please select another project name.."
      } else {
        return true;
      }
    }
  },

  // 选择项目架构类型
  {
    type: "list",
    name: "architecture",
    message: "please select your project architecture",
    choices: ["ejs+gulp", "ejs+webpack"]
  },

  // git仓库名称
  {
    type: "input",
    name: "gitName",
    message: "please input the project name of git.(the same as project name if ignore this)",
    default: function (answer) {
      return answer.name;
    }
  },

  // git仓库所有者名称
  {
    type: "input",
    name: "gitOwner",
    message: "please input the owner of the git project.such as 'zhike', 'o2o', '[your name]' ... (default is your name)",
    default: function () {
      var userName = shell.exec('git config --global --get user.name').output;
      userName = userName.substring(0, userName.length - 1);
      return userName;
    }
  }


];

inquirer.prompt(questions, function (answers) {
  lazySmart.init(answers);
});
