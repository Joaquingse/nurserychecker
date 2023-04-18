<template>
  <v-container>
    <v-row v-if="!add">
      <v-col cols="12" sm="10" class="mx-auto box border">
        <v-row justify="end" align="center">
          <h2 style="color: white">Eventos:</h2>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="add = true" class="text" prepend-icon="mdi-plus" size="small"> Añadir </v-btn>
          <v-btn @click.prevent="goBack" class="text" prepend-icon="mdi-chevron-left" size="small">
            Atrás
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="!add">
      <v-col cols="12" sm="10" class="mx-auto border">
        <v-card class="info">
          <v-tabs v-model="tab" class="tab" density="compact" grow>
            <v-tab value="day"  color="#073b4c">Hoy</v-tab>
            <v-tab value="week"  color="#073b4c">Semana</v-tab>
            <v-tab value="month"  color="#073b4c">Mes</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="day" v-for="(event, idx) in today" :key="idx">
                <v-card class="info">
                  <v-card-title>
                    {{ event.title }}
                  </v-card-title>
              </v-card>
             </v-window-item>

              <v-window-item value="week"> Two </v-window-item>

              <v-window-item value="month" v-for="(event, idx) in month" :key="idx">
                <v-card class="info">
                  <v-card-title>
                    {{ event.title }}
                  </v-card-title>
              </v-card>  
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <AddEvent :add="add" @close="close"/>
    </v-row>
  </v-container>
</template>

<script>
import events from '../services/events'
import AddEvent from './AddEvent.vue'

export default {
  components: {
    AddEvent
  },
  data() {
    return {
      add: false,
      tab: null,
      events: [],
      today: [],
      week: [],
      month: [],
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    close(){
      this.add = false
    },

  },

  async created(){
    const now = new Date()
    const day = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()


    const response = await events.getEvents()
    this.events = response
    this.events.filter((el) => {
        if(new Date(el.date).toLocaleDateString() === now.toLocaleDateString()){
          this.today.push(el)
        }
        if(new Date(el.date).getMonth() === now.getMonth()){
          this.month.push(el)
        }


    })
  console.log(this.month)
  }
}
</script>

<style scoped>
.border {
  border: 1px solid black;
}
.info {
  color: #ffffff;
  background-color: #073b4c;
}
.text {
  color: #06d6a0;
  background-color: #073b4c;
  margin-left: 15px;
}

.text:hover {
  color: #073b4c;
  background-color: #06d6a0;
}
.box {
  display: flex;
  justify-content: space-between;
}

.tab {
  color: #ffffff;
  background-color: #118ab2;
}

</style>
