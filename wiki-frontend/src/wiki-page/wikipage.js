import * as actions from './wikipage.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';

class Wiki extends React.Component {

  componentDidMount(){
    console.log("did mount-Wiki");
    this.props.fetchPage(this.props.params.title);

  }

componentWillReceiveProps(newProps){
    console.log("willrecieveProps-wiki");
    console.log('newProps: ' + newProps.params.title);
    if (newProps.params.title !== this.props.params.title){
      this.props.fetchPage(newProps.params.title);
    }

  }

  render() {
    console.log("in Wiki render");
    let html;
    if (this.props.pageInfo) { html = wikiLinkify(this.props.pageInfo.content) };

    let editButton = this.props.pageInfo ? <button className="editButton" onClick={() => this.props.toggleEdit()}>Edit</button>
                                          : null;


    let noPage = this.props.doesntExist ? <div className="pageNotFoundContainer">
                                            <div className="pageNotFound">Sorry but we couldn't find a page for {this.props.params.title}</div>
                                            <div className="createNewTopic">Click
                                              <button onClick={() => this.props.createPage(this.props.params.title)}
                                                      className="createButton">here</button> to create this page
                                            </div>
                                          </div>
                                        :null;

    let editinghtml = (this.props.editing && !this.props.doesntExist )? (
                <div>
                  <div className="title">{this.props.pageInfo.title}</div>
                  <div className="contentContainer">

                    <textarea className="content" onChange={(event) => this.props.updateContent(event)} value={this.props.pageInfo.content} ></textarea>

                  </div>
                  <button className="saveButton" onClick={()=>this.props.updatePage(this.props.pageInfo)}>Save</button>
                </div> )
                : null;

    let noteditinghtml = (!this.props.editing && !this.props.doesntExist) ?
                      <div>
                        {this.props.pageInfo && this.props.pageInfo.title ?
                          <div>
                            <div className="title">{this.props.pageInfo.title}</div>
                            <div className="contentContainer">
                              <div dangerouslySetInnerHTML={{__html: html}} className="content"></div>
                            </div>
                        </div>
                        :null}
                        {editButton} </div>
                        :null ;

    return (<div>
              {noPage}
              {editinghtml}
              {noteditinghtml}
            </div>);

    function wikiLinkify(contents) {
      return contents.replace(/([A-Z][a-z]+){2,}/g, function(match) {
        return `<a href="#/page/${match}">${match}</a>`;
      });
    }

  }

}

const WikiContainer = ReactRedux.connect(
    state => state.wiki,
    actions


)(Wiki);

export default WikiContainer;
