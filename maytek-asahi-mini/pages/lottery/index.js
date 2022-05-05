// pages/lottery/index.js
const app = getApp()

// 旋转一圈时间 、 计时刻度
const CIRCLETIME = 600, ONETIME = 100 
let CURRENTROTATETIME = 0 // 动画已开始时间
let ROTATEENDTIME = null // 动画结束时间
let rotateTask = null, timerTask = null 

let events = {
  start () {
    console.log('start')
    this.startRotate()
    rotateTask = setInterval(() => {
      this.startRotate()
    }, CIRCLETIME)
    // wx.navigateTo({ url: '/pages/lottery/result' })
    // let userCode = app.globalData.userInfo.userCode
    // app.post('getToken', { userCode: '2e999e0990064b6585fd2a104cc222ac' })
  },

  startRotate (index = 0, timingFunction = 'linear') {
    if (!timerTask) {
      timerTask = setInterval(() => {
        CURRENTROTATETIME += 100
        this.setData({
          currentIndex: CURRENTROTATETIME % 600 / 100
        })
        if (ROTATEENDTIME && CURRENTROTATETIME >= ROTATEENDTIME) { // 动画结束时间
          clearInterval(timerTask)
          timerTask = null
        }
      }, 100)
    }
    ROTATEENDTIME = index ? CURRENTROTATETIME + 100 * index : null // 动画结束时间
    this.data.rotateDeg += 360 + 60 * index
    var animation = wx.createAnimation({ duration: CIRCLETIME, timingFunction });
    animation.rotateZ(this.data.rotateDeg).step()
    //设置动画
    this.setData({
      rotate: animation.export()
    })
  },

  changeRuleVisible () {
    this.setData({ ruleShow: !this.data.ruleShow })
  },

  endHandle () {
    console.log('endHandle')
  }
}

Page({
  ...events,
  /**
   * 页面的初始数据
   */
  data: {
    ruleShow: false,
    ruleText: '',
    rotate: null,
    rotateDeg: 0, // animation 旋转角度
    currentIndex: 0, // 当前高亮奖品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // app.post('http://192.168.50.149/dev-api/user/userLogin/getConfigCache')
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