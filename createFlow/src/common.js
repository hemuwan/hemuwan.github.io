const parseDOM = (texthtml) => new DOMParser()
  .parseFromString(texthtml, "text/html")
  .body.innerHTML.split('\n')
  .map(x => x.trim())
  .join('');

const setSingleInput = ({input_id, type, content: [{display, value, next_input_id}]}) => parseDOM(`
  <fieldset class="innerFieldset">
    <legend>${display}</legend>
    <input
      type="${type}"
      input_id="${input_id}"
      value="${value}"
      next_input_id="${next_input_id}"
    />
  </fieldset>
`);

const setListInput = ({input_id, type, name, content}) => parseDOM( type === 'select'
  ? `
    <select name="${name}">
      ${content.map(x => `
        <option
          value="${x.value}"
          input_id="${input_id}"
          next_input_id=${x.next_input_id}
        >
          ${x.display}
        </option>
      `).join('')}
    </select>
  `
  : content.map(({display, value, next_input_id}) => `
    <label>
      <input
        type="${type}"
        input_id="${input_id}"
        name="${name}"
        value="${value}"
        next_input_id="${next_input_id}"
      />
      ${display}
    </label>
  `).join('')
);

const setInputContainer = (inputData) => parseDOM(`
  <div
    class="inputContainer"
    input_id="${inputData.input_id}"
    step="${inputData.step}"
  >
    <fieldset>
      <legend>${inputData.title}</legend>
      ${inputData.type === 'text' ? setSingleInput(inputData) : setListInput(inputData)}
    </fieldset>
  </div>
`);