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
      <ButtonGroup>
        <Button
          key={"row"+this.props.id.toString()+"btn"+i.toString()}
          bsSize={"large"}
          bsStyle={"primary"}
          active={this.props.value == i}
          onClick={event => this.handleChange(i)}>
          {i}
        </Button>
      </ButtonGroup>)
    return (
      <div className="row equal">
        <div className="col-sm-2 rowlabel">
          {this.props.label}
        </div>
        <div className="col-sm-10 text-center">
          <ButtonGroup justified>
            {buttons}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
