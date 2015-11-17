import _ from 'lodash';
import eim from 'eim.events';

function PopupDirective($rootScope, mapManager) {
	return {
		// require: "eimMap",
		scope: true,
		link: function(s, e, a) {
			mapManager.map.addPopup({
				content: e[0],
				currentMarker: null,
				visible: false,
				openOn: null,
				close: null
			});

			$rootScope.$on(eim.markerClicked, function(e, m){
				s.marker = m;
				s.fields = m.fields;			
			});
		}
	};
}


var inline = ['$rootScope', 'eim.mapper', PopupDirective];

export default inline;