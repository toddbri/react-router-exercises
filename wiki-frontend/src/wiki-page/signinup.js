import * as actions from './signinup.action'
import React from 'react';
import * as ReactRedux from 'react-redux';


class LogIn extends React.Component {

  componentDidMount(){
    // console.log("did mount-SignInUp");
  }

componentWillReceiveProps(newProps){
    // console.log("willrecieveProps-signinup");
  }

  render() {
    console.log("in signinup render");

    let signinhtml = <div className="signin">
                      Username:  <input onChange={(event) => this.props.usernameTyping(event)} value={this.props.username} type="text"/>
                      Password:  <input onChange={(event) => this.props.passwordTyping(event)} value={this.props.password} id="password" name="password" type="text"/>
                      <button  className="loginbutton" onClick={() => this.props.signIn(this.props.username, this.props.password)}>SignIn</button>
                      </div>;

    let signuphtml = <div className="signup">
                      Username:  <input onChange={(event) => this.props.usernameTyping(event)} value={this.props.username} type="text"/>
                      Password:  <input onChange={(event) => this.props.passwordTyping(event)} value={this.props.password} id="password" name="password" type="text"/>
                      <button className="loginbutton" onClick={() => this.props.signUp(this.props.username, this.props.password)}>Submit</button>
                      </div>;

    let login = this.props.signin ? signinhtml : this.props.signup ? signuphtml : null;

    return (<div className="logincontainer">{login}</div>);

  }

}
const LogInContainer = ReactRedux.connect(
    state => state.userinfo,
    actions
)(LogIn);

export default LogInContainer;
