import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

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
    const buttons = [...Array(11).keys()].map(i =>
      <Button
        key={"row"+this.props.id.toString()+"btn"+i.toString()} bsSize="large"
        bsStyle={"primary"}
        active={this.props.value == i}
        onClick={event => this.handleChange(i)}>
        {i}
      </Button>)
    return (
      <div className="row equal">
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 rowlabel">
          {this.props.label}
        </div>
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <ButtonGroup>
            {buttons}
          </ButtonGroup>
        </div>
        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">{this.props.value}</div>
      </div>
    );
  }
}
