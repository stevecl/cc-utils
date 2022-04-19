// app.js
import { post } from 'https/index.js'
import { storage, showLoading, hideLoading } from './utils/util'
const animation = require('./utils/animation.js')

let globalData = {
  pageTitle: '朝日超感世界',
  appid: 'wx76b735df0d0477a4',
  openid: '',
  sessionKey: '',
  unionid: '',
  userInfo: null
}

let globalMethods = {
  linkTo (url) {
    if (!url) return console.log('linkTo', url)
    if (/^http[s]:\/\//.test(url)) {
      url = '/pages/webpage/index?url=' + url
      return wx.navigateTo({ url })
    }
    let navList = [
      '/pages/index/index',
      '/pages/lock/index',
      '/pages/guide/index',
      '/pages/user/index',
    ]
    let res = navList.filter(_url => url.includes(_url))[0]
    if (res) {
      wx.switchTab({ url })
    } else {
      wx.navigateTo({ url })
    }
  },
  auth() {
    let userInfo = storage('user')
    if (!userInfo) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
    }
  },
}

let shareConfig = {
  onShareAppMessage(e) {
    return {
      title: '', //	转发标题	当前小程序名称	
      path: '/pages/index/index', //	转发路径	当前页面 path ，必须是以 / 开头的完整路径	
      imageUrl: '', //	自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。	使用默认截图	1.5.0
      promise: '', //	如果该参数存在，则以 resolve 结果为准，如果三秒内不 resolve，分享会使用上面传入的默认参数
    }
  },
  onShareTimeline() {
    return {
      title: '', // 当前小程序名称
      query: '', // 当前页面路径携带的参数
      imageUrl: ''
    }
  }
}

App({
  globalData,
  shareConfig,
  ...animation,
  ...globalMethods,
  onLaunch() {
    // showLoading()
    this.post = post
    // this.checkLogin()
  },

  checkLogin () {
    let session_key = storage('session_key')
    if (session_key) {
      wx.checkSession({
        //session_key 未过期，并且在本生命周期一直有效
        success () {
          hideLoading()
          console.log(222)
        },
        fail () {
          this.login()
        }
      })
    } else {
      this.login()
    }

  },

  login () {
    let _this = this
    wx.login({
      success: res => {
        post('login', {
          jsCode: res.code,
          outkey: this.globalData.appid
        }).then(res => {
          let { openid, sessionKey, unionid } = res
          console.log('res' , res)
          storage('session_key', sessionKey)
          this.globalData.openid = openid
          this.globalData.sessionKey = sessionKey
          this.globalData.unionid = unionid
          wx.navigateTo({ url: '/pages/auth/index' })
        })
      }
    })

  },

  /**
   * 防止多次点击
   * @param {*} fn 
   * @param {*} gapTime 
   */
  repeatBtn(fn, gapTime) {
    gapTime = gapTime || 1500
    let _lastTime = null
    return function () {
      let _nowTime = +new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments)
        _lastTime = _nowTime
      }
    }
  }
})