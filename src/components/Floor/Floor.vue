<template>
  <div class="floor" :style="`height:calc(100vh/${floorHeight})`">
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

<script lang="ts" setup>
import { callQueueActive } from "../../store/index";
import { toRefs } from "vue";

const props = defineProps({
  floorNumber: { type: Number, required: true },
  floorHeight: Number,
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
@media (max-width: 460px) {
}
</style>
