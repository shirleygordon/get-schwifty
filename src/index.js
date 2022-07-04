import { BoardController } from "../controller/board.controller.js";
import { BoardModel } from "../model/board.model.js";
import { BoardView } from "../view/board.view.js";

function main() {
    var model = new BoardModel(3);
    var controller = new BoardController(model);
    var view = new BoardView(controller);

    document.getElementById("board-size").onchange = function() { tryCreateNewGame(model) };
    document.getElementById("create-new-game").onclick = function() { getUserConfirmation(model) };
    document.getElementById("cancel").onclick = function() { cancelNewGameCreation(model) };
}

function tryCreateNewGame(model) {
    if (model.startTime != undefined) {
        document.getElementById("confirmation-popup").style.display = "flex";
        return;
    }

    createNewGame(model);
}

function getUserConfirmation(model) {
    closeConfirmationPopup();
    createNewGame(model);
}

function cancelNewGameCreation(model) {
    closeConfirmationPopup();
    document.getElementById("board-size").value = model.board[0].length;
}

function closeConfirmationPopup() {
    document.getElementById("confirmation-popup").style.display = "none";
}

function createNewGame(model) {
    let size = document.getElementById("board-size").value;
    model.createNewGame(size);
}

main();