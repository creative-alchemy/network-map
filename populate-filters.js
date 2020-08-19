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
    name: 'high-needs',
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
var licensureAreas = [
  {
    name: 'licensure-areas:agriculture',
    label: 'Agriculture'
  },
  {
    name: 'licensure-areas:biology-7-12',
    label: 'Biology 7-12'
  },
  {
    name: 'licensure-areas:carpentry-7-12',
    label: 'Carpentry 7-12'
  },
  {
    name: 'licensure-areas:chemistry-7-12',
    label: 'Chemistry 7-12'
  },
  {
    name: 'licensure-areas:childhood-education-grades-1-6',
    label: 'Childhood Education (Grades 1-6)'
  },
  {
    name: 'licensure-areas:cosmetology-barbering-7-12',
    label: 'Cosmetology/Barbering 7-12'
  },
  {
    name: 'licensure-areas:deaf-and-hard-of-hearing',
    label: 'Deaf And Hard Of Hearing'
  },
  {
    name: 'licensure-areas:early-childhood-education-birth-grade-2',
    label: 'Early Childhood Education (Birth-Grade 2)'
  },
  {
    name: 'licensure-areas:earth-science-7-12',
    label: 'Earth Science 7-12'
  },
  {
    name: 'licensure-areas:english-language-arts-7-12',
    label: 'English Language Arts 7-12'
  },
  {
    name: 'licensure-areas:english-to-speakers-of-other-languages',
    label: 'English To Speakers Of Other Languages'
  },
  {
    name: 'licensure-areas:family-and-consumer-sciences',
    label: 'Family And Consumer Sciences'
  },
  {
    name: 'licensure-areas:french-7-12',
    label: 'French 7-12'
  },
  {
    name: 'licensure-areas:health-education',
    label: 'Health Education'
  },
  {
    name: 'licensure-areas:music',
    label: 'Music'
  },
  {
    name: 'licensure-areas:physical-education',
    label: 'Physical Education'
  },
  {
    name: 'licensure-areas:physics-7-12',
    label: 'Physics 7-12'
  },
  {
    name: 'licensure-areas:social-studies-7-12',
    label: 'Social Studies 7-12'
  },
  {
    name: 'licensure-areas:spansih-7-12',
    label: 'Spanish 7-12'
  },
  {
    name: 'licensure-areas:speech-and-language-disabilities',
    label: 'Speech And Language Disabilities'
  },
  {
    name: 'licensure-areas:students-with-disabilities-birth-grade-2',
    label: 'Students With Disabilities (Birth - Grade 2)'
  },
  {
    name: 'licensure-areas:sudents-with-disabilites-grades-1-6',
    label: 'Students With Disabilities (Grades 1-6)'
  },
  {
    name: 'licensure-areas:students-with-disabilities-grade-7-12-generalist',
    label: 'Students With Disabilities - Grades 7-12 - Generalist'
  },
  {
    name: 'licensure-areas:technology-education',
    label: 'Technology Education'
  },
  {
    name: 'licensure-areas:visual-art',
    label: 'Visual Art'
  }
];

var populateFilters = function(group, filters) {
  var collapseId = group + "__collapse";
  var collapse = document.getElementById(collapseId);

  filters.forEach(function(filterObject) {
    var label = filterObject.label;
    var name = group + ":" + filterObject.name;
    var filterContainer = document.createElement('div');
    var filterString =
      '<div class="custom-control custom-checkbox">' +
        '<input class="custom-control-input" type="checkbox" id="' + name + '" value="' + label + '" name="' + name + '" onchange="updateFilters(this)" autocomplete="off"> ' +
        '<label class="custom-control-label" for="' + name + '">' + label + '</label>' +
      '</div>';

    filterContainer.innerHTML = filterString;
    collapse.append(filterContainer);
  });

  if (collapseId === 'preparation-programs__collapse') {
    var licensureAreasCollapse =
      '<div>' +
        '<div class="custom-control custom-checkbox">' +
          '<input class="custom-control-input" id="licensure-areas-all" onchange="updateFilters(this)" name="licensure-areas:all" type="checkbox" value="licensure-areas:all" autocomplete="off">' +
          '<label class="custom-control-label" for="licensure-areas-all">' +
            '<a class="collapse-toggle" data-toggle="collapse" aria-expanded="false" aria-controls="licensure-areas__collapse" href="#licensure-areas__collapse">Licensure Areas&nbsp;</a>' +
            '<svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>' +
            '</svg>' +
          '</label>' +
        '</div>' +
        '<div class="row">' +
          '<div class="col">' +
            '<div class="collapse multi-collapse sub-contents" id="licensure-areas__collapse"></div>' +
          '</div>' +
        '</div>' +
      '</div>'
    collapse.insertAdjacentHTML('beforeend', licensureAreasCollapse);
  }
}

populateFilters('preparation-programs', preparationPrograms);
populateFilters('schools', schools);
populateFilters('licensure-areas', licensureAreas);
// populateFilters('state', states);