import {Component} from 'react'

import './index.css'

const initialState = {
  timerLimitInMinutes: 25,
  isTimerRunning: false,
  timeInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  increaseLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  decreaseLimit = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 0) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  increaseTimeInSeconds = () => {
    const {timerLimitInMinutes, timeInSeconds} = this.state

    const isTimerCompleted = timeInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds + 1}))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.increaseTimeInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getTimer = () => {
    const {timerLimitInMinutes, timeInSeconds} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const minutesString = minutes > 9 ? minutes : `0${minutes}`
    const secondsString = seconds > 9 ? seconds : `0${seconds}`
    return `${minutesString}:${secondsString}`
  }

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  render() {
    const {timerLimitInMinutes, isTimerRunning, timeInSeconds} = this.state
    const isButtonsDisabled = timeInSeconds > 0

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="app-container">
        <div className="content-container">
          <h1 className="digital-timer-heading">Digital Timer</h1>
          <div className="digital-timer-container">
            <div className="timer-bg-container">
              <div className="timer-container">
                <h1 className="timer">{this.getTimer()}</h1>
                <p className="timer-status">
                  {isTimerRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="operations-container">
              <div className="play-reset-container">
                <div className="play-pause-container">
                  <button
                    type="button"
                    className="play-reset-button"
                    onClick={this.onStartOrPauseTimer}
                  >
                    <img
                      className="play-pause-icon"
                      src={startOrPauseImageUrl}
                      alt={startOrPauseAltText}
                    />
                    <p className="play-pause-text">
                      {isTimerRunning ? 'Pause' : 'Start'}
                    </p>
                  </button>
                </div>
                <div className="play-pause-container">
                  <button
                    type="button"
                    className="play-reset-button"
                    onClick={this.onResetTimer}
                  >
                    <img
                      className="play-pause-icon"
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                    />
                    <p className="play-pause-text">Reset</p>
                  </button>
                </div>
              </div>
              <div className="timer-limit-container">
                <p className="set-timer-text">Set Timer limit</p>
                <div className="increase-decrease-container">
                  <button
                    type="button"
                    className="increase-decrease-button"
                    onClick={this.decreaseLimit}
                    disabled={isButtonsDisabled}
                  >
                    -
                  </button>
                  <p className="timer-limit">{timerLimitInMinutes}</p>
                  <button
                    type="button"
                    className="increase-decrease-button"
                    onClick={this.increaseLimit}
                    disabled={isButtonsDisabled}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
