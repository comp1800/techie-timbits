function readQuote() {
    db.collection("quotes").doc("tuesday")
        .onSnapshot(function (c) {
            console.log("current document data: " + c.data());
            document.getElementById("quote-goes-here").innerHTML = c.data().quote;
            //$('#quote-goes-here').text(c.data().quote);
            //$("#quote-goes-here").text(c.data()["quote"]);
        })
}
//readQuote();

function writeCities() {
    var citiesRef = db.collection("cities");

    citiesRef.add({
        code: "DC",
        name: "Washington, D.C.",
    });
    citiesRef.add({
        code: "TOK",
        name: "Tokyo",
    });
    citiesRef.add({
        code: "BJ",
        name: "Beijing",
    });
}
//writeCities();

function displayCities() {
    db.collection("cities").get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var n = doc.data().name;
                console.log(n);
                var cityid = doc.data().code;
                console.log(cityid);
                document.getElementById(cityid).innerText = n;
            })
        })
}
//displayCities();

function getCity() {
    document.getElementById("submit").addEventListener('click', function () {
        var location = document.getElementById("city").value;
        console.log(location);
        db.collection("cities")
            .where("name", "==", location)
            .get()
            .then(function (snap) {
                snap.forEach(function(doc) {
                    console.log(doc.data());
                    //do something with the data
                })
            })
    })
}
getCity();

