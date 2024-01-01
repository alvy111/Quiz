const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which planet is known as the "Red Planet"?',
    answers: [
      { text: 'Venus', correct: false },
      { text: 'Mercury', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Earth', correct: false },
    ]
  },
  {
    question: 'Who wrote "Romeo and Juliet"??',
    answers: [
      { text: 'William Shakespeare', correct: true },
      { text: 'Helen Keller', correct: false },
      { text: 'Chetan Bhagat', correct: false },
      { text: 'Michael Walls', correct: false }
    ]
  },
  {
    question: 'What is the national flower of India',
    answers: [
      { text: 'Jasmine', correct: false },
      { text: 'Lotus', correct: true },
      { text: 'Sunflower', correct: false },
      { text: 'Hibiscus', correct: false }
    ]
  },
  {
    question: 'Which gas do plants absorb from the atmosphere?',
    answers: [
      { text: 'Oxygen', correct: false },
      { text: 'Carbon Dioxide', correct: true },
      { text: 'Nitrogen', correct: false },
      { text: 'Hydrogen', correct: false },
    ]
  }
]