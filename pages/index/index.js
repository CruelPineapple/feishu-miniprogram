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

var ms2 = [
  [// 0
    '宿舍区', '教学区'
  ],
  [// 1
      [// 1 0
        '校内14栋', '校内16栋'
      ],
      [// 1 1
        '第二教学楼','第四教学楼'
      ],
  ],
];

Page({
  data: {
    multiArray: [
      ['电子设备', '证件','个人物品','学习用品','全部物品'],
      ['手机', '平板电脑', 'kindle', '笔记本电脑', '耳机','充电器','充电宝','数据线','手表','u盘','鼠标','键盘','触控笔','其他']
  ],
    multiArray2: [
      ['宿舍区', '教学区'],
      ['校内14栋', '校内16栋']
  ],
  multiIndex: [0, 0, 0],
  multiIndex2: [0, 0, 0],
  date: '2021-05-01',
  dateShow: '05-01',
  lost: [
    {
      Image:[],
      ItemType: '物品类型',
      SubPlace: '遗失地点',
      Date: '2021-5-10'
    },
    {
      Image:[],
      ItemType: '物品类型',
      SubPlace: '遗失地点',
      Date: '2021-5-10'
    }
  ]
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let myDate=String(e.detail.value).substr(5)
    this.setData({
        date: e.detail.value,
        dateShow: myDate
    })
  },
  onLoad: function () {
    console.log('Welcome to Mini Code')
  },
  postLostConfirm: function(){
    tt.showModal({
      title: '您希望发送一个失物查询请求',
      content: '如果您在下方列表中未找到丢失物品，可能是您的失物还未被拾取。若稍后出现符合您填写特征的物品被拾到，我们将以消息的形式通知您',
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
     
  getCode: function(){
    tt.login({
      success (res) {
          console.log(`login 调用成功 ${res.code} `);
          tt.showModal({
            title: 'code',
            content: res.code,
          })
      },
      fail (res) {
          console.log(`login 调用失败`);
      }
    });
  },
  
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        multiIndex: e.detail.value
    })
  },
  bindMultiPickerChange2: function (e) {
    console.log('picker2发送选择改变，携带值为', e.detail.value)
    this.setData({
        multiIndex2: e.detail.value
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

    handleLostTab: function(e){
      console.log(e.currentTarget.id);
    },

    onLoad: function (options) {
     
    // 生命周期函数--监听页面加载
    tt.login({
      success (res) {
          console.log(`login 调用成功 ${res.code} `);
          tt.request({
            url: 'https://www.fengzigeng.com/api/minilogin', // 目标服务器url
            method: "POST",
            header:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              'code':res.code
            },
            success: (res) => {
              console.log(res);
            }
          });
      },
      fail (res) {
          console.log(`login 调用失败`);
      }
    });
    tt.request({
      url: 'https://www.fengzigeng.com/api/miniapp/gettypes', // 目标服务器url
      header:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: (res) => {
        console.log('get type list',res);
        if(res.data.code==200){
          console.log(JSON.stringify(res.data.data));
          let row=res.data.data;
          let reg=/\\/g;
          let replaced=row.replace(reg,'');
          console.log(replaced);
          console.log(eval('(' + replaced + ')'));
          let finalArr=eval('(' + replaced + ')');
          let dataArr=[];
          dataArr[0]=finalArr[0];
          dataArr[1]=finalArr[1][0];
          console.log(dataArr);
        }
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
