<template>
  <div class="floor">
    <span class="floor-number">Этаж {{ floorNumber }}</span>
    <button
      class="floor-btn"
      @click="$emit('clickFloor', floorNumber)"
    ></button>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
const props = defineProps({
  floorNumber: { type: String, required: true },
});
const { floorNumber } = toRefs(props);
</script>

<style lang="css" scoped>
.floor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid black;
}
.floor-number {
  padding-bottom: 1em;
}
.floor-btn {
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background-color: black;
}
.floor-btn:hover {
  opacity: 0.5;
}
</style>
