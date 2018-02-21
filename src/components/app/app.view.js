import { React, Component, PureComponent } from '../../core/react';

export default class AppView extends Component {
  render() {
    const { dispatch } = this.props;
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