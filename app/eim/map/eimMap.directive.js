function eimMapDirective(mapService) {
	return {
		scope: {
			markers: "=?"
		},
		link: function(s, e, a){
			mapService.map.addAllMarkers(s.markers);
		},
		templateUrl: "eimMap.html"
		// template: '<div id="map"> </div>'
	};
}
var eimMapDirectiveInline = ['eim.s.map', eimMapDirective];
export default eimMapDirectiveInline;