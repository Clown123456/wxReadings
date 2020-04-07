// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: [],



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
      icon: "none"
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
    var self = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'index',
      // 传给云函数的参数
      success: function(res) {
        // console.log(res.result.data)
        const data = res.result.data
        const newdata = []
        data.forEach(i => {
          wx.cloud.downloadFile({
            fileID: i.img, // 文件 ID
            success: res => {
              // 返回临时文件路径  
              // console.log(res.tempFilePath)
              i.img = res.tempFilePath
              // console.log(i.id)
              newdata.push(i)
              // console.log(newdata)
              self.setData({
                cardList: newdata
              })
            },
            fail: console.error
          })


        })
      },
      fail: console.error
    })





  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})