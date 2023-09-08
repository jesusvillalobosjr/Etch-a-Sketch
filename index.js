function fillContainer(){
    const heightAndWidth = parseInt(sketchContainerStyles.getPropertyValue("height")) / 16;
    const div = document.createElement("div");
    div.style.cssText = "display: flex;"
    for(let i = 0; i < 16; i++){
        const div = document.createElement("div");
        div.style.cssText = "display: flex;"
        for(let i = 0; i < 16; i++){
            const square = document.createElement("div");
            square.classList.add("square")
            square.style.cssText = `height: ${heightAndWidth}px; width: ${heightAndWidth}px; border: 1px solid black; box-sizing: border-box;`;
            div.appendChild(square);
        }
        sketchContainer.appendChild(div);
    }
}

function changeColor(e){
    if(mousedown){
        const target = e.target;
        console.log(target);
        target.style.backgroundColor = "black";
        return;
    }
}

function changeColorOver(){

}

const sketchContainer = document.getElementById("sketch-container");
const sketchContainerStyles = window.getComputedStyle(sketchContainer);

fillContainer();

let mousedown = false;
let mouseover = false;
const squares = document.querySelectorAll(".square");
squares.forEach(square => square.addEventListener("mousedown",() => mousedown = true));
squares.forEach(square => square.addEventListener("mouseup",() => mousedown = false));
squares.forEach(square => square.addEventListener("mousemove",changeColor));