import { Component } from 'react'
import WorldClock from './WorldClock'

export interface Clock {
  id: string
  name: string
  utcOffset: number
}

interface WorldClockListProps {
  clocks: Clock[]
  onDelete: (id: string) => void
}

class WorldClockList extends Component<WorldClockListProps> {
  render() {
    const { clocks, onDelete } = this.props

    if (clocks.length === 0) {
      return (
        <div className="empty-state">
          <p className="empty-title">Здесь появятся ваши часы</p>
          <p>Укажите город и его смещение UTC в форме выше.</p>
        </div>
      )
    }

    return (
      <div className="clock-list">
        {clocks.map((clock) => (
          <WorldClock
            key={clock.id}
            id={clock.id}
            name={clock.name}
            utcOffset={clock.utcOffset}
            onDelete={onDelete}
          />
        ))}
      </div>
    )
  }
}

export default WorldClockList
