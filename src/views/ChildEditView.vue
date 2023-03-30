<template>
<v-row>
  <v-col>
    <EditChild :child="child"/>
  </v-col>
</v-row>
</template>

<script>
import EditChild from '../components/EditChild.vue';
import children from '../services/children'
import { useAuthStore } from '../stores/store'

  export default {
    components: { EditChild },
    props: {
      id: String
    },
    data() {
      return {
        store: useAuthStore(),
        child: {}
      }
    },
    async created(){
      if(this.store.role !== 'worker'){
        const response = await children.getChild(this.id)
        this.child = response
      }
    }
}
</script>

<style scoped>

</style>