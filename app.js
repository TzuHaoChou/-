import loginmodel from "./model/login"
App({
  onLaunch() {
    this.initLogin()
  },
  // 初始方法
  async initLogin() {
    const code = await this.wxLogin()
    const res = await this.login({
      code
    })
    this.saveLocalinfo(res)
    console.log(res, 'res');
  },
  async wxLogin() {
    const res = await wx.login()
    return res.code
  },
  // 掉用自己的login接口
  async login(data) {
    const res = await loginmodel.login(data)
    // console.log("res=>",res);
    return res
  },
  // openid
  saveLocalinfo(){

  }
})