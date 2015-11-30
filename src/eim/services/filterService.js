import _ from 'lodash';
import ArrayMask from 'eim/ArrayMask';


function Filters() {
	var filters = {};
	return {
		filters,
		addFilter(filterConfig){
			this.filters[filterConfig.name] = new Filter(filterConfig.name, filterConfig.keys, filterConfig.vals);
		},
		filterAll(collection) {
			var passing = collection;
			_.forEach(this.filters, function(filter){
				filter.prepareForFiltering();
				passing = _.filter(passing, filter.predicate, filter);
			});
			return passing;
		}
	};
}

function Filter(name, keys, vals) {
	this.name = name;
	this.keys = new ArrayMask(keys);
	this.vals = new ArrayMask(vals);
}
Filter.prototype.predicate = function filterPredicate(object){
	var vals = _.compact(_.uniq(_.at(object, this._keys)));
	return _.intersection(vals, this._vals);
};
Filter.prototype.prepareForFiltering = function() {
	this._vals = this.vals.toArray();
	this._keys = this.keys.toArray();
};

var $inline = [Filters];

export default $inline;