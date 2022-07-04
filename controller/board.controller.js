import { EMPTY_NUMBER } from '../common/common.js';

class BoardController {    
    constructor(model) {
        this.model = model;
    }

    handleEvent(e) {
        e.stopPropagation();
        
        switch (e.type) {
            case "click":
                this.onSquareClick(e.target);
                break;
            default:
                console.log(`Error: unrecognized event: ${e.type} on ${e.target}.`);
        }
    }

    onSquareClick(target) {
        if (this.model.solvedMessage != "") {
            return;
        }

        if (this.model.startTime == undefined) {
            this.model.startTime = new Date();
        }

        let num = parseInt(target.innerText);
        this.trySwitchPlaces(num);

        if (this.model.isDone(this.model.board)) {
            this.model.timeElapsed = new Date() - this.model.startTime;
            this.model.solvedMessage = "GG (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧";
        }

        this.model.notify(this.model);
    }

    trySwitchPlaces(num) {
        if (num == EMPTY_NUMBER) {
            throw new InvalidChoiceException("Can't switch places with empty square.");
        }
    
        let index = this.getIndex(num);
        let emptyIndex = this.getIndex(EMPTY_NUMBER);
        let validMove = this.canSwitchPlaces(index, emptyIndex);
    
        if (validMove) {
            this.switchPlaces(index, emptyIndex);
            return;
        }
    
        throw new InvalidChoiceException("Square must be adjacent to empty square.");
    }
    
    getIndex(num) {
        let size = this.model.board[0].length;

        for (let i = 0; i < size; i++) {
            let index = this.model.board[i].indexOf(num);            
            if (index >= 0) {
                return [i, index];
            }
        }
        
        throw new InvalidChoiceException("Invalid choice. Number isn't on the board.");
    }
    
    canSwitchPlaces(index, emptyIndex) {
        if (index[0] == emptyIndex[0] && Math.abs(index[1] - emptyIndex[1]) == 1) {
            return true;
        } else if (index[1] == emptyIndex[1] && Math.abs(index[0] - emptyIndex[0]) == 1) {
            return true;
        }
        
        return false;
    }
    
    switchPlaces(index, emptyIndex) {
        this.model.board[emptyIndex[0]][emptyIndex[1]] = this.model.board[index[0]][index[1]];
        this.model.board[index[0]][index[1]] = EMPTY_NUMBER;
    }
}

function InvalidChoiceException(message) {
    const error = new Error(message);
    return error;
}

export { BoardController };