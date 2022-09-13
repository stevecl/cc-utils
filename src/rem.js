let tid;
function setRem (_value){
    let value = _value || 750;
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    let devWidth = height > width ? width : height;
    if (devWidth > value) devWidth = value; //取短后是否会大于750
    document.documentElement.style.fontSize = devWidth / (value / 100) + 'px';
}

setRem();

window.addEventListener('resize', ()=>{
    clearTimeout(tid);
    tid = setTimeout(setRem, 300);
}, false);

window.addEventListener('pageshow', (e)=>{
    if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(setRem, 300);
    }
}, false);

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

export {
    setRem,
    setTitle
}