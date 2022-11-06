import ShoppingModel from "../../model/index"
import {addCart} from "../../commcart/cart"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imaglist: []
  },
  getAdvertList() {
    // mock轮播图数据
    const data = [{
        id: 1,
        link: '',
        imgUrl: 'https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/20229rbBQ9QMiE1646710319.jpg?x-oss-process=image/resize,w_1920,h_575'
      },
      {
        id: 2,
        link: '',
        imgUrl: 'https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020lLJK0jy89y1586333534.jpg?x-oss-process=image/resize,w_1920,h_575'
      },
      {
        id: 3,
        link: '',
        imgUrl: 'https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020t2vrszZ5ib1586332927.jpg?x-oss-process=image/resize,w_1920,h_575'
      }
    ]

    this.setData({
      imaglist: data
    })
  },
  scanCode() {
    wx.scanCode({
      onlyFromCamera: true,
      success : (res) => {
        const {result} = res
        this.getProductionInfo(result)
      }
    })
  },
  async getProductionInfo(code){
   try {
    let data={qcode:code}
    const response=await ShoppingModel.getProductInfo(data)
    // console.log(response,'response');
    if(response.length>0){
      // wx.setStorageSync('carts', response)
      addCart(response[0])
      wx.navigateTo({
        url: '/pages/cart/cart',
      })
    }
   } catch (error) {
     console.log(error);
   }
  },
  // 轮播图
// async getBanner(){
//   const response = await IndexModel.getBanner()
//   console.log("banner", response)
//   },
//   // 导航栏 
//   async getNav(){
//     const resnav= await IndexModel.getNav()
//     console.log(resnav,'resnav');
//   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAdvertList()
    // this.getBanner()
    // this.getNav()
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