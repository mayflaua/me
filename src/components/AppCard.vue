<template>
  <div class="item">
    <div class="item-head"></div>
    <div
      class="item-avatar"
      :style="{ backgroundImage: `url(${require('@/assets/' + icon)})` }"
    ></div>
    <div class="item-title">{{ title }}</div>
    <div class="item-desc">
      {{ desc }}
    </div>
    <app-button
      class="item-button"
      :route="route"
      value="перейти"
      :disabled="disabled"
      :isLink="isLink"
      :link="link"
    />
  </div>
</template>

<script>
import AppButton from "./AppButton.vue";

export default {
  components: {
    AppButton,
  },
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    route: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    isLink: { type: Boolean, default: false },
    link: { type: String, default: "/" },
  },

  data() {
    return {
      image: this.icon,
      bgImg: { backgroundImage: `url(${this.image})` },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";

.item {
  position: relative;

  border: 1px solid $light-color1;
  position: relative;
  margin: 0 10px 40px 10px;
  min-width: 300px;
  max-width: 300px;
  height: 450px;
  background-color: #eee;
  border-radius: 35px;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.2);

  &-head {
    position: absolute;
    width: 100%;
    height: 130px;
    background-color: $main-color;
    border-radius: 35px 35px 0 0;

    transition: all 0.3s ease;
  }

  &-avatar {
    left: 100px;
    top: 80px;
    position: absolute;
    width: 100px;
    height: 100px;

    border-radius: 50%;
    background-color: #eee;
    box-shadow: 0px 10px 20px 5px rgba(34, 60, 80, 0.2);

    background-size: 50px;
    background-position: center;
    background-repeat: no-repeat;

    transition: transform 0.5s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  &-title {
    position: absolute;
    top: 120px;

    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 600;

    margin: 80px 0 20px 0;
  }

  &-desc {
    position: absolute;
    top: 250px;
    left: 20px;
    width: 260px;

    color: $dark-color1;
    font-weight: 500;
    font-size: 18px;
    text-align: center;

    transition: all 0.3s ease;
  }

  &-button {
    position: absolute;
    left: 50px;
    bottom: 10px;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
  }

  &:hover > &-head {
    height: 100%;
    border-radius: 35px;
  }
  &:hover > &-desc {
    color: white;
  }
  &:hover > &-button {
    background: white;
    color: black;
    &:hover {
      background: #eee;
    }
  }
}

@media (max-width: 450px) {
  .item:first-child {
    margin-top: 20px;
  }
}
</style>