<!--
File: RenterManagement.vue
Author: Peng Li
Clients: Michelle Bilek - A Home To Share
Course: CST8334 - Software Development Project - 2019W
Professor: Reg Dyer
Project: A Home to Share
Copyright @ 2019
-->
<template>
    <div id="renter-page-container">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex  sm12 md5>
          <v-layout row>
            <v-flex mx-3 d-flex>
              <v-text-field label="SEARCH" append-icon="search" v-model="search"></v-text-field>      
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex d-flex class="px-3">
              <v-layout>
                <v-flex d-flex md6>
                  <v-checkbox v-model="email" label="Email"></v-checkbox>
                  <v-checkbox v-model="name" label="Name"></v-checkbox>
                  <v-checkbox v-model="phone" label="Phone"></v-checkbox>
                  <v-checkbox v-model="yearOfBirth" label="Birth Year"></v-checkbox>
                </v-flex>
                <v-flex d-flex md3>
                  <v-select v-model="criminalityCheck" :items="criminalityCheckOptions" box label="Criminality Check" menu-props="offsetY" clearable></v-select>
                </v-flex>
                <v-flex d-flex md3>
                  <v-select v-model="gender" :items="genderOptions" box label="Gender" menu-props="offsetY" clearable></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex d-flex>
              <p class="text-lg-center">This search box will serach on selected column(s) above. If none of them are selected, it will search on all columns.</p>
              <RenterDetailPopup />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex  sm12 md7>
          <v-layout row wrap>
            <v-flex d-flex md12>
              <v-layout>
                <v-flex d-flex md2>
                  <div>
                    <v-select
                      md1
                      v-model="pagination.rowsPerPage"
                      :items="rowsPerPageItems"
                      box
                      label="Per page"
                    ></v-select>
                  </div>
                </v-flex>
                <v-flex d-flex md8>
                  <div class="text-xs-center pt-2">
                    <v-pagination v-model="pagination.page" :length="pages" :total-visible="7" circle></v-pagination>
                  </div>
                </v-flex>
                <v-flex d-flex md2>
                  <div class="text-xs-right pt-3">
                    <v-chip x-large>Total: {{filteredRenters.length}}</v-chip>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex md12>
              <v-layout>
                <v-flex d-flex>
                  <v-data-table
                    :headers="headers"
                    :items="filteredRenters"
                    :pagination.sync="pagination"
                    :rows-per-page-items ="rowsPerPageItems"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <tr @click="showRenterDetail(props.item)">
                        <td >{{ props.item.email }}</td>
                        <td class="text-xs-center">{{ props.item.firstName }}</td>
                        <td class="text-xs-center">{{ props.item.lastName }}</td>
                        <td class="text-xs-center">{{ props.item.gender }}</td>
                        <td class="text-xs-center">{{ props.item.phone }}</td>
                        <td class="text-xs-center">{{ props.item.yearOfBirth }}</td>
                        <td class="text-xs-center">{{ props.item.criminalityCheck }}</td>
                        <td class="text-xs-center">{{ props.item.referResouce }}</td>
                      </tr>
                    </template>
                  </v-data-table>

                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout>
        

      </v-layout>
    </v-container>
      
    </div>
  
</template>

<script>
import RenterDetailPopup from '../components/RenterDetailPopup'
import {userDetailBus} from '../main'

export default {
  components: {
    RenterDetailPopup
  },
  data () {
    return {
      pagination: {},
      search:'',
      renters: [],
      name:false,
      email:false,
      phone:false,
      yearOfBirth:false,
      criminalityCheck:null,
      gender:null,
      criminalityCheckOptions: [
        { value: 'Yes', text: 'Yes' },
        { value: 'No', text: 'No' }
      ],
      genderOptions: [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
      ],
      currentPage:1,
      rowsPerPageItems: [10, 20, 30, 40],
      headers: [
          { text: 'Email', align: 'left', value: 'email'},
          { text: 'First Name', value: 'firstName' },
          { text: 'Last Name', value: 'lastName' },
          { text: 'Gender', value: 'gender' },
          { text: 'Phone', value: 'phone' },
          { text: 'Year Of Birth', value: 'yearOfBirth' },
          { text: 'Criminality Check', value: 'criminalityCheck' },
          { text: 'ReferResouce', value: 'referResouce' }
        ]
    }
  },
  methods:{
    getAllRenters(){
      let url = "admin/getAllRenters";
      this.api.get(url).then(data =>{
        console.log(data);
        let orignalRentersArray = data.data;
        let rentersArray = [];
        for(let key in orignalRentersArray){
          let temp = {id:null, email:'', yearOfBirth:'', firstName: '', lastName: '', gender: '', phone:'', criminalityCheck:'', referResouce:''};
          temp.id = orignalRentersArray[key].id;
          temp.email = String(orignalRentersArray[key].email);
          temp.yearOfBirth = String(orignalRentersArray[key].dateOfBirth);
          temp.firstName = String(orignalRentersArray[key].firstName);
          temp.lastName = String(orignalRentersArray[key].lastName);
          temp.gender = orignalRentersArray[key].gender==0?"Male":"Female";
          temp.phone = String(orignalRentersArray[key].phone);
          temp.criminalityCheck = orignalRentersArray[key].criminalityCheck==undefined?null:orignalRentersArray[key].criminalityCheck?'Yes':'No';
          temp.referResouce = String(orignalRentersArray[key].referralSource);
          rentersArray.push(temp);
        }
        this.renters = rentersArray;
      });
    },
    showRenterDetail(renter){
      userDetailBus.$emit('showRenterDetail',renter);
    }
  },

  created(){
    this.getAllRenters();
    userDetailBus.$on("renterUpdated",()=>{
      this.getAllRenters();
    });
  },

  computed:{

    pages () {
      if (this.pagination.rowsPerPage == null) return 0
      return Math.ceil(this.filteredRenters.length / this.pagination.rowsPerPage)
    },

    filteredRenters:function(){
      return this.renters.filter(renter =>{
        if(!(this.name||this.email||this.phone||this.gender||this.yearOfBirth||this.gender||this.criminalityCheck!=null)){
          if(renter.firstName.match(this.search)||renter.lastName.match(this.search)){
            return true;
          }else if(renter.email.match(this.search)){
            return true;
          }else if(String(renter.phone).match(this.search)){
            return true;
          }else if(String(renter.yearOfBirth).match(this.search)){
            return true;
          }
        }
        if(this.name){
          if(renter.firstName.match(this.search)||renter.lastName.match(this.search)){
            return true;
          }
        }
        if(this.email){
          if(renter.email.match(this.search)){
            return true;
          }
        }
        if(this.phone){
          if(String(renter.phone).match(this.search)){
            return true;
          }
        }
        if(this.yearOfBirth){
          if(String(renter.yearOfBirth).match(this.search)){
            return true;
          }
        }
        if(this.criminalityCheck!=null){
          if(this.criminalityCheck==renter.criminalityCheck){
            return true;
          }
        }
        if(this.gender){
          if(this.gender==renter.gender){
            return true;
          }
        }
        return false;
      });
    }
    
  }
  
}
</script>

<style scoped>



#search{
  width: 80%;
}

.narrowbox{
  width: 1in;
}


</style>
