# webmaps-demo
Built using ES6 and JSPM

To run, run the following on the terminal/bash:

chmod -x build.sh

sh build.sh


Inside this repo directory, the meat of the demo is in "./app/leafletMap.js".
There is a Google Maps API module as well, but it does not work without using a specialized loader outside of SystemJS.
Gmaps would need to be loaded and assumed global from a script a tag and the corresponding Gmaps CDN. 

Roadmap: 

Demonstrate the difference in creating markers on each map with custom HTML.
