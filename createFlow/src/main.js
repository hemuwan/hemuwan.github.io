// wrapper, pathmap の配置
document.getElementById('flow').append((() => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('pathmap');
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  wrapper.append(svg);
  return wrapper;
})());

// dataManager 生成、状態管理
// const managedData = dataManager([]);
const managedData = dataManager(sampleData);

updateInputContainer(managedData);
window.addEventListener('resize', () => updatePath(managedData.value));