import eim from 'eim/events';

function eimMapDirective($rootScope, mapService, imap) {
	return {
		scope: {
			zoom: "=?",
			center: "=?"
		},
		// template: '<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css"/>',
		link: {
			pre: function(s, e, a){
				console.log("hello");
				// e.append('<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css"/>');
				mapService.map = imap('map', {zoom: s.zoom, center: s.center});

			},
			post: function(s, e, a){
				mapService.ready = true;
				$rootScope.$emit(eim.mapReady, mapService);
			}
		}
	};
}
var eimMapDirectiveInline = ['$rootScope', 'eim.mapper', 'eim.map.leaflet', eimMapDirective];
export default eimMapDirectiveInline;