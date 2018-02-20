import { React, Component, PureComponent } from '../../core/';

export default class AppView extends Component {
  render() {
    return (
      <div>
        <button onClick={() => dispatch({
          type: ['local'],
          name: { value: 'add', namespace: 'app' },
        })}>+</button>
      </div>
    );
  }
}