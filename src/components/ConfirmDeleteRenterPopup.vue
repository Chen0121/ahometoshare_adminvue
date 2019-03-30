<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="warning" dark v-on="on" large>DELETE RENTER</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Are you SURE you want to delete this RENTER?</v-card-title>
        <v-card-text>Once a Renter is deleted, everything related to this renter will be deleted. And there is NO way to recover. Please make sure this is the corret renter you want to delete.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="deleteRenter">YES</v-btn>
          <v-btn color="error darken-1" flat @click="dialog = false">CANCEL</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {userDetailBus} from '../main';

  export default {
    data () {
      return {
        dialog: false
      }
    },
    methods:{
      deleteRenter(){
        userDetailBus.$emit('deleteRenter');
        this.dialog = false;
      }
    }
  }
</script>