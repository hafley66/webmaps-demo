import _ from 'lodash';
import eim from 'eim/events';

function ControlDirective(mapper){
	return {
		scope: {
			position: '@?'
		},
		link: function(s, e, a){
			if(!s.position)
				s.position = 'topleft';
			mapper.getMap.then(function(map){
				map.addControl(e, s.position);
			});
		}
	};
}

var inline = [
'eim.mapper',
ControlDirective
];

export default inline;