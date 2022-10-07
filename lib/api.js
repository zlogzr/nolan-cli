const axios = require("axios");
// 拦截全局请求响应
axios.interceptors.response.use((res) => {
  return res.data;
});
/**
 * 获取模板
 * @returns Promise 仓库信息
 */
async function getNolanRepo() {
  return axios.get("https://api.github.com/orgs/nolan-cli/repos");
}
/**
 * 获取仓库下的版本
 * @param {string} repo 模板名称
 * @returns Promise 版本信息
 */
async function getTagsByRepo(repo) {
  return axios.get(`https://api.github.com/repos/nolan-cli/${repo}/tags`);
}
module.exports = {
  getNolanRepo,
  getTagsByRepo,
};
