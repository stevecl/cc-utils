// pages/me/index.js
const App = getApp();
import { storage, toPage } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  handleToPage(e){
    const {type} = e.currentTarget.dataset
    let url = "../record/index?tabType="+type
    toPage(2,url)
  },
  // 查看须知
  handleNotice(){
    toPage(2,'../auth/content')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = App.globalData.userInfo
    this.setData({userInfo})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      navHeight: App.globalData.navigationBarHeight,
      statusBarHeight: App.globalData.statusBarHeight
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})