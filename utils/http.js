import {
  config
} from "../config/config"
import {
  wxToPromise
} from "./wxpeomise"
import {exceptionMessage} from "../config/excrption"


class Http {
  // 公有方法
  static request({
    url,
    method = "GET",
    data = {},
    header = {}
  }) {
    wx.showLoading({
      title: '加载中',
    })
    let token = true
    if(token) header.token = "12346"
    return Http._request({
      url,
      method,
      data,
      header
    })
  }

  // 私有方法
  static async _request({
    url,
    method,
    data,
    header
  }) {
    try {
      const res = await wxToPromise("request", {
        url: config.baseUrl + url,
        method,
        data,
        header: {
          devicetype: config.devicetype,
          ...header
        }
      })
      // 请求成功
      if(res.statusCode===200 ){
        return res.data.result
      }
      // 请求失败
      Http._showErrorMessage(res.statusCode, res.data.msg)
    } catch (error) {
      console.log(error);
    }finally{
      wx.hideLoading()
    }
  }
  static _showErrorMessage(){
    let title =exceptionMessage[error_code] || msg || "未知错误"
    wx.showToast({
      title: 'title',
      icon : "none",
      duration : 3000
    })
  }
}

export default Http