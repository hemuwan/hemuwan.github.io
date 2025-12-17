const ref = (v) => {
  const fn = [];
  let val = v;
  return {
    get value() {
      return val;
    },
    set value(newValue) {
      val = newValue;
      fn.forEach(f => f(val));
    },
    effect: (f) => {
      f(val);
      fn.push(f);
      // return () => fn.filter(fn => fn !== f);
    }
  };
}