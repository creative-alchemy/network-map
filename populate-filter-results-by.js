var preparationPrograms = ['Public', 'Private', 'Large', 'Medium', 'Small', 'Full-year clinical placements available', 'District-level partnership'];
var schools = ['Public', 'Private', 'Charter', 'Large', 'Medium', 'Small', 'Elementary school', 'Middle school', 'High school', 'High-needs school', 'Hosts pre-clinical hours', 'Hosts culminating clinical placements', 'Hosts year-long clinical placements', 'Hosts enrichment programs', 'Professional development school'];
var states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

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
populateFilters('state__collapse', states);