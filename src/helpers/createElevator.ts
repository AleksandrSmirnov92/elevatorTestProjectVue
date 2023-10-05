export const callQueue: number[] = [];
export class Elevator {
  id: number;
  floorPosition: number;
  active: boolean;
  initialSeconds: number;
  timeMove: number;
  currentTimer: any;
  elevatorDirection: boolean | null;
  numberOfFloors: number;
  constructor(id: number) {
    this.id = id;
    this.floorPosition = 1;
    this.active = false;
    this.initialSeconds = 1;
    this.timeMove = 1;
    this.currentTimer = null;
    this.elevatorDirection = true;
    this.numberOfFloors = 1;
  }
  activated(floorNumber?: number | null, floorsCount?: number | null) {
    this.active = true;
    if (this.currentTimer) {
      return;
    }
    const task = callQueue.shift();
    if (task == null) {
      this.active = false;
      return;
    }
    this.numberOfFloors = task ?? 1;
    this.floorPosition = floorNumber ? floorNumber : task;
    this.timeMove = elevatorMotionHandler(task, this.initialSeconds)
      ? task - this.initialSeconds
      : this.initialSeconds - task;
    this.elevatorDirection = elevatorMotionHandler(task, this.initialSeconds);
    this.initialSeconds = task;
    this.currentTimer = setTimeout(() => {
      this.currentTimer = null;
      // console.log(this.elevatorDirection);
      // this.elevatorDirection =
      //   arrowDirection(task, this.numberOfFloors) ?? this.elevatorDirection;
      this.activated();
      console.log("Анимация прошла", task);
    }, 1000 * (this.timeMove + 3));
  }
}
export function elevatorMotionHandler(
  currentSeconds: number,
  initialSeconds: number
): boolean | null {
  let result = null;
  if (initialSeconds < currentSeconds) {
    result = true;
  }
  if (initialSeconds > currentSeconds) {
    result = false;
  }
  return result;
}
function arrowDirection(floorPosition: number, numberOfFloors: number) {
  let result = null;
  if (floorPosition === numberOfFloors) {
    return (result = false);
  } else if (floorPosition === 1) {
    return (result = true);
  } else {
    return result;
  }
}
