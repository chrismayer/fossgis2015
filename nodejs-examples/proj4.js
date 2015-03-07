// 3rd party deps
var proj4 = require('proj4');

// reproject a point
var projected = proj4('EPSG:4326', 'EPSG:900913', [2,5]);
//[ 222638.98158654713, 557305.2572745753 ]
console.log(projected);
