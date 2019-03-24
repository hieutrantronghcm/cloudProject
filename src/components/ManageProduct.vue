<template>
  <div>
    <v-btn color="success" small class="right" @click="dialog = true">New Product</v-btn>

    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <h2>Create new product</h2>
        </v-card-title>
        <v-form>
          <v-container>
            <v-layout wrap>

              <v-flex xs6>
                <v-text-field v-model="newProduct.name" label="Name" class="justify-center m-sm-5"/>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="newProduct.price" label="Price ($)" class="justify-center m-sm-5"
                              mask="##########"/>
              </v-flex>

              <v-flex xs6>
                <v-text-field v-model="newProduct.quantity" label="Quantity" class="justify-center m-sm-5"
                              mask="#######"/>
              </v-flex>

              <v-flex xs6>
                <v-select v-model="newProduct.category" :items="categories" item-text="name" item-value="name"
                          label="Category" return-object
                          class="justify-center m-sm-5" message="Category" dense>
                </v-select>
              </v-flex>
              <v-flex xs6>
                <v-select v-model="newProduct.supplier" :items="suppliers" item-text="name" item-value="name"
                          label="Supplier" return-object
                          class="justify-center m-sm-5">
                </v-select>
              </v-flex>

              <v-flex xs6>
                <b-form-file v-model="file" ref="fileInput" accept="image/*" multiple placeholder="Product Image"/>
                <v-btn color="info" flat small outline @click="clearFile">Reset image</v-btn>
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="newProduct.description" label="Description" outline auto-grow
                            class="justify-center m-sm-5 mh-100"/>
              </v-flex>
            </v-layout>
          </v-container>

          <v-btn @click="createProduct" :loading="createLoading" color="primary" type="submit">Create</v-btn>
          <v-btn color="error" @click="dialog = false">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>


    <v-data-table :items="products"
                  :headers="headers"
                  style="width: fit-content"
                  :loading="readAllLoading">
      <template slot="items" slot-scope="props" style="width: fit-content">
        <tr>
          <td>{{props.item.id}}</td>
          <td>
            <img :src="props.item.imgURL" v-if="props.item.imgURL != ''" height="200" width="200"/>
            <img src="../assets/no-image.png" v-if="props.item.imgURL == ''" width="200" height="200">
          </td>
          <td>{{props.item.name}}</td>
          <td>{{props.item.price}}</td>
          <td>{{props.item.quantity}}</td>
          <td>{{props.item.description}}</td>
          <td>{{props.item.category.name}}</td>
          <td>{{props.item.supplier.name}}</td>
          <td>
            <v-btn flat small color="primary"
                   @click="enableUpdate = true; updatedProduct = props.item">
              Update
            </v-btn>
          </td>
          <td>
            <v-btn flat small color="error" @click="deleteProduct(props.item)">Delete</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="enableUpdate" max-width="1000px">
      <v-card>
        <v-card-title>
          <h2>Update Product</h2>
        </v-card-title>
        <v-form>
          <v-container>
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field v-model="updatedProduct.name" label="Name" class="justify-center m-sm-5"/>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="updatedProduct.price" label="Price ($)" class="justify-center m-sm-5"
                              mask="##########"/>
              </v-flex>

              <v-flex xs6>
                <v-text-field v-model="updatedProduct.quantity" label="Quantity" class="justify-center m-sm-5"
                              mask="#######"/>
              </v-flex>

              <v-flex xs6>
                <v-select v-model="updatedProduct.category" :items="categories" item-text="name" item-value="name"
                          label="Category" return-object
                          class="justify-center m-sm-5" message="Category" dense>
                </v-select>
              </v-flex>
              <v-flex xs6>
                <v-select v-model="updatedProduct.supplier" :items="suppliers" item-text="name" item-value="name"
                          label="Supplier" return-object
                          class="justify-center m-sm-5">
                </v-select>
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="updatedProduct.description" label="Description" outline auto-grow
                            class="justify-center m-sm-5 mh-100"/>
              </v-flex>
            </v-layout>
          </v-container>

          <v-btn flat color="primary" @click="updateProduct(updatedProduct)" :loading="updateLoading">Update</v-btn>
          <v-btn color="error" flat @click="enableUpdate = false">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "ManageProduct",
    data() {
      return {
        updateLoading: false,
        createLoading: false,
        readAllLoading: false,
        file: null,
        enableUpdate: false,
        selectedItem: null,
        updatedProduct: {},
        newProduct: {
          name: '',
          price: 0,
          quantity: 0,
          description: '',
          imgURL: '',
          category: null,
          supplier: null,
        },
        dialog: false,
        deleteDialog: false,
        categories: [],
        suppliers: [],
        products: [],
        headers: [
          {
            text: "ID",
            sortable: true,
            align: 'center',
            value: "id"
          },
          {
            text: "Image",
            align: 'center',
            value: "name"
          },
          {
            text: "Name",
            sortable: true,
            align: 'center',
            value: "name"
          },
          {
            text: "Price",
            sortable: true,
            align: 'center',
            value: "price",
          },
          {
            text: "Quantity",
            sortable: true,
            align: 'center',
            value: "quantity",
          },
          {
            text: "Description",
            align: 'center',
            value: "description",
          },
          {
            text: "Category",
            align: 'center',
            value: "category",
          },
          {
            text: "Supplier",
            sortable: true,
            align: 'center',
            name: "supplier",
          },

          {
            text: "Update",
            align: 'center',
            value: "update"
          },
          {
            text: "Delete",
            align: 'center',
            value: "delete"
          }
        ]
      }
    },

    created: function () {
      this.readAllSupplier();
      this.readAllProduct();
      this.readAllCategory();
    },

    methods: {
      clearFile() {
        this.$refs.fileInput.reset();
      },

      readAllSupplier() {
        axios.get('/suppliers', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(response => {
          this.suppliers = response.data;
        }).catch(
          () => console.log("Cannot found any result!")
        )
      },

      readAllCategory() {
        axios.get('/categories', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(response => {
          this.categories = response.data;
        }).catch(
          () => console.log("Cannot found any result!")
        )
      },

      readAllProduct() {
        this.readAllLoading = true;
        axios.get('/products/all', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(response => {
          this.products = response.data;
          console.log(this.products);
        }).catch(
          () => console.log("Cannot found any result!")
        ).finally(() => {
          this.readAllLoading = false;
        })
      },

      createProduct() {
        this.file = this.file[0];
        let formData = new FormData();
        formData.append('file', this.file);
        this.createLoading = true;
        axios.post("/image", formData, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'multipart/form-data',
            'boundary': 'XXX'
          }
        }).then(res => {
          // console.log(res.data);
          this.newProduct.imgURL = '' + res.data;
          console.log(this.newProduct.imgURL);
          console.log(this.newProduct);
          axios.post("/products", this.newProduct, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
              "Content-type": 'application/json'
            }
          }).then(
            response => {
              this.products = [];
              this.readAllProduct();
              this.dialog = false;
            }
          ).finally(() => {
            this.createLoading = false;
          })
        }).catch(error => {
          console.log(error.response.data);
        })
      },

      updateProduct(item) {
        this.updateLoading = true;
        axios.put("/products/" + item.id, item, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(
          res => {
            this.products = [];
            this.readAllProduct();
            this.enableUpdate = false;
          }
        ).finally(() => {
          this.updateLoading = false;
        })
      },

      deleteProduct(item) {
        if (confirm("Delete product ID: " + item.id + " - Name: " + item.name + " ?")) {
          axios.delete("/products/" + item.id, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
              "Content-type": 'application/json'
            }
          }).then(
            res => {
              this.products = [];
              this.readAllProduct();
            }
          )
        }
      } // end deleteProduct()
    }
  }
</script>

<style scoped>

</style>
