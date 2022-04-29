const { storage } = require('../../utils/util')

// pages/index/video.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ruleShow: false,
    statusShow: false,
    taskIsComplete: false,
    ruleText: '',
    videoUrl: '',
  },

  toActivity () {
    wx.navigateTo({ url: '/pages/lottery/index' })
  },

  endHandler () {
    console.log('播放结束', app.globalData.userInfo.userCode)
    app.post('record', {
      userCode: app.globalData.userInfo.userCode, // 用户userCode
      type: 3, //  抽奖来源 0-场景体验,1-答题,2-上传小票,3-视频浏览
      ticketNumberCode: '' // 抽奖来源编号，只有当来源是小票的时候才传值
    }).then(res => {
      this.setData({
        ruleShow: false,
        taskIsComplete: true,
        statusShow: true
      })
    })
  },

  close () {
    this.setData({ statusShow: false })
  },

  changeRuleVisible () {
    this.setData({ ruleShow: !this.data.ruleShow })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log('video', options)
    var WxParse = require('../../wxParse/wxParse');
    let ruleText = await app.getConfigData('asahi.system.video')
    ruleText = ruleText && JSON.parse(ruleText)
    var that = this;
    WxParse.wxParse('ruleText', 'html', ruleText, that, 5);
    await app.getRuleText("asahi.system.video")
    this.setData({ruleText:app.globalData.ruleText.nodes})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let videoUrl = storage('video_url')
    let status = storage('video_status')
    this.setData({ videoUrl, taskIsComplete: status == 0 })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})