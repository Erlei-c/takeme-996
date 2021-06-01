window.onload = function () {
    initElement();
    initEvent();
    if (autoplay) {
        startAnimation(loopImgWrap);
    }
    init();
    var db = firebase.firestore();
    
    
    db.collection("post").orderBy("time", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var list = document.querySelector('#post-list');
            let li = document.createElement('li');
            let author = document.createElement('span');
            let time = document.createElement('span');
            let authorPhoto = document.createElement('img');
            let img = document.createElement('img');
            let title = document.createElement('h3');
            let content = document.createElement('p');
            var unixTimeStamp = new Date(doc.data().time.seconds * 1000);
            var commonTime = unixTimeStamp.toLocaleString();
            var authorPhotos=doc.data().authorPhoto.replaceAll("\"", "");
            li.setAttribute('data-id', doc.id);
            // authorPhoto.setAttribute('authorPhoto');
            authorPhoto.src=authorPhotos;
            author.textContent = doc.data().author;
            time.textContent = commonTime;
            img.src=doc.data().imgUrl;
            title.textContent = doc.data().title;
            content.textContent = doc.data().content;

            li.appendChild(authorPhoto);
            li.appendChild(author);
            li.appendChild(time);
            li.appendChild(title);
            li.appendChild(content);
            li.appendChild(img);
            list.appendChild(li);
        });
    });
    start();


}
function signOut() {
    firebase.auth().signOut().then(function () {
        alert("退出");
    });
}