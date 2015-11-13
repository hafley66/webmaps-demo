import map from "leaflet-map";
import L from 'leaflet';
import _ from 'lodash';

function LeafletIMapFactory() {
	var visibleLayer = new L.FeatureGroup();
	map.addLayer(visibleLayer);
	map._s = {};
	map._p = null;
	map._m = [];

	function init(m, s, p){
		_prepareMarkers(m);
		_prepareStates(s);
		_preparePopup(p);
	}
	function _prepareMarkers(iMarkers) {
		_.forEach(iMarkers, function(m) {
			m._m = L.marker(m.latlng);
			m._m._m = m;

			m._m.on("click", function onMarkerClick(e) {
				map._p.openOn(e.target._m);
			});
			map._m.push(m);
		});
	}
	function _prepareStates(iStates) {
		var icon = null;
		_.forEach(iStates, function(s){
			if(s.icon.node){
			// TODO: Figure out the proper way to attach a custom div.
			icon = L.divIcon(s.icon.node);
		} else {
			icon = L.icon({iconUrl: s.icon.url});
		}
		map._s[s.key] = icon;
	});
	}
	function _preparePopup(p) {
		p._p = L.popup().setContent(p.content);
		p._p._p = p; 
		map._p = p; 

		p.currentMarker = null;
		p.visible = false;
		
		p.openOn = function(m){
			var pp = this._p, mm = m._m;

			if(m === this.currentMarker){
				mm.togglePopup();
				this.visible = !this.visible;
			} else {
				if(this.currentMarker !== null) {
					this.currentMarker._m.unbindPopup();
				}
				mm.bindPopup(pp).openPopup();
				this.visible = true;
				this.currentMarker = m;
			}
		}
		
		p.close = function() {
			if(this.currentMarker){
				this.currentMarker._m.closePopup();
				this.visible = false;
			}
		}
		return p;
	}


	function addMarker(m) {
		if(!visibleLayer.hasLayer(m._m))
			visibleLayer.addLayer(m._m);
	}
	function addAllMarkers(ary) {
		if(ary) 
			_.forEach(ary, this.addMarker);
	}
	function removeMarker(m) {
		if(visibleLayer.hasLayer(m._m))
			visibleLayer.removeLayer(m._m);
	}
	function removeAllMarkers(ary) {
		if(!ary)
			visibleLayer.clearLayers();
		else 
			_.forEach(ary, this.removeMarker);
	}
	function setVisible(m, bool) {
		if(bool)
			addMarker(m);
		else
			removeMarker(m);
	}
	function isVisible(m){
		return visibleLayer.hasLayer(m._m);
	}
	function getVisibleMarkers(){
		return _.filter(map._m, isVisible);
	}
	function setState(m, s) {
		m._m.setIcon(map._s[s.key]);
	}
	function openMarker(m) {
		map._p.openOn(m);
	}


	return var IMap = {
		init: init,
		addMarker: addMarker,
		addAllMarkers: addAllMarkers,
		removeMarker: removeMarker,
		removeAllMarkers: removeAllMarkers,
		setVisible: setVisible,
		isVisible: isVisible,
		getVisibleMarkers: getVisibleMarkers,
		setState: setState,
		openMarker: openMarker
	};
}
export LeafletIMapFactory;