import { createStore } from "vuex";

const GroceryList = {
  state: {
    products: [
    ],
    suggestions: [
      {
        "value": "говядина"
      },
      {
        "value": "индейка"
      },
      {
        "value": "креветки"
      },
      {
        "value": "курица"
      },
      {
        "value": "рыба"
      },
      {
        "value": "свинина"
      },
      {
        "value": "фарш"
      },
      {
        "value": "яйца"
      },
      {
        "value": "бекон"
      },
      {
        "value": "ветчина"
      },
      {
        "value": "колбаса вареная"
      },
      {
        "value": "колбаса с/к"
      },
      {
        "value": "котлеты"
      },
      {
        "value": "пельмени"
      },
      {
        "value": "сардельки"
      },
      {
        "value": "сосиски"
      },
      {
        "value": "сельдь"
      },
      {
        "value": "йогурт"
      },
      {
        "value": "кефир"
      },
      {
        "value": "молоко"
      },
      {
        "value": "сливки"
      },
      {
        "value": "сметана"
      },
      {
        "value": "сыр"
      },
      {
        "value": "творог"
      },
      {
        "value": "хлеб"
      },
      {
        "value": "белый хлеб"
      },
      {
        "value": "черный хлеб"
      },
      {
        "value": "горох"
      },
      {
        "value": "греча"
      },
      {
        "value": "кофе"
      },
      {
        "value": "макароны"
      },
      {
        "value": "мука"
      },
      {
        "value": "хлопья"
      },
      {
        "value": "пшено"
      },
      {
        "value": "рис"
      },
      {
        "value": "сахар"
      },
      {
        "value": "фасоль"
      },
      {
        "value": "чай"
      },
      {
        "value": "вафли"
      },
      {
        "value": "кекс"
      },
      {
        "value": "конфеты"
      },
      {
        "value": "крекеры"
      },
      {
        "value": "мороженое"
      },
      {
        "value": "печенье"
      },
      {
        "value": "рулет"
      },
      {
        "value": "сушки"
      },
      {
        "value": "торт"
      },
      {
        "value": "шоколад"
      },
      {
        "value": "грибы"
      },
      {
        "value": "зеленый лук"
      },
      {
        "value": "кабачок"
      },
      {
        "value": "капуста"
      },
      {
        "value": "картофель"
      },
      {
        "value": "морковь"
      },
      {
        "value": "огурцы"
      },
      {
        "value": "помидоры"
      },
      {
        "value": "редис"
      },
      {
        "value": "салат"
      },
      {
        "value": "свекла"
      },
      {
        "value": "тыква"
      },
      {
        "value": "перец"
      },
      {
        "value": "баклажаны"
      },
      {
        "value": "апельсины"
      },
      {
        "value": "бананы"
      },
      {
        "value": "грейпфрут"
      },
      {
        "value": "груши"
      },
      {
        "value": "абрикосы"
      },
      {
        "value": "киви"
      },
      {
        "value": "орехи"
      },
      {
        "value": "виноград"
      },
      {
        "value": "яблоки"
      },
      {
        "value": "мандарины"
      },
      {
        "value": "кинза"
      },
      {
        "value": "лук"
      },
      {
        "value": "петрушка"
      },
      {
        "value": "сельдерей"
      },
      {
        "value": "укроп"
      },
      {
        "value": "чеснок"
      },
      {
        "value": "сливочное масло"
      },
      {
        "value": "растительное масло"
      },
      {
        "value": "горчица"
      },
      {
        "value": "карри"
      },
      {
        "value": "кетчуп"
      },
      {
        "value": "лавровый лист"
      },
      {
        "value": "майонез"
      },
      {
        "value": "панировочные сухари"
      },
      {
        "value": "перец белый"
      },
      {
        "value": "перец душистый"
      },
      {
        "value": " перец черн.мол."
      },
      {
        "value": "перец черн.гор."
      },
      {
        "value": "перец красн.мол."
      },
      {
        "value": "смесь перцев"
      },
      {
        "value": "петрушка"
      },
      {
        "value": "томатная паста"
      },
      {
        "value": "укроп"
      },
      {
        "value": "уксус"
      },
      {
        "value": "тушенка"
      },
      {
        "value": "сгущенка"
      },
      {
        "value": "кукуруза"
      },
      {
        "value": "оливки"
      },
      {
        "value": "маслины"
      },
      {
        "value": "сок"
      },
      {
        "value": "пиво"
      },
      {
        "value": "минеральная вода"
      },
      {
        "value": "вино"
      },
      {
        "value": "вода"
      },
      {
        "value": "батарейки"
      },
      {
        "value": "бумажные полотенца"
      },
      {
        "value": "бумажные салфетки"
      },
      {
        "value": "губки для посуды"
      },
      {
        "value": "мешки для мусора"
      },
      {
        "value": "освежитель воздуха"
      },
      {
        "value": "отбеливатель"
      },
      {
        "value": "пищевая пленка"
      },
      {
        "value": "скотч"
      },
      {
        "value": "стиральный порошок"
      },
      {
        "value": "средство для посуды"
      },
      {
        "value": "клей"
      },
      {
        "value": "фольга"
      },
      {
        "value": "туалетная бумага"
      },
      {
        "value": "ручка"
      },
      {
        "value": "карандаш"
      },
      {
        "value": "ластик"
      },
      {
        "value": "влажные салфетки"
      },
      {
        "value": "бальзам"
      },
      {
        "value": "ватные диски"
      },
      {
        "value": "ватные палочки"
      },
      {
        "value": "гель для душа"
      },
      {
        "value": "гель для бритья"
      },
      {
        "value": "дезодорант"
      },
      {
        "value": "зубная паста"
      },
      {
        "value": "бритва"
      },
      {
        "value": "мыло"
      },
      {
        "value": "прокладки"
      },
      {
        "value": "тампоны"
      },
      {
        "value": "шампунь"
      },
      {
        "value": "кондиционер"
      }
    ],
  },

  mutations: {

    insertProduct(state, obj) {
      state.products.push(obj)
    },

    removeProduct(state, value) {
      state.products.splice(state.products.findIndex(product => product.value === value.toLowerCase()), 1)
    },

    updateProduct(state, { value, num, unit }) {
      let obj = state.products.filter(obj => obj.value === value.toLowerCase())[0]
      obj.quantity + num <= 128 ?
        obj.quantity += num :
        obj.quantity = 128
      obj.unit = unit
    },

    checkProduct(state, value) {
      let index = state.products.findIndex(product => product.value === value.toLowerCase())
      state.products[index].checked = !state.products[index].checked
    },

    loadProductsList(state) {
      typeof localStorage.products != 'undefined' ?
        state.products = JSON.parse(localStorage.products) : []
    },

    updateProductsList(state) {
      localStorage.products = JSON.stringify(state.products)
    }

  },

  actions: {
    addProduct(store, { value, quantity, unit }) {
      value = value.toLowerCase()
      let products = store.state.products
      let productExists = products.some(obj => obj.value == value)

      // обновить продукт если уже есть такой
      if (productExists) {
        store.commit('updateProduct', {
          value: value,
          num: quantity,
          unit: unit
        })
      }
      // если такого нет в списке
      else {
        store.commit('insertProduct', {
          value: value,
          quantity: quantity,
          checked: false,
          unit: unit
        })
      }

      store.commit('updateProductsList')
    },

    removeProduct(store, value) {
      store.commit('removeProduct', value)
      store.commit('updateProductsList')

    },
    checkProduct(store, value) {
      store.commit('checkProduct', value)
    },

    loadProductsList(store) {
      store.commit('loadProductsList')
    }

  },

  getters: {
    products: state => state.products,
    suggestions: state => state.suggestions,
  },

  strict: process.env.NODE_ENV !== "production",
};

export default createStore(GroceryList);
