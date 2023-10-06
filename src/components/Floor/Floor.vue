<template>
  <div class="floor elevatorHeight">
    <span class="floor-number">Этаж {{ floorNumber }}</span>
    <button
      class="floor-btn"
      :style="
        callQueueActive.includes(floorNumber) ? 'background-color:#22c55e' : ''
      "
      @click="$emit('clickFloor', getValue())"
      :disabled="callQueueActive.includes(floorNumber)"
    ></button>
  </div>
</template>

<script setup>
import { callQueueActive } from "../../helpers/createElevator.ts";
import { toRefs, watch } from "vue";

const props = defineProps({
  floorNumber: { type: Number, required: true },
});

const { floorNumber } = toRefs(props);
const getValue = () => {
  return floorNumber.value;
};
</script>

<style lang="css" scoped>
.floor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
