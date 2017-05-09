import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import CounterContainer from './counter/Counter';
import counterReducer from './counter/Counter.reducer';
import GalleryContainer from './gallery/Gallery';
import galleryReducer from './gallery/Gallery.reducer';
import DragonGameContainer from './dragon/Dragon';
import dragonGameReducer from './dragon/Dragon.reducer';
import WeatherContainer from './weather/Weather';
import weatherReducer from './weather/Weather.reducer';

import AppLayout from './application/Application';
import HomePage from './home/Home';
import './index.css';

const reducer = Redux.combineReducers({
  theCount: counterReducer,
  galleryInfo: galleryReducer,
  dragonGame: dragonGameReducer,
  weather: weatherReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <div>
        <Route path="/" component={AppLayout}>
          <IndexRoute component={HomePage}/>
          <Route path="/home" component={HomePage}/>
          <Route path="/counter" component={CounterContainer}/>
          <Route path="/gallery" component={GalleryContainer}/>
          <Route path="/dragon" component={DragonGameContainer}/>
          {/* <Route path="/weather" component={WeatherContainer}/> */}
          <Route path="/weather/:name" component={WeatherContainer}/>
        </Route>
      </div>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
