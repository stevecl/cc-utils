/**
 * @function 格式化时间
 * @param {*} formater 
 * @param {*} time 
 * @returns 
 */
export const dateFormater = (formater, time) => {
  let date = time ? new Date(time) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}

/**
 * @function 获取某个日期位于当年的第几天
 * @param { * } date 
 * @return { Number } 天数
 */
export const dayOfYear = (date) => {
  const ONEDAY = 1000 * 60 * 60 * 24
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / ONEDAY)
}