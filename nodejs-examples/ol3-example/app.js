//var map;
function init() {
    var vs = new ol.source.GeoJSON({
        projection: 'EPSG:3857',
        url: '/data'
//        object: {
//            'type': 'FeatureCollection',
//            'crs': {
//              'type': 'name',
//              'properties': {
//                'name': 'EPSG:4326'
//              }
//            },
//            'features': [
//              {
//                'type': 'Feature',
//                'geometry': {
//                  'type': 'Point',
//                  'coordinates': [100, 8]
//                }
//              }]
//        }
    });
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.Vector({
                source: vs,
                style: sf
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([7.613053321838379, 51.96359873687842], 'EPSG:4326', 'EPSG:3857'),
            zoom: 2
        })
    });
}

function sf(feature, resolution) {
    var text = 'pter';
    return [new ol.style.Style({
          image: new ol.style.Circle({
              radius: 5,
              fill: null,
              stroke: new ol.style.Stroke({color: 'red', width: 1})
            })
    })];
    return highlightStyleCache[text];
}

function loadService() {
    var url = '/data';
  $.ajax({
      url: url,
      dataType: 'json',
      success: function(response) {
          
          var vector = new ol.layer.Vector({
              source: new ol.source.GeoJSON({
                  projection: 'EPSG:3857',
                  url: '/data'
              })
            });
          
          map.addLayer(vector);
      }
    });
}
