// export default class MyElement extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//   }

//   async connectedCallback() {
//     const texthtml = await fetch('/views/MyElement.html');
//     this.shadowRoot.innerHTML = await texthtml.text();
//     this.shadowRoot.onclick = () => {
//       this.hei('Button clicked!');
//     }
//   }

//   disconnectedCallback() {
//     console.log('MyElement removed from page.');
//     this.remove();
//   }

//   hei(data) {
//     console.log(data);
//   }
// }

// import を実行した時点で以下も実行される。
// ２重登録はエラーになるので回避
if (!customElements.get('my-element')) {
  // customElements.define('my-element', MyElement);
  // 無名関数
  customElements.define('my-element',  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
      const texthtml = await fetch('/views/MyElement.html');
      this.shadowRoot.innerHTML = await texthtml.text();
      this.shadowRoot.onclick = () => {
        this.hei('Button clicked!');
      }
      this.shadowRoot.querySelector('button').onclick = () => {
        const sidebar = document.querySelector('.Sidebar');
        sidebar.classList.toggle('close');
      }
    }

    disconnectedCallback() {
      console.log('MyElement removed from page.');
      this.remove();
    }

    hei(data) {
      console.log(data);
    }
  });
}