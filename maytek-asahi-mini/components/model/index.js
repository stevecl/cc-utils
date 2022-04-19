// components/model/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached: function () {
      app.animationOpacity(this, 'slide_up2', 1, 500)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close () {
      this.triggerEvent('close')
    }
  }
})
