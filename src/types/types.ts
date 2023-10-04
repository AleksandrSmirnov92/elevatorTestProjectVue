export default interface ElevatorType {
  id: number;
  floorPosition: number;
  active: boolean;
  initialSeconds: number;
  timeMove: number;
  currentTimer: any;
  activated: (floorNumber?: number | null) => void;
}
