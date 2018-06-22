// 手机自适应rem单位
function mobileRespon(w, max) {
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');
    metaEl.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0');
    dpr = window.devicePixelRatio || 1;
//    rem与px的转换比例设置成7.5 在iphone6 下 1rem=100px;
//    rem = docEl.clientWidth * dpr / 10;
    if(max==0){
        rem = docEl.clientWidth * dpr / (w / 100);
    }else{
        var docWidth = docEl.clientWidth > max ? max : docEl.clientWidth;
        rem = docWidth * dpr / w * 100;
    }

    scale = 1 / dpr;


// 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

// 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    if(max==0){
        fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';
    }else{
        fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;max-width:' + max * dpr + 'px!important}';
    }

// 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function (v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem = function (v) {
        v = parseFloat(v);
        return v / rem;
    };

    window.dpr = dpr;
    window.rem = rem;
}

mobileRespon(640,0);

var resizeTimer;
$(window).resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        mobileRespon(640,0);
    },500);
});