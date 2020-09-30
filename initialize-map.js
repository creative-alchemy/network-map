function forwardGeocoder(query) {
  var matchingFeatures = [];

  allMarkers.forEach(function(marker) {
    var schoolOrUniversityName = "";
    if (marker['School Name'] !== undefined) {
      schoolOrUniversityName = marker['School Name'];
    } else if (marker['IHE Name'] !== undefined) {
      schoolOrUniversityName = marker['IHE Name'];
    }

    if (schoolOrUniversityName.toLowerCase().includes(query.toLowerCase())) {
      marker['place_name'] = schoolOrUniversityName;
      marker['center'] = [marker.Longitude, marker.Latitude];
      matchingFeatures.push({
        type: "Feature",
        properties: marker,
        place_name: schoolOrUniversityName,
        center: [marker.Longitude, marker.Latitude],
        geometry: {
          coordinates: [
            marker.Longitude,
            marker.Latitude
          ],
          type: "Point"
        }
      });
    }
  });

  console.log({matchingFeatures})

  return matchingFeatures;
}

function generateDetailedPopupHTML(marker) {
  var description = "<div class='container'><div class='row'>"
  var properties = marker;
  var licensureAreas = [];
  for (var key in marker) {
    if (key.includes('Licensure Area ') && marker[key]) {
      licensureAreas.push(marker[key]);
    }
  }

  if (marker["School Name"]) {
    description += "<h5><b>" + marker["School Name"] + "</b></h5>";
  }

  description += "<div class='col-sm'>";
  if (properties["PTT Network"] == "Yes") {
    description += "<b>Prepared To Teach Learning Network</b><br />";
  }
  description += "<b>Locale:</b> " + properties["Locale"] + "<br />";
  description += "<b>Size:</b> " + (properties["Size"] || properties["Type/Size"]) + "<br />";
  if (properties["Grade Level"]) {
    description += "<b>Grade Level:</b> " + properties["Grade Level"] + "<br />";
  }
  if (properties["Type"]) {
    description += "<b>Type:</b> " + properties["Type"] + "<br />";
  }
  if (properties["High-Needs School"]) {
    description += "<b>High-Needs School:</b> " + properties["High-Needs School"] + "<br />";
  }
  if (properties["Hosts Pre-Clinical Placement (Field-Placement)"]) {
    description += "<b>Hosts Pre-Clinical Placement (Field-Placement):</b> " + properties["Hosts Pre-Clinical Placement (Field-Placement)"] + "<br />";
  }
  if (properties["Hosts Culminating Clinical Placement"]) {
    description += "<b>Hosts Culminating Clinical Placement:</b> " + properties["Hosts Culminating Clinical Placement"] + "<br />";
  }
  if (properties["Hosts Culminating Year-Long Clinical Placement"]) {
    description += "<b>Hosts Culminating Year-Long Clinical Placement:</b> " + properties["Hosts Culminating Year-Long Clinical Placement"] + "<br />";
  }
  if (properties["Hosts Enrichment Program"]) {
    description += "<b>Hosts Enrichment Program:</b> " + properties["Hosts Enrichment Program"] + "<br />";
  }
  if (properties["Professional Development School (PDS Model)"]) {
    description += "<b>Professional Development School (PDS Model):</b> " + properties["Professional Development School (PDS Model)"] + "<br />";
  }
  if (properties["Year-long Residency (Any Program)"]) {
    description += "<b>Year-long Residency (Any Program):</b> " + properties["Year-long Residency (Any Program)"] + "<br />";
  }

  var universityName = properties['IHE Name'];
  // Get partners of the clicked university
  var IHEPartners = IHEPartnersDictionary[universityName] || [];

  if (IHEPartners.length > 0) {
    description += "<b>School Partners:</b><br /> <ul>";
    IHEPartners.forEach(function(IHEPartner) {
      if (IHEPartner["School Name"]) {
        description += "<li>" + IHEPartner["School Name"] + "</li>";
      }
    });
    description += "</ul></li>";
  }

  description += "<div style='margin-top: 30px'>" + (properties["Partnerships Description"] || properties["Specific Partnership Level Information for ALL IHE partners in one text box"]) + "</div>";
  description += "</div>";

  if (licensureAreas.length > 0) {
    description += "<div class='col-sm'>";
    description += "<b>Licensure Areas:</b> <ul>";
    licensureAreas.forEach(function(licensureArea) {
      description += "<li>" + licensureArea + "</li>";
    });
    description += "</ul>";
    description += "</div>";
  }

  description += "</div></div>";

  return description;
}

function zoomToMarkers(markers) {
  if (markers.length > 1) {
    var bounds = new mapboxgl.LngLatBounds();

    window.allMarkers.forEach(function(marker) {
      if (marker.Longitude && marker.Latitude) {
        bounds.extend([marker.Longitude, marker.Latitude]);
      }
    });

    map.fitBounds(bounds, { padding: 100, offset: [75, 0] });
  }
}

function initializeMap(schoolJson, universityJson) {
  console.log({ schoolJson, universityJson });
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

  window.popup = new mapboxgl.Popup({
    closeOnClick: false,
    closeButton: true,
  });

  // Populate with all the schools
  schoolJson.forEach(function(school) {
    // Exit early if there is no school name;
    if (school["School Name"] === undefined || school["School Name"] === null || school["School Name"] === "") {
      return;
    }

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker marker__school';

    el.addEventListener("mouseenter", function() {
      popup.setLngLat([school.Longitude, school.Latitude])
        .setHTML(generateDetailedPopupHTML(school))
        .addTo(map);
    });

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat([school.Longitude, school.Latitude])
      .addTo(map);
  });

  var createIHEPartnersDictionary = function() {
    var IHEPartnersDictionary = {};

    schoolJson.forEach(function(schoolMarker) {
      var IHEPartner1 = schoolMarker['IHE Partner 1'];
      var IHEPartner2 = schoolMarker['IHE Partner 2'];
      var IHEPartner3 = schoolMarker['IHE Partner 3'];
      var IHEPartner4 = schoolMarker['IHE Partner 4'];

      var IHEPartners = [IHEPartner1, IHEPartner2, IHEPartner3, IHEPartner4];

      IHEPartners.forEach(function(IHEPartner) {
        if (IHEPartner && schoolMarker['School Name']) {
          var schoolName = schoolMarker['School Name'];

          if (IHEPartnersDictionary[IHEPartner]) {
            IHEPartnersDictionary[IHEPartner].push(schoolMarker);
          } else {
            IHEPartnersDictionary[IHEPartner] = [schoolMarker]
          }
        }
      });
    });

    return IHEPartnersDictionary;
  }

  window.IHEPartnersDictionary = createIHEPartnersDictionary();

  // Populate with all the universitys
  universityJson.forEach(function(university) {
    // Exit early if there is no university name;
    if (university["IHE Name"] === undefined || university["IHE Name"] === null || university["IHE Name"] === "") {
      return;
    }

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.dataset.toggle = 'modal';
    el.dataset.target = '#modal'
    el.className = 'marker marker__preparation-program';

    el.addEventListener("mouseenter", function() {
      popup.setLngLat([university.Longitude, university.Latitude])
        .setHTML('<h5><b>' + university["IHE Name"] + '</b></h5>')
        .addTo(map);
    });

    el.addEventListener("click", function() {
      popup.remove();

      // Clear out current markers
      var markers = document.querySelectorAll('.marker');
      for (var i = 0; i < markers.length; i++) {
        markers[i].style.display = 'none';
      }

      el.style.display = 'block';

      var universityName = university['IHE Name'];

      var titleEl = document.getElementById('modal-title');
      var bodyEl = document.getElementById('modal-body');
      titleEl.innerHTML = "<b>" + universityName + "</b>";
      bodyEl.innerHTML = generateDetailedPopupHTML(university);

      // Get partners of the clicked university
      var zoomMarkers = IHEPartnersDictionary[universityName] || [];

      zoomMarkers.forEach(function(school) {
        // Exit early if there is no school name;
        if (school["School Name"] === undefined || school["School Name"] === null || school["School Name"] === "") {
          return;
        }

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker marker__school marker__zoomed';

        el.addEventListener("mouseenter", function() {
          popup.setLngLat([school.Longitude, school.Latitude])
            .setHTML(generateDetailedPopupHTML(school))
            .addTo(map);
        });

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat([school.Longitude, school.Latitude])
          .addTo(map);
      });

      zoomMarkers.push(university);

      var IHEcenter = [university.Longitude, university.Latitude];

      if (zoomMarkers.length > 1) {
        var bounds = new mapboxgl.LngLatBounds();
        zoomMarkers.forEach(function(marker) {
          bounds.extend([marker.Longitude, marker.Latitude]);
        });
        map.fitBounds(bounds, { padding: 100, offset: [75, 0] });
      } else if (zoomMarkers.length === 1) {
          map.flyTo({
            center: IHEcenter,
            essential: true,
            zoom: 8,
          });
      }
    });

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat([university.Longitude, university.Latitude])
      .addTo(map);
  });

  map.on("click", function(e) {
    if (!e.originalEvent.target.classList.contains("marker")) {
      popup.remove();
      zoomToMarkers(window.filteredFeatures);

      var zoomedMarkers = document.querySelectorAll('.marker__zoomed');
      for (var i = 0; i < zoomedMarkers.length; i++) {
        zoomedMarkers[i].remove();
      }

      // Reverts all markers to visible
      var markers = document.querySelectorAll('.marker');
      for (var i = 0; i < markers.length; i++) {
        markers[i].style.display = 'block';
      }
    }
  });

  window.allMarkers = schoolJson.concat(universityJson);
  window.filteredFeatures = window.allMarkers.slice();

  zoomToMarkers(window.allMarkers);

  preparationCountEl = document.getElementById('preparation-program__count');
  schoolCountEl = document.getElementById('school__count');

  preparationCountEl.innerText = "(" + universityJson.length + ")";
  schoolCountEl.innerText = "(" + schoolJson.length + ")";
}

$('#filters').on('click', function() {
  $('#filter-results-by').css('display', 'block');
});

$('#filter-results-by__close').on('click', function() {
  $('#filter-results-by').css('display', 'none');
});