0. OVERVIEW:
0.1. HTML Components
	This project is intended to wrap the Leaflet API for faster 
	production of any map related services. There are many kinds
	of objects that can be viewed on a map. These include: 
		Markers/Icons
		Popup/InfoWindows
		Controls
		GeoJson
		Vector Graphics
		...
	All of these objects have the ability to introduce arbitrary 
	HTML on the map. The methods for defining the origin point of 
	each is different, as well as the kind of data that each represents:
		Markers = Icon on map at specific (lat,lng) point.
		Popup = HTML with content that details the markers (or something else).
		Controls = HTML fixed to a certain anchor point on top of the map.
0.2. Getting the HTML in the map: Structure through Angular directives
	To get the HTML in the map, this app uses directives that mirror 
	their map counterparts: 
		Icons = <eim-state ...> icon html content ...
		Popup = <eim-popup ...> popup template ...
		Control = <eim-control ...> control template ...
		Map = <eim-map ...>  (<eim-* ...></eim-*>)* </eim-map>

1. The Directives
1.1. <eim-map> 
	Denotes the beginning of the map configurations. 
	All other <eim...> elements should be nested inside this. 


2. HOW TO USE DIRECTIVES
2.1. Core Directives
2.1.1. Adding markers
	1. Create a new ng-module that lists 'eim-map' as a dependency.
	2. Create a service (controller,factory, etc.) and pull in 'eim.map'
		as an angular dependency. This is the main map instance. 
	3. Call map.addMarker(obj) where obj is structured as such:
			var obj = {
				latlng : { 
					lat: ...,
					lng: ...
				},
				fields: {...}
			};
	3.1. This object is all that is needed for the popup to work when a 
		marker gets clicked on. The map instance will handle the rest and
		automatically add the marker to the map.
	4. This is essentially the only thing done programmatically in this app.
		All other mechanisms are transformed into directives. 
		Even filters are taken care of with directives, as well as states. 

2.1.2. Templating the popup directive and how it's $scope works.
	1. The marker.fields property of the currently clicked marker will be assigned to the 
		$scope.fields property of the popup directive scope. This is achieved by:
			USER --> marker is clicked
			CODE --> Scope is assigned the marker's properties
				 --> $scope.$digest is called to notify angular context that $scope.fields has changed.
				 --> call popup.update() to tell map that popup HTML has changed dimensions
				 --> tell map to open the popup at the marker's coordinates.
			USER --> See new popup with same template but with data specific to that marker
	2. Example usage of <eim-popup>:
			<eim-map>...
				<eim-popup>
					<div class="container">
						<h3 class="title"> {/ fields.display_name /} </h3>
					...</div>
				...</eim-popup>
			...</eim-map>

2.1.3. Icons
	1. Icons can be a url to an image or a piece of HTML content.
	2. To use an image url, 
		<eim-state 
			key="..." val="..."
			icon-url="..." />
	3. To use HTML, 
		<eim-state
			key="" val="">
			<div.../>
		</eim-state>
	3.1. Style with css to fit needs.

2.1.4. Controls 
	1. Controls have isolated scope and are meant to be a convenience directive.
	2. To create a control,
		<eim-control 
			position="topright || topleft || bottomright || bottomleft"> 
			<.../>
		</eim-control>

2.2. Extension Directives
2.2.1. Filters
	1. Purpose is to determine which markers are visible based on the data in their fields property.
	2. These simply pick the values from specified keys of marker.fields, and then see if any of these values 
		are in the specified list of values attached to this filter.
	2.1. Example:
			Filter = {
				name: "healths",
				keys: [
					{value: "winterization_health", active: true}, 
					{value: "summarization_health", active: true}
				],
				values: [
					{value: "good", active: true},
					{value: "open_tasks", active:true}, 
					{value: "needs_attention", active: true}
				]
			}
		...When a marker is put through the filter, it selects the values at the keys
			vals = [fields[keys[0].value], fields[keys[1].value], ...]
		...Then asks if any of these values are in the Filter.values array
			for(i in vals)
				if(vals[i] in Filter.values.asArray)
					return true // this marker passes to the next round of filters
			return false // this marker is now invisible
	3. How to use
		<eim-filter-group
			id="healths"
			eim-keys="<ng-expression>"
			keys="comma, separated, list, of, key,strings"
			keys-name="Reasons"
			eim-values="<ng-expression>"
			values="same as keys"
			values-name="Healths"
		/>
	4. Modeling the filters
		Attach the filter service to the scope in a controller that would 
		generate the list of checkboxes or radio buttons. 
			<eim-control>
				<ul class="filters" ng-controller="... as ctrl">
					<li ng-repeat="filter in filters">
						<ul ng-class="filter.name">
							<li ng-repeat="value in filter.vals">
								<input type="checkbox" ng-model="value.active" eim-filter-click>
							</li>
						....
		With these modeled in place, anytime the checkboxes are clicked, the map will refilter the markers.
		Or any time new filters are added to the map, they will automatically go through the filters. 

2.2.2. States 
	1. 