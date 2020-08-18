var preparationPrograms = [
  {
    name: 'type:public',
    label: 'Public'
  },
  {
    name: 'type:private',
    label: 'Private'
  },
  {
    name: 'size:large',
    label: 'Large'
  },
  {
    name: 'size:medium',
    label: 'Medium'
  },
  {
    name: 'size:small',
    label: 'Small'
  },
  {
    name: 'clinical-placement:year-long',
    label: 'Full-year clinical placements available'
  },
  {
    name: 'partnership:district-level',
    label: 'District-level partnership'
  }
];

var schools = [
  {
    name: 'type:public',
    label: 'Public'
  },
  {
    name: 'type:private',
    label: 'Private'
  },
  {
    name: 'type:charter',
    label: 'Charter'
  },
  {
    name: 'size:large',
    label: 'Large'
  },
  {
    name: 'size:medium',
    label: 'Medium'
  },
  {
    name: 'size:small',
    label: 'Small'
  },
  {
    name: 'grade-level:elementary',
    label: 'Elementary school'
  },
  {
    name: 'grade-level:middle',
    label: 'Middle school'
  },
  {
    name: 'grade-level:high',
    label: 'High school'
  },
  {
    name: 'grade-level:high-needs',
    label: 'High-needs school'
  },
  {
    name: 'hosts-pre-clinical-hours',
    label: 'Hosts pre-clinical hours'
  },
    {
    name: 'hosts-culminating-clinical-placements',
    label: 'Hosts culminating clinical placements'
  },
  {
    name: 'hosts-year-long-clinical-placements',
    label: 'Hosts year-long clinical placements'
  },
  {
    name: 'hosts-enrichment-programs',
    label: 'Hosts enrichment programs'
  },
  {
    name: 'professional-development-school',
    label: 'Professional development school'
  },
];
var states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
var licensureAreas = ['Agriculture', 'Biology 7-12', 'Business And Marketing', 'Carpentry 7-12', 'Chemistry 7-12', 'Childhood Education (Grades 1-6)', 'Cosmetology/Barbering 7-12', 'Deaf And Hard Of Hearing', 'Early Childhood Education (Birth-Grade 2)', 'Earth Science 7-12', 'English Language Arts 7-12', 'English To Speakers Of Other Languages', 'Family And Consumer Sciences', 'French 7-12', 'Health Education', 'Mathematics 7-12', 'Music', 'Physical Education', 'Physics 7-12', 'Social Studies 7-12', 'Spanish 7-12', 'Speech And Language Disabilities', 'Students With Disabilities (Birth - Grade 2)', 'Students With Disabilities (Grades 1-6)', 'Students With Disabilities - Grades 7-12 - Generalist', 'Technology Education', 'Visual Art'];

var populateFilters = function(group, filters) {
  var collapseId = group + "__collapse";
  var collapse = document.getElementById(collapseId);

  filters.forEach(function(filterObject) {
    var label = filterObject.label;
    var filterContainer = document.createElement('div');
    var filterString =
      '<input type="checkbox" id="' + label.toLowerCase() + '" value="' + label + '" name="' + group + label + '" onchange="updateFilters(this)" checked autocomplete="off"> ' +
      '<label for="' + label.toLowerCase() + '">' + label + '</label>';

    filterContainer.innerHTML = filterString;
    collapse.append(filterContainer);
  });

  // if (collapseId === 'preparation-programs__collapse') {
  //   var licensureAreasCollapse =
  //     '<div>' +
  //       '<input id="licensure-areas-all" onchange="updateFilters(this)" name="licensure-areas:all" type="checkbox" value="licensure-areas:all" checked autocomplete="off">&nbsp;' +
  //       '<label for="licensure-areas-all">' +
  //         '<a class="collapse-toggle" data-toggle="collapse" aria-expanded="false" aria-controls="licensure-areas__collapse" href="#licensure-areas__collapse">Licensure Areas</a>' +
  //         '<svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
  //           '<path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>' +
  //         '</svg>' +
  //       '</label>' +
  //     '</div>' +
  //     '<div class="row">' +
  //       '<div class="col">' +
  //         '<div class="collapse multi-collapse sub-contents" id="licensure-areas__collapse"></div>' +
  //       '</div>' +
  //     '</div>';
  //   collapse.insertAdjacentHTML('beforeend', licensureAreasCollapse);
  // }
}

populateFilters('preparation-programs', preparationPrograms);
populateFilters('schools', schools);
// populateFilters('state', states);
// populateFilters('licensure-areas', licensureAreas);