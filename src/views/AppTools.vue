<template>
  <div class="tools">
    <app-card
      v-for="item in items"
      :key="item.route"
      :icon="item.icon"
      :title="item.title"
      :desc="item.desc"
      :route="item.route"
    />
  </div>
</template>

<script>
import AppCard from "@/components/AppCard.vue";

export default {
  data: () => ({
    items: [
      {
        icon: "calc.png",
        title: "калькулятор",
        desc: "Простой калькулятор, прямо как на телефоне. Считает плюсы и минусы и вообще прикольный",
        route: "calculator",
      },
      {
        icon: "pass.png",
        title: "генератор паролей",
        desc: "Генератор паролей с выбором опций (криптографически небезопасные)",
        route: "password-generator",
      },
      {
        icon: "grocery.png",
        title: "список покупок",
        desc: "По статистике, поход в магазин со списком покупок снижает шанс импульсивных покупок",
        route: "grocery",
      },
    ],
  }),

  components: {
    AppCard,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";

.tools {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>