<template>
  <div class="games">
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
import AppCard from "./AppCard.vue";

export default {
  data: () => ({
    items: [
      {
        icon: "snake.png",
        title: "змейка",
        desc: " Неоновая змейка собирает неоновые яблоки. Поможете?",
        route: "snake",
      },
      {
        icon: "kitten.png",
        title: "котенок",
        desc: "Котенок всеми силами избегает летучих мышей и.. огурцов. Понаблюдайте, поуправляйте :)",
        route: "kitten",
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

.games {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>