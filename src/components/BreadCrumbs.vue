<template>
  <v-breadcrumbs :items="items">
        <template v-slot:title="{item}">
       
            {{ item.title }}
 
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
data() {
  return {
    items: [
        {
          title: 'Menu',
          disabled: false,
          href: 'menu',
        },
        {
          title: 'Usuarios',
          disabled: false,
          href: 'workers',
        },
      ],
  }
},
computed: {
  breadcrumb() {
    
    return this.data 
  }
},
}
</script>

<style scoped></style>
