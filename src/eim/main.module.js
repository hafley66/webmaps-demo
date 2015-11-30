import "../eim/eimStyles.css!";

import mapDirective from 'eim/directives/mapDirective';
import iconDirective from 'eim/directives/iconDirective';
import popupDirective from 'eim/directives/popupDirective';
import controlDirective from 'eim/directives/controlDirective';
import filterDirective from 'eim/directives/filterDirective';
import filterClickedDirective from 'eim/directives/filterModelDirective';
import stateDirective from 'eim/directives/stateDirective';
import stateGroupDirective from 'eim/directives/stateGroupDirective';

import mapManagerService from 'eim/services/mapManagerService';
import LeafletMap from 'eim/services/leafletMapFactory';
import filterService from 'eim/services/filterService';
import stateService from 'eim/services/stateService';

import angular from 'angular';

console.log("hello world");
var app = angular.module("eim-map", []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{/');
	$interpolateProvider.endSymbol('/}');
});


app.directive('eimMap', mapDirective);
app.directive('eimIcon', iconDirective);
app.directive('eimPopup', popupDirective);
app.directive('eimControl', controlDirective);
app.directive('eimFilter', filterDirective);
app.directive('eimFilterClick', filterClickedDirective)
app.directive('eimState', stateDirective);
app.directive('eimStateGroup', stateGroupDirective);

app.factory('eim.mapper', mapManagerService);
app.factory('eim.filters', filterService);
app.factory('eim.map.leaflet', LeafletMap);
app.factory('eim.states', stateService);


export default app;