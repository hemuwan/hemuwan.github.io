const createInnerHtml = (htmltext) => new DOMParser()
  .parseFromString(htmltext, "text/html")
  .body.innerHTML.split('\n')
  .map(line => line.trim())
  .join('');

export default createInnerHtml;