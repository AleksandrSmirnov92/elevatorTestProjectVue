<template>
  <div
    ref="heightElevator"
    class="elevator"
    :style="{
      transform: `translateY(${translateY}px)`,
      transition: `transform ${timeMove}s linear`,
    }"
    :class="!toggleClass ? '' : 'inactive'"
  >
    <span>Лифт</span>
  </div>
</template>

<script setup>
import { toRefs, watch, ref } from "vue";
const heightElevator = ref(null);
const props = defineProps({
  floorPosition: Number,
});
const { floorPosition } = toRefs(props);
const translateY = ref(0);
const timeMove = ref(1);
let initialSeconds = 1;
let toggleClass = ref(false);
const animationElevator = (newFloorPosition) => {
  if (initialSeconds < floorPosition.value) {
    translateY.value =
      -heightElevator.value.clientHeight * (newFloorPosition - 1);
    timeMove.value = floorPosition.value - initialSeconds;
    setTimeout(() => {
      const stop = setInterval(() => {
        toggleClass.value = !toggleClass.value;
      }, 500);
      setTimeout(() => {
        clearInterval(stop);
        toggleClass.value = false;
      }, 3000);
    }, 1000 * timeMove.value);
    initialSeconds = floorPosition.value;
  }
  if (initialSeconds > floorPosition.value) {
    translateY.value =
      -heightElevator.value.clientHeight * (newFloorPosition - 1);
    timeMove.value = initialSeconds - floorPosition.value;
    setTimeout(() => {
      const stop = setInterval(() => {
        toggleClass.value = !toggleClass.value;
      }, 500);
      setTimeout(() => {
        clearInterval(stop);
        toggleClass.value = false;
      }, 3000);
    }, 1000 * timeMove.value);
    initialSeconds = floorPosition.value;
  }
};
watch(floorPosition, (newFloorPosition) => {
  animationElevator(newFloorPosition);
});
</script>

<style lang="css" scoped>
.elevator {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  height: calc((100vh / 5));
  align-self: flex-end;
  background-color: #854d0e;
}
.elevatorUp {
  transform: translateY(-143px);
}
.active {
  background-color: red;
}
.inactive {
  background-color: aquamarine;
}
</style>
