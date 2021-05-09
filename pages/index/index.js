var ms = [
  [// 0
    '电子设备', '证件','个人物品','学习用品','全部物品'
  ],
  [// 1
      [// 1 0
        '手机', '平板电脑', 'kindle', '笔记本电脑', '耳机','充电器/宝/数据线','手表','u盘','鼠标','键盘','触控笔','全部电子设备'
      ],
      [// 1 1
        '一卡通','身份证','学生证','健身卡','全部证件'
      ],
      [
        '衣物','包','眼镜','钱包','钥匙','水杯','雨伞','化妆品','首饰','全部个人物品'
      ],
      [
        '笔袋','书籍','笔记本','全部学习用品'
      ],
      [
        '查看全部物品'
      ]
  ],
];

Page({
  data: {
    currentTab:0,
    multiArray: [
      ['电子设备', '证件','个人物品','学习用品','全部物品'],
      ['手机', '平板电脑', 'kindle', '笔记本电脑', '耳机','充电器','充电宝','数据线','手表','u盘','鼠标','键盘','触控笔','其他']
  ],
  multiIndex: [0, 0, 0],
  },
  onLoad: function () {
    console.log('Welcome to Mini Code')
  },
  postLostConfirm: function(){
    tt.showModal({
      title: '您希望请求一个失物查询请求',
      content: '目前您的失物还未被拾取，若稍后出现符合您填写特征的物品被拾到，我们将以消息的形式通知您',
      success (res) {
          if (res.confirm) {
              console.log('confirm, continued');
              tt.navigateTo({
                url: `/pages/lost/index`,
                success (res) {
                    console.log(`${res}`);
                },
                fail (res) {
                    console.log(`navigateTo 调用失败`);
                }
            });
          } else if (res.cancel) {
              console.log('cancel, cold')
          } else {
              // what happend?
          }
      },
      fail (res) {
          console.log(`showModal调用失败`);
      }
  });
  },
  swichNav: function (e) {
 
    console.log(e);
     
    var that = this;
     
    if (this.data.currentTab === e.target.dataset.current) {
     
    return false;
     
    } else {
     
    that.setData({
     
    currentTab: e.target.dataset.current,
     
    })
     
    }
     
    },
     
    swiperChange: function (e) {
     
    console.log(e);
     
    this.setData({
     
    currentTab: e.detail.current,
     
    })
     
     
    },
    
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
          multiIndex: e.detail.value
      })
  },
  bindMultiPickerColumnChange: function (e) {
      // return;
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
          multiArray: this.data.multiArray,
          multiIndex: this.data.multiIndex
      };
      switch (e.detail.column) {
          case 0:
              data.multiIndex[0] = e.detail.value;
              data.multiIndex[1] = 0;
              data.multiIndex[2] = 0;
              data.multiArray[1] = ms[1][data.multiIndex[0]];
              // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
              break;
          case 1:
              data.multiIndex[1] = e.detail.value;
              data.multiIndex[2] = 0;
              // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
              break;
          case 2:
              // data.multiIndex[2] = e.detail.value;
              break;
      }
      this.setData(data);
    },

    onLoad: function (options) {
     
    // 生命周期函数--监听页面加载
    tt.login({
      success (res) {
          console.log(`login 调用成功 ${res.code} `);
      },
      fail (res) {
          console.log(`login 调用失败`);
      }
    });
    },
     
    onReady: function () {
     
    // 生命周期函数--监听页面初次渲染完成
     
    },
     
    onShow: function () {
     
    // 生命周期函数--监听页面显示
     
    },
     
    onHide: function () {
     
    // 生命周期函数--监听页面隐藏
     
    },
     
    onUnload: function () {
     
    // 生命周期函数--监听页面卸载
     
    },
     
    onPullDownRefresh: function () {
     
    // 页面相关事件处理函数--监听用户下拉动作
     
    },
     
    onReachBottom: function () {
     
    // 页面上拉触底事件的处理函数
     
    },
     
    onShareAppMessage: function () {
     
    // 用户点击右上角分享
     
    return {
     
    title: 'title', // 分享标题
     
    desc: 'desc', // 分享描述
     
    path: 'path' // 分享路径
     
    }
     
    }
    
})
