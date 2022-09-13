// 校验身份证号码
export const checkCardNo = value => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
// 校验是否为邮箱地址
export const isEmail = value => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
// 校验是否为中国大陆手机号
export const isTel = value => /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());

// 判断是移动还是PC设备
export const isMobile = () => {
  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
  return 'mobile';
  }
  return 'desktop';
}

// 判断是否是苹果还是安卓移动设备
export const isIOS = () => {
  let reg = /iphone|ipod|ipad|Macintosh/i;
  return reg.test(navigator.userAgent.toLowerCase());
}
// 判断是否是安卓移动设备
export const isAndroid = () => {
  return /android/i.test(navigator.userAgent.toLowerCase());
}
// 判断是Windows还是Mac系统
export const osType = () => {
  const agent = navigator.userAgent.toLowerCase();
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
 const isWindows = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
  if (isWindows) {
      return "windows";
  }
  if(isMac){
      return "mac";
  }
}
// 判断是否是微信/QQ内置浏览器
export const broswer = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return "weixin";
  } else if (ua.match(/QQ/i) == "qq") {
      return "QQ";
  }
  return false;
}
// 浏览器型号和版本
export const getExplorerInfo = () => {
  let t = navigator.userAgent.toLowerCase();
  return 0 <= t.indexOf("msie") ? { //ie < 11
      type: "IE",
      version: Number(t.match(/msie ([\d]+)/)[1])
  } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
      type: "IE",
      version: 11
  } : 0 <= t.indexOf("edge") ? {
      type: "Edge",
      version: Number(t.match(/edge\/([\d]+)/)[1])
  } : 0 <= t.indexOf("firefox") ? {
      type: "Firefox",
      version: Number(t.match(/firefox\/([\d]+)/)[1])
  } : 0 <= t.indexOf("chrome") ? {
      type: "Chrome",
      version: Number(t.match(/chrome\/([\d]+)/)[1])
  } : 0 <= t.indexOf("opera") ? {
      type: "Opera",
      version: Number(t.match(/opera.([\d]+)/)[1])
  } : 0 <= t.indexOf("Safari") ? {
      type: "Safari",
      version: Number(t.match(/version\/([\d]+)/)[1])
  } : {
      type: t,
      version: -1
  }
}