var ms1 = [
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
          '搜索全部物品'
        ]
    ],
  ];

var ms2 = [
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
          '搜索全部物品'
        ]
    ],
  ];

  Page({
    data: {
      multiArray1: [
        ['电子设备', '证件','个人物品','学习用品','全部物品'],
        ['手机', '平板电脑', 'kindle', '笔记本电脑', '耳机','充电器','充电宝','数据线','手表','u盘','鼠标','键盘','触控笔','其他']
    ],
      multiArray2: [
        ['电子设备', '证件','个人物品','学习用品','全部物品'],
        ['手机', '平板电脑', 'kindle', '笔记本电脑', '耳机','充电器','充电宝','数据线','手表','u盘','鼠标','键盘','触控笔','其他']
    ],
    multiIndex1: [0, 0, 0],
    multiIndex2: [0, 0, 0],
    time: '12:01',
    timeStart: '00:00',
    timeEnd: '23:59'
    },
    onLoad: function () {
      console.log('Welcome to Mini Code')
    },

    bindTimeChange: function (e) {
      console.log('time picker发送选择改变，携带值为', e.detail.value)
      this.setData({
          time: e.detail.value
      })
    },      
    bindMultiPickerChange1: function (e) {
        console.log('picker1发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex1: e.detail.value
        })
    },
    bindMultiPickerChange2: function (e) {
        console.log('picker2发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex2: e.detail.value
        })
    },
    bindMultiPickerColumnChange1: function (e) {
        // return;
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray1: this.data.multiArray1,
            multiIndex1: this.data.multiIndex1
        };
        switch (e.detail.column) {
            case 0:
                data.multiIndex1[0] = e.detail.value;
                data.multiIndex1[1] = 0;
                data.multiIndex1[2] = 0;
                data.multiArray1[1] = ms1[1][data.multiIndex1[0]];
                // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
                break;
            case 1:
                data.multiIndex1[1] = e.detail.value;
                data.multiIndex1[2] = 0;
                // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
                break;
            case 2:
                // data.multiIndex[2] = e.detail.value;
                break;
        }
        this.setData(data);
      },
    bindMultiPickerColumnChange2: function (e) {
        // return;
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray2: this.data.multiArray2,
            multiIndex2: this.data.multiIndex2
        };
        switch (e.detail.column) {
            case 0:
                data.multiIndex2[0] = e.detail.value;
                data.multiIndex2[1] = 0;
                data.multiIndex2[2] = 0;
                data.multiArray2[1] = ms2[1][data.multiIndex2[0]];
                // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
                break;
            case 1:
                data.multiIndex2[1] = e.detail.value;
                data.multiIndex2[2] = 0;
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