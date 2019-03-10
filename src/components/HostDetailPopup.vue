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
            <v-btn dark flat @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-layout row wrap justify-center>
            <v-flex md5>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Email*" v-model="user.email" required clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="First name*" v-model="user.firstName" required clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Last name*" v-model="user.lastName" required clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Year of birth*" v-model="user.dataOfBirth" type="number" required clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select :items="genders" label="Gender*" v-model="user.gender" required clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field label="Phone" v-model="user.phone" clearable></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select item-text="text" v-model="user.retired" item-value="value" :items="options" label="Retired" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select item-text="text" v-model="user.pets" item-value="value" :items="options" label="Pets" clearable></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select item-text="text" v-model="user.smoker" item-value="value" :items="options" label="Smoker" clearable></v-select>
                    </v-flex>
                    <v-flex>
                        <v-text-field label="Referral Source*" v-model="user.referralSource" required="" clearable></v-text-field>
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
      user:{
        email:'',
        firstName:'',
        lastName:'',
        dataOfBirth:'',
        gender:null,
        phone:null,
        retired:null,
        pets:null,
        smoker:null,
        referralSource:''
      }

    }
  },
  created(){
      userDetailBus.$on('showhostDetail',host =>{
          this.dialog = true;
          this.host = host;
      });
  }
}
</script>
