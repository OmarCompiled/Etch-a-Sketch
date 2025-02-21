const grid        = document.querySelector("#grid");
const sizeButton  = document.querySelector("#sizeButton");
const randButton  = document.querySelector("#randButton");
const inputButton = document.querySelector("#inputType");
const eraseButton = document.querySelector("#eraseAll");

function randomColors() {
    return Math.floor(Math.random() * 256);
}

function createGrid(size = 10) {
    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
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
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => box.addEventListener("mouseenter", () => {
        box.style.backgroundColor = `${color}`;
    }));
}

function initButtonListeners() {
    sizeButton.addEventListener("click", () => {
       let size = Number(prompt("Enter a number between 10 and 100: "));
       if(size <= 100 && size >= 10 && size != "") {
        grid.innerHTML = "";
        createGrid(size);
        initBoxListeners();
       }
    });    

    eraseButton.addEventListener("click", () => {
        grid.childNodes.forEach(box => box.style.backgroundColor = "inherit")
    });
}

createGrid();
initBoxListeners();
initButtonListeners();







