if (!customElements.get('my-child')) { //return;
customElements.define('my-child', class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
  }

  async connectedCallback() {
    const texthtml = await fetch('/views/MyChild.html');
    this.shadowRoot.innerHTML = await texthtml.text();
    this.shadowRoot.querySelector('button').onclick = () => {
      alert();
    }
  }
})
}