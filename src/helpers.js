const generateTodoId = (project) => {
  let index = 0;

  if (project.todos.length === 0) return 0;

  for (let i = 0; i < Infinity; i += 1) {
    if (project.todos.every((item) => item.id !== i)) {
      index = i;
      break;
    }
  }

  return index;
}

const getProject = (projectName, projectsCollection) => {
  let tempProj = [];
  projectsCollection.forEach((project) => {
    if (project.name === projectName) {
      tempProj = project;
    }
  });
  return tempProj;
}

const updateProject = (projectToUpdate, projectsCollection) => {
  projectsCollection.forEach((project, index) => {
    if (project.name === projectToUpdate.name) {
      projectsCollection.splice(index, 1, projectToUpdate);
    }
  });
  return projectsCollection;
}

const projectNameExists = (projectName, projectsCollection) => {
  let nameExists = false;
  if (projectsCollection.length === 0) { return false; }

  projectsCollection.forEach((project) => {
    if (project.name.toLowerCase() === projectName.toLowerCase()) {
      nameExists = true;
    }
  });

  return nameExists;
}

export {
  generateTodoId, getProject, projectNameExists, updateProject,
};