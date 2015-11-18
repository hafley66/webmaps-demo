import _ from 'lodash';
import eim from 'eim.events';

function PopupDirective($rootScope, mapManager) {
	return {
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
				s.$digest();
			});
		}
	};
}


var inline = ['$rootScope', 'eim.mapper', PopupDirective];

export default inline;