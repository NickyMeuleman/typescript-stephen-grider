import { Todo, ActionTypes, Action } from "../actions";

const initialState: Todo[] = [];

export const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TODOS:
      return action.payload;
    case ActionTypes.DELETE_TODO:
      // TypeScript now knows the type of 'action' is 'DeleteTodoAction', that's neat
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};
