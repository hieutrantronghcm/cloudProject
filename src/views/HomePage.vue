<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform" @view-your-cart="viewCart">
  <div style="background-color: #F4F4F4">
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i">
        <!--:src="item.src"-->
        <img :src="item.src" class="img-fluid" style="width: 100%"/>
      </v-carousel-item>
    </v-carousel>
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
                    <v-list-tile-content class="align-end" style="font-size: 24px">${{props.item.price}}
                    </v-list-tile-content>
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
                  <v-list-tile-content class="align-end" style="font-size: 24px">${{productDetail.price}}
                  </v-list-tile-content>
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
                  <b-form-input class="h-100" type="number" min="1" v-bind:max="productDetail.quantity"
                                v-model="selectedQuantity"/>
                </v-flex>
                <v-flex xs6>
                  <v-btn class="mx-auto w-75" large color="error" @click="buyItem(productDetail)">Buy</v-btn>
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

    <div v-if="flag.viewCart == true">
      <v-container>
        <v-layout>
          <v-flex md9 class="mr-3">
            <v-data-iterator :items="carts"
                             :rows-per-page-items="rowsPerPageItems" hide-actions>
              <template v-slot:item="props">
                <v-card flat="" class="mb-3">
                  <v-card-text>
                    <v-layout row>
                      <v-card style="background-color: white; height: 150px; width: 100px" flat>
                        <v-card-text>
                          <img class="img-fluid" v-bind:src="props.item.product.imgURL"
                               v-if="props.item.product.imgURL != ''"/>
                          <img class="img-fluid" src="../assets/no-image.png"
                               v-if="props.item.product.imgURL == ''" >
                        </v-card-text>
                      </v-card>

                      <v-flex d-flex>
                        <v-card style="background-color: white" flat>
                          <v-card-text>
                            <v-layout row>
                              <v-card lable="white pink" style="width: 480px" flat>
                                <v-layout column>
                                  <v-card style="background-color: white" flat>
                                    <v-card-title>
                                      <h4 class="text-left text-wrap clickable" @click="clickCard(props.item.product)">
                                        {{props.item.product.name}}
                                      </h4>
                                    </v-card-title>
                                  </v-card>
                                  <v-card style="background-color: white" flat>
                                    <v-card-title>
                                      <a href="#" @click="removeItem(props.item)" style="font-size: 12px">Remove</a>
                                    </v-card-title>
                                  </v-card>
                                </v-layout>
                              </v-card>
                              <v-card style="background-color: white" flat width="83px">
                                <v-card-text style="font-size: 18px; font-weight: bold">
                                  ${{props.item.product.price}}
                                </v-card-text>
                              </v-card>
                              <v-card style="background-color: white" width="155px" flat>
                                <v-card-text>
                                  <b-form-input
                                                type="number"
                                                min="1"
                                                v-bind:max="productDetail.quantity"
                                                v-model="props.item.quantity" v-on:change="changeQuantity"/>
                                </v-card-text>
                              </v-card>
                            </v-layout>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </template>
            </v-data-iterator>
          </v-flex>

          <v-flex md3>
            <v-layout class="ml-1" column wrap>
              <v-flex>
                <v-card flat>
                  <v-card-title>
                    Total Cash: <h2 class="ml-auto" style="color: #ff253a">${{totalPay}}</h2>
                  </v-card-title>
                </v-card>
                <v-card class="mt-2" flat>
                  <v-btn color="error" block>Check Out</v-btn>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>


        </v-layout>
      </v-container>
    </div>

    <v-snackbar v-model="snackbar" top timeout="2000">
      {{snackbarText}}
      <v-btn flat color="pink" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
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
        snackbarText: '',
        snackbar: false,
        items: [
          {
            src: 'https://i1.wp.com/www.inventiva.co.in/wp-content/uploads/2018/07/samsung-banners.png?fit=1000%2C450&ssl=1'
          },
          {
            src: 'https://cdn-media.placewellretail.com/media/catalog/category/Sony_Banner.jpg'
          },
          {
            src: 'https://www.techwelike.com/wp-content/uploads/2013/10/Google-Nexus-5-Android-Smartphone-at-Google-Play-Store-banner.png'
          },
          {
            src: 'https://pro2-bar-s3-cdn-cf3.myportfolio.com/76419d26711f3631d7bfdf4358c946ad/ebf28c899c6848a46d4f3f34_rw_1200.png?h=ae5460bebf1164dd59334ac5f72a1977'
          },
          {
            src: 'https://www.lg.com/ae/images/MC/features/V30_Hero-Banner-D_new1_DR.jpg',
          }
        ],
        selectedQuantity: 1,
        totalPay: 0,
        carts: [],
        cart: {
          product: null,
          quantity: 1
        },
        products: [],
        flag: {
          searching: true,
          viewDetail: false,
          viewCart: false,
          viewPayment: false,
        },
        productDetail: {},
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
    mounted: function () {
      this.$root.$on('view-cart', () => {
        this.viewCart();
      })
    },
    created: function () {
      this.searchValue = '';
      this.readAllProduct('');
      if (localStorage.getItem("cart") != null) {
        this.carts = JSON.parse(localStorage.getItem("cart"));
      }
    },
    methods: {
      getTotalItemInCart() {
        this.$store.dispatch('getTotalItemInCart');
      },
      removeItem(cart) {
        for (let i = 0; i < this.carts.length; i++) {
          if (this.carts[i].product.id == cart.product.id) {
            this.carts.splice(i, 1);
            break;
          }
        }
        this.totalCash();
        localStorage.setItem("cart", JSON.stringify(this.carts));
        this.getTotalItemInCart();
        this.snackbarText = "Removed Product";
        this.snackbar = true;
      },
      changeQuantity() {
        this.totalCash();
        localStorage.setItem("cart", JSON.stringify(this.carts));
        this.getTotalItemInCart();
        this.snackbarText = "Changed Quantity";
        this.snackbar = true;
      },
      totalCash() {
        this.totalPay = 0;
        for (var i = 0; i < this.carts.length; i++) {
          this.totalPay += this.carts[i].product.price * this.carts[i].quantity;
        }
      },
      viewCart() {
        this.resetFlag();
        this.flag.viewCart = true;
        this.totalCash();
      },
      resetFlag() {
        this.flag.searching = false;
        this.flag.viewDetail = false;
        this.flag.viewCart = false;
        this.flag.viewPayment = false;
      },
      clickCard(item) {
        this.resetFlag();
        this.flag.viewDetail = true;
        this.productDetail = item;
      },
      buyItem(product) {
        let existedProduct = false;
        for (let i = 0; i < this.carts.length; i++) {
          if (this.carts[i].product.id == product.id) {
            this.carts[i].quantity = parseInt(this.carts[i].quantity, 10) + parseInt(this.selectedQuantity, 10);
            existedProduct = true;
          }
        }
        if (existedProduct == false) {
          this.cart.quantity = parseInt(this.selectedQuantity, 10);
          this.cart.product = product;
          this.carts.push(this.cart)
        }
        this.selectedQuantity = 1;
        localStorage.setItem("cart", JSON.stringify(this.carts));
        this.getTotalItemInCart();
        this.snackbarText = "Added Product";
        this.snackbar = true;
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
  h4:hover{
    color: #2196F3;
  }
</style>
