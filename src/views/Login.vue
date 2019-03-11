<template>
  <v-container>
    <v-layout row justify-center align-center fill-height mt-5>
      <v-flex md4>
        <v-card>
            <v-img
              class="white--text"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">A HOME TO SHARE</span>
                    <br>
                    <span class="headline">ADMIN CONSOLE LOGIN</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title primary-title>
              <span>Welcome to AHomeToShare Admin Console. Please be VERY careful with password.</span>
            </v-card-title>
            <v-card-text>
              <v-form px-3 ref="loginForm">
                <v-layout row wrap>
                  <v-flex md1 pt-3><v-icon>person</v-icon></v-flex>
                  <v-flex md10>
                    <v-text-field label="Username" v-model="username" :rules="inputRules" clearable></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex md1 pt-3>
                    <v-icon>lock</v-icon>
                  </v-flex>
                  <v-flex md10>
                    <v-text-field 
                    :append-icon="showPwd ? 'visibility' : 'visibility_off'"
                    @click:append="showPwd = !showPwd"
                    label="Password" v-model="password" :rules="inputRules" :type="showPwd ? 'text' : 'password'" clearable ></v-text-field>
                  </v-flex>
                </v-layout>
                
                
                
                <v-layout row wrap>
                  <v-flex d-flex md4>
                    <v-btn color="success" @click="login">Login<v-icon right>send</v-icon></v-btn>
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
import * as types from "../store/types";
import store from "../store/store";
import router from "../router";

export default {

  data(){
    return{
      showPwd:false,
      username:'super',
      password:'ahometoshare',
      inputRules:[
        v => v.length >= 5 || 'Minimum length is 6 characters'
      ]
    }
  },

  methods: {
    login(){
      console.log(types.BASE_DOMAIN)
      let params ={
        username: this.username,
        password: this.password        
      }
      if(this.$refs.loginForm.validate()){
        let url = types.BASE_DOMAIN+"/adminLogin";
        this.api.post(url,params).then(data =>{
          let dat = {
            token: data.data.token,
            user:{
              username: data.data.username,
              userType: data.data.userType
            }
          }
          store.dispatch("login",dat);
          if(data.status===1){
            router.push({
              path:"dashboard",
            });
          }
          
        }).catch(e => {
            console.log(e);
        });
      }
    },
    reset(){
      this.username='',
      this.password=''
    }
  }
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
