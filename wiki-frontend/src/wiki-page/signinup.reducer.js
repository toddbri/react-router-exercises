const INITIAL_STATE = {username: '', password: ''};

function reducer(state = INITIAL_STATE, action){
  console.log('in signinup reducer');
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
  return state;
}

export default reducer;
