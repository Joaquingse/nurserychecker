<template>
  <v-row>
    <v-col>
      <v-card>
        <v-list>
          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="child.name + ' ' + child.surname"> </v-list-item>
            </template>

            <!-- Info tutors -->
            <v-list-group value="Tutors">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Familia/Tutores"></v-list-item>
              </template>
              <v-expansion-panels v-for="(tutor, idx) in child.tutors" :key="idx">
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    {{ tutor.name + ' ' + tutor.surname }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text> Relacion: {{ tutor.relation }} </v-expansion-panel-text>
                  <v-expansion-panel-text> Teléfono: {{ tutor.phone }} </v-expansion-panel-text>
                  <v-expansion-panel-text> E-mail: {{ tutor.email }} </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-list-group>

            <!--  Info nursery, no need to show in first time  -->
            <!--   
    <v-list-group value="Nursery">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="child.nursery.name"> </v-list-item>
        </template>
        <v-list-item prepend-icon="mdi-phone-classic" :title="child.nursery.phone"></v-list-item>
        <v-list-item prepend-icon="mdi-email-outline" :title="child.nursery.email"> </v-list-item>
      </v-list-group>
 -->
            <v-list-item title="Comedor: NO" v-if="child.dinner === false"></v-list-item>
            <v-list-item title="Comedor: SÍ" v-else></v-list-item>

            <v-list-item title="Recogida temprana: NO" v-if="child.early === false"></v-list-item>
            <v-list-item title="Recogida temprana: SÍ" v-else></v-list-item>

            <v-list-group value="Alergies">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Alergias"> </v-list-item>
              </template>
              <v-list-item
                v-for="(alergie, idx) in child.alergies"
                :key="idx"
                :title="alergie"
              ></v-list-item>
            </v-list-group>

            <v-list-group value="Activities">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Actividades"> </v-list-item>
              </template>
              <v-list-item
                v-for="(activity, idx) in child.activities"
                :key="idx"
                :title="activity"
              ></v-list-item>
            </v-list-group>
          </v-list-group>
          <v-list-item-action class="pr-2">
            <v-spacer></v-spacer>
            <v-btn
              class="text"
              append-icon="mdi-square-edit-outline"
              size="x-small"
              :to="{ name:'editchild' , params: {id: this.child._id}}"
              >editar</v-btn
            >
            <v-btn class="text" append-icon="mdi-trash-can-outline" size="x-small">eliminar</v-btn>
          </v-list-item-action>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    child: Object
  },
  data() {
    return {
      children: []
    }
  },
  methods: {
    editChild(){
      
    }
  },
  computed: {},
  created() {
    this.children.push(this.child)
  }
}
</script>

<style scoped>
.text {
  color: #06d6a0;
  background-color: #073b4c;
  margin-left: 5px;
}

.text:hover {
  color: #073b4c;
  background-color: #06d6a0;
}
</style>
