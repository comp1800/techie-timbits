function writeWebcamData() {
    var webcams = [{
            "datasetid": "web-cam-url-links",
            "recordid": "01d6f80e6ee6e7f801d2b88ad7517bd05223e790",
            "fields": {
                "url": "http://images.drivebc.ca/bchighwaycam/pub/html/www/17.html",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.136736007805,
                        49.2972589838826
                    ]
                },
                "mapid": "TCM015",
                "name": "Stanley Park Causeway"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        },
        {
            "datasetid": "web-cam-url-links",
            "recordid": "d95ead494c2afbb5f47efdc26bf3ea8c6b8b2e22",
            "fields": {
                "url": "http://images.drivebc.ca/bchighwaycam/pub/html/www/20.html",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.129968,
                        49.324891
                    ]
                },
                "mapid": "TCM017",
                "name": "North End 2"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        },
        {
            "datasetid": "web-cam-url-links",
            "recordid": "8651b55b799cac55f9b74d654a88f3500b6acd64",
            "fields": {
                "url": "https://trafficcams.vancouver.ca/cambie49.htm",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.116492357278,
                        49.2261139995231
                    ]
                },
                "mapid": "TCM024",
                "name": "Cambie St and W 49th Av",
                "geo_local_area": "Oakridge"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        },
        {
            "datasetid": "web-cam-url-links",
            "recordid": "f66fa2c58d19e3f28cf8b842bfa1db073e32e71b",
            "fields": {
                "url": "https://trafficcams.vancouver.ca/cambie41.htm",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.116192190431,
                        49.2335434721856
                    ]
                },
                "mapid": "TCM025",
                "name": "Cambie St and W 41st Av",
                "geo_local_area": "South Cambie"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        },
        {
            "datasetid": "web-cam-url-links",
            "recordid": "7c3afe1d3fe4c80f24260a4946abea3fb15b7017",
            "fields": {
                "url": "https://trafficcams.vancouver.ca/cambie25.htm",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.115406053889,
                        49.248990875309
                    ]
                },
                "mapid": "TCM026",
                "name": "Cambie St and W King Edward Av",
                "geo_local_area": "South Cambie"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        },
        {
            "datasetid": "web-cam-url-links",
            "recordid": "7fea7df524a205c0c0eb8efcc273345356cbe8d1",
            "fields": {
                "url": "https://trafficcams.vancouver.ca/mainTerminal.htm",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.100028035364,
                        49.2727762979223
                    ]
                },
                "mapid": "TCM028",
                "name": "Main St and Terminal Av",
                "geo_local_area": "Downtown"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        }
    ];

    webcams.forEach(function (cam) {
        console.log(cam);
        db.collection("webcams").add(cam)
            .then(function (doc) {
                console.log("wrote to webcams collection " + doc.id);
            })
    })
}

function displayWebcams() {
    db.collection("webcams")
        .where("fields.geo_local_area", "in", ["Downtown"])
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var name = doc.data().fields.name;
                //$("#webcams-go-here").append("<h1 id='" + doc.id + "'> " + name + "</h1>");
                //$("#webcams-go-here").append("<div class='display-6' id='" + doc.id + "'> " + name + "</div>");
                $("#webcams-go-here").append("<button class='btn btn-warning' id='" + doc.id + "'> " + name + "</button>");

                addWebcamListener(doc.id);
            })
        })
}
displayWebcams();

function addWebcamListener(id) {
    document.getElementById(id)
        .addEventListener("click", function () {
            console.log(id + "was clicked!")
            //window.location.href="details.html";
            window.location.href="details.html?id=" + id;
        });
}

