<template>
  <div
    class="elevator"
    :style="{
      transform: `translateY(${translateY}px)`,
      transition: `transform ${timeS}s ease-in-out`,
    }"
  >
    <span>Лифт</span>
  </div>
</template>

<script setup>
import { toRefs, watch, toRef } from "vue";
const props = defineProps({ callQueue: Array });
const { callQueue } = toRefs(props);
const translateY = toRef(0);
const timeS = toRef(0);
const newCall = toRef(0);
const handleCall = (floorOne) => {
  if (newCall.value < Number(floorOne)) {
    console.log(newCall.value, "tyt");
    console.log(Number(floorOne) - newCall.value - 1);
    newCall.value = Number(floorOne) - 1;
    translateY.value = (1 - Number(floorOne)) * 135;
    timeS.value = newCall.value;
    callQueue.value.shift();
  }
  if (newCall.value > Number(floorOne)) {
    console.log(newCall.value - Number(floorOne));
    translateY.value = (1 - Number(floorOne)) * 135;
    timeS.value = newCall.value - Number(floorOne);
    newCall.value = newCall.value - Number(floorOne);
    console.log(newCall.value);
    callQueue.value.shift();
  }
};
watch(callQueue, (newValue) => {
  for (let i = 0; i < newValue.length; i++) {
    handleCall(newValue[0].floorNumber);
  }
});
</script>

<style lang="css" scoped>
.elevator {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  height: 135px;
  align-self: flex-end;
  background-color: #854d0e;
}
.elevatorUp {
  transform: translateY(-143px);
}
</style>
