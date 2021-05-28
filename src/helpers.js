function generateTodoId(project) {

  let index = 0;

  if (project.showTodos.length == 0) return 0;

  for (index = 0; index < Infinity; index += 1) {
    if (project.showTodos.every((item) => item.id != index)) {
      break
    }
  }

  return index;
}


function getProject(projectName, projectsCollection) {

  const projectsColl = projectsCollection.filter(
    (item) => item["_name"] === projectName
  );
  return projectsColl[0];
}

function projectNameExists(projectName, projectsCollection) {
    let nameExists = false
    if (projectsCollection.length === 0) {return false};

  projectsCollection.forEach((project) => {
    if (project.name === projectName) {
      nameExists = true;
      return
    }
  });
  
  return nameExists;
}

export { generateTodoId, getProject, projectNameExists };