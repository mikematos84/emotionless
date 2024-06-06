/**
 * Converts pixel size to rem and accepts the base as second argument. default base is 16px
 *
 * @param {number|string} px
 * @param {number} base
 * @return {string}
 */
const toRemValue = (px, base = 16) => {
  let tempPx = px;
  if (typeof px === 'string' || px instanceof String)
    tempPx = tempPx.replace('px', '');

  tempPx = parseInt(tempPx, 10);
  return `${(1 / base) * tempPx}rem`;
};

export default toRemValue;
