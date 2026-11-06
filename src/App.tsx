import { Component } from 'react'
import WorldClockForm from './components/WorldClockForm'
import WorldClockList from './components/WorldClockList'
import type { Clock } from './components/WorldClockList'
import './App.css'

interface AppState {
  clocks: Clock[]
}

class App extends Component<object, AppState> {
  state: AppState = {
    clocks: []
  }

  handleAddClock = (name: string, utcOffset: number) => {
    const newClock: Clock = {
      id: crypto.randomUUID(),
      name,
      utcOffset
    }

    this.setState((prevState) => ({
      clocks: [...prevState.clocks, newClock]
    }))
  }

  handleDeleteClock = (id: string) => {
    this.setState((prevState) => ({
      clocks: prevState.clocks.filter((clock) => clock.id !== id)
    }))
  }

  render() {
    return (
      <main className="world-clocks">
        <header className="page-header">
          <p className="eyebrow">Время без границ</p>
          <h1>Мировые часы</h1>
          <p>Добавьте города, чтобы следить за временем в разных уголках мира.</p>
        </header>

        <WorldClockForm onAdd={this.handleAddClock} />

        <div className="list-heading">
          <h2>Ваши города</h2>
          <p role="status">Добавлено часов: {this.state.clocks.length}</p>
        </div>

        <WorldClockList
          clocks={this.state.clocks}
          onDelete={this.handleDeleteClock}
        />
      </main>
    )
  }
}

export default App
