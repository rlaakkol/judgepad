import { render, screen } from '../../test/test-utils'
import { describe, it, expect } from 'vitest'
import { Alert } from './alert.jsx'

describe('Alert', () => {
  it('renders the alert with the correct text', () => {
    const alert = {
      id: '1',
      text: 'Test Alert',
      style: 'alert-success',
    }
    render(<Alert alert={alert} />)
    expect(screen.getByText('Test Alert')).toBeInTheDocument()
  })
})
