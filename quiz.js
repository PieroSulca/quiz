// traer id(dataset) de la categoria seleccionada
const idCategory = localStorage.getItem('idCategory') // category#
const onlyId = idCategory.substr(8)
let selectedCategory = "https://opentdb.com/api.php?amount=10&category=" + onlyId + "&type=multiple"
const quizGame = document.getElementById('quizGame')
const quiz = document.getElementById('quiz')
const question = document.getElementById('question')
const options = Array.from(document.getElementsByClassName('options'))
let currentQuestion = {}
let acceptingAnswers = false
let questionCounter = 0
let availableQuestions = []
let correctAnswers = 0
let questions = [] // Array de preguntas
const MAX_QUESTIONS = 10 //  esto se puede cambiar en la API

// despues de seleccionar una respuesta
const getNewQuestion = () => {
  //  verificar que hay preguntas y si hay terminar cuando llegue al maximo
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // guardar preguntas correctas
    localStorage.setItem('correctAnswers', correctAnswers)
    //  ir la pagina de resultados
    return window.location.assign('/results.html');
  }
  questionCounter++
  //  eescoger numero aleatorio para luego usarlo
  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  //  escoger pregunta aleatoria
  currentQuestion = availableQuestions[questionIndex]
  // imprimir pregunta generada aleatoriamente
  question.innerHTML = currentQuestion.question
  // imprimir alternativas
  let numberIdForPrint = 0
  options.forEach((option) => {
    numberIdForPrint++
    //imprimir alternativa 
    option.innerHTML = currentQuestion['option' + numberIdForPrint]
    // const number = option.dataset['number']
    // option.innerHTML = currentQuestion['option' + number]
    // const number = option.id
    // option.innerHTML = currentQuestion['option' + id]
  })

  availableQuestions.splice(questionIndex, 1)
  acceptingAnswers = true
}
// al inicio de cada game
const startGame = () => {
  questionCounter = 0
  correctAnswers = 0
  availableQuestions = [...questions]
  getNewQuestion()
}
//  cargar API
fetch(selectedCategory)
  .then((response) => response.json())
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      }
      // guardar respuestas incorrectas en una variale
      const answerOptions = [...loadedQuestion.incorrect_answers]
      // guardar variable para agregar en una posicion random la respuesta correcta
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1
      //  agregar respuesta correcta en la variable random guardada
      answerOptions.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer)
      answerOptions.forEach((option, index) => {
        formattedQuestion['option' + (index + 1)] = option
      })
      return formattedQuestion
    })
    startGame()
  })
  .catch((notWork) => console.error(notWork))

//  al hacer click en una opcion para que pase a la sgte pregunta
options.forEach((option) => {
  option.addEventListener('click', (e) => {
    if (!acceptingAnswers) return // si es falso se irá a los resultados
    acceptingAnswers = false
    //  al hacer click
    const selectedOption = e.target
    //  agregar data-number a respuesta seleccionada
    const idSelectedOption = selectedOption.id.substr(6)
    // const selectedAnswer = selectedOption.dataset['number']
    //  comparar si la respuesta seleccionada es la misma que la respuesta correcta
    //  guardada en currenQuestion.answer
    const correctOrIncorrect = idSelectedOption == currentQuestion.answer ? 'correct' : 'incorrect'
    if (correctOrIncorrect === 'correct') {
      correctAnswers += 1
    }
    // selectedOption.parentElement.classList.add(correctOrIncorrect)
    // selectedOption.parentElement.classList.remove(correctOrIncorrect)
    getNewQuestion()
  })
})

// function selectedCategory () {
//   question += idCategory
// }

// function printQuestions(loadedQuestions) {
//   const QAndA = document.getElementById('QAndA')
//   const printQAndA = loadedQuestions.map((loadedQuestions) => {
    
//   })
// }
