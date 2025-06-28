import React from 'react'
import { useTranslation } from 'react-i18next'

import _ from 'lodash'

import ScorePicker from './scorepicker'
import SubmitButton from './submit'
import Score from '../utils/score'
import { Row, Labels } from '../types'

interface ScorecardProps {
  rows: Row[];
  history: Row[][];
  labels: Labels;
  clearCurrent: () => void;
  addScore: (scoreCard: Row[]) => void;
  updateCurrent: (rows: Row[]) => void;
}

const Scorecard: React.FC<ScorecardProps> = (props) => {
  const { t } = useTranslation()
  const handleValueChange = (id: number, value: number) => {
    const rows = _.cloneDeep(props.rows)
    const i = rows.findIndex(e => e.id === id)
    rows[i].value = value
    props.updateCurrent(rows)
  }

  const rows = props.rows
    .slice(0, 5)
    .map((rowprops, i) => {
      const { key, ...rest } = rowprops
      return (
        <ScorePicker
          key={key}
          {...rest}
          label={props.labels.labels[i]}
          handleValueChange={handleValueChange}
        />
      )
    })
  const extraRow = props.rows[5]
  const { key, ...rest } = extraRow
  const extraPicker = (
    <ScorePicker
      key={key}
      {...rest}
      label={props.labels.labels[5]}
      handleValueChange={handleValueChange}
      isExtra
    />
  )
  const total = Score.calcTotal(props.rows)
  const standing = Score.getStanding(props.history, props.rows)
  const isTie = Score.isTie(props.history, props.rows)
  const warningSign = <i className="fa fa-warning" style={{ color: 'red' }} />
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <strong>{t('scorecard.team')} {props.history.length + 1}</strong>
        </div>
      </div>
      <hr className="my-3" />
      {rows}
      {extraPicker}
      <hr className="my-3" />
      <div className="row equal">
        <div className="col-md-6">
          <strong>{t('scorecard.totalScore')}:</strong> {Math.round(total * 10) / 10}
        </div>
        <div className="col-md-6">
          <strong>{t('scorecard.currentStanding')}:</strong>
          {' '}
          {standing}
          {' '}
          {isTie ? warningSign : ''}
        </div>
      </div>
      <div className="action-buttons">
        <div className="row justify-content-center gx-5">
          <div className="col-md-3 d-grid">
            <button className="btn btn-warning" onClick={props.clearCurrent}>
              {t('scorecard.clear')}
            </button>
          </div>
          <div className="col-md-3 d-grid">
            <SubmitButton className="btn btn-success" nextPage="/display">
              {t('scorecard.saveAndDisplay')}
            </SubmitButton>
          </div>
        </div>
        <div className="row justify-content-center mt-2">
          <div className="col-md-6 text-center">
            {isTie ? t('scorecard.equalPointsNotPossibleToSave') : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scorecard
