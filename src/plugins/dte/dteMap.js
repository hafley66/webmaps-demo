import './dte.styles.css!';
import datah from './mapdata.json!';
import template from './templates/dte.popup.template.html!text';

import _ from 'lodash';
import "eim";
import angular from 'angular';
import eim from 'eim/events';


var app = angular.module('dte-example', ['eim-map']);
app.factory("DTE.states", [function(){
	return {
		reasons: {
			winterization_health: "Winterization",
			summerization_health:  "Summerization",
			annual_audit_health: "Annual Audit",
			routine_inspection_health: "Routine Inspection"
		},
		reasonsKeys: _.keys(this.reasons)
	};
}]);
app.factory('DTE.externalData', ['$http', function($http){
	console.log(datah);
	// return $http.get('mapdata.json');
	return datah;
}]);
app.controller("DTE.ExternalDataController", ['$rootScope', '$scope', '$http', 'eim.mapper', 'DTE.externalData', function($rootScope, $scope, $http, mapper, datas){
	console.log("event emmitted");
	mapper.getMap.then(function(map){
		if(datas.then)
			datas.then(function addTheMarkers(x){
				// console.log(x);
				var d = x.data.slice(-5);
				addMarkers(d);
			});
		else {
			_.forEach(datas, function(data) {
				var marker = fromDataToMarker(data);
				if(marker){
					map.addMarker(marker);	
				}
			});
		}
	});



	function fromDataToMarker(data){
		if(data.fields.latitude && data.fields.longitude){
			data.fields.pk = data.pk;
			var marker = {
				latlng: {
					lat: data.fields.latitude,
					lng: data.fields.longitude
				},
				fields: data.fields
			};
			return marker;
		}
		return null;
	}
}]);
app.directive('dteTableControl', function() {
	return {
		scope: true,
		controller: "DTE.PopupTableController"
	};
});
app.controller('DTE.PopupTableController', ['$scope', function($scope){
	$scope.makeSubstationUrl = function() {
		var substation_url = '/plugins/dte/reports/substation_profile/';
		return substation_url + $scope.fields.pk;
	};

	$scope.getValidReasons = function() {
		if($scope.fields){
			return _.keys(_.pick($scope.reasons, function(value, key) {
				return $scope.fields[dateKey(key)];
			}));
		}
		return;
	};

	$scope.getHealth = function(key){
		return $scope.fields[key];
	};

	$scope.getLastDateOfReason = function(key){
		if($scope.fields) {
			var dateString = $scope.fields[dateKey(key)];
			var date = new Date(dateString);
			return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
		}
		return;
	};

	$scope.reasons = reasons;
	$scope.reasonsKeys = reasonsKeys;
}]);

app.directive('dtePopup', function() {
	return {
		template: template,
		replace: true
	}
});

angular.element(document).ready(function() {
	var container = angular.element(document.getElementById('dte-example'));
	angular.bootstrap(container, ['dte-example']);
});
export default app;

var reasons = {
	winterization_health: "Winterization",
	summerization_health:  "Summerization",
	annual_audit_health: "Annual Audit",
	routine_inspection_health: "Routine Inspection"
};
var reasonsKeys = _.keys(reasons);
function dateKey(key) {
	var transformedKey = "last_" + key.replace(/_health/, '_date'); 
	return transformedKey;
}

var stateList = ['good', 'open_tasks', 'needs_attention'];
