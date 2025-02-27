const grid           = document.querySelector("#grid");
const sizeButton     = document.querySelector("#sizeButton");
const randButton     = document.querySelector("#randButton");
const inputButton    = document.querySelector("#inputType");
const eraseAllButton = document.querySelector("#eraseAllButton");
const eraserButton   = document.querySelector("#eraserButton");

function randomColors() {
    return Math.floor(Math.random() * 256);
}

function drawGrid(size = 10) {
    grid.innerHTML = "";
    for(let rows = 0; rows < size; rows++) {
        for(let columns = 0; columns < size; columns++) {
            const box = document.createElement("div");
            box.classList.add("box");
            box.style.cssText = `
            border: 1px solid grey;
            height: ${450/size}px;
            width: ${450/size}px;
            flex-grow:1;
            flex-shrink: 0;
            `;
            grid.appendChild(box);
        }
    }
    initBoxListeners();
    initButtonListeners();
}

function initBoxListeners(color = "black") {
    const boxes = grid.querySelectorAll(".box");
    boxes.forEach(box => box.onmouseenter = () => {
        box.style.cssText += "transition: 0.1s linear all;";
        if(color === "rgb") {
            box.style.backgroundColor = `rgb(${randomColors()} ${randomColors()} ${randomColors()})`;    
        } else {
            box.style.backgroundColor = `${color}`;
        }
    });
}

function toggleButtons(mode) {
    sizeButton.disabled     = mode;
    randButton.disabled     = mode;
    eraseAllButton.disabled = mode;
}

let colorMode = "default";
function initButtonListeners() {
    const boxes = grid.querySelectorAll(".box");
    sizeButton.onclick = () => {
       let size = Number(prompt("Enter a number between 10 and 100:"));
       if(size <= 100 && size >= 10 && size != "") {
        drawGrid(size);
       }
    };

    randButton.onclick = () => {
        if(colorMode != "rgb") {
            colorMode = "rgb";
            initBoxListeners("rgb");
        } else {
            colorMode = "default";
            initBoxListeners();
        }
    };

    eraseAllButton.onclick = () => {
        boxes.forEach(box => {box.style.backgroundColor = "white"});
    };

    eraserButton.onclick = () => {
        if(colorMode != "white") {
            colorMode = "white";
            initBoxListeners(colorMode);
            eraserButton.style.opacity = "0.5";
            toggleButtons(true);
        } else {
            colorMode = "default";
            initBoxListeners();
            eraserButton.style.opacity = "1";
            toggleButtons(false);
        }
    };
}

drawGrid();
