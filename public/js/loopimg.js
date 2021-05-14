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

    var firstItem = loopImgLi[0].cloneNode(true);
    loopImgWrap.appendChild(firstItem);

    loopItemWidth = loopImgLi[0].offsetWidth;
}

function initEvent() {
    loopImg.addEventListener("mouseover", function () {
        clearTimeout(autoplayId);
        autoplay = false;
    });
    loopImg.addEventListener("mouseout", function () {
        autoplay = true;
        startAnimation(loopImgWrap);
    });

    var indicators = indicatorWrap.children;
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].setAttribute("index", i);
        indicators[i].addEventListener("click", function () {
            var index = parseInt(this.getAttribute("index"));
            next(index);
        });
    }

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
    var step = 5;
    var time = 5;
    var gap = (Math.abs(target - element.offsetLeft) / loopItemWidth);
    if (gap > 1) {
        step = step * gap;
        time = time / gap;
    }
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