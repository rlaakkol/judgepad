import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default class ScorePicker extends Component {
  constructor(props) {
    super(props);

    this.state = { value: this.props.value };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.handleValueChange(this.props.id, value);
  }

  render() {
    const buttons = [...Array(11).keys()].map(i =>
      <ButtonGroup
        key={`row${this.props.id.toString()}btn${i.toString()}`}
      >
        <Button
          className={`button${i.toString()}`}
          bsSize="large"
          bsStyle="default"
          active={this.props.value === i}
          onClick={() => this.handleChange(i)}
        >
          {i}
        </Button>
      </ButtonGroup>);

    return (
      <div className="row equal">
        <div className="col-lg-4 rowlabel">
          <input
            type="text"
            size="30"
            value={this.props.label}
            onChange={event => this.props.handleLabelChange(event.target.value, this.props.id)}
          />
        </div>
        <div className="col-lg-8">
          <ButtonGroup justified>
            {buttons}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

ScorePicker.propTypes = {
  handleLabelChange: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  handleValueChange: React.PropTypes.func.isRequired,
};
