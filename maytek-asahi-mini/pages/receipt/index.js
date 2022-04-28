// pages/receipt/index.js
const app = getApp()

let events = {
  changeUploadVisible () {
    this.setData({ uploadDialog: !this.data.uploadDialog })
  },
  changeRuleVisible () {
    this.setData({ ruleShow: !this.data.ruleShow })
  },
  changeStatusOfLine () {
    this.setData({ currentIsOnline: !this.data.currentIsOnline })
  },

  submitHandle (e) {
    wx.navigateTo({
      url: '/pages/receipt/result',
      success: res => {
        res.eventChannel.emit('acceptDatas', e.detail)
      }
    })
  }
}
Page({
  ...events,
  /**
   * 页面的初始数据
   */
  data: {
    rotate: {},
    maxUploadSize: 4 * 1024 * 1024,
    uploadDialog: false,
    ruleShow: false,
    currentIsOnline: true,
    ruleText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    var WxParse = require('../../wxParse/wxParse');
    let ruleText = await app.getConfigData('asahi.system.ticket')
    ruleText = ruleText&&JSON.parse(ruleText)
    var that = this;
    WxParse.wxParse('ruleText', 'html', ruleText, that, 5);
  },

  end () {
    console.log('end')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})