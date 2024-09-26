import store from "../store/store-app.js";
import matrixToAscii from "../../utils/utils.js";
import Player from "./player.js";
import bomb from "./bomb.js";

export function UserJoined(payload) {
    const allName = payload.content.split(",");
    const allPlayers = allName.map((name) => {
        return {
            nickname: name,
            avatar: `https://api.dicebear.com/6.x/pixel-art/svg?seed=${encodeURIComponent(name)}`,
        }
    });
    store.dispatch({ type: "SET_USERS", payload: { users: allPlayers } });
}

const PLAYERS_POSITIONS = [
    { x: 1, y: 1 },
    { x: 1, y: 13 },
    { x: 11, y: 1 },
    { x: 11, y: 13 }
];

function InitPlayers() {
    let index = 1;
    const representation = ["👨🏿", "👮🏾", "🕵", "💂🏿"]
    for (let i = 0; i < store.state.users.length; i++) {
        let user = store.state.users[i];
        const { x, y } = PLAYERS_POSITIONS[i];
        let player = new Player(x, y, user.nickname, `P${index}`);
        player.representation = representation[i];
        store.dispatch({ type: "SET_PLAYERS", payload: { player: player } });
        index++;
    }
}

export function constructMap(payload) {
    Object.entries(matrixToAscii(payload.map)).forEach(([key, value]) => {
        store.state.map.push(value.map((el) => el === "p" ? "c" : el));
    });

    const representation = ["👨🏿", "👮🏾", "🕵", "💂🏿"]
    let index = 1
    const grid = matrixToAscii(payload.map);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let div
            if (grid[i][j] === "p") {
                div = `<div id="${i}${j}" className="c avatarGame">
                            <p 
                            id=P${index}
                            >${representation[index - 1]}</p>
                        </div>`
                index++
            } else {
                div = `<div id="${i}${j}" className="${grid[i][j]}"></div>`
            }
            if (grid[i][j] === "m") {
                store.state.walls.push(div)
            }
            store.state.divs.push(div)
        }
    }
    InitPlayers();
}

export function playerMove(payload) {
    store.state.players.forEach((p) => {
        if (p.name === payload.nickname) {
            p.move(payload.content);
        }
    });
}

export function playerBoom(payload) {
    const nickname = payload.nickname;
    let player;
    store.state.players.forEach((p) => {
        if (p.name === nickname) {
            player = p;
        }
    });

    console.log("POSX: ", player.posX, "POSY: ", player.posY);
    const target = document.getElementById(`${player.posX}${player.posY}`);
    bomb.poseBomb(target, player);
}