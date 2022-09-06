/**
 * 加法 
 * @param {Number} arg1 加数  
 * @param {Number} arg2 加数
 * @return {Number} 和
 */
 export function ccAdd(arg1, arg2) {
  let r1, r2, m;
  try {
      r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
      r1 = 0;
  }
  try {
      r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
      r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (mxMul(arg1, m) + mxMul(arg2, m)) / m;
}
/**
* 减法
* @param {Number} arg1 被减数  
* @param {Number} arg2 减数 
* @return {Number} 差
*/
export function ccSub(arg1, arg2) {
  let r1, r2, m;
  try {
      r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
      r1 = 0;
  }
  try {
      r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
      r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (mxMul(arg1, m) - mxMul(arg2, m)) / m;
}
/**
* 乘法
* @param {Number} arg1 因数  
* @param {Number} arg2 因数 
* @return {Number} 积
*/
export function ccMul(arg1, arg2) {
  let m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
  try {
      m += s1.split(".")[1].length
  } catch (e) { }
  try {
      m += s2.split(".")[1].length
  } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
/**
* 除法
* @param {Number} arg1 被除数  
* @param {Number} arg2 除数 
* @return {Number} 商
*/
export function ccDiv(arg1, arg2) {
  let t1 = 0,
      t2 = 0,
      r1, r2;
  try {
      t1 = arg1.toString().split(".")[1].length
  } catch (e) { }
  try {
      t2 = arg2.toString().split(".")[1].length
  } catch (e) { }
  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
