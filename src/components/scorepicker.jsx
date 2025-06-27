import React from 'react'
import { Button, ButtonGroup, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ScorePicker = props => {
  const handleChange = value => props.handleValueChange(props.id, value)

  const values = props.isExtra ? [-0.5, 0, 0.5] : [...Array(11).keys()]

  const buttons = values.map(i => (
    <Button
      key={`row${props.id.toString()}btn${i.toString()}`}
      className={`button${i.toString()} scorecard-button`}
      size="large"
      variant="default"
      active={props.value === i}
      onClick={() => handleChange(i)}
    >
      {i}
    </Button>
  ))

  if (props.isExtra) {
    return (
      <div className="row equal">
        <div className="col-lg-4 rowlabel">
          <form onSubmit={event => event.preventDefault()}>
            <Form.Label>
              {props.label}
            </Form.Label>
          </form>
        </div>
        <div className="col-lg-8">
          <div className="row">
            <div className="col-12 d-grid">
              <ButtonGroup>
                {buttons}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="row equal">
      <div className="col-lg-4 rowlabel">
        <form onSubmit={event => event.preventDefault()}>
          <Form.Label>
            {props.label}
          </Form.Label>
        </form>
      </div>
      <div className="col-lg-8">
        <div className="d-grid gap-2">
          <ButtonGroup>
            {buttons}
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}

ScorePicker.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  isExtra: PropTypes.bool
}

export default ScorePicker
