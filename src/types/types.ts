export interface ElevatorType {
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
}
