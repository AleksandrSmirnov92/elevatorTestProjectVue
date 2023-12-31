<template>
  <div class="bulding-container">
    <div class="bulding">
      <div class="building__shaft">
        <Shaft
          v-for="item in buildingInfo.shaftCount.slice().reverse()"
          :elevatorInfo="item"
          :key="item.id"
          :floorHeight="buildingInfo.floorsCount.length"
        />
      </div>
      <div class="building__floors">
        <Floor
          v-for="item in buildingInfo.floorsCount.slice().reverse()"
          :floorNumber="item"
          @clickFloor="clickFloor"
          :floorHeight="buildingInfo.floorsCount.length"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Floor from "../components/Floor/Floor.vue";
import Shaft from "../components/Shaft/Shaft.vue";
import { callQueue, callQueueActive, buildingInfo } from "../store/index";
import { findClosestInactiveElement } from "../helpers/findClosestInactiveElement";
import { floorPosition } from "../helpers/createElevator";
import { onMounted, watch } from "vue";

const clickFloor = (floorNumber: number) => {
  callQueue.push(floorNumber);
  callQueueActive.value.push(floorNumber);
  if (buildingInfo.value.shaftCount.find((item) => item.active === false)) {
    findClosestInactiveElement(
      buildingInfo!.value.shaftCount,
      floorNumber
    )!.activated(floorNumber, buildingInfo.value.floorsCount.length);
  }
};
watch(buildingInfo.value.shaftCount, (newValue) => {
  localStorage.setItem("shaftCount", JSON.stringify(newValue));
});
onMounted(() => {
  buildingInfo.value.shaftCount.forEach((element) => {
    element.active = false;
    element.currentTimer = null;
    element.elevatorDirection =
      floorPosition(element.houseHeight, element.floorPosition.num) ??
      element.elevatorDirection;
  });
});
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
  background-color: white;
}

.building__shaft {
  display: flex;
  background-color: white;
  border-right: 1px solid black;
}
@media (max-width: 665px) {
  .bulding {
    justify-content: space-between;
  }
  .building__shaft {
    width: 60%;
  }
  .building__floors {
    width: 40%;
  }
}
@media (max-width: 470px) {
  .building__shaft {
    width: 70%;
  }
  .building__floors {
    width: 30%;
  }
}
@media (max-width: 390px) {
  .building__shaft {
    width: 80%;
  }
  .building__floors {
    width: 20%;
  }
}
</style>
