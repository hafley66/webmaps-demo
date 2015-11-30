import L from 'leaflet';
import _ from 'lodash';
import eim from 'eim/events';
import 'leaflet-providers';

function getmap(id, initOptions) {
	
	if(!initOptions)
		initOptions = {};
	initOptions.attributionControl = false;

	var map = L.map(id, initOptions);
	var mapboxid = 'hafley66.cigl4owb2014aujlz1r7u5x4j';
	var accessToken = 'pk.eyJ1IjoiaGFmbGV5NjYiLCJhIjoiY2lnbDRveGpxMDA5c3RxbTM1bDJjeDB1bSJ9.HrDOkxkziNZymFnFsbMBGA';
	L.tileLayer.provider('MapBox', {id: mapboxid, accessToken: accessToken}).addTo(map);
	
	return map;
}

function Marker(latlng, fields, icon) {
	this.latlng = latlng;
	this.fields = fields;
	this.map = Marker.map;
	if(Marker.map)
		Marker.map.addMarker(this);
}

function LeafletIMapFactory($rootScope) {
	return function LeafletIMap(id, options) {
		var MAP = getmap(id, options),
		visibleLayer = new L.FeatureGroup();
		MAP.addLayer(visibleLayer);
		var IMAP = {
			map: MAP,
			markers: [],
			states: {},
			icons: {},
			popup: null,
			_visibleLayer: visibleLayer, 
			_prepareMarker(m) {
				m._m = L.marker(m.latlng);
				m._m.m = m;
				m._m.on("click", function onMarkerClick(e) {
					$rootScope.$emit(eim.markerClicked, {
						imap: IMAP, 
						eventData: e, 
						marker: e.target.m
					});
				});
				m._m.on('popupopen', function onMarkerPopupOpen(e){
					$rootScope.$emit(eim.markerPopupOpen, e.target.m);
				});
				this.markers.push(m);
				if(!this.icons['default'])
					this.addIcon({key: "default", url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"});
				m._m.setIcon(this.icons['default']);
			},
			addControl(controlNode_jqLite, position) {
				var leafletControlExtension = {
					options: {
						position: position
					},
					onAdd: function(map) {
						return controlNode_jqLite[0];
					}
				},
				Control = L.Control.extend(leafletControlExtension);

				this.map.addControl(new Control());
			},
			addState(iconConfig) {
				var {key, url, node} = iconConfig,
				icon = null,
				iconHTML = "",
				iconHTML_forURL = '<div class="eim icon-wrapper"><img src=${ url } /></div>',
				iconHTML_forNode= '<div class="eim icon-wrapper"> ${ innerHTML } </div>';

				if(url){
					iconHTML = _.template(iconHTML_forURL)({url : url});
				} else {
					iconHTML = _.template(iconHTML_forNode)({innerHTML: node.html()});
				}
				icon = L.divIcon({
					className: "eim-icon-marker", 
					html: iconHTML
				});

				// Add to hash of icons.
				this.icons[key] = icon;
			},
			addIcon(iconConfig) {
				var {key, url, node} = iconConfig,
				icon = null,
				iconHTML = "",
				iconHTML_forURL = '<div class="eim icon-wrapper"><img src=${ url } /></div>',
				iconHTML_forNode= '<div class="eim icon-wrapper"> ${ innerHTML } </div>';

				if(url){
					iconHTML = _.template(iconHTML_forURL)({url : url});
				} else if(node){
					iconHTML = _.template(iconHTML_forNode)({innerHTML: node.html()});
				} else {console.log("Error submitting icon")}
				icon = L.divIcon({className: "eim-icon-marker", html: iconHTML});

				// Add to hash of icons.
				this.icons[key] = icon;
			},
			addScopedPopup(p, $scope) {
				this.popup = p; 
				p._p = L.popup().setContent(p.content);
				p._p.p = p; 

				p.currentMarker = null;

				p.openOn = function(m, latlng){
					var pp = this._p;
					pp.setLatLng(latlng);
					$scope.setMarker(m);
					pp.update();
					MAP.openPopup(pp);
				};
				p.close = function() {
					if(this.currentMarker){
						this.currentMarker._m.closePopup();
					}
				};
				return p;
			},
			addMarker(m) {
				if(!this.isVisible(m)){
					this._visibleLayer.addLayer(m._m);
				}
			},
			addAllMarkers(ary) {
				if(ary) {
					_.forEach(ary, this.addMarker);
				}
			},
			removeMarker(m) {
				if(this.isVisible(m))
					this._visibleLayer.removeLayer(m._m);
			},
			removeAllMarkers(ary) {
				if(!ary)
					this._visibleLayer.clearLayers();
				else 
					_.forEach(ary, this.removeMarker, this);
			},
			getVisibleMarkers(){
				return _.filter(this.markers, this.isVisible, this);
			},
			isVisible: function(m) {
				if(!m._m) this._prepareMarker(m);
				return this._visibleLayer.hasLayer(m._m);
			},
			setIcon: function(m, key){
				if(!key){
					m._m.setIcon(this.icons['default']);
				} else m._m.setIcon(this.icons[key]);
			}
		};
		return IMAP;
	}
}



var inline = ['$rootScope', LeafletIMapFactory];

export default inline;