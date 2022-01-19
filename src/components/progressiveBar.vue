<template>
<div>
    <v-progress-linear class="rounded" background-color="#D7D7D7" height="15" :indeterminate="false" :query="true"
        :color="`#${Tags[1].Color}`"
        :value="`${countValue}`"
      >
        <v-progress-linear v-if="Tags.length > 2" class="rounded" background-color="transparent" height="15" :indeterminate="false" :query="true"
            :color="`#${Tags[2].Color}`"
            value="33.3"
          >
        </v-progress-linear>

    </v-progress-linear>
</div>
</template>

<script>

export default {
  name: 'App',
  props: {
    Tags: Array
  },
  data: () => ({
    countValue: 50
  }),
  created () {
    //console.log(this.Tags)
    this.Tags.length > 2 ? this.countValue = 66.6 : this.countValue = 50
  }
};
</script>

