/**
 * @jest-environment jsdom
 */

jest.mock('../logic');

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

test("Adds a new HTML element with the project's name", () => {
  const logicMEthods = import('../logic');

  document.body.innerHTML = ''
    + '<div class="project-list">'
    + '</div>';

  const projectsNamesContainer = document.querySelector('.project-list');
  const project = { name: 'Test Project', todos: [] };
  const projectsCollection = [];
  logicMEthods.addProjectButtontoDom.mockImplementation(project, projectsCollection);
  expect(projectsNamesContainer.childElementCount).toBe(1);
});