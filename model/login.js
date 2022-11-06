import Http from "../utils/http"
class loginmdoel {
  // 扫码获取商品信息接口
  static login(data){
    return Http.request({
      url : '/weixinpay/login',
      method : 'GET', 
      data
    })
  }
}
export default loginmdoel