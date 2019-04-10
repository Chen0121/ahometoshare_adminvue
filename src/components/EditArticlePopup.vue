<!--
File: EditArticlePopup.vue
Author: Peng Li
Clients: Michelle Bilek - A Home To Share
Course: CST8334 - Software Development Project - 2019W
Professor: Reg Dyer
Project: A Home to Share
Copyright @ 2019
-->
<template>
  <v-layout row justify-center>
    <v-snackbar v-model="snackbar" :timeout="4000" top :color="color">
        <span>{{snackbarText}}</span>
        <v-btn flat color="white" @click="snackbar=false">close</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="clearArticle">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{articleTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="saveArticle">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-layout ma-5>
            <vue-editor v-model="articleContent" :editorToolbar="customToolbar"></vue-editor>
        </v-layout>

        
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {articleDetailBus} from '../main';
import { VueEditor } from "vue2-editor";

export default {
    
  components: {
    VueEditor
  },

  data() {
    return {
      dialog: false,
      snackbar:false,
      color:"success",
      snackbarText: "",
      articleId: null,
      articleTitle: "",
      articleContent: "",
      customToolbar: [
        [{ 'size': [ 'huge','large',false, 'small'] }],  // custom dropdown
        [{ "header": [false, 1, 2, 3, 4, 5, 6] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

        ['clean'] 
      ],
    };
  },
  methods:{
    loadArticleToEditBox: function(article){
        this.dialog = true;
        let url="admin/getArticleDetail";
        this.api.get(url,{
            params:{
                articleId:article.id
            }
        }).then(data =>{
            console.log(data);
            let article = data.data;
            this.articleId = article.id;
            this.articleTitle = article.title;
            this.articleContent = article.content;
        });

    },
    saveArticle: function() {
        let article = {
            id: this.articleId,
            title: this.articleTitle,
            content: this.articleContent
        }
        let url = "admin/updateArticle";
        this.api.post(url, article).then(data=>{
            this.snackbar = true;
            this.color = "success";
            this.snackbarText = data.data;
        }).catch( data =>{
            this.snackbar  = true;
            this.color = "error";
            this.snackbarText = data.data;
        });
        this.clearArticle();
    },
    clearArticle: function(){
        this.articleId = "";
        this.articleTitle = "";
        this.articleContent = "";
        this.dialog = false;
    },
  },
  created(){
    articleDetailBus.$on('showArticleDetail',artile =>{
        this.loadArticleToEditBox(artile);
    });
  }
}
</script>
