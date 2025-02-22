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
}

function initBoxListeners(color = "black") {
    const boxes = grid.childNodes;
    boxes.forEach(box => box.addEventListener("mouseenter", () => {
        box.style.backgroundColor = `${color}`; 
    }));
}

let colorMode = "default";
function initButtonListeners(color = "black") {
    const boxes = grid.childNodes;
    sizeButton.addEventListener("click", () => {
       let size = Number(prompt("Enter a number between 10 and 100:"));
       if(size <= 100 && size >= 10 && size != "") {
        grid.innerHTML = "";
        createGrid(size);
        initBoxListeners();
       }
    });    

    randButton.addEventListener("click", () => {
        if(colorMode === "default") {
            boxes.forEach(box => box.addEventListener("mouseenter", () => {
                box.style.backgroundColor = `rgb(${randomColors()} ${randomColors()} ${randomColors()})`;
            }));
            colorMode = "rgb"
        } else {
            initBoxListeners();
            colorMode = "default";
        }
    });

    eraseAllButton.addEventListener("click", () => {
        grid.childNodes.forEach(box => {box.style.backgroundColor = "inherit"});
    });

    eraserButton.onclick = () => {
        if(colorMode != "white") {
            boxes.forEach(box => box.addEventListener("mouseenter", () => {
                box.style.backgroundColor = "white";
            }));
            eraserButton.style.opacity = "0.5";
            colorMode = "white";
        } else {
            initBoxListeners();
            eraserButton.style.opacity = "1";
            colorMode = "default";
        }
    };
}

createGrid();
initBoxListeners();
initButtonListeners();







