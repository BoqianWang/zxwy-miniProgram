// pages/pay/pay.js
const app = getApp();
// let zx_token = 'oV3Y2s2P3bjxRPkj0rW3BNlt5oDk',
//     orderId = '6dcfc04c622e444fb966128b8df4a89b';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parmas: {}
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {
         this.parmas = options;
         this.toLogin();

         // this.redirectTo();
  },
  toLogin() {
     wx.login({
        success: (res) => {
            if(res.code) {
                app.apiPost('/order/v3.2/miniRestartToPay', {
                    code: res.code,
                    orderId: this.parmas['orderId'],
                    zx_token: this.parmas['zx_token']
                }).then(res => {
                    this.wxMiniPay(res.data.retMap);
                }).catch(res => {
                    app.showModal(JSON.stringify(res));
                })
            } else {
               app.showModal(`登录失败! ${res.errMsg}`);
            }
        }
     })
  },
  //跳转
  redirectTo() {
      let url = encodeURIComponent(`${app.config['webViewUrl']}/index.html#/pay/takeoutDetail?orderId=${this.parmas['orderId']}&miniPay=true`);
      wx.redirectTo({
         url: `/pages/redirectWebView/redirectWebView?url=${url}`
      });
  },
  //微信支付
  wxMiniPay(data) {
    wx.requestPayment({
       'timeStamp': data.timeStamp,
       'nonceStr': data.nonceStr,
       'package': data.package,
       'signType': 'MD5',
       'paySign': data.paySign,
       success: (res) => {
          this.redirectTo();
       },
       fail: (res) => {
          // debugger;
          if(res['errMsg'].indexOf('cancel') > -1) {
             this.redirectTo();
          } else {
               app.showModal(`${res.errMsg} ${res.err_desc}`)
               .then(res => {
                   this.redirectTo();
               }).catch(res => {
                   this.redirectTo();
               })
          }
       }
    })
  },
})