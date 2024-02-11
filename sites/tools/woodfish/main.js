console.clear();

// 本地:
const sound = new Howl({src: ['./sound.mp3']});
const bgm = new Howl({src: ['./bgm.mp3'], html5:true, loop: true, volume: 0.2});

var ringId = 0;
var bgmId = 0;
let count = 0;
let countFlag = false;

function startAnimate() {
    $(".count").css("transform", "scale(1.1)");
    $(".woodenfish").css('transform', 'scale(.99)');
}

function initAnimate() {
    $(".count").css("transform", "scale(1)");
    $(".woodenfish").css('transform', 'scale(1)');
}

function counter() {
    countFlag = true;
    count++;
    $(".count").html(count);
    startAnimate();
    if (ringId != 0) {
        if (sound.playing()) {
            sound.stop(ringId);
        }
        sound.play(ringId);
    } else {
        ringId = sound.play();
    }
}

$(document).keydown(function (e) {
    if (e.key == " " && e) {
        if (!countFlag) {
            counter();
        }
    }
});

$(document).keyup(function (e) {
    if (e.key == " " && e) {
        countFlag = false;
        initAnimate();
    }
});

if (typeof window.orientation !== 'undefined') {
    $(".woodenfish").on('touchstart',function(e) {
        counter();
    })
    
    $(".woodenfish").on('touchmove',function(e) {
        initAnimate();
    });
    
    $(".woodenfish").on('touchend',function(e) {
        initAnimate();
    });
}else{
    $(".woodenfish").mouseup(function () {
        initAnimate();
    });
    
    $(".woodenfish").mousedown(function () {
        counter();
    });
}

$(".logo").click(function (e) {
    if (bgm.playing() && bgm.state().toString() == "loaded") {
        bgm.pause(bgmId);
    } else {
        if (bgmId != 0) {
            bgm.play(bgmId);
        } else {
            bgmId = bgm.play();
        }
    }
});
