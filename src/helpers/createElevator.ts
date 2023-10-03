export const callQueue: number[] = [];
export class Elevator {
  id: number;
  floorPosition: number;
  active: boolean;
  initialSeconds: number;
  timeMove: number;
  currentTimer: any;
  constructor(id: number) {
    this.id = id;
    this.floorPosition = 1;
    this.active = false;
    this.initialSeconds = 1;
    this.timeMove = 1;
    this.currentTimer = null;
  }
  activated(floorNumber?: number | null) {
    this.active = true;
    if (this.currentTimer) {
      return;
    }
    const task = callQueue.shift();
    if (task == null) {
      this.active = false;
      return;
    }
    this.floorPosition = floorNumber ? floorNumber : task;
    this.timeMove = elevatorMotionHandler(
      task,
      this.initialSeconds,
      this.timeMove
    );
    this.initialSeconds = task;
    this.currentTimer = setTimeout(() => {
      this.currentTimer = null;
      this.activated();
      console.log("Анимация прошла", task);
    }, 1000 * (this.timeMove + 3));
  }
}
function elevatorMotionHandler(
  currentSeconds: number,
  initialSeconds: number,
  timeMove: number
) {
  if (initialSeconds < currentSeconds) {
    timeMove = currentSeconds - initialSeconds;
  }
  if (initialSeconds > currentSeconds) {
    timeMove = initialSeconds - currentSeconds;
  }

  return timeMove;
}
