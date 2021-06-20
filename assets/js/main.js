// Variable to receive the setInterval ID
let count

// Fills with zero according to desired length (if length is less than desired length)
const fillWithZero = (value, desiredLength = 2) => {
  const currentLength = value.length
  return currentLength < desiredLength
    ? "0".repeat(desiredLength - currentLength) + value
    : value
}

// Formats D, H, M and S. The slice(-2) method is applied in order to show 2 digits when value is less than 10
const timeFormat = (dateDiff, format = 'HMS') => {
  switch (format) {
    case 'DHMS':
    case 'DHM':
    case 'DH':
    case 'D':
      return ({
        days: fillWithZero(Math.floor(dateDiff / 86400).toString()),
        hours: fillWithZero(Math.floor((dateDiff % 86400) / 3600).toString()),
        minutes: fillWithZero(Math.floor((dateDiff % 3600) / 60).toString()),
        seconds: fillWithZero(Math.floor(dateDiff % 60).toString())
      })
      break
    case 'HMS':
    case 'HM':
    case 'H':
      return ({
        hours: fillWithZero(Math.floor(dateDiff / 3600).toString()),
        minutes: fillWithZero(Math.floor((dateDiff % 3600) / 60).toString()),
        seconds: fillWithZero(Math.floor(dateDiff % 60).toString())
      })
      break
    case 'MS':
    case 'M':
      return ({
        minutes: fillWithZero(Math.floor(dateDiff / 60).toString()),
        seconds: fillWithZero(Math.floor(dateDiff % 60).toString())
      })
      break
    case 'S':
      return ({
        seconds: fillWithZero(Math.floor(dateDiff).toString())
      })
      break
    default:
      return ({
        days: fillWithZero(Math.floor(dateDiff / 86400).toString()),
        hours: fillWithZero(Math.floor((dateDiff % 86400) / 3600).toString()),
        minutes: fillWithZero(Math.floor((dateDiff % 3600) / 60).toString()),
        seconds: fillWithZero(Math.floor(dateDiff % 60).toString())
      })
  }
  return
}

// Shows remaining time (just an example, this would be attached to countdown state)
const showCounter = (remainingTime, format = 'HMS') => {
  if (format.search('D') >= 0)
    document.querySelector('#days').innerText = remainingTime.days
  if (format.search('H') >= 0)
    document.querySelector('#hours').innerText = remainingTime.hours
  if (format.search('M') >= 0)
    document.querySelector('#minutes').innerText = remainingTime.minutes
  if (format.search('S') >= 0)
    document.querySelector('#seconds').innerText = remainingTime.seconds
  return
}

// Function that gets time difference and, in case this difference is lower than 1 second, clears the interval (count)
const counter = (targetDate, format = 'HMS') => {
  const timeDiff = (new Date(targetDate) - new Date()) / 1000
  if (timeDiff <= 0) {
    showCounter(timeFormat(0, format), format)
    clearInterval(count)
    return
  }
  return showCounter(timeFormat(timeDiff, format), format)
}

// Initializes the counter based on target date
const initCounter = (targetDate = '01/01/2050 00:00', format = 'HMS') => {
  let timeInterval = 1000
  const minorTimeUnit = format[format.length - 1]
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
  counter(targetDate, format)
  count = setInterval(() => counter(targetDate, format), timeInterval)
  return
}

// Creates targetDate and format testing values and updates HTML body to show the counter for test puporse
const testInit = () => {
  // Placeholder targetDate value, just an example
  let targetDate = '06/22/2021 06:34'

  // Placeholder format value ('DHMS', 'DHM', 'DH', 'D', 'HMS', 'HM', 'H', 'MS', 'M', 'S')
  let format = 'DHMS'

  // Updates HTML document to test this function
  if (!document.querySelector('#days') || !document.querySelector('#hours') || !document.querySelector('#minutes') || !document.querySelector('#seconds')) {
    document.querySelector('body').innerHTML = `
      <section id="countdown">
          <p>
              <span id="days"></span>
              <span id="hours"></span>
              <span id="minutes"></span>
              <span id="seconds"></span>
          </p>
      </section>
    `
  }
  // Checks if there is any targetDate and inits the counter (setInterval)
  // We don't need to check it because we can use the initial state.
  targetDate && initCounter(targetDate, format)
  return
}

// Initiates the test
testInit()