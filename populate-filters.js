var preparationPrograms = [
  {
    name: 'type:public',
    label: 'Public',
    defaultValue: true
  },
  {
    name: 'type:private',
    label: 'Private',
    defaultValue: true
  },
  {
    name: 'size:large',
    label: 'Large',
    defaultValue: true
  },
  {
    name: 'size:medium',
    label: 'Medium',
    defaultValue: true
  },
  {
    name: 'size:small',
    label: 'Small',
    defaultValue: true
  },
  {
    name: 'full-year-clinical-placements-available',
    label: 'Full-year clinical placements available',
    secondary: true,
    defaultValue: false
  },
  {
    name: 'district-level-partnership',
    label: 'District-level partnership',
    secondary: true,
    defaultValue: false
  }
];

var schools = [
  {
    name: 'type:public',
    label: 'Public',
    defaultValue: true
  },
  {
    name: 'type:private',
    label: 'Private',
    defaultValue: true
  },
  {
    name: 'type:charter',
    label: 'Charter',
    defaultValue: true
  },
  {
    name: 'size:large',
    label: 'Large',
    defaultValue: true
  },
  {
    name: 'size:medium',
    label: 'Medium',
    defaultValue: true
  },
  {
    name: 'size:small',
    label: 'Small',
    defaultValue: true
  },
  {
    name: 'size:fringe',
    label: 'Fringe',
    defaultValue: true
  },
  {
    name: 'size:distant',
    label: 'Distant',
    defaultValue: true
  },
  {
    name: 'grade-level:elementary',
    label: 'Elementary school',
    defaultValue: true
  },
  {
    name: 'grade-level:middle',
    label: 'Middle school',
    defaultValue: true
  },
  {
    name: 'grade-level:high',
    label: 'High school',
    defaultValue: true
  },
  {
    name: 'high-needs',
    label: 'High-needs school',
    secondary: true,
    defaultValue: false
  },
  {
    name: 'hosts-pre-clinical-hours',
    label: 'Hosts pre-clinical hours',
    secondary: true,
    defaultValue: false
  },
    {
    name: 'hosts-culminating-clinical-placements',
    label: 'Hosts culminating clinical placements',
    secondary: true,
    defaultValue: false
  },
  {
    name: 'hosts-year-long-clinical-placements',
    label: 'Hosts year-long clinical placements',
    secondary: true,
    defaultValue: false
  },
  {
    name: 'hosts-enrichment-programs',
    label: 'Hosts enrichment programs',
    secondary: true,
    defaultValue: false
  },
  {
    name: 'professional-development-school',
    label: 'Professional development school',
    secondary: true,
    defaultValue: false
  },
];

var states = [
  {
    name: 'AL',
    label: 'Alabama',
    bbox: '-88.473227,30.223334,-84.88908,35.008028',
    defaultValue: false
  },
  {
    name: 'AK',
    label: 'Alaska',
    bbox: '-179.148909,51.214183,-179.77847,71.365162',
    defaultValue: false
  },
  {
    name: 'AZ',
    label: 'Arizona',
    bbox: '-114.81651,31.332177,-109.045223,37.00426',
    defaultValue: false
  },
  {
    name: 'AR',
    label: 'Arkansas',
    bbox: '-94.617919,33.004106,-89.644395,36.4996',
    defaultValue: false
  },
  {
    name: 'CA',
    label: 'California',
    bbox: '-124.409591,32.534156,-114.131211,42.009518',
    defaultValue: false
  },
  {
    name: 'CO',
    label: 'Colorado',
    bbox: '-109.060253,36.992426,-102.041524,41.003444',
    defaultValue: false
  },
  {
    name: 'CT',
    label: 'Connecticut',
    bbox: '-73.727775,40.980144,-71.786994,42.050587',
    defaultValue: false
  },
  {
    name: 'DE',
    label: 'Delaware',
    bbox: '-75.788658,38.451013,-75.048939,39.839007',
    defaultValue: false
  },
  {
    name: 'DC',
    label: 'District of Columbia',
    bbox: '-77.119759,38.791645,-76.909395,38.99511',
    defaultValue: false
  },
  {
    name: 'FL',
    label: 'Florida',
    bbox: '-87.634938,24.523096,-80.031362,31.000888',
    defaultValue: false
  },
  {
    name: 'GA',
    label: 'Georgia',
    bbox: '-85.605165,30.357851,-80.839729,35.000659',
    defaultValue: false
  },
  {
    name: 'HI',
    label: 'Hawaii',
    bbox: '-178.334698,18.910361,-154.806773,28.402123',
    defaultValue: false
  },
  {
    name: 'ID',
    label: 'Idaho',
    bbox: '-117.243027,41.988057,-111.043564,49.001146',
    defaultValue: false
  },
  {
    name: 'IL',
    label: 'Illinois',
    bbox: '-91.513079,36.970298,-87.494756,42.508481',
    defaultValue: false
  },
  {
    name: 'IN',
    label: 'Indiana',
    bbox: '-88.09776,37.771742,-84.784579,41.760592',
    defaultValue: false
  },
  {
    name: 'IA',
    label: 'Iowa',
    bbox: '-96.639704,40.375501,-90.140061,43.501196',
    defaultValue: false
  },
  {
    name: 'KS',
    label: 'Kansas',
    bbox: '-102.051744,36.993016,-94.588413,40.003162',
    defaultValue: false
  },
  {
    name: 'KY',
    label: 'Kentucky',
    bbox: '-89.571509,36.497129,-81.964971,39.147458',
    defaultValue: false
  },
  {
    name: 'LA',
    label: 'Louisiana',
    bbox: '-94.043147,28.928609,-88.817017,33.019457',
    defaultValue: false
  },
  {
     name: 'ME',
     label: 'Maine',
     bbox: '-71.083924,42.977764,-66.949895,47.459686',
    defaultValue: false
    },
  {
    name: 'MD',
    label: 'Maryland',
    bbox: '-79.487651,37.911717,-75.048939,39.723043',
    defaultValue: false
  },
  {
    name: 'MA',
    label: 'Massachusetts',
    bbox: '-73.508142,41.237964,-69.928393,42.886589',
    defaultValue: false
  },
  {
    name: 'MI',
    label:'Michigan',
    bbox: '-90.418136,41.696118,-82.413474,48.2388',
    defaultValue: false
  },
  {
    name: 'MN',
    label: 'Minnesota',
    bbox: '-97.239209,43.499356,-89.491739,49.384358',
    defaultValue: false
  },
  {
    name: 'MS',
    label: 'Mississippi',
    bbox: '-91.655009,30.173943,-88.097888,34.996052',
    defaultValue: false
  },
  {
    name: 'MO',
    label: 'Missouri',
    bbox: '-95.774704,35.995683,-89.098843,40.61364',
    defaultValue: false
  },
  {
    name: 'MT',
    label: 'Montana',
    bbox: '-116.050003,44.358221,-104.039138,49.00139',
    defaultValue: false
  },
  {
    name: 'NE',
    label: 'Nebraska',
    bbox: '-104.053514,39.999998,-95.30829,43.001708',
    defaultValue: false
  },
  {
    name: 'NV',
    label: 'Nevada',
    bbox: '-120.005746,35.001857,-114.039648,42.002207',
    defaultValue: false
  },
  {
    name: 'NH',
    label: 'New Hampshire',
    bbox: '-72.557247,42.69699,-70.610621,45.305476',
    defaultValue: false
  },
  {
    name: 'NJ',
    label: 'New Jersey',
    bbox: '-75.559614,38.928519,-73.893979,41.357423',
    defaultValue: false
  },
  {
    name: 'NM',
    label: 'New Mexico',
    bbox: '-109.050173,31.332301,-103.001964,37.000232',
    defaultValue: false
  },
  {
    name: 'NY',
    label: 'New York',
    bbox: '-79.762152,40.496103,-71.856214,45.01585',
    defaultValue: false
  },
  {
    name: 'NC',
    label: 'North Carolina',
    bbox: '-84.321869,33.842316,-75.460621,36.588117',
    defaultValue: false
  },
  {
    name: 'ND',
    label: 'North Dakota',
    bbox: '-104.0489,45.935054,-96.554507,49.000574',
    defaultValue: false
  },
  {
    name: 'OH',
    label: 'Ohio',
    bbox: '-84.820159,38.403202,-80.518693,41.977523',
    defaultValue: false
  },
  {
    name: 'OK',
    label: 'Oklahoma',
    bbox: '-103.002565,33.615833,-94.430662,37.002206',
    defaultValue: false
  },
  {
    name: 'OR',
    label: 'Oregon',
    bbox: '-124.566244,41.991794,-116.463504,46.292035',
    defaultValue: false
  },
  {
    name: 'PA',
    label: 'Pennsylvania',
    bbox: '-80.519891,39.7198,-74.689516,42.26986',
    defaultValue: false
  },
  {
    name: 'RI',
    label: 'Rhode Island',
    bbox: '-71.862772,41.146339,-71.12057,42.018798',
    defaultValue: false
  },
  {
    name: 'SC',
    label: 'South Carolina',
    bbox: '-83.35391,32.0346,-78.54203,35.215402',
    defaultValue: false
  },
  {
    name: 'SD',
    label: 'South Dakota',
    bbox: '-104.057698,42.479635,-96.436589,45.94545',
    defaultValue: false
  },
  {
    name: 'TN',
    label: 'Tennessee',
    bbox: '-90.310298,34.982972,-81.6469,36.678118',
    defaultValue: false
  },
  {
    name: 'TX',
    label: 'Texas',
    bbox: '-106.645646,25.837377,-93.508292,36.500704',
    defaultValue: false
  },
  {
    name: 'UT',
    label: 'Utah',
    bbox: '-114.052962,36.997968,-109.041058,42.001567',
    defaultValue: false
  },
  {
    name: 'VT',
    label: 'Vermont',
    bbox: '-73.43774,42.726853,-71.464555,45.016659',
    defaultValue: false
  },
  {
    name: 'VA',
    label: 'Virginia',
    bbox: '-83.675395,36.540738,-75.242266,39.466012',
    defaultValue: false
  },
  {
    name: 'WA',
    label: 'Washington',
    bbox: '-124.763068,45.543541,-116.915989,49.002494',
    defaultValue: false
  },
  {
    name: 'WV',
    label: 'West Virginia',
    bbox: '-82.644739,37.201483,-77.719519,40.638801',
    defaultValue: false
  },
  {
    name: 'WI',
    label: 'Wisconsin',
    bbox: '-92.888114,42.491983,-86.805415,47.080621',
    defaultValue: false
  },
  {
    name: 'WY',
    label: 'Wyoming',
    bbox: '-111.056888,40.994746,-104.05216,45.005904',
    defaultValue: false
  }];

var licensureAreas = [
  {
    name: 'licensure-areas:agriculture',
    label: 'Agriculture',
    defaultValue: false
  },
  {
    name: 'licensure-areas:biology-7-12',
    label: 'Biology 7-12',
    defaultValue: false
  },
  {
    name: 'licensure-areas:carpentry-7-12',
    label: 'Carpentry 7-12',
    defaultValue: false
  },
  {
    name: 'licensure-areas:chemistry-7-12',
    label: 'Chemistry 7-12',
    defaultValue: false
  },
  {
    name: 'licensure-areas:childhood-education-grades-1-6',
    label: 'Childhood Education (Grades 1-6)',
    defaultValue: false
  },
  {
    name: 'licensure-areas:cosmetology-barbering-7-12',
    label: 'Cosmetology/Barbering 7-12',
    defaultValue: false
  },
  {
    name: 'licensure-areas:deaf-and-hard-of-hearing',
    label: 'Deaf And Hard Of Hearing',
    defaultValue: false
  },
  {
    name: 'licensure-areas:early-childhood-education-birth-grade-2',
    label: 'Early Childhood Education (Birth-Grade 2)',
    defaultValue: false
  },
  {
    name: 'licensure-areas:earth-science-7-12',
    label: 'Earth Science 7-12',
    defaultValue: false
  },
  {
    name: 'licensure-areas:english-language-arts-7-12',
    label: 'English Language Arts 7-12',
    defaultValue: false
  },
  {
    name: 'licensure-areas:english-to-speakers-of-other-languages',
    label: 'English To Speakers Of Other Languages',
    defaultValue: false
  },
  {
    name: 'licensure-areas:family-and-consumer-sciences',
    label: 'Family And Consumer Sciences',
    defaultValue: false
  },
  {
    name: 'licensure-areas:french-7-12',
    label: 'French 7-12',
    defaultValue: false
  },
  {
    name: 'licensure-areas:health-education',
    label: 'Health Education',
    defaultValue: false
  },
  {
    name: 'licensure-areas:music',
    label: 'Music',
    defaultValue: false
  },
  {
    name: 'licensure-areas:physical-education',
    label: 'Physical Education',
    defaultValue: false
  },
  {
    name: 'licensure-areas:physics-7-12',
    label: 'Physics 7-12',
    defaultValue: false
  },
  {
    name: 'licensure-areas:social-studies-7-12',
    label: 'Social Studies 7-12',
    defaultValue: false
  },
  {
    name: 'licensure-areas:spansih-7-12',
    label: 'Spanish 7-12',
    defaultValue: false
  },
  {
    name: 'licensure-areas:speech-and-language-disabilities',
    label: 'Speech And Language Disabilities',
    defaultValue: false
  },
  {
    name: 'licensure-areas:students-with-disabilities-birth-grade-2',
    label: 'Students With Disabilities (Birth - Grade 2)',
    defaultValue: false
  },
  {
    name: 'licensure-areas:sudents-with-disabilites-grades-1-6',
    label: 'Students With Disabilities (Grades 1-6)',
    defaultValue: false
  },
  {
    name: 'licensure-areas:students-with-disabilities-grade-7-12-generalist',
    label: 'Students With Disabilities - Grades 7-12 - Generalist',
    defaultValue: false
  },
  {
    name: 'licensure-areas:technology-education',
    label: 'Technology Education',
    defaultValue: false
  },
  {
    name: 'licensure-areas:visual-art',
    label: 'Visual Art',
    defaultValue: false
  }
];

var populateFilters = function(group, filters) {
  var collapseId = group + "__collapse";
  var collapse = document.getElementById(collapseId);

  filters.forEach(function(filterObject) {
    var label = filterObject.label;
    var name = group + ":" + filterObject.name;
    var secondaryClass = filterObject.secondary ? "secondary" : "";

    var filterContainer = document.createElement('div');
    filterContainer.classList.add("custom-control");
    filterContainer.classList.add("custom-checkbox");
    var filterString =
        '<input class="custom-control-input ' + group + ' ' + secondaryClass + '" type="checkbox" id="' + name + '" value="' + label + '" name="' + name + '" data-bbox=' + filterObject.bbox + ' onchange="updateFilters(this)" autocomplete="off" ' + (filterObject.defaultValue ? 'checked ' : '') + '> ' +
        '<label class="custom-control-label" for="' + name + '">' + label + '</label>';
    filterContainer.innerHTML = filterString;
    collapse.append(filterContainer);
  });

  if (collapseId === 'preparation-programs__collapse') {
    var licensureAreasCollapse =
      '<div>' +
        '<div class="custom-control custom-checkbox">' +
          '<input class="custom-control-input licensure-areas" id="licensure-areas-all" onchange="toggleAll(this)" name="licensure-areas:all" type="checkbox" value="licensure-areas:all" autocomplete="off">' +
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
populateFilters('states', states);