import L from 'leaflet';
import 'leaflet-providers';

function getmap(id, initOptions) {
	var map = L.map(id).setView([38.8833, -98], 4);
	var mapboxid = 'hafley66.cigl4owb2014aujlz1r7u5x4j';
	var accessToken = 'pk.eyJ1IjoiaGFmbGV5NjYiLCJhIjoiY2lnbDRveGpxMDA5c3RxbTM1bDJjeDB1bSJ9.HrDOkxkziNZymFnFsbMBGA';
	L.tileLayer.provider('MapBox', {id: mapboxid, accessToken: accessToken}).addTo(map);
	return map;
}

export default getmap;