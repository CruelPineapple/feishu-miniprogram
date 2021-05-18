Page({
    data:{
        nickName:"",
        avatarUrl:"",
        myInfo: undefined
    },
    handleDetail: function(e){
        console.log(e.currentTarget.dataset.lostid)
    },
    onLoad: function(options){
        let myThis=this;
        tt.getUserInfo({
            success(res) {
                var userInfo = res.userInfo;
                myThis.setData({
                    nickName:userInfo.nickName,
                    avatarUrl:userInfo.avatarUrl
                })
                console.log(userInfo);
            },
            fail (res) {
                console.log(`getUserInfo 调用失败`);
            }
        })
        tt.request({
          url: 'https://www.fengzigeng.com/api/miniapp/me', // 目标服务器url
          method:'GET',
          success: (res) => {
            if(res.data.code==200){
                myThis.setData({
                    myInfo:res.data.data
                })
            }
          }
        });
    }
})