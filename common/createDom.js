const createDom = (htmltext) => {
  const dom = new DOMParser().parseFromString(htmltext, "text/html")
  dom.innerHTML = dom.body.innerHTML.split('\n')
    .map(line => line.trim())
    .join('');
  return dom.body.firstChild;
}

export default createDom;