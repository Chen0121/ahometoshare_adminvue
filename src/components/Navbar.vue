
<template>
    <nav>
        <v-toolbar app dark>
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="font-weight-light">A HOME TO SHARE</v-toolbar-title>
            <v-toolbar-title>ADMIN CONSOLE</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>Link One</v-btn>
            <v-btn flat>Link Two</v-btn>
            <v-btn flat>Link Three</v-btn>
            </v-toolbar-items>
            <v-btn flat>
                <span>Sign out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer app v-model="drawer" dark>
            <v-toolbar flat>
            <v-list>
                <v-list-tile>
                <v-list-tile-title class="title">
                    CONSOLE MENU
                </v-list-tile-title>
                </v-list-tile>
            </v-list>
            </v-toolbar>

            

            <v-list class="pt-0">
            <v-list-tile v-for="item in items" :key="item.title" router :to="item.route">
                <v-list-tile-action>
                <v-icon class="white--text">{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                <v-list-tile-title class="white--text">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
  export default {
    data(){
        return{
            
            items: [
                { title: 'DASHBOARD', icon: 'dashboard', route:'/dashboard' },
                { title: 'HOST MANAGEMENT', icon: 'accessibility_new', route:'/hostManagement' },
                { title: 'RENTER MANAGEMENT', icon: 'face', route:'/renterManagement' },
                { title: 'ARTICLE MANAGEMENT', icon: 'library_books', route:'/articleManagement' },
                { title: 'ABOUT', icon: 'question_answer', route:'/about' }
            ],
            drawer: false

        }
    }
  }
</script>

<style>

</style>
