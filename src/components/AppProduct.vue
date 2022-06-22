<template>

  <div class="product" >
    <span class="product-name"
    :class="ifChecked()"
    @click="checkProduct(value)">
     {{ value }}
    </span>

    <div class="product-unit">
      {{ quantity }} {{ unit }}
    </div>  

    <el-button
    type="danger"
    plain
    class="product-delete"
    @click="removeProduct(value)">
      <el-icon size="15"></el-icon>
    </el-button>

  </div>

</template>

<script>
  export default {

    props: {
      value: { type: String, required: true },
      quantity: { type: Number, required: true },
      checked: { type: Boolean, default: false },
      unit: { type: String, required: true }
    },

    methods: {
      removeProduct(value) {
        this.$store.dispatch('removeProduct', value)
      },

      checkProduct(value) {
        this.$store.dispatch('checkProduct', value)
      },

      ifChecked() {
        return {
          'checked': this.checked,
          '': !this.checked
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
 .product{ 

    width: 100%;
    height: 40px;
    background: linear-gradient(90deg, #cfd3dc 60%, white);
    margin-top: 10px;

    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    box-shadow: var(--el-box-shadow-light);

    &-unit {
      transition: all .3s;
      height: 22px;
      line-height: 22px;
      margin-right: 3px;
      width: 40px;
      padding: 0;
      text-align: center;
      font-weight: 800;
      
      border: 1px solid #409EFF;
      background-color: #409EFF;
      color: white;
      border-radius: 11px;

      font-size: 12px;
    }

    &-name {
      cursor: pointer;

      position: relative;
      transition: all 1s;

      display: block;
      width: 80%;
      height: 100%;
      line-height: 40px;
      margin-left: 15px;
      overflow: hidden;

      &:before {
        transition: all .3s;
        content: '';

        display: block;
        width: 0;
        height: 0;
        position: absolute;

        border: 0 solid #6C6E72;
        border-radius: 20px;
        transform: translateY(20px);

      }

      &.checked {
        opacity: .3;

        & ~ .product-unit {
          opacity: .3;
        }
        &:before {
          content: '';
          display: block;
          width: 70%;
          height: 0;
          position: absolute;

          border: 1px solid #6C6E72;
          border-radius: 20px;
          transform: translateY(20px);
        }
      }
  
    }

    &-delete {
      display: block;
      width: 18px;
      height: 18px;
      padding: 0;
      margin-right: 5px;
      font-size: 16px;

    }
  }

</style>