import L from 'leaflet';
import 'leaflet-providers';

function getmap() {
	var map = L.map('map').setView([51.505, -0.09], 13);
	var mapboxid = 'hafley66.cigl4owb2014aujlz1r7u5x4j';
	var accessToken = 'pk.eyJ1IjoiaGFmbGV5NjYiLCJhIjoiY2lnbDRveGpxMDA5c3RxbTM1bDJjeDB1bSJ9.HrDOkxkziNZymFnFsbMBGA';
	L.tileLayer.provider('MapBox', {id: mapboxid, accessToken: accessToken}).addTo(map);
	return map;
}

export default getmap;