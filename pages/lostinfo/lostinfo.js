Page({
    data: {
        lostInfo: undefined
    },
    handleRequestPosition: function(){

    },
    onLoad: function(options){
        let app = getApp();
        this.setData({
            lostInfo: app.lostInfo
        })
    }
})