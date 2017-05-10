import $ from 'jquery';
import {hashHistory} from 'react-router';

export function showLogin(){
  console.log('showLogin action handler');
  return (dispatch) => dispatch({type: 'showlogin'});

}

export function showSignup(){
  console.log('showSignup action handler');
  return (dispatch) => dispatch({type: 'showsignup'});

}

export function signUp(username, password){
  console.log('in signUp');
  console.log('un: ' + username);
  console.log('pwd: ' + password);
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/signup',
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify({username: username, password: password})
    })
    .then(data => {
      console.log("signUp returned: " , data);
      dispatch({type: 'accountcreated'});
      // hashHistory.push('/page/' + data.title);
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;
}

export function signIn(username, password){
  console.log('in signIn');
  console.log('un: ' + username);
  console.log('pwd: ' + password);
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/signin',
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify({username: username, password: password})
    })
    .then(data => {
      console.log("signIn returned: ", data);
      dispatch({type: 'usersignedin', username: username, token: data.token});
      // hashHistory.push('/page/' + data.title);
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;
}

export function usernameTyping(event){
  console.log('typing in username');
  return (dispatch) => dispatch({type: 'usernameTyping', username: event.target.value});

}

export function cancel(){
  console.log('cancelling signin/signup bar');
  return (dispatch) => dispatch({type: 'cancel'});

}

export function passwordTyping(event){
  console.log('typing in password');
  return (dispatch) => dispatch({type: 'passwordTyping', password: event.target.value});

}

export function lucky(){
  console.log('in lucky');
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/lucky',
      type: "GET"
    })
    .then(data => {
      console.log("updatePage returned: " + data);
      hashHistory.push('/page/' + data.title);
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;
}
