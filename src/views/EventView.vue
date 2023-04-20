<template>
  <allEvents />
</template>

<script>
import allEvents from '../components/Events.vue'

export default {
  components: {
    allEvents
  }
}
</script>

<style scoped>
.info {
  color: #ffffff;
  background-color: #073b4c;
}
.text {
  color: #073b4c;
  background-color: #06d6a0;
}
.text:hover {
  color: #ffffff;
  background-color: #06d6a0;
}
.box {
  display: flex;
  justify-content: space-between;
}
</style>
