const INITIAL_STATE = {loggedinname: 'Guest', username: '', password: '', signin: false, signup:false, token: ''};

function reducer(state = INITIAL_STATE, action){
  console.log('in App reducer');
  console.log('App state: ', state);
  if (action.type === 'showsignup'){
    console.log('action handler for showSignup');
    return Object.assign({}, state,{signup: true, signin: false})

  }

  if (action.type === 'cancel'){
    console.log('cancelling the signin/signup bar');
    return Object.assign({}, state, {signin: false, signup: false})

  }

  if (action.type === 'showlogin'){
    console.log('action handler for showLogIn');
    return Object.assign({}, state, {signin: true, signup: false})

  }

  if (action.type === 'signUp'){
    console.log("in the signUp action handler");
    return Object.assign({});
  }

  if (action.type === 'signIn'){
    return Object.assign({});
  }

  if (action.type === 'usernameTyping'){
    console.log('action data-username: ' + action.username);
    return Object.assign({}, state, {username: action.username});

  }

  if (action.type === 'passwordTyping'){
    console.log('action data-password: ' + action.password);
    return Object.assign({},state, {password: action.password});

  }

  if (action.type === 'accountcreated'){
    console.log('user account was created ok');
    return Object.assign({},state, {signup: false});
  }

  if (action.type === 'usersignedin'){
    console.log('user account was created ok');
    return Object.assign({},state, {signin: false, loggedinname: action.username, token: action.token});
  }

  return state;
}

export default reducer;
