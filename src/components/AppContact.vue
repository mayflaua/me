<template>
  <div class="contact">
    <form action="" method="POST" name="feedback" class="form">
      <div class="form__name-label">Имя</div>
      <input type="text" class="form__name" name="name" v-model="formName" />

      <div class="form__company-label">Компания</div>
      <input
        type="text"
        class="form__company"
        name="company"
        v-model="formCompany"
      />

      <div class="form__text-label">Сообщение</div>
      <textarea
        name="message"
        cols="30"
        rows="10"
        class="form__text"
        v-model="formText"
      ></textarea>

      <app-button
        value="Отправить"
        :disabled="!formFilled"
        route="sent"
        @click="sendForm()"
      />
    </form>
  </div>
</template>

<script>
import AppButton from "./AppButton.vue";


export default {
  data: () => ({
    formName: "",
    formCompany: "",
    formText: "",
  }),
  components: {
    AppButton,
  },

  methods: {
    async sendForm() {
      console.log('когда нибудь научусь это делать')
    }
  },

  computed: {
    formFilled() {
      return ![this.formName, this.formCompany, this.formText].some(
        item => item === ""
      );
    },

    isFieldEmpty(field) {
      return field.length === "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";

.form {
  display: flex;
  flex-direction: column;

  &__name,
  &__company {
    transition: 0.2s ease;

    max-width: 300px;
    height: 30px;

    margin-top: 5px;
    padding: 5px 3px;

    border: 2px solid $light-color2;
    border-radius: 5px;
    outline: none;

    &-label {
      margin-top: 20px;
    }

    &:focus {
      border-color: $main-color;
    }
    &:hover {
      border-color: $light-color1;
      transform: scale(1.01);
    }
  }

  &__text {
    transition: 0.2s ease;

    max-width: 600px;
    height: 90px;
    resize: none;

    margin-top: 5px;
    padding: 10px 6px;

    border: 2px solid $light-color1;
    border-radius: 5px;
    outline: none;

    &-label {
      margin-top: 20px;
    }
    &:focus {
      border-color: $main-color;
    }
    &:hover {
      border-color: $light-color1;
      transform: scale(1.005);
    }
  }
}
</style>