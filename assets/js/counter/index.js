import { fillWithZero, timeFormatter } from "./helpers.js"

const counter = (counterContainer, minDigits = '2') => {
  // Variable to receive the setInterval ID
  let count

  // Shows remaining time (just an example, this would be attached to countdown state)
  const showCounter = (counterContainer, remainingTime, timeFormat = 'HMS') => {
    for (let counterItem of counterContainer.children) {
      if (timeFormat.search('D') >= 0 && counterItem.id === 'days')
        counterItem.innerText = fillWithZero(remainingTime.days, minDigits)
      if (timeFormat.search('H') >= 0 && counterItem.id === 'hours')
        counterItem.innerText = fillWithZero(remainingTime.hours, minDigits)
      if (timeFormat.search('M') >= 0 && counterItem.id === 'minutes')
        counterItem.innerText = fillWithZero(remainingTime.minutes, minDigits)
      if (timeFormat.search('S') >= 0 && counterItem.id === 'seconds')
        counterItem.innerText = fillWithZero(remainingTime.seconds, minDigits)
    }
    return
  }

  // Function that gets time difference and, in case this difference is lower than 1 second, clears the interval (count)
  const counterChecker = (counterContainer, targetDate, timeFormat = 'HMS') => {
    const timeDiff = (new Date(targetDate) - new Date()) / 1000
    if (timeDiff <= 0) {
      showCounter(counterContainer, timeFormatter(0, timeFormat), timeFormat)
      clearInterval(count)
      return
    }
    return showCounter(counterContainer, timeFormatter(timeDiff, timeFormat), timeFormat)
  }

  // Initializes the counter based on target date
  const initCounter = counterContainer => {
    const { targetDate, timeFormat } = counterContainer.dataset
    let timeInterval = 1000
    const minorTimeUnit = timeFormat[timeFormat.length - 1]
    switch (minorTimeUnit) {
      case 'D':
        timeInterval = 1000 * 60 * 60 * 24
        break
      case 'H':
        timeInterval = 1000 * 60 * 60
        break
      case 'M':
        timeInterval = 1000 * 60
        break
      default:
        timeInterval = 1000
    }
    counterChecker(counterContainer, targetDate, timeFormat)
    count = setInterval(() => counterChecker(counterContainer, targetDate, timeFormat), timeInterval)
    return
  }

  return initCounter(counterContainer)
}

export { counter }