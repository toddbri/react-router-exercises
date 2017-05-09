import React, { Component } from 'react';
import './App.css';
import {Link } from 'react-router';

class AppLayout extends Component {
  render() {
    return (
      <div className="App">
        <Link to="signIn">SignIn</Link>
        {this.props.children}
      </div>
    );
  }
}

export default AppLayout;
