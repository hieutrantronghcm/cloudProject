<template>
  <div>
    <!--<h2>Supplier Page</h2>-->
    <v-btn color="success" small class="right" @click="dialog = true">New Supplier</v-btn>

    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <h2>Add new supplier</h2>
        </v-card-title>
        <v-form>
          <v-container>
            <v-layout wrap>

              <v-flex>
                <v-text-field v-model="newSupplier.name" label="Name" class="justify-center m-sm-5"/>
              </v-flex>
              <v-flex>
                <v-text-field v-model="newSupplier.address" label="Address" class="justify-center m-sm-5"/>
              </v-flex>

              <v-flex>
                <v-text-field v-model="newSupplier.phone" label="Phone" class="justify-center m-sm-5"
                              mask="###############"/>
              </v-flex>
            </v-layout>
          </v-container>

          <v-btn @click="createSupplier" :loading="createLoading" color="primary">Create</v-btn>
          <v-btn color="error" @click="dialog = false">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>


    <v-data-table :items="suppliers"
                  :headers="headers"
                  style="width: fit-content"
                  :loading="readAllLoading">
      <template slot="items" slot-scope="props" style="width: fit-content">
        <tr>
          <td>{{props.item.id}}</td>
          <td>{{props.item.name}}</td>
          <td>{{props.item.address}}</td>
          <td>{{props.item.phone}}</td>
          <td>
            <v-btn flat small color="primary"
                   @click="updatedSupplier = props.item; enableUpdate = true">
              Update
            </v-btn>
          </td>
          <td>
            <v-btn flat small color="error" @click="deleteSupplier(props.item)">Delete</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="enableUpdate" max-width="1000px">
      <v-card>
        <v-card-title>
          <h2>Update Supplier</h2>
        </v-card-title>
        <v-form>
          <v-container>
            <v-layout>
              <v-flex>
                <v-text-field v-model="updatedSupplier.name" label="Name" class="justify-center m-sm-5"/>
              </v-flex>
              <v-flex>
                <v-text-field v-model="updatedSupplier.address" label="Address" class="justify-center m-sm-5"/>
              </v-flex>

              <v-flex>
                <v-text-field v-model="updatedSupplier.phone" label="Phone" class="justify-center m-sm-5"
                              mask="###############"/>
              </v-flex>

            </v-layout>
          </v-container>

          <v-btn flat color="primary" @click="updateSupplier(updatedSupplier)" :loading="updateLoading">Update</v-btn>
          <v-btn color="error" flat @click="enableUpdate = false">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "ManageSupplier",
      data() {
        return {
          updateLoading: false,
          createLoading: false,
          readAllLoading: false,
          enableUpdate: false,
          // selectedItem: null,
          updatedSupplier: {},
          newSupplier: {
            name: '',
            address: '',
            phone: '',
          },
          dialog: false,
          suppliers: [],
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
              text: "Address",
              sortable: true,
              align: 'center',
              value: "address",
            },
            {
              text: "Phone",
              sortable: true,
              align: 'center',
              value: "phone",
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
      },

      methods: {
        readAllSupplier() {
          console.log("Reading all suppliers ...")
          this.readAllLoading = true;
          axios.get('http://localhost:8080/suppliers', {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
              "Content-type": 'application/json'
            }
          }).then(response => {
            this.suppliers = response.data;
          }).catch(
            () => console.log("Cannot found any result!")
          ).finally(() => {
            this.readAllLoading = false;
          })
        },

        createSupplier() {
          this.createLoading = true;
          axios.post("http://localhost:8080/suppliers", this.newSupplier, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
              "Content-type": 'application/json'
            }
          }).then(
            res => {
              this.suppliers = [];
              this.readAllSupplier();
              this.dialog = false;
            }
          ).finally(() => {
            this.createLoading = false;
          })
        },

        updateSupplier(item) {
          this.updateLoading = true;
          axios.put("http://localhost:8080/suppliers/" + item.id, item, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
              "Content-type": 'application/json'
            }
          }).then(
            res => {
              this.suppliers = [];
              this.readAllSupplier();
              this.enableUpdate = false;
            }
          ).finally(() => {
            this.updateLoading = false;
          })
        },

        deleteSupplier(item) {
          axios.get("http://localhost:8080/products/supplier/" + item.id, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
              "Content-type": 'application/json'
            }
          }).then(
            res => {
              if (res.data.length == 0) {
                if (confirm("Delete supplier ID: " + item.id + " - Name: " + item.name + " ?")) {
                  axios.delete("http://localhost:8080/suppliers/" + item.id, {
                    headers: {
                      "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
                      "Content-type": 'application/json'
                    }
                  }).then(
                    res => {
                      this.suppliers = [];
                      this.readAllSupplier();
                    }
                  )
                }
              }
              else {
                alert("This supplier contain products !!!");
              }
            }
          )

        } // end deleteSupplier()
      }
    }
</script>

<style scoped>

</style>
