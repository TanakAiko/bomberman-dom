import { getImpactDiv, removeBomb, cleanExplosion, updateMap } from "../../utils/utils.js";

class Bomb {
    constructor() {}

    poseBomb(target, player) {
        if (player.nombreActualBomb >= player.minage) {
            return
        }


        target.innerHTML += `<img class="bomb" src="./assets/bomb.svg" />`;
        this.exploseBomb(target, player)
    }

    exploseBomb(bomb, player) {
        const coordonates_impact = getImpactDiv(player)
        const toClean = []
        console.log(coordonates_impact)
        
        setTimeout(() => {
            removeBomb(bomb)
            coordonates_impact.forEach(coords => {
                if (coords.x > 0 && coords.x <= 11 && coords.y > 0 && coords.y <= 13) {
                    const target = document.getElementById(`${coords.x}${coords.y}`)
                    if (!target.classList.contains("b")) {
                        console.log("TARGET: ", target)
                        toClean.push(target)
                        target.innerHTML += `<span class="explosion" >💥</span>`;
                    }
                }
            })
            updateMap(coordonates_impact)
            setTimeout(() => {
                console.log("CLEANING")
                cleanExplosion(toClean)
            }, 1000)
        }, 2000)
    }
}

const bomb = new Bomb();
export default bomb;