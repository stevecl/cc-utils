const app = getApp()
import {
  storage,
  toPage
} from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList: [],
    serialList: ["A", "B", "C", "D"],
    questionIndex: 0, //问题下标
    answerIndex: -1, //答案下标
    visible: false,
    isAnswered: false,
    rightAnswerText: "",
    questionInfo: "",
    finishedList: [],
    ruleText: {}
  },
  handleRepeatFn: app.repeatBtn(function (e) {
    // 答案项下标
    const {
      index
    } = e.currentTarget.dataset
    let {
      questionList
    } = this.data
    let question = questionList[this.data.questionIndex]
    question.answers.forEach((obj, i) => {
      obj.selected = false
      if (obj.isRight) this.setData({
        rightAnswerText: obj.answer
      })
      // i==index点击项设为true   obj.isRight当选择错误时 将正确答案项也设为true
      if (i == index || obj.isRight) obj.selected = true
    })
    this.setData({
      questionList,
      questionInfo: question,
      answerIndex: index
    })
    // 过2秒弹出问题解析
    let timer = setTimeout(() => {
      this.setData({
        isAnswered: true
      })
      clearTimeout(timer)
    }, 1000)
  }, 2000),

  getQuestionList() {
    app.post('questionList', {}).then(res => {
      let {
        rows
      } = res
      this.setData({
        questionList: rows,
        questionInfo: rows[0]
      })
    })
  },
  // 显示规则弹窗
  handleShowRulePop() {
    this.setData({
      visible: true
    })
  },
  close() {
    this.setData({
      visible: false
    })
  },

  // 选择答案
  handleSelectAnswer(e) {
    this.handleRepeatFn(e)
  },
  // 下一题
  handleNextQuestion() {
    let index = this.data.questionIndex + 1
    let isEnd = false
    if (this.data.questionIndex + 2 > this.data.questionList.length) {
      isEnd = true
      index = this.data.questionList.length - 1
    }
    let {
      userCode
    } = JSON.parse(storage('user'))
    // 切换下一题之前保存当前题的选择信息
    let finishedList = this.data.finishedList
    finishedList.push({
      userCode,
      answerCode: this.data.questionInfo.numberCode,
      answer: this.data.serialList[this.data.answerIndex]
    })
    this.setData({
      isAnswered: false,
      questionIndex: index,
      finishedList,
      questionInfo: this.data.questionList[index],
    })
    // 完成答题后提交  新增一条答题记录
    if (isEnd) {
      app.post("answerRecord", finishedList).then(async res => {
        // 获取当前消息是否已订阅
        await app.judgeIsSubscribe("客服消息通知")
        // 调起订阅
        app.subscribe("客服消息通知").then(() => {
          toPage(1, '../index/index')
        })
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getQuestionList()
    var WxParse = require('../../wxParse/wxParse');
    let ruleText = await app.getConfigData('asahi.system.ccg')
    ruleText = ruleText&&JSON.parse(ruleText)
    this.setData({
      ruleText
    })
    var that = this;
    // 格式：WxParse.wxParse(参数1, 参数2, 参数3, 参数4, 参数5);
    // 参数说明：
    // * 参数1.bindName绑定的数据名(必填)
    // * 参数2.type可以为html或者md(必填)
    // * 参数3.data为传入的具体数据(必填)
    // * 参数4.target为Page对象,一般为this(必填)
    // * 参数5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    WxParse.wxParse('ruleText', 'html', ruleText, that, 5);
  }
})