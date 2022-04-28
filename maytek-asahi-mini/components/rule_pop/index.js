
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    width: {
      type: String,
      value: '80%'
    },
    height: {
      type: String,
      value: '80%'
    },
    // popType 类型不同 控制文字
    popType: {
      type: String,
      value: 'rule'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible:false
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
