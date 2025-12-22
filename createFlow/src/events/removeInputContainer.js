// 削除イベント
const removeInputContainer = (target) => {
  const inputContainer = target.closest('.inputContainer');
  const inputId = parseInt(inputContainer.getAttribute('input_id'));
  managedData = managedData.filter(x => x.input_id !== inputId);

  const wrapper = target.closest('.viewerBody');
  const { scrollLeft, scrollTop } = wrapper;
  updateInputContainer(managedData);

  // スクロール位置を復元
  wrapper.scrollTo(scrollLeft, scrollTop);
}