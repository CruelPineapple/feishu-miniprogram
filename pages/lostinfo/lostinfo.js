Page({
    data: {
        lostInfo: undefined,
        showPlace: false,
        value:"",
        statusArr:['放在原处','自行带走，请联系拾到者（联系方式已经通过机器人发送）','放在别处'],
        currentIndex:0,
        currentDetail:""
    },
    onTextInput: function (e) {
        if(this.data.value.length<100){
            this.setData({
                value: e.detail.value
              })
        }else{
            tt.showModal({
                title:'提示',
                content: '内容太长了',
                showCancel:false,
              success: (res) => {
                
              }
            });
        }

      },
    handleThanks: function(){
        let myThis=this;
        if(this.data.value==""){
            tt.showModal({
                title:'提示',
                content:'你还没有填写感谢信息',
                showCancel:false,
              success: (res) => {
                return;
              }
            });
        }
        tt.request({
          url: 'https://www.fengzigeng.com/api/miniapp/thanks', // 目标服务器url
          header:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          data:{
            'id':myThis.data.lostInfo.ID,
            'thxmsg':myThis.data.value
          },
          success: (res) => {
            if(res.data.code==200){
                tt.showToast({
                  title: '发送成功', // 内容
                  success: (res) => {
                    setTimeout(tt.navigateBack(),3000);
                  }
                });
            }
            if(res.data.code==400){
                tt.showToast({
                  title: '你已经感谢过了', // 内容
                  success: (res) => {
                    
                  }
                });
            }
          }
        });
    },
    handleRequestPosition: function(){
        let app=getApp();
        let myThis=this;
        if(app.found_id){
            tt.showModal({
                title:'提示',
                content:'您确认这是您丢失的物品，点击确定后将为您认领并获取其详细位置信息',
                showCancel: true,
                success: (res) => {
                    if(res.confirm){
                        tt.request({
                          url: 'https://www.fengzigeng.com/api/miniapp/claim', // 目标服务器url
                          header:{
                            'Content-Type': 'application/x-www-form-urlencoded'
                          },
                          method: 'POST',
                          data: {
                            'lost_id': app.lost_id,
                            'found_id':app.found_id
                          },
                          success: (res) => {
                            console.log(res.data);
                            myThis.setData({
                              currentIndex: res.data.data.CurrentPlace,
                              currentDetail:res.data.data.CurrentPlaceDetail
                            });
                            if(res.data.code==200){
                                tt.showModal({
                                    title:'提示',
                                    content: '认领成功',
                                    showCancel:false,
                                  success: (res) => {
                                    myThis.setData({
                                        showPlace:true
                                    })
                                  }
                                });
                            }else {
                                tt.showModal({
                                    title:'提示',
                                    content: res.data.msg,
                                    showCancel:false,
                                  success: (res) => {
                                    myThis.setData({
                                        showPlace:true
                                    })
                                  }
                                });
                            }

                          }
                        });
                    }
              }
            });
        }else{
            tt.showModal({
                title:'提示',
                content:'您确认这是您丢失的物品，点击确定后将为您认领并获取其详细位置信息',
                showCancel: true,
                success: (res) => {
                    if(res.confirm){
                        tt.request({
                          url: 'https://www.fengzigeng.com/api/miniapp/claim', // 目标服务器url
                          header:{
                            'Content-Type': 'application/x-www-form-urlencoded'
                          },
                          method: 'POST',
                          data: {
                            'id':myThis.data.lostInfo.ID
                          },
                          success: (res) => {
                            if(res.data.code==200){
                              myThis.setData({
                                currentIndex: res.data.data.CurrentPlace,
                                currentDetail:res.data.data.CurrentPlaceDetail
                              });
                                tt.showModal({
                                    title:'提示',
                                    content: '认领成功',
                                    showCancel:false,
                                  success: (res) => {
                                    myThis.setData({
                                        showPlace:true
                                    })
                                  }
                                });
                            }else{
                                tt.showModal({
                                    title:'提示',
                                    content: res.data.msg,
                                    showCancel:false,
                                  success: (res) => {
                                    myThis.setData({
                                        showPlace:true
                                    })
                                  }
                                });
                            }

                          }
                        });
                    }
              }
            });
        }
        
    },
    onLoad: function(options){
        let app = getApp();
        console.log(app.lostInfo);
        this.setData({
            lostInfo: app.lostInfo
        })
    }
})