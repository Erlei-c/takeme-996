function start() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var name = user.displayName;
            var email = user.email;
            var uid = user.uid;
            document.getElementById('userDisPalyName').textContent = name;
            document.getElementById('userEmail').textContent = email;
            document.getElementById('userUId').textContent = uid;
        }
    });

    document.getElementById('inBtn').addEventListener('click', signIn);
    document.getElementById('upBtn').addEventListener('click', signUp);
    document.getElementById('outBtn').addEventListener('click', signOut);
    document.getElementById('resetBtn').addEventListener('click', ResetEmail);
    document.getElementById('changeNameBtn').addEventListener('click', changeName);
}
// 登录
function signIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            alert("登录成功");
            window.reload();
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert("密码错误");
            } else {
                alert(errorMessage);
            }
        });
}
// 注册
function signUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            alert("注册成功");
            window.reload();
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
        });
}
// 密码重置
function ResetEmail() {
    var email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            alert("邮件已发送")
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/invalid-email') {
                alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
                alert(errorMessage);
            }
        });
}
// 确认邮箱
function viewEmail() {
    var email = document.getElementById('email').value;
    firebase.auth().sendEmailVerification(email)
        .then(function () {
            alert('Email Verification Sent!');
        });
}
// 登出
function signOut() {
    firebase.auth().signOut().then(function () {
        alert("退出");
        window.reload();
    });
}
// 改名
function changeName(){
    var user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: document.getElementById('changeName').value
    }).then(function() {
        alert("更新成功");
        window.reload();
    });
}
function openDialog() {
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block'
}
function closeDialog() {
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none'
}