System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.7",
    "app": "app/",
    "babel": "npm:babel-core@5.8.33",
    "babel-runtime": "npm:babel-runtime@5.8.29",
    "core-js": "npm:core-js@1.2.5",
    "eim": "app/eim/main.module",
    "eim.Filters.service": "app/eim/filters/Filters.service",
    "eim.Map.service": "app/eim/map/Map.service",
    "eim.States.service": "app/eim/states/States.service",
    "eim.eimFilterChecklist.directive": "app/eim/filters/filterChecklist.directive",
    "eim.eimMap.directive": "app/eim/map/eimMap.directive",
    "eim.eimState.directive": "app/eim/states/eimState.directive",
    "eim.filterPredicates.factory": "app/eim/filters/filterPredicates.factory",
    "eim.leaflet": "app/lib/leaflet/main.module",
    "eim.leaflet.imap": "app/lib/leaflet/imap.factory",
    "eim.leaflet.map": "app/lib/leaflet/map.factory",
    "gmaps": "https://maps.googleapis.com/maps/api/js?key=AIzaSyAk057tSOIH_BWOLUn2WkwsxJwPce3D3NE",
    "google-maps-api": "npm:google-maps-api@1.1.0",
    "leaflet": "github:Leaflet/Leaflet@0.7.7",
    "leaflet-providers": "github:leaflet-extras/leaflet-providers@1.1.6",
    "lodash": "npm:lodash@3.10.1",
    "templates": "app/templates",
    "text": "github:systemjs/plugin-text@0.0.3",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:asap@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.29": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.5": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:google-maps-api@1.1.0": {
      "latlng": "npm:latlng@1.0.0",
      "promise": "npm:promise@6.1.0",
      "scriptjs": "npm:scriptjs@2.5.8"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:promise@6.1.0": {
      "asap": "npm:asap@1.0.0"
    },
    "npm:scriptjs@2.5.8": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
