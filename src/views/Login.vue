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
              <v-form px-3>
                <v-layout row wrap>
                  <v-flex md1 pt-3><v-icon>person</v-icon></v-flex>
                  <v-flex md10>
                    <v-text-field label="Username"  clearable></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex md1 pt-3>
                    <v-icon>lock</v-icon>
                  </v-flex>
                  <v-flex md10>
                    <v-text-field label="Password" clearable></v-text-field>
                  </v-flex>
                </v-layout>
                
                
                
                <v-layout row wrap>
                  <v-flex d-flex md4>
                    <v-btn color="success" @click="submit">Login<v-icon right>send</v-icon></v-btn>
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
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
