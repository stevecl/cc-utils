/**
 * @function 获取URL参数列表
 * @returns { Object }
 */
export const getUrlParams = (isHash = false) => {
  let url = isHash ? location.hash : location.search; //获取url中"?"符后的字串
  url = decodeURIComponent(url)
  let theRequest = {};
  if (url.indexOf("?") != -1) {
    let str = url.substr(url.indexOf("?") + 1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};

/**
 * @function 键值对拼接成URL参数
 * @param {*} obj 
 * @returns 
 */
export const params2Url = (obj) => {
  let params = []
  for (let key in obj) {
    params.push(`${key}=${obj[key]}`);
  }
  return encodeURIComponent(params.join('&'))
}