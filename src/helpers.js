function generateTodoId(project) {

  let index = 0;

  if (project._todos.length == 0) return 0;

  for (index = 0; index < Infinity; index += 1) {
    if (project._todos.every((item) => item._id != index)) {
      break
    }
  }

  return index;
}


function getProject(projectName, projectsCollection) {
let tempProj = []
    projectsCollection.forEach((project) => {
      if (project._name === projectName) {
        tempProj = project;
        
      }
    });
    return tempProj;
}

function updateProject(projectToUpdate, projectsCollection) {
  let tempProj = [];
  projectsCollection.forEach((project, index) => {
    if (project._name === projectToUpdate._name) {
      projectsCollection.splice(index, 1, projectToUpdate);
    }
  });
  return projectsCollection;
}

function projectNameExists(projectName, projectsCollection) {
    let nameExists = false
    if (projectsCollection.length === 0) {return false};

  projectsCollection.forEach((project) => {
    if (project._name === projectName) {
      nameExists = true;
      return
    }
  });
  
  return nameExists;
}

export { generateTodoId, getProject, projectNameExists, updateProject };