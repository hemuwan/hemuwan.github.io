store.common.ref = (v) => {
  let val = v;
  let fn = [];
  return {
    get value() {
      return val;
    },
    set value(newVal) {
      val = newVal;
      fn.forEach(x => x());
    },
    get effect() {
      return fn;
    },
    set effect(f) {
      f();
      fn.push(f);
    }
  }
}