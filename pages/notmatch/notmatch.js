Page({
    data: {
        lostInfo: undefined,
        showPlace: false,
        value:"",
        matched:undefined
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