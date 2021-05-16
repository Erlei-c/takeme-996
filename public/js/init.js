window.onload = function () {
    initElement();
    initEvent();
    if (autoplay) {
        startAnimation(loopImgWrap);
    }
    start();
}
function signOut() {
    firebase.auth().signOut().then(function () {
        alert("退出");
    });
}