var filters = {
  "global:ptt-network": true,
  "global:locale:urban": true,
  "global:locale:suburban": true,
  "global:locale:rural": true,
  "global:locale:city": true,
  "global:locale:town": true,
  "preparation-programs:type:public": true,
  "preparation-programs:type:private": true,
  "preparation-programs:size:large": true,
  "preparation-programs:size:medium": true,
  "preparation-programs:size:small": true,
  "preparation-programs:size:fringe": true,
  "preparation-programs:size:distant": true,
  "preparation-programs:full-year-clinical-placements-available": false,
  "preparation-programs:district-level-partnership": false,
  "schools:type:public": true,
  "schools:type:private": true,
  "schools:type:charter": true,
  "schools:size:large": true,
  "schools:size:medium": true,
  "schools:size:small": true,
  "schools:grade-level:elementary": true,
  "schools:grade-level:middle": true,
  "schools:grade-level:high": true,
};
var activeLicensureAreas = {};

var updateFilters = function(element) {
  // Check if all siblings are checked
  var allChecked = true;
  var container = $(element).parent().parent();
  var parentCheckbox = container.parent().parent().parent().find('input').first();

  if ($(element).hasClass('licensure-areas')) {
    container.find('input').each(function() {
      if ($(this).prop('checked') === false) {
        allChecked = false;
      }
    });
  } else {
    container.find('input:not(.licensure-areas):not(.secondary').each(function() {
      if ($(this).prop('checked') === false) {
        allChecked = false;
      }
    });
  }

  if (allChecked) {
    parentCheckbox.prop('checked', true);
  } else {
    parentCheckbox.prop('checked', false);
  }

  // update application state
  if (element.type === 'checkbox') {
    filters[element.name] = element.checked;

    if (element.name.includes('licensure-areas') && element.checked === true) {
      activeLicensureAreas[element.value] = element.checked;
    } else if (element.name.includes('licensure-areas') && element.checked === false) {
      delete activeLicensureAreas[element.value];
    }

    // If a state checkbox has been checked
    if ($(element).hasClass('states')) {
      if (element.checked) {
        // Grab the bounding box of the checked state
        var bboxString = $(element).data('bbox');
        var bboxSplit = bboxString.split(',');
        var bbox = [[bboxSplit[0], bboxSplit[1]], [bboxSplit[2], bboxSplit[3]]];

        // Set state property to its bounding box
        filters[element.name] = bbox;
      }
    }
  }

  // Filters by disqualification
  window.filteredFeatures = allMarkers.filter(function(marker) {
    // Check locales
    var foundALocaleMatch = false;
    if (
      filters["global:locale:urban"] && marker["Locale"] === "Urban" ||
      filters["global:locale:suburban"] && marker["Locale"].includes("Suburb") ||
      filters["global:locale:rural"] && marker["Locale"] === "Rural" ||
      filters["global:locale:city"] && marker["Locale"] === "City" ||
      filters["global:locale:town"] && marker["Locale"] === "Town"
    ) {
      foundALocaleMatch = true;
    }

    if (foundALocaleMatch === false) {
      return false;
    }

    if (marker["IHE Name"]) {
      // Return nothing, if everything is false
      if (
        filters["preparation-programs:type:public"] === false &&
        filters["preparation-programs:type:private"] === false &&
        filters["preparation-programs:size:large"] === false &&
        filters["preparation-programs:size:medium"] === false &&
        filters["preparation-programs:size:small"] === false
      ) {
        return false;
      }

      // For IHEs, check type
      if (
        filters["preparation-programs:type:public"] ||
        filters["preparation-programs:type:private"]
      ) {
        var foundAnIHETypeMatch = false;
        if (
          filters["preparation-programs:type:public"] && marker["Type"] === "Public" ||
          filters["preparation-programs:type:private"] && marker["Type"] === "Private"
        ) {
          foundAnIHETypeMatch = true;
        }

        if (foundAnIHETypeMatch === false) {
          return false;
        }
      }

      // For IHEs, check size
      if (
        filters["preparation-programs:size:large"] ||
        filters["preparation-programs:size:medium"] ||
        filters["preparation-programs:size:small"]
      ) {
        var foundAnIHESizeMatch = false;
        if (
          filters["preparation-programs:size:large"] && marker["Size"] === "Large" ||
          filters["preparation-programs:size:medium"] && marker["Size"] === "Mid" ||
          filters["preparation-programs:size:small"] && marker["Size"] === "Small"
        ) {
          foundAnIHESizeMatch = true;
        }

        if (foundAnIHESizeMatch === false) {
          return false;
        }
      }

      if (filters["preparation-programs:full-year-clinical-placements-available"]) {
        foundAnIHESizeMatch = false;

        if (marker["Year-long Residency (Any Program)"] === 'Yes') {
          foundAnIHESizeMatch = true;
        }

        if (foundAnIHESizeMatch === false) {
            return false;
        }
      }

      if (filters["preparation-programs:district-level-partnership"]) {
        foundAnIHESizeMatch = false;

        if (marker["District Level Partnership"] === 'Yes') {
          foundAnIHESizeMatch = true;
        }

        if (foundAnIHESizeMatch === false) {
          return false;
        }
      }
    }

    if (marker["School Name"]) {
      // Return nothing, if everything is false
      if (
        filters["schools:type:public"] === false &&
        filters["schools:type:private"] === false &&
        filters["schools:type:charter"] === false &&
        filters["schools:size:large"] === false &&
        filters["schools:size:medium"] === false &&
        filters["schools:size:small"] === false &&
        filters["schools:grade-level:elementary"] === false &&
        filters["schools:grade-level:middle"] === false &&
        filters["schools:grade-level:high"] === false
      ) {
        return false;
      }

      // For schools, check type
      if (
        filters["schools:type:public"] ||
        filters["schools:type:private"] ||
        filters["schools:type:charter"]
      ) {
        var foundASchoolTypeMatch = false;
        if (
          filters["schools:type:public"] && marker["Type"] === "Public" ||
          filters["schools:type:private"] && marker["Type"] === "Private" ||
          filters["schools:type:charter"] && marker["Type"] === "Charter"
        ) {
          foundASchoolTypeMatch = true;
        }

        if (foundASchoolTypeMatch === false) {
          return false;
        }
      }

      // For schools, check size
      if (
        filters["schools:size:large"] ||
        filters["schools:size:medium"] ||
        filters["schools:size:small"] ||
        filters["schools:size:fringe"] ||
        filters["schools:size:distant"]
      ) {
        var foundASchoolSizeMatch = false;
        if (
          filters["schools:size:large"] && marker["Type/Size"] === "Large" ||
          filters["schools:size:medium"] && marker["Type/Size"] === "Mid" ||
          filters["schools:size:small"] && marker["Type/Size"] === "Small" ||
          filters["schools:size:fringe"] && marker["Type/Size"] === "Fringe" ||
          filters["schools:size:distant"] && marker["Type/Size"] === "Distant"
        ) {
          foundASchoolSizeMatch = true;
        }

        if (foundASchoolSizeMatch === false) {
          return false;
        }
      }

      // For schools, check grade-level
      if (
        filters["schools:grade-level:elementary"] ||
        filters["schools:grade-level:middle"] ||
        filters["schools:grade-level:high"]
      ) {
        var foundAGradeLevelMatch = false;
        if (
          filters["schools:grade-level:elementary"] && marker["Grade Level"] === "Elementary" ||
          filters["schools:grade-level:middle"] && marker["Grade Level"] === "Middle" ||
          filters["schools:grade-level:high"] && marker["Grade Level"] === "High" ||
          marker["Grade Level"] === "Other"
        ) {
          foundAGradeLevelMatch = true;
        }

        if (foundAGradeLevelMatch === false) {
          return false;
        }
      }


      // Check if school supports high-needs
      if (filters["schools:high-needs"]) {
        if (marker["High-Needs School"] === "Yes") {
          return true;
        }
      }

      // For schools, check for what they host
      if (filters["schools:hosts-pre-clinical-hours"]) {
        if (marker["Hosts Pre-Clinical Placement (Field-Placement)"] === "Yes") {
          return true;
        } else {
          return false;
        }
      }

      if (filters["schools:hosts-culminating-clinical-placements"]) {
        if (marker["Hosts Culminating Clinical Placement"] === "Yes") {
          return true;
        } else {
          return false;
        }
      }

      if (filters["schools:hosts-year-long-clinical-placements"]) {
        if (marker["Hosts Culminating Year-Long Clinical Placement"] === "Yes") {
          return true;
        } else {
          return false;
        }
      }

      if (filters["schools:hosts-enrichment-programs"]) {
        if (marker["Hosts Enrichment Program"] === "Yes") {
          return true;
        } else {
          return false;
        }
      }

      // For schools, check if it is or isn't a professional development school
      if (filters["schools:professional-development-school"]) {
        if (marker["Professional Development School (PDS Model)"] === "Yes") {
          return true;
        } else {
          return false;
        }
      }
    }

    // Check licensure areas
    if (element.name.includes("licensure-areas")) {
      var currentLicensureAreas = Object.keys(activeLicensureAreas);
      if (currentLicensureAreas.length > 0) {
        var foundLicensureAreaMatch = false;
        currentLicensureAreas.forEach(function(licensureArea) {
          if (marker["Licensure Areas"] && marker["Licensure Areas"].includes(licensureArea)) {
            foundLicensureAreaMatch = true;
          }
        });
        return foundLicensureAreaMatch;
      }
    }

    var foundMatchingState = false;
    var filterByStateEnabled = false;
    var stateBounds = new mapboxgl.LngLatBounds();
    var numOfCheckedStates = 0;

    for (var key in filters) {
      // If a state has been checked and it contains its bounding box
      if (key.includes('states:') && filters[key]) {
        numOfCheckedStates = numOfCheckedStates + 1;

        // Grab the bounding box of checked state
        var bbox = filters[key];
        var statesCode = key.split(':')[1];

        filterByStateEnabled = true;

        stateBounds.extend(bbox);

        // Zoom to checked state(s)
        if (numOfCheckedStates > 1) {
          map.fitBounds(stateBounds, { padding: 250, offset: [100, 0]});
        } else {
          map.fitBounds(stateBounds);
        }
      }

      var address = marker['Address/Location'] || marker['Address'];

      if (address.includes(' ' + statesCode + ' ')) {
        foundMatchingState = true;
      }
    }

    if (foundMatchingState === false && filterByStateEnabled) {
      return false;
    }

    // Check ptt-network
    if (filters["global:ptt-network"] === true) {
      if (marker["PTT Network"] === "Yes") {
        return true;
      }
    } else {
      if (marker["PTT Network"] === "Yes") {
        return false;
      }
    }

    return true;
  });

  // Clear out current markers
  var markers = document.querySelectorAll('.marker');
  for (var i = 0; i < markers.length; i++) {
    markers[i].remove();
  }

  preparationProgramsCount = 0;
  schoolCount = 0;

  filteredFeatures.forEach(function(marker) {
    // create a HTML element for each feature
    var el = document.createElement('div');

    if (marker["IHE Name"]) {
      preparationProgramsCount++;
      el.className = 'marker marker__preparation-program';
      el.dataset.toggle = 'modal';
      el.dataset.target = '#modal'

      el.addEventListener("mouseenter", function() {
        popup.setLngLat([marker.Longitude, marker.Latitude])
          .setHTML('<h5><b>' + marker["IHE Name"] + '</b></h5>')
          .addTo(map);
      });

      el.addEventListener("click", function() {
        popup.remove();

        var universityName = marker['IHE Name'];

        var titleEl = document.getElementById('modal-title');
        var bodyEl = document.getElementById('modal-body');
        titleEl.innerHTML = "<b>" + universityName + "</b>";
        bodyEl.innerHTML = generateDetailedPopupHTML(marker);

        // Get partners of the clicked university
        var zoomMarkers = IHEPartnersDictionary[universityName] || [];

        zoomMarkers.push(marker);

        var IHEcenter = [marker.Longitude, marker.Latitude];

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
    } else if (marker["School Name"]) {
      schoolCount++;
      el.className = 'marker marker__school';
      el.addEventListener("mouseenter", function() {
        popup.setLngLat([marker.Longitude, marker.Latitude])
          .setHTML(generateDetailedPopupHTML(marker))
          .addTo(map);
      });
    }

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat([marker.Longitude, marker.Latitude])
      .addTo(map);
  });

  console.log({ preparationProgramsCount, schoolCount })

  preparationCountEl = document.getElementById('preparation-program__count');
  schoolCountEl = document.getElementById('school__count');

  preparationCountEl.innerText = "(" + preparationProgramsCount + ")";
  schoolCountEl.innerText = "(" + schoolCount + ")";

  // Commented out because the specifications have changed: J.A
  if (filteredFeatures.length > 1) {
    var bounds = new mapboxgl.LngLatBounds();
    filteredFeatures.forEach(function(marker) {
      bounds.extend([marker.Longitude, marker.Latitude]);
    });
    map.fitBounds(bounds, { padding: 100, offset: [100, 0] });
  } else if (filteredFeatures.length === 1) {
      map.flyTo({
        center: [filteredFeatures[0].Longitude, filteredFeatures[0].Latitude],
        essential: true,
        zoom: 6,
      });
  }
}

var toggleAll = function(element) {
  var currentCheckboxState = $(element).prop('checked');
  var checkboxChildren;
  if ($(element).hasClass('licensure-areas')) {
    checkboxChildren = $(element).parent().siblings().find('input');
  } else {
    checkboxChildren = $(element).parent().siblings().find('input:not(.licensure-areas):not(.secondary)');
  }

  if (currentCheckboxState === true) {
    checkboxChildren.prop('checked', true).change();
  } else {
    checkboxChildren.prop('checked', false).change();
  }
}