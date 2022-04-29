// index.js
// 获取应用实例
import { storage } from '../../utils/util'
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
      videoUrl: ''
    },
    userInfo: {}
  },

  toPage (e) {
    let { status = 0, link } = e.currentTarget.dataset
    console.log(status, link)
    if (link === '/pages/index/video') {
      storage('video_url', this.data.pageConfig.videoUrl)
      storage('video_status', status)
      app.linkTo(link)
    } else {
      status === 0 && app.linkTo(link)
    }
  },

  onLoad(params) {
    const msg = decodeURIComponent(JSON.stringify(params))
    // let channelId = JSON.parse(msg).q.replace(/.*\=/, '')
    // app.post('updateChannl', { openid: app.globalData.userInfo.openid, channelId })
  },
  async onShow () {
    this.init()
    let resText = await app.getConfigData()
    let { ccg, slide, taste, ticket, video } = JSON.parse(resText)
    console.log('JSON.parse(resText)', JSON.parse(resText))
    this.setData({ pageConfig: {
      slide,
      ccg: ccg[0],
      taste: taste[0],
      ticket: ticket[0],
      video: video[0],
      videoUrl: video[1].image
    } })
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
