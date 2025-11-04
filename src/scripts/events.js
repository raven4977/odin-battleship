import { playGame } from "./battleship.js";
import { render } from "./render.js";
import { updateDisplayMessage, validate } from "./utility.js";

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

  const dragClickShips = (player, div, square, board) => {
    let mouseIsDown = false;
    let selectedShip = null;
    div.addEventListener("mousedown", () => {
      const gameState = playGame.getGameState();
      if (gameState.gameStatus) return;
      const playerBoard = player.gameboard.board;
      const playerBoardSquares = document.querySelectorAll(
        ".player-board .square"
      );
      mouseIsDown = true;
      if (mouseIsDown && square) {
        selectedShip = square;
        playerBoardSquares.forEach((square) =>
          square.classList.remove("selected")
        );
        square.coordinates.forEach((coor) =>
          playerBoardSquares[coor].classList.add("selected")
        );
        board.forEach((object) => {
          object.div.addEventListener("mouseenter", () => {
            if (selectedShip && mouseIsDown) {
              const isHorizontal =
                Math.abs(
                  selectedShip.coordinates[0] - selectedShip.coordinates[1]
                ) === 1;
              render.isHovering(
                selectedShip.length,
                object.index,
                isHorizontal
              );
            }
          });

          object.div.addEventListener("mouseup", () => {
            if (
              !square.coordinates.includes(object.index) &&
              !player.gameboard.board[object.index]
            ) {
              if (square.length === 1) {
                playerBoard[object.index] = square;
                playerBoard[square.coordinates[0]] = null;
                square.coordinates[0] = object.index;
                render.renderBoard(player);
              }
              if (square.length > 1) {
                const isHorizontal =
                  Math.abs(square.coordinates[0] - square.coordinates[1]) === 1;
                const newCoords = [];
                if (isHorizontal) {
                  for (let i = 0; i < square.length; i++) {
                    newCoords.push(object.index + i);
                  }
                } else {
                  newCoords.push(object.index);
                  for (let i = 0; i < square.length - 1; i++) {
                    newCoords.push(newCoords[i] + 10);
                  }
                }
                const valid = validate.validateDragShip(newCoords, playerBoard);
                if (valid) {
                  newCoords.forEach((coor) => (playerBoard[coor] = square));
                  for (let i = 0; i < square.coordinates.length; i++) {
                    playerBoard[square.coordinates[i]] = null;
                    square.coordinates[i] = newCoords[i];
                  }
                  render.renderBoard(player);
                } else return;
              }
            } else return;
          });
          document.addEventListener("mouseup", () => {
            mouseIsDown = false;
            selectedShip = null;
            const playerBoardElement = document.querySelectorAll(
              ".player-board .square"
            );
            playerBoardElement.forEach((el) => {
              el.classList.remove("highlight");
            });
          });
        });
      }
    });
  };

  return {
    startGameEvent,
    computerBoardEvents,
    shuffleButtonEvents,
    dragClickShips,
  };
})();

export { events };
