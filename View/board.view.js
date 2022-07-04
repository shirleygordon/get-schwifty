import { default as Observer } from "./observer.js";
import { EMPTY_NUMBER } from "../common/common.js";

class BoardView extends Observer {
    constructor(controller) {
        super();
        this.getSquareByType = {
            "number": this.getNumberSquare
        };
        this.getSquareStyleByType = {
            "number": "number-square"
        };
        this.controller = controller;
        this.boardElement = document.getElementById("board");
        this.displayBoard(controller.model.board);
        this.solvedMessage = document.getElementById("solved-message");
        this.solvedMessage.innerText = controller.model.solvedMessage;
        this.controller.model.addObserver(this);
    }

    update(model) {
        this.displayBoard(model.board);
        this.solvedMessage.innerText = model.solvedMessage;

        if (this.solvedMessage.innerText != "") {
            let leaderboard = document.getElementById("leaderboard");

            model.leaderboard.forEach(element => {
                let record = document.createElement("tr");
                record.classList.add("record");
                
                for (let property in element) {
                    let propertyElement = document.createElement("th");
                    propertyElement.innerText = element[property];
                    record.appendChild(propertyElement);
                }

                leaderboard.appendChild(record);
            });

            document.getElementById("game-completed-popup").style.display = "flex";
        }
    }

    displayBoard(board) {
        this.boardElement.innerHTML = "";
    
        board.forEach(line => {
            let lineElement = document.createElement("div");
            lineElement.classList.add("line");
            
            line.forEach(square => {
                let squareElement = document.createElement("div");
                squareElement.classList.add(this.getSquareStyleByType[typeof square]);
                squareElement.addEventListener("click", this.controller);
                let content = this.getSquareByType[typeof square](square);
                squareElement.appendChild(content);
                lineElement.appendChild(squareElement);
            });
            
            this.boardElement.appendChild(lineElement);
        });
    }

    getNumberSquare(square) {
        let content = document.createElement("p");
        content.classList.add("number-content");
    
        if (square != EMPTY_NUMBER) {
            content.appendChild(document.createTextNode(square));
        }
    
        return content;
    }
}

export { BoardView };