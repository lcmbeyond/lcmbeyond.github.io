var imgDataPath = '/gallery/photoslist.json'; //图片名称高宽信息json文件路径
var imgPath = '/gallery/images/';  //图片访问路径
var imgMaxNum = 50; //图片显示数量

var windowWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
if (windowWidth < 768) {// 间隙为 12px
    var imageWidth = ((windowWidth-3*12)*100/100)/2; //图片显示宽度(手机端)
} else {
    if(windowWidth > 1200){//主题限制
      windowWidth = 1200
      var imageWidth = (windowWidth-5*12)/4;
    }else
      var imageWidth = (windowWidth-4*12)/3; //图片显示宽度
}
var oneWidth = windowWidth -12;// 单图
photo = {
    page: 1,
    offset: imgMaxNum,
    init: function () {
        var that = this;
        $.getJSON(imgDataPath, function (data) {
            that.render(that.page, data);
            //that.scroll(data);
        });
    },
    render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
           imgNameWithPattern = data[i].split(' ')[1];
           imgName = imgNameWithPattern.split('.')[0]
           imageSize = data[i].split(' ')[0];
           imageX = imageSize.split('.')[0];
           imageY = imageSize.split('.')[1];
            li += '<div class="card" style="width:' + imageWidth + 'px" >' +
                    '<div class="ImageInCard" style="height:'+ imageWidth * imageY / imageX + 'px">' +
                      '<a data-fancybox="gallery" href="' + imgPath + imgNameWithPattern + '" data-caption="' + imgName + '" title="' +  imgName + '">' +
                        '<img data-src="' + imgPath + imgNameWithPattern + ' " src="' + imgPath + imgNameWithPattern + ' " data-loaded="true">' +
                      '</a>' +
                    '</div>' +
                  '</div>'
        }
        $(".ImageGrid").append(li);
        console.log(li)
        this.minigrid();
    },
    minigrid: function() {
        var grid = new Minigrid({
            container: '.ImageGrid',
            item: '.card',
            gutter: 12
        });
        grid.mount();
        $(window).resize(function() {
           grid.mount();
        });
    }
}
photo.init();