Page({
    data: {
        lostInfo: undefined,
        showPlace: false,
        value:"",
        matched:undefined
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
                            }else if(res.data.code==400){
                                tt.showModal({
                                    title:'提示',
                                    content: '此物品已经被认领',
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
                            }else if(res.data.code==400){
                                tt.showModal({
                                    title:'提示',
                                    content: '此物品已经被认领',
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
        console.log(app.matchInfo);
        this.setData({
            lostInfo: app.matchInfo,
            matched:app.match
        })
    }
})