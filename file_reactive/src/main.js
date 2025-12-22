
document.getElementById("app").append((() => {
  const { ref, create } = store.common;
  const {InputTime} = store.gear;

  const div = document.createElement("div");
  const count = ref(1);
  
  const count_2 = ref(1);
  const count_2_add = () => count_2.value++;
  
  const flg = ref(false);

  const hei = () => {
    count.value = count.value + 1;
    flg.value = !flg.value;
  }
  const hhh = () => console.log("hover");

  const TComp = ({hei = ""}) => {
    return create({
      template: (`
        <div>
          ${hei}
          <p>hei</p>
        </div>
      `)
    })
  }

  div.append(create({
    data: {
      count,
      count_2,
      flg
    },
    func: {
      hei,
      count_2_add,
      hhh
    },
    components: {
      InputTime,
      TComp
    },
    template: (`
      <div>
        <div a="a" bb="bb" c="vvv">
          {{ count }}
        </div>
        <TComp hei="属性で引数を渡す。">
          hei
        </TComp>
        <button
          onclick="hei"
          onmouseenter="hhh"
          :class="{hei: flg, ggg: flg}"
        >
          hei
        </button>
        <div>
          count is {{ count }} !
        </div>
        <InputTime
          :onclick="hei"
          prop="count_2"
          childtext="属性で引数を。。バインドはまだ対応していない"
        ></InputTime>
        <InputTime
          prop="count"
        >
          child text content {{count_2}} !!
        </InputTime>
        <div>
          count_2 : {{ count_2 }}
        </div>
        <button onclick="count_2_add">count_2 add</button>
        <p>heihei</p>
      </div>
    `)
  }));
  div.append(InputTime({prop:count}));
  return div;
})());