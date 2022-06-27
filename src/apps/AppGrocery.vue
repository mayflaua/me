<template>
  <app-back-button />
  <div class="grocery-list">
    <div class="input-wrapper">
      <div class="list-input">
        <el-autocomplete
          clearable
          hide-loading
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
      <div class="list-controls">
        <button
          class="list-add-separator"
          @click="addSeparator"
          title="Добавить разделитель"
        ></button>
      </div>

      <draggable
        tag="transition-group"
        :component-data="{ name: 'fade', mode: 'out-in' }"
        v-model="products"
        item-key="id"
        ghost-class="ghost"
        @change="$store.dispatch('updateProductsList', products)"
      >
        <template #item="{ element }">
          <div>
            <AppProduct
              :id="element.id"
              :value="element.value"
              :quantity="element.quantity"
              :checked="element.checked"
              :unit="element.unit"
              :isSeparator="element.isSeparator"
            ></AppProduct>
          </div>
        </template>
      </draggable>
      <el-button
        v-if="$store.getters.allChecked"
        type="primary"
        round
        size="large"
        class="list-clear"
        @click="clearList"
        >Очистить</el-button
      >
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/AppBackButton'

import AppProduct from "@/components/AppProduct.vue";
import draggable from "vuedraggable";
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
    AppBackButton,
    ElButton,
    ElSelect,
    ElInputNumber,
    ElAutocomplete,
    ElOption,
    draggable,
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
    addSeparator() {
      this.$store.dispatch("addSeparator");
    },

    addProduct() {
      if (this.inputValue !== "") {
        this.$store.dispatch("addProduct", {
          value: this.inputValue,
          quantity: this.quantity,
          unit: this.selectedUnit,
        });
        this.quantity = 1;
        this.inputValue = "";
      }
    },

    removeProduct(value) {
      this.$store.dispatch("removeProduct", value);
    },

    clearList() {
      this.$store.dispatch("clearList");
      this.$store.dispatch("loadProductsList");
      this.products = this.$store.getters.products;
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
  margin: 10px auto;
  width: 90%;
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
.list-controls {
  width: 100%;
  min-height: 25px;
  display: flex;
  justify-content: space-around;
  padding: 0 8px;
}

.list-add-separator {
  width: 30px;
  height: 100%;

  background-color: #fff;
  background-image: url("@/assets/separator.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  outline: none;
  border: 1px solid #cfd3dc;
  border-radius: 3px;
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

.list-clear {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  width: 100px;

  box-shadow: var(--el-box-shadow);
}

.products {
  position: relative;

  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  & .ghost {
    border-left: 5px solid rgb(172, 172, 172);
    box-shadow: var(--el-box-shadow-dark);
    opacity: 0.7;
  }

  & .sortable-drag {
    opacity: 0;
  }
}
</style>