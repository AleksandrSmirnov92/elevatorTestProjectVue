export function findClosestInactiveElement(
  arr: {
    id: number;
    floorPosition: { num: number };
    active: boolean;
    initialSeconds: number;
    timeMove: number;
    currentTimer: any;
    activeted: () => void;
  }[],
  number: number
) {
  let closestElement = null;
  let closestDifference = Infinity;
  for (const element of arr) {
    const difference = Math.abs(number - element.floorPosition.num);
    if (!element.active && difference < closestDifference) {
      closestElement = element;
      closestDifference = difference;
    }
  }
  return closestElement;
}
