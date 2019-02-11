<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">A HOME TO SHARE CONSOLE</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item id="navlink"><router-link to="/">Dashboard</router-link></b-nav-item>
            <b-nav-item id="navlink"><router-link to="/hostManagement">Host Management</router-link></b-nav-item>
            <b-nav-item id="navlink"><router-link to="/renterManagement">Renter Management</router-link></b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item id="navlink"><router-link to="/renterManagement">Signout</router-link></b-nav-item>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>

       |
      
    </div>
    <router-view />
  </div>
</template>

<style scoped>
    #navlink a {
      color:white;
    }
</style>
