import 'bootstrap';
import Project from './project';
import './style.scss';
import Todo from './todo';
import clearContainer from './clearContainer';
import * as helpers from "./helpers";

const addProjectBtn = document.getElementById('project-submit');
const projectInput = document.getElementById('newproject');
const addTodoBtn = document.getElementById('submit-todo');
const projectsCollection = [];
//Event listener ------------------
addProjectBtn.addEventListener('click', addProjectEventHandler);
addTodoBtn.addEventListener('click', addTodo);
window.onload = () => addProjectButton("Default Project");

//Functions------------------
function addProjectEventHandler(e) {
  e.preventDefault();

  addProjectButton()
}

function addProjectButton(projectName){
    
    let newProject =''

    projectName === undefined ? 
    newProject = new Project(projectInput.value) :
    newProject = new Project(projectName);

    if (helpers.projectNameExists(newProject.name, projectsCollection)) {
      alert("Project name already exists. Please pick another one");
      return;
    }  

    if (newProject.name == '') {
      alert("Project name cannot be empty");
      return;
    }  

    projectsCollection.push(newProject);

    const projectList = document.querySelector(".project-list");
    const projectItem = document.createElement("li");
    projectItem.classList.add("my-2");

    const deleteProjectBtn = document.createElement("i");
    deleteProjectBtn.classList.add("fas", "fa-trash-alt", "ms-2");

    const radioInput = document.createElement("input");
    Object.assign(radioInput, {
      type: "radio",
      className: "btn-check",
      name: "options",
      id: `option${projectsCollection.length}`,
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
  const projectName = document.querySelector(".modal-title").innerText;
  const title = document.querySelector('#todoTitle').value;
  const description = document.querySelector('#todoDescription').value;
  const dueDate = document.querySelector('#todoDueDate').value;
  const priority = document.querySelector('#todoPriority').value;

  const project = helpers.getProject(projectName, projectsCollection);
  const todoId = helpers.generateTodoId(project)
  const newTodo = new Todo(todoId, title, description, dueDate, priority);
  project.addTodo = newTodo;

  populateProjectTodos(projectName);
}

function showTodos(e) {
  document.querySelector(".modal-title").innerText = e.target.innerText;
  populateProjectTodos(e.target.innerText);

  //console.log(document.querySelector('input[name="options"]:checked').innerText);
}

function populateProjectTodos(projectTitle) {
  const todoContainer = document.getElementById('todosDropdowns');
  clearContainer('#todosDropdowns');
  //Get the project clicked and show all the Todos
  const tempProject = helpers.getProject(projectTitle, projectsCollection);
  tempProject['_todos'].forEach((item) => {
    //todo dropdown
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


  
  //TODO: move the event to the "events" section
  deleteBtn.addEventListener("click", deleteTodo);




    const dropMenu = document.createElement('ul');
    dropMenu.classList.add('dropdown-menu');
    dropMenu.setAttribute('aria-labelledby', 'dropdownMenuLink');
    dropDiv.appendChild(dropMenu);

    //dropdown description
    const dropDescription = document.createElement('li');
    const dropDescriptionCont = document.createElement('p');
    dropDescriptionCont.classList.add('dropdown-item');
    dropDescriptionCont.innerText = item.description;
    dropDescription.appendChild(dropDescriptionCont);
    dropMenu.appendChild(dropDescription);

    //dropdown due date
    const dropDate = document.createElement('li');
    const dropDateCont = document.createElement('p');
    dropDateCont.classList.add('dropdown-item');
    dropDateCont.innerText = item.dueDate;
    dropDate.appendChild(dropDateCont);
    dropMenu.appendChild(dropDate);

    //dropdown priority
    const dropPriority = document.createElement('li');
    const dropPriorityCont = document.createElement('p');
    dropPriorityCont.classList.add('dropdown-item');
    dropPriorityCont.innerText = item.priority;
    dropPriority.appendChild(dropPriorityCont);
    dropMenu.appendChild(dropPriority);
    todoContainer.appendChild(dropDiv);
  });
}



function deleteTodo(e) {
const projectName = document.querySelector(".modal-title").innerText;
  const projectToEdit = helpers.getProject(projectName, projectsCollection);
  console.log(projectToEdit);
  const todoTitle = e.target.parentNode.childNodes[0].innerText;
  const todoDescription = e.target.parentNode.childNodes[3].childNodes[0].innerText;
  const todoDuedate = e.target.parentNode.childNodes[3].childNodes[1].innerText;
  const todoPriority = e.target.parentNode.childNodes[3].childNodes[2].innerText;
const todosCopy = projectToEdit.showTodos;
  todosCopy.forEach((item, index) => {
    if (
      item.title === todoTitle &&
      item.description === todoDescription &&
      item.dueDate === todoDuedate &&
      item.priority === todoPriority
    ) {
      todosCopy.splice(index, 1);
      return
    }
  });
  //if (projectToEdit.showTodos) console.log(projectToEdit.showTodos);
  projectToEdit.setTodo = todosCopy;
  console.log(projectToEdit);
  populateProjectTodos(projectName);
  
}

