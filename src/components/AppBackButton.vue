<template>
  <div class="back-button" @click="$router.go(-1)"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.back-button {
  cursor: pointer;
  opacity: 0.6;

  transition: 0.3s ease;

  position: relative;
  width: 40px;
  height: 40px;
  background: #ffaa00;
  border-radius: 20px;

  overflow: hidden;

  box-shadow: 0px 2px 5px 2px rgba(34, 60, 80, 0.2);

  &:before {
    transition: 0.3s ease;

    content: "";
    background: url("@/assets/back.png") center no-repeat;
    background-size: 25px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &:after {
    transition: 0.3s ease;

    content: "Назад";
    font-size: 20px;
    line-height: 40px;
    font-weight: 500;
    color: white;
    width: 100%;
    position: absolute;
    right: -50px;
  }

  &:hover {
    opacity: 1;
    width: 100px;
    &:before {
      left: -60px;
    }
    &:after {
      right: 0;
    }
  }
}
</style>