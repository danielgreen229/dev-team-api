<template>
 
<v-app>
  <v-container fluid>
    <router-view/>
    </v-container>
</v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
  }),
};
</script>

<style lang="scss">
#app {
  background-color: F8F8F8;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}