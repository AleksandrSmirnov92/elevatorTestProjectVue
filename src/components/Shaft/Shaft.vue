<template>
  <div class="shaft">
    <Elevator :floorPosition="floorPosition" />
  </div>
</template>

<script setup>
import Elevator from "../Elevator/Elevator.vue";
import { toRefs, toRef } from "vue";
const props = defineProps({
  floorPosition: { type: Number },
});
const { tasks, currentFloor } = toRefs(props);
</script>

<style lang="css" scoped>
.shaft {
  border-left: 1px solid black;
  display: flex;
  width: 100%;
}
</style>
