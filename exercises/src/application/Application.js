import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Application.actions';
import {Link} from 'react-router';

// class AppLayout extends React.Component {
//   render() { return (
//     <div>
//       <ul className="nav">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/counter">Counter</Link></li>
//         <li><Link to="/gallery">Gallery</Link></li>
//         <li><Link to="/dragon">Dragon Game</Link></li>
//         <li><Link to="/weather">Weather</Link></li>
//
//       </ul>
//       <div>
//         {this.props.children}
//       </div>
//     </div>)
//
//   }
// }

function AppLayout({children}){
  return (
    <div>
      <ul className="nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/counter">Counter</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/dragon">Dragon Game</Link></li>
        <li><Link to="/weather/Atlanta">Atlanta</Link></li>
        <li><Link to="/weather/Celebration">Celebration</Link></li>
      </ul>
      <div>
        {children}
      </div>
    </div>)

}

const AppContainer = ReactRedux.connect(
  state => ({
    count: state.theCount
  }),
  actions
)(AppLayout);

export default AppLayout;
