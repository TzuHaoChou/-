// pages/cart/cart.js
import {
  cache
} from "../../enum/cache"
import {
  getScanCode,
  getProductionInfo
} from "../../commcart/scan-code.js"
import {
  addCart
} from "../../commcart/cart"
Page({
  async Continue(e) {
    console.log('a');
    // 打开扫一扫
    const result = await getScanCode()
    // 获取到商品条形码之后调用获取商品信息接口
    const response = await getProductionInfo(result)
    // 获取到商品信息之后将获取到的商品信息添加到购物车
    addCart(response)
     // 从本地获取最新的商品数据,并重新进行渲染
     this.getCartList()
     // 当页面的数据重新渲染之后, 我们需要重新计算商品的总价
     this.pricelisy()
  },
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice: 0
  },
  // 方法的做的事情: 获取本地存储的购物车数据
  getCartList() {
    const carts = wx.getStorageSync(cache.CARTS)
    console.log('carts=>', carts)
    this.setData({
      cartList: carts
    })
  },
  // 减
  Reduction(e) {
    const index = e.currentTarget.dataset.index
    const num = this.data.cartList[index].num
    const itemStatus = this.removecarts(num, index)
    if (itemStatus) return
    this.data.cartList[index].num -= 1
    this.setData({
      cartList: this.data.cartList
    })
    wx.setStorageSync(cache.CARTS, this.data.cartList)
    this.pricelisy()
  },
  // 小于1删除
  removecarts(num, index) {
    if (num === 1) {
      wx.showModal({
        content: '你确定要删除吗',
        success: (res) => {
          if (res.confirm) {
            this.data.cartList.splice(index, 1)
            this.setData({
              cartList: this.data.cartList
            })
            wx.setStorageSync(cache.CARTS, this.data.cartList)
            this.pricelisy()
          } else if (res.cancel) {
            console.log('用户取消');
          }
        }
      })
      return true
    }
  },
  // 加
  addclss(e) {
    console.log(e, 'e');
    const index = e.currentTarget.dataset.index
    this.data.cartList[index].num += 1
    this.setData({
      cartList: this.data.cartList
    })
    wx.setStorageSync(cache.CAETS, this.data.cartList)
    this.pricelisy()
  },
  // 总价
  pricelisy() {
    if (this.data.cartList && this.data.cartList.length > 0) {
      let totalPrice = 0
      this.data.cartList.forEach(item => {
        totalPrice += item.num * item.price
      })
      this.setData({
        totalPrice
      })
    }

  },
  // 去订单页面
  toorder() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList()
    this.pricelisy()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})