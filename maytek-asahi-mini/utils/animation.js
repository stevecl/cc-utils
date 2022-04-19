function animationOpacity (that, param, opacity, duration = 800) {
  console.log('that, param, opacity', that, param, opacity)
  var animation = wx.createAnimation({ duration, timingFunction: 'ease' });
  animation.opacity(opacity).step()
  let obj = {}
  obj[param] = animation.export()
  //设置动画
  that.setData(obj)
}

module.exports = {
  animationOpacity
}