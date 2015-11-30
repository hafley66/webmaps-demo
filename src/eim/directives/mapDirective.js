import eim from 'eim/events';

var map;
function eimMapDirective($rootScope, mapService, imap) {
	return {
		scope: {
			zoom: "=?",
			center: "=?"
		},
		link: {
			pre: function(s, e, a){
				console.log("map is created");
				map = imap('map', {zoom: s.zoom, center: s.center});
				mapService._setMap(map);
			},
			post: function(s, e, a){
				mapService.setMap(map);
			}
		}
	};
}
var eimMapDirectiveInline = ['$rootScope', 'eim.mapper', 'eim.map.leaflet', eimMapDirective];
export default eimMapDirectiveInline;