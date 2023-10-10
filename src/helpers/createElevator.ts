import { callQueue, callQueueActive } from "../store/index";
import { ElevatorType } from "../types/types";
export class Elevator {
  id: number;
  floorPosition: { num: number };
  active: boolean;
  initialSeconds: number;
  timeMove: number;
  currentTimer: any;
  elevatorDirection: boolean;
  houseHeight: number;
  translateY: number;
  translateX: number;

  constructor(id: number, localStorage?: ElevatorType | null) {
    this.id = id;
    this.floorPosition = localStorage
      ? localStorage.floorPosition
      : {
          num: 1,
        };
    this.active = localStorage ? localStorage.active : false;
    this.initialSeconds = localStorage ? localStorage.initialSeconds : 1;
    this.timeMove = localStorage ? localStorage.timeMove : 1;
    this.currentTimer = localStorage ? localStorage.currentTimer : null;
    this.elevatorDirection = localStorage
      ? localStorage.elevatorDirection
      : true;
    this.houseHeight = localStorage ? localStorage.houseHeight : 1;
    this.translateY = localStorage ? localStorage.translateY : 0;
    this.translateX = 0;
  }
  activated(floorNumber?: number | null, cFloors?: number) {
    this.active = true;
    if (this.currentTimer) {
      return;
    }

    const task = callQueue.shift();

    if (task == null) {
      this.active = false;
      return;
    }
    this.houseHeight = cFloors ?? this.houseHeight;
    this.floorPosition = floorNumber ? { num: floorNumber } : { num: task };
    this.elevatorDirection = elevatorMotionHandler(task, this.initialSeconds);
    this.timeMove = elevatorMotionHandler(task, this.initialSeconds)
      ? task - this.initialSeconds
      : this.initialSeconds - task;
    this.initialSeconds = task;
    this.currentTimer = setTimeout(() => {
      this.currentTimer = null;
      this.elevatorDirection =
        floorPosition(this.houseHeight, this.floorPosition.num) ??
        this.elevatorDirection;
      this.activated();
      console.log("Анимация прошла", task);
      callQueueActive.value = callQueueActive.value.filter(
        (item) => item !== task
      );
    }, 1000 * (this.timeMove + 3));
  }
}
export function floorPosition(houseHeight: number, floorPosition: number) {
  let result = null;
  if (houseHeight === floorPosition) {
    result = false;
  }
  if (floorPosition === 1) {
    result = true;
  }
  return result;
}
export function elevatorMotionHandler(
  currentSeconds: number,
  initialSeconds: number
): boolean {
  if (initialSeconds > currentSeconds) {
    return false;
  }
  return true;
}
export function valueFromLocalStorage(storage: ElevatorType[], id: number) {
  if (storage) {
    let obj = storage.find((item) => item.id === id);
    return obj;
  }
  return null;
}
