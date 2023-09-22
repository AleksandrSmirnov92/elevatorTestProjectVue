<template>
  <div
    class="elevator"
    :style="{
      transform: `translateY(${translateY}px)`,
      transition: `transform ${timeMove}s ease-in-out`,
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
let val = 0;
const handleMove = () => {
  if (val < tasks.value) {
    timeMove.value = tasks.value - val;
    val = tasks.value;
    console.log("больше");
  }
  if (val > tasks.value) {
    timeMove.value = val - tasks.value;
    val = tasks.value;
    console.log("меньше");
  }
};
watch(tasks, (newVall) => {
  console.log(handleMove());
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
