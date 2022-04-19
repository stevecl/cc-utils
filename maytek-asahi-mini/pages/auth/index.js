// pages/auth/index.js
import { storage } from '../../utils/util'
var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js')
const app = getApp()

let methods = {
  toDetail () {
    wx.navigateTo({
      url: '/pages/auth/content',
    })
  },
  checkboxChange(e) {
    this.setData({
      isAgree: !!e.detail.value[0]
    })
  },

  alertHandle () {
    wx.showToast({
      title: '请勾选阅读协议',
      icon: 'none',
      duration: 2000
    })
  },

  checkStatus () {
    let { userInfo, encryptedData, iv } = this.data
    if (userInfo && encryptedData) {
      let { avatarUrl: headimgurl, city, country, province, gender: sex, language, nickName: nickname } = userInfo
      let { appid: openAppid, sessionKey: session_key, unionid, openid } = app.globalData
      let param = { city, country, province, headimgurl, nickname, sex, openAppid, session_key, unionid, openid, encryptedData, iv, mallName: "志驿互动" }
      return console.log('this.data', this.data, param)
      app.post('login', {
        userInfo: JSON.stringify(param)
      }).then(res => {
        console.log('res', res)
        let { possessor, userCode } = res
        let user = {
          nickname,
          headimgurl,
          country,
          province,
          city,
          sex,
          possessor,
          userCode,
          phone: this.data.phone
        }
        console.log('user', user)
        storage('user', JSON.stringify(user))

        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]; //上一页面
        if(prevPage.route === "activity/pages/skyLight/skyLight"){
          if (prevPage.onLoad) {
            prevPage.onLoad({ loginStatus: "ok" })
          }
        }
        app.back()
      })
    }
  },

  getPhoneNumber (e) {
    let { encryptedData, iv } = e.detail
    let { appid, sessionKey } = app.globalData
    var pc = new WXBizDataCrypt(appid, sessionKey)
    var data = pc.decryptData(encryptedData , iv)
    this.setData({
      encryptedData: encodeURIComponent(encryptedData),
      iv,
      phone: data.purePhoneNumber,
      countryCode: data.countryCode
    })
    this.checkStatus()
    // console.log('res55',this.data.pc.decryptData(encryptedData , iv))
  },


  getUser: app.repeatBtn(function() {
    console.log('getUser')
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({ userInfo: res.userInfo })
        this.checkStatus()
        // app.back()
      },
      fail: res => {
        console.log('rereee', res)
      }
    })
  }, 1000) ,
}

Page({
  ...methods,
  /**
   * 页面的初始数据
   */
  data: {
    pc: '',
    isAgree: false,
    userInfo: null,
    encryptedData: '',
    iv: '',
    phone: '',
    countryCode: '',
  },
  onShow () { },
})