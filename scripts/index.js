const grid           = document.querySelector("#grid");
const sizeButton     = document.querySelector("#sizeButton");
const randButton     = document.querySelector("#randButton");
const inputButton    = document.querySelector("#inputType");
const eraseAllButton = document.querySelector("#eraseAllButton");
const eraserButton   = document.querySelector("#eraserButton");

function randomColors() {
    return Math.floor(Math.random() * 256);
}

function createGrid(size = 10) {
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
}

function initBoxListeners(color = "black") {
    const boxes = grid.querySelectorAll(".box");
    boxes.forEach(box => box.addEventListener("mouseenter", function colorBox() {
        box.style.cssText += "transition: 0.1s linear all;";
        if(color === "rgb") {
            box.style.backgroundColor = `rgb(${randomColors()} ${randomColors()} ${randomColors()})`;    
        } else {
            box.style.backgroundColor = `${color}`;
        }
    }));
}

function removeBoxListeners() {
    const boxes = grid.querySelectorAll(".box");
    boxes.forEach(box => box.removeEventListener("mouseenter", function colorBox() {
        box.style.backgroundColor = `${color}`;
        box.style.cssText += "transition: 0.1s linear all;";
    }));
}

let colorMode = "default";
function initButtonListeners() {
    const boxes = grid.querySelectorAll(".box");
    sizeButton.onclick = () => {
       let size = Number(prompt("Enter a number between 10 and 100:"));
       if(size <= 100 && size >= 10 && size != "") {
        createGrid(size);
       }
    };

    randButton.onclick = () => {
        if(colorMode != "rgb") {
            colorMode = "rgb";
            removeBoxListeners();
            initBoxListeners("rgb");
        } else {
            colorMode = "default";
            initBoxListeners();
        }
    };

    eraseAllButton.onclick = () => {
        grid.childNodes.forEach(box => {box.style.backgroundColor = "inherit"});
    };

    eraserButton.onclick = () => {
        if(colorMode != "white") {
            colorMode = "white";
            removeBoxListeners();
            initBoxListeners(colorMode);
            eraserButton.style.opacity = "0.5";
        } else {
            colorMode = "default";
            initBoxListeners();
            eraserButton.style.opacity = "1";
        }
    };
}

createGrid();
initBoxListeners();
initButtonListeners();







