<template>
  <div class="snake-game">
    <canvas id="snake" :width="width" :height="height">snake game</canvas>
    <button
      id="start-game__button"
      class="start-game__button play-again-button"
    >
      start-game
    </button>
    <div id="game-over" class="game-over" hidden>game over!</div>
  </div>
</template>

<script>
import swiped from "swiped-events";

export default {
  data: () => ({
    width: 100,
    height: 100,
  }),

  methods: {
    setCanvasSize() {
      this.width = document.querySelector(".snake-game").clientWidth;
      this.height = document.querySelector(".snake-game").clientHeight;
    },
  },

  mounted() {
    let score = 0;
    const SPEED = 8; // moves per second
    const untouchableScore = 1; // minimum score to self-touch end game // 0 sets instant death(bug)
    const startLength = 4; // initial snake body lenght

    const appleColor = "rgb(67, 217, 173)";

    let canvas = document.getElementById("snake");
    let context = canvas.getContext("2d");

    let blockSize = 10;
    //               🠙 1 (up) default
    //  (left) 4 🠘    🠚 2 (right)
    //             🠛 3 (down)
    let direction = 1;

    let width = canvas.width / blockSize;
    let height = canvas.height / blockSize;

    let movePassed;

    let startButton = document.getElementById("start-game__button");
    startButton.addEventListener("click", startGame);

    let gameOver = document.getElementById("game-over");

    let applePosition = [];
    let snakeBody = [];
    let run;

    let currAlpha = 1;

    function getRandomCoord(max) {
      // returns random coordinate from 0 to max
      let num = Math.random() * max;
      return Math.floor(num);
    }

    function startGame() {
      run = setInterval(game, 1000 / SPEED);
      startButton.setAttribute("hidden", "");
      startButton.removeEventListener("click", startGame);
      startButton.addEventListener("click", function () {
        clearInterval(run);
        clearPosition();
        startGame();
      });
    }

    function clearPosition() {
      // reset snake position, apple position, score, game over overlay

      applePosition = [getRandomCoord(width), getRandomCoord(height)];
      score = 0;
      direction = 1;
      snakeBody = [];
      // centering snake body
      for (let i = 0; i < startLength; i++) {
        snakeBody.push([Math.floor(width / 2), Math.floor(height / 2) + 1]);
      }
      gameOver.setAttribute("hidden", "");
    }

    function waitScreen() {
      // make everything shine
      context.shadowColor = appleColor;
      context.shadowBlur = 10;

      // clearing game field
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgba(1, 22, 39, 0.84)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      renderSnake();
    }

    function renderSnake() {
      for (let i = 0; i < snakeBody.length; i++) {
        // imitating fade-out of snake from head to tail
        // // // // why is this four-block snake has only 3 blocks visible>? am i so bad in math?
        currAlpha = 1 - i * (1 / snakeBody.length);
        context.fillStyle = "rgba(67, 217, 173, " + currAlpha + ")";

        // making a round head depending on direction
        if (i == 0) {
          // only first block really can be head
          context.beginPath();
          if (direction == 1) {
            context.arc(
              snakeBody[0][0] * 10 + 5,
              snakeBody[0][1] * 10,
              5,
              0,
              2 * Math.PI,
              false
            );
            context.fillRect(
              snakeBody[0][0] * blockSize,
              snakeBody[0][1] * blockSize,
              10,
              10
            );
          } else if (direction == 2) {
            context.arc(
              snakeBody[0][0] * 10 + 10,
              snakeBody[0][1] * 10 + 5,
              5,
              0,
              2 * Math.PI,
              false
            );
            context.fillRect(
              snakeBody[0][0] * blockSize,
              snakeBody[0][1] * blockSize,
              10,
              10
            );
          } else if (direction == 3) {
            context.arc(
              snakeBody[0][0] * 10 + 5,
              snakeBody[0][1] * 10 + 10,
              5,
              0,
              2 * Math.PI,
              false
            );
            context.fillRect(
              snakeBody[0][0] * blockSize,
              snakeBody[0][1] * blockSize,
              10,
              10
            );
          } else if (direction == 4) {
            context.arc(
              snakeBody[0][0] * 10,
              snakeBody[0][1] * 10 + 5,
              5,
              0,
              2 * Math.PI,
              false
            );
            context.fillRect(
              snakeBody[0][0] * blockSize,
              snakeBody[0][1] * blockSize,
              10,
              10
            );
          }
          context.fill();
        } else {
          // non-head blocks
          context.fillRect(
            snakeBody[i][0] * blockSize,
            snakeBody[i][1] * blockSize,
            10,
            10
          );
        }
      }
    }

    function drawStartGameText() {
      startButton.innerHTML = "start-game";
    }

    function drawStartAgainButton() {
      startButton.innerHTML = "start-again";
      startButton.removeAttribute("hidden");
      startButton.classList.add("start-again-button");
    }

    function drawPlayAgainButton() {
      startButton.innerHTML = "play-again";
      startButton.removeAttribute("hidden");
      startButton.classList.add("start-again-button");
    }

    function drawGameOver() {
      gameOver.innerHTML = "game over!";
      gameOver.removeAttribute("hidden");
    }

    function drawWellDone() {
      gameOver.innerHTML = "well done!";
      gameOver.removeAttribute("hidden");
      navBar.classList.remove("hidden");
    }
    let game = function () {
      // move passed per step indicator
      movePassed = false;

      // make everything shine
      context.shadowColor = appleColor;
      context.shadowBlur = 10;

      // clearing game field
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgba(1, 22, 39, 0.84)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // snake behaviour
      // direction
      if (direction == 1) {
        snakeBody.unshift([snakeBody[0][0], --snakeBody[0][1]]);
      } else if (direction == 2) {
        snakeBody.unshift([++snakeBody[0][0], snakeBody[0][1]]);
      } else if (direction == 3) {
        snakeBody.unshift([snakeBody[0][0], ++snakeBody[0][1]]);
      } else if (direction == 4) {
        snakeBody.unshift([--snakeBody[0][0], snakeBody[0][1]]);
      }
      snakeBody.pop();

      // rendering
      renderSnake();

      if (snakeBody[0][0] * 10 > canvas.width - 1) {
        snakeBody[0][0] = 0;
      } else if (snakeBody[0][1] * 10 > canvas.height - 1) {
        snakeBody[0][1] = 0;
      } else if (snakeBody[0][0] < 0) {
        snakeBody[0][0] = canvas.width / 10;
      } else if (snakeBody[0][1] < 0) {
        snakeBody[0][1] = canvas.height / 10;
      }
      // snake touches itself
      snakeBody.forEach(function (e, i) {
        let lastBlock = snakeBody.length - 1;
        if (
          e[0] == snakeBody[lastBlock][0] &&
          e[1] == snakeBody[lastBlock][1] &&
          i < lastBlock &&
          score >= untouchableScore
        ) {
          drawStartAgainButton();
          drawGameOver();
          clearInterval(run);
        }
      });

      // apple spawn

      context.beginPath();
      context.arc(
        applePosition[0] * 10 + 5,
        applePosition[1] * 10 + 5,
        5,
        0,
        2 * Math.PI,
        false
      );
      context.fillStyle = appleColor;
      context.fill();

      // new apple if it was picked
      if (
        snakeBody[0][0] == applePosition[0] &&
        snakeBody[0][1] == applePosition[1]
      ) {
        snakeBody.push(snakeBody[snakeBody.length - 1]);
        applePosition[0] = getRandomCoord(width);
        applePosition[1] = getRandomCoord(height);
        score++;
      }
    };

    // arrow keys listener
    document.addEventListener("keydown", function (e) {
      e.preventDefault();
      // if key is arrow right
      if (e.keyCode == "39" && direction !== 4 && !movePassed) {
        direction = 2;

        movePassed = true;
      }
      // if key is arrow down
      if (e.keyCode == "40" && direction !== 1 && !movePassed) {
        direction = 3;

        movePassed = true;
      }
      // if key is arrow left
      if (e.keyCode == "37" && direction !== 2 && !movePassed) {
        direction = 4;

        movePassed = true;
      }
      // if key is arrow up
      if (e.keyCode == "38" && direction !== 3 && !movePassed) {
        direction = 1;

        movePassed = true;
      }
    });
    window.addEventListener("swiped", (e) => {
      if (e.target == canvas) {
        if (e.detail.dir == "up" && direction != 3) direction = 1;
        if (e.detail.dir == "right" && direction != 4) direction = 2;
        if (e.detail.dir == "down" && direction != 1) direction = 3;
        if (e.detail.dir == "left" && direction != 2) direction = 4;
      }
    });
    window.addEventListener("resize", this.setCanvasSize);
    this.setCanvasSize();

    // initial clearing
    clearPosition();
    waitScreen(); 
  },
};
</script>

<style lang="scss" scoped>
#snake {
  position: relative;
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;
  transition: all 1s ease;
}

.snake-game {
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
}

.start-game__button {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 110px;
  height: 40px;
  font-size: 14px;
  background-color: rgb(254, 165, 95);
  border-radius: 0.5em;
  border: none;
  color: #01080e;
  outline: none;
  bottom: 12%;
}

.start-again-button {
  color: rgb(96, 123, 150);
  background: none;
}

.start-again-button:hover {
  color: white;
}

.game-over {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 50px;
  bottom: 25%;
  text-align: center;
  color: #43d9ad;
  font-size: 24px;
  text-transform: uppercase;
  line-height: 50px;
  background: rgba(1, 22, 39, 0.84);
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;
}
</style>