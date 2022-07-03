export function generateBoard(size) {
    let availableNumbers = [...Array(size ** 2).keys()];
    let board = [];

    for (let i = 0; i < size; i++) {
        board.push(Array(size).fill(0));
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let currentIndex = Math.floor(Math.random() * availableNumbers.length);
            let currentNumber = availableNumbers[currentIndex];

            // Remove current number from available numbers.
            availableNumbers.splice(currentIndex, 1);

            board[i][j] = currentNumber;
        }
    }

    return board;
}