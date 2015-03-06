// native deps
var http = require('http');
var fs = require('fs');
// 3rd party deps
var turf = require('turf');
var express = require('express');

var app = express();

// the web service for data delivery
app.get('/data', function(req, res) {

    // create a simple point object \w turf wrapper
    var out = turf.point([7.613053321838379, 51.96359873687842]);
//    var out = turf.point([0, 0]);
//    out = turf.featurecollection([out]);

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(out));
    res.end();
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
        // Do something
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
    console.log("what2", __dirname + '/ol3-example/' + fileName);
  
  fs.readFile(__dirname + '/ol3-example/libs/' + fileName, function(err, page) {
      res.write(page);
      res.end();
  });
});



var server = app.listen(9999);
