import React, { Component } from 'react';

export default class Overlay extends Component {

  render() {
    return (
      <div id="myNav" className={"overlay "+this.props.visibility}>
        <a href="#" className="closebtn" onClick={this.props.onClose}>&times;</a>
        <div id="overlay-content" className="overlay-content">
          {Math.round(this.props.total*10)/10}
        </div>
      </div>
    );
  }
}
