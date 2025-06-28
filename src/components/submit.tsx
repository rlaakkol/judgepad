import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import * as Actions from '../actions'
import Score from '../utils/score'
import { Row } from '../types'
import { RootState } from '../reducers'

interface SubmitButtonProps {
  nextPage: string;
  rows: Row[];
  history: Row[][];
  addScore: (scoreCard: Row[]) => void;
  removeAlert: (id: string) => void;
  addAlert: (text: string, style: string, id: string) => void;
  children: React.ReactNode;
  className: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const handleClick = () => {
    props.addScore(props.rows)
    const id = uuidv4()
    props.addAlert(t('submit.saved'), 'alert alert-success', id)
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

function mapStateToProps(state: RootState) {
  return {
    rows: state.current,
    history: state.scores
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      addScore: Actions.addScore,
      addAlert: Actions.addAlert,
      removeAlert: Actions.removeAlert
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton)
