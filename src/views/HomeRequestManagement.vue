<!--
File: HomeRequestManagement.vue
Author: Peng Li
Clients: Michelle Bilek - A Home To Share
Course: CST8334 - Software Development Project - 2019W
Professor: Reg Dyer
Project: A Home to Share
Copyright @ 2019
-->
<template>
  <v-container class="my-5">
      <v-snackbar v-model="snackbar" :timeout="4000" top :color="snackbarColor">
        <span>{{snackbarText}}</span>
        <v-btn flat color="white" @click="snackbar=false">close</v-btn>
      </v-snackbar>
      <v-card flat>
        <v-layout row wrap :class="`pa-3`">
          <v-flex md11>
            <v-layout row wrap>
              <v-flex xs6 sm4 md2>
                <div class="heading grey--text">Renter</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="heading grey--text">Renter Name</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="heading grey--text">Host</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="heading grey--text">Host Name</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="heading grey--text">Address</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="heading grey--text">Time</div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-layout>
              <v-flex>
                <div class="heading grey--text">Operation</div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
      <v-card flat v-for="request in homeRequests" :key="request.id">
        <v-layout row wrap :class="`pa-3 request ${request.status}`">
          <v-flex md11>
            <v-layout row wrap>
              <v-flex xs6 sm4 md2>
                <div>{{ request.renter }}</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div>{{ request.renterName }}</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div>{{ request.host }}</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div>{{ request.hostName }}</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div>{{ request.propertyAddress }}</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div>{{ request.requestTime }}</div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md1>
            <v-layout>
              <v-flex>
                <v-btn flat color="error" @click="deleteHomeRequestRecord(request.id)">DELETE</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
          
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      snackbar:false,
      snackbarColor:"success",
      snackbarText:"",
      homeRequests:[]
    }
  },
  methods:{
    getAllHomeRequests(){
      let url = "admin/homeRequests";
      this.api.get(url).then(data =>{
        let tempHomeRequests = data.data;
          for(let key in tempHomeRequests){
              let tempHomeRequest = tempHomeRequests[key];
              for(let k in tempHomeRequest){
                if(k == 'requestTime'){
                  let date = new Date(tempHomeRequest[k]);
                  let dateStr = date.toString();
                  tempHomeRequest[k] = dateStr;
               }
            }
          }
        this.homeRequests = tempHomeRequests;
      });
    },
    deleteHomeRequestRecord(requestId){
      let url ="admin/deleteHomeRequest";
      this.api.post(url,{
        requestId: requestId
      }).then(data => {
        this.snackbar = true;
        this.snackbarColor = "success";
        this.snackbarText = data.data;
        this.getAllHomeRequests();
      }).catch(data => {
        this.snackbar = true;
        this.snackbarColor = "error";
        this.snackbarText = data.data;
        this.getAllHomeRequests();
      })
    },
  },

  created(){
    this.getAllHomeRequests();
  }
}
</script>
