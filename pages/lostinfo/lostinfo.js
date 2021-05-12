Page({
    data: {
        lostInfo: undefined
    },
    onLoad: function(options){
        let app = getApp();
        this.setData({
            lostInfo: app.lostInfo
        })
    }
})