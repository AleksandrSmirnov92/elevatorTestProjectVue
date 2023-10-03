<template>
  <div class="bulding-container">
    <div class="bulding">
      <div class="building__shaft">
        <Shaft
          v-for="item in buildingInfo.shaftCount.slice().reverse()"
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
import { callQueue, Elevator } from "../helpers/createElevator";
import { ref } from "vue";
const buildingInfo = ref({
  shaftCount: [
    new Elevator(1),
    // new Elevator(2),
    // {
    //   id: 1,
    //   floorPosition: 1,
    //   active: false,
    //   initialSeconds: 1,
    //   currentTimer: null,
    //   timeMove: 1,
    //   activated(floorNumber: number) {
    //     this.active = true;
    //     if (this.currentTimer) {
    //       return;
    //     }
    //     const task = callQueue?.shift();
    //     if (task == null) {
    //       this.active = false;
    //       return;
    //     }
    //     this.floorPosition = floorNumber ? floorNumber : task;
    //     this.timeMove = elevatorMotionHandler(
    //       task,
    //       this.initialSeconds,
    //       this.timeMove
    //     );
    //     this.initialSeconds = task;
    //     this.currentTimer = setTimeout(() => {
    //       this.currentTimer = null;
    //       this.activated();
    //       console.log("Анимация прошла", task);
    //     }, 1000 * (this.timeMove + 3));
    //   },
    // },
    // {
    //   id: 2,
    //   floorPosition: 1,
    //   active: false,
    //   initialSeconds: 1,
    //   currentTimer: null,
    //   timeMove: 1,
    //   activated(floorNumber: number) {
    //     this.active = true;
    //     if (this.currentTimer) {
    //       return;
    //     }
    //     const task = callQueue?.shift();
    //     if (task == null) {
    //       this.active = false;
    //       return;
    //     }
    //     this.floorPosition = floorNumber ? floorNumber : task;
    //     this.timeMove = elevatorMotionHandler(
    //       task,
    //       this.initialSeconds,
    //       this.timeMove
    //     );
    //     this.initialSeconds = task;
    //     this.currentTimer = setTimeout(() => {
    //       this.currentTimer = null;
    //       this.activated();
    //       console.log("Анимация прошла", task);
    //     }, 1000 * (this.timeMove + 3));
    //   },
    // },
  ],
  floorsCount: [1, 2, 3, 4, 5],
});
// const callQueue: any = [];
// const elevatorMotionHandler = (
//   currentSeconds: number,
//   initialSeconds: number,
//   timeMove: number
// ) => {
//   if (initialSeconds < currentSeconds) {
//     timeMove = currentSeconds - initialSeconds;
//   }
//   if (initialSeconds > currentSeconds) {
//     timeMove = initialSeconds - currentSeconds;
//   }
//   return timeMove;
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
      return closestElement;
    }

    findClosestInactiveElement(
      buildingInfo.value.shaftCount,
      floorNumber
    ).activated(floorNumber);
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
