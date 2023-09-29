export const currentElevator = (
  currentFloor: number,
  shafts: { id: number; floorPosition: number }[]
) => {
  let shaftsInclude = shafts.filter((item) => item.floorPosition !== 1);
  let intialFloor = shafts[0];
  if (shaftsInclude.length < 1) {
    intialFloor.floorPosition = currentFloor;
    return intialFloor;
  }
  for (let i = 1; i < shafts.length; i++) {
    if (
      currentFloor - shafts[i].floorPosition <
      shafts[i - 1].floorPosition - currentFloor
    ) {
      return (shafts[i].floorPosition = currentFloor);
    } else {
      return (shafts[i - 1].floorPosition = currentFloor);
    }
  }
};
