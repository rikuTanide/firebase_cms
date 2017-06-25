var database = firebase.database();
var type = "";
var id = "";
if (document.location.pathname.split("/").length == 4) {
    type = document.location.pathname.split("/")[2];
    id = document.location.pathname.split("/")[3];
}
function toDateTimeString(date) {
    function zero(i) {
        if (i < 10) {
            return "0" + i;
        }
        return "" + i;
    }
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + zero(month) + "-" + zero(day) + " " + zero(hour) + ":" + zero(minute) + ":" + zero(second);
}
// let type = "test_review";
// let id = "-KnSZXyGV_woDuFDuRRD";
var date = toDateTimeString(new Date());
var tech_review_list = document.getElementById("tech-review-list");
var book_review_list = document.getElementById("book-review-list");
var body = document.getElementById("body");
var title = document.getElementById("title");
var tech_add = document.getElementById("add-tech");
tech_add.addEventListener("click", function () {
    id = database.ref("tech_reviews/").push({
        title: "無題",
        datetime: toDateTimeString(new Date()),
        body: "テキスト"
    }).key;
    window.history.pushState("", "", "/edit/tech_reviews/" + id);
    type = "tech_reviews";
    body.value = "";
    title.value = "";
});
var book_add = document.getElementById("add-book");
book_add.addEventListener("click", function () {
    id = database.ref("book_reviews/").push({
        title: "無題",
        datetime: toDateTimeString(new Date()),
        body: "テキスト"
    }).key;
    window.history.pushState("", "", "/edit/book_reviews/" + id);
    type = "book_reviews";
    body.value = "";
    title.value = "";
});
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    }
    else {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }
});
var save = document.getElementById("save");
save.addEventListener("click", function () {
    database.ref(type + "/" + id).set({
        title: title.value,
        datetime: date,
        body: body.value
    });
});
if (document.location.pathname.split("/").length == 4) {
    database.ref(type + "/" + id).once("value").then(function (snapshot) {
        var val = snapshot.val();
        title.value = val.title;
        body.value = val.body;
        date = val.datetime;
    });
}
database.ref("/tech_reviews").once("value").then(function (snapshot) {
    var val = snapshot.val();
    for (var r in val) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "/edit/tech_reviews/" + r;
        a.text = val[r].title;
        tech_review_list.appendChild(li);
        li.appendChild(a);
    }
});
database.ref("/book_reviews").once("value").then(function (snapshot) {
    var val = snapshot.val();
    for (var r in val) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "/edit/book_reviews/" + r;
        a.text = val[r].title;
        book_review_list.appendChild(li);
        li.appendChild(a);
    }
});
