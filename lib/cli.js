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
    message: "input your project name",
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
    message: "select your project architecture",
    choices: ["ejs+gulp", "ejs+webpack"]
  },

  // git仓库名称
  {
    type: "input",
    name: "gitName",
    message: "input the repository name of git project.(make sure the repository is created and empty)",
    default: function (answer) {
      return answer.name;
    }
  },

  // git仓库所有者名称
  {
    type: "input",
    name: "gitOwner",
    message: "input the owner of git project.",
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
