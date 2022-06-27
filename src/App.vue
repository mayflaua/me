<template>
  <div class="body">
    <app-header></app-header>
    <div class="content">
      <div class="container">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <div :key="route.name">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";

export default {
  data: () => ({}),
  components: {
    AppHeader,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "./style/normalize.css";
@import "./style/colors.scss";

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease;
  }
  &-enter,
  &-leave-active {
    opacity: 0;
  }
}

.body {
  position: relative;
  font-family: "Roboto", sans-serif;
  height: 90vh;
  overflow-x: hidden;

  &.noscroll {
    max-height: 100%;
    overflow: hidden;
    & > .content {
      pointer-events: none;
    }
  }
}

.container {
  max-width: 70%;
  margin: 0 auto;
}

.content {
  padding: 100px 0 150px 0;
  transition: filter 0.2s;
  &.blur {
    filter: blur(10px);
  }
}

@media (max-width: 768px) {
  .content {
    padding: 20px 0;
  }

  .container {
    max-width: 90%;
  }
}

@media (max-width: 450px) {
  .content {
    padding: 5px;
  }
}
</style>
