const addSelectItem = (target, data) => {
  const hidden = target.querySelector('input[type="hidden"]');
  const inputId = parseInt(hidden.value);
  const inputData = data.find(x => x.input_id === inputId);
  if (!inputData) return null;

  // inputData より step より大きい step を持つデータを取得
  const overStepData = data
    .filter(x => x.step > inputData.step)
    .sort((a, b) => a.step - b.step);

  const stepList = [...new Set(overStepData.map(x => x.step))].sort();

  const selectData = stepList.map(stepNum => {
    const stepInputs = overStepData.filter(x => x.step === stepNum);
    return parseDOM(`
      <optgroup label="ステップ${stepNum}">
        ${stepInputs.map(inputData => `
          <option value="${inputData.input_id}">
            ${inputData.title}
          </option>
        `).join('')}
      </optgroup>
    `);
  }).join('');

  const [selectItemWrapper] = document.getElementsByClassName('selectItemWrapper');

  selectItemWrapper.innerHTML += parseDOM(`                  
    <div class="selectItem">
      <div class="itemContent">
        <div class="itemTitle">
          <div>
            表示テキスト
          </div>
          <input type="text">
        </div>
        <div class="itemSelect">
          <div>
            次の選択肢
          </div>
          <select>
            <optgroup>
              <option value="">終了</option>
            </optgroup>
            ${selectData}
          </select>
        </div>
      </div>
      <div class="removeSelectItemBtn">
        <div>
          ✕
        </div>
      </div>
    </div>
  `);
}