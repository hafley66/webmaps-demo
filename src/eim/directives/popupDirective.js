import _ from 'lodash';
import eim from 'eim/events';

function PopupDirective($rootScope, mapManager) {
	return {
		scope: true,
		link: function(s, e, a) {

			var popup = {
				content: e[0]
			};
			mapManager._getMap.then(function(map) {
				map.addScopedPopup(popup, s);
			});
						
			s.setMarker = setMarker;
			function setMarker(m){
				s.marker = m;
				s.fields = m.fields;
				s.$digest();
			}
			return;
		}
	};
}

var inline = ['$rootScope', 'eim.mapper', PopupDirective];

export default inline;