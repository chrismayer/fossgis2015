// native deps
var fs = require('fs');
var https = require('https');

//create a simple point object
var point1 = {
    type: 'Feature',
    geometry: {
        type: 'Point',
            coordinates: [7.613053321838379, 51.96359873687842]
    },
    properties: {}
  };

console.log(point1);

    //// create a simple point object \w turf wrapper
    //var point2 = turf.point([7.613053321838379, 51.96359873687842]);
//
//console.log(point2);

// read a feature collection from file system
fs.readFile('data/football-worldcup-2014-stadiums.geojson', function (err, data) {
    if (err) throw err;
    
    var geojson = JSON.parse(data);
    
    console.log(geojson);
});

// read feauture collection via HTTP
https.get("https://raw.githubusercontent.com/chrismayer/geojson-files/master/football-worldcup-2014-stadiums.geojson", function(res) {
    console.log("Got response: " + res.statusCode);
    
    // Continuously update stream with data
    var body = '';
    res.on('data', function(d) {
        body += d;
    });
    res.on('end', function() {

        // Data reception is done, do whatever with it!
        var parsed = JSON.parse(body);
        console.log(parsed);
    });
    
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});


