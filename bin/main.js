#! /usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const version = require("../package.json").version;
const create = require("../lib/create");

/**
 * 设置脚手架名称、用法提示、版本号
 */
program.name("nolan-cli").usage(`<command> [option]`).version(version);

/**
 * 优化 --help 命令
 */
program.on("--help", function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "nolan-cli <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

/**
 * 新建 create 命令
 */
program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action((projectName, options) => {
    // 处理用户输入 create 指令附加的参数
    // 引入 create 模块，并传入参数
    create(projectName, options);
  });

/**
 * 解析用户执行时输入的参数
 * process.argv 是 nodejs 提供的属性
 * 放在最后
 */
program.parse(process.argv);
