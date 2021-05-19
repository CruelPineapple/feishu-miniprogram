Page({
    data: {
        lostInfo: undefined,
        showPlace: false,
        value:"",
        matched:undefined
    },

    handleFound:function(){
        let myThis=this;
        tt.showModal({
            title:'提示',
            content:'您自己找到了失物并希望撤销这条失物查询？',
            
          success: (res) => {
            if(res.confirm){
                tt.request({
                  url: 'https://www.fengzigeng.com/api/miniapp/foundBySelf', // 目标服务器url
                  method: 'POST',
                  header:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  data:{
                    'LostId':myThis.data.lostInfo.ID
                  },
                  success: (res) => {
                    if(res.data.code==200){
                        tt.showToast({
                          title: '认领成功', // 内容
                          success: (res) => {

                          }
                        });
                        myThis.setData({
                            matched:true
                        })
                    }
                  }
                });
            }
          }
        });
    },

    onLoad: function(options){
        let app = getApp();
        // console.log(app.matchInfo);
        this.setData({
            lostInfo: app.notmatchInfo,
            matched:app.match
        })
    }
})