// pages/answer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerList:[
      {title:"朝日啤酒成立于哪一年？",resultList:[
        {title:1877,isRight:true},
        {title:1827,isRight:false},
        {title:1817,isRight:false},
        {title:1807,isRight:false},
      ]},
      {title:"朝日啤酒成立于哪一年？"},
    ],
    serialList:["A","B","C","D"],
    currentIndex:1,
    answerIndex:null,
    rightAnswer:false,
    visible:false
  },
  // 显示规则弹窗
  handleShowRulePop(){
    // this.selectComponent("#answerRulePop").showPop();
    this.setData({visible:true})
  },
  close(){
    this.setData({visible:false})

  },
  // 选择答案
  handleSelectAnswer(e){  
    const {item} = e.currentTarget.dataset
    console.log(item)
    if(item.isRight)this.setData({rightAnswer:true})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
})