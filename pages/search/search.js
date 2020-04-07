// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    //获取的数据
    category:[],
    //输入框的值
    inputValue:"",
    //搜索历史列表
    historyList:[]

  },
  //获取历史记录
  gethistory(){
    var self=this
    wx.getStorage({
      key: 'history',
      success: function (res) {
        // console.log(res.data)
        // console.log(self)
        console.log(self.data.historyList)
        //
       
        let index=self.data.historyList.indexOf(res.data)
        if(index===-1){
          //数组里面没有改搜索项
          // console.log(self.data.historyList)
          self.data.historyList.unshift(res.data)
          self.setData({
            historyList: self.data.historyList
          })

        }else{
          return self.data.historyList
        }
        

      },
    }) 
  },
  //清除历史记录
  clearHistory(){
    //首先是local清空
    wx.clearStorage()
    //其次是清空数组
    // this.data.historyList=[]
    this.setData({
      historyList:[]
    })
  },
  //发起请求,请求数据库
  requestDb(){
    const db = wx.cloud.database()
    db.collection('read').where({
      name: db.RegExp({
        regexp: '' + this.data.inputValue + '',
        options: 'm',
      })
    }).get().then(res => {
      // console.log(res.data)
      this.setData({
        category: res.data
      })
    })
  },
  //在输入框输入东西之后，失去焦点
  getInput(event){
    // console.log(event.detail.value)
    this.setData({
      inputValue: event.detail.value
    })
    const self=this
    if(this.data.inputValue){
      wx.setStorage({
        key: 'history',
        data: event.detail.value,
      })
      //输入值1s后发起请求
      this.requestDb()
      
      // 我们要设置为本地村粗
      this.gethistory()
     
     
      
      // this.data.historyList.push(this.data.inputValue)
    }else{
      //没有数据的话我们返回我们的历史历史记录
     
      return this.setData({
        category:[]
      })
    }
  },
  //点击历史记录的一项，发起请求
  clickItem(e){
    //点击哪一项，哪一项会给我们传过来那、一项是什么
    // console.log(e)
    console.log(e.currentTarget.dataset.item)
    //因为我们想要向数据库发起请求，但是请求中的值是输入框内的
    //我们需要改一下，将拿到的值赋值给输入框
    this.setData({
      inputValue: e.currentTarget.dataset.item
    })
    this.requestDb()

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethistory()
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