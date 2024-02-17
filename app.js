

//^her birine ulaşmak için bu yol uzun yol... tercih etme !!!
/*
let rock = document.getElementById('rock')
let paper = document.getElementById('paper')
let scissor = document.getElementById('scissor')

const yourChoiceDiv= document.getElementById('your-choice')

rock.addEventListener('click', ()=>{
    yourChoiceDiv.innerHTML = `<img src="./assets/rock.png"/>`
})
paper.addEventListener('click', ()=>{
    yourChoiceDiv.innerHTML = `<img src="./assets/paper.png"/>`
})
scissor.addEventListener('click', ()=>{
    yourChoiceDiv.innerHTML = `<img src="./assets/scissor.png"/>`
})
*/

//& seçiciler

const yourChoiceDiv= document.getElementById('your-choice')
const selectionArticle = document.querySelector('.selection')
const pcChoiceDiv = document.getElementById('pc-choice')

const messagePar = document.querySelector('.message')

//& score
const scoreCardSection = document.querySelector('.score-card')
const yourScoreSpan = document.getElementById('your-score')
const pcScoreSpan = document.getElementById('pc-score')
const domTopScore = document.getElementById('top-score')

//& değişkenler
let userSelection;
let pcRandom;
let pcArr= [];
const userSelectImg = document.createElement('img')
const pcSelectImg = document.createElement('img')




//& colors
const YELLOW = "#ffc538"
const RED = "#fb778b"
const GREEN = "#5ab7ac"

//& modal
const modalCardSection = document.querySelector('.modal-card')
const finalMessagePar = document.getElementById('final-message')
const playAgainButton = document.getElementById('play-again')



//console.log(selectionArticle);


//& event listeners

selectionArticle.addEventListener('click', (e)=>{
   // console.log(e.target.id);
   userSelection = e.target.id
   //console.log(userSelection);

   if (userSelection && !(pcScoreSpan.textContent === '10' || yourScoreSpan.textContent === '10')) {
      userSelectImg.src=`./assets/${userSelection}.png`;
      userSelectImg.id= `you`;
      yourChoiceDiv.appendChild(userSelectImg)
      creatPcSelection()
   }

})

//! eventListener ile birşeyi dinlerken target verildiğinde o grup içinden bir tanesini seçiyor. üstteki örnekte 3 eventli selection'ı seçtik ve dinledik. yorum kısmında tek tek yaptığımız işi bir üst satırdaki işlem ile çok daha kısa olarak çözdük.


playAgainButton.addEventListener('click', ()=>{
    window.location.reload()
})


//& fonksiyonlar

const creatPcSelection = () => {
    pcArr = ['rock', 'paper', 'scissor','rock', 'paper', 'scissor'];
    pcRandom = pcArr[Math.trunc(Math.random()*6)]
    console.log(pcRandom);
    pcSelectImg.src=`./assets/${pcRandom}.png`;
    pcSelectImg.id= `pcs`;
    pcChoiceDiv.appendChild(pcSelectImg);

    calculateResult()
}

const calculateResult = () => {
    if (userSelection == pcRandom){
        draw()
    } else {
        if (userSelection === 'rock') {
            pcRandom === 'paper' ? youLost(userSelection) : youWin(pcRandom)
        } else if (userSelection === 'paper') {
            pcRandom === 'scissor' ? youLost(userSelection) : youWin(pcRandom)
        } else if (userSelection === 'scissor') {
            pcRandom === 'rock' ? youLost(userSelection) : youWin(pcRandom)
        }
    }
    if (pcScoreSpan.textContent === '10' || yourScoreSpan.textContent === '10'){
        openModal()
    }
}

const draw = () => {
    messagePar.textContent = `It's a draw!  🦀`;
    messagePar.style.color= "black"
    messagePar.style.backgroundColor= YELLOW
    scoreCardSection.style.color= YELLOW
}

const youLost = (youSelect) => {
    messagePar.textContent = `You Lost!  😔`;
    messagePar.style.backgroundColor= RED
    scoreCardSection.style.color= RED
    pcScoreSpan.textContent++
//    document.getElementById('youSelect').getAttribute('src')   get attribute'u gösteriyor
    document.getElementById('you').setAttribute('src', `./assets/${youSelect}l.png`)
}



const youWin = (pcRandom) => {
    messagePar.textContent = `You Win!  😎`;
    messagePar.style.backgroundColor= GREEN
    scoreCardSection.style.color= GREEN
    yourScoreSpan.textContent++
    document.getElementById('pcs').setAttribute('src', `./assets/${pcRandom}l.png`)
}

const openModal = () =>{
    modalCardSection.classList.add("show")
    if (yourScoreSpan.textContent === '10') {
        finalMessagePar.textContent = 'You Win 🎉🎉'
        playAgainButton.style.color = GREEN
        document.querySelector('.modal').style.backgroundColor=GREEN
    }
}


//! localStorage kullanımı ... set, get, remove item
// localStorage.setItem('highScore', 10)
// localStorage.setItem('Hallo', 'Welt')

// let x = localStorage.setItem('highScore')

// console.log(typeof x);

// localStorage.removeItem('Hallo')


//&  update top Score

// ilk başlangıçta localstorage de tutulan skoru yazdır

const storedScore = localStorage.getItem('highScore')
const topScore = storedScore ? `10 : ${storedScore}` : "0 : 0"

//console.log(topScore);

//ilk açılışta high score varsa yaz yoksa 0 : 0 yaz
domTopScore.textContent = topScore

const updateTopScore = () => {
    //eğer ilk oynanışsa veya oyun sonunda update yapılacaksa
    if (!storedScore || storedScore > +pcScoreSpan.textContent){
        localStorage.setItem('highScore', pcScoreSpan.textContent)
    }
}

//& localStorage'daki verinin kullanıcı onayıyla silinmesi

domTopScore.addEventListener('dblclick', ()=>{
    if(domTopScore.textContent != "0 : 0"){
        if (confirm ('Are you sure? Do you want to reset the top score?')){
            localStorage.removeItem('highScore');
            domTopScore.textContent = "0 : 0"
        }
    }
})