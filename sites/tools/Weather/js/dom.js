let input = document.querySelector(".search input")  // 城市
let mirror = document.querySelector(".mirror")  // 放大镜
let nowcity = document.querySelector(".banner .nowcity")  // 所在城市
let bigicon = document.querySelector(".temp .bigicon")  // 大图标

// detail 
let windScale = document.querySelector(".branch1-top")  // 风级
let windDir = document.querySelector(".branch1-bottom")  // 风向
let temp = document.querySelector(".temp .deg")  // 温度
let tip = document.querySelector(".tip")  // 提醒话语
let humidity = document.querySelector(".branch2-top")  // 湿度
let vis = document.querySelector(".branch3-top")  // 能见度
let feelsLike = document.querySelector(".branch4-top")  // 体感温度
let precip = document.querySelector(".branch5-top")  // 降水量
let pressure = document.querySelector(".branch6-top")  // 大气压

// banner 里面最近改为所在城市
let temp1 = document.querySelector('.city1')
let temp2 = document.querySelector('.city2')
let temp3 = document.querySelector('.city3')

// time
let currentime = document.querySelector(".currentime")  // 时间
let locate = document.querySelector(".locate")  // 定位
let nowtime = document.querySelector(".nowtime")  // 时间

// 时间星期
let time = nowTime()
nowtime.innerHTML = `<i>中国</i> ${time.year}-${time.month}-${time.date}   <i>${time.week}</i>`;

function rendertoday(data) {
    console.log(data.temp);
        temp.innerHTML = `${data.temp}°`  // 温度
        tip.innerHTML = `今天天气是${data.text}, 温度是${data.temp}°`
        windScale.innerHTML = `${data.windScale}级`  // 风级
        windDir.innerHTML = `${data.windDir}`  // 风向
        humidity.innerHTML = `${data.humidity}%`  // 湿度
        feelsLike.innerHTML = `${data.feelsLike}°`  // 体感温度
        vis.innerHTML = `${data.vis}km`  // 能见度
        pressure.innerHTML = `${data.pressure}hPa`  // 大气压
        precip.innerHTML = `${data.precip}mm`  // 降水量

        // 换大图标
        bigicon.className = `bigicon qi-${data.icon}`
}

function renderhour(data) {
    // 渲染页面
    const templine = document.querySelectorAll(".moveline .templine1")

    for (let i = 0; i < templine.length; i++) {
        // console.log(templine[i].childNodes[3].innerHTML);

        // 渲染页面
        // console.log(data[i*2].temp);  // 温度
        // console.log(data[i*2].text);  // 天气
        // console.log(data[i].icon);   // 天气图标

        // 先删除再添加  不然切换的话 点两次会出问题
        templine[i].childNodes[7].className = " "
        templine[i].childNodes[7].classList.add(`qi-${data[i * 2].icon}`)

        // 温度的改变
        templine[i].childNodes[13].innerHTML = `${data[i * 2].temp}°`

        // 时间的变化
        if (i < 7) {
            templine[i].childNodes[3].innerHTML = `${i * 2}am`
        }
        else {
            templine[i].childNodes[3].innerHTML = `${i * 2}pm`
        }

        // 柱形图的变化
        let nowtemp = data[i * 2].temp / 40
        let nowidth = nowtemp * 150
        // console.log(nowtemp, nowidth);
        templine[i].childNodes[11].style.height = `${nowidth}px`

    }
}

function renderrecent(data) {
    // 渲染页面
    const content = document.querySelectorAll(".seven .everyday")

    for (let i = 0; i < 7; i++) {
        // console.log(content[i].childNodes);  // 1 when 3 iconDay 5 tempMax 7 row 9 tempMin

        // console.log(content[i].childNodes[5]);
        // 天气图标
        content[i].childNodes[3].classList.add(`qi-${data[i].iconDay}`)

        // 最高温度
        content[i].childNodes[5].innerHTML = `${data[i].tempMax}°`
        let tempmax = data[i].tempMax
        let levelmax = (40 - tempmax) * 15
        content[i].childNodes[5].style.paddingLeft = `${levelmax}px`

        // 最低温度
        content[i].childNodes[9].innerHTML = `${data[i].tempMin}°`

        // 横状图 宽度
        let tempmin = data[i].tempMin
        let difftemp = tempmax - tempmin
        let levelwidth = difftemp * 15
        content[i].childNodes[7].style.width = `${levelwidth}px`

        // 日期变换
        let week = nowday()  // 星期数组
        content[i].childNodes[1].innerHTML = `${week[i]} <br>${data[i].fxDate}`


    }

    temp1.innerHTML = `<i class="qi-${data[0].iconDay}"></i> ${data[0].tempMax}° ${cityname}`
    temp2.innerHTML = `<i class="qi-${data[1].iconDay}"></i> ${data[1].tempMax}° ${cityname}`
    temp3.innerHTML = `<i class="qi-${data[2].iconDay}"></i> ${data[2].tempMax}° ${cityname}`
}

function renderinfo(data) {
    let indices = document.querySelectorAll(".indices1")  // 5个
    // console.log(indices[0].childNodes);  // 1 3
    for (let i = 0; i < indices.length; i++)
    {
        indices[i].childNodes[3].innerHTML = `${data[i].text}`
    }
}