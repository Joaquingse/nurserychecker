<template>
  <v-container>
    <v-row justify="end" class="pr-3 ml-1" align-items="center">
      Búsqueda: <v-text-field v-model="search"></v-text-field>

      <v-spacer></v-spacer>
      <v-btn @click.prevent="goBack" prepend-icon="mdi-arrow-left-bold-box-outline"  class="text"> Atrás </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12" sm="10" md="8" >
               <ChildrenList  :childrenList="childrenList" :search="search"/>
              
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChildrenList from '../components/ChildrenList.vue'
import ChildrenProfile from '../components/ChildrenProfile.vue'
import { useAuthStore } from '../stores/store'
import children from '../services/children'

export default {
  components: { 
    ChildrenList,
    ChildrenProfile
   },
  data() {
    return {
      childrenList: [],
      search: '',
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  async created() {
    const store = useAuthStore()
    const response = await children.getChildren()
    response.forEach((el) => {
      this.childrenList.push(el)
    })
  }
}
</script>

<style scoped>
.text {
  color: #06d6a0;
  background-color: #073b4c;
  margin-left: 15px;
}
.text:hover {
  color: #ffffff;
  background-color: #06d6a0;
}
</style>
