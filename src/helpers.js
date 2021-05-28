function generateTodoId(project) {

    let i = 0;
    if (project.showTodos.length == 0) return 0;
      do {
        i += 1;
      } while (project.showTodos.some((item) => item.id == i));
    return i;
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