function start() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var name = user.displayName;
            var email = user.email;
            // var uid = user.uid;
            var photoUrl = user.photoURL;
            // var imgs = document.getElementById('userPhotos');
            var storageRef = firebase.storage().ref();

            document.getElementById('userDisPalyName').textContent = name;
            document.getElementById('userEmail').textContent = email;
            // document.getElementById('userUId').textContent = uid;
            console.log(photoUrl);
            // console.log(imgs.src);
            
            storageRef.child('userPhoto/' + user.uid + '/' + '0').getDownloadURL().then(function (url) {
                    console.log(url);
                    document.getElementById('userPhotos').innerHTML = '<img src="' + url + '" alt="" id="userPhotos">';
                    // document.getElementById('userPhotos').src =  url;
                });
            
            // imgs.src = '"'  ;
            
            // document.getElementById('userPhotos').src = photoUrl;
            
            // document.getElementById('userPhoto').innerHTML = '<img src="'+ photoUrl +'" alt=""></img>';
            document.getElementById('uppp').textContent = photoUrl;
            // document.getElementById('userPhotos').src = gai();
            // document.getElementById('userPhoto').innerHTML = '<img src="' + userPhoto + '" alt="">';
        }
    });

    document.getElementById('inBtn').addEventListener('click', signIn);
    document.getElementById('upBtn').addEventListener('click', signUp);
    document.getElementById('outBtn').addEventListener('click', signOut);
    document.getElementById('resetBtn').addEventListener('click', ResetEmail);
    document.getElementById('changeNameBtn').addEventListener('click', changeName);
    // document.getElementById('changePhoto').addEventListener('click', changePhoto);
    document.getElementById('file').addEventListener('change', handleFileSelect);

}
// 登录
function signIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            alert("登录成功");
            // location.reload();
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert("密码错误");
            } if (errorCode === 'auth/user-not-found') {
                alert("未找到此账号");
            }
            if (errorCode === 'auth/user-disabled') {
                alert("账号被禁用");
            }
            if (errorCode === 'auth/invalid-email') {
                alert("邮箱无效");
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
            location.reload();
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('密码过于简单');
            } if (errorCode == 'auth/email-already-in-use') {
                alert('当前账号已存在');
            } if (errorCode == 'auth/invalid-email') {
                alert('邮件无效');
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
        location.reload();
    });
}
// 改名
function changeName() {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: document.getElementById('changeName').value
    }).then(function () {
        alert("更新成功");
        location.reload();
    });
}
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var storageRef = firebase.storage().ref();
    var metadata = {
        'contentType': file.type
    };
    var user = firebase.auth().currentUser;
    // var id = user.uid;

    // Push to child path.
    storageRef.child('userPhoto/' + user.uid + '/' + '0').put(file, metadata).then(function (snapshot) {
        // Let's get a download URL for the file.
        snapshot.ref.getDownloadURL().then(function (url) {
            document.getElementById('linkbox').innerHTML = '<a href="' + url + '">Click For File</a>';
            // document.getElementById('userPhoto').innerHTML = '<img src="' + userPhoto + '" alt="">';
            // document.getElementById('userPhotos').src =  url;
            user.updateProfile({
                
                photoURL: '"' + url + '"'
                });
        });
    }).catch(function (error) {
        console.error('Upload failed:', error);
    });
}
function loadPhoto() {
    var user = firebase.auth().currentUser;
    var storageRef = firebase.storage().ref();
    storageRef.child('userPhoto/' + user.uid + '/' + '0').getDownloadURL().then(function (url) {
        console.log('File available at', url);
        document.getElementById('userPhotos').src = url;
    });
}
function openDialog() {
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}
function closeDialog() {
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}
function openChange() {
    document.getElementById('lightDropDown').style.display = 'block';
    document.getElementById('fadeDropDown').style.display = 'block';
}
function closeChange() {
    document.getElementById('lightDropDown').style.display = 'none';
    document.getElementById('fadeDropDown').style.display = 'none';
}