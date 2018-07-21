let app = getApp();
Page({
   onLoad(option) {
       this.setData({
          targetUrl: decodeURIComponent(option.url)
       });
   },
   onShareAppMessage(option) {
      return app.handleShare(option)
   }
})