import _ from 'lodash';

function MapService(map, states, filters, popup) {
	this.filters  = [];
	this.states = [];
	this.map = map;
	this.popup  = {};
	this.markers = [];
	this.addMarker = map.addMarker;

	this.onFilterUpdate = function() {
		//1. Find out who is passing in a newly active set.
		//2. Find difference in the current active set and the newly active set. 
		var current_visible_markers = map.getVisibleMarkers();
		var new_visible_markers = filters.filterMarkers(map._m);
		var diff = _.difference(current_visible_markers, new_visible_markers);
		map.addAllMarkers(new_visible_markers);
		map.removeAllMarkers(diff);
		//done;
	}
}

export default var mapServiceInline = ['IMap', 'eim.s.markers', 'eim.s.states', 'eim.s.filters', 'eim.s.popup', MapFactory];
