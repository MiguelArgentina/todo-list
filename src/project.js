export default class Project {
  constructor(name) {
    this._name = name;
    this._todos = []    
  }

  set addTodo(todo){
      this._todos.push(todo);
  }
}