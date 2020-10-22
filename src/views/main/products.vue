<template>
  <div>
    <v-container>
      <div class="d-flex flex-wrap">
        <v-card
          class="pa-3 ma-2 d-flex flex-column"
          :max-width="276"
          v-for="({id, name, picture, price}, index) in items" :key="id"
        >
          <v-img :src="picture" height="200px"/>

          <v-card-title>
            {{name}}
          </v-card-title>

          <v-card-actions>
            <span>${{price}}</span>

            <v-spacer/>

            <v-btn color="pink" class="white--text" :rounded="true"
                   @click="showDetail(index)">
              Details
            </v-btn>

            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </div>
      <div class="text-center">
        <v-pagination v-model="paginationParams.page" :length="paginationLength" color="pink"
                      @input="loadData" @next="loadData" @previous="loadData"/>
      </div>
    </v-container>
    <product v-if="detailItem" :product="detailItem"
             @close="detailItem=null"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Product from './product';

export default {
  name: 'products',
  components: { Product },
  data() {
    return {
      detailItem: null,
      paginationParams: {
        // todo api doesn't work with per_page param
        perPage: 2,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters({ items: 'products/paginate', total: 'products/total' }),
    paginationLength() {
      return Math.ceil(this.total / this.paginationParams.perPage);
    },
  },
  methods: {
    ...mapActions({ fetchData: 'products/fetchDataPaginate' }),
    loadData() {
      this.fetchData(this.paginationParams);
    },
    showDetail(index) {
      this.detailItem = this.items[index];
    },
  },
  created() {
    this.loadData();
  },
};
</script>
