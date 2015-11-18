import "./eimStyles.css!";

import stateDirective from 'eim.eimState';
import filterChecklistDirective from 'eim.eimFilterChecklist';
import eimMapDirective from 'eim.eimMap';
import eimPopupDirective from 'eim.eimPopup';

import MapService from 'eim.mapper';
import filterPredicatesFactory from 'eim.filterPredicates';

import LeafletIMap from 'eim.imap.leaflet';
import angular from 'angular';


var app = angular.module("eim-map", []);
app.directive('eimMap', eimMapDirective);
app.directive('eimState', stateDirective);
app.directive('eimFilterChecklist', filterChecklistDirective);
app.directive('eimPopup', eimPopupDirective);
app.service('eim.mapper', MapService);
app.factory('eim.filterPredicates', filterPredicatesFactory);
app.factory('eim.imap.leaflet', LeafletIMap);

export default app;