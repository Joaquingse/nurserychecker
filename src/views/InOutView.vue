<template>
  <InOut />
</template>

<script>
import InOut from '../components/InOut.vue'

export default {
  components: { InOut },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.info {
  color: #ffffff;
  background-color: #073b4c;
}

.box {
  display: flex;
  justify-content: space-between;
}
.text {
  color: #073b4c;
  background-color: #06d6a0;
}

.text2 {
  color: #073b4c;
  background-color: #ef476f;
}
.text:hover,
.text2:hover {
  color: #ffffff;
  border: 2px solid white;
}
</style>
