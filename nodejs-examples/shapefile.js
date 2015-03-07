// 3rd party deps
var shapefile = require('shapefile');

// create a shapefile reader
var reader = shapefile.reader(
    'data/shapefile/bands.shp', 
    {encoding: 'UTF-8'}
);
// read the features
reader.readHeader(function(error, header) {
    if (error) throw error;
    readFeature(reader);
});

/**
 * Reads a geojson representation of the shp features
 */
function readFeature(reader) {
    reader.readRecord(function(error, record) {
        if(record != shapefile.end) {
            console.log(record);
            readFeature(reader);
        }
    });
}

