import urlApi from './urls/index'
import { showLoading, hideLoading, failMsg } from '../utils/util'

const baseUrl = 'http://192.168.50.149/dev-api/'
const timeout = 60 * 1000
console.log('urlApi', urlApi)

const post = (url, data, method = 'POST', headers = {}) => {
  let hasLoading = true
  if (url.indexOf('http') === -1) {
    let { url: _url, loading = true } = urlApi[url]
    url = baseUrl + _url
    if (loading === false) hasLoading = false
  }
  let header = { 'content-type': 'application/x-www-form-urlencoded', ...headers }
  hasLoading && showLoading()
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header,
      timeout,
      success (res) {
        let { data: result, errMsg, header, statusCode } = res
        if (statusCode === 200) {
          if (typeof result === 'string') {
            resolve(result)
            return
          }
          if (result.code === 200) {
            resolve(result.data);
          } else {
            result.msg && failMsg(result.msg)
            reject(result.msg)
          }
        } else {
          failMsg('错误消息：' + errMsg + ',错误码：' + statusCode);
          reject('错误消息：' + errMsg + ',错误码：' + statusCode)
        }
      },
      fail(e) {
        reject(e.errMsg);
      },
      complete() {
        if (hasLoading) hideLoading();
      }
    })
  })
}

export {
  post
}