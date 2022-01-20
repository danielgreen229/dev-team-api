<template>
  <div>
        <v-autocomplete
        clearable
        :loading="isLoading"
        :items="users"
        :search-input.sync="search"
        hide-details
        item-text="Id"
        item-value="Id"
        label="Search for a User by Id..."
        class="py-0 my-4 ml-12 mr-12"
      >
      </v-autocomplete>
  
      <transition  class="layout row wrap justify-center">
        <v-col class="justify-center" v-if="Object.keys(findedUser).length != 0">
          <v-card class="m-0 rounded-lg justify-center" width="260" >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-img class="rounded-lg" height="145" :src="findedUser.Photo"></v-img>
            <v-card-title class="py-0">{{findedUser.Name}}</v-card-title>
            <v-card-text class="py-0">
            <div class=" text-subtitle-1 py-0">
              {{findedUser.Title}}
            </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-text class="pt-2 pb-8">
              <v-col class="px-0 pt-0">
                <div class="d-flex justify-space-between">
                  <span class="card-text__span">Profit</span>
                  <span class="card-user-profit__span">+ ${{findedUser.Profit[0].Amount}}</span>
                </div>
                <v-progress-linear class="rounded" background-color="#D7D7D7" height="15" :indeterminate="false" :query="true"
                  :color="`#${findedUser.Profit[0].Color}`"
                  :value="`${getAmount(findedUser.Profit[0].Amount)}`"
                >
                </v-progress-linear>
              </v-col>
              <v-col class="py-0 px-0">
                <div class="d-flex justify-space-between">
                  <span class="card-text__span">Attention</span>
                  <span class="card-user-profit__span">{{getAllHours(findedUser.Attention)}} h</span>
                </div>
               

                <progressiveBar :Tags="findedUser.Tags"/>

                <attentionBar :Attention="findedUser.Attention == null ? [] : findedUser.Attention"/>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col>
      </transition>
  </div>
</template>

<script>
import axios from "axios";
import progressiveBar from "@/components/progressiveBar.vue"
import attentionBar from "@/components/attentionBar.vue"
import _ from "lodash";



export default {
  components : {
    progressiveBar, attentionBar
  },
  props: {
    users: Array
  },
  name: 'search',

  data() {
    return {
      
      isLoading: false, 
      search: null,
      findedUser: {},


    };
  },
  computed: {
   
  },
  watch: {
    search: _.debounce(function(query) {
      if(query != '') this.searchUser(query);
    }, 250)
  },
  methods: {
    getAmount (Amount) {
      return Math.ceil(Amount/10)
    },
    getAllHours(Attention) {
      if(Attention != null) {
        var initialValue = 0;
        var sum = Attention.reduce(
            (accumulator, currentValue) => accumulator + currentValue.Amount,
            initialValue
        );
        return sum
      }
      else {
        return 0
      }
    },
    getUser(params = "") {
      this.isLoading = true
      if(params != 'null')
        this.axios
          .get("https://api.in.dev-team.club/people/" + params)
          .then(resp => {
            this.findedUser = resp.data
            this.$emit('found', true)
            this.isLoading = false; 
          })
          .catch(error => {
            this.findedUser = {}
            this.$emit('found', false)
            this.isLoading = false  
          });
        else {
          this.isLoading = false  
          this.findedUser = {}
        }
    },
    searchUser(query) {
      let searchQuery = encodeURI("" + query); 
      this.findedUser = {}
      this.$emit('found', false)
      this.getUser(searchQuery);
    },
  }
}
</script>