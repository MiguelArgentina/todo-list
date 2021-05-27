const clearContainer = (container) => {
  const parentToClear = document.querySelector(container);
  const childsCount = parentToClear.childNodes.length;
  console.log(childsCount);
  for (let i = childsCount; i > 0; i -= 1) {
    console.log(`i=${i}`);
    parentToClear.removeChild(parentToClear.childNodes[i - 1]);
  }
};

export default clearContainer;
