import * as actions from './wikipage.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';

class Wiki extends React.Component {

  componentDidMount(){
    console.log("did moun");
    this.props.fetchPage(this.props.params.title);

  }

  render() {
    console.log("in Wiki render");
    if (this.props.PageInfo) {console.log('render content value: ' + this.props.pageInfo.content)};
    console.log("wiki render was called with param: " + this.props.params.title);
    let editButton = this.props.pageInfo ? <button onClick={() => this.props.toggleEdit()}>Edit</button> : null
    return (<div><h1>Wiki for {this.props.params.title}</h1>
              {this.props.editing ? (<div>
                <div className="title">{this.props.pageInfo.title}</div>
                <textarea onChange={(event) => this.props.updateContent(event)} value={this.props.pageInfo.content} rows='10' cols="100"></textarea>
                <button className="saveButton" onClick={()=>this.props.updatePage(this.props.pageInfo)}>Save</button>
                </div> ): null}
              {!this.props.editing ? <div>
              {editButton}
              {this.props.pageInfo && this.props.pageInfo.title ?<div> <div className="title">{this.props.pageInfo.title}</div><div className="content">{this.props.pageInfo.content}</div></div>:null}
              </div>:null}
          </div>);
  }
}

const WikiContainer = ReactRedux.connect(
    state => state.wiki,
    actions


)(Wiki);

export default WikiContainer;
