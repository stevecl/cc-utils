// pages/receipt/result.js
import { getUrl } from '../../https/index'
const app = getApp()

let methods = {
  destroyLoading () {
    this.data.timerTask && clearInterval(this.data.timerTask)
  }
}

Page({
  ...methods,
  /**
   * 页面的初始数据
   */
  data: {
    status: 'waiting', // success fail
    rotate: null,
    timerTask: null
  },

  clickHandle () {
    app.linkTo('/pages/lottery/index')
  },

  back () {
    app.back()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('acceptDatas', data => {
    //   this.init(data)
    // })
    var animation = wx.createAnimation({ duration: 1000, timingFunction: 'linear' });
    let num = 360
    animation.rotateZ(num).step()
    this.setData({ rotate: animation.export() })
    this.data.timerTask = setInterval(() => {
      num += 360
      animation.rotateZ(num).step()
      this.setData({ rotate: animation.export() })
    }, 1000)
  },

  init (params) {
    let { formData, filePath } = params
    let _this = this
    wx.uploadFile({
      url: getUrl('uploadImage'), //仅为示例，非真实的接口地址
      filePath,
      name: 'file',
      formData,
      success (res){
        const result = JSON.parse(res.data)
        let isSuccess = result.code === 200 && result.url
        _this.setData({ status: isSuccess ? 'success' : 'fail' })
      },
      fail (err) {
        _this.setData({ status: 'fail' })
      }
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
    this.destroyLoading()
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