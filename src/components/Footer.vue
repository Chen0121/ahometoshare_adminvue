<template>
  <v-footer 
    app
    inset
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      
      <v-spacer></v-spacer>
      <v-card-actions class="grey darken-3 justify-center">
        <strong>&copy;2019 — A HOME TO SHARE</strong><span>&#160;&#160;&#160;&#160;</span><strong>Technical Support — Team Withyou</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    })
  }
</script>