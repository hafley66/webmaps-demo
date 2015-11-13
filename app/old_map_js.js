var health_to_int = function(health) {
    var map = {
        needs_attention: 2,
        open_tasks: 1,
        good: 0
    };
    return map[health];
};
var int_to_health = function(integer) {
    var map = [
    'good',
    'open_tasks',
    'needs_attention'
    ];
    return map[integer];
};
var area_to_int = function(areaString) {
    var i = 1;var match = -1;
    _.forEach(areas, function(area, index) {
        if(index == areaString){
            match = i;
        }
        i++;
    });
    return match;
};
var healths = {needs_attention : 'Needs Attention',open_tasks : 'Open Tasks',good : 'Good'};
var reasons = {annual_audit_health : "Annual Audit",routine_inspection_health : 'Routine Inspection',summerization_health : 'Summarization',winterization_health : 'Winterization'};var areas = {lapeer_naec:"Lapeer/Naec",marysville: "Marysville",pontiac:"Pontiac",shelby:"Shelby","ann_arbor":"Ann Arbor",caniff_east:"Caniff East",caniff_north:"Caniff North",caniff_west:"Caniff West",newport:"Newport",pontiac_west:"Pontiac West",wwsc:"Wwsc"};

var filters = {
    healths : healths,
    areas : areas,
    reasons : reasons
};
var IconFactory = {
    needs_attention : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    open_tasks: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    good : 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
};

var map;
function makeInfoWindow(substation) {
    var title = substation.fields.display_name;
    var info =  '<div class="info-window"><div class="map-iw-title">';
    info += '<div class="title"> ${title} </div>';
    info += '<div class="button-text"> Go To Profile Page </div>';
    info += '</div>';
    info += '<table>';
    info = _.template(info, {title : title});


    _.forEach(reasons, function(display_name, key) {
        info += makeTableRowString({
            a : key,
            b : display_name,
            c : 'DTE',
            d : '10/19/2015'
        });

    });

    info += '</table>';
    info += '</div></div>';
    return info;
}
function makeTableRowString(rowData) {
    var s=  '<tr class="${a}"> <td class="name">${b} </td> 	<td class="assignee">${c} </td> 	<td class="date"> ${d} </td>  </tr>';
    return _.template(s, rowData);
}



function initMap() {
    var DEFAULT_MAP_STYLE = [
    {"featureType":"landscape","stylers":[{"visibility":"off"}]},
    {"featureType":"poi","stylers":[{"visibility":"off"}]},
    {"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},
    {"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"off"}]},
    {"featureType":"transit","stylers":[{"visibility":"off"}]},
    {"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"off"}]},
    {"featureType":"administrative.neighborhood","stylers":[{"visibility":"on"}]}
    ];
            //1) get data
var substations_data = $.getJSON('/plugins/dte/db/get_all_substations/', function (substations) {
    $.getJSON('/plugins/dte/db/get_all_areas/', function(areasJSON) {
        console.log(areas);
        var f = {}; _.forEach(areasJSON, function(area, key) {
            f[area.fields.name] = area.fields.display_name;
        });
        map = new Map('map', DEFAULT_MAP_STYLE, substations);
    });
});
}

function Map(mapID, styles, substations){

    this.gmap = new google.maps.Map(document.getElementById(mapID), {
        zoom: 14,
        center: {lat: 42.280826, lng: -83.743038},
        styles : styles,
        disableDefaultUI : true,
        zoomControl : true
    });
    var filterWindowNode = $('#filters-window');

    this.gmap.controls[google.maps.ControlPosition.LEFT].push(filterWindowNode[0]);
    filterWindowNode.show();
    var f = $('.cbox');
    _.forEach(f, function(cbox, index) {
        cbox.checked = true;
    });
    f.on('click', function(e){
        var cbox = e.currentTarget;
        cbox.checked = !cbox.checked;
        this.updateMarkers();
    }.bind(this));
    var areasFilters = $('.cbox.area');
    _.forEach(areasFilters, function(val, index){
        var inputBox = $(val.children[0].children[1]);
        inputBox.attr('checked', 'checked');
        $(val.children[0]).addClass('checked');
    });
    var reasonsFilters = $('.cbox.reason');
    _.forEach(reasonsFilters, function(val, index){
        var inputBox = $(val.children[0].children[1]);
        inputBox.attr('checked', 'checked');
        $(val.children[0]).addClass('checked');

    });
    var healthsFilters = $('.cbox.health');
    _.forEach(healthsFilters, function(val, index){
        var inputBox = $(val.children[0].children[1]);
        inputBox.attr('checked', 'checked');
        $(val.children[0]).addClass('checked');
    });
    this.filters = {
        areas: areasFilters,
        reasons : reasonsFilters,
        healths: healthsFilters
    };

    this.markers = createInfoWindowAndMarkers(this, substations);

    this.updateMarkers = function() {

        var activeFilters = getActiveFilters(this);
        console.log(activeFilters);
        console.log(activeFilters.areas);
        var checkedAreas = activeFilters.areas.map(area_to_int);

        var healthLimit =  _.max(activeFilters.healths.map(health_to_int));
        _.forEach(this.markers, function(aMarker, itsIndex){
            var gMarker = aMarker.gMarker;
            var oldIconURL = gMarker.getIcon();
            var hs = _.unique(aMarker.getHealthsAry(activeFilters.reasons));
            var intersection = _.intersection(activeFilters.healths, hs);
            var isMarkerInCheckedAreas = memberOf(checkedAreas, aMarker.substation.fields.area);

            if(!_.isEmpty(intersection) && isMarkerInCheckedAreas){
                aMarker.gMarker.setVisible(true);

                var m = _.max(intersection.map(health_to_int));
                var newIconURL = IconFactory[int_to_health(m)];
                if(newIconURL !== oldIconURL)
                    gMarker.setIcon(newIconURL);
            } else {
                        //show the marker.
                        gMarker.setVisible(false);
                    }
                });
    };
}

function memberOf(ary, element) {
    for(var i = 0; i < ary.length; i++){
        if(element === ary[i])
            return true;
    }
    return false;
}

function getActiveFilters(map) {
    var rActive = [];
    _.forEach(map.filters.reasons, function(cbox, index){
        var id = cbox.id;
        if(cbox.checked){
            rActive.push(cbox.id.slice('cbox-'.length));
        }
    });
    var hActive = [];
    _.forEach(map.filters.healths, function(cbox, index) {
        var id = cbox.id;
        if(cbox.checked){
            hActive.push(id.slice('cbox-'.length));
        }
    });
    var aActive = [];
    _.forEach(map.filters.areas, function(cbox, index) {
        var id = cbox.id;
        if(cbox.checked){
            aActive.push(id.slice('cbox-'.length));
        }
    });
    console.log("Active Areas Are : ");console.log(aActive);
    var toReturn = {
        areas : aActive,
        reasons : rActive,
        healths : hActive
    };


    return toReturn;
}

function Marker(map, substation, infoWindow) {
    this.map = map;
    this.substation = substation;

    var gMarker = new google.maps.Marker({
        map: map.gmap,
        position: {
            lat: Number(substation.fields.latitude),
            lng: Number(substation.fields.longitude)
        },
        title: substation.fields.display_name,
        icon: IconFactory[substation.fields.health],
        zIndex: substation.pk
    });
    gMarker.addListener('click', function() {
        infoWindow.close();
        infoWindow.setContent(makeInfoWindow(substation));
        infoWindow.open(map.gmap, gMarker);
    });
    this.gMarker = gMarker;
}
Marker.prototype.getHealthsAry = function(activeReasons) {
    if(!activeReasons || activeReasons === [])
        activeReasons = reasons;
    var f = this.substation.fields;
    var healths = [];
    _.forEach(activeReasons, function(val, key) {
        healths.push(f[val]);
    });
    return healths;
};
Marker.prototype.getHealthsToInts = function(activeReasons) {
    return this.getHealthsAry(activeReasons).map(health_to_int);
};

function createInfoWindowAndMarkers(map, substations){
    var infoWindow = new google.maps.InfoWindow({
        content: '<div class="test-div">'
    });
    infoWindow.addListener('domready', function() {
        console.log("Dont forget your closures!");
    });
    var markers = [];
    _.forEach(substations, function(sub, index) {
        markers.push(new Marker(map, sub, infoWindow));
    });
    return markers;
}
function createFilterButtons(map) {
    _.forEach(map.filters, function(filterGroup, index) {
        _.forEach(filterGroup, function(node, key){
            console.log("NODE " + node);
            google.maps.event.addDomListener(node, 'click', function(e) {
                console.log(e);
            });
        });
    });
}