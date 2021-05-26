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

  for(let i=0; i <= projectsCollection.length; i+=1 ){
    newProject.addTodo='Todo ' + i;
  }
  

  const projectList = document.querySelector('.project-list');
  const projectItem = document.createElement('li');
  //   projectItem.textContent = projectInput.value;
  const radioInput = document.createElement('input');
  Object.assign(radioInput, {
    type: 'radio',
    className: 'btn-check',
    name: 'options',
    id: `option${projectsCollection.length}`,
    autocomplete: 'off',
  });
  const radioLabel = document.createElement('label');
  radioLabel.classList.add('btn', 'btn-secondary');
  radioLabel.setAttribute('for', `option${projectsCollection.length}`);
  radioLabel.innerText = newProject._name;
  radioLabel.addEventListener("click", showTodos);

  projectItem.append(radioInput, radioLabel);

  projectList.appendChild(projectItem);
  //   console.log(document.querySelector('input[name="options"]:checked').value);
  
}


function addTodo(e) {
  e.preventDefault();
  
}

function showTodos(e){
    const tempArray = projectsCollection.filter(
      (item) => item["_name"] === e.target.outerText
    );
   console.log(tempArray[0]["_name"]);
   tempArray[0]['_todos'].forEach(item => console.log(item))
}
