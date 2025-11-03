import { playGame } from "./battleship.js";
import { render } from "./render.js";
import { updateDisplayMessage } from "./utility.js";

const events = (() => {
  const resultElement = document.querySelector(".display-result");
  const descriptionElement = document.querySelector(".description");
  let playerRef = null;
  let computerRef = null;
  const startGameEvent = (player, computer) => {
    playerRef = player;
    computerRef = computer;
    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", () => {
      if (startButton.textContent === "Start") {
        playGame.startGame();
        updateDisplayMessage(startButton, "Quit");
        updateDisplayMessage(descriptionElement, "Click quit to end match");
        updateDisplayMessage(resultElement, "Your Turn!");
        computer.gameboard.randomizeBoard(computer.gameboard.board);
        return;
      } else {
        playGame.quitGame();
        player.gameboard.reset();
        computer.gameboard.reset();
        render.renderBoard(player, "player");
        render.renderBoard(computer, "computer");
        updateDisplayMessage(startButton, "Start");
        updateDisplayMessage(
          descriptionElement,
          "Click start when you are ready"
        );
        updateDisplayMessage(resultElement, "Place your ships!");
        return;
      }
    });
  };

  const computerBoardEvents = (square, index, computer) => {
    square.addEventListener("click", () => {
      const gameState = playGame.getGameState();
      if (gameState.gameStatus && gameState.playerTurn) {
        if (square.getElementsByTagName("img").length > 0 || square.textContent)
          return;

        const attack = computer.gameboard.receiveAttack(index);
        render.displayAttack(attack, index, computer);
        if (!attack) {
          playGame.changeTurn();
          playGame.computerMove(playerRef, computerRef);
        }
      }
    });
  };

  const shuffleButtonEvents = (player) => {
    const shuffleButton = document.querySelector(".shuffle-button");
    shuffleButton.addEventListener("click", () => {
      const gameState = playGame.getGameState();
      if (!gameState.gameStatus) {
        player.gameboard.randomizeBoard(player.gameboard.board);
        render.renderBoard(player);
      }
    });
  };
  return { startGameEvent, computerBoardEvents, shuffleButtonEvents };
})();

export { events };
