function openApp(_open, _down) {
    if (checkIos()) { //苹果
        if (checkUniversalLinks()) { //ios9及以上
            if (checkWechart() || checkWeibo() || checkQQ()) { //微博，微信（可打开应用宝）
                // window.location.href = _open;
                return false;
            } else if (checkSafari() || checkBrowser()) { //safari/qq/其他浏览器
                window.location.href = _open;
            }
            return false;
        }
        //ios9以下
        if (checkWechart() || checkWeibo() || checkQQ()) {
            //屏蔽
            // $("#wx_mask").removeClass("hide");
            return false;
        }
        ifrToApp(_open, function (status) {
            if (status == 0) {
                window.location.href = _down;
            }
        });
    } else if (checkAndroid()) { //安卓
        if (checkWechart() || checkWeibo()) {
            //屏蔽
            // $("#wx_mask").removeClass("hide");
            return false;
        }
        ifrToApp(_open, function (status) {
            if (status == 0) {
                window.location.href = _down;
            }
        });
    } else {
        window.location.href = _down;
    }
}

function ifrToApp(openUrl, callback) {
    // alert("在iframe中")
    //检查app是否打开
    function checkOpen(cb) {
        var _clickTime = +(new Date());

        function check(elsTime) {
            if (elsTime > 2000 || document.hidden) {
                cb(1);
            } else {
                cb(0);
            }
        }
        //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过2000ms，超过则结束
        var _count = 0,
            intHandle;
        intHandle = setInterval(function () {
            _count++;
            var elsTime = +(new Date()) - _clickTime;
            if (_count >= 50 || elsTime > 2000) {
                clearInterval(intHandle);
                check(elsTime);
            }
        }, 20);
    }
    //在iframe 中打开APP
    var ifr = document.createElement('iframe');
    ifr.src = openUrl;
    ifr.style.display = 'none';
    if (callback) {
        checkOpen(function (opened) {
            callback && callback(opened);
        });
    }
    document.body.appendChild(ifr);
    setTimeout(function () {
        document.body.removeChild(ifr);
    }, 1000);
}

function getOS() {
    var u = navigator.userAgent;
    var isMobile = u.indexOf("Mobile") > -1;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // console.log(u)
    if (!isMobile) {
        return "pc";
    } else {
        if (isAndroid) return "android";
        if (isiOS) return "ios";
    }
    return "pc";
}

function getVersion() {
    var isPhone = navigator.userAgent.match(/OS [0-9]+_\d[_\d]* like Mac OS X/i);
    if (isPhone) {
        return parseInt(isPhone[0].split(" ")[1]);
    } else {
        return 1;
    }
}
//检查是否浏览器
function checkBrowser() {
    return !checkWechart() && !checkQQ() && !checkWeibo()
}
//检查是否为安卓
function checkAndroid() {
    return agent.indexOf("android") > 0;
}
//检查是否为ios
function checkIos() {
    return agent.match(/iphone os/i) == 'iphone os' || agent.match(/ipad/i) == 'ipad';
}
//检查是否ios9及以上
function checkUniversalLinks() {
    var isPhone = agent.match(/OS [0-9]+_\d[_\d]* like Mac OS X/i);
    return isPhone && isPhone.length > 0 && parseInt(isPhone[0].split(" ")[1]) >= 9;
}
//检查是否微信
function checkWechart() {
    return agent.indexOf("micromessenger") > 0;
}
//检查是否qq 内置浏览器
function checkQQ() {
    return agent.indexOf("qq/") > 0;
}
//检查是否微博
function checkWeibo() {
    return agent.indexOf("weibo") > 0;
}
//safari
function checkSafari() {
    //排除几个主流浏览器 百度 360 uc qq chrome
    return !/baidubrowser|qhbrowser|ucbrowser|mqqbrowser|crios/.test(agent) && /safari/.test(agent)
}



//IOS图片旋转
function selectImage() {
    var _this = this;
    var Orientation = null;
    var $form = $('form#uploadimage');
    var r = new FileReader();
    try {
        var f = document.getElementById('selectfile').files[0];
    } catch (e) {
        return false;
    }
    // console.log('f:',f)
    // var imgSize = f.size / 1024;
    if (!f) {
        return false;
    }
    if (f.type.indexOf('image') > -1) {
        r.readAsDataURL(f);

        // 获取照片方向角属性，用户旋转控制
        EXIF.getData(f, function () {
            EXIF.getAllTags(this);
            Orientation = EXIF.getTag(this, 'Orientation');
        });
        r.onload = function (e) {
            var Url = this.result;
            var image = new Image();
            image.src = Url;
            image.onload = function () {
                var expectWidth = this.naturalWidth;
                var expectHeight = this.naturalHeight;

                //   if (image.width < 300 || image.height < 300) {
                //     return false;
                //   }
                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                    expectWidth = 800;
                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                    expectHeight = 1200;
                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                }
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                var base64 = null;
                if (checkAndroid()) { // 修复android
                    /*var encoder = new JPEGEncoder();
                     base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);*/
                    // base64 = Url;
                } else { //修复ios
                    //如果方向角不为1，都需要进行旋转
                    if (Orientation != '' && Orientation != 1) {
                        switch (Orientation) {
                            case 6: //需要顺时针（向左）90度旋转
                                _this.rotateImg(this, 'left', canvas);
                                break;
                            case 8: //需要逆时针（向右）90度旋转
                                _this.rotateImg(this, 'right', canvas);
                                break;
                            case 3: //需要180度旋转
                                _this.rotateImg(this, 'right', canvas); //转两次
                                _this.rotateImg(this, 'right', canvas);
                                break;
                        }
                    }
                }
                var scale = 0.8;
                if (imgSize > 500) {
                    scale = Math.floor(500 / imgSize * 100) / 100;
                }
                base64 = canvas.toDataURL("image/jpeg", scale);
            };
        };
    }
}
//对图片旋转处理
function rotateImg(img, direction, canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向
    var min_step = 0;
    var max_step = 3;
    if (img == null) return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    var height = img.height;
    var width = img.width;
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //旋转角度以弧度值为参数
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}

/**
 * 设置页面标题
 * @method setTitle
 * @param {string} title 标题内容
 */
function setTitle(title) {
    if (title) {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            document.title = title;
        } else if (isiOS) {
            let i = document.createElement('iframe');
            i.src = '/static/favicon.ico';
            i.style.display = 'none';
            document.title = title;
            i.onload = function () {
                setTimeout(function () {
                    i.remove();
                }, 1);
            };
            document.body.appendChild(i);
        }
    }
}