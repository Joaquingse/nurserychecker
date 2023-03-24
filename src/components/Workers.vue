<template>
  <v-card class="info">
    <v-card-title>
      {{ user.name.toLocaleUpperCase() }} {{ user.surname.toLocaleUpperCase() }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      Teléfono: {{ user.phone }} <br />
      E-mail: {{ user.email }}<br />
      Centro: {{ user.nursery.name}}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        class="text"
        v-if="role === 'admin'"
        prepend-icon="mdi-trash-can-outline"
      >
        Eliminar
        <v-dialog v-model="dialog" activator="parent" width="auto">
          <v-card>
            <v-card-text>
              Va a eliminar al usuario {{ user.name.toLocaleUpperCase() }}
              {{ user.surname.toLocaleUpperCase() }} <br />
              ¿Está seguro?
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn class="text"  @click="remove">Aceptar</v-btn>
              <v-btn class="text"  @click="dialog = false">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-btn class="text" v-if="role === 'admin'" prepend-icon="mdi-square-edit-outline">
      Editar
      <v-dialog v-model="dialog2" activator="parent" width="auto">
          <v-card>
            <v-card-text>
              Edicion del usuario: {{ user.name.toLocaleUpperCase() }}
              {{ user.surname.toLocaleUpperCase() }} <br />
            </v-card-text>
            <v-text-field
        label="Nombre"
        placeholder="Introduzca su nuevo nombre"
        hide-details="auto"
        v-model="info.name"
      ></v-text-field>
      <v-text-field
        label="Apellido"
        placeholder="Introduzca su nuevo apellido"
        hide-details="auto"
        v-model="info.surname"
      ></v-text-field>
      <v-text-field
        label="DNI"
        placeholder="Introduzca su nuevo DNI"
        hide-details="auto"
        v-model="info.dni"
      ></v-text-field>
      <v-text-field
        label="Teléfono"
        placeholder="Introduzca su nuevo teléfono"
        hide-details="auto"
        v-model="info.phone"
      ></v-text-field>
      <v-text-field
        label="E-mail"
        placeholder="Introduzca su nuevo e-mail"
        hide-details="auto"
        v-model="info.email"
      ></v-text-field>
      <v-text-field
        label="Rol"
        placeholder="Introduzca su nuevo e-mail"
        hide-details="auto"
        v-model="info.role"
      ></v-text-field>
            <v-card-actions>
              <v-spacer/>
              <v-btn class="text"  @click="edit">Aceptar</v-btn>
              <v-btn class="text"  @click="dialog2 = false">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>       

      </v-btn>
    </v-card-actions>
  </v-card>
  
</template>

<script>
import api from '../services/api'
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      role: '',
      dialog: false,
      dialog2: false,
      nur:{},
      info: {}
    }
  },
  props: {
    user: Object
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    remove() {
      this.$emit('remove_user',this.user._id)
      this.dialog = false
    },
    edit(){
      this.$emit('edit_user', this.user._id, this.info)
      this.dialog2 = false
    }  
  },
  async created() {
    const store = useAuthStore()
    this.role = store.role
    this.info = this.user
  },
  computed: {
    infoUser() {
      if (this.user.role !== 'admin') {
        console.log(this.user)
      }
    },
  }
}
</script>

<style scoped>
.text {
  color: #073b4c;
  background-color: #06d6a0;
}

.text:hover {
  color: #ffffff;
}
.info {
  color: #ffffff;
  background-color: #073b4c;

}
</style>
