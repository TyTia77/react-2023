// test if object is inside box area
// object startX, startY, endX, endY
// selection startX, startY, endX, endY
export function selectionBox(
  selectStartX: number,
  selectStartY: number,
  selectEndX: number,
  selectEndY: number
) {
  return (
    objectStartX: number,
    objectStartY: number,
    objectEndX: number,
    objectEndY: number
  ) => {
    if (
      // within selection x
      (objectStartX >= selectStartX && objectStartX <= selectEndX) ||
      (objectEndX >= selectStartX && objectEndX <= selectEndX) ||
      // outside selection x
      (selectStartX >= objectStartX && selectEndX <= objectEndX)
    ) {
      if (
        // within selection y
        (objectStartY >= selectStartY && objectStartY <= selectEndY) ||
        (objectEndY >= selectStartY && objectEndY <= selectEndY) ||
        // outside selection y
        (selectStartY >= objectStartY && selectEndY <= objectEndY)
      ) {
        return true;
      }
    }
    return false;
  };
}
