import { awardState,awardSource } from "../../utils/enum"
import { getUrl } from '../../https/index'

import {
  okMsg,
  storage
} from "../../utils/util"

const app = getApp()
let methods={
  changeUploadVisible () {
    this.setData({ uploadDialog: !this.data.uploadDialog })
  },
  submitHandle (e) {
    this.changeUploadVisible()
    this.handleUploadImg(e)
  },
  handleUploadImg(e){
    let _this = this
    let { formData, filePath } = e.detail
    wx.uploadFile({
      url: getUrl('uploadImage'), //仅为示例，非真实的接口地址
      filePath,
      name: 'file',
      formData,
      success (res){
        const data = res.data
        _this.getInfo()
      }
    })
  },
  async getChannelList () {
    let channelList = await app.post('channelTypeList')
    this.setData({ channelList })
  },
  // 订阅
  handleSubscribe() {
    app.subscribe("审核结果通知").then(()=>{
      this.getInfo()
    })
  },
  handleCopy() {
    let text = this.data.recordInfo.courierNnumber;
    wx.setClipboardData({
      data: text,
      success: function (res) {
        okMsg("复制成功")
      },
      fail:function(res){
        okMsg("复制失败")
      }
    })
  },
  showPic(e){
    let {url} = e.currentTarget.dataset
    wx.previewImage({
      urls: [url],
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getInfo(){
    app.post("recordGetByCode",{numberCode:this.data.numberCode}).then(res=>{
      this.setData({
        recordInfo:res
      })
    })
  },
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recordInfo: {},
    isSubscribe: false, //是否订阅
    awardState,
    awardSource,
    channelList:[],
    uploadDialog: false,
    numberCode:""
  },
  ...methods,
  onLoad: async function (options) {
    let {numberCode} = options
    this.setData({numberCode})
    // 当前页面是否订阅过  显示预约提醒按钮
    let flag = await app.judgeIsSubscribe("审核结果通知")
    this.setData({isSubscribe:flag})
    this.getInfo()
    this.getChannelList()
  }
})