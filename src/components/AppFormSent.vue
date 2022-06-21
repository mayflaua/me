<template>
  <app-back-button />
  <div class="sent">
    Форма должна была быть отправлена, но что-то пошло не так...
  </div>
  <img
    :class="loaded ? 'loaded' : ''"
    class="loading"
    src="@/assets/loading.gif"
  />
  <div :class="loaded ? 'loaded' : ''" class="confession">
    Отправка формы недоступна в связи с отсутствием у автора навыка :(
  </div>
  <div :class="loaded ? 'loaded' : ''" class="links">
    Но со мной можно связаться другими способами!
  </div>
  <a
    :class="loaded ? 'loaded' : ''"
    class="link link-gh"
    target="_blank"
    href="https://github.com/mayflaua"
    >Я на GitHub</a
  >
  <a
    :class="loaded ? 'loaded' : ''"
    class="link link-tg"
    target="_blank"
    href="https://t.me/pogas"
    >Я в Telegram</a
  >
</template>

<script>
import AppBackButton from "./AppBackButton.vue";

export default {
  components: {
    AppBackButton,
  },
  data: () => ({
    loaded: false,
  }),

  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
.sent {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin: 12px auto;
}

.loading {
  transition: 0.3s ease;
  display: block;
  margin: 0 auto;

  &.loaded {
    opacity: 0;
    margin-top: 80px;
  }
}

.confession {
  transition: 0.3s ease;

  font-size: 26px;
  font-weight: 600;
  text-align: center;
  margin: 0 auto;
  opacity: 0;

  &.loaded {
    opacity: 1;
  }
}

.link,
.links {
  color: black;
  text-decoration: none;
  opacity: 0;
  margin: 30px auto;
  text-align: center;

  &.loaded {
    opacity: 1;
  }
}

.links {
  font-size: 24px;
  margin-top: 50px;
}

.link {
  display: block;
  transition: 0.2s ease;

  padding: 0 10px;
  margin-top: 15px;
  font-size: 20px;
  text-align: left;

  width: 180px;
  height: 40px;
  line-height: 40px;
  border: 2px solid #ffaa00;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: #ffaa00;
    color: white;
    box-shadow: 0px 5px 5px 2px rgba(0, 0, 0, 0.4);
  }

  &-gh {
    background-image: url("@/assets/github.png");
    background-repeat: no-repeat;
    background-position: 90% center;
  }

  &-tg {
    background-image: url("@/assets/telegram.png");
    background-repeat: no-repeat;
    background-position: 90% center;
  }
}
</style>