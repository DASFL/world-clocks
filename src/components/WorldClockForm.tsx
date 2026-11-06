import { Component } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

interface WorldClockFormProps {
  onAdd: (name: string, utcOffset: number) => void
}

interface WorldClockFormState {
  name: string
  utcOffset: string
  error: string
}

class WorldClockForm extends Component<
  WorldClockFormProps,
  WorldClockFormState
> {
  state: WorldClockFormState = {
    name: '',
    utcOffset: '',
    error: ''
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (name === 'name' || name === 'utcOffset') {
      this.setState({ [name]: value, error: '' } as Pick<
        WorldClockFormState, 'name' | 'utcOffset' | 'error'
      >)
    }
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name = this.state.name.trim()
    const offsetText = this.state.utcOffset.trim()
    const utcOffset = Number(offsetText)

    if (
      !name ||
      !offsetText ||
      !Number.isFinite(utcOffset) ||
      utcOffset < -12 ||
      utcOffset > 14
    ) {
      this.setState({
        error: 'Введите название города и смещение UTC от −12 до +14.'
      })
      return
    }

    this.props.onAdd(name, utcOffset)

    this.setState({
      name: '',
      utcOffset: '',
      error: ''
    })
  }

  render() {
    return (
      <form className="clock-form" onSubmit={this.handleSubmit} noValidate>
        <label>
          Город
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Например, Москва"
            required
            aria-describedby={this.state.error ? 'form-error' : undefined}
          />
        </label>

        <label>
          Временная зона (UTC)
          <input
            type="number"
            name="utcOffset"
            value={this.state.utcOffset}
            onChange={this.handleChange}
            placeholder="Например, +3"
            min="-12"
            max="14"
            step="any"
            required
            aria-describedby={this.state.error ? 'utc-hint form-error' : 'utc-hint'}
          />
          <span className="field-hint" id="utc-hint">От −12 до +14, включая дробные значения: 5.5</span>
        </label>

        <button type="submit">Добавить</button>
        {this.state.error && (
          <p className="form-error" id="form-error" role="alert">
            {this.state.error}
          </p>
        )}
      </form>
    )
  }
}

export default WorldClockForm
