// API
// const questions = 'https://opentdb.com/api.php?amount=10'
const categories = 'https://opentdb.com/api_category.php'
const users = [
'iconsminds-Globe-2','iconsminds-Open-Book','iconsminds-Video-Tripod','iconsminds-Music-Note2',
'iconsminds-Cinema','iconsminds-Monitor','iconsminds-Gamepad', 'iconsminds-Chess-Board',
'iconsminds-Microscope','iconsminds-Cloud-Computer','iconsminds-Pi','iconsminds-Thunder',
'iconsminds-Soccer-Ball','iconsminds-Map','iconsminds-Fountain-Pen','iconsminds-The-WhiteHouse',
'iconsminds-Brush','iconsminds-Add-UserStar','iconsminds-Cheetah','iconsminds-Car-3',
'iconsminds-Spider','iconsminds-Monitor-phone','iconsminds-Fox','iconsminds-Digital-Drawing']
let i = -1
// Llamar API
fetch (categories)
  .then((response) => response.json())
  .then((loadedCategories) => {
    getAndPrintCategories(loadedCategories)
  })
  .catch((notFoundCategories) => console.error(notFoundCategories))

function getAndPrintCategories(loadedCategories) {
  const selectCategory = document.getElementById('selectCategory')
  const printHTMLCategory = loadedCategories.trivia_categories.map((loadedCategories) => {
    i++
    return `<div class="col mb-4">
              <div class="card h-100 color-card card-text-color options" onclick="selectId(this.id)" id="category${loadedCategories.id}">
                <div class="card-body d-flex flex-column justify-content-center d-flex flex-column align-items-center">
                  <span class="text-center pt-3 mb-3"><i class="${users[i]} icon-size"></i></span>
                  <h5 class="card-title text-center">${loadedCategories.name}</h5>
                </div>
              </div>
            </div>`
  })
  const joinInHTML = printHTMLCategory.join("")
  selectCategory.innerHTML = joinInHTML
}


// const options = Array.from(document.querySelectorAll('.options'))
// alert(options)

// const options = Array.from(document.getElementsByClassName('options')) 
// alert(options)
// alert('asd')

let optionSelected = []
function selectId (idCategory) {
  localStorage.setItem('idCategory', idCategory)
  window.location.assign('/quiz.html');
  // alert(idCategory) 
}


// let optionSelected = []
// function selectId () {
//   const options = Array.from(document.getElementsByClassName('options'))
//   options.forEach((option) => {
//     option.addEventListenner('click', (e) => {
//       const selectedChoice = e.target
//       alert('ae')
//       // const selectedAnswer = selectedChoice.dataset['number']
//     })
//   })  
// }


// setTimeout(() => {
//   const options = Array.from(document.getElementsByClassName('options'))
// }, 1000);