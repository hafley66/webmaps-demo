import eim from 'eim.events';

function eimMapDirective($rootScope, mapService) {
	return {
		scope: {
			zoom: "=?",
			center: "=?"
		},
		// template: '<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css"/>',
		link: {
			pre: function(s, e, a){
				// e.append('<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css"/>');
			},
			post: function(s, e, a){
				mapService.ready = true;
				$rootScope.$emit(eim.mapReady, mapService);
			}
		}
	};
}
var eimMapDirectiveInline = ['$rootScope', 'eim.mapper', eimMapDirective];
export default eimMapDirectiveInline;