<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
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
                        <v-text-field label="Email*" v-model="host.email" required clearable></v-text-field>
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
                        <v-select item-text="text" v-model="host.pets" item-value="value" :items="options" label="Pets" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select item-text="text" v-model="host.smoker" item-value="value" :items="options" label="Smoker" clearable></v-select>
                    </v-flex>
                    <v-flex>
                        <v-text-field label="Referral Source*" v-model="host.referralSource" required="" clearable></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex md5>

            </v-flex>
            
        </v-layout>

        
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {userDetailBus} from '../main';

export default {
  data () {
    return {
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
      properties:{

      },
      property:{
        property_id:null,
        host_id:null,
        address:null,
        city:null,
        postal_code:null,
        province:null,
        country:null,
        family_members:null,
        smoker:null,
        pets:null,
        hydro:null,
        water:null,
        gas:null,
        cable:null,
        internet:null,
        parking:null,
        laundry:null,
        family_room:null
      }

    }
  },
  methods:{
    saveHost(){
      let url = "admin/saveHostDetail";
      this.api.post(url,{
        host:this.host,
        propertyList:null
      }).then(data =>{
        console.log(data);
        userDetailBus.$emit('hostUpdated',data);
        this.dialog = false;
      });
    }
  },
  created(){
    userDetailBus.$on('showhostDetail',host =>{
      this.dialog = true;
      let url="admin/getHostDetailByEmail";
      this.api.get(url,{
        params:{
          email:host.email
        }
        }).then(data =>{
        console.log(data);
        for(let key in data.data.host){
          this.host[key] = data.data.host[key];
        }
      });
    });
  }
}
</script>
