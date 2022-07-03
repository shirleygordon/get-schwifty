import { generateBoard } from "../../Controller/generate-board.js";
import { displayBoard } from "./display-board.js";

let size = 3;
let board = generateBoard(size);

displayBoard(board);