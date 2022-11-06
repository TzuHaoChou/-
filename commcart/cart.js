// 把数据添加到本地
import {cache} from "../enum/cache"
const addCart = (data) => {
  const carts = wx.getStorageSync(cache.CARTS) || []

  if(carts.length <= 0){
    data.num = 1
    carts.push(data)
  }else{
    if(_hasData(data)){
      data.num = 1
      carts.push(data)
    }else{
      carts.forEach(item=>{
        if(item._id === data._id){
          item.num += 1
        }
      })
    }
  }
  wx.setStorageSync(cache.CARTS, carts)
}
// 判断是否是第一次添加
// const _isaddif = () => {
//   const carts = wx.getStorageSync('carts') || []
//   return carts.length > 0 ? false : true
// }
const _hasData = (data) => {
  const carts = wx.getStorageSync(cache.CARTS)
  const index = carts.findIndex(item=> item._id === data._id)
  return index < 0 ? true : false
}
export {
  addCart
}