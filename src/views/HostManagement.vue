<template>
    <div id="host-page-container">
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
                <v-flex d-flex md9>
                  <v-checkbox v-model="email" label="Email"></v-checkbox>
                  <v-checkbox v-model="name" label="Name"></v-checkbox>
                  <v-checkbox v-model="phone" label="Phone"></v-checkbox>
                  <v-checkbox v-model="address" label="Address"></v-checkbox>
                  <v-checkbox v-model="year_of_birth" label="Birth Year"></v-checkbox>
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
              <HostDetailPopup/>
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
                    <v-chip x-large>Total: {{filteredHosts.length}}</v-chip>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex md12>
              <v-layout>
                <v-flex d-flex>
                  <v-data-table
                    :headers="headers"
                    :items="filteredHosts"
                    :pagination.sync="pagination"
                    :rows-per-page-items ="rowsPerPageItems"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <tr @click="showHostDetail(props.item)">
                        <td >{{ props.item.email }}</td>
                        <td class="text-xs-center">{{ props.item.first_name }}</td>
                        <td class="text-xs-center">{{ props.item.last_name }}</td>
                        <td class="text-xs-center">{{ props.item.gender }}</td>
                        <td class="text-xs-center">{{ props.item.phone }}</td>
                        <td class="text-xs-center">{{ props.item.year_of_birth }}</td>
                        <td class="text-xs-center">{{ props.item.address }}</td>
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
import HostDetailPopup from '../components/HostDetailPopup'
import {userDetailBus} from '../main'

export default {
  components: {
    HostDetailPopup
  },
  data () {
    return {
      pagination: {},
      search:'',
      hosts: [],
      name:false,
      email:false,
      phone:false,
      year_of_birth:false,
      address:false,
      gender:null,
      genderOptions: [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
      ],
      currentPage:1,
      rowsPerPageItems: [1, 10, 20, 30, 40],
      headers: [
          {
            text: 'Email',
            align: 'left',
            value: 'email'
          },
          { text: 'First Name', value: 'first_name' },
          { text: 'Last Name', value: 'last_name' },
          { text: 'Gender', value: 'gender' },
          { text: 'Phone', value: 'phone' },
          { text: 'Year Of Birth', value: 'year_of_birth' },
          { text: 'Address', value: 'address' },
          { text: 'ReferResouce', value: 'referResouce' }
        ]
    }
  },
  methods:{
    getAllHosts(){
      let url = "admin/getAllHosts";
      this.api.get(url).then(data =>{
        console.log(data);
        let orignalHostsArray = data.data;
        let hostsArray = [];
        for(let key in orignalHostsArray){
          let temp = {email:'', year_of_birth:'', first_name: '', last_name: '', gender: '', phone:'', address:'', referResouce:''};
          temp.email = String(orignalHostsArray[key].email);
          temp.year_of_birth = String(orignalHostsArray[key].dateOfBirth);
          temp.first_name = String(orignalHostsArray[key].firstName);
          temp.last_name = String(orignalHostsArray[key].lastName);
          temp.gender = orignalHostsArray[key].gender==0?"Male":"Female";
          temp.phone = String(orignalHostsArray[key].phone);
          temp.address = "";
          temp.referResouce = String(orignalHostsArray[key].referralSource);
          hostsArray.push(temp);
        }
        this.hosts = hostsArray;
      });
    },
    showHostDetail(host){
      userDetailBus.$emit('showhostDetail',host);
    }
  },

  created(){
    this.getAllHosts();
    userDetailBus.$on("hostUpdated",()=>{
      this.getAllHosts();
    });
  },

  computed:{

    pages () {
      if (this.pagination.rowsPerPage == null) return 0
      return Math.ceil(this.filteredHosts.length / this.pagination.rowsPerPage)
    },

    filteredHosts:function(){
      return this.hosts.filter(host =>{
        if(!(this.name||this.email||this.phone||this.year_of_birth||this.address||this.gender)){
          if(host.first_name.match(this.search)||host.last_name.match(this.search)){
            return true;
          }else if(host.email.match(this.search)){
            return true;
          }else if(String(host.phone).match(this.search)){
            return true;
          }else if(String(host.year_of_birth).match(this.search)){
            return true;
          }else if(host.address.match(this.search)){
            return true;
          }
        }
        if(this.name){
          if(host.first_name.match(this.search)||host.last_name.match(this.search)){
            return true;
          }
        }
        if(this.email){
          if(host.email.match(this.search)){
            return true;
          }
        }
        if(this.phone){
          if(String(host.phone).match(this.search)){
            return true;
          }
        }
        if(this.year_of_birth){
          if(String(host.year_of_birth).match(this.search)){
            return true;
          }
        }
        if(this.address){
          if(host.address.match(this.search)){
            return true;
          }
        }
        if(this.gender!=null){
          if(this.gender==host.gender){
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
