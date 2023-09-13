function fillContainer(){
    sketchContainer.innerHTML = "";

    const size = getSizeValue();
    const heightAndWidth = parseInt(sketchContainerStyles.getPropertyValue("height")) / size;
    sliderSizeTexts.forEach(sliderText => sliderText.textContent = getSizeValue());
    const div = document.createElement("div");
    div.style.cssText = "display: flex;"
    
    for(let i = 0; i < size; i++){
        const row = document.createElement("div");
        row.style.cssText = "display: flex;"
        for(let i = 0; i < size; i++){
            const square = document.createElement("div");
            square.classList.add("square")
            square.style.cssText = `height: ${heightAndWidth}px; width: ${heightAndWidth}px; border: 1px solid black; box-sizing: border-box;`;
            row.appendChild(square);
        }
        sketchContainer.appendChild(row);
    }
}
function getColorValue(){
   return selectorColor.value; 
}

function getSizeValue(){
    return sizeMeter.value;
}

function setTargetColor(target, color){
    target.style.backgroundColor = `${color}`;
    return;
}

function changeColor(e){
    target = e.target;
    if(mousedown && eraser){
        setTargetColor(target,"white");
        return;
    }
    if(mousedown){
        setTargetColor(target,getColorValue());
    }
}

function clearSketchContainer(){
    squares.forEach(square => square.style.backgroundColor = "white");
}

const sketchContainer = document.getElementById("sketch-container");
const sketchContainerStyles = window.getComputedStyle(sketchContainer);
const selectorColor = document.querySelector("#color-selector");
const clearButton = document.querySelector("#clear");
const eraserButton = document.querySelector("#eraser");
const sizeMeter = document.querySelector("#size-selector");
const sliderSizeTexts = document.querySelectorAll(".sizeValue");
let mousedown = false;
let mouseover = false;
let eraser = false;

fillContainer();

let squares = document.querySelectorAll(".square");
squares.forEach(square => square.addEventListener("mousedown",() => mousedown = true));
squares.forEach(square => square.addEventListener("mouseup",() => mousedown = false));
squares.forEach(square => square.addEventListener("mousemove",changeColor));

clearButton.addEventListener("click",clearSketchContainer);

selectorColor.addEventListener("click",() => eraser = false);

eraserButton.addEventListener("click",() => eraser = true);

sizeMeter.addEventListener("input",fillContainer);
sizeMeter.addEventListener("input",() => {
    squares = document.querySelectorAll(".square");
    squares.forEach(square => square.addEventListener("mousedown",() => mousedown = true));
    squares.forEach(square => square.addEventListener("mouseup",() => mousedown = false));
    squares.forEach(square => square.addEventListener("mousemove",changeColor));
});