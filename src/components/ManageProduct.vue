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
                <v-textarea max-height="100px" v-model="newProduct.description" label="Description"
                            class="justify-center m-sm-5"/>
              </v-flex>
            </v-layout>
          </v-container>

          <v-btn @click="createProduct" color="primary">Create</v-btn>
          <v-btn color="error" @click="dialog = false">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>


    <v-data-table :items="products"
                  :headers="headers"
                  style="width: fit-content">
      <template slot="items" slot-scope="props" style="width: fit-content">
        <tr>
          <td>{{props.item.id}}</td>
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
              <v-flex xs6>
                <v-textarea max-height="100px" v-model="updatedProduct.description" label="Description"
                            class="justify-center m-sm-5"/>
              </v-flex>
            </v-layout>
          </v-container>

          <v-btn flat color="primary" @click="updateProduct(updatedProduct)">Update</v-btn>
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
        enableUpdate: false,
        selectedItem: null,
        updatedProduct: {},
        newProduct: {
          name: '',
          price: 0,
          quantity: 0,
          description: '',
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
      // this.categories.push({text: String(phone)})
      this.readAllSupplier();
      this.readAllProduct();
      this.readAllCategory();
    },

    methods: {

      readAllSupplier() {
        console.log("Reading all suppliers ...")
        axios.get('http://localhost:8080/suppliers', {
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
        console.log("Reading all categories ...")
        axios.get('http://localhost:8080/categories', {
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
        console.log("Reading all products ...")
        axios.get('http://localhost:8080/products/all', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(response => {
          this.products = response.data;
        }).catch(
          () => console.log("Cannot found any result!")
        )
      },


      createProduct() {
        axios.post("http://localhost:8080/products", this.newProduct, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(
          res => {
            this.products = [];
            this.readAllProduct();
            this.dialog = false;
          }
        )
      },

      updateProduct(item) {
        axios.put("http://localhost:8080/products/" + item.id, item, {
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
        )
      },

      deleteProduct(item) {
        if (confirm("Delete product ID: " + item.id + " - Name: " + item.name + " ?")) {
          axios.delete("http://localhost:8080/products/" + item.id, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
              "Content-type": 'application/json'
            }
          }).then(
            res => {
              console.log(res)
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
