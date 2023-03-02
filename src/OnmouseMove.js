
import { Component } from "react";
import './index.css'

class OnClike extends Component {
  constructor(props) {
    super(props);

    this.state = { x: 0, y: 0 };
  }

  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY });
  }

  render() {
    const { x, y } = this.state;
    return <div  className = "container"onMouseMove={this._onMouseMove.bind(this)}>
      <h1>X-Coordinates: { x} </h1>
      <h1>Y-Coordinates :{y}</h1>
      
    </div>;
  }
}


export default OnClike