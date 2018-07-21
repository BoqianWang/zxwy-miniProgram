//app.js
App({
  /**
   * 配置信息
   * @type {Object}
   */
   config: {
      apiUrl: 'https://userside.zhongxiang51.com',
      // apiUrl: 'http://192.169.18.77:8082/zx51-api',
      webViewUrl: 'https://static.zhongxiang51.com/',
      // apiUrl: 'https://test.zhongxiang51.com/zxwy-userside',
      // webViewUrl: 'https://testpage.zhongxiang51.com/'
    },
    showToast(title, duration = 3000) {
      wx.showToast({
          title: title,
          icon: 'none',
          duration: duration,
          mask: true
      })
    },
     /**
      * 显示加载框
      * @param  {[type]} title [description]
      * @return {[type]}       [description]
      */
    showLoading(title = '加载中...') {
      wx.showLoading({
        title: title,
        mask: true
      })
    },
     /**
      * 隐藏加载框
      * @return {[type]} [description]
      */
    hideLoading() {
      wx.hideLoading()
    },
     /**
      * 提示弹框
      * @param  {[type]} msg [description]
      * @return {[type]}     [description]
      */
    showModal(msg) {
      return new Promise((reslove, reject) => {
        wx.showModal({
          title: '提示',
          content: msg,
          success: (res) => {
            if(res.confirm) {
              reslove(res);
            } else if(res.cancel) {
              reject(res);
            }
          }
        })
      })
    },
     /**
      * 接口的post请求
      * @return {[type]} [description]
      */
    apiPost(url, params, options = {}) {
       options['method'] = 'POST';
       url = this.config['apiUrl'] + url;
       return this.get(url, params, options);
    },
     /**
      * get请求
      * @return {[type]} [description]
      */
    get(url, params, options = {}) {
       this.showLoading();
       return new Promise((reslove, reject) => {
         wx.request({
          url: url,
          data: params,
          method: options.method || 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            this.hideLoading();
            let result = res.data;
            if(result.code == 0) {
              reslove(result);
            } else {
              this.showToast(result.msg);
              reject(result);
            }
          },
          fail: (res) => {
            this.hideLoading()
            reject(res);
          }

         })
       })
    },
   /**
    * 分享按钮
    * @param  {[type]} options [description]
    * @return {[type]}         [description]
    */
   handleShare( options ) {
     const url = encodeURIComponent( options.webViewUrl );
      return {
          title: `众享无忧`,
          path: `/pages/redirectWebView/redirectWebView?url=${url}`,
          success( res ) {
              console.log( this.path );
          }
      }
   },
})