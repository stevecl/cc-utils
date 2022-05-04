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
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        // context.scale(dpr, dpr)
        const circle = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 180
        }
        console.log('ctx', context, circle)
        // canvas.setFontSize(40)
        // 矩形pink和矩形orange之间相隔20px
        // context.translate(200 + Math.cos(60) * 50, 200 + Math.sin(60) * 100);
        // context.rotate(30);
        context.fillStyle = "white"
				context.font="26px sans-serif"
        context.fillText("撒大声地", circle.x, circle.y);
        // return
        // 1.6 0 3.2
        let string = '撒大程序没能力肯定积分克里斯多夫',
        startAngle = Math.PI*2+Math.PI/2, endAngle = Math.PI/8+Math.PI/2,  angle = 4.8, index = 0, character = '',
        angleDecrement = (startAngle - endAngle) / (40 - 1)
        console.log('angleDecrement', angleDecrement)
        let radius = circle.radius

        while(index < string.length){
          //获取传入的字符串的每个字符
          character = string.charAt(index);
          context.save();
          context.beginPath();
          //位移到每个字符的指定位置
          context.translate(circle.x+Math.cos(angle)*radius,circle.y - Math.sin(angle)*radius);
          console.log('angle', angle)

          //旋转坐标系到每个字符应该达到到角度
          context.rotate(Math.PI/2 - angle);
          context.fillText(character,0,0);
          context.strokeText(character,0,0);
          //角度递减
          angle -= angleDecrement;
          index++;
          context.restore();
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