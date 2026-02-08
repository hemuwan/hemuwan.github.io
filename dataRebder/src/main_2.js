// gpt から vue のようにバニラで書きたいと
// v-for のなかの小要素で、ref.value = するのはあまりよくない
// 親からupdate 関数をもらってそれを呼ぶ。状態は親だけが持つ

let store = [1,2,3];

// 子コンポーネント
// store は渡さず、操作関数だけ渡す
const Item = ({ value, setStore }) => {
  const button = document.createElement('button');
  button.textContent = `change ${value}`;

  button.onclick = () => setStore();

  return button;
}

const render = () => {

  const app = document.getElementById('app');

  const setStore = (val) => {
    store.push(store.length + 1);
    render();
  }

  app.innerHTML = '';

  store.forEach(value => {
    const item = Item({ value, setStore });
    app.append(item);
  });
}


function updateItem(index, newValue) {
  store = store.map((v, i) => i === index ? newValue : v);
  render(store);
}

render()