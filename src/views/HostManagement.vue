<template>
    <div id="host-page-container">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex  xs12 md5>
          <v-layout row>
            <v-flex mx-3 d-flex>
              <v-text-field label="SEARCH" append-icon="search"></v-text-field>      
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
                  <v-checkbox v-model="age" label="Age"></v-checkbox>
                </v-flex>
                <v-flex d-flex md3>
                  <v-select offset-y v-model="gender" :items="genderOptions" box label="Gender"></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex d-flex>
              <p class="text-lg-center">This search box will serach on selected column(s) above. If none of them are selected, it will search on all columns.</p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex  xs12 md7>
          <v-layout row wrap>
            <v-flex d-flex md12>
              <v-layout>
                <v-flex d-flex md2>
                  <div>
                    <v-select
                      md1
                      v-model="perpage"
                      :items="perpageOptions"
                      box
                      label="Per page"
                    ></v-select>
                  </div>
                </v-flex>
                <v-flex md8>
                  <div class="text-xs-center pt-2">
                    <v-pagination v-model="pagination.page" :length="pages" total-visible="7" circle></v-pagination>
                  </div>
                </v-flex>
                <v-flex md2>
                  <div class="text-xs-center pt-3">
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
                    :items="fields"
                    :search="search"
                    hide-actions
                    :pagination.sync="pagination"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td >{{ props.item.name }}</td>
                      <td class="text-xs-center">{{ props.item.calories }}</td>
                      <td class="text-xs-center">{{ props.item.fat }}</td>
                      <td class="text-xs-center">{{ props.item.carbs }}</td>
                      <td class="text-xs-center">{{ props.item.protein }}</td>
                      <td class="text-xs-center">{{ props.item.iron }}</td>
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
export default {
  data () {
    return {
      pagination: {},
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
      search:'',
      fields: [ 'email','first_name', 'last_name', 'gender', 'phone','age',"address","referResouce" ],
      hosts: [],
      name:false,
      email:false,
      phone:false,
      age:false,
      address:false,
      gender:null,
      genderOptions: [
        { value: null, text: 'Not Selected' },
        { value: 0, text: 'Male' },
        { value: 1, text: 'Female' }
      ],
      currentPage:1,
      perpage:1,
      perpageOptions: [
        { value: null, text: 'Items per page', disabled: true },
        { value: 1, text: '1' },
        { value: 10, text: '10' },
        { value: 20, text: '20' },
        { value: 30, text: '30' },
        { value: 50, text: '50' }
      ],
      headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  methods:{
    getAllHosts(){
      let url = "http://localhost:8088/admin/getAllHosts";
      this.$http.get(url).then(data =>{
        let orignalHostsArray = data.body.data
        let hostsArray = [];
        for(let key in orignalHostsArray){
          let temp = {email:'', age:'', first_name: '', last_name: '', gender: '', phone:'', address:'', referResouce:''};
          temp.email = String(orignalHostsArray[key].email);
          temp.age = String(orignalHostsArray[key].dateOfBirth);
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
    }
  },

  created(){
    this.getAllHosts();
  },

  computed:{

    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },

    totalPages: function(){
      return Math.ceil(this.filteredHosts.length/this.perpage);
    },

    filteredHosts:function(){
      return this.hosts.filter(host =>{
        if(!(this.name||this.email||this.phone||this.gender||this.age||this.address)){
          if(host.first_name.match(this.search)||host.last_name.match(this.search)){
            return true;
          }else if(host.email.match(this.search)){
            return true;
          }else if(String(host.phone).match(this.search)){
            return true;
          }else if(String(host.age).match(this.search)){
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
        if(this.age){
          if(String(host.age).match(this.search)){
            return true;
          }
        }
        if(this.address){
          if(host.address.match(this.search)){
            return true;
          }
        }
        if(this.gender){
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
