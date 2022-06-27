<template>
  <form name="form" class="form" @submit.prevent.stop="send">
    <label for="name" class="form-name__label">Имя</label>
    <input
      class="form-name__input"
      type="text"
      name="name"
      v-model="name"
      required
    />

    <label for="email" class="form-email__label">Email</label>
    <input
      class="form-email__input"
      type="email"
      name="email"
      v-model="email"
      required
    />

    <label for="msg" class="form-msg__label">Сообщение</label>
    <textarea
      class="form-msg__input"
      type="text"
      name="msg"
      v-model="msg"
      required
    />
    <button type="submit" class="form-button" :disabled="isSending">
      Отправить
    </button>
  </form>
</template>

<script>
import $ from "jquery";

export default {
  data: () => ({
    name: "",
    email: "",
    msg: "",
    isSending: false,
    error: "",
  }),

  methods: {
    send() {
      $.ajax({
        url: "https://letmepresentmyself.site/send.php",
        type: "POST",
        cache: false,
        data: {
          name: this.name,
          email: this.email,
          msg: this.msg,
        },
        dataType: "html",
        beforeSend: function () {
          this.isSending = true;
        },
        success: (data) => {
          if (!data) {
            alert("Произошла какая-то ошибка.. Повторите, пожалуйста :)");
          } else {
            this.$router.push("/contact/sent");
          }
        },
      });
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 5px;

  &-name__label,
  &-email__label,
  &-msg__label {
    margin: 25px 0 3px 10px;
    font-size: 20px;
    font-weight: 500;
  }

  &-name__input,
  &-email__input,
  &-msg__input {
    transition: 0.2s ease;

    display: block;
    resize: none;
    height: 30px;
    padding: 3px 8px;

    border: 2px solid $light-color1;
    border-radius: 6px;
    outline: none;

    &:focus {
      border: 2px solid $main-color;
      box-shadow: none;
    }
  }
  &-msg__input {
    height: 100px;
  }

  &-button {
    display: block;
    margin: 25px auto;
    padding: 10px 20px;
    width: 160px;
    outline: none;
    border: none;
    cursor: pointer;

    text-align: center;
    text-decoration: none;
    color: white;
    background-color: $main-color;
    font-size: 22px;
    border-radius: 25px;
    box-shadow: 0px 2px 5px 2px rgba(34, 60, 80, 0.2);

    transition: background-color 0.3s ease;

    &[disabled] {
      opacity: 0.6;
      pointer-events: none;
    }

    &:hover {
      background-color: $light-color1;
    }
  }
}
</style>