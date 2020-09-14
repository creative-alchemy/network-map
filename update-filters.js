var filters = {
  "global:ptt-network": true,
  "global:locale:urban": true,
  "global:locale:suburban": true,
  "global:locale:rural": true,
  "global:locale:city": true,
  "global:locale:town": true,
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
    container.find('input:not(.licensure-areas)').each(function() {
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
  window.filteredFeatures = features.filter(function(feature) {
    // Check locales
    var foundALocaleMatch = false;
    if (
      filters["global:locale:urban"] && feature.properties["Locale"] === "Urban" ||
      filters["global:locale:suburban"] && feature.properties["Locale"].includes("Suburb") ||
      filters["global:locale:rural"] && feature.properties["Locale"] === "Rural" ||
      filters["global:locale:city"] && feature.properties["Locale"] === "City" ||
      filters["global:locale:town"] && feature.properties["Locale"] === "Town"
    ) {
      foundALocaleMatch = true;
    }

    if (foundALocaleMatch === false) {
      return false;
    }

    if (feature.properties["IHE Name "]) {
      // For IHEs, check type
      if (
        filters["preparation-programs:type:public"] ||
        filters["preparation-programs:type:private"]
      ) {
        var foundAnIHETypeMatch = false;
        if (
          filters["preparation-programs:type:public"] && feature.properties["Type"] === "Public" ||
          filters["preparation-programs:type:private"] && feature.properties["Type"] === "Private"
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
          filters["preparation-programs:size:large"] && feature.properties["Size"] === "Large" ||
          filters["preparation-programs:size:medium"] && feature.properties["Size"] === "Mid" ||
          filters["preparation-programs:size:small"] && feature.properties["Size"] === "Small"
        ) {
          foundAnIHESizeMatch = true;
        }

        if (foundAnIHESizeMatch === false) {
          return false;
        }
      }

      if (filters["preparation-programs:full-year-clinical-placements-available"]) {
        foundAnIHESizeMatch = false;

        if (feature.properties["Year-long Residency (Any Program)"] === 'Yes') {
          foundAnIHESizeMatch = true;
        }

        if (foundAnIHESizeMatch === false) {
            return false;
        }
      }

      if (filters["preparation-programs:district-level-partnership"]) {
        foundAnIHESizeMatch = false;

        if (feature.properties["District Level Partnership"] === 'Yes') {
          foundAnIHESizeMatch = true;
        }

        if (foundAnIHESizeMatch === false) {
          return false;
        }
      }
    }

    if (feature.properties["School Name"]) {
      // For schools, check type
      if (
        filters["schools:type:public"] ||
        filters["schools:type:private"] ||
        filters["schools:type:charter"]
      ) {
        var foundASchoolTypeMatch = false;
        if (
          filters["schools:type:public"] && feature.properties["Type"] === "Public" ||
          filters["schools:type:private"] && feature.properties["Type"] === "Private" ||
          filters["schools:type:charter"] && feature.properties["Type"] === "Charter"
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
        filters["schools:size:small"]
      ) {
        var foundASchoolSizeMatch = false;
        if (
          filters["schools:size:large"] && feature.properties["Type/Size"] === "Large" ||
          filters["schools:size:medium"] && feature.properties["Type/Size"] === "Mid" ||
          filters["schools:size:small"] && feature.properties["Type/Size"] === "Small"
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
          filters["schools:grade-level:elementary"] && feature.properties["Grade Level"] === "Elementary" ||
          filters["schools:grade-level:middle"] && feature.properties["Grade Level"] === "Middle" ||
          filters["schools:grade-level:high"] && feature.properties["Grade Level"] === "High" ||
          feature.properties["Grade Level"] === "Other"
        ) {
          foundAGradeLevelMatch = true;
        }

        if (foundAGradeLevelMatch === false) {
          return false;
        }
      }


      // Check if school supports high-needs
      if (filters["schools:high-needs"]) {
        if (feature.properties["High-Needs School"] === "Yes") {
          return true;
        }
      }

      // For schools, check for what they host
      if (filters["schools:hosts-pre-clinical-hours"]) {
        if (feature.properties["Hosts Pre-Clinical Placement (Field-Placement)"] === "Yes") {
          return true;
        } else {
          return false;
        }
      }

      if (filters["schools:hosts-culminating-clinical-placements"]) {
        if (feature.properties["Hosts Culminating Clinical Placement"] === "Yes") {
          return true;
        } else {
          return false;
        }
      }

      if (filters["schools:hosts-year-long-clinical-placements"]) {
        if (feature.properties["Hosts Culminating Year-Long Clinical Placement"] === "Yes") {
          return true;
        } else {
          return false;
        }
      }

      if (filters["schools:hosts-enrichment-programs"]) {
        if (feature.properties["Hosts Enrichment Program"] === "Yes") {
          return true;
        } else {
          return false;
        }
      }

      // For schools, check if it is or isn't a professional development school
      if (filters["schools:professional-development-school"]) {
        if (feature.properties["Professional Development School (PDS Model)"] === "Yes") {
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
          if (feature.properties["Licensure Areas"] && feature.properties["Licensure Areas"].includes(licensureArea)) {
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

      var address = feature.properties['Address/Location'] || feature.properties['Address'];

      if (address.includes(' ' + statesCode + ' ')) {
        foundMatchingState = true;
      }
    }

    if (foundMatchingState === false && filterByStateEnabled) {
      return false;
    }

    // Check ptt-network
    if (filters["global:ptt-network"] === true) {
      if (feature.properties["PTT Network"] === "Yes") {
        return true;
      }
    } else {
      if (feature.properties["PTT Network"] === "Yes") {
        return false;
      }
    }

    return true;
  });

  // Combine all the filters and set them in Mapbox
  var filterOptions = ['any'];
  filteredFeatures.forEach(function(filterFeature) {
    if (filterFeature.properties["IHE Name "]) {
      filterOptions.push(['==', ['get', 'IHE Name '], filterFeature.properties["IHE Name "]]);
    } else if (filterFeature.properties["School Name"]) {
      filterOptions.push(['==', ['get', 'School Name'], filterFeature.properties["School Name"]]);
    }
  })

  map.setFilter('school-data', filterOptions);
  map.setFilter('ihe-data', filterOptions);

  // Clear out current markers
  var markers = document.querySelectorAll('.marker');
  for (var i = 0; i < markers.length; i++) {
    markers[i].remove();
  }

  filteredFeatures.forEach(function(feature) {
    // create a HTML element for each feature
    var el = document.createElement('div');

    if (feature.properties["IHE Name "]) {
      el.className = 'marker marker__preparation-program';
    } else if (feature.properties["School Name"]) {
      el.className = 'marker marker__school';
    }

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);
  });

  // Commented out because the specifications have changed: J.A
  // if (filteredFeatures.length > 1) {
  //   var bounds = new mapboxgl.LngLatBounds();
  //   filteredFeatures.forEach(function(feature) {
  //     bounds.extend(feature.geometry.coordinates);
  //   });
  //   map.fitBounds(bounds, { padding: 100, offset: [100, 0] });
  // } else if (filteredFeatures.length === 1) {
  //     map.flyTo({
  //       center: filteredFeatures[0].geometry.coordinates,
  //       essential: true,
  //       zoom: 6,
  //     });
  // }
}

var toggleAll = function(element) {
  var currentCheckboxState = $(element).prop('checked');
  var checkboxChildren;
  if ($(element).hasClass('licensure-areas')) {
    checkboxChildren = $(element).parent().siblings().find('input');
  } else {
    checkboxChildren = $(element).parent().siblings().find('input:not(.licensure-areas)');
  }

  if (currentCheckboxState === true) {
    checkboxChildren.prop('checked', true).change();
  } else {
    checkboxChildren.prop('checked', false).change();
  }
}