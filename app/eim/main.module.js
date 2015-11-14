import 'eim.leaflet'; // run for angular registration side effects.
import stateDirective from 'eim.eimState.directive';
import filterChecklistDirective from 'eim.eimFilterChecklist.directive';
import eimMapDirective from 'eim.eimMap.directive';

import MapService from 'eim.Map.service';
import StatesService from 'eim.States.service';
import FiltersService from 'eim.Filters.service';
import filterPredicatesFactory from 'eim.filterPredicates.factory';

import angular from 'angular';

var app = angular.module("eim-map", ['eim-leaflet']);

app.directive('eimMap', eimMapDirective);
app.directive('eimState', stateDirective);
app.directive('eimFilterChecklist', filterChecklistDirective);
app.service('eim.s.map', MapService);
app.service('eim.s.filters', FiltersService);
app.service('eim.s.states', StatesService);
app.factory('eim.f.filterPredicates', filterPredicatesFactory);
// app.directive('eimPopup', PopupDirective);