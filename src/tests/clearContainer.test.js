/**
 * @jest-environment jsdom
 */
import clearContainer from '../clearContainer';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

test("Clears an HTML element given it's identifier (class, id, element name)", () => {
  document.body.innerHTML = ''
    + '<div class="project-list">'
    + ' <div>'
    + '   Hello'
    + ' </div>'
    + ' <div>'
    + '   world!'
    + ' </div>'
    + '</div>';

  const htmlContainer = document.querySelector('.project-list');
  clearContainer('.project-list');
  expect(htmlContainer.childElementCount).toBe(0);
});
