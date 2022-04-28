import {
  failMsg,
  okMsg
} from "../../utils/util"

// components/receive_addr/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    code: {
      type: String,
      value: ""
    }
  },
  observers: {
    show(val) {
      if (val) {
        // 显示弹出框之前 给textarea渲染初始值，再置空 样式才生效
        this.setData({
          addressInfo: {
            address: ""
          }
        })
        let timer = setTimeout(() => {
          this.setData({
            addressInfo: {}
          })
          clearTimeout(timer)
        }, 50)
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    addressInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent('close')
    },
    async handleSubmit() {
      let _this = this
      if (!this.data.addressInfo.consignee) return failMsg("请填写收件人姓名")
      if (!this.data.addressInfo.telephone) return failMsg("请填写收件人手机号")
      if (!this.data.addressInfo.address) return failMsg("请填写收件地址")
      // 获取当前消息是否已订阅
      await app.judgeIsSubscribe("客服消息通知")
      app.subscribe("订单发货提醒").then(() => {
        _this.data.addressInfo.numberCode = _this.data.code
        app.post("rewardReceiving", _this.data.addressInfo).then(res => {
          okMsg("提交成功")
          // 关闭弹窗
          _this.triggerEvent('close')
          // 刷新调起收货地址页面的数据
          _this.triggerEvent('getList')
          // 提交收获地址后要打开哪个页面
          _this.triggerEvent('handleToPage')

        })
      })
    },
    onChange(e) {
      // e.detail.value input 的 value
      // e.currentTarget.dataset.prop  data-prop 绑定的字符串，以此来确定改变的是哪个变量
      console.log(this.data.code, 'code')
      let prop = e.currentTarget.dataset.prop
      let info = this.data.addressInfo
      info[prop] = e.detail.value
      this.setData({
        addressInfo: info
      })
    },
  }
})