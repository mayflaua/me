<template>
  <app-back-button />

  <div class="kitten">
    <canvas id="game"
      >К сожалению, Ваш браузер не поддерживает эту игру :(</canvas
    >
  </div>
</template>

<script>
import AppBackButton from "@/components/AppBackButton";

import kaboom from "kaboom";
export default {
  components: {
    AppBackButton,
  },
  methods: {
    game() {
      {
        window.addEventListener("resize", () => {
          // window.location.reload();
        });
        kaboom({
          width: 1366,
          height: 768,
          canvas: document.querySelector("#game"),
          debug: false,
        });

        debug.inspect = false;
        let SPEED = 240;
        const FLOOR_HEIGHT = 50;
        const BACKGROUND = [
          sprite("background", {
            width: width(),
            height: height(),
            anim: "day",
          }),
          z(-1),
          "bg",
        ];

        let score = 0;
        let highScore = getData("highScore", 0);

        const kittenProps = [
          sprite("kitten", {
            anim: "idle",
          }),
          pos(100, 0),
          area(),
          origin("bot"),
          body(),
          scale(2),
        ];

        const groundProps = [
          sprite("ground", {
            anim: "day",
          }),
          pos(0, height()),
          area({
            width: width(),
            height: 240,
          }),
          origin("botleft"),
          solid(),
        ];

        let kitten, ground;
        let currentBackground;

        loadSprite("kitten", "https://i.imgur.com/4pcWSkV.png", {
          sliceX: 11,
          sliceY: 1,
          anims: {
            run: {
              from: 2,
              to: 3,
              loop: true,
              speed: 7,
            },
            idle: {
              from: 7,
              to: 10,
              loop: true,
              speed: 5,
            },
            jump: {
              from: 4,
              to: 6,
              loop: false,
              speed: 3,
            },
            bend: {
              from: 0,
              to: 1,
              loop: true,
              speed: 15,
            },
          },
        });
        loadSprite("cucumber", "https://i.imgur.com/BhfHDqp.png");
        loadSprite("bat", "https://i.imgur.com/sYeiFCJ.png", {
          sliceX: 2,
          sliceY: 1,
          anims: {
            fly: {
              from: 0,
              to: 1,
              loop: true,
              speed: 7,
            },
          },
        });
        loadSprite("background", "https://i.imgur.com/85RNo4Y.jpg", {
          sliceX: 2,
          sliceY: 2,
          anims: {
            day: {
              from: 0,
              to: 1,
              loop: true,
              speed: 1,
            },
            night: {
              from: 2,
              to: 3,
              loop: true,
              speed: 1,
            },
          },
        });
        loadSprite("ground", "https://i.imgur.com/SSnvEuC.png", {
          sliceX: 2,
          sliceY: 2,
          anims: {
            day: {
              from: 0,
              to: 1,
              loop: true,
              speed: 3,
            },
            night: {
              from: 2,
              to: 3,
              loop: true,
              speed: 3,
            },
          },
        });

        let bg;

        scene("game", () => {
          bg = add(BACKGROUND);
          currentBackground = "night";
          SPEED = 240;

          kitten = add(kittenProps);
          ground = add(groundProps);

          run();

          score = 0;

          const scoreLabel = add([text(score), pos(24, 24)]);
          function spawnCucumber() {
            add([
              sprite("cucumber"),
              area(),
              pos(width(), height() - 200 - FLOOR_HEIGHT),
              origin("botleft"),
              move(LEFT, SPEED),
              "cucumber",
              scale(0.7),
            ]);
          }

          function spawnBat() {
            isTouch()
              ? {}
              : add([
                  sprite("bat", { anim: "fly" }),
                  area({ scale: 0.8 }),
                  origin("center"),
                  pos(width(), height() - 200 - FLOOR_HEIGHT * rand(1.5, 3)),
                  origin("botleft"),
                  move(LEFT, SPEED * 1.1),
                  "bat",
                ]);
          }

          loop(spawnDelay(), () => {
            rand(0, 100) < 80 ? spawnCucumber() : spawnBat();

            SPEED += 5;
          });

          loop(15, () => {
            if (currentBackground === "day") {
              bg.play("night");
              ground.play("night");
              currentBackground = "night";
            } else {
              bg.play("day");
              ground.play("day");
              currentBackground = "day";
            }
          });

          function jump() {
            if (kitten.isGrounded()) {
              kitten.jump(700);
              kitten.play("jump");
              kitten.area.scale = 0.5;
              wait(1, () => {
                kitten.play("run");
                kitten.area.scale = 1;
              });
            }
          }

          function run() {
            kitten.play("run");
            kitten.area.height = 50;
          }

          function bend() {
            if (kitten.isGrounded()) {
              kitten.play("bend");
              kitten.area.height = 25;
            }
          }

          function spawnDelay() {
            return rand(2, 3);
          }

          onKeyPress("space", jump);
          onKeyPress("up", jump);

          onClick(jump);
          onKeyPress("down", bend);
          onMouseDown("right", bend);
          onMouseRelease("right", run);
          onKeyRelease("down", run);

          kitten.onCollide("cucumber", () => {
            go("gameover");
          });
          kitten.onCollide("bat", () => {
            go("gameover");
          });

          onUpdate(() => {
            scoreLabel.text = Math.floor(score++ / 10);
          });
        });

        scene("gameover", () => {
          add([
            text("Game over"),
            pos(width() / 2, height() / 2 - 75),
            origin("center"),
          ]);
          if (score > highScore) {
            highScore = score;
            setData("highScore", highScore);
          }
          add([
            text("High score: " + Math.floor(highScore / 10)),
            pos(center()),
            origin("center"),
          ]);
          add([
            text("Your score: " + Math.floor(score / 10)),
            pos(width() / 2, height() / 2 + 75),
            origin("center"),
          ]);
          score = 0;

          bg = add(BACKGROUND);

          onKeyPress("space", () => go("intro"));
          onTouchStart(() => go("intro"));
          onClick(() => go("intro"));
        });

        scene("intro", () => {
          bg = add(BACKGROUND);
          add([
            text("Press Space to start", {
              size: 48,
              font: "apl386",
            }),
            pos(width() / 2, height() / 2 - 50),
            origin("center"),
            color(BLACK),
          ]),
            (kitten = add(kittenProps));
          ground = add(groundProps);
          onKeyPress("space", () => go("game"));
          onClick(() => go("game"));
          onTouchStart(() => go("game"));
        });

        go("intro");
      }
    },
  },

  mounted() {
    this.game();
  },
};
</script>

<style lang="scss" scoped>
.kitten {
  width: 100%;
  height: 100%;
}
</style>