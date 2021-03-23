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
        code: "YVR",
        name: "Vancouver",
        hemisphere: "north",
        population: 675218,
        picture: "yvr.jpg"
    });
    citiesRef.add({
        code: "DC",
        name: "Washington, D.C.",
        hemisphere: "north",
        picture: "washington.jpg",
        population: 692683
    });
    citiesRef.add({
        code: "TOK",
        name: "Tokyo",
        hemisphere: "north",
        picture: "tokyo.jpg",
        population: 9273000
    });
    citiesRef.add({
        code: "CAPE",
        name: "Cape Town",
        hemisphere: "south",
        population: 433688,
        picture: "capetown.jpg"
    });
    citiesRef.add({
        code: "BJ",
        name: "Beijing",
        hemisphere: "north",
        population: 21540000,
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
                snap.forEach(function (doc) {
                    console.log(doc.data());
                    //do something with the data
                })
            })
    })
}
getCity();

function getCountry() {
    document.getElementById("globe").addEventListener('click', function () {
        var location = document.getElementById("country").value;
        console.log(location);
        // do something with the country string
    });
}
getCountry();

function setDataPage1() {
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

function getDataPage2() {
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

function showCollection() {
    db.collection("cities").get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                // do something with each document
                var pic = doc.data().picture; //key "picture"
                var title = doc.data().name; //key "name"

                // construct the string for card
                var codestring = '<div>' +
                    '<img src="images/' + pic + '" class="card-img-top">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + title + '</h5>' +
                    '<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
                    '<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>' +
                    '</div>';
                // append with jquery to DOM
                $("#cards-go-here").append(codestring);
            })
        })
}
//showCollection();

// Allow user to choose file to upload as profile picture
// Where "mypicfile" is the id of the <input> for file
// Where "mypic" is the id of the <img> DOM for display
function uploadPicture() {
    const reader = new FileReader(); //
    const fileInput = document.getElementById("mypicfile");
    const img = document.getElementById("mypic");
    reader.onload = e => {
        img.src = e.target.result;
    }
    fileInput.addEventListener('change', e => {
        const f = e.target.files[0];
        reader.readAsDataURL(f);
    })
}
//uploadPicture();

function showUploadedPicture() {
    const fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2
    fileInput.addEventListener('change', function (e) { //event listener
        var blob = URL.createObjectURL(e.target.files[0]);
        var filename = e.target.files[0].name;
        image.src = blob;
    })
}
//showUploadedPicture();

//-----------------------------------------------------------------
// To let user upload a file to firebase storage service
// Assume there's an "upload file" button. 
// When the user clicks on it, ... 
//-----------------------------------------------------------------
function uploadUserProfilePic() {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab
    firebase.auth().onAuthStateChanged(function (user) {
        var fileInput = document.getElementById("mypic-input");
        const image = document.getElementById("mypic-goes-here"); // pointer #2

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob;

            //store using this name
            var storageRef = storage.ref("images/" + user.uid + ".jpg");

            //upload the picked file
            storageRef.put(file)
                .then(function () {
                    console.log('Uploaded to Cloud Storage.');
                })

            // storage bucket plus folder plus image name, which// is the user's doc id
            //var picref = "gs://mango-smoothie.appspot.com/"+user.uid + ".jpg";

            storageRef.getDownloadURL()
                .then(function (url) { // Get URL of the uploaded file
                    console.log(url); // Save the URL into users collection
                    db.collection("users").doc(user.uid).update({
                            "profilePic": url
                        })
                        .then(function () {
                            console.log('Added Profile Pic URL to Firestore.');
                        })
                })
        })
    })
}
uploadUserProfilePic();

function displayUserProfilePic() {
    console.log("hi");
    firebase.auth().onAuthStateChanged(function (user) {
        //console.log(user.uid);
        db.collection("users").doc(user.uid)
            .get()
            .then(function (doc) {
                //console.log(doc.data());
                var picUrl = doc.data().profilePic;
                //console.log(picUrl);
                //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                $("#mypic-goes-here").attr("src", picUrl);
            })
    })
}
displayUserProfilePic();

// put map into a DOM with id "map"
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}