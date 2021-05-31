import Project from './project';
import Todo from './todo';
import clearContainer from './clearContainer';

const saveDataInStorage = (key, data) => {
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(data));
}

const getDataFromStorage = (key, projectsCollection) => {
  projectsCollection = [];

  JSON.parse(localStorage.getItem(key) || '[]').map((project) => {
    Object.assign(new Project(), project);
    project.todos.map((todo) => {
      Object.assign(new Todo(), todo);
      return 0;
    });
    projectsCollection.push(project);
    return 0;
  });
  return projectsCollection;
}

const updateExistingTodo = (tempTodo, project, projectsCollection) => {
  project.todos.forEach((todo, index) => {
    if (parseInt(todo.id, 10) === parseInt(tempTodo.id, 10)) {
      project.todos.splice(index, 1, tempTodo);
    }
  });
  saveDataInStorage('taskifyData', projectsCollection);
}

const pushNewTodo = (tempTodo, project, projectsCollection) => {
  project.todos.push(tempTodo);

  saveDataInStorage('taskifyData', projectsCollection);
  return projectsCollection;
}

const deleteProject = (e, projectsCollection) => {
  const projName = e.target.parentNode.childNodes[1].innerText;
  const projParent = e.target.parentNode.parentNode;
  projParent.removeChild(e.target.parentNode);
  projectsCollection.forEach((project, index) => {
    if (project.name === projName) {
      projectsCollection.splice(index, 1);
    }
  });
  saveDataInStorage('taskifyData', projectsCollection);
  clearContainer('#todosDropdowns');
  return projectsCollection;
}

export {
  saveDataInStorage,
  getDataFromStorage,
  updateExistingTodo,
  pushNewTodo,
  deleteProject,
};