<template>
  <div
    class="elevator"
    :style="{
      transform: `translateY(${translateY}px)`,
      transition: `transform ${timeMove}s linear`,
    }"
  >
    <span>Лифт</span>
  </div>
</template>

<script setup>
import { toRefs, watch, toRef } from "vue";
const props = defineProps({ tasks: Number });
const { tasks } = toRefs(props);
const translateY = toRef(0);
const timeMove = toRef(1);
let val = 1;
const handleMove = () => {
  if (val < tasks.value) {
    console.log(tasks.value - val);
    timeMove.value = tasks.value - val;
    val = tasks.value;
  }
  if (val > tasks.value) {
    console.log(val - tasks.value);
    timeMove.value = val - tasks.value;
    val = tasks.value;
    // console.log("меньше");
  }
};
watch(tasks, (newVall) => {
  handleMove();
  translateY.value = -145 * (newVall - 1);
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
