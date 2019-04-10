<!--
File: HostDetailPopup.vue
Author: Peng Li
Clients: Michelle Bilek - A Home To Share
Course: CST8334 - Software Development Project - 2019W
Professor: Reg Dyer
Project: A Home to Share
Copyright @ 2019
-->
<template>
  <v-layout row justify-center>
    <v-snackbar v-model="snackbar" :timeout="4000" top :color="snackbarColor">
      <span>{{snackbarText}}</span>
      <v-btn flat color="white" @click="snackbar=false">close</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="clearHost">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Host Detail Infomation</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="saveHost">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-layout row wrap justify-center>
            <v-flex md5>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Email*" v-model="host.email" required readonly></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="First name*" v-model="host.firstName" required clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Last name*" v-model="host.lastName" required clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Year of birth*" v-model="host.dateOfBirth" type="number" required clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select :items="genders" label="Gender*" v-model="host.gender" required clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Phone" v-model="host.phone" clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select item-text="text" v-model="host.retired" item-value="value" :items="options" label="Retired" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select item-text="text" v-model="host.pets" item-value="value" :items="options" label="Has pets" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select item-text="text" v-model="host.smoker" item-value="value" :items="options" label="Is smoker" clearable></v-select>
                    </v-flex>
                    <v-flex>
                        <v-text-field label="Referral Source*" v-model="host.referralSource" required="" clearable></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-container>
                <v-container grid-list-md>
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm6 md4>
                      <ConfirmDeleteHostPopup/>
                    </v-flex>
                  </v-layout>
                </v-container>
            </v-flex>
            <v-flex md5>
                <v-container grid-list-md v-for="property in properties" :key="property.propertyId">
                    <v-layout wrap>
                    <!-- <v-flex xs12 sm6 md4>
                        <v-text-field v-model="property.propertyId"></v-text-field>
                    </v-flex> -->
                    <v-flex xs12 sm6 md3>
                        <v-text-field label="Address*" v-model="property.address" required readonly></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field label="City*" v-model="property.city" required clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field label="Province" v-model="property.province" clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field label="Postal Code" v-model="property.postalCode" clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field label="Country" v-model="property.country" clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field label="Price" v-model="property.price" type="number" clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field label="Family Members*" v-model="property.familyMembers" type="number" required clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field label="Host Start Date" v-model="property.hostStartDate" type="Date" clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field label="Host End Date" v-model="property.hostEndDate" type="Date" clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.availability" item-value="value" :items="availability" label="Availability*" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.smoker" item-value="value" :items="options" label="Smoker Allowed" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.pets" item-value="value" :items="options" label="Pets allowed" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.familyRoom" item-value="value" :items="options" label="Family room accessible" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.gas" item-value="value" :items="options" label="Gas included" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.hydro" item-value="value" :items="options" label="Hydro included" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.water" item-value="value" :items="options" label="Water included" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.internet" item-value="value" :items="options" label="Internet included" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.laundry" item-value="value" :items="options" label="OnSite laundry" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.parking" item-value="value" :items="options" label="Parking available" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.cable" item-value="value" :items="options" label="Cable included" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.privateBedroom" item-value="value" :items="options" label="Private Bedroom" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.sharedBedroom" item-value="value" :items="options" label="Shared Bedroom" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.privateKitchen" item-value="value" :items="options" label="Private Kitchen" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.sharedKitchen" item-value="value" :items="options" label="Shared Kitchen" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.privateWashroom" item-value="value" :items="options" label="Private Washroom" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select box item-text="text" v-model="property.sharedWashroom" item-value="value" :items="options" label="Shared Washroom" clearable></v-select>
                    </v-flex>
                    <v-flex md12>
                        <v-textarea outline label="Shared Chore" v-model="property.sharedChore" clearable></v-textarea>
                    </v-flex>
                    </v-layout>
                    <v-layout wrap justify-center>
                      <v-flex xs12 sm6 md3 v-for=" pp in propertyPictureMap[property.propertyId]" :key="pp">
                        <v-img           
                          class="my-3"
                          contain
                          height="400" 
                          :src="'data:image/png;base64,'+pp"></v-img>
                      </v-flex>
                    </v-layout>
                </v-container>
                
            </v-flex>
            
        </v-layout>

        
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {userDetailBus} from '../main';
import ConfirmDeleteHostPopup from '../components/ConfirmDeleteHostPopup'

export default {
  components: {
    ConfirmDeleteHostPopup
  },
  data () {
    return {
      snackbar:false,
      snackbarColor:"success",
      snackbarText: "Operation Success",
      dialog: false,
      options: [
        {
          text:'NO',
          value:false
        },
        {
          text:'YES',
          value:true
        }
      ],
      genders: [
        {
          text:'Male',
          value:0
        },
        {
          text:'Female',
          value:1
        },
        {
          text:'Unknown',
          value:2
        }
      ],
      availability: [
        {
          text:'Long Term',
          value:5
        },
        {
          text:'Short Term',
          value:6
        },
        {
          text:'Temporary',
          value:7
        }
      ],
      host:{
        hostId:null,
        email:'',
        firstName:'',
        lastName:'',
        dateOfBirth:'',
        gender:null,
        phone:null,
        retired:null,
        pets:null,
        smoker:null,
        referralSource:''
      },
      properties:[],
      propertyPictureMap:{},
      propertyForm:{
        address: null,
        availability: null,
        cable: null,
        city: null,
        country: null,
        familyMembers: null,
        familyRoom: null,
        gas: null,
        hostEndDate: null,
        hostId: null,
        hostStartDate: null,
        hydro: null,
        internet: null,
        laundry: null,
        parking: null,
        pets: null,
        postalCode: null,
        price: null,
        privateBedroom: null,
        privateKitchen: null,
        privateWashroom: null,
        propertyId: null,
        province: null,
        sharedBedroom: null,
        sharedChore: null,
        sharedKitchen: null,
        sharedWashroom: null,
        smoker: null,
        water: null
      }

    }
  },
  methods:{
    saveHost(){
      let url = "admin/updateHostDetail";
      this.api.post(url,{
        host:this.host,
        propertyList:this.properties
      }).then(data =>{
        userDetailBus.$emit('hostUpdated',data);
        this.snackbar = true;
        this.clearHost();
      });
    },
    clearHost(){
      for (var key in this.host ) {
        this.host[key] = null;
      }
      this.properties = [];
      this.propertyPictureMap = {};
      this.dialog = false;
    },
    deleteHost(){
      let url ="admin/deleteHostDetail";
      this.api.post(url,{
        hostId: this.host.hostId
      }).then(data => {
        userDetailBus.$emit('hostUpdated',data);
        this.snackbar = true;
        this.clearHost();
      })
    }
  },
  created(){
    userDetailBus.$on('showhostDetail',host =>{
      this.dialog = true;
      let url="admin/getHostDetailById";
      this.api.get(url,{
        params:{
          hostId:host.hostId
        }
        }).then(data =>{
        for(let key in data.data.host){
          this.host[key] = data.data.host[key];
        }
        for(let key in data.data.propertyList){
          let tempProperty = data.data.propertyList[key];
          for(let k in tempProperty){
            if(k=='hostEndDate'||k=='hostStartDate'){
               let date = new Date(tempProperty[k]);
               let year =  date.getFullYear();
               let month = ("0" + (date.getMonth() + 1)).slice(-2);
               let day = ("0" + date.getDate()).slice(-2);
               let dateStr = year + "-" + month + "-" + day;
               tempProperty[k] = dateStr;
            }
          }
          this.properties.push(tempProperty);
        }
      }).then( ()=>{
        for(let key in this.properties){
          let tempProperty = this.properties[key];
          this.api.get("admin/propertyPictures",{
            params:{
              propertyId:tempProperty.propertyId
            }
          }).then(data =>{
            let tempPropertyPictureMap = {};
            for( let key in data.data){
              let propertyId = data.data[key].propertyId;
              if(!tempPropertyPictureMap[propertyId]){
                tempPropertyPictureMap[propertyId] = [];
              }
              tempPropertyPictureMap[propertyId].push(data.data[key].pictureBase64);
            }
            this.propertyPictureMap = tempPropertyPictureMap;
          })
        }
      });
    });
    userDetailBus.$on("deleteHost", () =>{
      this.deleteHost();
    });
  }
}
</script>
