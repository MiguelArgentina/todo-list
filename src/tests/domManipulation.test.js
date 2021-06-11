/**
 * @jest-environment jsdom
 */
import { addProjectButtontoDom, populateProjectTodos } from '../domManipulation';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

test("Adds a new HTML element with the project's name", () => {
  document.body.innerHTML = ''
    + '<div class="project-list">'
    + '</div>';

  const projectsNamesContainer = document.querySelector('.project-list');
  const project = { name: 'Test Project', todos: [] };
  const projectsCollection = [];
  addProjectButtontoDom(project, projectsCollection);
  expect(projectsNamesContainer.childElementCount).toBe(1);
});

test("Adds a new HTML element with the ToDo's information", () => {
  document.body.innerHTML = ''
    + '<div id="todosDropdowns">'
    + '</div>';

  const projectTodosContainer = document.querySelector('#todosDropdowns');
  const project = { name: 'Test Project', todos: [] };
  const tempTodo = {
    id: 4,
    title: 'Test Todo2',
    description: 'Test description2',
    dueDate: '06/10/2021',
    priority: 'High',
  };
  project.todos.push(tempTodo);
  const projectsCollection = [];
  projectsCollection.push(project);
  populateProjectTodos(project.name, projectsCollection);
  expect(projectTodosContainer.childElementCount).toBe(1);
});