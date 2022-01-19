<template>
<div>
  <div class="d-flex flex-row mt-6" v-if="Attention.length != 0">
    <div class="d-flex flex-column mr-1 progress-bar__container">
      <v-progress-linear  v-if="this.Attention.length > 0" class="rounded progress-bar__linear" background-color="transparent" height="25" :indeterminate="false" :query="true"
          :color="`#${this.Attention[0].Color}`"
          :value="`${this.Attention[0].Amount}`"
          :buffer-value ="`${this.Attention[0].Amount}`"
          rounded
          reverse
        >
        <span class="card-user-profit__span " 
          :style="{ 'margin-right': `${this.Attention[0].Amount > 75? 35 : this.Attention[0].Amount + 3}` + '%', 'margin-left': 'auto'}" >
          {{this.Attention[0].Amount}}%
        </span>
      </v-progress-linear>
      <v-progress-linear v-if="this.Attention.length > 2" class="rounded mt-1" background-color="transparent" height="25" :indeterminate="false" :query="true"
           :color="`#${this.Attention[2].Color}`"
          :value="`${this.Attention[2].Amount}`"
          :buffer-value ="`${this.Attention[2].Amount}`"
          rounded
          reverse
        >
        <span class="card-user-profit__span " 
         :style="{ 'margin-right': `${this.Attention[2].Amount > 75? 35 : this.Attention[2].Amount + 3}` + '%', 'margin-left': 'auto'}" >
          {{this.Attention[2].Amount}}%
        </span>
      </v-progress-linear>
    </div>
    <div class="d-flex flex-column progress-bar__container">
      <v-progress-linear v-if="this.Attention.length > 1" class="rounded" background-color="transparent" height="25" :indeterminate="false" :query="true"
          :color="`#${this.Attention[1].Color}`"
          :value="`${this.Attention[1].Amount}`"
          :buffer-value ="`${this.Attention[1].Amount}`"
          rounded
        >
        <span class="card-user-profit__span " 
          :style="{ 'margin-left': `${this.Attention[1].Amount > 75? 35 : this.Attention[1].Amount + 3}` + '%', 'margin-right': 'auto'}" >
          {{this.Attention[1].Amount}}%
        </span>
      </v-progress-linear>
      <v-progress-linear v-if="this.Attention.length > 3" class="rounded mt-1" background-color="transparent" height="25" :indeterminate="false" :query="true"
          :color="`#${this.Attention[3].Color}`"
          :value="`${this.Attention[3].Amount}`"
          :buffer-value ="`${this.Attention[3].Amount}`"
          rounded
        >
        <span class="card-user-profit__span " 
          :style="{ 'margin-left': `${this.Attention[3].Amount > 75? 35 : this.Attention[3].Amount + 3}` + '%', 'margin-right': 'auto'}" >
          {{this.Attention[3].Amount}}%
        </span>
      </v-progress-linear>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'App',
  props: {
    Attention: Array
  },
};
</script>
<style> 
.v-progress-linear__determinate {
      border-radius: 4px;
}
.progress-bar__container {
  width: 50%;
}
</style>
