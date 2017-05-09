import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './App';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import wikiReducer from './wiki-page/wikipage.reducer';
import wikiContainer from './wiki-page/wikipage';
import SignInUpContainer from './wiki-page/signinup';
import signInUpReducer from './wiki-page/signinup.reducer';
import ReduxThunk from 'redux-thunk';
import * as actions from './wiki-page/wikipage.action'
// import {Router, Route, Link, IndexLink, hashHistory, IndexRoute} from 'react-router';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import './index.css';

class Home extends React.Component {

  componentWillReceiveProps(newProps){
      console.log("willrecieveProps-Home");
      if (newProps.params.title !== this.props.params.title){
        this.props.fetchPage(newProps.params.title);
      }
    }

  render() {
    console.log("Home render was called");
    return (<div>Home Page at {new Date().toString()}<div className="lucky"><button onClick={this.props.lucky}>Suprise Me</button></div></div>);
  }
}

class SayWhat extends React.Component {

  render() {
    console.log("SayWhat render was called");
    return (<div>Sorry, I'm not sure how to handle that request<div className="lucky"><button onClick={()=>location.href = 'http://localhost:3000'}>Home</button></div></div>);
  }
}
// const INITIAL_STATE = {startup: true, editing: false};
const INITIAL_STATE = {};

const mainReducer = function (state=INITIAL_STATE){
  return state;
};

const reducer = Redux.combineReducers({
  main: mainReducer,
  wiki: wikiReducer,
  userinfo: signInUpReducer

});

const HomeContainer = ReactRedux.connect(
    state => state,
    actions


)(Home);

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

let vdom = <ReactRedux.Provider store={store}>
  <Router history={hashHistory}>
    <div>
      <Route path="/" component={AppLayout}>
        <IndexRoute component={HomeContainer}/>
        <Route path="/page/:title" component={wikiContainer}/>
        <Route path="/signin" component={SignInUpContainer}/>
        <Route path="/*" component={SayWhat}/>
      </Route>
    </div>
  </Router>
</ReactRedux.Provider>;

ReactDOM.render(
  vdom,
  document.getElementById('root')
);
