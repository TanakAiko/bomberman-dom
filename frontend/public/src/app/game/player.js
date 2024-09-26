import store from "../store/store-app.js";

class Player {
    #blocSize = 60;
    constructor(x, y, name, id) {
        this.name = name
        this.id = id
        this.representation = ""
        this.initX = x
        this.initY = y
        this.posX = x
        this.posY = y
        this.life = 3;
        this.nombreActualBomb = 0; 
        this.portee = 1; 
        this.minage = 1; 
        this.speed = 1; 
        this.score = 0;
    }

    move(direction) {
        const map = store.state.map
        let newX = this.initX
        let newY = this.initY
        let newX_coord = this.posX
        let newY_coord = this.posY

        switch (direction) {
            case 'ArrowUp':
                newX -= this.#blocSize
                newX_coord -= 1
                break
            case 'ArrowDown':
                newX += this.#blocSize
                newX_coord += 1
                break
            case 'ArrowLeft':
                newY -= this.#blocSize
                newY_coord -= 1
                break
            case 'ArrowRight':
                newY += this.#blocSize
                newY_coord += 1
                break
        }

        if (this.isValidMove(newX_coord, newY_coord, map)) {
            this.initX = newX
            this.initY = newY
            this.posX = newX_coord
            this.posY = newY_coord
            this.updatePosition()
        }

    }

    isValidMove(x, y, map) {
        // Vérifier si les coordonnées sont dans les limites de la carte
        if (x >= 0 && y >= 0 && x < map.length && y < map[0].length) {
            return map[x][y] === 'c'; // Vérifie si la case est un chemin 'c'
        }
        return false;
    }

    updatePosition() {
        const playerRef = document.getElementById(this.id)
        if (playerRef) {
            playerRef.style.transform = `translate(${this.initY}px, ${this.initX}px)`
        }
    }
}

export default Player;
