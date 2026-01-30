const dom = (text) => new DOMParser().parseFromString(text, 'text/html').body.firstElementChild;
export default dom;
