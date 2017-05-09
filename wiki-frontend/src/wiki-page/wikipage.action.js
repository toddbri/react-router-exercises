import $ from 'jquery';


export function fetchPage(title){
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/page/' + title
    })
    .then(data => {
      console.log("fetchPage returned: " + data);
      dispatch({type:'update-contents', payload: data});
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;

}

export function toggleEdit(){

  return (dispatch) => dispatch({type:'toggleEdit'});

}

export function updateContent(event){
    console.log('updateContent');
    console.log('etv: ' + event.target.value);
    return (dispatch) => dispatch({type: 'updateContent', payload: event.target.value});
}

export function updatePage(value){
  console.log("updatePage: " + value);
  let content = value.content;
  console.log("JSON data: " + JSON.stringify({content: value.content}));
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/page/' + value.title,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({content: value.content})
    })
    .then(data => {
      console.log("updatePage returned: " + data);
      dispatch({type:'update-contents', payload: data});
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;
}
