<template>
  <v-row justify="center">
    <v-dialog width="1200px" :value="!!product"
              @click:outside="$emit('close')" @keydown.esc="$emit('close')">
      <v-card>
        <v-row no-gutters>
          <v-col cols="12" class="text-right pa-3">
            <v-icon large color="black" class="pointer" @click="$emit('close')">close</v-icon>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6">
            <v-img :src="product.picture" height="100%"/>
          </v-col>
          <v-col class="pa-3">
            <p class="display-2">{{product.name}}</p>
            <p class="display-1 mb-12">${{product.price}}</p>
            <p class="pink--text mt-12">Description</p>
            <v-divider class="mx-4"></v-divider>
            <p class="mt-4">{{product.description}}</p>
            <v-btn color="pink" class="white--text mt-10" :rounded="true"
                   @click="addToCart(product.id)">
              Add to Cart
              <v-icon>shopping_cart</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'product',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      // todo some logic
    },
  },
};
</script>
