<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform" @view-your-cart="viewCart">
  <div style="background-color: #F4F4F4">
    <v-carousel v-if="flag.searching == true">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i">
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
        <v-data-iterator :items="products" content-tag="v-layout" v-if="!readAllLoading"
                         row wrap :rows-per-page-items="rowsPerPageItems" hide-actions>
          <template v-slot:item="props">
            <v-flex xs12 sm6 md4 lg3>
              <v-card class="m-4 clickable" @click="clickCard(props.item)">
                <img v-bind:src="props.item.imgURL" height="200" v-if="props.item.imgURL != ''"/>
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
        <v-progress-linear indeterminate :active="readAllLoading"></v-progress-linear>
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
              <img class="my-4" v-bind:src="productDetail.imgURL" height="300" v-if="productDetail.imgURL != ''"/>
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
                                v-model="selectedQuantity" v-on:error="getErrorQuantityMsg"/>
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
                               v-if="props.item.product.imgURL == ''">
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
                  <v-btn color="error" block @click="checkOut" :loading="loading">Check Out</v-btn>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>


        </v-layout>
      </v-container>
    </div>

    <v-dialog v-model="flag.viewPayment" max-width="400px">
      <v-card>
        <div style="background-color: #26FF79; width: 100%; height: 150px">
          <v-img
            src="https://www.studentvip.ca/content/school/widget/large/large_widget_be1f701b-a146-485c-9ca8-5421a959705e.png"
            width="90px" height="90px" class="mx-auto" style="top: 20%;"/>
        </div>

        <!--<v-divider></v-divider>-->

        <v-card-title>
          <h5 class="mx-auto" style="font-weight: bold">Pay Success!</h5>
        </v-card-title>

        <v-card-text>your payment is success</v-card-text>
        <v-card-actions>
          <v-btn @click="flag.viewPayment = false" color="primary" class="mx-auto">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div v-if="flag.viewPayments == true">
      <v-data-table :headers="headers"
      :items="payments"
      expand
      :loading="readAllPaymentLoading">
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded" class="table-">
            <td>{{props.item.id}}</td>
            <td>{{props.item.createdTime}}</td>
            <td style="font-weight: bold; font-size: 16px">
              ${{props.item.total}}
            </td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <h2>Details</h2>
          <v-data-table :items="props.item.paymentDetails" :headers="detailHeaders" hide-actions>
            <template v-slot:items="props">
              <tr class="table-info">
                <td>
                  <img class="img-fluid" v-bind:src="props.item.product.imgURL" style="height: 50px; margin: 10px"
                       v-if="props.item.product.imgURL != ''"/>
                  <img class="img-fluid" src="../assets/no-image.png" style="height: 50px; margin: 10px"
                       v-if="props.item.product.imgURL == ''">
                </td>
                <td>{{props.item.product.name}}</td>
                <td>{{props.item.product.category.name}}</td>
                <td>{{props.item.product.supplier.name}}</td>
                <td>{{props.item.quantity}}</td>
                <td>${{props.item.price}}</td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-data-table>
    </div>

    <v-snackbar v-model="snackbar" top :timeout="2000">
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
        payments: [],
        headers: [
          {
            text: "Payment Code",
            sortable: true,
            align: 'center',
            value: "id"
          },
          {
            text: "Buy Date",
            sortable: true,
            align: 'center',
            value: 'date'
          },
          {
            text: "Total",
            sortable: true,
            align: 'center',
            value: 'total'
          }
        ],
        detailHeaders: [
          {
            text: "Image",
            align: 'center',
            sortable: false
          },
          {
            text: "Product",
            align: 'center',
            sortable: false
          },
          {
            text: "Category",
            align: 'center',
            sortable: false
          },
          {
            text: "Supplier",
            align: 'center',
            sortable: false
          },
          {
            text: "Quantity",
            align: 'center',
            sortable: false
          },
          {
            text: "Price",
            align: 'center',
            sortable: false
          }
        ],
        readAllPaymentLoading: false,
        readAllLoading: false,
        loading: false,
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
          viewPayments: false
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
      });
      this.$root.$on('view-payment', () => {
        this.viewPayments();
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
      viewPayments() {
        this.resetFlag();
        this.flag.viewPayments = true;
        this.readAllPaymentLoading = true;
        axios.get("http://localhost:8080/payments", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json',
            "Access-Control-Allow-Origin": "*"
          }
        })
          .then(res => {
            this.payments = res.data;
            let total = 0;
            for (let i = 0; i < this.payments.length; i++) {
              total = 0;
              for (let j = 0; j < this.payments[i].paymentDetails.length; j++) {
                total += parseInt(this.payments[i].paymentDetails[j].quantity, 10)  *
                  parseInt(this.payments[i].paymentDetails[j].price, 10);
              }
              this.payments[i].total = total;
              let date = this.payments[i].createdTime;
              var index = date.indexOf("T");
              this.payments[i].createdTime = date.slice(0, index);
            }
          }).finally(() => {
            this.readAllPaymentLoading = false;
        })
      },
      getErrorQuantityMsg() {
        alert("Error")
      },
      deleteCart() {
        this.carts = [];
        localStorage.removeItem("cart");
        this.totalCash();
        this.getTotalItemInCart();
      },
      checkOut() {
        if (localStorage.getItem("cart") != null) {
          this.loading = true;
          axios.post("http://localhost:8080/payments", this.carts, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
              "Content-type": 'application/json'
            }
          })
            .then(res => {
              if (res.data != "Quantity Exceed") {
                this.flag.viewPayment = true;
                this.deleteCart();
              } else {
                alert("Your quantity of product is invalid")
              }
            }).finally(() => {
            this.loading = false;
          })
        }
      },
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
        this.flag.viewPayments = false;
      },
      clickCard(item) {
        this.resetFlag();
        this.flag.viewDetail = true;
        this.productDetail = item;
      },
      buyItem(product) {
        if (localStorage.getItem("cdpmToken") !== null) {
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
        } else {
          this.$router.push("/login");
        }

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
        this.readAllLoading = true;
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
        ).finally(() => {
          this.readAllLoading = false;
        })
      },
    }
  }
</script>

<style scoped>
  .clickable {
    cursor: pointer;
  }

  h4:hover {
    color: #2196F3;
  }
</style>
