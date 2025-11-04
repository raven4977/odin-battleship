import { Player } from "./scripts/battleship.js";
import { render } from "./scripts/render.js";
import { events } from "./scripts/events.js";
const player = new Player(true);

const computer = new Player(false);

player.gameboard.randomizeBoard(player.gameboard.board);

render.renderBoard(player);
render.renderBoard(computer);
events.startGameEvent(player, computer);
events.shuffleButtonEvents(player);
