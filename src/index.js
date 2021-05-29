import 'bootstrap';
import { Modal } from 'bootstrap';
import Project from './project';
import './style.scss';
import Todo from './todo';
import clearContainer from './clearContainer';
import * as helpers from './helpers';

const addProjectBtn = document.getElementById('project-submit');
const projectInput = document.getElementById('newproject');
const addTodoBtn = document.getElementById('submit-todo');
const openModalBtn = document.getElementById('openModal');
let projectsCollection = [];


addProjectBtn.addEventListener('click', addProjectEventHandler);
addTodoBtn.addEventListener('click', addTodo);
openModalBtn.addEventListener('click', changeSubmitText);

window.onload = () => {

  getDataFromStorage('taskifyData');

  
  if (projectsCollection.length == 0) {

    const newProject = new Project("Default Project");
    projectsCollection.push(newProject);
    addProjectButtontoDom(newProject);
    saveDataInStorage("taskifyData", projectsCollection);
  } else {
    projectsCollection.forEach(project => {
      addProjectButtontoDom(project);
    })
  }


};


function addProjectEventHandler(e) {
  e.preventDefault();

  let newProject = "";

 newProject = new Project(projectInput.value)


  if (helpers.projectNameExists(newProject._name, projectsCollection)) {
    alert("Project name already exists. Please pick another one");
    return;
  }

  if (newProject.name == "") {
    alert("Project name cannot be empty");
    return;
  }

  projectsCollection.push(newProject);
  addProjectButtontoDom(newProject);
  saveDataInStorage("taskifyData", projectsCollection);
}

function addProjectButtontoDom(newProject_) {
  let newProject = newProject_;

  const projectList = document.querySelector(".project-list");
  const projectItem = document.createElement("li");
  projectItem.classList.add("my-2");

  const deleteProjectBtn = document.createElement("i");
  deleteProjectBtn.classList.add("fas", "fa-trash-alt", "ms-2");

  deleteProjectBtn.addEventListener("click", deleteProject);

  const radioInput = document.createElement("input");
  Object.assign(radioInput, {
    type: "radio",
    className: "btn-check",
    name: "options",
  
    autocomplete: "off",
  });
  const radioLabel = document.createElement("label");
  radioLabel.classList.add("btn", "btn-outline-success");
  radioLabel.setAttribute("for", `option${projectsCollection.length}`);
  radioLabel.innerText = newProject._name;
  radioLabel.addEventListener("click", showTodos);
  projectItem.append(radioInput, radioLabel);
  projectItem.appendChild(deleteProjectBtn);
  projectList.appendChild(projectItem);
}

function addTodo(e) {
  e.preventDefault();

  const projectName = document.querySelector('.modal-title').innerText;
  const title = document.querySelector('#todoTitle').value;
  const description = document.querySelector('#todoDescription').value;
  const dueDate = document.querySelector('#todoDueDate').value;
  const priority = document.querySelector('#todoPriority').value;

  const project = helpers.getProject(projectName, projectsCollection);
  let todoId = 0
  let tempTodo = new Todo(todoId, title, description, dueDate, priority);

  if (document.getElementById("submit-todo").innerText == "Update"){
    todoId = document.querySelector("#todoId").value;
    tempTodo = new Todo(todoId, title, description, dueDate, priority);
    updateExistingTodo(tempTodo, project);
  }
  else{
    todoId = helpers.generateTodoId(project);
    tempTodo = new Todo(todoId, title, description, dueDate, priority);
    pushNewTodo(tempTodo, project);
  }
    const form = document.getElementById("todo-form");
    form.reset();


    document.querySelector("#btn-close-modal").click(); 
  
  populateProjectTodos(projectName);
}

function pushNewTodo(tempTodo, project) {

  project._todos.push(tempTodo);

  saveDataInStorage("taskifyData", projectsCollection);

  
}

function updateExistingTodo(tempTodo, project) {
  project._todos.forEach((todo, index) => {
    if(todo._id == tempTodo._id) {
      project._todos.splice(index, 1, tempTodo);
    }
  })

  saveDataInStorage("taskifyData", projectsCollection);

}

function saveDataInStorage(key, data) {
  localStorage.removeItem(key);

  localStorage.setItem(key, JSON.stringify(data));


}

function getDataFromStorage(key) {

  projectsCollection = [];

  JSON.parse(localStorage.getItem(key) || "[]").map((project) => {
    Object.assign(new Project(), project);
    
    project._todos.map((todo) => {
      Object.assign(new Todo(), todo);
    });
    projectsCollection.push(project);  
  });
  
}

function showTodos(e) {
  document.querySelector('.modal-title').innerText = e.target.innerText;
  populateProjectTodos(e.target.innerText);
}

function populateProjectTodos(projectTitle) {
  const todoContainer = document.getElementById('todosDropdowns');
  clearContainer('#todosDropdowns');

  const tempProject = helpers.getProject(projectTitle, projectsCollection);
  tempProject['_todos'].forEach((item) => {

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
    dropToggle.innerText = item._title;
    dropDiv.appendChild(dropToggle);
    dropDiv.appendChild(editBtn);
    dropDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', deleteTodo);
    editBtn.addEventListener('click', editTodo);

    const dropMenu = document.createElement('ul');
    dropMenu.classList.add('dropdown-menu');
    dropMenu.setAttribute('aria-labelledby', 'dropdownMenuLink');
    dropDiv.appendChild(dropMenu);


    const dropDescription = document.createElement('li');
    const dropDescriptionCont = document.createElement('p');
    dropDescriptionCont.classList.add('dropdown-item');
    dropDescriptionCont.innerText = item._description;
    dropDescription.appendChild(dropDescriptionCont);
    dropMenu.appendChild(dropDescription);


    const dropDate = document.createElement('li');
    const dropDateCont = document.createElement('p');
    dropDateCont.classList.add('dropdown-item');
    dropDateCont.innerText = item._dueDate;
    dropDate.appendChild(dropDateCont);
    dropMenu.appendChild(dropDate);

 
    const dropPriority = document.createElement('li');
    const dropPriorityCont = document.createElement('p');
    dropPriorityCont.classList.add('dropdown-item');
    dropPriorityCont.innerText = item._priority;
    dropPriority.appendChild(dropPriorityCont);
    dropMenu.appendChild(dropPriority);
    todoContainer.appendChild(dropDiv);


    const dropId = document.createElement('li');
    const dropIdCont = document.createElement('p');
    dropIdCont.classList.add('dropdown-item', 'd-none');
    dropIdCont.innerText = item._id;
    dropId.appendChild(dropIdCont);
    dropMenu.appendChild(dropId);
  });
}

function deleteTodo(e) {

  const projectName = document.querySelector('.modal-title').innerText;
  const projectToEdit = helpers.getProject(projectName, projectsCollection);
  const todoId = e.target.parentNode.childNodes[3].childNodes[3].innerText;

  projectToEdit._todos.forEach((item, index) => {

    if (item._id == todoId) {
  
       projectToEdit._todos.splice(index, 1);

    }
  });
  projectsCollection = helpers.updateProject(projectToEdit, projectsCollection);

  saveDataInStorage("taskifyData", projectsCollection);
  populateProjectTodos(projectName);

}

function editTodo(e) {
  let myModal = new Modal(document.getElementById('exampleModal'));
  const editTodoBtn = document.getElementById('submit-todo');
  editTodoBtn.innerText = 'Update';

  const projectName = document.querySelector('.modal-title').innerText;
  const todoTitle = e.target.parentNode.childNodes[0].innerText;
  const todoDesc = e.target.parentNode.childNodes[3].childNodes[0].innerText;
  const todoDuedate = e.target.parentNode.childNodes[3].childNodes[1].innerText;
  const todoPrior = e.target.parentNode.childNodes[3].childNodes[2].innerText;
  const todoId = e.target.parentNode.childNodes[3].childNodes[3].innerText;

  
  document.querySelector('#todoTitle').value = todoTitle;
  document.querySelector('#todoDescription').value = todoDesc;
  document.querySelector('#todoDueDate').value = todoDuedate;
  document.querySelector('#todoPriority').value = todoPrior;
  document.querySelector("#todoId").value = todoId;

  myModal.show();
}

function changeSubmitText() {
  const editTodoBtn = document.getElementById('submit-todo');
  editTodoBtn.innerText = 'Add todo';
}

function deleteProject(e) {
  const projName = e.target.parentNode.childNodes[1].innerText;
  const projParent = e.target.parentNode.parentNode;
  projParent.removeChild(e.target.parentNode);
  projectsCollection.forEach((project, index) => {
    if (project._name == projName) {
     
      projectsCollection.splice(index, 1);
      
    }
  });
  saveDataInStorage("taskifyData", projectsCollection);
  clearContainer('#todosDropdowns');
}
