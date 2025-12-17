store.gear.InputTime = ({prop = "", childtext = ""}) => {
  const {ref, create} = store.common;
  const text = ref("");
  const changetext = (e) => text.value = e.target.value;

  return create({
    data: {text, prop},
    func: {changetext},
    template: `
      <div>
        <p>${childtext}</p>
        <p>{{ text }}</p>
        <input type="text" oninput="changetext" />
        <p>count on : {{prop}}
      </div>
    `
  });
}