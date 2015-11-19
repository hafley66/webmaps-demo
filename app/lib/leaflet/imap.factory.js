import L from 'leaflet';
import _ from 'lodash';
import getmap from 'eim.leaflet.map';
import eim from 'eim.events';


function LeafletIMapFactory($rootScope) {
	return function LeafletIMap(id, options) {
		var MAP = getmap(id, options),
		visibleLayer = new L.FeatureGroup();
		MAP.addLayer(visibleLayer);
		
		return {
			map: MAP,
			markers: [],
			states: {},
			icons: {},
			popup: null,
			_visibleLayer: visibleLayer, 
			_prepareMarker: function(m) {
				m._m = L.marker(m.latlng);
				m._m.m = m;
				m._m.on("click", function onMarkerClick(e) {
					$rootScope.$emit(eim.markerClicked, e.target.m);
				});
				m._m.on('popupopen', function onMarkerPopupOpen(e){
					$rootScope.$emit(eim.markerPopupOpen, e.target.m);
				});
				this.markers.push(m);
				if(!this.icons['default'])
					this.addState({key: "default", val: "default", icon: { url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", node: {}}});
				m._m.setIcon(this.icons['default']);
			},
			addState: function(s) {
				var icon = null;
				var iconHTML = "";
				var iconHTML_forURL = '<div class="eim icon-wrapper"><img src=${ url } /></div>';
				var iconHTML_forNode= '<div class="eim icon-wrapper"> ${ innerHTML } </div>';

				if(s.icon.url){
					iconHTML = _.template(iconHTML_forURL)({url : s.icon.url});
				} else {
					iconHTML = _.template(iconHTML_forNode)({innerHTML: s.icon.node.html()});
				}
				icon = L.divIcon({html: iconHTML});

				this.icons[s.key] = icon;
				this.states[s.key] = s;
			},
			addScopedPopup: function(p, $scope) {
				this.popup = p; 
				p._p = L.popup().setContent(p.content);
				p._p.p = p; 

				p.currentMarker = null;
				p.visible = false;

				p.openOn = function(m){
					var pp = this._p, mm = m._m;
					if(m !== this.currentMarker){
						$scope.setMarker(m);
						if(this.currentMarker){
							this.currentMarker._m.closePopup();
							this.currentMarker._m.unbindPopup();
						}
						mm.bindPopup(pp);
						pp.update();
						mm.openPopup();
						this.currentMarker = m;
					}
				};
				p.close = function() {
					if(this.currentMarker){
						this.currentMarker._m.closePopup();
						this.visible = false;
					}
				};
				return p;
			},
			addMarker: function(m) {
				if(!this.isVisible(m)){
					this._visibleLayer.addLayer(m._m);
				}
			},
			addAllMarkers: function(ary) {
				console.log('adding all markers!');
				console.log(ary);
				if(ary) {
					console.log('attemping to add!');
					_.forEach(ary, this.addMarker);
				}
			},
			removeMarker: function(m) {
				if(this.isVisible(m))
					this._visibleLayer.removeLayer(m._m);
			},
			removeAllMarkers: function(ary) {
				if(!ary)
					this._visibleLayer.clearLayers();
				else 
					_.forEach(ary, this.removeMarker);
			},
			setVisible: function(m, bool) {
				if(bool)
					this.addMarker(m);
				else
					this.removeMarker(m);
			},
			isVisible: function(m){
				if(!m._m)
					this._prepareMarker(m);
				return this._visibleLayer.hasLayer(m._m);
			},
			getVisibleMarkers: function(){
				return _.filter(this.markers, this.isVisible);
			},
			setState: function(m, s) {
				m._m.setIcon(this.icons[s.key]);
			},
			openMarker: function(m) {
				debugger
				this.popup.openOn(m);
			},
			setIcon: function(m, state){

			},
			moveCenter: function() {},
			setZoom: function() {}
		};
	}
}



var inline = ['$rootScope', LeafletIMapFactory];

export default inline;