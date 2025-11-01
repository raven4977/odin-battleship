import { events } from "./events.js";
import { updateDisplayMessage } from "./utility.js";
import { playGame } from "./battleship.js";

const render = (() => {
  const renderBoard = (player) => {
    const board = player.gameboard.board;
    const playerType = player.player ? "player" : "computer";
    const boardElement = document.querySelector(`.${playerType}-board`);
    boardElement.textContent = "";
    board.forEach((square, index) => {
      const div = document.createElement("div");
      div.classList.add("square");
      if (playerType === "player") {
        if (square) {
          div.textContent = square.length;
          div.classList.add("ship");
        }
      } else {
        events.computerBoardEvents(div, index, player);
      }
      boardElement.appendChild(div);
    });
  };
  const displayAttack = (attack, index, player) => {
    const playerType = player.player ? "player" : "computer";
    const boardElement = document.querySelector(`.${playerType}-board`);
    const resultElement = document.querySelector(".display-result");
    const audio = new Audio("./audio/attack-sound.flac");
    audio.play();
    if (!attack) {
      if (!player.player) {
        updateDisplayMessage(resultElement, "You missed! Computer turn!");
      } else {
        updateDisplayMessage(resultElement, "Computer missed! Your turn!");
      }

      boardElement.children[index].textContent = "X";
      boardElement.children[index].classList.add("--miss");
    } else if (attack.sunk) {
      attack.coordinates.forEach((coor) => {
        const cell = boardElement.children[coor];
        const image = document.createElement("img");
        const existingImages = cell.querySelectorAll("img");
        existingImages.forEach((img) => img.remove());
        image.classList.add("icon");
        image.src = "./images/bullseye-solid-full.svg";
        cell.appendChild(image);
        cell.classList.add("--sunk");
      });
      if (player.gameboard.allShipsDestroyed()) {
        if (!player.player) {
          updateDisplayMessage(
            resultElement,
            "You destroyed all enemy ships! You win!"
          );
          playGame.quitGame();
        } else {
          updateDisplayMessage(
            resultElement,
            "All your ships have been destroyed! You lose!"
          );
          playGame.quitGame();
        }
        return;
      }
      if (!player.player) {
        updateDisplayMessage(resultElement, "You sunk a ship!");
      } else {
        updateDisplayMessage(resultElement, "Computer sunk a ship!");
      }
    } else {
      const image = document.createElement("img");
      image.classList.add("icon");
      image.src = "./images/ship-solid-full.svg";
      boardElement.children[index].appendChild(image);
      boardElement.children[index].classList.add("--hit");
      if (!player.player) {
        updateDisplayMessage(resultElement, "You hit a ship!");
      } else {
        updateDisplayMessage(resultElement, "Computer hit a ship!");
      }
    }
  };
  return { renderBoard, displayAttack };
})();

export { render };
