import { ref } from "vue";
export const callQueue = [];

export const callQueueActive = ref([]);
export class Elevator {
  id: number;
  floorPosition: { num: number };
  active: boolean;
  initialSeconds: number;
  timeMove: number;
  currentTimer: any;
  elevatorDirection: boolean;
  houseHeight: number;
  constructor(id: number) {
    this.id = id;
    this.floorPosition = { num: 1 };
    this.active = false;
    this.initialSeconds = 1;
    this.timeMove = 1;
    this.currentTimer = null;
    this.elevatorDirection = true;
    this.houseHeight = 1;
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
    console.log(this.timeMove);
    this.currentTimer = setTimeout(() => {
      this.currentTimer = null;

      if (this.houseHeight === this.floorPosition.num) {
        this.elevatorDirection = false;
      }
      if (this.floorPosition.num === 1) {
        this.elevatorDirection = true;
      }
      this.activated();
      console.log("Анимация прошла", task);
      callQueueActive.value = callQueueActive.value.filter(
        (item) => item !== task
      );
      localStorage.setItem("activeCall", JSON.stringify(callQueueActive.value));
    }, 1000 * (this.timeMove + 3));
  }
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
