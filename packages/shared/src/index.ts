// export function isObject(target) {
//     return typeof target === 'object' && target !== null;
// }


export const isObject = (target) => {
    return typeof target === 'object' && target !== null;
};

export const extend = Object.assign

export const isArray = Array.isArray;
export const isFunction = (val) => typeof val === 'function';
export const isString = (val) => typeof val === 'string';
export const isNumber = (val) => typeof val === 'number';
//判断对象中是否存在某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val, key) => hasOwnProperty.call(val, key);
export const isIntegerKey = (key) =>
  isString(key) &&
  key !== 'NaN' &&
  key[0] !== '-' &&
  '' + parseInt(key, 10) === key
export const hasChange = (value,oldValue)=> value != oldValue

//导出组件标识
export * from './patchFlags'