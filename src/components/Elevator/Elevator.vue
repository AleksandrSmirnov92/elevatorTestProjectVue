<template>
  <div
    ref="heightElevator"
    class="elevator"
    :style="[
      {
        transform: `translateY(${elevatorInfo!.translateY}px)`,
        transition: `transform ${elevatorInfo!.timeMove}s linear`,
      },
      `height:calc(100vh/${floorHeight!})`,
    ]"
  >
    <div class="elevator__floor-container">
      <div
        class="elevator__floor"
        :style="toggleClass ? 'background-color:#6ee7b7' : ''"
      >
        <div class="elevator__floor-screen">
          <span class="floor-screen__text">Этаж- </span
          ><span class="floor-screen__number">{{ currentFloorPosition }}</span>
        </div>

        <CIcon
          v-if="elevatorInfo!.elevatorDirection"
          :icon="cilChevronDoubleUp"
          key="up"
          width="16"
          class="arrow"
        />
        <CIcon
          v-if="!elevatorInfo!.elevatorDirection"
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
          transform: `translateX(${-elevatorInfo!.translateX}px)`,
          transition: `transform ${1}s linear`,
        }"
      ></div>
      <div
        :style="{
          transform: `translateX(${elevatorInfo!.translateX}px)`,
          transition: `transform ${1}s linear`,
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, watch, ref, onMounted, onUnmounted } from "vue";
import { elevatorMotionHandler } from "../../helpers/createElevator";
import { cilChevronDoubleDown, cilChevronDoubleUp } from "@coreui/icons";

const props = defineProps({
  elevatorInfo: Object,
  floorHeight: Number,
});
const { elevatorInfo, floorHeight } = toRefs(props);
const heightElevator = ref<any>(null);
let initialSeconds = elevatorInfo!.value!.initialSeconds;
let toggleClass = ref(false);
let currentFloorPosition = ref(elevatorInfo!.value!.floorPosition!.num);
const animationElevator = (newFloorPosition: number) => {
  let startInitialSeconds = initialSeconds;
  elevatorInfo!.value!.translateY =
    -heightElevator!.value!.clientHeight * (newFloorPosition - 1);
  const counterFloorPosition = setInterval(() => {
    elevatorMotionHandler(startInitialSeconds, newFloorPosition)
      ? (currentFloorPosition!.value -= 1)
      : (currentFloorPosition!.value += 1);
  }, 990);
  setTimeout(() => {
    elevatorInfo!.value!.translateX = 10;
    const openDoorsElevator = setInterval(() => {
      toggleClass.value = !toggleClass.value;
    }, 500);
    setTimeout(() => (elevatorInfo!.value!.translateX = 0), 2000);
    setTimeout(() => {
      clearInterval(openDoorsElevator);
      toggleClass.value = false;
    }, 3000);
    clearInterval(counterFloorPosition);
  }, 1000 * elevatorInfo!.value!.timeMove);
  initialSeconds = elevatorInfo!.value!.floorPosition!.num;
};
watch(
  () => elevatorInfo!.value!.floorPosition,
  (newFloorPosition) => {
    animationElevator(newFloorPosition!.num);
  }
);
const handlerHeight = () => {
  elevatorInfo!.value!.translateY =
    -heightElevator!.value!.clientHeight *
    (elevatorInfo!.value!.floorPosition.num - 1);
  elevatorInfo!.value!.timeMove = 0;
};
onMounted(() => {
  window.addEventListener("resize", handlerHeight);
});
onUnmounted(() => {
  window.removeEventListener("resize", handlerHeight);
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
}
.elevator__doors > div {
  border: 1px solid black;
  width: 20%;
  height: 100%;
  background-color: #94a3b8;
}
@media (max-width: 665px) {
  .elevator__floor {
    margin-right: 0;
    margin-left: 0;
  }
  .floor-screen__text {
    display: none;
  }
  .elevator__floor-container {
    width: 100%;
  }
  .elevator__floor-screen {
    justify-content: center;
    width: 40px;
    margin-left: 0;
    margin-right: 0;
  }
  .elevator__doors > div {
    width: 40%;
  }
}
</style>
