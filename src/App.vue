<template>
  <div>
    <li v-for="link in menu" :key="link.route">
      <router-link
      :to="{ name: link.route }"
      exact-active-class="active">
        {{ link.title }}
      </router-link> 
    </li>

    <router-view/>
  </div>
</template>

<script>
  export default {
    data: () => ({
      menu: [
        {
          route: 'tools',
          title: 'инструменты'
        },
        {
          route: 'games',
          title: 'игры'
        },
        {
          route: 'sites',
          title: 'сайты'
        },
        {
          route: 'contact',
          title: 'связаться'
        },
      ]
    })
  }
</script>

<style lang="scss" scoped>
  .active {
    color: red;
  }
</style>