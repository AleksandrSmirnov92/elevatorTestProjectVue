import { ref } from "vue";
import { Elevator, valueFromLocalStorage } from "../helpers/createElevator";
export const callQueue: number[] = [];
export const callQueueActive = ref<Number[]>([]);
export const buildingInfo = ref({
  shaftCount: [
    new Elevator(
      1,
      valueFromLocalStorage(JSON.parse(localStorage.getItem("shaftCount")!), 1)
    ),
    new Elevator(
      2,
      valueFromLocalStorage(JSON.parse(localStorage.getItem("shaftCount")!), 2)
    ),
    new Elevator(
      3,
      valueFromLocalStorage(JSON.parse(localStorage.getItem("shaftCount")!), 3)
    ),
    new Elevator(
      4,
      valueFromLocalStorage(JSON.parse(localStorage.getItem("shaftCount")!), 4)
    ),
  ],
  floorsCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
});
