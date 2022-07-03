import { generateBoard } from "../../controller/number-board/generate-board.js";
import { displayBoard } from "./display-board.js";

let size = 3;
let board = generateBoard(size);

displayBoard(board);