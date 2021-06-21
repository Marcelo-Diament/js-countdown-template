// Fills with zero according to desired length (if length is less than desired length)
const fillWithZero = (value, desiredLength = 2) => {
  const currentLength = value.length
  return currentLength < desiredLength
    ? "0".repeat(desiredLength - currentLength) + value
    : value
}

// Formats D, H, M and S. The slice(-2) method is applied in order to show 2 digits when value is less than 10
const timeFormatter = (dateDiff, format = 'HMS') => {
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

export { fillWithZero, timeFormatter }