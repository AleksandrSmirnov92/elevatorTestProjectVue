<template>
  <div class="shaft">
    <Elevator :floorNumber="floorNumber" />
  </div>
</template>

<script setup>
import Elevator from "../Elevator/Elevator.vue";
import { toRefs, toRef } from "vue";
const props = defineProps({
  floorNumber: String,
});
const { floorNumber } = toRefs(props);
</script>

<style lang="css" scoped>
.shaft {
  display: flex;
  width: 100%;
}
</style>
