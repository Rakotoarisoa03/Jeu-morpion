const statusDisplay = document.getElementById('jouer');
const resetButton  = document.getElementById('reset');
const cells        = Array.from(document.querySelectorAll('td'));

let gameActive = true;
let currentPlayer = 'X';
let board = ['','','','','','','','',''];

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]           
];

function handleCellPlayed(clickedCell, index) {
  board[index] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  clickedCell.style.color = (currentPlayer === 'X' ? 'green' : 'red');
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = `Joueur ${ currentPlayer === 'X' ? '1 (X)' : '2 (O)' }, à votre tour !`;
}

function handleResultValidation() {
  let roundWon = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Le Joueur ${ currentPlayer === 'X' ? '1 (X)' : '2 (O)' } a gagné !`;
    gameActive = false;
    cells.forEach(c => c.classList.add('disabled'));
    return;
  }

  if (!board.includes('')) {
    statusDisplay.innerHTML = "Match nul !";
    gameActive = false;
  }
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const index = parseInt(clickedCell.getAttribute('data-cell'));

  if (board[index] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, index);
  handleResultValidation();
  if (gameActive) {
    handlePlayerChange();
  }
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = 'X';
  board = ['','','','','','','','',''];
  statusDisplay.innerHTML = "Joueur 1 (X), à votre tour !";
  cells.forEach(c => {
    c.innerHTML = '';
    c.style.color = '';
    c.classList.remove('disabled');
  });
}

statusDisplay.innerHTML = "Joueur 1 (X), à votre tour !";
cells.forEach((cell, idx) => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleRestartGame);
