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

  var zoomToAllFeatures = function() {
    if (window.features.length > 1) {
      var bounds = new mapboxgl.LngLatBounds();

      window.features.forEach(function(feature) {
        bounds.extend(feature.geometry.coordinates);
      });

      map.fitBounds(bounds, { padding: 100, offset: [100, 0] });
    }
  }

  var IHEPartnersDictionary = createIHEPartnersDictionary();

  window.features = schoolFeatures.concat(universityFeatures);

  zoomToAllFeatures();

  var popup = new mapboxgl.Popup({
    closeOnClick: false,
  });

  var handleClick = function(educationType, e) {
    map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point);

    var coordinates = features[0].geometry.coordinates.slice();
    var description = "<div>"
    var properties = features[0].properties;
    var licensureAreas = [];
    for (var key in features[0].properties) {
      if (key.includes('Licensure Area ') && features[0].properties[key]) {
        licensureAreas.push(features[0].properties[key]);
      }
    }
    
    
    description += "<h5><b>" + (properties["IHE Name "] || properties["School Name"]) + "</b></h5>";
    description += "<ul>";
    if (properties["PTT Network"] == "Yes") {
      description += "<li><b>Prepared To Teach Learning Network</b></li>";
    }
    description += "<li><b>Locale:</b> " + properties["Locale"] + "</li>";
    description += "<li><b>Size:</b> " + (properties["Size"] || properties["Type/Size"]) + "</li>";
    if (properties["Grade Level"]) {
      description += "<li><b>Grade Level:</b> " + properties["Grade Level"] + "</li>";
    }
    if (properties["Type"]) {
      description += "<li><b>Type:</b> " + properties["Type"] + "</li>";
    }
    if (properties["High-Needs School"]) {
      description += "<li><b>High-Needs School:</b> " + properties["High-Needs School"] + "</li>";
    }
    if (properties["Hosts Culminating Year-Long Clinical Placement"]) {
      description += "<li><b>Hosts Culminating Year-Long Clinical Placement:</b> " + properties["Hosts Culminating Year-Long Clinical Placement"] + "</li>";
    }
    if (properties["Year-long Residency (Any Program)"]) {
      description += "<li><b>Year-long Residency (Any Program):</b> " + properties["Year-long Residency (Any Program)"] + "</li>";
    }
    if (licensureAreas.length > 0) {
      description += "<li><b>Licensure Areas:</b> <ul>";
      licensureAreas.forEach(function(licensureArea) {
        description += "<li>" + licensureArea + "</li>";
      });
      description += "</ul></li>";
    }

    var universityName = features[0].properties['IHE Name '];
    // Get partners of the clicked university
    var IHEPartners = IHEPartnersDictionary[universityName] || [];

    if (IHEPartners.length > 0) {
      description += "<li><b>School Partners:</b> <ul>";
      IHEPartners.forEach(function(IHEPartner) {
        description += "<li>" + IHEPartner.properties["School Name"] + "</li>";
      });
      description += "</ul></li>";
    }

    description += "</ul>";
    description += "<div>" + (properties["Partnerships Description"] || properties["Specific Partnership Level Information for ALL IHE partners in one text box"]) + "</div>";

    description += "</div>"

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup.setLngLat(coordinates)
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

      var zoomFeatures = IHEPartners.concat(features);

      if (zoomFeatures.length > 1) {
        var bounds = new mapboxgl.LngLatBounds();
        zoomFeatures.forEach(function(feature) {
          bounds.extend(feature.geometry.coordinates);
        });
        map.fitBounds(bounds, { padding: 300, offset: [150, 0] });
        var IHEcenter = features[0].geometry.coordinates;

        setTimeout(function() {
          map.easeTo({
            center: IHEcenter
          });
        }, 1000)
      } else if (zoomFeatures.length === 1) {
          map.flyTo({
            center: zoomFeatures[0].geometry.coordinates,
            essential: true,
            zoom: 8,
          });
      }

      map.setFilter('school-data', filterOptions);
      map.setFilter('ihe-data', ['==', ['get', 'IHE Name '], universityName]);
    }
  }

  var removePopup = function() {
    map.getCanvas().style.cursor = 'move';
    popup.remove();
  };

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

      if (previousFeatures.length > 1) {
        var bounds = new mapboxgl.LngLatBounds();
        previousFeatures.forEach(function(feature) {
          bounds.extend(feature.geometry.coordinates);
        });
        map.fitBounds(bounds, { padding: 50, offset: [100, 0] });
      } else if (previousFeatures.length === 1) {
          map.flyTo({
            center: previousFeatures[0].geometry.coordinates,
            essential: true,
            zoom: 6,
          });
      }
    }
  });
  map.on('click', 'school-data', handleClick.bind(this, 'school'));
  map.on('click', 'ihe-data', handleClick.bind(this, 'university'));

  map.on('mouseenter', 'school-data', handleClick.bind(this, 'school'));
  // map.on("mouseleave", 'school-data', removePopup);
  map.on('mouseenter', 'ihe-data', handleClick.bind(this, 'school'));
  // map.on("mouseleave", 'ihe-data', removePopup);
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