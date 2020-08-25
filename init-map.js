mapboxgl.accessToken = 'pk.eyJ1IjoiY3JlYXRpdmVhbGNoZW15IiwiYSI6ImNrY3hncmZsaDAzd2Uycm1kMDMzendla2oifQ.Ipc4OYyTLjhevQR9_Y8TBA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/creativealchemy/ckcxibvcp0wb01iml0xpco9o2',
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

map.on('load', function() {
  // Find all features in one source layer in a vector source
  var schoolFeatures = map.querySourceFeatures('composite', {
    'sourceLayer': "school_data"
  });

  var universityFeatures = map.querySourceFeatures('composite', {
    'sourceLayer': "ihe_data"
  });

  var reformattedUniversityFeatures = universityFeatures.map(function(university) {
    var universityFeature = university.properties;
    var licensureAreas = [];

    for (var key in universityFeature) {
      if (key.includes('Licensure Area ') && universityFeature[key]) {
        licensureAreas.push(universityFeature[key]);
      }
    }

    universityFeature['Licensure Areas'] = licensureAreas;
    return university;
  });

  var createIHEPartnersDictionary = function() {
    var IHEPartnersDictionary = {};

    schoolFeatures.forEach(function(schoolFeature) {
      var IHEPartner1 = schoolFeature.properties['IHE Partner 1'];
      var IHEPartner2 = schoolFeature.properties['IHE Partner 2'];
      var IHEPartner3 = schoolFeature.properties['IHE Partner 3'];
      var IHEPartner4 = schoolFeature.properties['IHE Partner 4'];

      var IHEPartners = [IHEPartner1, IHEPartner2, IHEPartner3, IHEPartner4];

      IHEPartners.forEach(function(IHEPartner) {
        if (IHEPartner) {
          var schoolName = schoolFeature.properties['School Name'];

          if (IHEPartnersDictionary[IHEPartner]) {
            IHEPartnersDictionary[IHEPartner].push(schoolFeature);
          } else {
            IHEPartnersDictionary[IHEPartner] = [schoolFeature]
          }
        }
      });
    });

    return IHEPartnersDictionary;
  }

  var IHEPartnersDictionary = createIHEPartnersDictionary();

  window.features = schoolFeatures.concat(universityFeatures);

  var handleClick = function(educationType, e) {
    var features = map.queryRenderedFeatures(e.point);

    var coordinates = features[0].geometry.coordinates.slice();
    var description = ""
    for (var key in features[0].properties) {
      if (!key.includes("Licensure Area")) {
        description += "<div><b>" + key + ":</b> " + features[0].properties[key] + "</div>";
      }
    }

    var licensureAreas = [];

    for (var key in features[0].properties) {
      if (key.includes('Licensure Area ') && features[0].properties[key]) {
        licensureAreas.push(features[0].properties[key]);
      }
    }

    if (licensureAreas.length > 0) {
      description += "<div><b>Licensure Areas:</b> " + licensureAreas.join(", ") + "</div>";
    }

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);

    if (educationType === 'university') {
      var universityName = features[0].properties['IHE Name '];
      // Get partners of the clicked university
      var IHEPartners = IHEPartnersDictionary[universityName] || [];
      var filterOptions = ['any'];

      IHEPartners.forEach(function(IHEPartner) {
        filterOptions.push(['==', ['get', 'School Name'], IHEPartner.properties['School Name']]);
      });

      if (IHEPartners.length > 1) {
        var bounds = new mapboxgl.LngLatBounds();
        IHEPartners.forEach(function(feature) {
          bounds.extend(feature.geometry.coordinates);
        });
        map.fitBounds(bounds, { padding: 50, offset: [100, 0] });
      } else if (IHEPartners.length === 1) {
          map.flyTo({
            center: IHEPartners[0].geometry.coordinates,
            essential: true,
            zoom: 6,
          });
      }

      map.setFilter('school-data', filterOptions);
      map.setFilter('ihe-data', ['==', ['get', 'IHE Name '], universityName]);
    }
  }

  var setCursorPointer = function() { map.getCanvas().style.cursor = 'pointer'; };
  var setCursorDefault = function() { map.getCanvas().style.cursor = 'pointer'; };

  // When a click event occurs on a feature in the school_data layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point);

    // check if clicked feature is not a school or instituation
    if (features.length === 0 || !features[0].properties["IHE Name "] || !features[0].properties["School Name"]) {
      var previousFeatures = window.filteredFeatures || window.features;
      var filterOptions = ['any'];
      previousFeatures.forEach(function(filterFeature) {
        if (filterFeature.properties["IHE Name "]) {
          filterOptions.push(['==', ['get', 'IHE Name '], filterFeature.properties["IHE Name "]]);
        } else if (filterFeature.properties["School Name"]) {
          filterOptions.push(['==', ['get', 'School Name'], filterFeature.properties["School Name"]]);
        }
      })

      map.setFilter('school-data', filterOptions);
      map.setFilter('ihe-data', filterOptions);
    }
  });
  map.on('click', 'school-data', handleClick.bind(this, 'school'));
  map.on('click', 'ihe-data', handleClick.bind(this, 'university'));

  map.on('mousemove', 'school-data', setCursorPointer);
  map.on("mouseleave", 'school-data', setCursorDefault);
  map.on('mousemove', 'ihe-data', setCursorPointer);
  map.on("mouseleave", 'ihe-data', setCursorDefault);
});

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