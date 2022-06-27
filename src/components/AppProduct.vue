<template>
  <div v-if="!isSeparator" class="product">
    <span class="product-name" :class="ifChecked()" @click="checkProduct(id)">
      {{ value }}
    </span>

    <div class="product-unit">{{ quantity }} {{ unit }}</div>

    <el-button
      type="danger"
      plain
      class="product-delete"
      @click="removeProduct(id)"
    />
  </div>

  <div v-else class="separator">
    <div class="separator-value">
      <input v-model.lazy="value" placeholder="Разделитель" @change="updateSeparatorValue(id, value)" />
    </div>
    <el-button
      type="danger"
      plain
      class="separator-delete"
      @click="removeProduct(id)"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    value: { type: String, required: true },
    quantity: { type: Number, required: true },
    checked: { type: Boolean, default: false },
    unit: { type: String, required: true },
    isSeparator: { type: Boolean, default: false },
  },

  methods: {
    updateSeparatorValue(id, value) {
      this.$store.dispatch("updateValue", { id, value });
    },
    removeProduct(id) {
      this.$store.dispatch("removeProduct", id);
    },

    checkProduct(id) {
      this.$store.dispatch("checkProduct", id);
    },

    ifChecked() {
      return {
        checked: this.checked,
        "": !this.checked,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.separator {
  display: flex;
  align-items: center;

  &-value {
    min-width: 50%;
    width: 100%;

    & input {
      margin: 3px 0 0 50px;
      border: none;
      outline: none;
      background: transparent;
      color: #aaaeb6;
    }

    &:before {
      content: "";
      display: block;
      position: absolute;
      height: 5px;
      border-radius: 3px;
      width: 90%;
      margin: 0 auto;
      left: 0;
      right: 0;
      background-color: #cfd3dc;
    }
  }

  &-delete {
    display: block;
    min-width: 15px;
    height: 15px;

    margin-right: 5px;
    padding: 0;
    background-image: url("@/assets/close.png");
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
  }
}
.product {
  width: 100%;
  height: 40px;
  background: #cfd3dc;
  margin: 7px 0;

  font-size: 16px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  box-shadow: var(--el-box-shadow-light);

  &-unit {
    transition: all 0.3s;
    height: 22px;
    line-height: 22px;
    margin-right: 3px;
    width: 40px;
    padding: 0;
    text-align: center;
    font-weight: 800;

    border: 1px solid #409eff;
    background-color: #409eff;
    color: white;
    border-radius: 11px;

    font-size: 12px;
  }

  &-name {
    cursor: pointer;

    position: relative;
    transition: all 1s;

    display: block;
    width: 100%;
    height: 100%;
    line-height: 40px;
    margin-left: 15px;
    overflow: hidden;

    &:before {
      transition: all 0.3s;
      content: "";

      display: block;
      width: 0;
      height: 0;
      position: absolute;

      border: 0 solid #6c6e72;
      border-radius: 20px;
      transform: translateY(20px);
    }

    &.checked {
      opacity: 0.3;

      & ~ .product-unit {
        opacity: 0.3;
      }
      &:before {
        content: "";
        display: block;
        width: 70%;
        height: 0;
        position: absolute;

        border: 1px solid #6c6e72;
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

    background-image: url("@/assets/close.png");
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
  }
}
</style>