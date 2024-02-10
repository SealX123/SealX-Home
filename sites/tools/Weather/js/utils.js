// 工具函数

// 获取星期 近七天
function nowday() {
    var current = new Date();  // 实例化Date对象
    var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var day = current.getDay();
    var week = [];

    for (let i = 0; i < 7; i++)
    {
        if (day === 7)
        {
            day = 0;
        }
        week.push(arr[day])
        day++;
    }
    // console.log(week);
    return week;
}
nowday()

// 获取当前时间
function nowTime() {
    var current = new Date();  // 实例化Date对象
    var nowYear = current.getFullYear();
    var nowMonth = current.getMonth() + 1;  // 默认显示的是 0-11 月，比我们正常的月份少一个月，所以要 +1
    var nowdates = current.getDate(); // 获取日期
    var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var day = current.getDay();
    // getDay（）返回 1 2 数字  获取星期几 先写好数组存放 通过数组的索引来获取星期几
    // 补零

    var nowMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth;
    var nowdates = nowdates < 10 ? '0' + nowdates : nowdates;


    // 时间
    let h = current.getHours();
    h = h < 10 ? '0' + h : h;
    let m = current.getMinutes();
    m = m < 10 ? '0' + m : m;
    let s = current.getSeconds();
    s = s < 10 ? '0' + s : s;

    return {
        year: nowYear,
        month: nowMonth,
        date: nowdates,
        hour: h,
        minutes: m,
        second: s,
        week: arr[day]
    }

}
nowTime();


// 拼接参数
function addQuery(string, obj)
{
    let str = ''

    for (let i in obj)
    {
        str += `&${i}=${obj[i]}`
    }

    // todo 如果有 query 参数 怎么做区分
    if (string.indexOf('?') !== -1) {
        // console.log(string + str.slice(1));
        return string + str.slice(1)
    }
    else
    {
        return  string + '?' + str.slice(1)
    }
}

// const str = addQuery('https://?', {name: 123, age: 12})
// console.log(str);
