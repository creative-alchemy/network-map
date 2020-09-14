
function forwardGeocoder(query) {
  var matchingFeatures = [];

  features.forEach(function(feature) {
    var schoolOrUniversityName = feature.properties['School Name'] || feature.properties['IHE Name '];

    if (schoolOrUniversityName.toLowerCase().search(query.toLowerCase()) !== -1) {
      feature['place_name'] = schoolOrUniversityName;
      feature['center'] = feature.geometry.coordinates;
      matchingFeatures.push(feature);
    }
  });

  return matchingFeatures;
}

function zoomToMarkers(markers) {
  if (markers.length > 1) {
    var bounds = new mapboxgl.LngLatBounds();

    window.allMarkers.forEach(function(marker) {
      if (marker.Longitude && marker.Latitude) {
        bounds.extend([marker.Longitude, marker.Latitude]);
      }
    });

    map.fitBounds(bounds, { padding: 100, offset: [100, 0] });
  }
}

function initializeMap(schoolJson, universityJson) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiY3JlYXRpdmVhbGNoZW15IiwiYSI6ImNrY3hncmZsaDAzd2Uycm1kMDMzendla2oifQ.Ipc4OYyTLjhevQR9_Y8TBA';
  window.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/creativealchemy/ckf1yi5i420yb19oarf18bh5z',
    center: [-100.5795, 39.8283], // center of U.S.
    zoom: 4 // starting zoom
  });


  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    countries: 'us',
    localGeocoder: forwardGeocoder,
    placeholder: 'Search for a school/university',
    mapboxgl: mapboxgl,
    zoom: 8
  });

  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

  // Populate with all the schools
  schoolJson.forEach(function(school) {
    // Exit early if there is no school name;
    if (school["School Name"] === undefined || school["School Name"] === null || school["School Name"] === "") {
      return;
    }

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker marker__school';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat([school.Longitude, school.Latitude])
      .addTo(map);
  });

  // Populate with all the universitys
  universityJson.forEach(function(university) {
    // Exit early if there is no university name;
    if (university["IHE Name"] === undefined || university["IHE Name"] === null || university["IHE Name"] === "") {
      return;
    }

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker marker__preparation-program';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat([university.Longitude, university.Latitude])
      .addTo(map);
  });

  window.allMarkers = schoolJson.concat(universityJson);

  zoomToMarkers(window.allMarkers);
}
