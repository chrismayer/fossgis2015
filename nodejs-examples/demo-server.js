// native deps
var http = require('http');
var fs = require('fs');
// 3rd party deps
var turf = require('turf');
var express = require('express');
var request = require('request');
var xmldoc = require('xmldoc');

// the web app
var app = express();

// the web service for data delivery
app.get('/data', function(req, res) {

    // create current date - 10 minutes
    // form 2015-03-10T10:40:00
    var now = new Date(),
        MS_PER_MINUTE = 60000,
        reqDate = new Date(now - 10 * MS_PER_MINUTE),
        // format the date
        reqDateString =
        reqDate.getFullYear() + '-0' + (reqDate.getMonth()+1) + '-' + reqDate.getDate() + 'T' +
        reqDate.getHours() + ':' + reqDate.getMinutes() + ':' + reqDate.getSeconds();

    // request the latest OSM changesets
    request({
        url: "http://api.openstreetmap.org//api/0.6/changesets?time=" + reqDateString,
        method: "GET"
    }, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            // parse the XML response of OSM
            var document = new xmldoc.XmlDocument(body);

            var changesets = document.children,
                csGeojson = [],
                fcOut;

            // iterate over all OSM changesets
            for (var int = 0; int < changesets.length; int++) {
                var cs = changesets[int];
                if(cs.attr.min_lat) {
                    var point = turf.point([
                        parseFloat(cs.attr.min_lon, 10),
                        parseFloat(cs.attr.min_lat, 10)
                    ]);
                    var polygon = turf.polygon([[
                        [parseFloat(cs.attr.min_lon, 10),
                         parseFloat(cs.attr.min_lat, 10)],
                        [parseFloat(cs.attr.min_lon, 10),
                         parseFloat(cs.attr.max_lat, 10)],
                        [parseFloat(cs.attr.max_lon, 10),
                         parseFloat(cs.attr.max_lat, 10)],
                        [parseFloat(cs.attr.max_lon, 10),
                         parseFloat(cs.attr.min_lat, 10)],
                        [parseFloat(cs.attr.min_lon, 10),
                         parseFloat(cs.attr.min_lat, 10)],
                    ]]);
                    var pointOnPolygon = turf.pointOnSurface(polygon);
                    // create envelope --> point on surface as
                    csGeojson.push(pointOnPolygon);
                    fcOut = turf.featurecollection(csGeojson);
                }
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(fcOut));
            res.end();

        } else {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({error: true}));
            res.end();
        }
    });

});

/*
 * URL binding for the demo ol3 app
 */
app.get('/app', function(req, res) {
    fs.readFile(__dirname + '/ol3-example/index.html', function(err, page) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(page);
        res.end();
    });
});
app.get('/:name', function(req, res) {
    var fileName = req.params.name;
    if (fs.existsSync(__dirname + '/ol3-example/' + fileName)) {
        fs.readFile(__dirname + '/ol3-example/' + fileName, function(err, page) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(page);
            res.end();
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }
});
app.get('/libs/:name', function(req, res) {
    var fileName = req.params.name;
    fs.readFile(__dirname + '/ol3-example/libs/' + fileName, function(err, page) {
        res.write(page);
        res.end();
    });
});

// start the server
var server = app.listen(9999);
