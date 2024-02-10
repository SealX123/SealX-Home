// 对象
let obj = {
    location: '10110101',
    key: '657cd27e08124efd94f6f692238ecc3c'
}


// 实时更新时间
setInterval(function () {
    let time = nowTime()
    currentime.innerHTML = `${time.year}-${time.month}-${time.date}  ${time.hour}:${time.minutes}:${time.second}`;
})

// 定位
locate.addEventListener('click', function () {
    alert('定位失败！')
})


// 页面一加载 就显示
window.addEventListener('load', main)

// 用 promise 链式调用
// 点击搜索事件
var cityid;
var weatherdata;
var hourdata;
var cityname;

input.addEventListener('focus', function () {
    input.value = ''
})
mirror.addEventListener('click', main)

function main() {
    // 第一次请求
    // 城市搜索  根据城市名字搜索城市 ID
    obj.location = input.value

    ajax(
        'GET',
        'https://geoapi.qweather.com/v2/city/lookup',
        obj
    ).then(id => {
        id = JSON.parse(id)
        console.log('success1');
        // id id id
        cityid = id.location[0].id;
        console.log(cityid);
        nowcity.innerHTML = id.location[0].name;
        cityname = id.location[0].name  // 后面要用

        // 发送第二次请求
        obj.location = cityid
        return ajax(
            'GET',
            'https://devapi.qweather.com/v7/weather/now?',
            obj)

    }).then(weatherdata => {
        console.log('success2');

        weatherdata = JSON.parse(weatherdata)
        console.log(weatherdata);
        // weatherdata = weatherdata.now
        // 渲染页面
        rendertoday(weatherdata.now)

        // 发送第三次请求
        return ajax(
            'GET',
            'https://devapi.qweather.com/v7/weather/24h?',
            obj)

    }).then(hour => {
        console.log('success3');

        hour = JSON.parse(hour)

        // 数据
        hourdata = hour.hourly;

        // 渲染页面
        renderhour(hourdata)

        // 发送第四次请求
        return ajax('GET', 'https://devapi.qweather.com/v7/weather/7d?', obj)


    }).then(sevendata => {
        sevendata = JSON.parse(sevendata)
        sevendata = sevendata.daily

        console.log('success4');

        // 渲染页面
        renderrecent(sevendata)

        // 发送第五次请求
        let obj1 = { ...obj };  // 对象复制 扩展运算符不会改变原对象
        obj1.type = ['1,2,3,6,16']  // type 参数
        return ajax('GET', 'https://devapi.qweather.com/v7/indices/1d?', obj1)
    }).then(info => {
        info = JSON.parse(info)

        let data = info.daily  // 数组

        // 渲染页面
        renderinfo(data)

    }).catch(error => {
        console.log('error', error);
    })

}




