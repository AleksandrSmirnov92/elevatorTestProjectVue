<template>
  <div class="shaft">
    <Elevator :callQueue="callQueue" />
  </div>
</template>

<script setup>
import Elevator from "../Elevator/Elevator.vue";
import { toRefs, toRef } from "vue";
const props = defineProps({
  callQueue: { type: Array },
});
const { callQueue } = toRefs(props);
</script>

<style lang="css" scoped>
.shaft {
  display: flex;
  width: 100%;
}
</style>
