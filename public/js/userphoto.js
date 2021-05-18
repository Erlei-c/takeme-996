// 用户上传图片

/* 
    上传路径为'userPhoto' + uid + file.name
    var uid =user.uid
*/
var user = firebase.auth().currentUser;
var id = user.uid;
var storageRef = firebase.storage().ref();

function handleFileSelect(evt) {
    var user = firebase.auth().currentUser;
    var id = user.uid;
    var storageRef = firebase.storage().ref();
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];

    var metadata = {
        'contentType': file.type
    };

    storageRef.child('images/' + id + file.name).put(file, metadata).then(function (snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log('File metadata:', snapshot.metadata);
        // Let's get a download URL for the file.
        snapshot.ref.getDownloadURL().then(function (url) {
            console.log('File available at', url);
            // document.getElementById('linkbox').innerHTML = '<a href="' + url + '">Click For File</a>';
            // document.getElementById('userPhoto').innerHTML = '<img src="' + url + '" alt="">';
            user.updateProfile({
                photoURL: url
            })
        });
    }).catch(function (error) {
        console.error('Upload failed:', error);
    });
}

// function changePhoto(){
//     var user = firebase.auth().currentUser;
//     var photo = document.getElementById('file');
//     user.updateProfile({
//         photoURL:photo.files
//     }).then(function() {
//         alert("更新成功");
//         location.reload();
//     });
// }