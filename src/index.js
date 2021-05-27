import 'bootstrap';
import Project from './project';
import './style.scss';
import Todo from './todo';

let firstTodo = new Todo('titlees', 'description', '26/05/2021', 'High');

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
  radioLabel.classList.add("btn", "btn-outline-success");
  radioLabel.setAttribute('for', `option${projectsCollection.length}`);
  radioLabel.innerText = newProject._name;
  radioLabel.addEventListener("click", showTodos);

  projectItem.append(radioInput, radioLabel);

  projectList.appendChild(projectItem);
    
  
}


function addTodo(e) {
  e.preventDefault();
  const projectName = document.querySelector("#todoProject").innerText;
  const title = document.querySelector("#todoTitle").value;
  const description = document.querySelector("#todoDescription").value;
  const dueDate = document.querySelector("#todoDueDate").value;
  const priority = document.querySelector("#todoPriority").value;
  
  const project = getProject(projectName);
  const newTodo = new Todo(title, description, dueDate, priority);
  project.addTodo = newTodo;
  console.log(project);

}

function showTodos(e){
    document.querySelector("#todoProject").innerText =
      e.target.outerText;
   


      //Get the project clicked and show all the Todos
    const tempProject = getProject(e.target.outerText)
   console.log(tempProject["_name"]);
   tempProject["_todos"].forEach((item) => console.log(item));



   //console.log(document.querySelector('input[name="options"]:checked').innerText);

}

function getProject(projectName){
    const projectsColl = projectsCollection.filter(
      (item) => item["_name"] === projectName
    );
    return projectsColl[0];
}

