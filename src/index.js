import { BoardController } from "../controller/board.controller.js";
import { BoardModel } from "../model/board.model.js";
import { BoardView } from "../view/board.view.js";

function main() {
    var model = new BoardModel(3);
    var controller = new BoardController(model);
    var view = new BoardView(controller);

    document.getElementById("board-size").onchange = function() { createNewGame(model) };
}

function createNewGame(model) {
    let size = document.getElementById("board-size").value;
    model.createNewGame(size);
}

main();