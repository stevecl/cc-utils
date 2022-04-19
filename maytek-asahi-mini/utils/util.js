const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//展示加载中 动画
let showLoading = txt => wx.showLoading({ title: txt ? txt : '加载中', mask: true, complete() { } })
let hideLoading = () => wx.hideLoading()
let okMsg = (txt, handle) => showToast(txt, 2000, 'success', handle ? true : false, handle);
let failMsg = (txt, handle) => showToast(txt, 5000, 'none', handle ? true : false, handle)

/**
 * 显示短时消息,允许重复弹出多个 不过后续的消息不保证顺序
 * txt 文本
 * time 显示时间 默认 2000 毫秒
 * icon 图标 目前就支持两种 success 和 none
 * mask 是否允许透点默认不允许
 */
let showToast = (txt, time = 2000, icon, mask, handle) => {
  wx.showToast({
    title: txt,
    icon: icon ? icon : 'none',
    mask: mask ? mask : false,
    success() {
      setTimeout(() => {
        handle && hideToast(handle);
      }, time)
    }
  })
}

/**
 * 获取或者设置 本地存储数据 
 * key 只传key 就是 获取数据
 * val 实际值，支持 字符串 或者 json
 * time 从存储成功开始多久过期 不传就是永久保存，传了就会定期清理 单位是 毫秒
 */
let storage = (key, val, time) => {
  if (val) {
    let outTime = new Date().getTime();
    let value = {
      value: val,
      time: time ? outTime + time : 0
    }
    try {
      wx.setStorageSync(key, value)
      return true;
    } catch (e) {
      return false;
    }
  } else {
    let value = wx.getStorageSync(key)
    if (value && (value.time === 0 || new Date().getTime() < value.time)) {
      return value.value
    } else {
      wx.removeStorage({
        key: key
      })
      return null
    }
  }
}


module.exports = {
  formatTime,
  showLoading,
  hideLoading,
  okMsg,
  failMsg,
  storage
}
