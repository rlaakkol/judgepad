import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import Score from '../utils/score'
import * as Actions from '../actions'
import { RootState } from '../reducers'

const ScoreDisplay: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const scores = useSelector((state: RootState) => state.scores)

  const isNav = searchParams.get('navigation')
  const rows = scores[scores.length - 1]
  const score = rows ? Math.round(Score.calcTotal(rows) * 10) / 10 : t('display.notApplicable')
  const buttons = isNav
    ? ''
    : <div className="action-buttons">
        <div className="row justify-content-center gx-5">
          <div className="col-md-3 d-grid">
            <button
              className="btn btn-warning"
              onClick={() => {
                dispatch(Actions.undoLastScore())
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
                dispatch(Actions.clearCurrent())
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

export default ScoreDisplay
