import {
  generateTodoId, getProject, updateProject, projectNameExists,
} from './helpers';

it('generates and id for each project', () => {
  const tempTodo = {
    id: 4,
    title: 'Test Todo',
    description: 'Test description',
    dueDate: '06/10/2021',
    priority: 'High',
  };

  const project2 = { name: 'Test Project', todos: [tempTodo] };
  expect(generateTodoId(project2)).toBe(0);
});

it('returns an object with a project', () => {
  const projectsCollection = [];
  const project = { name: 'Test Project', todos: [] };
  projectsCollection.push(project);
  expect(getProject(project.name, projectsCollection)).toEqual({
    name: 'Test Project',
    todos: [],
  });
});

it('returns projects collection with updated project', () => {
  const projectsCollection = [];
  const project = { name: 'Test Project', todos: [] };
  const tempTodo = {
    id: 4,
    title: 'Test Todo',
    description: 'Test description',
    dueDate: '06/10/2021',
    priority: 'High',
  };
  project.todos.push(tempTodo);
  projectsCollection.push(project);
  const tempTodo2 = {
    id: 4,
    title: 'Test Todo2',
    description: 'Test description2',
    dueDate: '06/10/2021',
    priority: 'High',
  };
  project.todos.push(tempTodo2);
  const projectUpdate = project;
  expect(updateProject(projectUpdate, projectsCollection)[0].todos.length).toBe(2);
});

it('returns a boolean wether the project name exists or not', () => {
  const project = { name: 'Test Project', todos: [] };
  const project2 = 'Test Project';
  const projectsCollection = [];
  projectsCollection.push(project);
  expect(projectNameExists(project2, projectsCollection)).toBeTruthy();
});
