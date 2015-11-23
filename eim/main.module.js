import "./eimStyles.css!";

// import filterChecklistDirective from 'eim.eimFilterChecklist';
import mapDirective from 'eim/map/mapDirective';
import mapManagerService from 'eim/map/mapManagerService';
import stateDirective from 'eim/state/stateDirective';
import popupDirective from 'eim/popup/popupDirective';
import filterPredicatesFactory from 'eim/filter/filterPredicatesFactory';
import controlDirective from 'eim/control/controlDirective';

import LeafletMap from 'eim/leaflet/mapFactory';
import angular from 'angular';


console.log("hello world");
var app = angular.module("eim-map", []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{/');
	$interpolateProvider.endSymbol('/}');
});
app.directive('eimMap', mapDirective);
app.directive('eimState', stateDirective);
// app.directive('eimFilterChecklist', filterChecklistDirective);
app.directive('eimPopup', popupDirective);
app.directive('eimControl', controlDirective);
app.service('eim.mapper', mapManagerService);
app.factory('eim.filterPredicates', filterPredicatesFactory);
app.factory('eim.map.leaflet', LeafletMap);
export default app;