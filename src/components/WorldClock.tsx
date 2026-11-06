import { Component } from 'react'

interface WorldClockProps {
  id: string
  name: string
  utcOffset: number
  onDelete: (id: string) => void
}

interface WorldClockState {
  currentTime: Date
}

class WorldClock extends Component<WorldClockProps, WorldClockState> {
  private timerId: ReturnType<typeof setInterval> | null = null

  state: WorldClockState = {
    currentTime: new Date()
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({ currentTime: new Date() })
    }, 1000)
  }

  componentWillUnmount() {
    if (this.timerId !== null) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  }

  getCityTime(): string {
    const { currentTime } = this.state
    const { utcOffset } = this.props

    const cityTime = new Date(
      currentTime.getTime() + utcOffset * 3600000
    )

    return cityTime.toLocaleTimeString('ru-RU', {
      timeZone: 'UTC',
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  render() {
    const { id, name, utcOffset, onDelete } = this.props

    return (
      <article className="clock">
        <button
          className="delete-clock"
          type="button"
          onClick={() => onDelete(id)}
          aria-label={`Удалить часы ${name}`}
        >
          ×
        </button>

        <h3>{name}</h3>
        <p className="clock-time">{this.getCityTime()}</p>
        <p className="clock-offset">UTC{utcOffset >= 0 ? '+' : ''}{utcOffset}</p>
      </article>
    )
  }
}

export default WorldClock
