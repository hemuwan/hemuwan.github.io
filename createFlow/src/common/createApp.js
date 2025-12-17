const bindEvents = (dom, events) => {
  
}

const createApp = ({htmltext, events}) => {
  let dom = new DOMParser().parseFromString(htmltext, "text/html")
  dom = dom.body.firstChild;
  dom.innerHTML = dom.innerHTML.split('\n')
    .map(line => line.trim())
    .join('');
  dom = bindEvents(dom, events);
  return dom;
}