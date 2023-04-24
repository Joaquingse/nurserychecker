<template>
  <v-container>
    <v-row v-if="!add" no-gutters style="height: 50px">
      <v-col cols="12" sm="10" class="mx-auto box" align-self="center">
        <h2 style="color: white">Eventos:</h2>
        <v-spacer></v-spacer>
        <v-btn
          @click.prevent="add = true"
          class="text"
          prepend-icon="mdi-plus"
          size="small"
          v-if="store.role !== 'worker'"
        >
          Añadir
        </v-btn>
        <v-btn @click.prevent="goBack" class="text" prepend-icon="mdi-chevron-left" size="small">
          Atrás
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="!add">
      <v-col cols="12" sm="10" class="mx-auto">
        <v-card class="info">
          <v-tabs v-model="tab" class="tab" density="compact" grow paddless>
            <v-tab value="day" color="#ffffff"><strong>Hoy:</strong> </v-tab>
            <!--  <v-tab value="week" color="#073b4c"><strong>Semana:</strong></v-tab> -->
            <v-tab value="month" color="#ffffff"><strong>Siguientes:</strong> </v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="day" v-for="(event, idx) in today" :key="idx">
                <v-expansion-panels>
                  <v-expansion-panel :title="event.title" class="info">
                    <v-expansion-panel-text>
                      <v-row>
                        <v-col cols="12">
                          <v-card class="info" flat>
                            <v-card-text>
                              Fecha: {{ new Date(event.date).toLocaleDateString() }}
                            </v-card-text>
                            <v-card-text> Participantes: {{ event.attendance }} </v-card-text>
                            <v-card-text> Descripción: {{ event.description }} </v-card-text>
                            <!-- Future implementation: edit button -->
                            <!-- <v-card-actions
                              ><v-spacer></v-spacer>
                              <v-btn class="text2" size="small">Editar</v-btn>
                            </v-card-actions> -->
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-window-item>
              <!-- In the future week events select -->
              <!--               <v-window-item value="week">
                <v-expansion-panels>
                  <v-expansion-panel :title="new Date(event.date).toLocaleDateString()" class="info">
                    <v-expansion-panel-text>
                      <v-row>
                        <v-col cols="12">
                          <v-card class="info" flat>
                            <v-card-text>
                              Evento: {{ event.title }}
                            </v-card-text>
                            <v-card-text> Participantes: {{ event.attendance }} </v-card-text>
                            <v-card-text> Descripción: {{ event.description }} </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-window-item> -->

              <!-- Called "next in tabs, to show all the next events, not only the month events" -->
              <v-window-item value="month" v-for="(event, idx) in month" :key="idx">
                <v-expansion-panels>
                  <v-expansion-panel
                    :title="new Date(event.date).toLocaleDateString()"
                    class="info"
                  >
                    <v-expansion-panel-text>
                      <v-row>
                        <v-col cols="12">
                          <v-card class="info" flat>
                            <v-card-text> Evento: {{ event.title }} </v-card-text>
                            <v-card-text> Participantes: {{ event.attendance }} </v-card-text>
                            <v-card-text> Descripción: {{ event.description }} </v-card-text>
                            <!-- Future implementation: edit button -->
                            <!-- <v-card-actions
                              ><v-spacer></v-spacer>
                              <v-btn class="text2" size="small">Editar</v-btn>
                            </v-card-actions> -->
                          </v-card>
                          <v-divider color="#ffffff"></v-divider>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <AddEvent :add="add" @close="close" @new="newEvent"/>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from '../stores/store'
import events from '../services/events'
import AddEvent from './AddEvent.vue'

export default {
  components: {
    AddEvent
  },
  data() {
    return {
      store: useAuthStore(),
      add: false,
      tab: null,
      events: [],
      today: [],
      week: [],
      month: []
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    close() {
      this.add = false
    },
    async newEvent(info) {
      const response = await events.addEvents(info)
      this.month.push(info)
      this.month.sort((a,b) =>{
        if(a.date < b.date) {
          return -1
        }
      })
      this.close()
      return response
    },
  },

  async created() {
    const now = new Date()
    const day = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    const response = await events.getEvents()
    this.events = response
    this.events.filter((el) => {
      if (new Date(el.date) === now) {
        this.today.push(el)
      }
      if (new Date(el.date) >= now) {
        this.month.push(el)
        this.month.sort((a,b) =>{
        if(a.date < b.date) {
          return -1
        }
      })
      }
    })
  }
}
</script>

<style scoped>
.info {
  color: #ffffff;
  background-color: #073b4c;
}
.text {
  color: #06d6a0;
  background-color: #073b4c;
  margin-left: 15px;
}

.text2 {
  color: #073b4c;
  background-color: #06d6a0;
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
  color: #073b4c;
  background-color: #06d6a0;
}
</style>
