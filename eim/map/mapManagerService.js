import _ from 'lodash';
import eim from 'eim/events';

function MapManager($rootScope, $q) {
	this.addFilter = [].push.bind(this.filters);
	// Make sure a copy of markers is passed.
	this.filterMarkers = function(markers) {
		// pipe filters one into the next. 
		// turn everyone off, then find out who passes. 
		_.forEach(this.filters, function(filter){
			markers = filter(markers);
		});
		// TODO:DCH66 Consider this...
		// return _.reduce(this.filters, markers);
		return markers;
	};
	this.onFilterUpdate = function() {
		//1. Find out who is passing in a newly active set.
		//2. Find difference in the current active set and the newly active set. 
		var current_visible_markers = this.map.getVisibleMarkers();
		var new_visible_markers = this.filterMarkers(map._m);
		var diff = _.difference(current_visible_markers, new_visible_markers);
		this.map.addAllMarkers(new_visible_markers);
		this.map.removeAllMarkers(diff);
		//done;
	};

	this.setMarkerStates = function(fMarkers, fStates) {
		_.forEach(fMarkers, function(m) {
			_.forEach()
		});
	};
	var that = this;
	$rootScope.$on(eim.markerClicked, function(event, marker){ that.map.popup.openOn(marker); });

}
var mapServiceInline = ['$rootScope', '$q', MapManager];
export default mapServiceInline;
