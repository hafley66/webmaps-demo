import _ from 'lodash';
import "eim";
import angular from 'angular';
import eim from 'eim.events';
var app = angular.module('dte-example', ['eim-map']);

app.controller("dte-mapper", ['$rootScope', '$scope', '$http', 'eim.mapper', function($rootScope, $scope, $http, mapper){
	$rootScope.$on(eim.mapReady, function(e, m){
		
		$http.get('mapdata.json').then(
			
			function addTheMarkers(x){
				console.log(x);
				_.forEach(x.data, function(data) {
					if(data.fields.latitude && data.fields.longitude)
						mapper.map.addMarker({
							latlng: {
								lat: data.fields.latitude,
								lng: data.fields.longitude
							},
							fields: data.fields
						});	
				});
			});
	});
}]);



export default app;

