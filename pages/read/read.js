// miniprogram/pages/read/read.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarIndex:"1",
    tabbarList: [{
      id: "1",
      name: "推荐"
    },
    {
      id: "2",
      name: "分类"
    },
    {
      id: "3",
      name: "排行"
    },
    {
      id: "4",
      name: "文学艺术"
    },
    {
      id: "5",
      name: "名著经典"
    }
    ],
    category:[]

  },
  clicktab(e) {
    // console.log(e) 
     this.setData({
      tabbarIndex: e.currentTarget.id
    })
    this.getData()


  },
  //点击输入框触发
  goSearch(){
    wx.redirectTo({
      url: '/pages/search/search',
    })
  },
  getData(){
    wx.showLoading({
      title: '加载中',
      icon: "none"
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 500)
    
    var self = this
    //链接数据库
    const db = wx.cloud.database()
    db.collection('read').where({
      ids: this.data.tabbarIndex
    }).get().then(res => {
      //  console.log(res.data)
      const data = res.data
      const newdata = []
      data.forEach(v => {
        wx.cloud.downloadFile({
          fileID: v.imgUrl, // 文件 ID
          success: res => {
            // 返回临时文件路径
            // console.log(res.tempFilePath)
            v.imgUrl = res.tempFilePath
            newdata.push(v)
            // console.log(newdata)
            self.setData({
              category: newdata
            })

          },
          fail: console.error
        })


      })
    })

  },
  //去往书架页面
  goBookshelf(){
    wx.navigateTo({
      url: '/pages/bookshelf/bookshelf',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加载中...',
    })
    setTimeout(()=>{
      wx.setNavigationBarTitle({
        title: '免费阅读',
      })
    },500)
    this.getData()

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