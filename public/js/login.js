function start() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var name = user.displayName;
            var email = user.email;
            // var uid = user.uid;
            // var photoUrl = user.photoURL;
            var storageRef = firebase.storage().ref();
            var db = firebase.firestore();

            db.collection("post").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                });
            });

            document.getElementById('userDisPalyName').textContent = name;
            document.getElementById('userEmail').textContent = email;
            // console.log(photoUrl);

            storageRef.child('userPhoto/' + user.uid + '/' + '0').getDownloadURL().then(function (url) {
                // console.log(url);
                document.getElementById('userPhotos').innerHTML = '<img src="' + url + '" alt="" id="userPhotos">';
            });
            // document.getElementById('uppp').textContent = photoUrl; 测试用

        }
    });

    document.getElementById('inBtn').addEventListener('click', signIn);
    document.getElementById('upBtn').addEventListener('click', signUp);
    document.getElementById('outBtn').addEventListener('click', signOut);
    document.getElementById('resetBtn').addEventListener('click', ResetEmail);
    document.getElementById('changeNameBtn').addEventListener('click', changeName);
    // document.getElementById('postSend').addEventListener('click', uploading);
    document.getElementById('file').addEventListener('change', handleFileSelect);
    document.getElementById('postFile').addEventListener('change', uploading);
    document.querySelector('#addPost').addEventListener('submit', addData);
}
    // 登录
    function signIn() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                alert("登录成功");
                location.reload();
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
    function uploading(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var file = evt.target.files[0];
        var storageRef = firebase.storage().ref();
        var metadata = {
            'contentType': file.type
        };
        var user = firebase.auth().currentUser;

        // Push to child path.
        storageRef.child('postImgs/' + user.uid + file.name).put(file, metadata).then(function (snapshot) {
            // Let's get a download URL for the file.
            snapshot.ref.getDownloadURL().then(function (url) {
                document.getElementById('linkspan').innerHTML = '<a href="' + url + '">Click For File</a>';
                addData(url);
            });
        }).catch(function (error) {
            console.error('Upload failed:', error);
        });
    }

    function addData(url) {
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;
        
        // var postTitle = document.getElementById('postTitle').value;
        // var postContent = document.getElementById('postContent').value;
        const form = document.querySelector('#addPost');
        // Add a new document in collection "cities"
        db.collection("post").add({
            title: form.postTitle.value,
            content: form.postContent.value,
            time: firebase.firestore.Timestamp.fromDate(new Date()),
            author: user.displayName,
            authorPhoto: user.photoURL,
            imgUrl: url
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    function realTimeDB(){
        var db = firebase.firestore();
        db.collection('posst').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                console.log(change.doc.data());
                if(change.type == 'added'){
                    createPostView(change.doc);
                }
            });
        });
    }
    function createPostView(doc){
        var postview = document.getElementsByClassName('createPostWrap');
        
        var infodiv= document.createElement('div');
        infodiv.setAttribute('dataId',doc.id);
        var contentdiv= document.createElement('div');

        var title = document.createElement('h3');
        var content = document.createElement('p');
        var postTime = document.createElement('span');
        var author = document.createElement('span');
        var authorPhoto = document.createElement('img');
        var imgUrl = document.createElement('img');

        title.textContent=doc.data().title;
        content.textContent=doc.data().content;
        postTime.textContent=doc.data().time;
        author.textContent=doc.data().author;
        imgUrl.src=doc.data().imgUrl;
        authorPhoto.src=doc.data().authorPhoto.trim('"');

        infodiv.appendChild(authorPhoto);
        infodiv.appendChild(author);
        infodiv.appendChild(postTime);

        contentdiv.appendChild(title);
        contentdiv.appendChild(content);
        contentdiv.appendChild(imgUrl);

        postview.appendChild(infodiv);
        postview.appendChild(contentdiv);

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