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
        picture: "washington.jpg"
    });
    citiesRef.add({
        code: "TOK",
        name: "Tokyo",
        picture: "tokyo.jpg"
    });
    citiesRef.add({
        code: "BJ",
        name: "Beijing",
        picture: "beijing.jpg"
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

function getCountry(){
    document.getElementById("globe").addEventListener('click', function () {
        var location = document.getElementById("country").value;
        console.log(location);
        // do something with the country string
    });
}
getCountry();

function setDataPage1(){
    //construct the JSON object here
    //you can get from user input form
    var myname = "Elmo";
    var mylocation = "Burnaby";
    var mydetails = "Lots of open space and fresh air."
    var obj = {
        "name": myname,
        "location": mylocation,
        "details": mydetails
    }

    //save the object to local storage
    console.log(obj);
    localStorage.setItem('formdata', JSON.stringify(obj));
}
setDataPage1();

function getDataPage2(){
    var myobj = JSON.parse(localStorage.getItem('formdata'));    
    console.log(myobj);
    //do something with the object
    //console.log(myobj.name);   //to print name field
}
getDataPage2();

//-----------------------------------------
/*  <div class="card">
    <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
           <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div> 
*/
//------------------------------------------

function readCollection(){
    db.collection("cities").get()
    .then(function(snap){
        snap.forEach(function(doc){
            // do something with each document
            var pic = doc.data().picture;
            var title = doc.data().name;
            var code = doc.data().code;
            
            var codestring = '<div>'+
            '<img src="images/' + pic + '" class="card-img-top">'+
            '<div class="card-body">'+
            '<h5 class="card-title">' + title + '</h5>'+
            '<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>'+
            '<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>'+
            '</div>';

            $("#cards-go-here").append(codestring);
        })
    })
}
readCollection();