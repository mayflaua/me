<template>
  <router-link
    v-if="!isLink"
    :to="{ name: route }"
    class="button"
    :class="disabled ? 'disabled' : ''"
  >
    {{ value }}
  </router-link>
  <a
    v-else
    target="_blank"
    :href="link"
    class="button"
    :class="disabled ? 'disabled' : ''"
    >{{ value }}</a
  >
</template>

<script>
export default {
  props: {
    route: { type: String, required: true },
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    isLink: { type: Boolean, default: false },
    link: { type: String, default: "/" },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";

.button {
  display: block;
  margin: 25px auto;
  padding: 10px 20px;
  width: 160px;

  text-align: center;
  text-decoration: none;
  color: white;
  background-color: $main-color;
  font-size: 26px;
  border-radius: 25px;
  box-shadow: 0px 2px 5px 2px rgba(34, 60, 80, 0.2);

  transition: background-color 0.3s ease;

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &:hover {
    background-color: $light-color1;
  }
}
</style>