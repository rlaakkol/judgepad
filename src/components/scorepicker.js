import React, { Component } from 'react';

export default class ScorePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {value: this.props.value};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.handleValueChange(this.props.id, value);
  }

  render() {
    return (
      <div className="row equal">
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 rowlabel">
          {this.props.label}
        </div>
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <input list="nums" type="range" name="points" min="0" max="10"
            value={this.props.value}
            onChange={event => this.handleChange(event.target.value)}/>
          <datalist id="nums">
            <option label="0">0</option>
            <option label="1">1</option>
            <option label="2">2</option>
            <option label="3">3</option>
            <option label="4">4</option>
            <option label="5">5</option>
            <option label="6">6</option>
            <option label="7">7</option>
            <option label="8">8</option>
            <option label="9">9</option>
            <option label="10">10</option>
          </datalist>
        </div>
        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">{this.props.value}</div>
      </div>
    );
  }
}
