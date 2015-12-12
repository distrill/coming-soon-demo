var map;
var mapLat = 49.8801;
var mapLng = -119.4436;

function initMap() {
    map = new google.maps.Map(document.getElementById('main-content-map'), {
        center: {lat: mapLat, lng: mapLng},
        zoom: 12
    });
}

console.log('index.js');

function getMarkers(one){
    console.log(one);
}
