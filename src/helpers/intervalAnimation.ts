export const intervalAnimation = (timeMove: { value: number }) => {
  let toggleClass = false;
  setTimeout(() => {
    const stop = setInterval(() => {
      return (toggleClass = !toggleClass);
    }, 500);
    setTimeout(() => {
      clearInterval(stop);
      return (toggleClass = false);
    }, 3000);
  }, 1000 * timeMove.value);
};
