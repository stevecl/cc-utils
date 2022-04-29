const app  = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ruleText:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await app.getRuleText("asahi.system.user")
    this.setData({ruleText:app.globalData.ruleText.nodes})
  },
})