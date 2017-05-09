const INITIAL_STATE = {editing: false};

function reducer(state = INITIAL_STATE, action){
  console.log('recieved: ' + action);
  if (action.type === 'update-contents'){
    console.log("in the udpate-contents reducer");
    return Object.assign({},state,{pageInfo: action.payload, editing: false});
  }

  if (action.type === 'toggleEdit'){
    return Object.assign({},state,{editing: true})
  }

  if (action.type === 'updateContent'){
    console.log('in updateContents: ' + action.payload);
    console.log("pageInfo.content: " + state.pageInfo.content);
    console.log("pageInfo.title: " + state.pageInfo.title);
    Object.keys(state.pageInfo).forEach((item) => console.log('[' + item + ']-' + state.pageInfo[item]));
    let tmpState = state;
    console.log('tmpState.content-before: ' + tmpState.pageInfo.content);
    tmpState.pageInfo.content = action.payload;
    console.log('tmpState.content-after: ' + tmpState.pageInfo.content);
    return Object.assign({},state,tmpState,{something: !tmpState.something});
  }

  return state;
}

export default reducer;
