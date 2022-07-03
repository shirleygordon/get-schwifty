const squareTypes = {
    "number": getNumberSquare
}

function displayBoard(board) {
    board.forEach(line => {
        let lineElement = document.createElement("div");
        lineElement.classList.add("line");
        
        line.forEach(square => {
            let squareElement = document.createElement("div");
            squareElement.classList.add("square");
            let content = squareTypes[typeof square](square);
            squareElement.appendChild(content);
            lineElement.appendChild(squareElement);
        })
        
        document.getElementById("board").appendChild(lineElement);
    });
}

function getNumberSquare(square) {
    const EMPTY = 0;
    let content = document.createElement("p");
    content.classList.add("number-content");

    if (square != EMPTY) {
        content.appendChild(document.createTextNode(square));
    }

    return content;
}

displayBoard([[6, 0, 7], [3,2,8], [4,5,1]]);