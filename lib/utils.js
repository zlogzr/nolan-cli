const ora = require("ora");
const Inquirer = require("inquirer");

const { getNolanRepo, getTagsByRepo } = require("./api");

/**
 * loading加载效果
 * @param {String} message 加载信息
 * @param {Function} fn 加载函数
 * @param {List} args fn 函数执行的参数
 * @returns 异步调用返回值
 */
async function loading(message, fn, ...args) {
  const spinner = ora(message);
  spinner.start(); // 开启加载
  try {
    await fn(...args);
    spinner.stop();
  } catch (error) {
    spinner.fail("request fail, 下载模板失败");
  }
}

// 获取模板信息及用户最终选择的模板
async function getRepoInfo() {
  // 获取组织下的仓库信息
  const repoList = await getNolanRepo();
  if (repoList?.length === 0) return;
  // 提取仓库名
  const repos = repoList.map((item) => item.name);
  // 选取模板信息
  let { repo } = await new Inquirer.prompt([
    {
      name: "repo",
      type: "list",
      message: "Please choose a template",
      choices: repos,
    },
  ]);
  return repo;
}

// 获取版本信息及用户选择的版本
async function getTagInfo(repo) {
  const tagList = await getTagsByRepo(repo);
  if (tagList?.length === 0) return;
  const tags = tagList.map((item) => item.name);
  // 选取模板信息
  let { tag } = await new Inquirer.prompt([
    {
      name: "repo",
      type: "list",
      message: "Please choose a version",
      choices: tags,
    },
  ]);
  return tag;
}

module.exports = {
  loading,
  getRepoInfo,
  getTagInfo,
};
