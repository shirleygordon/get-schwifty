import { EMPTY_NUMBER } from '../../common/common.js';
import { isDone } from './game.js';

export function generateBoard(size) {
    let board;

    do {
        board = tryGenerateBoard(size);
    } while (!isValid(board, size) || isDone(board));

    return board;
}

function tryGenerateBoard(size) {
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

function isValid(board, size) {
    let sum = 0;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] != EMPTY_NUMBER) {
                sum += countSmallerFollowingNumbers(board, size, i * size + j + 1, board[i][j]);   
            } else if (size % 2 == 0) {
                sum += i + 1;  
            }
        }
    }

    return sum % 2 == 0;
}

function countSmallerFollowingNumbers(board, size, startingIndex, currentNum) {
    let count = 0;

    for (startingIndex; startingIndex < size ** 2; startingIndex++) {
        let [line, column] = convertIndex(startingIndex, size);

        if (board[line][column] != EMPTY_NUMBER && board[line][column] < currentNum) {
            count++;
        }
    }

    return count;
}

function convertIndex(index, size) {
    let i = Math.floor(index / size);
    let j = index % size;

    return [i, j];
}