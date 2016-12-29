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
      <ButtonGroup
        key={"row"+this.props.id.toString()+"btn"+i.toString()}>
        <Button
          bsSize={"large"}
          bsStyle={"default"}
          active={this.props.value == i}
          onClick={event => this.handleChange(i)}>
          {i}
        </Button>
      </ButtonGroup>)
    return (
      <div className="row equal">
        <div className="col-sm-2 rowlabel">
          <input type="text" value={this.props.label}
            onChange={(event) => this.props.handleLabelChange(event.target.value, this.props.id)} />
        </div>
        <div className="col-sm-10">
          <ButtonGroup justified>
            {buttons}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
