import { React, Component } from '../../core/';

export default class AppView extends Component {
  render() {
    const { dispatch, current, record } = this.props;
    return (
      <div>
        <button onClick={() => dispatch({
          type: 'app/add'
        })}>+</button>
        <p>{current}</p>
        <p>{record}</p>
      </div>
    );
  }
}