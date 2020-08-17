var preparationPrograms = ['Public', 'Private', 'Large', 'Medium', 'Small', 'Full-year clinical placements available', 'District-level partnership'];
var schools = ['Public', 'Private', 'Charter', 'Large', 'Medium', 'Small', 'Elementary school', 'Middle school', 'High school', 'High-needs school', 'Hosts pre-clinical hours', 'Hosts culminating clinical placements', 'Hosts year-long clinical placements', 'Hosts enrichment programs', 'Professional development school'];
var states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
var licensureAreas = ['Agriculture', 'Biology 7-12', 'Business And Marketing', 'Carpentry 7-12', 'Chemistry 7-12', 'Childhood Education (Grades 1-6)', 'Cosmetology/Barbering 7-12', 'Deaf And Hard Of Hearing', 'Early Childhood Education (Birth-Grade 2)', 'Earth Science 7-12', 'English Language Arts 7-12', 'English To Speakers Of Other Languages', 'Family And Consumer Sciences', 'French 7-12', 'Health Education', 'Mathematics 7-12', 'Music', 'Physical Education', 'Physics 7-12', 'Social Studies 7-12', 'Spanish 7-12', 'Speech And Language Disabilities', 'Students With Disabilities (Birth - Grade 2)', 'Students With Disabilities (Grades 1-6)', 'Students With Disabilities - Grades 7-12 - Generalist', 'Technology Education', 'Visual Art'];

var populateFilters = function(collapseId, filters) {
  var collapse = document.getElementById(collapseId);

  filters.forEach(function(filter) {
    var filterContainer = document.createElement('div');
    var filterString =
      '<input type="checkbox" id="' + filter.toLowerCase() + '" value="' + filter + '" onchange="updateFilters(this)"> ' +
      '<label for="' + filter.toLowerCase() + '">' + filter + '</label>';

    filterContainer.innerHTML = filterString;
    collapse.append(filterContainer);
  });

  if (collapseId === 'preparation-programs__collapse') {
    var licensureAreasCollapse =
      '<a data-toggle="collapse" aria-expanded="false" aria-controls="licensure-areas__collapse" href="#licensure-areas__collapse">+ Licensure Areas</a>' +
      '<div class="row">' +
        '<div class="col">' +
          '<div class="collapse multi-collapse" id="licensure-areas__collapse"></div>' +
        '</div>' +
      '</div>';
    collapse.insertAdjacentHTML('beforeend', licensureAreasCollapse);
  }
}

populateFilters('preparation-programs__collapse', preparationPrograms);
populateFilters('schools__collapse', schools);
populateFilters('state__collapse', states);
populateFilters('licensure-areas__collapse', licensureAreas);