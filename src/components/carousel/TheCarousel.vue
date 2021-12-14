<template>
  <div style="height: 269px;display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;">
    <img src="../../assets/mainLogo.png" alt="xx" style=" width: 200px;
    margin: 10px;">
    <span style="    font-size: 40px;
    font-weight: 200;
  ">помощь бездомным  животным</span>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TheCarousel',
  setup () {
    return {
      slide: ref('style'),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  }
}
</script>

<style scoped>

</style>
