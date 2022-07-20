const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;

  this.classList.toggle('flip');
  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkForMatch();
}

function checkEndGame() {
  const disableAll = document.querySelectorAll('.flip');
    if(disableAll.length === 12) {
      setTimeout(() => {
        alert('You won!!! Congrats!');
        newGame();}, 1000);  
    }
}

function newGame() {
  let opcao = prompt('Do you wanna play again?\n (y)es\n (n)o');
    
        if (opcao === 'y') {
          window.location = 'game.html';
        } else if (opcao === 'n') {
          alert('See you soon!');
        } else {
          alert('Excuse me, I did not understand.');
          newGame();
        }
}

function checkForMatch() {
  if(firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    checkEndGame();
    return;
  }

  unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  firstCard.querySelector('img').classList.add('disabled-card');
  console.log(firstCard.querySelector('img').className);
  secondCard.removeEventListener('click', flipCard);
  secondCard.querySelector('img').classList.add('disabled-card');
/*
Transformar img em divs e adicionar efeito de transformar cartas em grayscale após desabilitadas.
*/
  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
      let randomPosition = Math.floor(Math.random() * 12);
      card.style.order = randomPosition;
    })
  })();

cards.forEach((card) => (
  card.addEventListener('click', flipCard)
))