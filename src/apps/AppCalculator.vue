<template>
  <app-back-button />

  <div id="app" class="calc light">
    <div class="calc-output">
      <div class="calc-bg"></div>
      <div class="theme">
        <div class="theme-light"></div>
        <div class="theme-dark"></div>
      </div>
      <div class="calc-result" v-bind:style="{ fontSize: fontSize + 'px' }">
        {{ result }}
      </div>
      <input
        readonly
        type="text"
        class="calc-expression"
        @keyup.prevent.stop="keyboardClicked($event)"
        v-model="expression"
      />
    </div>
    <div class="calc-input">
      <div class="calc-grid">
        <div
          @click="clicked(btn)"
          class="btn"
          :key="btn"
          v-bind:class="[btn[1]]"
          v-for="btn in buttons"
        >
          {{ btn[0] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBackButton from "@/components/AppBackButton.vue";
import { evaluate } from "mathjs";

export default {
  components: {
    AppBackButton,
  },
  data: () => ({
    buttons: {
      // первый ряд
      1: ["C", "op"],
      2: ["%", "op"],
      3: ["^", "op"],
      4: ["/", "op"],
      //второй ряд
      5: ["7", "num"],
      6: ["8", "num"],
      7: ["9", "num"],
      8: ["*", "op"],
      // третий ряд
      9: ["4", "num"],
      10: ["5", "num"],
      11: ["6", "num"],
      12: ["-", "op"],
      // четвертый ряд
      13: ["1", "num"],
      14: ["2", "num"],
      15: ["3", "num"],
      16: ["+", "op"],
      // пятый ряд
      17: ["0", "num null"],
      18: [".", "num"],
      19: ["=", "op equal"],
    },
    result: "",
    expression: "",
    clearNextClick: false,
    fontSize: 105,
  }),
  methods: {
    clicked(btn) {
      if (this.clearNextClick) {
        this.clear();
      }
      if (btn[0] === "=") {
        this.result = this.calculate(this.expression);
      }
      if (btn[0] === "C") {
        this.clear();
      }
      if (
        (this.isOperation(btn) && this.hasNumberBefore()) ||
        !this.isOperation(btn)
      ) {
        this.expression += btn[0];
      }
    },
    keyboardClicked(e) {
      switch (e.key) {
        case "=":
        case "Enter":
          this.result = this.calculate(this.expression);
          break;

        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
          this.expression += e.key;
          break;

        case "Backspace":
          this.expression = this.expression.slice(0, -1);
          break;

        case "+":
        case "-":
        case "/":
        case "*":
        case "%":
        case "^":
        case ")":
          this.hasNumberBefore() ? (this.expression += e.key) : null;
          break;

        case "(":
          !this.hasNumberBefore() ? (this.expression += e.key) : {};
          break;
      }
    },
    isOperation(btn) {
      return isNaN(btn[0]);
    },
    hasNumberBefore() {
      return !this.isOperation(this.expression.slice(-1));
    },
    calculate(exp) {
      this.lock();
      let result = evaluate(exp);
      if (this.expression) this.setFontSize(result.toString().length);
      return result;
    },
    lock() {
      this.clearNextClick = true;
    },
    clear() {
      this.result = "";
      this.expression = "";
      this.clearNextClick = false;
    },
    setFontSize(length) {
      this.fontSize = 105;
      length > 6 ? (this.fontSize = 80) : {};
      length > 8 ? (this.fontSize = 60) : {};
      length > 10 ? (this.fontSize = 50) : {};
      length > 12 ? (this.fontSize = 40) : {};
      length > 14 ? (this.fontSize = 30) : {};
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 410px;
  height: 724px;

  margin: 50px auto;

  box-sizing: border-box;
  font-family: "Helvetica";
}

* {
  box-sizing: border-box;
}

.calc.light {
  background: #eef1f4;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 8px 9px 12px rgba(61, 61, 61, 0.4);
}

.calc.light > * > .calc-bg {
  background: rgba(193, 207, 216, 0.6);
  mix-blend-mode: multiply;
  filter: blur(47px);
}

.calc.light > .calc-input {
  background: rgba(207, 207, 207, 0.2);
  border-radius: 0px 0px 20px 20px;
}

.calc.light > * > * > .op {
  background: #eef1f4;
}

.calc.light > * > * > .num {
  background: white;
}

.calc {
  border-radius: 20px;
}

.calc-output {
  position: relative;

  width: 373px;
  height: 219px;

  margin: 30px 19px;
}

.calc-bg {
  position: absolute;
  width: 100%;
  height: 100%;
}

.calc-input {
  width: 100%;
  height: 445px;
}

.calc-grid {
  padding: 22px 31px;
  height: 100%;
  width: 100%;

  display: grid;
  gap: 25px;

  grid-template-columns: repeat(4, 1fr);

  justify-items: center;
  align-items: center;
}

.op {
  border-radius: 12px;
}
.calc-grid .op.equal {
  background: none;
}

.btn.num {
  border-radius: 30px;
}
.btn {
  cursor: pointer;

  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;

  border-radius: 12px;

  font-size: 24px;
  font-weight: 600;

  transition: all 0.2s ease;
}

.calc-grid .btn:hover {
  background-color: #eee;
}

.null {
  grid-column: span 2;
  width: 100%;
}

.calc-result {
  overflow: scroll;

  width: 350px;

  /* font-size: 105px; */
  font-weight: 500;

  text-align: right;

  position: absolute;
  right: 30px;
  top: 43px;
}

.calc-expression::-webkit-scrollbar,
.calc-result::-webkit-scrollbar {
  display: none;
}

.calc-expression {
  box-sizing: border-box;

  border: 1px solid transparent;
  background: none;
  outline: none;

  width: 350px;
  overflow: scroll;
  font-size: 30px;
  position: absolute;

  right: 30px;
  bottom: 9px;
  text-align: right;

  transition: 0.2 ease;
}

.calc-expression:focus {
  border-color: white;
  border-radius: 5px;
}

@media (max-width: 520px) {
  #app {
    transform: scale(0.8) translateX(-10%);
    margin: 0;
  }
}

@media (max-width: 370px) {
  #app {
    transform: scale(0.7) translate(-20%, -10%);
    margin: 0;
  }
}
</style>