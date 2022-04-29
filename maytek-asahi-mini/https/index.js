import urlApi from './urls/index'
import { showLoading, hideLoading, failMsg } from '../utils/util'

const env = 'dev'
const baseUrl = 'http://192.168.50.149:8080'
const timeout = 60 * 1000
console.log('urlApi', urlApi)

const post = (url, data, method = 'POST', headers = {}) => {
  let hasLoading = true
  let header = { 'content-type': 'application/x-www-form-urlencoded', ...headers }

  if (url.indexOf('http') === -1) {
    let { url: _url, loading = true, ip = 149, headType } = urlApi[url]
    // url = env === 'dev' ? `http://192.168.50.${ip}:8080${_url}` : baseUrl + _url
    url = env === 'dev' ? `http://192.168.50.149:8080${_url}` : baseUrl + _url
    if (headType == 'json') header['content-type'] = 'application/json'
    if (loading === false) hasLoading = false
  }
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
            let { data = null, rows, total } = result
            data = data === null ? { rows, total } : data
            resolve(data);
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

const getUrl = (url) => {
  if (url.indexOf('http') === -1) {
    let { url: _url, loading = true, ip = 149 } = urlApi[url]
    // url = env === 'dev' ? `http://192.168.50.${ip}:8080${_url}` : baseUrl + _url
    url = env === 'dev' ? `http://192.168.50.177:8080${_url}` : baseUrl + _url
  }
  return url
}

export {
  post,
  getUrl
}