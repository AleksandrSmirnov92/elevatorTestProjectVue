<template>
  <div class="bulding-container">
    <div class="bulding">
      <div class="building__shaft">
        <Shaft v-for="item in buildingInfo.shaftCount" :floorNumber="count" />
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
import { toRef, reactive } from "vue";
const buildingInfo = reactive({
  shaftCount: ["1"],
  floorsCount: ["1", "2", "3", "4", "5"],
});
const callQueue = toRef([]);
const count = toRef("0");
const clickFloor = (floor: string) => {
  callQueue.value.push({ idFloor: floor });
  console.log(callQueue.value);
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
