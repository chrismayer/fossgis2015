var map;
/**
 * Init the ol3 map
 */
function init() {
    var vectorsrc = new ol.source.GeoJSON({
        projection: 'EPSG:3857',
        url: '/data'
    });
    var vectorLayer = new ol.layer.Vector({
        source: vectorsrc
    });
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
        view: new ol.View({
            center: ol.proj.transform([7.613053321838379, 51.96359873687842], 'EPSG:4326', 'EPSG:3857'),
            zoom: 2
        })
    });

    animiere();
    // reload new data every 15 seconds
    setInterval(reloadData, 15000);
}

/**
 * Shows new data from the web service by adding a new
 * vector layer. Always keeps the layer with the data before.
 */
function reloadData() {
    
    animiere();

    var vector = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            projection: 'EPSG:3857',
            url: '/data'
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: null,
                stroke: new ol.style.Stroke({
                    color: getRandomColor(),
                    width: 2
                })
            })
      })
    });
    if (map.getLayers().getLength() > 2) {
        map.getLayers().removeAt(1);
    }
    map.getLayers().push(vector);
}

/**
 * Returns a rendom hex color
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * 
 */
function animiere() {
    var ladebalken = document.getElementById("ladebalken");
    var laenge = parseInt(ladebalken.style.width);

    laenge++;
    ladebalken.style.width = laenge + "px";

    if (laenge < 300) {
        window.setTimeout(animiere, 50);
    } else {
        ladebalken.style.width = '0';
    }
}
