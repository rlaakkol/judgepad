import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'

import Score from '../utils/score'

const HistoryTable = props => {
  const header = _.range(0, props.scores.length).map(i => (
    <th key={i}>
      Team {i + 1}
    </th>
  ))
  header.push(
    <th key="current">
      Current
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
          <tr><th>Category/Team</th>{header}</tr>
        </thead>
        <tbody>
          {rowDivs}
          <tr>
            <th>Final score</th>{totals}
          </tr>
          <tr>
            <th>Standings</th>{standings}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

HistoryTable.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.number,
        id: PropTypes.number,
        value: PropTypes.number
      })
    )
  ).isRequired,
  current: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      id: PropTypes.number,
      value: PropTypes.number
    })
  ).isRequired,
  labels: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired
  })
}

function mapStateToProps(state) {
  return {
    current: state.current,
    scores: state.scores,
    labels: state.labels
  }
}

export default connect(mapStateToProps)(HistoryTable)
