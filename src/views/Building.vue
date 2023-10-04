<template>
  <div class="bulding-container">
    <div class="bulding">
      <div class="building__shaft">
        <Shaft
          v-for="item in buildingInfo.shaftCount.slice().reverse()"
          :elevatorInfo="item"
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
import { findClosestInactiveElement } from "../helpers/findClosestInactiveElement";
import { ref } from "vue";
const buildingInfo = ref({
  shaftCount: [new Elevator(1)],
  floorsCount: [1, 2, 3, 4, 5],
});
const clickFloor = (floorNumber: number) => {
  callQueue.push(floorNumber);
  if (buildingInfo.value.shaftCount.find((item) => item.active === false)) {
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

  background-color: white;
  border-right: 1px solid black;
}
</style>
