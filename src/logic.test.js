import { pushNewTodo } from './logic';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = localStorageMock;

test('Adds a new Todo to the Project', () => {
  const project = { name: 'Test Project', todos: [] };
  const tempTodo = {
    id: 1, title: 'Test Todo', description: 'Test description', dueDate: '06/10/2021', priority: 'High',
  };
  const projectsCollection = [];
  projectsCollection.push(project);
  expect(pushNewTodo(tempTodo, project, projectsCollection)[0].todos.length).toBe(1);
});

test('Fails to add a new Todo to the Project', () => {
  const project = { name: 'Test Project', todos: [] };
  const tempTodo = {
    id: 1, title: 'Test Todo', description: 'Test description', priority: 'High',
  };
  const projectsCollection = [];
  projectsCollection.push(project);
  expect(pushNewTodo(tempTodo, project, projectsCollection)).toEqual('Error pushing ToDo');
});
