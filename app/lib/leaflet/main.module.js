import angular from 'angular';
import IMap from 'eim.leaflet.imap';
import map from 'eim.leaflet.map';

angular.module('eim-leaflet', [])
.factory('leaflet.map', map)
.factory('IMap', IMap);