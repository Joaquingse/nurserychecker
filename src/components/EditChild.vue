<template>
  <v-row>
    <v-col class="mx-auto">
      <v-card class="info">
        <v-card-title class="title">
          <p>Editar datos de Alumn@</p>
        </v-card-title>

        <v-divider></v-divider>
        <v-card-text>
          <v-text-field label="Nombre" v-model="child.name" variant="outlined"></v-text-field>
          <v-text-field
            label="Apellidos"
            v-model="child.surname"
            variant="outlined"
          ></v-text-field>
          <v-row>
            <v-col cols="12" sm="5" class="mx-center">
              <v-radio-group inline label="Comedor" v-model="child.dinner">
                <v-radio label="Sí" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="6">
              <v-radio-group inline label="Recogida temprana" v-model="child.early">
                <v-radio label="Sí" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card class="info">
          <v-card-title>Alergias</v-card-title>
          <v-divider></v-divider>
          <v-row class="pl-4 pr-5">
            <v-checkbox v-model="child.alergies" label="Gluten" value="Gluten"> </v-checkbox>
            <v-checkbox v-model="child.alergies" label="Polvo" value="Polvo"> </v-checkbox>
            <v-checkbox v-model="child.alergies" label="Lactosa" value="Lactosa"> </v-checkbox>
            <v-checkbox v-model="child.alergies" label="Cítricos" value="Cítricos"> </v-checkbox>
          </v-row>
        </v-card>
        <v-card class="info">
          <v-card-title>Actividades</v-card-title>
          <v-divider></v-divider>
          <v-row class="pl-4 pr-6">
            <v-checkbox v-model="child.activities" label="Inglés" value="Inglés"> </v-checkbox>
            <v-checkbox v-model="child.activities" label="Yoga" value="Yoga"> </v-checkbox>
            <v-checkbox v-model="child.activities" label="Música" value="Música"> </v-checkbox>
            <v-checkbox v-model="child.activities" label="Plástica" value="Plástica"> </v-checkbox>
          </v-row>
        </v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Este boton solo guarda los cambios en la info del child -->
          <v-btn
            @click.prevent="updateChild"
            prepend-icon="mdi-content-save-outline"
            class="text"
            size="small"
          >
            aceptar
          </v-btn>
          <v-btn @click.prevent="goBack" prepend-icon="mdi-chevron-left" class="text" size="small">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import children from '../services/children'
import { useAuthStore } from '../stores/store'

export default {
  props: {
    child: Object
  },
  data() {
    return {
      store: useAuthStore(),
      role: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    async updateChild() {
      const response = await children.updateChild(this.child._id, this.child)
      this.$router.push({ name: 'children' })
      return response
    }
  },
  created() {
    this.role = this.store.role
  }
}
</script>

<style scoped>
.text {
  color: #073b4c;
  background-color: #06d6a0;
}

.info {
  color: #ffffff;
  background-color: #073b4c;
}

.text:hover {
  color: #ffffff;
  background-color: #06d6a0;
}

p,
h2 {
  display: inline-block;
  color: white;
}

.title {
  display: flex;
  justify-content: space-between;
}

.tutor {
  width: 300px;
  padding: 0 15px;
}

.tutorAdd {
  width: 350px;
  padding: 0 15px;
}

@media (min-width: 500px) {
  #row {
    display: grid;
    grid-template-areas: 'a b';
    width: 100%;
  }

  #a {
    display: inline-block;
    grid-area: a;
    width: 40vw;
    padding: 10px;
  }
  #b {
    display: inline-block;
    grid-area: b;
    width: 40vw;
    padding: 10px;
  }
}
</style>
