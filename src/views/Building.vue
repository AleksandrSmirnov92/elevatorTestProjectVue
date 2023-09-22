<template>
  <div class="bulding-container">
    <div class="bulding">
      <div class="building__shaft">
        <Shaft v-for="item in buildingInfo.shaftCount" :tasks="tasks" />
      </div>
      <div class="building__floors">
        <Floor
          v-for="item in buildingInfo.floorsCount.slice().reverse()"
          :floorNumber="item"
          @clickFloor="clickFloor"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Floor from "../components/Floor/Floor.vue";
import Shaft from "../components/Shaft/Shaft.vue";
import { reactive, toRef, watch } from "vue";
const buildingInfo = reactive({
  shaftCount: ["1"],
  floorsCount: ["1", "2", "3", "4", "5"],
});
const callQueue = [];
const tasks = toRef(0);
let currentTimer = null;
const moveLift = () => {
  if (currentTimer) {
    return;
  }
  const task = callQueue.shift();
  if (task == null) {
    return;
  }
  console.log(task);
  tasks.value = task;
  currentTimer = setTimeout(() => {
    (currentTimer = null), moveLift();
  }, 1000 * task);
};
moveLift();
const clickFloor = (task: string) => {
  callQueue.push(Number(task));
  moveLift();
};

// watch(callQueue, (newCall) => moveLift(newCall));
// for (let i = 0; i < callQueue.value.length; i++) {}
// const newCallQueue = [...callQueue.value];
// callQueue.value = newCallQueue;
</script>

<style lang="css" scoped>
.bulding-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #d4d4d4;
}
.bulding {
  width: 100%;
  display: flex;
}
.building__floors {
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap;
  align-content: space-around; */
  padding-top: 0.5em;
  width: 10%;
  height: 100%;
  background-color: white;
}
.building__shaft {
  display: flex;
  width: 20%;
  background-color: white;
  border-right: 1px solid black;
}
</style>
