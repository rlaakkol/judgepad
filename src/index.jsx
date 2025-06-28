import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider, connect } from 'react-redux'
import { createStore, bindActionCreators } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './i18n'
import App from './components/app.jsx'
import Scorecard from './components/scorecard.jsx'
import ScoreDisplay from './components/display.jsx'
import HistoryTable from './components/historytable.jsx'
import HelpPage from './components/helppage.jsx'
import rootReducer from './reducers'
import * as Actions from './actions'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

const mapStateToProps = state => ({
  alerts: state.alerts,
  labels: state.labels,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeLabels: Actions.changeLabels,
      undoLastScore: Actions.undoLastScore,
      clearScores: Actions.clearScores,
      removeAlert: Actions.removeAlert,
    },
    dispatch
  )

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

const ConnectedScorecard = connect(
  state => ({
    rows: state.current,
    history: state.scores,
    labels: state.labels,
  }),
  dispatch =>
    bindActionCreators(
      {
        updateCurrent: Actions.updateCurrent,
        clearCurrent: Actions.clearCurrent,
        addScore: Actions.addScore,
      },
      dispatch
    )
)(Scorecard)

const container = document.querySelector('.main')
const root = ReactDOM.createRoot(container)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnectedApp />}>
            <Route index element={<ConnectedScorecard />} />
            <Route path="scorecard" element={<ConnectedScorecard />} />
            <Route path="display" element={<ScoreDisplay />} />
            <Route path="history" element={<HistoryTable />} />
            <Route path="help" element={<HelpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
