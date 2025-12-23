const addInputContainer = (target) => {
   // addInputContainerBtn がクリックされた場合
  const stepContainer = target.closest('.stepContainer');
  const step = parseInt(stepContainer.getAttribute('step'));
  const newInputId = Math.max(...managedData.map(x => x.input_id)) + 1;
  const newInputData = {
    input_id: newInputId
    , step: step
    , title: 'New Input'
    , type: 'text'
    , content: [
      {
        display: 'New Input'
        , value: ''
        , next_input_id: ''
      }
    ]
  };
  
  const wrapper = target.closest('.viewerBody');
  const { scrollLeft, scrollTop } = wrapper;

  managedData.push(newInputData);
  updateInputContainer(managedData);

  // スクロール位置を復元
  wrapper.scrollTo(scrollLeft, scrollTop);
};