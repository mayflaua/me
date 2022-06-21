<template>
  <nav class="header">
    <router-link :to="main.route" class="header__logo">{{
      main.title
    }}</router-link>
    <div class="menu">
      <router-link
        v-for="item in menu"
        :key="item.route"
        :to="{ name: item.route }"
        class="menu__item"
        active-class="menu__item_current"
        >{{ item.title }}
        <div class="menu__arrow"></div
      ></router-link>
    </div>
    <div class="menu__burger"><span></span></div>
  </nav>
</template>

<script>
import $ from "jquery";

export default {
  data: () => ({
    main: {
      route: "/",
      title: "Главная",
    },
    menu: [
      {
        route: "tools",
        title: "Инструменты",
      },
      {
        route: "games",
        title: "Игры",
      },
      {
        route: "sites",
        title: "Сайты",
      },
      {
        route: "contact",
        title: "Связаться",
      },
    ],
  }),

  mounted() {
    const toggle = () => {
      burger.toggleClass("active");
      menu.toggleClass("active");
      content.toggleClass("blur");
      body.toggleClass("noscroll");
    };

    let burger = $(".menu__burger");
    let menu = $(".menu");
    let content = $(".content");
    let body = $(".body");

    burger.on("click", toggle);
    menu.on("click", () => {
      if (burger.is(":visible")) {
        toggle();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "src/style/colors.scss";

.header {
  z-index: 50;
  display: flex;
  flex-direction: row;

  background-color: $main-color;

  width: 100%;
  height: 60px;

  box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);

  &__logo {
    display: block;

    transition: 0.3s ease;

    text-decoration: none;
    color: white;
    font-size: 22px;

    height: 100%;
    width: 100px;
    text-align: center;
    margin-left: 20px;
    line-height: 60px;

    &:hover {
      background: $light-color1;
    }
  }
}

.menu {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  &__burger {
    display: none;

    align-self: center;
    position: relative;
    width: 30px;
    height: 20px;
    &:before,
    &:after,
    & span {
      transition: all 0.2s ease;
      position: absolute;
      display: block;
      content: "";
      width: 100%;
      height: 3px;
      border-radius: 2px;
    }

    &:after {
      bottom: 0;
    }

    & span {
      top: 9px;
    }

    &.active {
      &:before {
        transform: rotate(-45deg);
        top: 9px;
      }
      &:after {
        transform: rotate(45deg);
        top: 9px;
      }

      & span {
        width: 0;
      }
    }
  }

  &__item {
    position: relative;

    display: block;

    height: 100%;
    max-width: 250px;
    width: 18%;
    line-height: 60px;
    font-size: 22px;

    text-decoration: none;
    text-align: center;
    color: white;
    transition: all 0.3s ease;

    &_current > .menu__arrow {
      display: block;
    }

    &:hover {
      background: $light-color1;

      & > .menu__arrow {
        border-color: $light-color1;
      }
    }
  }
  &__arrow {
    display: none;
    transition: all 0.3s ease;

    position: absolute;

    bottom: -25px;
    left: 50%;

    border-bottom: 25px solid $main-color;
    border-right: 25px solid $main-color;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}

@media (max-width: 768px) {
  .header {
    justify-content: space-between;
  }

  .menu {
    right: 0;
    position: relative;
    opacity: 0;
    visibility: hidden;

    transition: all 0.3s ease;

    margin-top: 60px;
    position: absolute;
    width: 250px;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;

    align-items: flex-end;
    background: #eee;

    z-index: 2;

    &.active {
      visibility: visible;
      opacity: 1;
    }

    &__item {
      text-indent: 10px;
      position: relative;

      font-size: 18px;
      color: black;

      height: 50px;
      line-height: 50px;
      width: 100%;
      text-align: left;

      &_current {
        background: linear-gradient(90deg, #eee 80%, $light-color1);
      }

      & > .menu__arrow {
        display: none;
      }
    }

    &__burger {
      z-index: 40;
      background-color: $main-color;
      position: absolute;
      right: 10px;

      display: block;

      &:before,
      &:after,
      & span {
        background: black;
      }
    }
  }
}
</style>