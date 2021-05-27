import 'bootstrap';
import Project from './project';
import './style.scss';
import Todo from './todo';
import clearContainer from './clearContainer';

const addProjectBtn = document.getElementById('project-submit');
const projectInput = document.getElementById('newproject');
const addTodoBtn = document.getElementById('submit-todo');
const projectsCollection = [];
//Event listener ------------------
addProjectBtn.addEventListener('click', addProject);
addTodoBtn.addEventListener('click', addTodo);

//Functions------------------
function addProject(e) {
  e.preventDefault();
  let newProject = new Project(projectInput.value);

  projectsCollection.push(newProject);

  const projectList = document.querySelector('.project-list');
  const projectItem = document.createElement('li');
  projectItem.classList.add('my-2');

  const radioInput = document.createElement('input');
  Object.assign(radioInput, {
    type: 'radio',
    className: 'btn-check',
    name: 'options',
    id: `option${projectsCollection.length}`,
    autocomplete: 'off',
  });
  const radioLabel = document.createElement('label');
  radioLabel.classList.add('btn', 'btn-outline-success');
  radioLabel.setAttribute('for', `option${projectsCollection.length}`);
  radioLabel.innerText = newProject._name;
  radioLabel.addEventListener('click', showTodos);

  projectItem.append(radioInput, radioLabel);

  projectList.appendChild(projectItem);
}

function addTodo(e) {
  e.preventDefault();
  const projectName = document.querySelector('#todoProject').innerText;
  const title = document.querySelector('#todoTitle').value;
  const description = document.querySelector('#todoDescription').value;
  const dueDate = document.querySelector('#todoDueDate').value;
  const priority = document.querySelector('#todoPriority').value;

  const project = getProject(projectName);
  const newTodo = new Todo(title, description, dueDate, priority);
  project.addTodo = newTodo;

  populateProjectTodos(projectName);
}

function showTodos(e) {
  document.getElementById('todoProject').innerText = e.target.innerText;
  populateProjectTodos(e.target.innerText);

  //console.log(document.querySelector('input[name="options"]:checked').innerText);
}

function populateProjectTodos(projectTitle) {
  const todoContainer = document.getElementById('todosDropdowns');
  clearContainer('#todosDropdowns');
  //Get the project clicked and show all the Todos
  const tempProject = getProject(projectTitle);
  console.log(projectTitle);
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

function getProject(projectName) {
  const projectsColl = projectsCollection.filter(
    (item) => item['_name'] === projectName
  );
  return projectsColl[0];
}
