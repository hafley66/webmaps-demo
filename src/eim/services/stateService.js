import _ from 'lodash';
import ArrayMask from 'eim/ArrayMask';

function States(mapService) {
	var keys = new ArrayMask();
	var vals = new ArrayMask();
	console.log("inside of state service");
	console.log(this);
	var states = {};
	var toReturn = {
		states,
		keys, 
		vals,
		getState,
		addState(stateConfig){
			this.states[stateConfig.val] = stateConfig;
			this.vals.push(stateConfig.val);
		}
	};
	var gstate = getState.bind(toReturn);

	mapService._getMap.then(function(map) {
		var oldAdd = map.addMarker.bind(map);
		map.addMarker = function addStateAndAdd(marker) {
			oldAdd(marker);
			var state= gstate(marker.fields);
			map.setIcon(marker, state.icon);
		}
	});

	return toReturn;
}

function augmentMap(){
	var oldAdd = map.addMarker.bind(map);
	map.addMarker = function addStateAndAdd(marker) {
		oldAdd(marker);
		map.setIcon(marker, this.getState(marker.fields));
	}
}
function getState(obj){
	var keys = this.keys.toArray();
	var vals = this.vals.toArray();
	// get the values of the obj at the keys specified by the states.keys;
	var query = _.intersection(
		_.compact(_.uniq(_.at(obj, keys))),
		vals);
	if(query && !_.isEmpty(query)){
		var activeStates = _.map(
			query, 
			function(val){
				return this.vals.indexOf(val);
			}.bind(this));
		var value = this.vals.asArray()[_.max(activeStates)]; 
		return this.states[value];
	} else {
		return null;
	}
}

var $inline = ['eim.mapper', States];
export default $inline;