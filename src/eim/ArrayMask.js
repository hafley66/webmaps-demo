import _ from 'lodash';


function ArrayMask(ary) {
	var mask = this.mask = [];
	this.originalArray = ary;
	_.forEach(ary, function(element){
		mask.push({value: element, active: true});
	});
}
ArrayMask.prototype.push = function(value) {
	this.mask.push({value: value, active: true});
};
ArrayMask.prototype.toArray = function() {
	return _.pluck(_.filter(this.mask, {active: true}), 'value');
};
ArrayMask.prototype.getByValue = function(valueKey) {
	return _.find(this.mask, {value: valueKey});
};
ArrayMask.prototype.indexOf = function(valueKey){
	return this.asArray().indexOf(valueKey);
};
ArrayMask.prototype.asArray = function(){
	return _.pluck(this.mask, 'value');
};


export default ArrayMask;