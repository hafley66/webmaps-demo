import _ from 'lodash';

function OrderedHash() {
	this.ary = [];
	this.obj = {};
}
OrderedHash.prototype = {
	push(key, value){
		this.ary.push(value);
		this.obj[key] = value;
	},
	indexOf: [].indexOf.bind(this.ary),
	get(key) {
		return this.obj[key];
	}
};

function RecordKeeper(ary) {
	this._origin = ary;
	this.obj = {};
	_.forEach(ary, function(a){
		this.obj[a] = true;
	}.bind(this));
}

RecordKeeper.prototype = {
	toArray: function(){
		return _.invert(this.obj)['true'];
	}
}

class ActiveRecord {
	constructor(ary) {
		this.originalAry = ary;
		this.obj
		return this.ary;
	}

	push(value){
		this.obj[value] = true;
	}

	indexOf(key){
		return this.originalAry.indexOf(key);
	}

	toArray() {
		_.invert(this.obj)
	}
}



export default OrderedHash;




// var FilterGroupList = [];
// var FilterGroup = {};
// {
// 	name: ...,
// 	values: ...,
// 	keys: ...
// }

// for each filter-group directive, do:
// 	create filter-group type from attributes.
// 	add object to list. 

// when map.addMarker or onFilterChanged
// 	filter all markers,
// 	determine state of visible markers.

// states can be found 
// 	