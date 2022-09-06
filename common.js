// 手机号验证
var validate = function(num) {
    var reg = /^1[3-9]\d{9}$/;
    return reg.test(num);
};
//获取时间  10位时间戳
var serverTime = new Date($.ajax({
    async: false
}).getResponseHeader("Date"))

// 身份证号验证
var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;

// ip验证
var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/

// 阻止冒泡
function stopBubble(e){
    e = e || window.event;  
    if(e.stopPropagation){
        e.stopPropagation();  //W3C阻止冒泡方法  
    }else {  
        e.cancelBubble = true; //IE阻止冒泡方法  
    }  
}

//=====================================================dom\
// 元素包含
let contains = document.documentElement.contains ?
                (parent, node) => parent !== node && parent.contains(node) : 
                (parent, node) =>  {
                    while (node && (node = node.parentNode))
                    if (node === parent) return true
                    return false
                }
//=====================================================obj
// json对象是否相等
function deepCompare(x, y) {
    var i, l, leftChain, rightChain;
    function compare2Objects(x, y) {
        var p;
        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }
        // Compare primitives and functions.     
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) return true;
        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }
        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) return false;
        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) return false;
        if (x.constructor !== y.constructor) return false;
        if (x.prototype !== y.prototype) return false;
  
        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) return false;
  
        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }
        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
            switch (typeof(x[p])) {
                case 'object':
                case 'function':
                    leftChain.push(x);
                    rightChain.push(y);
                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }
                    leftChain.pop();
                    rightChain.pop();
                    break;
                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }
        return true;
    }
    if (arguments.length < 1) {
        return true; //Die silently? Don't know how to handle such case, please help...
        // throw "Need two or more arguments to compare";
    }
    for (i = 1, l = arguments.length; i < l; i++) {
        leftChain = []; //Todo: this can be cached
        rightChain = [];
        if (!compare2Objects(arguments[0], arguments[i])) return false;
    }
    return true;
}
// 深度拷贝
const deepClone = function(obj) {
    // 先检测是不是数组和Object
    // let isArr = Object.prototype.toString.call(obj) === '[object Array]';
    let isArr = Array.isArray(obj);
    let isJson = Object.prototype.toString.call(obj) === '[object Object]';
    if (isArr) {
        // 克隆数组
        let newObj = [];
        for (let i = 0; i < obj.length; i++) {
            newObj[i] = deepClone(obj[i]);
        }
        return newObj;
    } else if (isJson) {
        // 克隆Object
        let newObj = {};
        for (let i in obj) {
            newObj[i] = deepClone(obj[i]);
        }
        return newObj;
    }
    // 不是引用类型直接返回
    return obj;
};

Object.prototype.deepClone = function() {
    return deepClone(this);
};
Object.defineProperty(Object.prototype, 'deepClone', {enumerable: false});
/**
 * @method isClass obj判断类型：返回传递给他的任意对象的类
 * @param {any}
 * @return {string}
 */
function isClass(o){
    if(o === null) return "Null";
    if(o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}

// obj判断是否为空{}
function isEmptyObject(obj){
    var t;
    for (t in obj)
        return !1;
    return !0
}

/**
 * @method getDateStrByStamp  时间戳（毫秒）转"yy-mm-dd hh:mm:ss"
 * @param _stamp 时间戳
 * @return {string}  "yy-mm-dd hh:mm:ss"
 */
function getDateStrByStamp(_stamp){
    if(!_stamp || _stamp<=0) return "";
    let date = new Date(_stamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y + M + D + h + m + s;
}
/**
 * @method getDateStrLastByStamp  毫秒 转 “x天x小时”
 * @param _stamp 毫秒
 * @return {string} “x天x小时”
 */
function getDateStrLastByStamp(_stamp){
    let t = _stamp / 1000;//计算剩余的秒数
    let days = Math.floor(t / 60 / 60 / 24);
    let hours = Math.floor(t / 60 / 60 - (24 * days));
    let str = "";
    if(days>0){
        str += days + "天";
    }
    str += hours + "小时";
    return str;
}

//=====================================================array
// 数组去重
var unique = function(arr) {
    var result = [], json = {};
    for (var i = 0, len = arr.length; i < len; i++){
        if (!json[arr[i]]) {
            json[arr[i]] = 1;
            result.push(arr[i]);  //返回没被删除的元素
        }
    }
    return result;
};

// 判断数组元素是否重复
var isRepeat = function(arr) {  //arr是否有重复元素
    var hash = {};
    for (var i in arr) {
        if (hash[arr[i]]) return true;
        hash[arr[i]] = true;
    }
    return false;
};

//======================================================url
/**
 * @method getQueryString   获取url参数
 * @param {string}  url
 * @param {string}  key
 * @param {string}
 */
function getQueryString(url, key){
    // url = "http://192.168.2.151:8009/?p1=xxxccc&p2=1122%33&p3=22ss22";
    let qulist = url.match(new RegExp("[^\?&]*"+key+"=+[^&]*"));
    return qulist ? qulist[0].split('=')[1] : null;
}
function setCookie(cname, cvalue, exdays) {
    exdays = 365;
    var d = new Date();
    this.delCookie(cname);
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(name){ //匹配字段
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}
function delCookie(name){ //删除cookies
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if(cval != null) document.cookie= name + "=" + cval + ";expires=" + exp.toGMTString();
}




// console.log('jp')
(_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["BS","TAB","CAPS","ENTER"][p++]||'SHIFT',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
`)()