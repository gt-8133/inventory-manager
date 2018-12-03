// @ts-ignore
// @ts-nocheck
/* tslint:disable */
// /* eslint-disable no-var, comma-dangle */
// var Reflect; // eslint-disable-line no-unused-vars
// var idObj;

// function checkIsNodeV6OrAbove() {
//   if (typeof process === 'undefined') {
//     return false;
//   }

//   return true

//   // return parseInt(process.versions.node.split('.')[0], 10) >= 6;
// }

// if (!checkIsNodeV6OrAbove()) {
//   Reflect = require('harmony-reflect'); // eslint-disable-line global-require
// }

// idObj = new Proxy({}, {
//   get: function getter(target, key) {
//     if (key === '__esModule') {
//       return false;
//     }
//     return ()=>{};
//   }
// });

// Object.defineProperty(module, 'exports', idObj)

// // module.exports = idObj;

import models from './models'
export const fake = () =>
  Object.keys(models).forEach(key => {
    console.log('replaced:', key)
    Object.defineProperty(models, key, () => {
      console.log("foooo");
    });
  });
