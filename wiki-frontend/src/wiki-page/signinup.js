import * as actions from './signinup.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';


class SignInUp extends React.Component {

  componentDidMount(){
    console.log("did mount-SignInUp");
  }

componentWillReceiveProps(newProps){
    console.log("willrecieveProps-signinup");
  }

  render() {
    console.log("in signinup render");
    return (<div className="signIn">
            Username:  <input onChange={(event) => this.props.usernameTyping(event)} value={this.props.username} type="text"/>
            Password:  <input onChange={(event) => this.props.passwordTyping(event)} value={this.props.password} id="password" name="password" type="text"/>
            <button onClick={() => this.props.signUp(this.props.username, this.props.password)}>Submit</button><br/>
            <button onClick={() => this.props.signIn(this.props.username, this.props.password)}>SignIn</button>
            </div>);
  }

}
const SignInUpContainer = ReactRedux.connect(
    state => state.userinfo,
    actions
)(SignInUp);

export default SignInUpContainer;
