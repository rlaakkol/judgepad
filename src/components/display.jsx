import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Score from '../utils/score'
import * as Actions from '../actions'

const ScoreDisplay = props => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  const isNav = searchParams.get('navigation')
  const rows = props.scores[props.scores.length - 1]
  const score = rows ? Math.round(Score.calcTotal(rows) * 10) / 10 : t('display.notApplicable')
  const buttons = isNav
    ? ''
    : <div className="action-buttons">
        <div className="row justify-content-center gx-5">
          <div className="col-md-3 d-grid">
            <button
              className="btn btn-warning"
              onClick={() => {
                props.undoLastScore()
                navigate('/scorecard')
              }}
            >
              {t('display.cancel')}
            </button>
          </div>
          <div className="col-md-3 d-grid">
            <button
              className="btn btn-success"
              onClick={() => {
                props.clearCurrent()
                navigate('/scorecard')
              }}
            >
              {t('display.next')}
            </button>
          </div>
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
  scores: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.number,
        id: PropTypes.number,
        value: PropTypes.number
      })
    )
  ).isRequired,
  undoLastScore: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreDisplay)
