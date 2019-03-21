<template>
  <div>
    <v-btn color="success" small class="right" @click.stop="dialog = true">New Category</v-btn>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <h2>Create new category</h2>
        </v-card-title>
        <v-form>
          <v-text-field v-model="newCategory.name" placeholder="Name" class="justify-center m-sm-5"/>
          <v-btn flat color="primary" @click="createCategory" :loading="createLoading">Create</v-btn>

          <v-btn color="error" flat @click="dialog = false">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>


    <v-data-table :loading="readAllLoading" :items="categories"
                  :headers="headers"

                  style="width: fit-content">

      <!--<template slot="headers" slot-scope="props">-->
        <!--<tr>-->
          <!--<th>{{props.header.text}}</th>-->
        <!--</tr>-->
      <!--</template>-->

      <template slot="items" slot-scope="props" style="width: fit-content">
        <tr>
          <td>
            {{props.item.id}}
          </td>
          <td>
            {{props.item.name}}
          </td>
          <td>
            <v-btn flat small color="primary" @click="enableUpdate = true; updatedCategory.name = props.item.name, updatedCategory.id = props.item.id">
              Update
            </v-btn>
          </td>
          <td>
            <v-btn :disabled="isHavingProduct(props.item)" flat small color="error"
                   @click="deleteCategory(props.item)">Delete</v-btn>
          </td>

        </tr>

      </template>
      <!--updateCategory(props.item)-->


    </v-data-table>

    <v-dialog v-model="enableUpdate" max-width="500px">
      <v-card>
        <v-card-title>
          <h2>Update category</h2>
        </v-card-title>
        <v-form>
          <v-text-field v-model="updatedCategory.name" placeholder="Name" class="justify-center m-sm-5" required/>
          <v-btn flat color="primary" @click="updateCategory(updatedCategory)" :loading="updateLoading">Update</v-btn>

          <v-btn color="error" flat @click="enableUpdate = false">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: "UpdateCategoryForm",

    data() {
      return {
        updateLoading: false,
        createLoading: false,
        readAllLoading: false,
        enableUpdate: false,
        selectedItem: null,
        updatedCategory: {
          id: '',
          name: '',
        },
        newCategory: {
          name: ''
        },
        dialog: false,
        deleteDialog: false,
        categories: [],
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
      this.readAllCategory();
    },

    methods: {
      resetData() {
        console.log('Resetting data ...');
        this.categories = [];
      },

      readAllCategory() {
        console.log("Reading all categories ...")
        this.readAllLoading = true;
        axios.get('http://localhost:8080/categories', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(response => {
          this.categories = response.data;
          // console.log(this.categories);
        }).catch(
          () => console.log("Cannot found any result!")
        ).finally(() => {
          this.readAllLoading = false;
        })
      },

      createCategory() {
        this.createLoading = true;
        axios.post("http://localhost:8080/categories", this.newCategory, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(
          res => {
            console.log(res)
            this.resetData();
            this.readAllCategory();
            this.dialog = false;
          }
        ).finally(() => {
          this.createLoading = false;
        })
      },
      updateCategory(item) {
        console.log('----- Start update -----')
        this.updateLoading = true;
        axios.put("http://localhost:8080/categories/" + item.id, item, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(
          res => {
            console.log(res)
            this.resetData();
            this.readAllCategory();
            this.enableUpdate = false;
          }
        ).finally(() => {
          this.updateLoading = false;
        })
        console.log('----- Finish update -----')
      },

      deleteCategory(item) {
        axios.get("http://localhost:8080/products/category/" + item.id, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(
          res => {
            if (res.data.length == 0) {
              if (confirm("Delete category: " + item.name + " ?")) {
                axios.delete("http://localhost:8080/categories/" + item.id, {
                  headers: {
                    "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
                    "Content-type": 'application/json'
                  }
                }).then(
                  res => {
                    console.log(res)
                    this.resetData();
                    this.readAllCategory();
                  }
                )
              }
            }
            else {
              alert("This category contain products !!!");
            }
          }
        )
      },

      isHavingProduct(item) {
        axios.get("http://localhost:8080/products/category/" + item.id, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
            "Content-type": 'application/json'
          }
        }).then(
          res => {
            if (res.data.length > 0) {
              console.log(item.id)
              console.log(res.data)
              return true;
            }
            else return false;
          }
        )
      }
    }

  }
</script>

<style scoped>

</style>
