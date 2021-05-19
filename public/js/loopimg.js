var autoplay = true;
var autoplay_Delay = 2000; // ms
var autoplayId;
var intervalId;

var loopImg;
var loopImgWrap;
var loopImgLi;
var indicatorWrap;

var loopItemWidth;
var curIndex = 0;

function initElement() {
    loopImg = document.getElementById("loopImg");
    loopImgLi = loopImg.getElementsByClassName("liList");
    loopImgWrap = loopImg.getElementsByClassName("loopImgWrap")[0];
    indicatorWrap = loopImg.getElementsByClassName("indicatorWrap")[0];
    // 将第一个图片复制到最后
    var firstItem = loopImgLi[0].cloneNode(true);
    loopImgWrap.appendChild(firstItem);
    // 设置宽度
    loopItemWidth = loopImgLi[0].offsetWidth;
}

function initEvent() {
    // 鼠标移入时自动播放停止
    loopImg.addEventListener("mouseover", function () {
        clearTimeout(autoplayId);
        autoplay = false;
    });
    // 鼠标移出时自动播放开始
    loopImg.addEventListener("mouseout", function () {
        autoplay = true;
        startAnimation(loopImgWrap);
    });
    // 设置指针 的移动
    var indicators = indicatorWrap.children;
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].setAttribute("index", i);
        indicators[i].addEventListener("click", function () {
            var index = parseInt(this.getAttribute("index"));
            next(index);
        });
    }
    // 获取元素 设置监听事件
    var leftArrow = loopImg.getElementsByClassName("leftArrow")[0];
    var rightArrow = loopImg.getElementsByClassName("rightArrow")[0];
    leftArrow.addEventListener("click", function () {
        prev();
    });
    rightArrow.addEventListener("click", function () {
        next();
    });
}

function animate(element, target) {
    var step = 5; //设置移动距离
    var time = 5; //设置时间 
    //设置距离
    var gap = (Math.abs(target - element.offsetLeft) / loopItemWidth);
    if (gap > 1) {
        // 距离越大 移动的距离越大，移动的时间变小
        step = step * gap;
        time = time / gap;
    }
    // 要移动的元素 以及移动的目标值
    if (element) {
        step = (element.offsetLeft > target) ? -step : step;
        clearInterval(intervalId);
        setCurrentActiveIndicator(curIndex);
        intervalId = setInterval(function () {
            if ((step < 0) && (Math.abs(element.offsetLeft + step) < Math.abs(target))) {
                element.style.left = element.offsetLeft + step + "px";
            } else {
                if (Math.abs(target - element.offsetLeft) > Math.abs(step)) {
                    element.style.left = element.offsetLeft + step + "px";
                } else {
                    clearInterval(intervalId);
                    intervalId = -1;
                    element.style.left = target + "px";
                    if (autoplay) {
                        startAnimation(element);
                    }
                }
            }
        }, time);
    }
}

function prev() {
    // 向前移动 当前位置-1 如果当前位置小于0 元素的左值等于 元素的个数减1乘图片宽度
    // 当前位置等于元素的个数-2
    // 传入到动画函数中 元素 以及当前位置乘图片宽度
    var element = loopImgWrap;
    var li = element.children;
    curIndex = curIndex - 1;
    if (curIndex < 0) {
        element.style.left = -((li.length - 1) * loopItemWidth) + "px";
        curIndex = li.length - 2;
    }
    animate(element, -(curIndex * loopItemWidth));
}

function next(nextIndex) {
    // 如果下一个位置不等于空 下一个位置的属性不是无法找到 当前位置等于下一个位置
    // 否则 当前位置自增一
    var element = loopImgWrap;
    var li = element.children;
    if ((nextIndex != null) && (typeof (nextIndex) != "undefined")) {
        curIndex = nextIndex;
    } else {
        curIndex = curIndex + 1;
        if (curIndex > (li.length - 1)) {
            element.style.left = 0 + "px";
            curIndex = 1;
        }
    }
    animate(element, -(curIndex * loopItemWidth));
}

function startAnimation(element) {
    if (autoplayId) {
        clearTimeout(autoplayId);
    }
    autoplayId = setTimeout(function () {
        next();
    }, autoplay_Delay);
}

function setCurrentActiveIndicator(index) {
    var indicators = indicatorWrap.children;
    if (index == indicators.length) {
        index = 0;
    }
    for (var i = 0; i < indicators.length; i++) {
        if (i == index) {
            indicators[i].className = "indicator active";
        } else {
            indicators[i].className = "indicator";
        }
    }
}