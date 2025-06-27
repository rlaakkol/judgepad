import { render, screen } from '../../test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import App from './app.jsx'

const mockLabels = {
  id: 'dantai',
  name: 'Dantai Hokei',
  labels: [
    'Form preservation, synchronization',
    'Technical purity',
    'Technical difficulty',
    'Breathing and effectiveness',
    'Impression',
    'Additional point'
  ]
}

describe('App', () => {
  it('renders the navbar with the correct title', () => {
    render(
      <App
        labels={mockLabels}
        alerts={[]}
        removeAlert={vi.fn()}
        changeLabels={vi.fn()}
        undoLastScore={vi.fn()}
        clearScores={vi.fn()}
      />
    )
    expect(screen.getByText('Dantai Hokei')).toBeInTheDocument()
  })

  it('renders the Alerts component', () => {
    render(
      <App
        labels={mockLabels}
        alerts={[]}
        removeAlert={vi.fn()}
        changeLabels={vi.fn()}
        undoLastScore={vi.fn()}
        clearScores={vi.fn()}
      />
    )
    expect(screen.getByTestId('alerts')).toBeInTheDocument()
  })
})
