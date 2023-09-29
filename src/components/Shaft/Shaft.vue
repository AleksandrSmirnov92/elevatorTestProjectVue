<template>
  <div class="shaft">
    <Elevator :tasks="tasks" />
  </div>
</template>

<script setup>
import Elevator from "../Elevator/Elevator.vue";
import { toRefs, toRef } from "vue";
const props = defineProps({
  tasks: { type: Number },
});
const { tasks } = toRefs(props);
</script>

<style lang="css" scoped>
.shaft {
  border-left: 1px solid black;
  display: flex;
  width: 100%;
}
</style>
