import React, { Component } from 'react';
import './App.css';

class AppLayout extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default AppLayout;
