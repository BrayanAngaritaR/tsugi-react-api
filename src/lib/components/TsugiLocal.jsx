import * as React from 'react';

class TsugiLocal extends React.Component {
  render() {
    return <h1>Local says Hello, {this.props.name}</h1>;
  }
}

export { TsugiLocal };
