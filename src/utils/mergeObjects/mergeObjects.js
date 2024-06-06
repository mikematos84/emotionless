/**
 * Merges to objects into one, overwritting key value pairs if
 * a key from objB is found in objA
 *
 * @param {object} objA
 * @param {object} objB
 * @returns {object}
 */

const mergeObjects = (objA, objB) => {
  const result = {};

  Object.keys({ ...objA, ...objB }).forEach(key => {
    result[key] = objB[key] || objA[key];
  });

  return result;
};

export default mergeObjects;
