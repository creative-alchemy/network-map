
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

function initializeMap(schoolJson, universityJson) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3JlYXRpdmVhbGNoZW15IiwiYSI6ImNrY3hncmZsaDAzd2Uycm1kMDMzendla2oifQ.Ipc4OYyTLjhevQR9_Y8TBA';
    var map = new mapboxgl.Map({
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
}
