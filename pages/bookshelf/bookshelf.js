// miniprogram/pages/bookshelf/bookshelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatorUrl:"",
    nickName:"",
    flag:false,
    

  },
  //进去下载页面
  download(){
    this.setData({
      flag:true
    })

  },
  //关闭下载app页面
  closeApp(){
    this.setData({
      flag: false
    })
  },

  //点击图片，弹出提示下载，进行下载
  downloadApp(){
    var self=this
    wx.showModal({
      title: '立即下载',
      content: '微信读书',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确认',
      success: function(res) {
        if(res.confirm){
          wx.showToast({
            title: '下载中',
           icon:"none",
            duration:1200,
          })
          //先从服务器上下载,调用云函数
          wx.cloud.callFunction({
            // 云函数名称
            name: 'download',
            // 传给云函数的参数
            success: function (res) {
              console.log(res.result.id)
              wx.cloud.downloadFile({
                fileID: res.result.id
              }).then(res => {
                // console.log(res.tempFilePath)
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success:(res)=>{ 
                    // console.log(res)

                  }
                })
                
              }).catch(error => {
                // handle error
              })
            },
            fail: console.error
          })

        }else{
          wx.showToast({
            title: '取消下载',
            icon:"none"
          })
        }
      }
      
    })
  },
  goBookShelf(){
    wx.switchTab({
      url: '/pages/read/read',
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
   

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