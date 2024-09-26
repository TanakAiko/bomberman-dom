// import { getImpactDiv, removeBomb, cleanExplosion, updateMap, playSound } from "../../utils/utils.js";

// class Bomb {
//     constructor() {}

//     poseBomb(target, player) {
//         if (player.nombreActualBomb >= player.minage) {
//             return
//         }
//         target.innerHTML += `<img class="bomb" src="./assets/bomb.svg" />`;
//         player.nombreActualBomb++
//         console.log("POSE BOMB")
//         console.log("-------NOMBRE BOMB: ", player.nombreActualBomb)
//         console.log("-------MINAGE: ", player.minage)
//         this.exploseBomb(target, player)
//     }

//     exploseBomb(bomb, player) {
//         const coordonates_impact = getImpactDiv(player, player.portee)
//         const toClean = []
//         const toClean_coords = []

//         setTimeout(() => {
//             removeBomb(bomb)
//             coordonates_impact.forEach(coords => {
//                 if (coords.x > 0 && coords.x <= 11 && coords.y > 0 && coords.y <= 13) {
//                     const target = document.getElementById(`${coords.x}${coords.y}`)
//                     if (!target.classList.contains("b")) {
//                         toClean.push(target)
//                         toClean_coords.push(coords)
//                         target.innerHTML += `<span class="explosion" >💥</span>`;
//                     }
//                 }
//             })

//             playSound("sound_bomb.mp3");
//             updateMap(coordonates_impact)
//             setTimeout(() => {
//                 cleanExplosion(toClean, toClean_coords)
//             }, 2000)
//             player.nombreActualBomb--
//         }, 3000)
//     }
// }

// const bomb = new Bomb();
// export default bomb;
import { getImpactDiv, removeBomb, cleanExplosion, updateMap, playSound } from "../../utils/utils.js";
import store from "../store/store-app.js";

class Bomb {
    constructor() { }

    poseBomb(target, player) {
        if (player.nombreActualBomb >= player.minage) return;

        this.displayBomb(target);
        player.nombreActualBomb++;
        console.log("POSE BOMB", player.nombreActualBomb, "/", player.minage);

        this.exploseBomb(target, player);
    }

    displayBomb(target) {
        target.innerHTML += `<img class="bomb" src="./assets/bomb.svg" />`;
    }

    exploseBomb(bomb, player) {
        const coordonates_impact = getImpactDiv(player, player.portee);
        const toClean = [];
        const toClean_coords = [];        

        setTimeout(() => {
            removeBomb(bomb);
            this.handleExplosion(coordonates_impact, toClean, toClean_coords, player);
            player.nombreActualBomb--;
        }, 3000);
    }

    handleExplosion(coordonates_impact, toClean, toClean_coords, thePlayer) {
        
        coordonates_impact.forEach(coords => {
            if (this.isValidCoord(coords)) {
                const target = document.getElementById(`${coords.x}${coords.y}`);
                console.log("target: ", target);
                
                if (!target.classList.contains("b")) {
                    toClean.push(target);
                    toClean_coords.push(coords);
                    target.innerHTML += `<span class="explosion">💥</span>`;
                }

                for (let i = 0; i  < store.state.players.length; i++) {
                    if (store.state.players[i].posX === coords.x && store.state.players[i].posY === coords.y) {
                        if (store.state.players[i].name === store.state.Nickname) {
                            store.state.socket.Send({
                                type: "looseLife",
                                nickname: store.state.players[i].name,
                            })

                            if (thePlayer.name != store.state.Nickname) {
                                store.state.socket.Send({
                                    type: "upScoreEnnemy",
                                    nickname: thePlayer.name,
                                })
                            }
                        }
                        
                    }
                }

            }
        });
        playSound("sound_bomb.mp3");
        updateMap(coordonates_impact, thePlayer);

        setTimeout(() => cleanExplosion(toClean, toClean_coords), 1000);
    }

    isValidCoord({ x, y }) {
        return x > 0 && x <= 11 && y > 0 && y <= 13;
    }
}

const bomb = new Bomb();
export default bomb;
