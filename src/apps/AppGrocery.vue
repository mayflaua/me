<template>
  <div class="grocery-list">
    <div class="input-wrapper">
      <div class="list-input">
        <el-autocomplete
          clearable
          size="large"
          :style="{ width: '100%' }"
          v-model="inputValue"
          placeholder="Что добавить в список?"
          :fetch-suggestions="getSuggestions"
          @keydown.enter="addProduct"
          maxlength="128"
        ></el-autocomplete>
      </div>
      <div class="underinput">
        <div class="list-quantity">
          <el-input-number
            :style="{ width: '100%' }"
            v-model="quantity"
            :min="1"
            :max="128"
            size="large"
            :disabled="addFieldDisabled"
            :controls="quantityHovered"
            @mouseover="onQuantityHover"
            @mouseleave="onQuantityUnhover"
          />
        </div>
        <el-select
          :disabled="addFieldDisabled"
          v-model="selectedUnit"
          placeholder="Select"
          size="large"
          class="list-units"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-button
          class="list-add-button"
          size="large"
          type="primary"
          :disabled="addFieldDisabled"
          @click="addProduct"
          >Добавить</el-button
        >
      </div>
    </div>

    <div class="products">
      <transition-group name="fade">
        <AppProduct
          v-for="product in products"
          :key="product.value"
          :value="product.value"
          :quantity="product.quantity"
          :checked="product.checked"
          :unit="product.unit"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import AppProduct from "@/components/AppProduct.vue";
import {
  ElButton,
  ElSelect,
  ElInputNumber,
  ElAutocomplete,
  ElOption,
} from "element-plus";

export default {
  components: {
    AppProduct,
    ElButton,
    ElSelect,
    ElInputNumber,
    ElAutocomplete,
    ElOption,
  },

  data() {
    return {
      inputValue: "",
      quantity: 1,

      quantityHovered: false,

      products: [],

      options: [
        {
          value: "шт",
          label: "шт",
        },
        {
          value: "кг",
          label: "кг",
        },
        {
          value: "г",
          label: "г",
        },

        {
          value: "л",
          label: "л",
        },
        {
          value: "мл",
          label: "мл",
        },
      ],
      // в штуках по дефолту
      selectedUnit: "шт",
    };
  },

  methods: {
    getSuggestions(query, cb) {
      if (this.inputValue != "") {
        let result = this.$store.getters.suggestions.filter((obj) =>
          obj.value.includes(query)
        );
        cb(result);
      }
    },

    addProduct() {
      this.$store.dispatch("addProduct", {
        value: this.inputValue,
        quantity: this.quantity,
        unit: this.selectedUnit,
      });
      this.quantity = 1;
      this.inputValue = "";
    },

    removeProduct(value) {
      this.$store.dispatch("removeProduct", value);
    },

    onQuantityHover() {
      this.addFieldDisabled ? {} : (this.quantityHovered = true);
    },

    onQuantityUnhover() {
      this.addFieldDisabled ? {} : (this.quantityHovered = false);
    },
  },

  computed: {
    addFieldDisabled() {
      return this.inputValue == "";
    },

    total() {
      return this.$store.getters.totalProducts;
    },
  },

  mounted() {
    this.$store.dispatch("loadProductsList");
    this.products = this.$store.getters.products;
  },
};
</script>

<style lang="scss" scoped>
.fade {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.4s ease-in-out;
  }
  &-enter-from {
    opacity: 0;
    transform: translateX(-100%);
  }
  &-leave-to {
    opacity: 0;
    transform: translateX(100%);
    max-width: 400px;
  }
}

.grocery-list {
  margin: 50px;
  width: 80%;
  height: 800px;

  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-dark);

  background-color: #e5eaf3;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-wrapper {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cfd3dc;
  border-top-left-radius: var(--el-border-radius-base);
  border-top-right-radius: var(--el-border-radius-base);
}

.list-input {
  margin-top: 15px;
  width: 90%;
}
.list-units {
  width: 100px;
}

.underinput {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 15px;
  width: 90%;
}

.list-quantity {
  display: block;
  min-width: 120px;

}
.products {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>