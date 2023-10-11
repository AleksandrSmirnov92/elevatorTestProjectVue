import { Elevator } from "../helpers/createElevator";
export function findClosestInactiveElement(arr: Elevator[], number: number) {
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
