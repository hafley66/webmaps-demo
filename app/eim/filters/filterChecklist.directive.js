import _ from "lodash";

// function FilterGroupDirective() {
// 	return {
// 		restrict: "E"
// 	}
// }

function FilterChecklistDirective(map, filters, configurePredicate) {
	return {
		restrict: "E",
		controller: FilterChecklistController,
		controllerAs: "ctrl",
		bindToController: true,
		scope: {
			items: "=listFrom",
			selection: "=selectionByProperty",
			// customPredicate: "&?",
			predicate: "@?",
			init: "@?",
			key: "@?"
		},
		require: 'filterChecklist',
		link: function(scope, element, attr, ctrl) {
			ctrl.predicate = configurePredicate(ctrl.predicate);
			filters.add(mCtr.filter);
			element.on('click', function() {
				map.onFilterUpdate();
			});
		},
		templateUrl: 'filterChecklist'
	}
}

function FilterChecklistController() {
	_.forEach(items, function(i){
		this.items.push({
			'val': i,
			'active': this.init
		});
	});
}
FilterChecklistController.prototype.filter = filter;
FilterChecklistController.prototype._getActiveItems = _getActiveItems;
function filter(markers) {
	var activeRange = this._getActiveItems();
	return _.filter(markers, function(m) {
		return !!this.predicate(_.at(m.data, this.selection), activeRange);
	});
}
function _getActiveItems() {
	var onlyTheActives = _.filter(this.items, {active:true});
	var theActiveValues = _.pluck(onlyTheActives, 'val');
	return theActiveValues;
}

var filterChecklistInline = [
'eim.s.map',
'eim.s.filters',
'eim.f.filterPredicates',
FilterChecklistController
];

export default filterChecklistInline;