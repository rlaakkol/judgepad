import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/app'
import Scorecard from './components/scorecard'
import ScoreDisplay from './components/display'
import HistoryTable from './components/historytable'
import HelpPage from './components/helppage'
import rootReducer from './reducers'
import { ADD_ALERT } from './actions'

const reducer = storage.reducer(rootReducer)
const engine = createEngine('judgepad')
const middleware = storage.createMiddleware(engine, [ADD_ALERT])
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

const load = storage.createLoader(engine)
load(store).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Scorecard} />
          <Route path="/scorecard" component={Scorecard} />
          <Route path="/display" component={ScoreDisplay} />
          <Route path="/history" component={HistoryTable} />
          <Route path="/help" component={HelpPage} />
        </Route>
      </Router>
    </Provider>,
    document.querySelector('.main')
  )
})
