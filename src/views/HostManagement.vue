<template>
    <div id="host-page-container">
    <b-container fluid>
      <b-row>
        <b-col cols="4" id="search-area">
          <div>
            <b-navbar type="light" variant="light">
                <label>Search here:</label>
                <b-input id="search" type="text" placeholder="Search" v-model="search"></b-input>
            </b-navbar>
          </div>
          <hr>
          <div>
            <b-form-checkbox v-model="email">Email</b-form-checkbox>
            <b-form-checkbox v-model="name">Name</b-form-checkbox>
            <b-form-checkbox v-model="phone">Phone</b-form-checkbox>
            <b-form-checkbox v-model="address">Address</b-form-checkbox>
            <b-form-checkbox v-model="age">Age</b-form-checkbox>
            <b-form-select v-model="gender" :options="genderOptions" class="narrowbox"></b-form-select>
          </div>
          <hr>
          <div>This search box will serach on any selected column above. If none of them are selected, it will search on all columns.</div>                 
        </b-col>
        <b-col cols="8">
          <b-row>
            <b-col>
              <div class="narrowbox">
                <b-form-select v-model="perpage" :options="perpageOptions" class="mb-3"></b-form-select>
              </div>
            </b-col>
            <b-col>
              <div>
                Total matched records: {{filteredHosts.length}}
              </div>
            </b-col>
            <b-col>
              <b-pagination size="md" align="right" :total-rows="totalPages" v-model="currentPage" :per-page="perpage"></b-pagination>
            </b-col>
          </b-row>
          
          <b-table 
          :outlined="true"
          :hover="true"
          :items="filteredHosts"
          :fields="fields"
          :per-page="perpage"
          :current-page="currentPage">
          </b-table>
        </b-col>
      </b-row>
    </b-container>
    </div>
  
</template>

<script>
export default {
  data () {
    return {
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
        { value: null, text: 'Gender' },
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

#host-page-container{
  margin-top: 0.5in;
  padding-left: 5%;
  padding-right: 5%
}

#search{
  width: 80%;
}

.narrowbox{
  width: 1in;
}


</style>
