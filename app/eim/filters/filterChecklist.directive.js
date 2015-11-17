import _ from "lodash";

function FilterChecklistDirective(map, configurePredicate) {
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
			map.addFilter(mCtr.filter);
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
FilterChecklistController.prototype = {
	filter: function(markers) {
		var activeRange = this._getActiveItems();
		return _.filter(markers, function(m) {
			return !!this.predicate(_.at(m.data, this.selection), activeRange);
		});
	},
	_getActiveItems: function () {
		var onlyTheActives = _.filter(this.items, {active:true});
		var theActiveValues = _.pluck(onlyTheActives, 'val');
		return theActiveValues;
	}
};


var filterChecklistInline = [
'eim.mapper',
'eim.filterPredicates',
FilterChecklistController
];

export default filterChecklistInline;