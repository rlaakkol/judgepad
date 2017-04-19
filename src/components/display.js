import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

import Score from '../utils/score'
import * as Actions from '../actions'

const ScoreDisplay = props => {
  const isNav = props.location.query.navigation
  const rows = props.scores[props.scores.length - 1]
  const score = rows ? Math.round(Score.calcTotal(rows) * 10) / 10 : 'N/A'
  const buttons = isNav
    ? ''
    : <div className="row">
        <div className="col-sm-2 col-sm-offset-3">
          <button
            className="btn btn-block btn-warning"
            onClick={() => {
              props.undoLastScore()
              browserHistory.push('/scorecard')
            }}
          >
            Peru
          </button>
        </div>
        <div className="col-sm-2 col-sm-offset-2">
          <button
            className="btn btn-block btn-success"
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
    <div>
      <div className="container">
        <h1 className="totaldisp">
          {score}
        </h1>
      </div>
      <div className="container footer-fixed">
        {buttons}
      </div>
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
