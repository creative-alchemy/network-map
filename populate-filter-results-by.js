var preparationPrograms = ['Public', 'Private', 'Large', 'Medium', 'Small', 'Full-year clinical placements available', 'District-level partnership'];

var populatePreparationPrograms = function() {
  var preparationProgramsContainer = document.getElementById('preparation-programs__collapse');

  preparationPrograms.forEach(function(preparationProgram) {
    var preparationProgramContainer = document.createElement('div');
    var preparationProgramString = 
     '<input type="checkbox" id="' + preparationProgram.toLowerCase() + '" value="' + preparationProgram + '"> ' +
     '<label for="' + preparationProgram.toLowerCase() + '">' + preparationProgram + '</label>';

     preparationProgramContainer.innerHTML = preparationProgramString;
     preparationProgramsContainer.append(preparationProgramContainer);
  });
}

populatePreparationPrograms();