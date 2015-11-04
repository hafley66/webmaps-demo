import * as gmaps from 'gmaps';
import customMarker from 'templates/custom-marker.html!text';

var apiKey = 'AIzaSyAk057tSOIH_BWOLUn2WkwsxJwPce3D3NE';
//gmaps(apiKey);
console.log(gmaps);
console.log(customMarker);
//This is a snippet.
google.maps.event.addListenerOnce(map, 'idle', function(){
    // do something only the first time the map is loaded
});