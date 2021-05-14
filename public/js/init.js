window.onload = function () {
    start();
    initElement();
    initEvent();
    if (autoplay) {
        startAnimation(loopImgWrap);
    };
}
function signOut() {
    firebase.auth().signOut().then(function () {
        alert("退出");
    });
}