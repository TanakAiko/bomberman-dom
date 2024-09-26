import store from "../app/store/store-app.js";

// POWER UPS
const bombs = `<span class="bombs">💣</span>`
const speed = `<span class="speed">🏃🏿</span>`
const flames = `<span class="flames">🔥</span>`

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

export function updateMap(coordonates) {
    const map = store.state.map
    coordonates.forEach(coords => {
        if (map[coords.x][coords.y] === "m") {
            map[coords.x][coords.y] = "c"
        }
    })
}
// export function cleanExplosion(targets, coordonates) {
//     let index = 0
//     for (let target of targets) {
//         removeBomb(target, "span")
//         target.classList.remove("m");
//         target.classList.add("c");
//         ShortLivedPowerUps(target, coordonates[index])
//         index++
//     }
// }


// function ShortLivedPowerUps(target, coord) {
//     switch (target.classList[0]) {
//         case "x":
//             target.innerHTML += flames
//         case "y":
//             target.innerHTML += speed
//         case "z":
//             target.innerHTML += bombs
//     }
//     target.classList.remove("x", "y", "z")
//     store.state.map[coord.x][coord.y] = "c"
//     setTimeout(() => {
//         removeBomb(target, "span")
//     }, 2000)
// }

export function cleanExplosion(targets, coordonates) {
    let index = 0;

    // Nettoyer les explosions immédiatement
    for (let target of targets) {
        removeBomb(target, "span");  // Suppression immédiate des explosions
        target.classList.remove("m");
        target.classList.add("c");
    }

    // Fonction pour afficher les power-ups avec délai
    function showNextPowerUp() {
        if (index >= targets.length) return; // Si tous les power-ups sont apparus, arrêter

        let target = targets[index];
        ShortLivedPowerUps(target, coordonates[index]);

        index++;

        // Attendre 2 secondes avant de montrer le suivant
        setTimeout(showNextPowerUp, 1000);
    }

    // Lancer l'apparition des power-ups
    showNextPowerUp();
}

function ShortLivedPowerUps(target, coord) {
    switch (target.classList[0]) {
        case "x":
            target.innerHTML += flames;
            break;
        case "y":
            target.innerHTML += speed;
            break;
        case "z":
            target.innerHTML += bombs;
            break;
    }
    target.classList.remove("x", "y", "z");
    store.state.map[coord.x][coord.y] = "c";
    
    setTimeout(() => {
        removeBomb(target, "span");
    }, 2000);  // Le power-up disparaît après 2 secondes
}



export function playSound(titleSound) {
    const audio = new Audio('./assets/' + titleSound);
    audio.play();

}