import '../../common/common.js';
import { EMPTY_NUMBER } from '../../common/common.js';
import { trySwitchPlaces } from '../../controller/number-board/game.js';

const squareTypes = {
    "number": getNumberSquare
}

export function displayBoard(board) {
    let boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    
    board.forEach(line => {
        let lineElement = document.createElement("div");
        lineElement.classList.add("line");
        
        line.forEach(square => {
            let squareElement = document.createElement("div");
            squareElement.classList.add("square");
            squareElement.setAttribute("id", "square");
            squareElement.onclick = function() { onSquareClick(board, square) };
            let content = squareTypes[typeof square](square);
            squareElement.appendChild(content);
            lineElement.appendChild(squareElement);
        })
        
        boardElement.appendChild(lineElement);
    });
}

function getNumberSquare(square) {
    const EMPTY = 0;
    let content = document.createElement("p");
    content.classList.add("number-content");

    if (square != EMPTY_NUMBER) {
        content.appendChild(document.createTextNode(square));
    }

    return content;
}

function onSquareClick(board, square) {
    try {
        let newBoard = trySwitchPlaces(board, square);
        displayBoard(newBoard);
    } catch(error) {
        alert(error);
    }
}