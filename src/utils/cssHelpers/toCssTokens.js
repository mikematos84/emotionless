/* eslint-disable no-restricted-syntax */
const toCssTokens = (obj = {}, res = {}, prefix = '--') => {
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (typeof obj[key] !== 'object') {
      res[prefix + key] = obj[key];
    } else {
      toCssTokens(obj[key], res, `${prefix}${key}-`);
    }
  }
  return res;
};

export default toCssTokens;
