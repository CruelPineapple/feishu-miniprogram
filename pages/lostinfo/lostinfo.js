Page({
    data: {
        lostInfo: undefined
    },
    handleRequestPosition: function(){

    },
    onLoad: function(options){
        let app = getApp();
        console.log(app.lostInfo);
        this.setData({
            lostInfo: app.lostInfo
        })
    }
})