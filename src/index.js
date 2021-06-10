import Project from './project';
import './style.scss';
import axios from 'axios';
import {
  saveDataInStorage,
  getDataFromStorage,
} from './logic';
import {
  addProjectEventHandler,
  addTodo,
  changeSubmitText,
  addProjectButtontoDom,
} from './domManipulation';

const addProjectBtn = document.getElementById('project-submit');
const addTodoBtn = document.getElementById('submit-todo');
const openModalBtn = document.getElementById('openModal');
const btnCloseAlertNameBlank = document.querySelector('#btnalert-name-blank');
const btnCloseAlertNameExists = document.querySelector('#btnalert-name-exists');
let projectsCollection = [];

addProjectBtn.addEventListener('click', (e) => addProjectEventHandler(e, projectsCollection));
addTodoBtn.addEventListener('click', (e) => addTodo(e, projectsCollection));
openModalBtn.addEventListener('click', changeSubmitText);
btnCloseAlertNameExists.addEventListener('click', (e) => (e.target.parentNode.parentNode.classList.add('d-none')));
btnCloseAlertNameBlank.addEventListener('click', (e) => (e.target.parentNode.parentNode.classList.add('d-none')));

window.onload = () => {
  projectsCollection = getDataFromStorage('taskifyData', projectsCollection);
  if (projectsCollection.length === 0) {
    const newProject = new Project('Default Project');
    projectsCollection.push(newProject);
    addProjectButtontoDom(newProject, projectsCollection);
    saveDataInStorage('taskifyData', projectsCollection);
  } else {
    projectsCollection.forEach((project) => {
      addProjectButtontoDom(project, projectsCollection);
    });
  }
};
