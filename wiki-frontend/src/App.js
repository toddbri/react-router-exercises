import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import './App.css';
// import { Link } from 'react-router';
import * as actions from './App.action'

class AppLayout extends Component {
  render() {
    console.log('AppLayout render state: ', this.props);
    console.log("signin: ", this.props.signin);
    console.log("signup: ", this.props.signup);

    let navbar = <div className="navbar"><div className="lucky"><button onClick={this.props.lucky}>Suprise Me</button></div>
                  <div onClick={this.props.showLogin} className="signinlink">Log in</div><div onClick={this.props.showSignup} className="signuplink">Sign Up</div><div className="userid">{this.props.loggedinname}</div>
                </div>;

    let signinhtml = <div className="logincontainer fadeIn">
                      <div className="signin">
                      Username:  <input className="usernameinput" onChange={(event) => this.props.usernameTyping(event)} value={this.props.username} type="text"/>
                      Password:  <input className="passwordinput" onChange={(event) => this.props.passwordTyping(event)} value={this.props.password} type="password"/>
                      <button className="loginbutton" onClick={() => this.props.signIn(this.props.username, this.props.password)}>Sign In</button>
                      <button className="cancel" onClick={this.props.cancel}>X</button>
                      </div>
                      </div>;

    let signuphtml =  <div className="logincontainer fadeIn">
                      <div className="signup">
                      Username: <input className="usernameinput" onChange={(event) => this.props.usernameTyping(event)} value={this.props.username} type="text"/>
                      Password: <input className="passwordinput" onChange={(event) => this.props.passwordTyping(event)} value={this.props.password} type="password"/>
                      <button className="loginbutton" onClick={() => this.props.signUp(this.props.username, this.props.password)}>Submit</button>
                      <button className="cancel" onClick={this.props.cancel}>X</button>
                      </div>
                      </div>;

    let login = this.props.signin ? signinhtml : this.props.signup ? signuphtml : null;

    return (
      <div className="app">
        {navbar}
        {login}
        {this.props.children}
      </div>
    );
  }
}

const AppContainer = ReactRedux.connect(
    state => state.userinfo,
    actions
)(AppLayout);

export default AppContainer;
