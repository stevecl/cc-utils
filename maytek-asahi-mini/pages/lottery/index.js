// pages/lottery/index.js
const app = getApp()

let events = {
  start () {
    // wx.navigateTo({ url: '/pages/lottery/result' })
    let userCode = app.globalData.userInfo.userCode
    app.post('getToken', { userCode: '2e999e0990064b6585fd2a104cc222ac' })
  },
  changeRuleVisible () {
    this.setData({ ruleShow: !this.data.ruleShow })
  },
}

Page({
  ...events,
  /**
   * 页面的初始数据
   */
  data: {
    ruleShow: false,
    ruleText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // app.post('http://192.168.50.149/dev-api/user/userLogin/getConfigCache')
    wx.createSelectorQuery()
      .select('#canvas')
      .fields({ node: true, size: true })
      .exec(async (res) => {     //async 和 await 成对出现
        const canvas = res[0].node;
        const context = canvas.getContext('2d');
        console.log('ctx', context)
        // canvas.setFontSize(40)
      })
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