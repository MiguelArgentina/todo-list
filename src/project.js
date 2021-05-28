export default class Project {
  constructor(name) {
    this._name = name;
    this._todos = []    
  }

  set setTodo (newTodo) {
      this._todos = newTodo;
  }

  set addTodo(todo){
      this._todos.push(todo);
  }

  get name(){
return this._name;
  }
  get showTodos() {
      return this._todos;
  }
}