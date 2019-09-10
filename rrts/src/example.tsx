import React from "react";
import ReactDOM from "react-dom";

interface AppProps {
  color?: string;
}

interface AppState {
  count: number;
}

class App extends React.Component<AppProps, AppState> {
  // state = { count: 0 };
  // ! in TypeeScript the 'state = {}' and constructor(){this.state={}} are NOT identical
  // you overwrite the state definition when you define it outside the constructor
  // future Nicky: Now (this version of CRA), defining it outside the constructor also picks errors if no generic is passed
  // Mixing that short 'state = {}' definition with the state generic can lead to funky situations
  // ! either use the constructor and that generic. OR use 'state={}' without a generic>
  constructor(props: AppProps) {
    super(props);
    this.state = { count: 0 };
  }
  onIncrement = () => {
    this.setState(prevState => {
      return { count: prevState.count + 1 };
    });
  };
  onDecrement = () => {
    this.setState(prevState => {
      return { count: prevState.count - 1 };
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.onIncrement}>Increment</button>
        <button onClick={this.onDecrement}>Decrement</button>
        <p>{this.state.count}</p>
      </div>
    );
  }
}

const FnApp = (props: AppProps): JSX.Element => {
  return <div>hi</div>;
};

const FnApp2: React.FC<AppProps> = props => {
  return <div>hi</div>;
};

const FnApp3 = (props: any): any => {
  return <div>YOLO</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
