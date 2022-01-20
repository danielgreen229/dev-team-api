<template>
  <div class="mb-1">
    <v-btn color="warning" dark @click="showForm = !showForm" class=" ml-12" :class="{'auth-signup__button' : showForm}">
      <div v-if="!showForm" class="auth-signup__button-container">
        <div style="text-overflow: ellipsis; max-width: 90px;    overflow: hidden;">{{tokenID}}</div>
        <v-icon >mdi-account-circle</v-icon>
      </div>
      <div v-else>
        <v-icon dark left> mdi-arrow-left</v-icon>Back
      </div>
    </v-btn>
    <v-btn color="warning" dark @click="LogOut" class="auth-logout__button" v-if="showForm && tokenID">
      LOGOUT
    </v-btn>
    <v-progress-circular
        indeterminate
        color="primary"
        v-if="LoadingToken"
      ></v-progress-circular>
    <div v-if="showForm" class="auth-signup__form">
      <v-form v-if="!tokenID">
        <v-container>
          <v-col>
            <v-row cols="12" sm="6">
              <v-text-field
                v-model="form.email"
                :rules="[rules.required, rules.email]"
                label="E-mail"
              ></v-text-field>
            </v-row>
            <v-row cols="12" sm="6">
              <v-text-field
                v-model="form.password"
                :rules="[rules.required, rules.counter]"
                label="Password"
                counter
                maxlength="50"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-btn color="warning" dark @click="SignIn"> Sign In/Up</v-btn>
        </v-container>
      </v-form>
      <v-container v-else>
        <v-card-title>Your token:</v-card-title>
        <v-card-text style="overflow-wrap: break-word;">{{tokenID}}</v-card-text>
      </v-container>
    </div>

    <transition name="list" >
      <v-alert
        border="bottom"
        colored-border
        type="warning"
        elevation="2"
        v-if="showAlert"
        class="list-alert-error"
      >
        {{error}}
      </v-alert>
    </transition>
  </div>
</template>

<script>

export default {
  components : {
  },
  props: {
  },
  name: 'auth',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      showForm: false,
      showAlert: false,
      resultAlert: false,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 50 || 'Max 50 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    };
  },
  computed: {
    LoadingToken() {
        try {
          return this.$store.getters.LoadingToken
        }
        catch (e){ return null}
    },
    tokenID() {
        try {
          return this.$store.getters.tokenID
        }
        catch (e){ return null}
    },
    error () {
      try {
          return this.$store.getters.error
        }
        catch (e){ return "Error"}
    }
  },
  watch: {
    error () {
      if(this.error == "auth/user-not-found") {
        this.$store.dispatch('SIGNUP', this.form)
      }
      else if(this.error == "auth/wrong-password") {
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false
        }, 3400)
      }
    },
  },
  methods: {
    LogOut () {
      this.$store.dispatch('LOGOUT')
    },
    SignIn () {
      this.$store.commit('UPDATE_ERROR', '')
      if (localStorage.getItem('__session', this.tokenID)) {
        this.$store.dispatch('GET_TOKEN')            
      } else {
        this.$store.dispatch('LOGIN', this.form)
      }      
    }
  }
}
</script>

<style>
.auth-signup__button {
  z-index: 11;
  position: fixed !important;
}
.auth-signup__form {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: white;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.v-form {
  width: 500px;
}
.auth-signup__button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.auth-logout__button {
  margin-left: 150px;
  z-index: 11;
  position: fixed !important;
}
</style>



