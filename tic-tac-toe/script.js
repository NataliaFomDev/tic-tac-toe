document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    let currentPlayer = "X";
    let gameEnded = false;

// установка значка Х или О
let movesCount = 0; // переменная для подсчета ходов

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!cell.classList.contains("x") && !cell.classList.contains("o") && !gameEnded) {
            cell.classList.add(currentPlayer.toLowerCase());
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            movesCount++; // Увеличиваем счетчик ходов

            const winner = checkWinner();
            if (winner) {
                gameEnded = true;
                setTimeout(() => {
                    alert(`${winner} wins after ${movesCount} moves!`);
                    saveGameResult(winner, movesCount); // Передаем количество ходов
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
        gameEnded = false;
    });

    // Проверка на выигрышные комбинации (горизонтали, вертикали, диагонали)
    function checkWinner() {
        const cells = document.querySelectorAll(".cell");
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтали
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикали
            [0, 4, 8], [2, 4, 6] // Диагонали
        ];
        
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                cells[a].classList.contains("x") &&
                cells[b].classList.contains("x") &&
                cells[c].classList.contains("x")
            ) {
                return "X"; // Победа игрока X
            }
            if (
                cells[a].classList.contains("o") &&
                cells[b].classList.contains("o") &&
                cells[c].classList.contains("o")
            ) {
                return "O"; // Победа игрока O
            }
        }
        
            // Проверка на ничью
            if ([...cells].every(cell => cell.classList.contains("x") || cell.classList.contains("o"))) {
                return "Draw"; // Ничья
            }
        
            return null; // Игра продолжается
        }        

    // сохранение резльутатов игр в local storage
    function saveGameResult(winner, movesCount) {
        const existingResults = JSON.parse(localStorage.getItem('gameResults')) || [];
        existingResults.push({ winner, movesCount, date: new Date() });
        localStorage.setItem('gameResults', JSON.stringify(existingResults));
    }
    
});

// Получите результаты из Local Storage
const results = JSON.parse(localStorage.getItem('gameResults')) || [];

// Получите контейнер, в котором будете отображать результаты
const resultsContainer = document.getElementById('results-container');

// Создайте список и добавьте каждый результат в виде элемента списка
const resultList = document.createElement('ul');
results.forEach(result => {
    const listItem = document.createElement('li');
    listItem.textContent = `Winner: ${result.winner}, Moves: ${result.movesCount}`;
    resultList.appendChild(listItem);
});

// Добавьте список в контейнер
resultsContainer.appendChild(resultList);
