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
      '宿舍区', '教学区'
    ],
    [// 1
        [// 1 0
          '14栋', '16栋'
        ],
        [// 1 1
          '二教','三教'
        ]
    ],
  ];
var ms3 = [
    [// 0
      '可选','宿舍区', '教学区'
    ],
    [// 1
        [],
        [// 1 0
          '14', '16'
        ],
        [// 1 1
          '二','四'
        ]
    ],
  ];
var ms4 = [
    [// 0
      '可选','宿舍区', '教学区'
    ],
    [// 1
        [],
        [// 1 0
          '14', '16'
        ],
        [// 1 1
          '二','四'
        ]
    ],
  ];

  Page({
    data: {
      items: [
        {value: '0', name: '清水河校区'},
        {value: '1', name: '沙河校区', checked: 'true'}
      ],
      ratioVal: 1,
      multiArray1: [
        ['电子设备', '证件','个人物品','学习用品','全部物品'],
        ['手机', '平板电脑', 'kindle', '笔记本电脑', '耳机','充电器','充电宝','数据线','手表','u盘','鼠标','键盘','触控笔','其他']
    ],
      multiArray2: [
        ['宿舍区', '教学区'],
        ['14栋', '16栋']
    ],
      multiArray3: [
        ['可选','宿舍区', '教学区'],
        []
    ],
      multiArray4: [
        ['可选','宿舍区', '教学区'],
        []
    ],
    array: ['上午(6:00-11:00)','中午(11:00-14:00)', '下午(14:00-19:00)', '晚上(19:00-22:00)','夜间(22:00-6:00)'],
    index: 0,
    multiIndex1: [0, 0],
    multiIndex2: [0, 0],
    multiIndex3: [0, 0],
    multiIndex4: [0, 0],
    date: '2021-05-01',
    dateShow: '05-01',
    time: '12:01',
    timeStart: '00:00',
    timeEnd: '23:59'
    },
    onLoad: function () {
      console.log('Welcome to Mini Code');
    },
    submit: function(){
      let sectionArr=['morning','noon','afternoon','evening','night'];
      let upForm={
        'type_index':this.data.multiIndex1,
        'campus_id': this.data.ratioVal,
        'place_1': this.data.multiIndex2,
        'lost_date': this.data.date
      };
      if(this.data.multiIndex3[0]!=0){
        let index3=JSON.parse(JSON.stringify(this.data.multiIndex3));
        index3[0]=index3[0]-1;
        upForm['place_2']=index3;
      }
      if(this.data.multiIndex4[0]!=0){
        let index4=JSON.parse(JSON.stringify(this.data.multiIndex4));
        index4[0]=index4[0]-1;
        upForm['place_3']=index4;
      }

      upForm['time_session']=sectionArr[this.data.index]
   
      console.log('upform',upForm);
      tt.request({
        url: 'https://www.fengzigeng.com/api/miniapp/addlost', // 目标服务器url
        header:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:upForm,
        method: 'POST',
        success: (res) => {
          console.log(res);
          if(res.data.code==200){
            tt.showModal({
              title:'发布失物查询成功',
              content: '之后有疑似您的物品被拾到后，我们将尽快通知您',
              showCancel: false,
              success: (res) => {
                if(res.confirm){
                  tt.navigateBack();
                }
              }
            });
          }
          else{
            tt.showModal({
              title:"发送失物查询失败",
              content: res.data.msg+'msg:'+res.data.code,
              showCancel:false,
              success: (res) => {
                
              }
            });
          }
        }
      });
    },
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      let myDate=String(e.detail.value).substr(5)
      this.setData({
          date: e.detail.value,
          dateShow: myDate
      })
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
          index: e.detail.value
      })
    },
    radioChange: function(e) {
      console.log('Radio 发生 change 事件，value 值为：', e.detail.value)
      var items = this.data.items;
      for (var i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].value === e.detail.value
      }
      this.setData({
        items: items,
        redioVal: e.detail.value
      });
      let myThis=this;
      tt.request({
        //获取地点列表
        url: 'https://www.fengzigeng.com/api/miniapp/getplaces', // 目标服务器url
        header:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:{
          'campus_id': e.detail.value
        },
        method: 'POST',
        success: (res) => {
          //console.log('get type list',res);
          if(res.data.code==200){
            let finalArr=[];
            let arr1=res.data.data.type1;
            let arr2=res.data.data.type2;
            finalArr.push(arr1);
            finalArr.push(arr2);

            let dataArr=[];
            dataArr[0]=finalArr[0];
            dataArr[1]=finalArr[1][0];
            console.log(dataArr);
            let dataArr1=JSON.parse(JSON.stringify(dataArr));
            dataArr1[0].unshift("可选");
            dataArr1[1]=[];
            console.log('arr1',dataArr1);
            myThis.setData({
              multiArray2: dataArr,
              multiArray3: dataArr1,
              multiArray4: dataArr1,
            });
            let finalArr1=JSON.parse(JSON.stringify(finalArr));
            finalArr1[0].unshift("可选");
            finalArr1[1].unshift([]);
            ms2=finalArr;
            ms3=finalArr1;
            ms4=finalArr1;
            console.log('multiarr',myThis.data.multiArray1);
          }
        }
      });
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
    bindMultiPickerChange3: function (e) {
        console.log('picker3发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex3: e.detail.value
        })
    },
    bindMultiPickerChange4: function (e) {
        console.log('picker4发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex4: e.detail.value
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
                // data.multiIndex1[2] = 0;
                data.multiArray1[1] = ms1[1][data.multiIndex1[0]];
                // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
                break;
            case 1:
                data.multiIndex1[1] = e.detail.value;
                // data.multiIndex1[2] = 0;
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
                // data.multiIndex2[2] = 0;
                data.multiArray2[1] = ms2[1][data.multiIndex2[0]];
                // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
                break;
            case 1:
                data.multiIndex2[1] = e.detail.value;
                // data.multiIndex2[2] = 0;
                // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
                break;
            case 2:
                // data.multiIndex[2] = e.detail.value;
                break;
        }
        this.setData(data);
      },
    bindMultiPickerColumnChange3: function (e) {
        // return;
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray3: this.data.multiArray3,
            multiIndex3: this.data.multiIndex3
        };
        switch (e.detail.column) {
            case 0:
                data.multiIndex3[0] = e.detail.value;
                data.multiIndex3[1] = 0;
                // data.multiIndex3[2] = 0;
                data.multiArray3[1] = ms3[1][data.multiIndex3[0]];
                // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
                break;
            case 1:
                data.multiIndex3[1] = e.detail.value;
                // data.multiIndex3[2] = 0;
                // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
                break;
            case 2:
                // data.multiIndex[2] = e.detail.value;
                break;
        }
        this.setData(data);
      },
    bindMultiPickerColumnChange4: function (e) {
        // return;
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray4: this.data.multiArray4,
            multiIndex4: this.data.multiIndex4
        };
        switch (e.detail.column) {
            case 0:
                data.multiIndex4[0] = e.detail.value;
                data.multiIndex4[1] = 0;
                // data.multiIndex4[2] = 0;
                data.multiArray4[1] = ms4[1][data.multiIndex4[0]];
                // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
                break;
            case 1:
                data.multiIndex4[1] = e.detail.value;
                // data.multiIndex4[2] = 0;
                // data.multiArray[2] = ms[2][data.multiIndex[0]][data.multiIndex[1]];
                break;
            case 2:
                // data.multiIndex[2] = e.detail.value;
                break;
        }
        this.setData(data);
      },
  
      onLoad: function (options) {
        let myThis=this;
      // 生命周期函数--监听页面加载
      tt.request({
        //获取物品列表
        url: 'https://www.fengzigeng.com/api/miniapp/gettypes', // 目标服务器url
        header:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: (res) => {
          //console.log('get type list',res);
          if(res.data.code==200){
            let finalArr=[];
            let arr1=res.data.data.type1;
            let arr2=res.data.data.type2;
            finalArr.push(arr1);
            finalArr.push(arr2);

            let dataArr=[];
            dataArr[0]=finalArr[0];
            dataArr[1]=finalArr[1][0];
            console.log(dataArr);
            myThis.setData({
              multiArray1: dataArr
            });
            ms1=finalArr;
            console.log('multiarr',myThis.data.multiArray1);
          }
        }
      });

      tt.request({
        //获取地点列表
        url: 'https://www.fengzigeng.com/api/miniapp/getplaces', // 目标服务器url
        header:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:{
          'campus_id':'1'
        },
        method: 'POST',
        success: (res) => {
          //console.log('get type list',res);
          if(res.data.code==200){
            let finalArr=[];
            let arr1=res.data.data.type1;
            let arr2=res.data.data.type2;
            finalArr.push(arr1);
            finalArr.push(arr2);
            
            let dataArr=[];
            dataArr[0]=finalArr[0];
            dataArr[1]=finalArr[1][0];
            console.log(dataArr);
            let dataArr1=JSON.parse(JSON.stringify(dataArr));
            dataArr1[0].unshift("可选");
            dataArr1[1]=[];
            console.log('arr1',dataArr1);
            myThis.setData({
              multiArray2: dataArr,
              multiArray3: dataArr1,
              multiArray4: dataArr1,
            });
            let finalArr1=JSON.parse(JSON.stringify(finalArr));
            finalArr1[0].unshift("可选");
            finalArr1[1].unshift([]);
            ms2=finalArr;
            ms3=finalArr1;
            ms4=finalArr1;
            console.log('multiarr',myThis.data.multiArray1);
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