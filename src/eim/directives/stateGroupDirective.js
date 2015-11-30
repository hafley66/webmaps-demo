import _ from 'lodash';
function StateGroupDirective(stateService, filterService){
	return {
		scope: {
			name: "@",
			keysExpr: "=?keysExpr",
			keys: "@?"
		},
		link: function(s, e, a){
			var filterConfig = {
				name: s.name,
				keys: (s.keys? _.map(s.keys.split(','), _.trim) : false) || s.keysExpr,
				vals: []
			};
			filterService.addFilter(filterConfig);
			filterService.filters[s.name].vals = stateService.vals;
			stateService.keys = filterService.filters[s.name].keys;
			filterService.filters.states = filterService.filters[s.name];
		}

	}
}




var $inline = ['eim.states', 'eim.filters', StateGroupDirective];
export default $inline;