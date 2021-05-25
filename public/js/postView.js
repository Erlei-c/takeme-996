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

// var dataIndex = 1;

// let db = firebase.firestore();
// db.collection("todos").orderBy("content", "asc")
//     .onSnapshot(function (querySnapshot) {
//         ulist = document.getElementById('ulist')
//         while (ulist.firstChild) {
//             ulist.removeChild(ulist.firstChild);
//         }
//         querySnapshot.forEach(function (doc) {
//             console.log(doc.id, " => ", doc.data());
//             // 生成DOM
//             var li = document.createElement('li');
//             var text = document.createTextNode("[" + doc.id + "]" + doc.data().title + " => " + doc.data().content);
//             li.appendChild(text);
//             ulist.appendChild(li);
//         });
//     });


// function loadData() {
//     let db = firebase.firestore();
//     ulist = document.getElementById('ulist')
//     while (ulist.firstChild) {
//         ulist.removeChild(ulist.firstChild);
//     }
//     db.collection("todos").orderBy("content", "asc").get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 console.log(doc.id, " => ", doc.data());
//                 // 生成DOM
//                 var li = document.createElement('li');
//                 var text = document.createTextNode("[" + doc.id + "]" + doc.data().title + " => " + doc.data().content);
//                 li.appendChild(text);
//                 ulist.appendChild(li);
//             });
//         })
//         .catch(function (error) {
//             console.log("Error getting documents: ", error);
//         });
// }
// function clearData() {
//     ulist = document.getElementById('ulist')
//     while (ulist.firstChild) {
//         ulist.removeChild(ulist.firstChild);
//     }
// }


// const db = firebase.firestore();
// db.collection('post').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc);
//     });
// });


