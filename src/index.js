import { BoardController } from "../controller/board.controller.js";
import { BoardModel } from "../model/board.model.js";
import { BoardView } from "../view/board.view.js";

function main() {
    var model = new BoardModel(3);
    var controller = new BoardController(model);
    var view = new BoardView(controller);

    document.getElementById("board-size").onchange = function() { tryCreateNewGame(controller) };
    document.getElementById("create-new-game").onclick = function() { getUserConfirmation(controller) };
    document.getElementById("cancel").onclick = function() { cancelNewGameCreation(model) };    
    document.getElementById("submit-name").onclick = function() { tryAddGameToLeaderboard(controller) };
    document.getElementById("close").onclick = function() { closeCompletedGamePopup(controller) };
}

function tryCreateNewGame(controller) {
    if (controller.model.startTime != undefined) {
        document.getElementById("confirmation-popup").style.display = "flex";
        return;
    }

    createNewGame(controller);
}

function getUserConfirmation(controller) {
    closeConfirmationPopup();
    createNewGame(controller);
}

function cancelNewGameCreation(model) {
    closeConfirmationPopup();
    document.getElementById("board-size").value = model.board[0].length;
}

function closeConfirmationPopup() {
    document.getElementById("confirmation-popup").style.display = "none";
}

function closeCompletedGamePopup(controller) {
    document.getElementById("game-completed-popup").style.display = "none";
    createNewGame(controller);
}

function createNewGame(controller) {
    let size = document.getElementById("board-size").value;
    controller.createNewGame(size);
}

function tryAddGameToLeaderboard(controller) {
    let name = document.getElementById("name").value;

    if (name == "") {
        name = "unknown";
    }

    controller.tryAddGameToLeaderboard(name);
}

main();