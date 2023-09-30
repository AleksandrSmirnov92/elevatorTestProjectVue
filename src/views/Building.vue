<template>
  <div class="bulding-container">
    <div class="bulding">
      <div class="building__shaft">
        <Shaft
          v-for="item in buildingInfo.shaftCount.slice().reverse()"
          :tasks="tasks"
          :floorPosition="item.floorPosition"
          :key="item.id"
        />
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
import { currentElevator } from "../helpers/currentElevator";
import { ref } from "vue";
const buildingInfo = ref({
  shaftCount: [
    {
      id: 1,
      floorPosition: 1,

      active: false,
      initialSeconds: 1,
      activated(currentTimer: number | null, floorNumber: number) {
        this.active = true;
        if (currentTimer) {
          return;
        }
        const task = callQueue.shift();
        if (task == null) {
          this.active = false;
          return;
        }

        this.floorPosition = floorNumber ? floorNumber : task;
        elevatorMotionHandler(task, this.initialSeconds);
        // currentElevator(task, buildingInfo.value.shaftCount);
        currentTimer = setTimeout(() => {
          currentTimer = null;
          this.activated(currentTimer);
          console.log("Анимация прошла", task);
        }, 1000 * (timeMove + 3));
      },
    },
    {
      id: 2,
      floorPosition: 1,
      active: false,
      timeMove: 1,
      initialSeconds: 1,
      activated(currentTimer: number | null, floorNumber: number) {
        this.active = true;

        if (currentTimer) {
          return;
        }
        const task = callQueue.shift();
        if (task == null) {
          this.active = false;
          return;
        }

        this.floorPosition = floorNumber ? floorNumber : task;
        elevatorMotionHandler(task, this.initialSeconds);
        // currentElevator(task, buildingInfo.value.shaftCount); //проблема тут
        currentTimer = setTimeout(() => {
          currentTimer = null;
          this.activated(currentTimer);
          console.log("Анимация прошла", task);
        }, 1000 * (timeMove + 3));
      },
    },
  ],
  floorsCount: [1, 2, 3, 4, 5],
});
const callQueue: any = [];
const tasks = ref(0);
// let initialSeconds = 1;
let timeMove = 1;
let currentTimer: any = null;
// let animateActive = true;

const elevatorMotionHandler = (currentSeconds: number, initialSeconds) => {
  if (initialSeconds < currentSeconds) {
    timeMove = currentSeconds - initialSeconds;
    initialSeconds = currentSeconds;
  }
  if (initialSeconds > currentSeconds) {
    timeMove = initialSeconds - currentSeconds;
    initialSeconds = currentSeconds;
  }
};
// const taskQueueHandler = () => {
//   animateActive = false;
//   if (currentTimer) {
//     return;
//   }
//   const task = callQueue.shift();
//   if (task == null) {
//     animateActive = true;
//     return;
//   }
//   tasks.value = task;
//   currentElevator(task, buildingInfo.value.shaftCount);
//   elevatorMotionHandler(task);

//   currentTimer = setTimeout(() => {
//     currentTimer = null;
//     taskQueueHandler();
//     console.log("Анимация прошла", task);
//   }, 1000 * (timeMove + 3));
// };

const clickFloor = (floorNumber: number) => {
  callQueue.push(floorNumber);
  if (buildingInfo.value.shaftCount.find((item) => item.active == false)) {
    function findClosestInactiveElement(arr, number) {
      let closestElement = null;
      let closestDifference = Infinity;
      for (const element of arr) {
        const difference = Math.abs(number - element.floorPosition);
        if (!element.active && difference < closestDifference) {
          closestElement = element;
          closestDifference = difference;
        }
      }
      console.log(closestElement, arr);
      return closestElement;
    }

    findClosestInactiveElement(
      buildingInfo.value.shaftCount,
      floorNumber
    ).activated(currentTimer, floorNumber);

    // buildingInfo.value.shaftCount
    //   .find((item) => item.active === false)
    //   ?.activated(currentTimer, floorNumber);
  }
  // if (animateActive) {
  //   elevatorMotionHandler(floorNumber);
  //   taskQueueHandler();
  // }
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
