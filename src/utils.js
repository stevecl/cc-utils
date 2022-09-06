// 生成指定范围随机数
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// 数组乱序
export const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)
// 复制到剪切板
export const copyToClipboard = (text) => navigator.clipboard?.writeText && navigator.clipboard.writeText(text)
// 生成随机颜色
export const generateRandomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

/**
 * 防抖
 * @param { Function } fn 
 * @param { Number } wait 
 * @returns 
 */
export const debounce = (fn, wait) => {
  let timer = null;
  return function () {
    let context = this,
      args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
/**
 * 节流
 * @param { Function } fn 
 * @param { Number } delay 
 * @returns 
 */
export const throttle = (fn, delay) => {
  let curTime = Date.now();
  return function () {
    let context = this,
      args = arguments,
      nowTime = Date.now();
    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
/**
 * 数据类型判断
 * @param { * } value 
 * @returns { string } 对应数据类型
 */
export const getType = (value) => {
  if (value === null) {
    return value + "";
  }
  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split("");
    type.pop();
    return type.join("").toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}

/**
 * 深拷贝
 * @param {*} obj 
 * @param {*} hash 
 * @returns 
 */
export const deepClone = (obj, hash = new WeakMap()) => {
  // 日期对象直接返回一个新的日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  //正则对象直接返回一个新的正则对象     
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  //如果循环引用,就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // 获取对象所有自身属性的描述
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      cloneObj[key] = deepClone(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj
}

/**
 * 获取uuid字符串
 * @param { Number } len uuid长度
 * @return { String } uuid
 */
 export function uuid(len = 32) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  let cLen = chars.length
  for (let i = 0; i < len; i++) {
    let r = randomNum(0, cLen - 1);
    uuid.push(chars[(i == 19) ? (r & 0x3) | 0x8 : r])
  }
  let uLen = uuid.length
  let timeStr = String(new Date().getTime())
  for (let i = 0; i < timeStr.length; i++) {
    let r = randomNum(0, uLen - 1);
    uuid[r] = timeStr[i]
  }
  return uuid.join('');
}