var preparationPrograms = ['Public', 'Private', 'Large', 'Medium', 'Small', 'Full-year clinical placements available', 'District-level partnership'];
var schools = ['Public', 'Private', 'Charter', 'Large', 'Medium', 'Small', 'Elementary school', 'Middle school', 'High school', 'High-needs school', 'Hosts pre-clinical hours', 'Hosts culminating clinical placements', 'Hosts year-long clinical placements', 'Hosts enrichment programs', 'Professional development school'];

var populateFilters = function(collapseId, filters) {
  var collapse = document.getElementById(collapseId);

  filters.forEach(function(filter) {
    var filterContainer = document.createElement('div');
    var filterString =
      '<input type="checkbox" id="' + filter.toLowerCase() + '" value="' + filter + '"> ' +
      '<label for="' + filter.toLowerCase() + '">' + filter + '</label>';

    filterContainer.innerHTML = filterString;
    collapse.append(filterContainer);
  });

}

populateFilters('preparation-programs__collapse', preparationPrograms);
populateFilters('schools__collapse', schools);