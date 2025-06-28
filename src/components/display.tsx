import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Score from '../utils/score'
import * as Actions from '../actions'
import { Row } from '../types'
import { RootState } from '../reducers'

interface ScoreDisplayProps {
  scores: Row[][];
  undoLastScore: () => void;
  clearCurrent: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = (props) => {
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

function mapStateToProps(state: RootState) {
  return {
    scores: state.scores
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      undoLastScore: Actions.undoLastScore,
      clearCurrent: Actions.clearCurrent
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreDisplay)
