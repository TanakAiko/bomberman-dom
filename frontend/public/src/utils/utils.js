import store from "../app/store/store-app.js";
export default function matrixToAscii(matrix) {
    let asciiMatrix = [];
  
    for (let row of matrix) {
      let asciiRow = []; 
      for (let col of row) {
        asciiRow.push(String.fromCharCode(col)); 
      }
      asciiMatrix.push(asciiRow);
    }
  
    return asciiMatrix;
}


export function getImpactDiv(target, impact = 1) {
    const coordonates = []
    const { posX, posY } = target
    coordonates.push({x: posX, y: posY})

    for (let i = 1; i <= impact; i++) {
        coordonates.push({x: posX - i, y: posY})
        coordonates.push({x: posX + i, y: posY})
    }

    for (let j = 1; j <= impact; j++) {
        coordonates.push({x: posX, y: posY - j})
        coordonates.push({x: posX, y: posY + j})
    }
    return coordonates
}

export function removeBomb(target, child = "img") {
    const childElements = Array.from(target.getElementsByTagName(child));
    
    childElements.forEach(element => {
        element.remove();
    });
}

export function cleanExplosion(targets) {
    for (let target of targets) {
        removeBomb(target, "span")
            target.classList.remove("m");
            target.classList.add("c");
    }
}

export function updateMap(coordonates) {
    const map = store.state.map
    coordonates.forEach(coords => {
        if (map[coords.x][coords.y] === "m") {
            map[coords.x][coords.y] = "c"
        }
    })
}