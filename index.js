function fillContainer(){
    sketchContainer.innerHTML = "";
    squareFeatures = {};

    const size = getSizeValue();
    const heightAndWidth = parseInt(sketchContainerStyles.getPropertyValue("height")) / size;
    sliderSizeTexts.forEach(sliderText => sliderText.textContent = getSizeValue());
    let count = 1;
    
    for(let i = 0; i < size; i++){
        const row = document.createElement("div");
        row.style.cssText = "display: flex;"
        for(let i = 0; i < size; i++){
            const square = document.createElement("div");
            square.classList.add("square");
            square.id = `square-${count++}`;
            square.style.cssText = `height: ${heightAndWidth}px; width: ${heightAndWidth}px; border: 1px solid black; box-sizing: border-box; background-color: whitesmoke;`;
            row.appendChild(square);
        }
        sketchContainer.appendChild(row);
    }
}

function setSquares(squares){
    squares.forEach(square => squareFeatures[square.id] = {clicked : false,color : "whitesmoke"});
    squares.forEach(square => square.addEventListener("mousedown",() => mousedown = true));
    squares.forEach(square => square.addEventListener("mouseup",() => mousedown = false));
    squares.forEach(square => square.addEventListener("mousemove",changeColor));
    squares.forEach(square => square.addEventListener("mouseover",changeColorOnHover));
    squares.forEach(square => square.addEventListener("mouseout",changeColorOffHover));
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
    let target = e.target;
    if(mousedown && eraser){
        setTargetColor(target,"white");
        squareFeatures[target.id]["clicked"] = false;
        squareFeatures[target.id]["color"] = "whitesmoke";
        return;
    }
    if(mousedown){
        setTargetColor(target,getColorValue());
        squareFeatures[target.id]["clicked"] = true;
        squareFeatures[target.id]["color"] = getColorValue();
    }
}

function changeColorOnHover(e){
    const target = e.target;
    const color = getColorValue();
    if(squareFeatures[target.id]["color"] == "whitesmoke" || squareFeatures[target.id]["color"] != color){
        setTargetColor(target,getColorValue());
    }
}

function changeColorOffHover(e){
    const target = e.target;
    if(!squareFeatures[target.id]["clicked"]){
        setTargetColor(target,"whitesmoke");
    }else{
        setTargetColor(target,squareFeatures[target.id]["color"]);
    }
}

function clearSketchContainer(){
    squares.forEach(square => {
        square.style.backgroundColor = "whitesmoke";
        squareFeatures[square.id]["color"] = "whitesmoke";
        squareFeatures[square.id]["clicked"] = false;
    });
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

let squareFeatures = {};

fillContainer();

let squares = document.querySelectorAll(".square");
setSquares(squares);

clearButton.addEventListener("click",clearSketchContainer);

eraserButton.addEventListener("click",(e) => {
    if(eraser){
        eraser = false;
        e.target.style.color = "black";
        e.target.style.backgroundColor = "transparent";
    }else{
        eraser = true;
        e.target.style.color = "white"
        e.target.style.backgroundColor = "black";
    }
});

sizeMeter.addEventListener("input",() => {
    fillContainer();
    squares = document.querySelectorAll(".square");
    setSquares(squares);
});

function windowResize(){
    const regex = /[^0-9]/g
    let windowWidth = window.innerWidth;
    if(windowWidth < 900){
        sketchContainer.style.width = "400px";
        sketchContainer.style.height = "400px";
        let measurement = sketchContainer.style.width;
        const heightAndWidthWindow = parseInt(measurement.replace(regex,""));
        squares.forEach(square => {
            square.style.height = `${heightAndWidthWindow / getSizeValue()}px`;
            square.style.width = `${heightAndWidthWindow / getSizeValue()}px`;
        })
    }else{
        sketchContainer.style.width = "500px";
        sketchContainer.style.height = "500px";
        let measurement = sketchContainer.style.width;
        const heightAndWidthWindow = parseInt(measurement.replace(regex,""));
        squares.forEach(square => {
            square.style.height = `${heightAndWidthWindow / getSizeValue()}px`;
            square.style.width = `${heightAndWidthWindow / getSizeValue()}px`;
        })
    }
}

window.addEventListener("resize",windowResize);