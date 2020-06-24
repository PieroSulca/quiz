const correctAnswers = localStorage.getItem('correctAnswers')
const score = document.getElementById('message')
let message

if (parseInt(correctAnswers) >= 8) {
  message = `<h4>Congratulations!<br>You made <b>${correctAnswers}</b> correct answers</h4>`
}
if (parseInt(correctAnswers) < 8 && parseInt(correctAnswers) >= 5) {
  message = `<h4>Great! You can get better<br>You made <b>${correctAnswers}</b> correct answers</h4>`
}
if (parseInt(correctAnswers) < 5) {
  message = `<h4>Keep trying<br>You made <b>${correctAnswers}</b> correct answers</h4>`
}

score.innerHTML = message