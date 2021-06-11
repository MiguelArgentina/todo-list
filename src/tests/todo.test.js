import Todo from '../todo';

const todo1 = new Todo();
it('returns an object of class todo', () => {
  expect(todo1).toBeInstanceOf(Todo);
});

it('returns an object of class todo', () => {
  todo1.id = 1;
  todo1.title = 'todoNAme';
  todo1.description = 'todoDescription';
  todo1.dueDate = '06/10/2021';
  todo1.priority = 'medium';
  expect(todo1.id).toBe(1);
  expect(todo1.title).toBe('todoNAme');
  expect(todo1.description).toBe('todoDescription');
  expect(todo1.dueDate).toBe('06/10/2021');
  expect(todo1.priority).toBe('medium');
});
