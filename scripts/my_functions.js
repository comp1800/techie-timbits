function someFunction() {
    console.log("hi from someFunction");
}

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

//----------------------------------------------------
// write a whole bunch of cities to the cities collection
//----------------------------------------------------
function writeCities() {
    var citiesRef = db.collection("cities");
    citiesRef.add({
        position: Math.floor(Math.random() * 1000),
        code: "YVR",
        name: "Vancouver",
        hemisphere: "north",
        population: 675218,
        picture: "yvr.jpg"
    });
    citiesRef.add({
        position: Math.floor(Math.random() * 1000),
        code: "DC",
        name: "Washington, D.C.",
        hemisphere: "north",
        picture: "washington.jpg",
        population: 692683
    });
    citiesRef.add({
        position: Math.floor(Math.random() * 1000),
        code: "TOK",
        name: "Tokyo",
        hemisphere: "north",
        picture: "tokyo.jpg",
        population: 9273000
    });
    citiesRef.add({
        position: Math.floor(Math.random() * 1000),
        code: "CAPE",
        name: "Cape Town",
        hemisphere: "south",
        population: 433688,
        picture: "capetown.jpg"
    });
    citiesRef.add({
        position: Math.floor(Math.random() * 1000),
        code: "BJ",
        name: "Beijing",
        hemisphere: "north",
        population: 21540000,
        picture: "beijing.jpg"
    });
}
//writeCities();

function displayCities() {
    db.collection("cities")
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var n = doc.data().name;
                console.log(n);
                var citystring = "<p> " + n + "</p";
                $("#cities-go-here").append(citystring);
            })
        })
}
//displayCities();

//----------------------------------
//Use a hack to generate random city
//----------------------------------
function displayRandomCity() {
    db.collection("cities")
        .where("position", ">", Math.floor(Math.random() * 1000))
        .limit(1)
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var n = doc.data().name;
                console.log(n);
                var citystring = "<p> " + n + "</p";
                $("#cities-go-here").append(citystring);
            })
        })
}
//displayRandomCity();

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
//getCity();

function getCountry() {
    document.getElementById("globe").addEventListener('click', function () {
        var location = document.getElementById("country").value;
        console.log(location);
        // do something with the country string
    });
}
//getCountry();

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
//setDataPage1();

function getDataPage2() {
    var myobj = JSON.parse(localStorage.getItem('formdata'));
    console.log(myobj);
    //do something with the object
    //console.log(myobj.name);   //to print name field
}
//getDataPage2();

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

function showCaroselCollection() {
    db.collection("cities").get()
        .then(function (snap) {
            snap.forEach(function (doc, i) {
                // do something with each document
                var pic = doc.data().picture; //key "picture"
                var title = doc.data().name; //key "name"
                console.log("index is " + i);

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
//showCaroselCollection();

//-----------------------------------------------------
//After user picks a image file, display it right away
//-----------------------------------------------------
function showUploadedPicture() {
    const fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2
    fileInput.addEventListener('change', function (e) { //event listener
        var blob = URL.createObjectURL(e.target.files[0]);
        var filename = e.target.files[0].name;
        console.log(filename);
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
            var storageRef = firebase.storage().ref("images/" + user.uid + ".jpg");

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
//uploadUserProfilePic();

function displayUserProfilePic() {
    console.log("hi");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user.uid);
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    //console.log(doc.data());
                    var picUrl = doc.data().profilePic;
                    //console.log(picUrl);
                    //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                    $("#mypic-goes-here").attr("src", picUrl);
                })
        }
    })
}
//displayUserProfilePic();

//-------------------------------------------------------------------
// This function is an example of how you can read data from a JSON file
// that is located on the internet server
// It uses XMLHttpRequest() to 
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
//-------------------------------------------------------------------
function readJSON(url) {
    let requestURL = url;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        const myjson = request.response;
        console.log(myjson);
        console.log(myjson[0].id);
    }
}
//readJSON('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

function readJSONfromStorage() {
    firebase.storage().ref("Food.json").getDownloadURL()
        .then((url) => {
            // `url` is the download URL for 'Food.json'
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';

            xhr.open('GET', url);
            xhr.send();

            xhr.onload = (event) => {
                var blob = xhr.response;
                console.log(blob[0].id);
            };

            // Do something with the JSON file
            //console.log(blob[0].id);
        })
        .catch((error) => {
            // Handle any errors
        });
}
//readJSONfromStorage();

function getCollectionSize() {
    db.collection("cities").get()
        .then(function (snap) {
            var size = snap.size;
            console.log(size);
        })
}
//getCollectionSize();

//the json must be hosted on internet
//browser does not allow you to read local files
//we can trick the computer to doing https
//python -m http.server
//start a webserver on my computer
//localhost:8000/index.html
function readLocalJSON() {
    console.log("in readFoodJSON");
    fetch("Food.json") //assume on computer   
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data);
                    data.forEach(function (item) {
                        var food = {
                            "name": item.name,
                            "description": item.description
                        }
                        db.collection("foods").add(food);
                    })
                })
        })
}
//readLocalJSON();

function writeBradData3() {
    firebase.auth().onAuthStateChanged(function (user) {
        var userid = user.uid;
        var bio = "i'm a cst student";
        var profileinfo1 = "hi";
        var profileinfo2 = "there";

        var item = {
            "bio": bio,
            "profile": {
                "info1": profileinfo1,
                "info2": profileinfo2,
                "info3": "new stuff"
            }
        }
        console.log(item);
        db.collection("users").doc(user.uid)
            .update(item);

    })
}
//writeBradData3();

function writeBradData2() {
    firebase.auth().onAuthStateChanged(function (user) {
        var userid = user.uid;
        var bio = "i'm a cst student";
        var profileinfo1 = "info1";
        var profileinfo2 = "info2";

        var item = {
            "bio": bio
        }
        var pitem = {
            "p1": profileinfo1,
            "p2": profileinfo2
        }
        console.log(item);
        db.collection("users").doc(user.uid)
            .update(item)
            .then(function () {
                db.collection("users/" + user.uid + "/profiles")
                    .add(pitem);
            })

    })
}
//writeBradData2();

function writeBradData3() {
    firebase.auth().onAuthStateChanged(function (user) {
        var userid = user.uid;
        var bio = "i'm a cst student";
        var profileinfo1 = "hi";
        var profileinfo2 = "there";

        var item = {
            "bio": bio,
            "experience": "blah",
            "firstname": "blah",
            "lastname": "blah",
            "headline": "blah",
            "references": ["my dad", "my mom"]
        }
        console.log(item);
        db.collection("users").doc(user.uid)
            .update(item);

    })
}
//writeBradData3();

// https://firebase.googleblog.com/2019/11/cloud-firestore-now-supports-in-queries.html
function writeRestaurants() {
    var dbRef = db.collection("restaurants");
    dbRef.add({
        name: "fish house",
        type: ["american", "seafood"]
    });
    dbRef.add({
        name: "kirin",
        type: ["asian", "seafood"]
    });
    dbRef.add({
        name: "tacobell",
        type: ["fast"]
    });
    dbRef.add({
        name: "samurai sushi",
        type: ["asian", "fast"]
    });
}
//writeRestaurants();

function writeUserPrefs() {
    //get all this information from form when it is submitted
    var p1 = "asian";
    var p2 = "fast";

    //put all these into an array
    var preferences = [];
    preferences.push(p1); //if user clicked asian
    preferences.push(p2); //if user clicked fast

    // write this array into one key/value pair
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
            .update({
                "preferences": preferences
            })
    })
}

function showMyRestaurants() {
    firebase.auth().onAuthStateChanged(function (user) {

        //get the list of all preferences for this user
        db.collection("users").doc(user.uid).get()
            .then(function (snap) {
                var myPrefs = snap.data().preferences; //key is "preference"
                console.log(myPrefs); //check it out first

                //get a collection of all docs where "type" appears in pref array
                db.collection("restaurants")
                    .where("type", "array-contains-any", myPrefs) //New Amazing Query
                    .get()
                    .then(function (rs) {
                        if (rs) { //not null
                            rs.forEach(function (r) { //cycle thru results
                                var name = r.data().name; //grab name
                                var id = r.id; //grab id
                                $("#restaurants-go-here").append("<p id='" + id + "'> " + name + "</p>");
                                //attach listener, and redirect to another page to show details.
                            })
                        }
                    })

            })
    })
}
//showMyRestaurants();

//------------------------------------------------
// Call this function when the "Quit" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logged out user");
    }).catch((error) => {
        // An error happened.
    });
}

function SaveQuit() {
    var field1 = "hi"; //get from form
    var field2 = "world"; //get from form
    //var field1 = document.getElementById("field1").value;
    //var field2 = document.getElementById("field2").value;
    //firebase.auth().onAuthStateChanged(function (user) {
    //console.log(user);
    //db.collection("users").doc(user.uid)
    db.collection("parks").doc("bbymountain")
        .set({
            field1: field1,
            field2: field2
        }, {
            merge: true
        })
        .then(function () {
            logout();
            window.location.href = "index.html";
        })
    //})
}

function addSaveQuitListener() {
    document.getElementById("SaveQuitButton").addEventListener("click", function () {
        console.log("clicked addSaveQuitListener()");
        SaveQuit();
    })
}
addSaveQuitListener();

function writeFoodIntoList() {
    var details = "lasts a long time";
    var name = "peanut butter";
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid)
            .collection("lists")
            .add({
                "name": name,
                "details": details,
                "category": "fridge"
            })
    })
}

function readFromList(category) {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid)
            .collection("lists")
            .where("category", "==", "fridge")
            .get() //get whole list
            .then(function (snap) {
                snap.forEach(function (doc) { //cycle thru items in list
                    console.log(doc.data().name);
                })
            })
    })
}


function deleteMe() {
    del
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("jobPostings")
            .where("jobPost.User", "==", user.id)
            .get()
            .then(function (snop) {
                //delete DOM

            })
    })
}

//call this when the posting is displayed?
function addDeleteButtonForMyJobs() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("jobPostings")
            .where("jobPost.User", "==", user.uid)
            .get()
            .then(function (snap) {    //list of all my jobs
                snap.forEach(function (post) {
                    //create a delete button for each of My jobs

                    // let deleteDiv = ...
                    // let deleteButton =...
                    // deleteButton.setAttribute("id", post.id);
                    // let deleteTxt...
                    // let deleteSec... 
                    // deleteButton.appendChild...
                    // deleteDiv.appendChild... 
                    // deleteSection.appendChild...

                    //add listener to each button to each of my job
                    deleteButton.addEventListener("click", function () {
                        alert("delete button clicked");
                        removeMyPost(post.id); //remove single post
                    })
                })
            })
    })
}

function removeMyPost(postid) {
    db.collection("jobPostings")
        .doc(postid)
        .delete()
        .then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
}