<template>
  <div class="sites">
    <app-card
      v-for="item in items"
      :key="item.route"
      :icon="item.icon"
      :title="item.title"
      :desc="item.desc"
      :route="item.route"
      :isLink="item.isLink"
      :link="item.link"
      :techs="item.techs"
    />
  </div>
</template>

<script>
import AppCard from "@/components/AppCard.vue";

export default {
  components: {
    AppCard,
  },

  data: () => ({
    items: [
      {
        icon: "portfolio.png",
        title: "портфолио",
        desc: "Первый проект, сайт-портфолио",
        route: "portfolio",
        techs: ["html", "css", "js"],

        isLink: true,
        link: "https://mayflaua.github.io/",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.sites {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>