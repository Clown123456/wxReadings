// miniprogram/pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList:[]

  },
  //点击发送给好友
  share(){
    wx.showShareMenu()
    
  },
  //点击图片
  clickimg(){
    wx.showToast({
      title: '该功能处于开发中...',
      icon:"none"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      wx.showShareMenu({
        withShareTicket: true
      })
    

    wx.showLoading({
      title: '加载中',
      icon:"none"
    })
    setTimeout(()=>{
      wx.hideLoading()
    },1000)

    var self=this
    //获取接口数据
    wx.cloud.callFunction({
      name: 'video',
    }).then(res=>{
      //在这里已经获取到图片的id，接下来就是数据的操作了
      const data=res.result.data
      const newdata = []
      data.forEach((v)=>{
        // 根据id下载文件
        wx.cloud.downloadFile({
          fileID: v.imgUrl, // 文件 ID
          success: res => {
            // 返回临时文件路径
            // console.log(res.tempFilePath)
            v.imgUrl = res.tempFilePath
            // console.log(v)
            newdata.push(v)
            self.setData({
              videoList:newdata
            })
          },
          fail: console.error
        })


      })
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.hideShareMenu({
      
    // })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})