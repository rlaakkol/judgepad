import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import * as Actions from '../actions'
import Score from '../utils/score'

const SubmitButton = props => {
  const navigate = useNavigate()
  const handleClick = () => {
    props.addScore(props.rows)
    const id = uuidv4()
    props.addAlert('Saved', 'alert alert-success', id)
    setTimeout(() => props.removeAlert(id), 2000)
    navigate(props.nextPage)
  }
  const disabled = Score.isTie(props.history, props.rows)
  return (
    <Button
      className={props.className}
      onClick={handleClick}
      disabled={disabled}
    >
      {props.children}
    </Button>
  )
}

function mapStateToProps(state) {
  return {
    rows: state.current,
    history: state.scores
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addScore: Actions.addScore,
      addAlert: Actions.addAlert,
      removeAlert: Actions.removeAlert
    },
    dispatch
  )
}

SubmitButton.propTypes = {
  nextPage: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      id: PropTypes.number,
      value: PropTypes.number
    })
  ).isRequired,
  history: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.number,
        id: PropTypes.number,
        value: PropTypes.number
      })
    )
  ).isRequired,
  addScore: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
  addAlert: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton)
