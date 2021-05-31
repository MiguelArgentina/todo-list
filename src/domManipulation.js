import { Modal } from 'bootstrap';
import Project from './project';
import Todo from './todo';
import clearContainer from './clearContainer';
import * as helpers from './helpers';
import {
  saveDataInStorage,
  updateExistingTodo,
  pushNewTodo,
  deleteProject,
} from './logic';

const projectInput = document.getElementById('newproject');
const btnCloseAlertNameBlank = document.querySelector('#btnalert-name-blank');
const btnCloseAlertNameExists = document.querySelector('#btnalert-name-exists');

const editTodo = (e) => {
  const myModal = new Modal(document.getElementById('exampleModal'));
  const editTodoBtn = document.getElementById('submit-todo');
  editTodoBtn.innerText = 'Update';

  const todoTitle = e.target.parentNode.childNodes[0].innerText;
  const todoDesc = e.target.parentNode.childNodes[3].childNodes[0].innerText;
  const todoDuedate = e.target.parentNode.childNodes[3].childNodes[1].innerText;
  const todoPrior = e.target.parentNode.childNodes[3].childNodes[2].innerText;
  const todoId = e.target.parentNode.childNodes[3].childNodes[3].innerText;

  document.querySelector('#todoTitle').value = todoTitle;
  document.querySelector('#todoDescription').value = todoDesc;
  document.querySelector('#todoDueDate').value = todoDuedate;
  document.querySelector('#todoPriority').value = todoPrior;
  document.querySelector('#todoId').value = todoId;

  myModal.show();
};

const deleteTodo = (e, projectsCollection) => {
  const projectName = document.querySelector('.modal-title').innerText;
  const projectToEdit = helpers.getProject(projectName, projectsCollection);
  const todoId = e.target.parentNode.childNodes[3].childNodes[3].innerText;

  projectToEdit.todos.forEach((item, index) => {
    if (parseInt(item.id, 10) === parseInt(todoId, 10)) {
      projectToEdit.todos.splice(index, 1);
    }
  });
  projectsCollection = helpers.updateProject(projectToEdit, projectsCollection);

  saveDataInStorage('taskifyData', projectsCollection);
  const projectTitle = projectName;

  const todoContainer = document.getElementById('todosDropdowns');
  clearContainer('#todosDropdowns');

  const tempProject = helpers.getProject(projectTitle, projectsCollection);
  tempProject.todos.forEach((item) => {
    const dropDiv = document.createElement('div');
    dropDiv.classList.add('dropdown', 'col-12', 'col-lg-3', 'my-2');

    const editBtn = document.createElement('i');
    editBtn.classList.add('far', 'fa-edit', 'mx-3');

    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas', 'fa-trash-alt');

    const dropToggle = document.createElement('a');
    dropToggle.classList.add('btn', 'btn-primary', 'dropdown-toggle');
    Object.assign(dropToggle, {
      href: '#',
      role: 'button',
      id: 'dropdownMenuLink',
    });
    dropToggle.setAttribute('data-bs-toggle', 'dropdown');
    dropToggle.setAttribute('aria-expanded', 'false');
    dropToggle.innerText = item.title;
    dropDiv.appendChild(dropToggle);
    dropDiv.appendChild(editBtn);
    dropDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', (e) => deleteTodo(e, projectsCollection));
    editBtn.addEventListener('click', editTodo);

    const dropMenu = document.createElement('ul');
    dropMenu.classList.add('dropdown-menu');
    dropMenu.setAttribute('aria-labelledby', 'dropdownMenuLink');
    dropDiv.appendChild(dropMenu);

    const dropDescription = document.createElement('li');
    const dropDescriptionCont = document.createElement('p');
    dropDescriptionCont.classList.add('dropdown-item');
    dropDescriptionCont.innerText = item.description;
    dropDescription.appendChild(dropDescriptionCont);
    dropMenu.appendChild(dropDescription);

    const dropDate = document.createElement('li');
    const dropDateCont = document.createElement('p');
    dropDateCont.classList.add('dropdown-item');
    dropDateCont.innerText = item.dueDate;
    dropDate.appendChild(dropDateCont);
    dropMenu.appendChild(dropDate);

    const dropPriority = document.createElement('li');
    const dropPriorityCont = document.createElement('p');
    dropPriorityCont.classList.add('dropdown-item');
    dropPriorityCont.innerText = item.priority;
    dropPriority.appendChild(dropPriorityCont);
    dropMenu.appendChild(dropPriority);
    todoContainer.appendChild(dropDiv);

    const dropId = document.createElement('li');
    const dropIdCont = document.createElement('p');
    dropIdCont.classList.add('dropdown-item', 'd-none');
    dropIdCont.innerText = item.id;
    dropId.appendChild(dropIdCont);
    dropMenu.appendChild(dropId);
  });
};

const populateProjectTodos = (projectTitle, projectsCollection) => {
  const todoContainer = document.getElementById('todosDropdowns');
  clearContainer('#todosDropdowns');

  const tempProject = helpers.getProject(projectTitle, projectsCollection);
  tempProject.todos.forEach((item) => {
    const dropDiv = document.createElement('div');
    dropDiv.classList.add('dropdown', 'col-12', 'col-lg-3', 'my-2');

    const editBtn = document.createElement('i');
    editBtn.classList.add('far', 'fa-edit', 'mx-3');

    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas', 'fa-trash-alt');

    const dropToggle = document.createElement('a');
    dropToggle.classList.add('btn', 'btn-primary', 'dropdown-toggle');
    Object.assign(dropToggle, {
      href: '#',
      role: 'button',
      id: 'dropdownMenuLink',
    });
    dropToggle.setAttribute('data-bs-toggle', 'dropdown');
    dropToggle.setAttribute('aria-expanded', 'false');
    dropToggle.innerText = item.title;
    dropDiv.appendChild(dropToggle);
    dropDiv.appendChild(editBtn);
    dropDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', (e) => deleteTodo(e, projectsCollection));
    editBtn.addEventListener('click', editTodo);

    const dropMenu = document.createElement('ul');
    dropMenu.classList.add('dropdown-menu');
    dropMenu.setAttribute('aria-labelledby', 'dropdownMenuLink');
    dropDiv.appendChild(dropMenu);

    const dropDescription = document.createElement('li');
    const dropDescriptionCont = document.createElement('p');
    dropDescriptionCont.classList.add('dropdown-item');
    dropDescriptionCont.innerText = item.description;
    dropDescription.appendChild(dropDescriptionCont);
    dropMenu.appendChild(dropDescription);

    const dropDate = document.createElement('li');
    const dropDateCont = document.createElement('p');
    dropDateCont.classList.add('dropdown-item');
    dropDateCont.innerText = item.dueDate;
    dropDate.appendChild(dropDateCont);
    dropMenu.appendChild(dropDate);

    const dropPriority = document.createElement('li');
    const dropPriorityCont = document.createElement('p');
    dropPriorityCont.classList.add('dropdown-item');
    dropPriorityCont.innerText = item.priority;
    dropPriority.appendChild(dropPriorityCont);
    dropMenu.appendChild(dropPriority);
    todoContainer.appendChild(dropDiv);

    const dropId = document.createElement('li');
    const dropIdCont = document.createElement('p');
    dropIdCont.classList.add('dropdown-item', 'd-none');
    dropIdCont.innerText = item.id;
    dropId.appendChild(dropIdCont);
    dropMenu.appendChild(dropId);
  });
};

const showTodos = (e, projectsCollection) => {
  document.querySelector('.modal-title').innerText = e.target.innerText;
  populateProjectTodos(e.target.innerText, projectsCollection);
};

const addProjectButtontoDom = (newProject_, projectsCollection) => {
  const newProject = newProject_;

  const projectList = document.querySelector('.project-list');
  const projectItem = document.createElement('li');
  projectItem.classList.add('my-2');

  const deleteProjectBtn = document.createElement('i');
  deleteProjectBtn.classList.add('fas', 'fa-trash-alt', 'ms-2');

  deleteProjectBtn.addEventListener('click', (e) => deleteProject(e, projectsCollection));

  const radioInput = document.createElement('input');
  Object.assign(radioInput, {
    type: 'radio',
    className: 'btn-check',
    name: 'options',
    id: newProject.name.replace(' ', '-'),
    autocomplete: 'off',
  });
  const radioLabel = document.createElement('label');
  radioLabel.classList.add('btn', 'btn-outline-success');
  radioLabel.setAttribute('for', `${newProject.name.replace(' ', '-')}`);
  radioLabel.innerText = newProject.name;
  radioLabel.addEventListener('click', (e) => showTodos(e, projectsCollection));
  projectItem.append(radioInput, radioLabel);
  projectItem.appendChild(deleteProjectBtn);
  projectList.appendChild(projectItem);
};

const addProjectEventHandler = (e, projectsCollection) => {
  e.preventDefault();
  let newProject = '';
  newProject = new Project(projectInput.value);

  if (helpers.projectNameExists(newProject.name, projectsCollection)) {
    btnCloseAlertNameExists.parentNode.parentNode.classList.remove('d-none');
    return;
  }

  if (newProject.name === '') {
    btnCloseAlertNameBlank.parentNode.parentNode.classList.remove('d-none');
    return;
  }

  projectsCollection.push(newProject);
  addProjectButtontoDom(newProject, projectsCollection);
  saveDataInStorage('taskifyData', projectsCollection);
};

const addTodo = (e, projectsCollection) => {
  e.preventDefault();

  const projectName = document.querySelector('.modal-title').innerText;
  const title = document.querySelector('#todoTitle').value;
  const description = document.querySelector('#todoDescription').value;
  const dueDate = document.querySelector('#todoDueDate').value;
  const priority = document.querySelector('#todoPriority').value;

  const project = helpers.getProject(projectName, projectsCollection);
  let todoId = 0;
  let tempTodo = '';

  if (document.getElementById('submit-todo').innerText === 'Update') {
    todoId = document.querySelector('#todoId').value;
    tempTodo = new Todo(todoId, title, description, dueDate, priority);
    updateExistingTodo(tempTodo, project, projectsCollection);
  } else {
    todoId = helpers.generateTodoId(project);
    tempTodo = new Todo(todoId, title, description, dueDate, priority);
    projectsCollection = pushNewTodo(tempTodo, project, projectsCollection);
  }
  const form = document.getElementById('todo-form');
  form.reset();

  document.querySelector('#btn-close-modal').click();

  populateProjectTodos(projectName, projectsCollection);
};

const changeSubmitText = () => {
  const editTodoBtn = document.getElementById('submit-todo');
  editTodoBtn.innerText = 'Add todo';
};

export {
  addProjectEventHandler,
  addTodo,
  changeSubmitText,
  addProjectButtontoDom,
};
