import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

import Score from '../utils/score'
import * as Actions from '../actions'

const ScoreDisplay = props => {
  const isNav = props.location.query.navigation
  const rows = props.scores[props.scores.length - 1]
  const buttons = isNav
    ? ''
    : <div className="row">
        <div className="col-md-2 col-md-offset-3">
          <button
            className="btn btn-warning"
            onClick={() => {
              props.undoLastScore()
              browserHistory.push('/scorecard')
            }}
          >
            Peru
          </button>
        </div>
        <div className="col-md-2 col-md-offset-2">
          <button
            className="btn btn-success"
            onClick={() => {
              props.clearCurrent()
              browserHistory.push('/scorecard')
            }}
          >
            Seuraava
          </button>
        </div>
      </div>
  return (
    <div className="container">
      <h1 className="totaldisp">
        {Math.round(Score.calcTotal(rows) * 10) / 10}
      </h1>
      {buttons}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    scores: state.scores
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      undoLastScore: Actions.undoLastScore,
      clearCurrent: Actions.clearCurrent
    },
    dispatch
  )
}

ScoreDisplay.propTypes = {
  scores: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.number,
        id: React.PropTypes.number,
        value: React.PropTypes.number
      })
    )
  ).isRequired,
  undoLastScore: React.PropTypes.func.isRequired,
  clearCurrent: React.PropTypes.func.isRequired,
  location: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreDisplay)
