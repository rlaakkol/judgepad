import React from 'react';
import { Button, ButtonGroup, FormControl } from 'react-bootstrap';

const ScorePicker = (props) => {
  const handleChange = value =>
    props.handleValueChange(props.id, value);

  const handleTextInput = (event) => {
    event.preventDefault();
    props.handleLabelChange(event.target.value, props.id);
  };

  const buttons = [...Array(11).keys()].map(i =>
    <ButtonGroup
      key={`row${props.id.toString()}btn${i.toString()}`}
    >
      <Button
        className={`button${i.toString()}`}
        bsSize="large"
        bsStyle="default"
        active={props.value === i}
        onClick={() => handleChange(i)}
      >
        {i}
      </Button>
    </ButtonGroup>);

  return (
    <div className="row equal">
      <div className="col-lg-4 rowlabel">
        <form onSubmit={event => event.preventDefault()}>
          <FormControl
            type="text"
            size="30"
            value={props.label}
            onChange={handleTextInput}
          />
        </form>
      </div>
      <div className="col-lg-8">
        <ButtonGroup justified>
          {buttons}
        </ButtonGroup>
      </div>
    </div>
  );
};

ScorePicker.propTypes = {
  handleLabelChange: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  handleValueChange: React.PropTypes.func.isRequired,
};

export default ScorePicker;
