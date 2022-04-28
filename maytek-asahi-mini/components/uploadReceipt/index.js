// components/uploadReceipt/index.js
const app = getApp()
Component({
  lifetimes: {
    attached: function() {
      this.init()
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    sourceTypeList: [],
    uploadImageUrl: '',
    sourceType: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async init () {
      let sourceTypeList = await app.post('channelTypeList')
      this.setData({ sourceTypeList })
    },
    close () {
      this.triggerEvent('close')
    },
    
    selectType (e) {
      this.setData({ sourceType: e.currentTarget.dataset.type })
    },

    selectImage () {
      let _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          console.log('res', res)
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          _this.setData({
            uploadImageUrl: tempFilePaths[0]
          })
        }
      })
    },

    previewImage () {
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [ this.data.uploadImageUrl ] // 需要预览的图片http链接列表
      })
    },

    submit () {
      let { openid, nickName } = app.globalData.userInfo
      this.triggerEvent('submit', {
        filePath: this.data.uploadImageUrl,
        formData: { openid, nickName, channel: this.data.sourceType }
      })
    }
  }
})
