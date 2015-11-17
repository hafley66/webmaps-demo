import eim from 'eim.events';

function eimMapDirective($rootScope, mapService) {
	return {
		scope: {
			zoom: "=?",
			center: "=?"
		},
		link: {
			pre: function(s, e, a){
				
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