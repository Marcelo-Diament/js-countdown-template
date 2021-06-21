import { counter } from "./counter/index.js"

const counterMount = () => {
  const countersElements = document.querySelectorAll('.counter')
  for (let counterElement of countersElements) {
    const minDigits = counterElement.dataset.minDigits
    counter(counterElement, minDigits)
  }
}

// Creates targetDate and format testing values and updates HTML body to show the counter for test puporse
const init = () => {
  counterMount()
}

// Initiates the test
window.onload = () => {
  init()
}