const parseDOM = (texthtml) => new DOMParser()
  .parseFromString(texthtml, "text/html")
  .body.innerHTML.split('\n')
  .map(x => x.trim())
  .join('');