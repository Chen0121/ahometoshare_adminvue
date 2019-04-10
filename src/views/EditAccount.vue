<!--
File: EditAccount.vue
Author: Peng Li
Clients: Michelle Bilek - A Home To Share
Course: CST8334 - Software Development Project - 2019W
Professor: Reg Dyer
Project: A Home to Share
Copyright @ 2019
-->
<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="4000" top :color="snackbarColor">
        <span>{{snackbarText}}</span>
        <v-btn flat color="white" @click="snackbar=false">close</v-btn>
    </v-snackbar>
    <v-layout row justify-center align-center fill-height mt-5>
      <v-flex md4>
        <v-card>
            <v-img
              height="200px"
              src="https://picsum.photos/500/300?image=25"
            >
            </v-img>
            <v-card-title primary-title>
              <v-container fill-height >
                <v-layout fill-height justify-center>
                  <span class="headline">UPDATE YOUR PASSWORD</span>
                </v-layout>
              </v-container>
              <span>Please be VERY careful with your password. Recommend you to write it down and keep it somewhere safe.</span>
            </v-card-title>
            <v-card-text>
              <v-form px-3 ref="loginForm">
                <v-layout row wrap>
                  <v-flex md1 pt-3>
                    <v-icon>lock</v-icon>
                  </v-flex>
                  <v-flex md10>
                    <v-text-field 
                    :append-icon="showOldPwd ? 'visibility' : 'visibility_off'"
                    @click:append="showOldPwd = !showOldPwd"
                    label="Old Password" v-model="oldPassword" :rules="inputRules" :type="showOldPwd ? 'text' : 'password'" clearable ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex md1 pt-3>
                    <v-icon>lock</v-icon>
                  </v-flex>
                  <v-flex md10>
                    <v-text-field 
                    :append-icon="showNewPwd ? 'visibility' : 'visibility_off'"
                    @click:append="showNewPwd = !showNewPwd"
                    label="New Password" v-model="newPassword" :rules="inputRules" :type="showNewPwd ? 'text' : 'password'" clearable ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex md1 pt-3>
                    <v-icon>lock</v-icon>
                  </v-flex>
                  <v-flex md10>
                    <v-text-field 
                    :append-icon="showConfirmPwd ? 'visibility' : 'visibility_off'"
                    @click:append="showConfirmPwd = !showConfirmPwd"
                    label="Confirm Password" v-model="confirmPassword" :rules="inputRules" :type="showConfirmPwd ? 'text' : 'password'" clearable ></v-text-field>
                  </v-flex>
                </v-layout>
                
                
                <v-layout row wrap>
                  <v-flex d-flex md4>
                    <v-btn color="success" @click="udpatePassword">SEND<v-icon right>send</v-icon></v-btn>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex d-flex md4>
                    <v-btn color="error" @click="reset">Rest<v-icon right>replay</v-icon></v-btn>
                  </v-flex>
                </v-layout>
                
              </v-form>
            </v-card-text>
          </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {

  data(){
    return{
      snackbar:false,
      snackbarColor:"primary",
      snackbarText:"",
      showOldPwd:false,
      showNewPwd:false,
      showConfirmPwd:false,
      oldPassword:'',
      newPassword:'',
      confirmPassword:'',
      inputRules:[
        v => v.length >= 8 || 'Minimum length is 8 characters'
      ]
    }
  },

  methods: {
    udpatePassword(){
      let params ={
        oldPassword: this.oldPassword,
        confirmPassword: this.confirmPassword
      }
      if(this.$refs.loginForm.validate()){
        if(this.confirmPassword!=this.newPassword){
            this.snackbar  = true;
            this.snackbarColor = "error";
            this.snackbarText = "Passwords do not match, please re-enter";
            this.newPassword = "";
            this.confirmPassword = "";
            return;
        }
        let url = "admin/updatePassword";
        this.api.post(url, params).then(data=>{
            this.snackbar = true;
            this.snackbarColor = "success";
            this.snackbarText = data.data;
        }).catch( data =>{
            this.snackbar  = true;
            this.snackbarColor = "error";
            if(data.data){
              this.snackbarText = data.data;
            }else{
              this.snackbarText = "Communication Error";
            }
        });
        this.clearArticle();
      }
    },
    reset(){
      this.oldPassword='',
      this.newPassword='',
      this.confirmPassword=''
    }
  }
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
