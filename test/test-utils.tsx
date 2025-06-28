import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { I18nextProvider } from 'react-i18next'
import rootReducer from '../src/reducers'
import i18n from '../src/i18n'

const AllTheProviders = ({ children }) => {
  const store = createStore(rootReducer)
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>{children}</BrowserRouter>
      </I18nextProvider>
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }