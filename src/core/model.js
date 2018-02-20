import { connect } from './reactRedux';

export function Model({
  namespace,
  template,
  mapStateToProps = () => {},
  mapDispatchToProps = () => {},
}) {
  return function innerModel(target) {
    // use decorator for render template, higher-order function
    target.prototype.render = () => {
      return (
        connect(mapStateToProps, mapDispatchToProps)(template)
      );
    };

    target.prototype.namespace = namespace;
  }
}