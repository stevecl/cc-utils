// app.js
import {
  post
} from 'https/index.js'
import {
  storage,
  showLoading,
  hideLoading
} from './utils/util'
const animation = require('./utils/animation.js')

let globalData = {
  pageTitle: '朝日超感世界',
  appid: 'wx76b735df0d0477a4',
  sessionKey: '',
  unionid: '',
  userInfo: null,
  temps: [],
  isSubscribe:false
}

let globalMethods = {
  /**
   * 获取首页配置信息及各活动规则内容
   * @param {String} key 
   *    asahi.system.taste 场景体验说明,
   *    asahi.system.ticket 幻灯片说明
   *    asahi.system.ticket  小票上传说明,
   *    asahi.system.ccg 答题说明,
   *    asahi.system.video  视频说明
   *    asahi.system.draw 抽奖说明
   *    asahi.system.user 用户协议
   */
  getConfigData (key = '') {
    return new Promise((resolve, reject) => {
      let params = key ? { key } : null
      post('getConfigCache', params).then(res => {
        resolve(res.keyValue)
      })
    })
  },

  linkTo (url) {
    if (!url) return console.log('linkTo', url)
    let navList = [
      '/pages/index/index',
      '/pages/receipt/index',
      '/pages/lottery/index',
      '/pages/me/index',
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

  back(param = {}) {
    param = {
      ...{
        delta: 1
      },
      ...param
    }
    wx.navigateBack(param)
  },
  getRuleText(type){
    var that = this;
    return new Promise(async(resolve,reject)=>{
      // 格式：WxParse.wxParse(参数1, 参数2, 参数3, 参数4, 参数5);
      // 参数说明：
      // * 参数1.bindName绑定的数据名(必填)
      // * 参数2.type可以为html或者md(必填)
      // * 参数3.data为传入的具体数据(必填)
      // * 参数4.target为Page对象,一般为this(必填)
      // * 参数5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
      var WxParse = require('./wxParse/wxParse');
      let ruleText = await this.getConfigData(type)
      ruleText = ruleText&&JSON.parse(ruleText)
      WxParse.wxParse('ruleText', 'html', ruleText, that, 5);
      resolve()
    })
  }
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
    showLoading()
    this.post = post
    this.checkLogin()
    this.getStateHeight()
    this.getTempId()
  },
  queryUserVo(){
    let phone = this.globalData.userInfo?.phone
    if (!phone) return
    post('queryUserVo', { phone }).then(res => {
      let {lotteryCount,lotteryUse} = res.rows[0]?.userMember
      this.globalData.userInfo.lotteryNum = lotteryCount - lotteryUse
    })
  },
  
  checkLogin () {
    let session_key = storage('session_key')
    
    if (session_key) {
      this.globalData.userInfo = JSON.parse(storage('user'))
      this.queryUserVo()
      wx.checkSession({
        //session_key 未过期，并且在本生命周期一直有效
        success () {
          hideLoading()
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
    wx.login({
      success: res => {
        post('login', {
          jsCode: res.code,
          id: '',
          outkey: this.globalData.appid
        }).then(res => {
          let { openid, sessionKey, unionid } = res
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
  },

  //  获取状态栏信息
  getStateHeight() {
    let statusBarHeight = 0; //  接收状态栏高度
    let rightBtnInfo = wx.getMenuButtonBoundingClientRect()
    let navHeight = rightBtnInfo.height; //  获取胶囊高度
    let top = 0;
    wx.getSystemInfo({
      success(res) {
        statusBarHeight = res.statusBarHeight;
      }
    })
    top = wx.getMenuButtonBoundingClientRect().top - statusBarHeight; //  获取top值
    this.globalData.navHeight = navHeight + top * 2
    this.globalData.statusBarHeight = statusBarHeight
    // 导航栏高度
    this.globalData.navigationBarHeight = (rightBtnInfo.top - statusBarHeight) * 2 + rightBtnInfo.height
  },
  // 获取订阅消息模板
  getTempId() {
    post("getConfigCache", {
      key: "asahi.system.template"
    }).then(res => {
      let temps = res.keyValue && JSON.parse(res.keyValue).template
      this.globalData.temps = temps
    })
  },
  // 是否订阅
  judgeIsSubscribe(val) {
    return new Promise((resolve,reject)=>{
      var _this = this
      this.globalData.isSubscribe = false
      //判断是否已经订阅 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息
      wx.getSetting({
        withSubscriptions: true,
        success(res) {
          let setting = res.subscriptionsSetting
          let id = _this.globalData.temps.filter(item => item.title == val)[0]?.id
          _this.globalData.tmplIds = id
          if (setting.mainSwitch) {
            // setting.itemSettings 选择总是保持以上选择 才会有值
            if (setting.itemSettings != null) {
              _this.globalData.isSubscribe = setting.itemSettings[id]?true:false
            }
          }
          resolve(_this.globalData.isSubscribe)
        }
      })
    })
  },
  // 订阅
  // val需要订阅的模板中文字 在全局temps可查看
  subscribe(val) {
    let _this = this
    return new Promise((resolve, reject) => {
      // 当前订阅id在setting中有值 则代表已授权“总是保持以上选择”
      if (this.globalData.isSubscribe) {
        console.log("总是保持以上选择")
        resolve()
        return
      }
      // 用户未开启订阅 则调起订阅
      wx.requestSubscribeMessage({
        tmplIds:[_this.globalData.tmplIds],
        complete(res) {
          // 更新用户的订阅
          console.log("订阅 complete")
          _this.judgeIsSubscribe(val)
          resolve()
        }
      })
    })
  }
})