const app = getApp()

import { uploadState,awardState,awardSource} from "../../utils/enum"
import { toPage,storage } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0,
    recordState:{
      upload:uploadState,// 上传记录类型
      award:awardState// 抽奖记录类型
    },
    tabList:[
      {text:"上传记录",value:"upload"},
      {text:"抽奖记录",value:"award"}
    ],
    queryType:"-999",
    tabType:"",//upload上传 award抽奖
    recordList:[],
    onlinePopVisible:false,//实物填写收获地址弹窗
    address:"",
    channelList:[],
    awardSource,
    numberCode:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async getChannelList () {
    let channelList = await app.post('channelTypeList')
    this.setData({ channelList })
  },
  handleChangeType(e){
    let {queryType} = e.currentTarget.dataset
    this.setData({queryType})
    this.getList()
  },
  setTabType(info){
    let {tabType} = info
    this.setData({recordList:[], tabType,queryType:"-999"})
    this.getList()
  },
  handleChangeTab(e){
    this.setTabType(e.currentTarget.dataset)
  },
  async getList(){
    if(!app.globalData.userInfo)return
    let { userCode,openid,nickName } = app.globalData.userInfo
    let api = "getUploadList"
    let params = {},
        flag = this.data.tabType == "award"
    if(flag){
      api = "getRecordListByState"
      params.userCode = userCode
      params.state = this.data.queryType == "-999"?"":this.data.queryType
    }else{
      params.openid = openid;
      params.nickName = nickName
      params.isDiscern = this.data.queryType == "-999"?"":this.data.queryType
    }
    app.post(api,params).then(res=>{
      let {rows,total} = res
      this.setData({ recordList:rows})
    })
  },
  // 记录详情
  handleRecordDetail(e){
    // 上传记录无详情
    if(this.data.tabType == "upload")return
    let {index} = e.currentTarget.dataset
    let {type,address,numberCode} = this.data.recordList[index]
    // type 0-谢谢参与,1-现金红包,2-实物赠品
    if(type == 1){
      // 领取红包
      let url = "../receive/index"
      toPage(2,url)
    }else if(type == 2){
      // 实物收货地址弹窗
      if(!address){
        this.setData({numberCode})
        this.setData({onlinePopVisible:true})
      }else{
        let url = "../recordDetail/index?numberCode="+numberCode
        toPage(2,url)
      }
      
    }
  },
  // 关闭收获地址弹窗
  close(){
    this.setData({onlinePopVisible:false})
  },
  showPic(e){
    let {url} = e.currentTarget.dataset
    wx.previewImage({
      urls: [url],
  })
  },
  // 收获地址提交后要打开的页面
  handleToPage(){
    this.handleRecordDetail()
  },
  onLoad: function (options) {
    // 获取渠道类型
    this.getChannelList()
    // 个人中心跳转带有类型 
    this.setTabType(options)
  },
})