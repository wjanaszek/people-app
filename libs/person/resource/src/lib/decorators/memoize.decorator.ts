import * as memoizee from 'memoizee';

export function Memoize() {
  return function(target, key, descriptor) {
    const oldFunction = descriptor.value;
    const newFunction = memoizee(oldFunction);
    descriptor.value = function() {
      return newFunction.apply(this, arguments);
    };
  };
}
