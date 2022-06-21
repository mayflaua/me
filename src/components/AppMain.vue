<template>
  <div class="welcome">
    <div class="welcome__background"></div>

    <h2 class="welcome__title">
      Привет!
      <span class="welcome__hand shake">&#128075;</span>
    </h2>

    <h1 class="welcome__name">Я Данил,</h1>

    <h3 class="welcome__subtitle">Начинающий Front-end разработчик</h3>

    <p class="welcome__desc">
      Здесь я собираю все свои наработки, получившиеся по итогу изучения разных
      технологий.<br />
    </p>
    <p class="welcome__desc">
      Моя цель - стать полноценным Front-end разработчиком и попасть в команду к
      профессионалам для получения незаменимого опыта :)
    </p>
  </div>

  <div class="welcome__contact">
        <div class="container">
          Если у вас есть пожелания, советы или предложения по улучшению - 
          пожалуйста, свяжитесь со мной! 
        </div>
      
      <app-button
      route="contact"
      value="Связаться"
       />
  </div>
</template>

<script>
  import AppButton from "./AppButton";

export default {
  components: {
    AppButton
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/colors.scss';

.shake {
  animation-name: shake;
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  }
  @keyframes shake {
  10%, 20% {
  transform:  rotate3d(0, 0, 1, -3deg);
  }
  30%, 50%, 70%, 90% {
  transform:  rotate3d(0, 0, 1, 3deg);
  }
  40%, 60%, 80% {
  transform: rotate3d(0, 0, 1, -3deg);
  }
}

.welcome {
  position: relative;
  padding: 0 40% 90px 0;
  text-align: left;

  &__background {
    position: absolute;
    left: 0;
    right: 0;

    z-index: -1;

    width: 100%;
    height: 100%;

    background-image: url("@/assets/welcome-bg.jpg");
    background-repeat: no-repeat;
    background-size: 450px;
    background-position: top right;
  }

  &__name,
  &__title,
  &__subtitle {
    margin-bottom: 14px;
    margin-top: 14px;
  }

  &__name {
    font-size: 34px;
  }
  &__title {
    font-size: 28px;
  }
  &__subtitle {
    font-size: 24px;
  }
  &__hand {
    display: inline-block;
  }
  &__desc {
    text-indent: 10px;
    font-size: 22px;
    margin-bottom: 12px;
    margin-top: 50px;
    &:last-child {
      margin-top: 12px;
    }
  }
  &__contact {
    font-size: 38px;
    text-align: center;
    padding-bottom: 60px;
  }

}

@media (max-width: 1366px) {
  .welcome {  
    text-align: center;

    padding-right: 0;

    &__background {
      opacity: 0.1;
    }
  }
}

@media (max-width: 768px) {
  .welcome {
    padding-bottom: 15px;

    &__contact {
      padding: 30px 0;
      font-size: 24px;
      background-color: #eee;
      border-radius: 10px;

      box-shadow: 0 3px 6px 3px rgba(34, 60, 80, 0.2);
    }

    &__button {
      width: 120px;
      font-size: 22px;
    }
  }
}
</style>