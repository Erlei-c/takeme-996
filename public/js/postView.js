// function listenerBtn(){
//     document.getElementById('postSend').addEventListener('click',addData);
//     document.getElementById('postGet').addEventListener('click',getData);
// }
// // 添加数据
// function addData(){
//     firebase.auth().onAuthStateChanged(function(user){
//         var userName=user.displayName;
//         firebase.firestore.collection("users").add({
//             userName:userName,
//             title:document.getElementById('title').value,
//             content:document.getElementById('content').value,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp()
//         });
//     });

// }

// // 读取数据
// function getData(){
//     var db = firebase.firestore();
//     db.collection("users").get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(`${doc.id} => ${doc.data()}`);
//         });
//     });
// }
const firebaseConfig = {
    apiKey: "AIzaSyAyerfevCSlJJVgBMfVtf3hN1hA6BqAPDk",
    authDomain: "take-me-996.firebaseapp.com",
    databaseURL: "https://take-me-996-default-rtdb.firebaseio.com",
    projectId: "take-me-996",
    storageBucket: "take-me-996.appspot.com",
    messagingSenderId: "271316744439",
    appId: "1:271316744439:web:a47c8504fd2802ee3ebbf2",
    measurementId: "G-DFMGEV6Z83"
};
var dataIndex = 1
///////////////////////////////////////////////////////////////////////
let db = firebase.firestore();
db.collection("todos").orderBy("content", "asc")
    .onSnapshot(function (querySnapshot) {
        ulist = document.getElementById('ulist')
        while (ulist.firstChild) {
            ulist.removeChild(ulist.firstChild);
        }
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            // 生成DOM
            var li = document.createElement('li');
            var text = document.createTextNode("[" + doc.id + "]" + doc.data().title + " => " + doc.data().content);
            li.appendChild(text);
            ulist.appendChild(li);
        });
    });
function addData() {
    // Add a new document in collection "cities"
    db.collection("todos").add({
        title: "学习Firebase",
        content: "买书看小马视频(" + (dataIndex++).toString() + ")",
        finished: false,
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}
function loadData() {
    ulist = document.getElementById('ulist')
    while (ulist.firstChild) {
        ulist.removeChild(ulist.firstChild);
    }
    db.collection("todos").orderBy("content", "asc").get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());
                // 生成DOM
                var li = document.createElement('li');
                var text = document.createTextNode("[" + doc.id + "]" + doc.data().title + " => " + doc.data().content);
                li.appendChild(text);
                ulist.appendChild(li);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
function clearData() {
    ulist = document.getElementById('ulist')
    while (ulist.firstChild) {
        ulist.removeChild(ulist.firstChild);
    }
}