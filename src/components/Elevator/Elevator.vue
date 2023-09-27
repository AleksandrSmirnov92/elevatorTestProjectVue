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
import { toRefs, watch, toRef, ref } from "vue";
const heightElevator = ref(null);
const props = defineProps({ tasks: Number });
const { tasks } = toRefs(props);
const translateY = toRef(0);
const timeMove = toRef(1);
let val = 1;
let toggleClass = toRef(false);
const handleMove = () => {
  if (val < tasks.value) {
    // console.log("Время анимации вверх", tasks.value - val);
    timeMove.value = tasks.value - val;
    setTimeout(() => {
      const stop = setInterval(() => {
        toggleClass.value = !toggleClass.value;
      }, 500);
      setTimeout(() => {
        clearInterval(stop);
        toggleClass.value = false;
      }, 3000);
    }, 1000 * timeMove.value);
    val = tasks.value;
  }
  if (val > tasks.value) {
    // console.log("Время анимации вниз", val - tasks.value);
    timeMove.value = val - tasks.value;
    setTimeout(() => {
      const stop = setInterval(() => {
        toggleClass.value = !toggleClass.value;
      }, 500);
      setTimeout(() => {
        toggleClass.value = false;
        clearInterval(stop);
      }, 3000);
    }, 1000 * timeMove.value);
    val = tasks.value;
  }
};
watch(tasks, (newTasks) => {
  handleMove();
  translateY.value = -heightElevator.value.clientHeight * (newTasks - 1);
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
