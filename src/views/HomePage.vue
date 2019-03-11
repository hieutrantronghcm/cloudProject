<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-form>
      <br>
      <v-flex style="display: inline-flex" class="xs6">
        <v-text-field v-model="searchValue" solo label="Search product" style="width: 500px"/>
        <v-btn style="float: left;" @click="search">Search</v-btn>
      </v-flex>

    </v-form>

    <div v-if="flag.searching == true">
      <v-select :items="sortOption"
                item-text="name"
                item-value="sort"
                class="col-md-2 ml-auto" label="Sort" v-model="pagination.sort" v-on:change="readAllProduct">

      </v-select>
      <v-container>
        <v-data-iterator :items="products" content-tag="v-layout"
                         row wrap :rows-per-page-items="rowsPerPageItems" hide-actions>
          <template v-slot:item="props">
            <v-flex xs12 sm6 md4 lg3>
              <v-card class="m-4 clickable" @click="clickCard(props.item)">
                <img v-bind:src="props.item.imgURL" width="200" height="200" v-if="props.item.imgURL != ''"/>
                <img src="../assets/no-image.png" v-if="props.item.imgURL == ''" width="200" height="200">
                <v-card-title style="color: #2196F3">
                  <h3>{{props.item.name}}</h3>
                </v-card-title>
                <v-divider></v-divider>

                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Price:</v-list-tile-content>
                    <v-list-tile-content class="align-end" style="font-size: 24px">${{props.item.price}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Category:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{props.item.category.name}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Supplier:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{props.item.supplier.name}}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </template>
        </v-data-iterator>
      </v-container>
      <v-pagination v-model="pagination.page" :length="pagination.length" :total-visible="7"
                    @next="readAllProduct" @input="readAllProduct" @previous="readAllProduct">

      </v-pagination>
    </div>

    <div v-if="flag.viewDetail == true">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card flat class="h-100">
              <img class="my-4" v-bind:src="productDetail.imgURL" v-if="productDetail.imgURL != ''"/>
              <img src="../assets/no-image.png" v-if="productDetail.imgURL == ''"/>
            </v-card>
          </v-flex>

          <v-flex xs6>
            <v-card flat class="h-100">
              <v-card-title style="color: #2196F3">
                <h2>{{productDetail.name}}</h2>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Price:</v-list-tile-content>
                  <v-list-tile-content class="align-end" style="font-size: 24px">${{productDetail.price}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Category:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{productDetail.category.name}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Supplier:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{productDetail.supplier.name}}</v-list-tile-content>
                </v-list-tile>
              </v-list>

              <v-layout class="mb-3">
                <v-flex xs6 class="px-4">
                  <b-form-input class="h-100" type="number" min="1" v-bind:max="productDetail.quantity" v-model="counter" />
                </v-flex>
                <v-flex xs6>
                  <v-btn class="mx-auto w-75" large color="error" @click="buyItem">Buy</v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>

          <v-flex xs12>
            <v-card flat>
              <v-card-title>
                <h3>Description:</h3>
              </v-card-title>
              <v-card-text class="text-justify">{{productDetail.description}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

  </div>
</template>

<script>
  import SearchBar from "@/components/SearchBar";
  import axios from 'axios';

  export default {
    name: "HomePage",
    components: {
      'search-bar': SearchBar
    },
    data() {
      return {
        counter: 1,
        products: [],
        flag: {
          searching: true,
          viewDetail: false,
          viewCart: false,
          viewPayment: false,
        },
        productDetail: {

        },
        searchValue: '',
        rowsPerPageItems: [4, 8, 12],
        sortOption: [
          {
            name: 'A - Z',
            sort: {
              field: 'name',
              order: 'ASC'
            }
          },
          {
            name: 'Z - A',
            sort: {
              field: 'name',
              order: 'DESC'
            }
          },
          {
            name: 'Lowest Price',
            sort: {
              field: 'price',
              order: 'ASC'
            }
          },
          {
            name: 'Highest Price',
            sort: {
              field: 'price',
              order: 'DESC'
            }
          }
        ],
        pagination: {
          page: 0,
          size: 8,
          sort: {
            field: 'name',
            order: 'ASC',
          },
          length: 6,
        },
      }
    },
    created: function () {
      this.searchValue = '';
      this.readAllProduct('');
    },
    methods: {
      sort() {

      },
      increaseQuantity() {
        this.counter++;
      },
      decreaseQuantity() {
        this.counter--;
      },
      resetFlag() {
        this.flag.searching = false;
        this.flag.viewDetail = false;
        this.flag.viewCart = false;
        this.flag.viewPayment = false;
      },
      clickCard(item) {
        // alert("click card " + item.name);
        this.resetFlag();
        this.flag.viewDetail = true;
        this.productDetail = item;
      },
      buyItem() {
        alert("Buy")
      },

      search() {
        this.resetFlag();
        this.flag.searching = true;
        this.pagination.page = 1;
        this.readAllProduct();
      },

      readAllProduct() {
        var url = 'http://localhost:8080/products?' +
          'page=' + (this.pagination.page - 1) + '&' +
          'size=' + this.pagination.size + '&' +
          'sort=' + this.pagination.sort.field + ',' + this.pagination.sort.order + '&' +
          'searchValue=' + this.searchValue;
        axios.get(url, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(response => {
          var data = response.data;
          this.products = data.content;
          this.pagination.page = data.pageable.pageNumber + 1;
          this.pagination.length = data.totalPages;
        }).catch(
          () => console.log("Cannot found any result!")
        )
      },
    }
  }
</script>

<style scoped>
  .clickable {
    cursor: pointer;
  }
</style>
