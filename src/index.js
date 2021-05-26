import 'bootstrap';
import Project from './project';
import './style.scss';
import Todo from './todo'

let firstTodo = new Todo('titlees', 'description', '26/05/2021', 'High');
let newProject = new Project('project');
newProject.addTodo = firstTodo;
console.log(newProject);