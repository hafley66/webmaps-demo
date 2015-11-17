// Events global configuration.
var eim = {
	ns: "eim:",
	e: function(e){
		return this.ns + e;
	},
	get markerClicked() {
		return this.e('onMarkerClicked');
	},
	get mapReady() {
		return this.e('onMapReady');
	}
};

export default eim;