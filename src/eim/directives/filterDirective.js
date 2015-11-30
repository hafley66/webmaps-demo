import _ from 'lodash';

function FilterDirective(filterService) {
	return {
		scope: {
			name: "@",
			keysExpr: "=?",
			valsExpr: "=?valuesExpr",
			keys: "@?",
			vals: "@?values"
		},
		// link: extractFilterConfiguration.bind(this); Doesnt parse, why?
		link :function extractFilterConfiguration(s, e, a) {

			var filterConfig = {
				name: s.name,
				keys: (s.keys? _.map(s.keys.split(','), _.trim): false) || s.keysExpr,
				vals: (s.vals? _.map(s.vals.split(','), _.trim): false) || s.valsExpr
			};

			filterService.addFilter(filterConfig);
		}
	};
}

function extractFilterConfiguration(s, e, a) {
	
	var filterConfig = {
		name: s.name,
		keys: s.keys || s.keysExpr,
		vals: s.vals || s.valsExpr
	};

	filterService.addFilter(filterConfig);

}

var $inline = ['eim.filters', FilterDirective];
export default $inline;