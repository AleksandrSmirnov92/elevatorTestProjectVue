<template>
  <div
    ref="heightElevator"
    class="elevator elevatorHeight"
    :style="{
      transform: `translateY(${elevatorInfo.translateY}px)`,
      transition: `transform ${elevatorInfo.timeMove}s linear`,
    }"
  >
    <div class="elevator__floor-container">
      <div
        class="elevator__floor"
        :style="toggleClass ? 'background-color:#6ee7b7' : ''"
      >
        <div class="elevator__floor-screen">
          <span class="floor-screen__text">Этаж- </span
          ><span class="floor-screen__number">{{ c }}</span>
        </div>

        <CIcon
          v-if="elevatorInfo.elevatorDirection"
          :icon="cilChevronDoubleUp"
          key="up"
          width="16"
          class="arrow"
        />
        <CIcon
          v-if="!elevatorInfo.elevatorDirection"
          key="down"
          :icon="cilChevronDoubleDown"
          width="16"
          class="arrow"
        />
      </div>
    </div>

    <div class="elevator__doors">
      <div
        :style="{
          transform: `translateX(${-translateX}px)`,
          transition: `transform ${1}s linear`,
        }"
      ></div>
      <div
        :style="{
          transform: `translateX(${translateX}px)`,
          transition: `transform ${1}s linear`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, watch, ref, onMounted } from "vue";
import { elevatorMotionHandler } from "../../helpers/createElevator";
import { cilChevronDoubleDown, cilChevronDoubleUp } from "@coreui/icons";
const props = defineProps({
  elevatorInfo: Object,
});
const { elevatorInfo } = toRefs(props);
const heightElevator = ref(null);
// const translateY = ref(0);
const translateX = ref(0);
let initialSeconds = 1;
let toggleClass = ref(false);
let c = ref(initialSeconds);
const animationElevator = (newFloorPosition) => {
  let n = initialSeconds;
  elevatorInfo.value.translateY =
    -heightElevator.value.clientHeight * (newFloorPosition - 1);
  // translateY.value =
  //   -heightElevator.value.clientHeight * (newFloorPosition - 1);
  const animateFloorPosition = setInterval(() => {
    if (n < newFloorPosition) {
      c.value += 1;
    }
    if (n > newFloorPosition) {
      c.value -= 1;
    }
  }, 1000);

  setTimeout(() => {
    translateX.value = 10;
    const stop = setInterval(() => {
      toggleClass.value = !toggleClass.value;
    }, 500);
    setTimeout(() => (translateX.value = 0), 2000);
    setTimeout(() => {
      clearInterval(stop);
      toggleClass.value = false;
    }, 3000);
    clearInterval(animateFloorPosition);
  }, 1000 * elevatorInfo.value.timeMove);
  initialSeconds = elevatorInfo.value.floorPosition.num;
};
watch(
  () => elevatorInfo.value.floorPosition,
  (newFloorPosition) => {
    animationElevator(newFloorPosition.num);
  }
);
onMounted(() => {
  console.log(elevatorInfo.value);
});
</script>

<style lang="css" scoped>
.elevator {
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  align-self: flex-end;
  background-color: #cbd5e1;
}
.elevatorUp {
  transform: translateY(-143px);
}
.active {
  background-color: #6ee7b7;
}
.elevator__floor-container {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}
.elevator__floor {
  border: 0.2em solid black;
  margin-right: 2em;
  margin-left: 2em;
  display: flex;
  justify-content: space-around;
  background-color: #38bdf8;
}
.elevator__floor-screen {
  display: flex;
  margin-right: 0.4em;
  margin-left: 0.4em;
}
.floor-screen__text {
  margin-left: 0.5em;
}
.floor-screen__number {
  width: 0.7em;
}
.arrow {
  margin-right: 0.5em;
}
.elevator__doors {
  display: flex;
  justify-content: center;
  margin-top: 0.1em;
  margin-left: 1em;
  margin-right: 1em;
  height: 100%;
  /* background-color: green; */
}
.elevator__doors > div {
  border: 1px solid black;
  width: 20%;
  height: 100%;
  background-color: #94a3b8;
}
</style>
