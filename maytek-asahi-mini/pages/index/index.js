// index.js
// 获取应用实例
const app = getApp()

let methods = {
  async init () {
    let phone = app.globalData.userInfo?.phone
    if (!phone) return
    app.post('queryUserVo', { phone }).then(res => {
      let userInfo = res.rows[0]
      userInfo.lotteryNum = userInfo.userMember.lotteryCount - userInfo.userMember.lotteryUse
      this.setData({ userInfo })
    })

  }
}

Page({
  ...methods,
  data: {
    pageConfig: {
      slide: [],
      taste: {}, // 场景体验  ,
      ticket: {}, // 小票上传,
      ccg: {}, // 答题,
      video: {}, // 适配
    },
    userInfo: {}
  },

  toPage (e) {
    let { link } = e.currentTarget.dataset
    app.linkTo(link)
  },

  onLoad(params) {
    this.init()
    const msg = decodeURIComponent(JSON.stringify(params))
    // let channelId = JSON.parse(msg).q.replace(/.*\=/, '')
    // app.post('updateChannl', { openid: app.globalData.userInfo.openid, channelId })
  },
  async onShow () {
    let resText = await app.getConfigData()
    this.setData({ pageConfig: JSON.parse(resText) })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
})
