/**
 * 获取URL参数列表
 * @returns { Object }
 */
export const getUrlParams = (isHash = false) => {
  let url = isHash ? location.hash : location.search; //获取url中"?"符后的字串
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
 * 键值对拼接成URL参数
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
/**
 * 修改URL中的参数
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
export const replaceUrlParam = (key, value) => {
  let params = getUrlParams()
  console.log('params', params)
  if (!params[key] || params[key] === value) return
  const oUrl = location.href.toString();
  const re = eval('/(' + key + '=)([^&]*)/gi');
  location.href = oUrl.replace(re, key + '=' + value);
  return location.href;
}
/**
 * 删除URL中指定参数
 * @param {*} name 
 * @returns 
 */
export const deleteUrlParamByKey = (name) => {
  const baseUrl = location.origin + location.pathname + "?";
  const query = location.search.substr(1);
  if (query.indexOf(name) > -1) {
    const obj = {};
    const arr = query.split("&");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    return baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
  }
}