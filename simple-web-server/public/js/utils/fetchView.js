const fetchView = async (componentName) => {
  try {
    const {path} = location;
    const response = await fetch(path + '/views/' + componentName + '.html');
    const htmltext = await response.text();
    const parsed = new DOMParser().parseFromString(htmltext, 'text/html');
    const first = parsed.head.firstElementChild.content.cloneNode(true);
    const style = first.querySelector('style');
    if (style && !document.head.querySelector(`style[data-style="${componentName}"]`)) {
      style.setAttribute('data-style', componentName);
      document.head.append(style); // 移動する
    } else if (style) {
      style.remove();
    }
    const dom = first.querySelector('.' + componentName);
    dom.classList.add(componentName);
    dom.innerHTML = dom.innerHTML
    .replace(/\n/g, '  ')
    .replace(/  +/g, '');
    return dom;
  } catch (e) {
    console.log(e);
    return '';
  }
}

export default fetchView;