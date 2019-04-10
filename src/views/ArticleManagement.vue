<!--
File: ArticleManagement.vue
Author: Peng Li
Clients: Michelle Bilek - A Home To Share
Course: CST8334 - Software Development Project - 2019W
Professor: Reg Dyer
Project: A Home to Share
Copyright @ 2019
-->
<template>
  <div id="app">
      <v-container
        fluid
        grid-list-lg
      >
      
        <v-layout row wrap>
            <v-flex md3 v-for="article in articles" :key="article.id">
                <v-card color="green darken-2" class="white--text">
                    <v-card-title primary-title>
                    <div>
                        <div class="headline">{{article.title}}</div>
                        <span class="headline">Update Date:</span><span class="headline">{{article.updateDate}}</span>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat dark @click="loadArticleToEditBox(article)">EDIT</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <EditArticlePopup/>
      </v-container>
   </div>
</template>

<script>
import EditArticlePopup from '../components/EditArticlePopup'
import {articleDetailBus} from '../main';

export default {
  components: {
    EditArticlePopup
  },

  data() {
    return {
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
      articles: []
    };
  },

  methods: {
    loadArticleToEditBox: function(article){
        articleDetailBus.$emit('showArticleDetail',article);
    },
    getAllArticles(){
      let url = "admin/getAllArticles";
      this.api.get(url).then(data =>{
        let tempArticles = data.data;
          for(let key in tempArticles){
              let tempArticle = tempArticles[key];
              for(let k in tempArticle){
                if(k == 'updateDate'){
                  let date = new Date(tempArticle[k]);
                  let year =  date.getFullYear();
                  let month = ("0" + (date.getMonth() + 1)).slice(-2);
                  let day = ("0" + date.getDate()).slice(-2);
                  let dateStr = year + "-" + month + "-" + day;
                  tempArticle[k] = dateStr;
               }
            }
          }
        this.articles = tempArticles;
      });
    }

  },
  created(){
    this.getAllArticles();
  }

};
</script>

