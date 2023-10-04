<template>
  <div
    ref="heightElevator"
    class="elevator"
    :style="{
      transform: `translateY(${translateY}px)`,
      transition: `transform ${elevatorInfo.timeMove}s linear`,
    }"
    :class="!toggleClass ? '' : 'inactive'"
  >
    <div class="elevator__floor">
      <span class="">Этаж-{{ c }}</span>
    </div>

    <span class="elevator__doors">Лифт-{{ elevatorDoors }}</span>
  </div>
</template>

<script setup>
import { toRefs, watch, ref } from "vue";
import { elevatorMotionHandler } from "../../helpers/createElevator";
const heightElevator = ref(null);
const elevatorDoors = ref("Закрыт");
const props = defineProps({
  elevatorInfo: Object,
});
const { elevatorInfo } = toRefs(props);
const translateY = ref(0);
let initialSeconds = 1;
let toggleClass = ref(false);
let c = ref(initialSeconds);
const animationElevator = (newFloorPosition) => {
  let n = initialSeconds;

  translateY.value =
    -heightElevator.value.clientHeight * (newFloorPosition - 1);
  const animateFloorPosition = setInterval(() => {
    if (n < newFloorPosition) {
      c.value += 1;
      console.log(c.value);
    }
    if (n > newFloorPosition) {
      c.value -= 1;
      console.log(c.value);
    }
  }, 1000);

  setTimeout(() => {
    elevatorDoors.value = "открыт";
    const stop = setInterval(() => {
      toggleClass.value = !toggleClass.value;
    }, 500);
    setTimeout(() => {
      clearInterval(stop);
      toggleClass.value = false;
      elevatorDoors.value = "закрыт";
    }, 3000);
    clearInterval(animateFloorPosition);
  }, 1000 * elevatorInfo.value.timeMove);
  initialSeconds = elevatorInfo.value.floorPosition;
};
watch(
  () => elevatorInfo.value.floorPosition,
  (newFloorPosition) => {
    animationElevator(newFloorPosition);
  }
);
</script>

<style lang="css" scoped>
.elevator {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
  height: calc((100vh / 5));
  align-self: flex-end;
  background-color: #854d0e;
}
.elevatorUp {
  transform: translateY(-143px);
}
.active {
  background-color: red;
}
.inactive {
  background-color: aquamarine;
}
.elevator__floor {
  margin-top: 1em;
  margin-left: 2em;
  margin-right: 2em;
  padding: 0 1em;
  display: flex;
  background-color: #38bdf8;
}
.elevator__doors {
  margin-top: 2em;
}
</style>
