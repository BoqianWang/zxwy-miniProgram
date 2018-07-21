//获取应用实例
const app = getApp();
console.log()
Page({
    //页面加载
    onLoad(options) {
         let targetUrl = '',
             url = app.config['webViewUrl'];
         if(options.scene) {
             targetUrl = `${url}/index.html#/takeout/takeOutShop?${decodeURIComponent(options.scene)}`;
         } else {
             targetUrl = url;
         }
         this.setData({
             targetUrl
         });

    },
    //小程序分享
    onShareAppMessage(options) {
      return app.handleShare(options);
    }
})
