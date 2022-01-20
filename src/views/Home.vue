<template>
  <div class="home">
   
      <v-progress-circular style="position: fixed" v-if="isLoadingUsers" indeterminate color="primary"></v-progress-circular>

      <search @found='HideUsers' :users="users"/>

      <auth />
   
      <v-container v-if="!hideUsers">
        <v-row no-gutters>
          <transition-group name="list" tag="div" class="layout row wrap justify-center">
            <div class="d-flex" v-for="user in users" :key="user.Id" >
              <v-col >
                <v-card class="m-0 rounded-lg " max-width="500" min-width="260" height="420">
                  <template slot="progress">
                    <v-progress-linear
                      color="deep-purple"
                      height="10"
                      indeterminate
                    ></v-progress-linear>
                  </template>

                  <v-img class="rounded-lg" height="145" :src="user.Photo"></v-img>

                  <v-card-title class="py-0">{{user.Name}}</v-card-title>

                  <v-card-text class="py-0">
                
                    <div class=" text-subtitle-1 py-0">
                      {{user.Title}}
                    </div>

                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-text class="pt-2 pb-8">
                    <v-col class="px-0 pt-0">
                      <div class="d-flex justify-space-between">
                        <span class="card-text__span">Profit</span>
                        <span class="card-user-profit__span">+ ${{user.Profit[0].Amount}}</span>
                      </div>
            
                      <v-progress-linear class="rounded" background-color="#D7D7D7" height="15" :indeterminate="false" :query="true"
                        :color="`#${user.Profit[0].Color}`"
                        :value="`${getAmount(user.Profit[0].Amount)}`"
                      >
                      </v-progress-linear>
                    </v-col>
                    <v-col class="py-0 px-0">
                      <div class="d-flex justify-space-between">
                        <span class="card-text__span">Attention</span>
                        <span class="card-user-profit__span">{{getAllHours(user.Attention)}} h</span>
                      </div>

                      <progressiveBar :Tags="user.Tags"/>

                      <attentionBar :Attention="user.Attention == null ? [] : user.Attention"/>

                    </v-col>
                  </v-card-text>
                </v-card>
              </v-col>
            </div>
        </transition-group>
      </v-row>
    </v-container>

    <transition name="list" >
       <v-alert border="top" colored-border type="info" elevation="2"
        class="list-alert-error"
        v-if="isAllLoaded || errorDetected"
      >
        {{infoText}}
      </v-alert>
    </transition>

  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import progressiveBar from "@/components/progressiveBar.vue"
import attentionBar from "@/components/attentionBar.vue"
import search from "@/components/search.vue"
import auth from "@/components/auth.vue"

export default {
  components : {
    progressiveBar, attentionBar, search, auth
  },
  name: 'Home',
    data() {
    return {
      users: [],
      pageIndex: 1,
      isLoading: false, 
      isLoadingUsers: false,
      isAllLoaded: false,
      errorDetected: false,
      infoText: '',
      hideUsers: false,
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
    HideUsers (founded) {
      this.hideUsers = founded
    },
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
    getInitialUsers() {
      axios.get(`https://api.in.dev-team.club/people?pp=10&p=0`).then((response) => {
        this.users = response.data;
        
      })
      .catch(function (error) {
          this.errorDetected = true
          this.infoText = error
          setTimeout(() => {this.errorDetected = false, this.infoText = ''}, 5000)
      });
    },
    getNextUser() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
        	this.isLoadingUsers = true
          axios.get(`https://api.in.dev-team.club/people?pp=10&p=${this.pageIndex}`).then(response => {
          	
            this.users = this.users.concat(response.data); 
            this.pageIndex++;
            if(response.data.length == 0) { this.isAllLoaded = true; this.infoText = 'Nothing to show' }

            setTimeout(() => {this.isLoadingUsers = false}, 1500)
            setTimeout(() => {this.isAllLoaded = false, this.infoText = ''}, 5000)
          })
          .catch(function (error) {
              this.errorDetected = true
              this.infoText = error
              setTimeout(() => {this.errorDetected = false, this.infoText = ''}, 5000)
          });
        }
      }
    }
  },
  beforeMount() {
    this.getInitialUsers();
  },
  mounted() {
    this.getNextUser();
  }
}
</script>

<style scope>
.card-text__span {
  font-weight: 300;
}
.card-user-profit__span {
  font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
}
.list-alert-error {
  position: fixed !important;
  bottom: 0 !important;
  width: 98% !important;
  z-index: 25;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style> 
