const initialBoard = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

const sudokuBoard = document.getElementById('sudoku-board');

function createBoard() {
    sudokuBoard.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1; 
            input.style.appearance = 'none'; 
            input.addEventListener('input', (e) => {
                if (!/^[1-9]$/.test(e.target.value)) {
                    e.target.value = ''; 
                }
            });

            if (initialBoard[i][j] !== null) {
                input.value = initialBoard[i][j];
                input.disabled = true;
            }

            sudokuBoard.appendChild(input);
        }
    }
}

function checkSudoku() {
    const inputs = document.querySelectorAll('input');
    let board = [];
    let allFilled = true;

    for (let i = 0; i < 9; i++) {
        board[i] = [];
        for (let j = 0; j < 9; j++) {
            const inputValue = inputs[i * 9 + j].value;
            if (!inputValue) {
                allFilled = false;
            }
            board[i][j] = inputValue ? parseInt(inputValue) : null;
        }
    }

    if (!allFilled) {
        alert('Por favor, preencha todo o tabuleiro antes de verificar.');
        return;
    }

    if (isValidSudoku(board)) {
        alert('Parabéns! Você completou o Sudoku corretamente.');
    } else {
        alert('O Sudoku está incorreto. Tente novamente.');
    }
}

function isValidSudoku(board) {
    return checkRows(board) && checkCols(board) && checkSubgrids(board);
}

function checkRows(board) {
    for (let i = 0; i < 9; i++) {
        if (!isValidGroup(board[i])) return false;
    }
    return true;
}

function checkCols(board) {
    for (let i = 0; i < 9; i++) {
        const col = [];
        for (let j = 0; j < 9; j++) {
            col.push(board[j][i]);
        }
        if (!isValidGroup(col)) return false;
    }
    return true;
}

function checkSubgrids(board) {
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            const subgrid = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    subgrid.push(board[row + i][col + j]);
                }
            }
            if (!isValidGroup(subgrid)) return false;
        }
    }
    return true;
}

function isValidGroup(group) {
    const nums = group.filter(n => n !== null);
    return new Set(nums).size === nums.length;
}

function resetSudoku() {
    createBoard();
}

createBoard();
