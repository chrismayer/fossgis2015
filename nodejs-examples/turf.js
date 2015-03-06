// native deps
var fs = require('fs');
// 3rd party deps
var turf = require('turf');


// create a simple point object \w turf wrapper
var point1 = turf.point([7.613053321838379, 51.96359873687842]);

console.log(point1);


// buffer a geometry

var area = turf.area(point1);
console.log(area);

var buffered = turf.buffer(point1, 100);
var area = turf.area(buffered);
console.log(area);


// create a TIN
var features = [
    turf.point([-75.343, 39.984], {name: 'Location A'}),
    turf.point([-75.833, 39.284], {name: 'Location B'}),
    turf.point([-75.534, 39.123], {name: 'Location C'})
];

var fc = turf.featurecollection(features);

var tin = turf.tin(fc, 'z');

console.log(tin);
