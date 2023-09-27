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
import { reactive, toRef } from "vue";
const buildingInfo = reactive({
  shaftCount: ["1"],
  floorsCount: ["1", "2", "3", "4", "5"],
});
let initialVal = 1;
let timeMove = 1;
const callQueue: any = [];
const tasks = toRef(0);
let currentTimer: any = null;
let animateActive = true;
const handleMove = (s: number) => {
  if (initialVal < s) {
    timeMove = s - initialVal;
    initialVal = s;
  }
  if (initialVal > s) {
    timeMove = initialVal - s;
    initialVal = s;
  }
};
const moveLift = () => {
  animateActive = false;
  if (currentTimer) {
    return;
  }
  const task = callQueue.shift();
  if (task == null) {
    animateActive = true;
    return;
  }
  // console.log(task);
  tasks.value = Number(task);
  handleMove(Number(task));
  currentTimer = setTimeout(() => {
    (currentTimer = null), moveLift();
    console.log("Анимация прошла", task);
  }, 1000 * (timeMove + 3));
};
// moveLift();
const clickFloor = (floorNumber: string) => {
  callQueue.push(floorNumber);
  if (animateActive) {
    handleMove(Number(floorNumber));
    moveLift();
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
