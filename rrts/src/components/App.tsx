import React, { Component } from "react";
import { Todo, fetchTodos, deleteTodo } from "../actions";
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

class _App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    // * when passing state as generic to Component, init state in the constructor!
    super(props);
    this.state = { fetching: false };
  }

  componentDidUpdate(prevProps: AppProps) {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = () => {
    this.setState({ fetching: true });
    this.props.fetchTodos();
  };

  onTodoClick = (id: number) => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map(todo => {
      return (
        <div key={todo.id} onClick={() => this.onTodoClick(todo.id)}>
          {todo.title}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching ? <p>Loading</p> : this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    todos: state.todos
  };
};

// Using the object form of mapDispatchToProps here instead of the function form
// https://react-redux.js.org/using-react-redux/connect-mapdispatch#two-forms-of-mapdispatchtoprops
// const mapDispatchToProps = { fetchTodos, deleteTodo };

// ThunkDispatch<Store, extraArgument, Action>
const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, null, AnyAction>
) => {
  return {
    fetchTodos: () => dispatch(fetchTodos()),
    deleteTodo: (id: number) => dispatch(deleteTodo(id))
  };
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(_App);
