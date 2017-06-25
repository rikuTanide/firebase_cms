declare let firebase: any;

let database = firebase.database();

let type = "";
let id = "";

if (document.location.pathname.split("/").length == 4) {
    type = document.location.pathname.split("/")[2];
    id = document.location.pathname.split("/")[3];

}


function toDateTimeString(date: Date) {

    function zero(i) {
        if (i < 10) {
            return "0" + i;
        }
        return "" + i;
    }


    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return year + "-" + zero(month) + "-" + zero(day) + " " + zero(hour) + ":" + zero(minute) + ":" + zero(second);

}

// let type = "test_review";
// let id = "-KnSZXyGV_woDuFDuRRD";
let date = toDateTimeString(new Date());

let tech_review_list = document.getElementById("tech-review-list");
let book_review_list = document.getElementById("book-review-list");

let body = document.getElementById("body") as HTMLTextAreaElement;
let title = document.getElementById("title") as HTMLInputElement;


let tech_add = document.getElementById("add-tech");
tech_add.addEventListener("click", () => {
    id = database.ref("tech_reviews/").push({
        title: "無題",
        datetime: toDateTimeString(new Date()),
        body: "テキスト",
    }).key;

    window.history.pushState("", "", "/edit/tech_reviews/" + id);

    type = "tech_reviews";
    body.value = "";
    title.value = "";

});

let book_add = document.getElementById("add-book");
book_add.addEventListener("click", () => {
    id = database.ref("book_reviews/").push({
        title: "無題",
        datetime: toDateTimeString(new Date()),
        body: "テキスト",
    }).key;

    window.history.pushState("", "", "/edit/book_reviews/" + id);

    type = "book_reviews";
    body.value = "";
    title.value = "";

});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }
});

let save = document.getElementById("save");
save.addEventListener("click", () => {
    database.ref(type + "/" + id).set({
        title: title.value,
        datetime: date,
        body: body.value,
    });
});

if (document.location.pathname.split("/").length == 4) {
    database.ref(type + "/" + id).once("value").then(snapshot => {
        let val = snapshot.val();
        title.value = val.title;
        body.value = val.body;
        date = val.datetime;
    });
}
database.ref("/tech_reviews").once("value").then(snapshot => {
    let val = snapshot.val();
    for (let r in val) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "/edit/tech_reviews/" + r;
        a.text = val[r].title;
        tech_review_list.appendChild(li);
        li.appendChild(a);
    }
});

database.ref("/book_reviews").once("value").then(snapshot => {
    let val = snapshot.val();
    for (let r in val) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "/edit/book_reviews/" + r;
        a.text = val[r].title;
        book_review_list.appendChild(li);
        li.appendChild(a);
    }
});