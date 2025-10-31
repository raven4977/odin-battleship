import { playGame } from "./battleship.js";
import { render } from "./render.js";
import { updateDisplayMessage } from "./utility.js";

const events = (() => {
  const resultElement = document.querySelector(".display-result");
  const descriptionElement = document.querySelector(".description");
  const startGameEvent = (player, computer) => {
    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", () => {
      if (startButton.textContent === "Start") {
        playGame.startGame();
        updateDisplayMessage(startButton, "Quit");
        updateDisplayMessage(descriptionElement, "Click quit to end match");
        updateDisplayMessage(resultElement, "Your Turn!");
        return;
      } else {
        playGame.quitGame();
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
  return { startGameEvent };
})();

export { events };
