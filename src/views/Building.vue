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
import { reactive, toRef, ref } from "vue";
const buildingInfo = ref({
  shaftCount: [{}, {}],
  floorsCount: [1, 2, 3, 4, 5],
});
const callQueue: any = [];
const tasks = ref(0);
let initialSeconds = 1;
let timeMove = 1;
let currentTimer: any = null;
let animateActive = true;
const elevatorMotionHandler = (currentSeconds: number) => {
  if (initialSeconds < currentSeconds) {
    timeMove = currentSeconds - initialSeconds;
    initialSeconds = currentSeconds;
  }
  if (initialSeconds > currentSeconds) {
    timeMove = initialSeconds - currentSeconds;
    initialSeconds = currentSeconds;
  }
};
const taskQueueHandler = () => {
  animateActive = false;
  if (currentTimer) {
    return;
  }
  const task = callQueue.shift();
  if (task == null) {
    animateActive = true;
    return;
  }
  tasks.value = task;
  elevatorMotionHandler(task);
  currentTimer = setTimeout(() => {
    (currentTimer = null), taskQueueHandler();
    console.log("Анимация прошла", task);
  }, 1000 * (timeMove + 3));
};

const clickFloor = (floorNumber: number) => {
  callQueue.push(floorNumber);
  if (animateActive) {
    elevatorMotionHandler(floorNumber);
    taskQueueHandler();
  }
};
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
