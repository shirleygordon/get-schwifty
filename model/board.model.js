import { default as Observable } from "./observable.js";
import { EMPTY_NUMBER } from "../common/common.js";

class BoardModel extends Observable {
    constructor(size) {
        super();
        this.board = this.generateBoard(size);
        this.solvedMessage = "";
    }

    createNewGame(size) {
        this.board = this.generateBoard(size);
        this.solvedMessage = "";
        this.notify(this);
    }

    generateBoard(size) {
        let board;
        
        do {
            board = this.tryGenerateBoard(size);
        } while (!this.isValid(board) || this.isDone(board));
    
        return board;
    }
    
    tryGenerateBoard(size) {
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
    
    isValid(board) {
        const size = board[0].length;
        let sum = 0;
    
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[i][j] != EMPTY_NUMBER) {
                    sum += this.countSmallerFollowingNumbers(board, i * size + j + 1, board[i][j]);   
                } else if (size % 2 == 0) {
                    sum += i + 1;
                }
            }
        }
    
        return sum % 2 == 0;
    }
    
    countSmallerFollowingNumbers(board, startingIndex, currentNum) {
        const size = board[0].length;
        let count = 0;

        for (startingIndex; startingIndex < size ** 2; startingIndex++) {
            let [line, column] = this.convertIndex(startingIndex, size);
            if (board[line][column] != EMPTY_NUMBER && board[line][column] < currentNum) {
                count++;
            }
        }
    
        return count;
    }
    
    convertIndex(index, size) {
        let i = Math.floor(index / size);
        let j = index % size;
    
        return [i, j];
    }

    isDone(board) {
        const size = board[0].length;
        let last = 0;
    
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[i][j] != 0 && last + 1 != board[i][j]) {
                    return false;
                }
    
                last++;
            }
        }
    
        return true;
    }
}

export { BoardModel };