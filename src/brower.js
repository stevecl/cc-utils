// 滚动到页面顶部
export const scrollToTop = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
}

// 滚动到页面底部
export const scrollToBottom = () => {
  window.scrollTo(0, document.documentElement.clientHeight);  
}
// 滚动到指定元素区域
export const smoothScroll = (element) => {
  document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
  });
};

// 判断元素是否在可视区域内
export function isElView(el) { 
  var top = el.getBoundingClientRect().top // 元素顶端到可见区域顶端的距离 
  var bottom = el.getBoundingClientRect().bottom // 元素底部端到可见区域顶端的距离 
  var se = document.documentElement.clientHeight // 浏览器可见区域高度。 
  if (top < se && bottom > 0) {   
    return true 
  } else if (top >= se || bottom <= 0) {  
    // 不可见 
  } 
  return false
}
// 打开浏览器全屏
export const toFullScreen = () => {
  let element = document.body;
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}
// 推出全屏
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}