import _ from 'lodash';

function filterService() {
	this.map = null;
	this.filters = [];
	this.add = [].push.bind(this.filters);

	this.filterMarkers = function(markers) {
		// pipe filters one into the next. 
		// turn everyone off, then find out who passes. 
		_.forEach(this.filters, function(filter){
			markers = filter(markers);
		});
		// TODO:DCH66 Consider this...
		// -- or --
		// return _.reduce(this.filters, markers);
		// Damn, I love javascript.
		return markers;
	}
}

export filterService;