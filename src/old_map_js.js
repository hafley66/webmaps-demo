{% extends "jove/flatui/common/base_template.html" %}
{% load expand_tags %}
{% load custom_dte_filters %}

{% block page_content %}
    <style>
        .defectsPopup {
            position: absolute;
            display: none;
        }

        td:hover .defectsPopup {
            display: block;
            padding: 5px;
            border: 1px solid black;
            background-color: #333;
            color: #eee;
            z-index: 1;
        }

        b.red {
            color: #FF0000;
        }

        b.green {
            color: #20d220;
        }

        .thAlt {
            font-weight: 500;
            font-size: 75%;
        }

        .caution {
            color: #f39659;
            font-size: small !important;
        }
        .go {
            color: #20d220;
            font-size: small !important;
        }

        .info-window table {
            border-collapse: collapse;
        }

        .info-window td, .info-window th {
            border: 1px solid #999;
            padding: 0.5rem;
            text-align: left;
        }

        #filters-window {
            display: none;
            padding-top:10px;
            overflow : scroll;
            background-color: rgba(255, 255, 255, 0.9);
        }

        .filter-list-container .heading {
            font-size:1.5em;
            display:block;
            margin:15px 0 10px 0;
        }

        .filters ul {
            list-style : none;
            padding-left: 0;
            margin:0;
        }

    </style>
    {% include "plugins/dte/reports/reporting_css.html" %}
    {% if not request.GET.disable_header %}
        {% block page_header %}{% include "jove/flatui/widgets/common/header_bar.html" %}{% endblock %}
    {% endif %}


    <div class="report-container {% if request.GET.disable_header %}no-header{% endif %} map-container">

        <div id="map" name="map" class="report-map-large"></div>
        <div id="filters-window" class="filters container-fluid">
            <div class="filter-column-1">
                <div class="filter-list-container area">
                    <span class="heading">By Area</span>
                        <ul class="filters area area-filters">
                            <li>
                                <div id="cbox-lapeer_naec" class="cbox area">
                                    <label for="area-lapeer_naec" class="checkbox area">
                                        <input type="checkbox" value="" id="area-lapeer_naec" data-toggle="checkbox" class="custom-checkbox area"/>
                                        <span class="icons">
                                            <span class="icon-unchecked"></span>
                                            <span class="icon-checked"></span>
                                        </span>
                                        <span class="cbox-text">Lapeer/Naec</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div id="cbox-marysville" class="cbox area">
                                    <label for="area-marysville" class="checkbox area">
                                        <input type="checkbox" value="" id="area-marysville" data-toggle="checkbox" class="custom-checkbox area"/>
                                        <span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Marysville</span>              </label>            </div>          </li>          <li>            <div id="cbox-pontiac" class="cbox area">              <label for="area-pontiac" class="checkbox area">                <input type="checkbox" value="" id="area-pontiac" data-toggle="checkbox" class="custom-checkbox area"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Pontiac</span>              </label>            </div>          </li>          <li>            <div id="cbox-shelby" class="cbox area">              <label for="area-shelby" class="checkbox area">                <input type="checkbox" value="" id="area-shelby" data-toggle="checkbox" class="custom-checkbox area"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Shelby</span>              </label>            </div>          </li>          <li>            <div id="cbox-ann_arbor" class="cbox area">              <label for="area-ann_arbor" class="checkbox area">                <input type="checkbox" value="" id="area-ann_arbor" data-toggle="checkbox" class="custom-checkbox area"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Ann Arbor</span>              </label>            </div>          </li>          <li>            <div id="cbox-caniff_east" class="cbox area">              <label for="area-caniff_east" class="checkbox area">                <input type="checkbox" value="" id="area-caniff_east" data-toggle="checkbox" class="custom-checkbox area"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Caniff East</span>              </label>            </div>          </li>          <li>            <div id="cbox-caniff_north" class="cbox area">              <label for="area-caniff_north" class="checkbox area">                <input type="checkbox" value="" id="area-caniff_north" data-toggle="checkbox" class="custom-checkbox area"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Caniff North</span>              </label>            </div>          </li>          <li>            <div id="cbox-caniff_west" class="cbox area">              <label for="area-caniff_west" class="checkbox area">                <input type="checkbox" value="" id="area-caniff_west" data-toggle="checkbox" class="custom-checkbox area"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Caniff West</span>              </label>            </div>          </li>          <li>            <div id="cbox-newport" class="cbox area">              <label for="area-newport" class="checkbox area">                <input type="checkbox" value="" id="area-newport" data-toggle="checkbox" class="custom-checkbox area"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Newport</span>              </label>            </div>          </li>          <li>            <div id="cbox-pontiac_west" class="cbox area">              <label for="area-pontiac_west" class="checkbox area">                <input type="checkbox" value="" id="area-pontiac_west" data-toggle="checkbox" class="custom-checkbox area"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Pontiac West</span>              </label>            </div>          </li>          <li>            <div id="cbox-wwsc" class="cbox area">              <label for="area-wwsc" class="checkbox area">                <input type="checkbox" value="" id="area-wwsc" data-toggle="checkbox" class="custom-checkbox area"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Wwsc</span>              </label>            </div>          </li>        </ul></span></div>  </div>  <div class="filter-column-2">    <div class="filter-list-container reason"><span class="heading"> By Reason</span>        <ul class="filters reason reason-filters">          <li>            <div id="cbox-annual_audit_health" class="cbox reason">              <label for="reason-annual_audit_health" class="checkbox reason">                <input type="checkbox" value="" id="reason-annual_audit_health" data-toggle="checkbox" class="custom-checkbox reason"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Annual Audit</span>              </label>            </div>          </li>          <li>            <div id="cbox-routine_inspection_health" class="cbox reason">              <label for="reason-routine_inspection_health" class="checkbox reason">                <input type="checkbox" value="" id="reason-routine_inspection_health" data-toggle="checkbox" class="custom-checkbox reason"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Routine Inspection</span>              </label>            </div>          </li>          <li>            <div id="cbox-summerization_health" class="cbox reason">              <label for="reason-summerization_health" class="checkbox reason">                <input type="checkbox" value="" id="reason-summerization_health" data-toggle="checkbox" class="custom-checkbox reason"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Summarization</span>              </label>            </div>          </li>          <li>            <div id="cbox-winterization_health" class="cbox reason">              <label for="reason-winterization_health" class="checkbox reason">                <input type="checkbox" value="" id="reason-winterization_health" data-toggle="checkbox" class="custom-checkbox reason"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Winterization</span>              </label>            </div>          </li>        </ul></span></div>    <div class="filter-list-container health"><span class="heading"> By Health</span>        <ul class="filters health health-filters">          <li>            <div id="cbox-needs_attention" class="cbox health">              <label for="health-needs_attention" class="checkbox health">                <input type="checkbox" value="" id="health-needs_attention" data-toggle="checkbox" class="custom-checkbox health"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Needs Attention</span>              </label>            </div>          </li>          <li>            <div id="cbox-open_tasks" class="cbox health">              <label for="health-open_tasks" class="checkbox health">                <input type="checkbox" value="" id="health-open_tasks" data-toggle="checkbox" class="custom-checkbox health"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Open Tasks</span>              </label>            </div>          </li>          <li>            <div id="cbox-good" class="cbox health">              <label for="health-good" class="checkbox health">                <input type="checkbox" value="" id="health-good" data-toggle="checkbox" class="custom-checkbox health"/><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span><span class="cbox-text">Good</span>              </label>            </div>          </li>        </ul></span></div>  </div></div>
    </div>


{% endblock %}

{% block additional_js %}
    <script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.js"></script>
    <script>
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
        var healths = {needs_attention : 'Needs Attention',open_tasks : 'Open Tasks',good : 'Good'};var reasons = {annual_audit_health : "Annual Audit",routine_inspection_health : 'Routine Inspection',summerization_health : 'Summarization',winterization_health : 'Winterization'};var areas = {lapeer_naec:"Lapeer/Naec",marysville: "Marysville",pontiac:"Pontiac",shelby:"Shelby","ann_arbor":"Ann Arbor",caniff_east:"Caniff East",caniff_north:"Caniff North",caniff_west:"Caniff West",newport:"Newport",pontiac_west:"Pontiac West",wwsc:"Wwsc"};

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
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAk057tSOIH_BWOLUn2WkwsxJwPce3D3NE&signed_in=true&callback=initMap"
            async defer></script>
    {#    dte/db/get_all_substations/#}
{% endblock %}