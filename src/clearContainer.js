const clearContainer = (container) => {
  const parentToClear = document.querySelector(container);
  const childsCount = parentToClear.childNodes.length;
  for (let i = childsCount; i > 0; i -= 1) {
    parentToClear.removeChild(parentToClear.childNodes[i - 1]);
  }
};

export default clearContainer;
