import _ from 'lodash';
import eim from 'eim/events';

function MapManager($rootScope, $q, filterService) {
	
	var deferred = $q.defer(),
		innerDeferred = $q.defer(),
		map = null;

	function _setMap(imap) {
		innerDeferred.resolve(imap);
		map = imap;
	}

	// Need way to signal the map as being ready.
	function setMap(imap){ 
		deferred.resolve(imap);
		map = imap;
	}


	$rootScope.$on(eim.filterChanged, function(ngEvent, eimEvent){
		innerDeferred.promise.then(function(map){
			filterAllMarkers(ngEvent, eimEvent);
		});
	});
	function filterAllMarkers(ngEvent, eimEvent) {
		//1. Find out who is passing in a newly active set.
		//2. Find difference in the current active set and the newly active set. 
		var markers = map.markers;
		_.forEach(markers, function(marker, index){
			marker.fields.__marker = marker;
		});
		
		var strippedMarkersByKey = _.pluck(markers, 'fields');
		var visibleMarkerFields = filterService.filterAll(strippedMarkersByKey);
		var visibleMarkers = _.pluck(visibleMarkerFields, '__marker');
			

		// now get difference between markers visible and not.
		var oldVisible = map.getVisibleMarkers();
		var mNew = visibleMarkers, mOld = oldVisible;
		// Let mNew be N, and mOld be O.
		// O is already on screen.
		// N - O == what needs to be put on screen.
		// O - N == what needs to be taken off screen. 
		var toAdd = _.difference(mNew, mOld);
		var toRemove = _.difference(mOld, mNew);
		map.removeAllMarkers(toRemove);
		map.addAllMarkers(toAdd);
		//done;
	};


	$rootScope.$on(eim.markerClicked, putPopupOnClickedLocation);
	function putPopupOnClickedLocation(event, mapEvent){ 
		var e = mapEvent.eventData.originalEvent, 
		m = mapEvent.marker,
		imap = mapEvent.imap,
		latlng = imap.map.mouseEventToLatLng(e);
		imap.popup.openOn(m, latlng);
		//TODO: Switch to this once centering is figured out for the popup on a marker.
		// that.map.popup.openOn(marker); 
	}


	return {
		setMap,
		_setMap,
		getMap: deferred.promise,
		_getMap : innerDeferred.promise
	};
}
var mapServiceInline = ['$rootScope', '$q', 'eim.filters', MapManager];
export default mapServiceInline;
