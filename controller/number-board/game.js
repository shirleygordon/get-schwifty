import { EMPTY_NUMBER } from '../../common/common.js';

export function trySwitchPlaces(board, num) {
    if (num == EMPTY_NUMBER) {
        throw new InvalidChoiceException("Can't switch places with empty square.");
    }

    let index = getIndex(board, num);
    let emptyIndex = getIndex(board, EMPTY_NUMBER);
    let validMove = canSwitchPlaces(index, emptyIndex);

    if (validMove) {
        switchPlaces(board, index, emptyIndex);
        return board;
    }

    throw new InvalidChoiceException("Square must be adjacent to empty square.");
}

export function isDone(board) {
    let last = 0;

    for (let i = 0; i < board[0].length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] != 0 && last + 1 != board[i][j]) {
                return false;
            }

            last++;
        }
    }

    return true;
}

function getIndex(board, num) {
    for (let i = 0; i < board[0].length; i++) {
        let index = board[i].indexOf(num);
        if (index >= 0) {
            return [i, index];
        }
    }
    
    throw new InvalidChoiceException("Invalid choice. Number isn't on the board.");
}

function canSwitchPlaces(index, emptyIndex) {
    if (index[0] == emptyIndex[0] && Math.abs(index[1] - emptyIndex[1]) == 1) {
        return true;
    } else if (index[1] == emptyIndex[1] && Math.abs(index[0] - emptyIndex[0]) == 1) {
        return true;
    }
    
    return false;
}

function switchPlaces(board, index, emptyIndex) {
    board[emptyIndex[0]][emptyIndex[1]] = board[index[0]][index[1]];
    board[index[0]][index[1]] = EMPTY_NUMBER;
}

function InvalidChoiceException(message) {
    const error = new Error(message);
    return error;
}