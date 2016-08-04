import {Observable} from 'rxjs'

export class TodoAPI {
  static createTodo$ = (text) =>
    Observable.of({
      _id: Symbol(),
      text: text
    }).delay(1000)
}
