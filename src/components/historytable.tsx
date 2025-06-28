import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import Score from '../utils/score'
import { Row, Labels } from '../types'
import { RootState } from '../reducers'

interface HistoryTableProps {
  scores: Row[][];
  current: Row[];
  labels: Labels;
}

const HistoryTable: React.FC<HistoryTableProps> = (props) => {
  const { t } = useTranslation()
  const header = _.range(0, props.scores.length).map(i => (
    <th key={i}>
      {t('historyTable.team')} {i + 1}
    </th>
  ))
  header.push(
    <th key="current">
      {t('historyTable.current')}
    </th>
  )
  const scores = [...props.scores, props.current]
  const rows = _.range(0, scores[0].length).map(i =>
    scores.map((score, j) => <td key={`score${j}${i}`}>{score[i].value}</td>)
  )
  const rowDivs = rows
    ? rows.map((row, i) => (
        <tr key={i}><th>{props.labels.labels[i]}</th>{row}</tr>
      ))
    : props.labels.labels.map((label, i) => <tr key={i}><th>{label}</th></tr>)
  const totals = scores.map((team, i) => (
    <td key={`total${i}`}><em>{Score.calcTotal(team)}</em></td>
  ))
  const standings = scores.map((team, i) => (
    <td key={`standing${i}`}>
      <strong>{Score.getStanding(scores, team)}</strong>
    </td>
  ))

  return (
    <div className="table-responsive">
      <table className="table table-sm table-nonfluid">
        <thead>
          <tr><th>{t('historyTable.categoryTeam')}</th>{header}</tr>
        </thead>
        <tbody>
          {rowDivs}
          <tr>
            <th>{t('historyTable.finalScore')}</th>{totals}
          </tr>
          <tr>
            <th>{t('historyTable.standings')}</th>{standings}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function mapStateToProps(state: RootState) {
  return {
    current: state.current,
    scores: state.scores,
    labels: state.labels
  }
}

export default connect(mapStateToProps)(HistoryTable)
