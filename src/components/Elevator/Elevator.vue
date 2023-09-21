<template>
  <div
    class="elevator"
    :style="{
      transform: `translateY(${true === '2' ? -143 : 0}px)`,
      transition: `transform 1s ease-in-out`,
    }"
  >
    <span>Лифт</span>
  </div>
</template>

<script setup>
import { toRefs, watch, computed } from "vue";
const props = defineProps({ callQueue: Array });
const { callQueue } = toRefs(props);
watch(callQueue, (newCallQueue) =>
  console.log("массив изменился", newCallQueue)
);
</script>

<style lang="css" scoped>
.elevator {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  height: 143px;
  align-self: flex-end;
  background-color: #854d0e;
}
.elevatorUp {
  transform: translateY(-143px);
}
</style>
