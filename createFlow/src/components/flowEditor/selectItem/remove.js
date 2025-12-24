const removeSelectItem = (target) => {
  const selectItem = target.closest('.selectItem');
  selectItem.remove();
}