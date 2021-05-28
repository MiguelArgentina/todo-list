

export default class Todo {
  constructor(id, title, description, dueDate, priority) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get dueDate() {
    return this._dueDate;
  }

  get priority() {
    return this._priority;
  }

  set id(id) {
    this._id = id;
  }

  set title(title) {
    this._title = title;
  }

  set description(description) {
    this._description = description;
  }

  set dueDate(dueDate) {
    this._dueDate = dueDate;
  }

  set priority(priority) {
    this._priority = priority;
  }
}
