document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const playerMove = document.getElementById("current-player");
    let currentPlayer = "X";
    let gameEnded = false;
    let movesCount = 0; // переменная для подсчета ходов
    
// установка значка Х или О
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!cell.classList.contains("x") && !cell.classList.contains("o") && !gameEnded) {
            playerMove.textContent = currentPlayer === "X" ? "O" : "X"; // показываем черед хода
            cell.classList.add(currentPlayer.toLowerCase());
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            movesCount++; // увеличиваем счетчик ходов

            const winner = checkWinner();
            if (winner) {
                gameEnded = true;
                setTimeout(() => {
                    alert(`${winner} wins after ${movesCount} moves!`);
                    saveGameResult(winner, movesCount);
                    movesCount = 0;
                }, 0);
            }
        }
    });
});

    // перезаупск игры
    document.getElementById("reset-button").addEventListener("click", () => {
        cells.forEach(cell => {
            cell.classList.remove("x", "o");
        });
        currentPlayer = "X";
        playerMove.textContent = "X";
        gameEnded = false;
        movesCount = 0;
        updateResultsList();
    });
    
    // проверка на выигрышные комбинации (горизонтали, вертикали, диагонали)
    function checkWinner() {
        const cells = document.querySelectorAll(".cell");
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
            [0, 4, 8], [2, 4, 6] // диагонали
        ];
        
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                cells[a].classList.contains("x") &&
                cells[b].classList.contains("x") &&
                cells[c].classList.contains("x")
            ) {
                return "X"; // победа игрока X
            }
            if (
                cells[a].classList.contains("o") &&
                cells[b].classList.contains("o") &&
                cells[c].classList.contains("o")
            ) {
                return "O"; // победа игрока O
            }
        }
        
            // проверка на ничью
            if ([...cells].every(cell => cell.classList.contains("x") || cell.classList.contains("o"))) {
                return "Draw"; // Ничья
            }
        
            return null; // игра продолжается
        }        

    // сохранение резльутатов игр в local storage
    function saveGameResult(winner, movesCount) {
        const existingResults = JSON.parse(localStorage.getItem('gameResults')) || [];
        existingResults.push({ winner, movesCount, date: new Date() });
        localStorage.setItem('gameResults', JSON.stringify(existingResults));
    }
    
});

// обновление результатов игр
function updateResultsList() {
    const results = JSON.parse(localStorage.getItem('gameResults')) || [];
    const resultList = document.getElementById('results-list');
    resultList.innerHTML = '';

    results.forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = `Winner: ${result.winner}, Moves: ${result.movesCount}`;
        resultList.appendChild(listItem);
    });
}

document.getElementById("clear-storage-button").addEventListener("click", () => {
    localStorage.removeItem('gameResults');
    updateResultsList();
});