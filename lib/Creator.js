const { loading, getRepoInfo } = require("./utils");
const downloadGitRepo = require("download-git-repo");
const fs = require("fs-extra");
const util = require("util");
const chalk = require("chalk");

class Creator {
  // 项目名称及项目路径
  constructor(name, target) {
    this.name = name;
    this.target = target;
    // 转化为 promise 方法
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  // 创建项目部分
  async create() {
    console.log(
      `\r\nCreating a new React app in ${chalk.green(this.target)}\r\n`
    );
    const repo = await getRepoInfo();
    await this.download(repo, "main");
    /* 根据输入信息，改变package.json */
    const fileName = `${this.target}/package.json`;
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName).toString();
      const json = JSON.parse(data);
      json.name = this.name;
      fs.writeFileSync(fileName, JSON.stringify(json, null, "\t"), "utf-8");
    }
    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}\r\n`);
    console.log("  npm install\r\n");
    console.log("  npm start\r\n");
  }
  async download(repo, tag) {
    // 模板下载地址
    const templateUrl = `direct:https://github.com/nolan-cli/${repo}.git#main`;
    // 调用 downloadGitRepo 方法将对应模板下载到指定目录
    await loading(
      "下载模板中，请等待...",
      this.downloadGitRepo,
      templateUrl,
      this.target,
      { clone: true }
    );
  }
}
module.exports = Creator;
