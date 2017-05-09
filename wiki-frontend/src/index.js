import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './App';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import wikiReducer from './wiki-page/wikipage.reducer';
import wikiContainer from './wiki-page/wikipage';
import ReduxThunk from 'redux-thunk';
import {Router, Route, Link, IndexLink, hashHistory, IndexRoute} from 'react-router';
import './index.css';

class Home extends React.Component {

  render() {
    console.log("Home render was called");
    return (<div>Home Page at {new Date().toString()}</div>);
  }
}
// const INITIAL_STATE = {startup: true, editing: false};
const INITIAL_STATE = {};

const mainReducer = function (state=INITIAL_STATE){
  return state;
};

const reducer = Redux.combineReducers({
  main: mainReducer,
  wiki: wikiReducer

});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

let vdom = <ReactRedux.Provider store={store}>
  <Router history={hashHistory}>
    <div>
      <Route path="/" component={AppLayout}>
        <IndexRoute component={Home}/>
        <Route path="/page/:title" component={wikiContainer}/>
      </Route>
    </div>
  </Router>
</ReactRedux.Provider>;

ReactDOM.render(
  vdom,
  document.getElementById('root')
);
