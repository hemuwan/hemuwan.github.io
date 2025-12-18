
// 線と矢印の描画
const createSvg = (name, config) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.entries(config || {}).forEach(([key, value]) => svg.setAttribute(key, value));
  return svg;
}

const updatePath = (data) => {
  // 描画領域を取得
  const [parent] = document.getElementsByClassName('viewerBody');
  const [pathmap] = parent.getElementsByClassName('pathmap');

  // pathmap内の既存の線をすべて削除
  pathmap.innerHTML = '';

  // 計算のためpathの高さを取得
  const stepHalfHeight = parent.getElementsByClassName('inputContainer')[0].offsetHeight / 2;

  const parentRect = parent.getBoundingClientRect();
  const { scrollTop, scrollLeft } = parent;

  const stepList = [...new Set(data.map(x => x.step))].sort();
  stepList.forEach((stepNum, i) => {
    const nextStepNum = stepList[i + 1];
    const overStepContainers = [...parent.getElementsByClassName('stepContainer')]
      .filter(x => x.getAttribute('step') > stepNum);

    const currentInputs = data.filter(x => x.input_id == stepNum);
    currentInputs.forEach(inputData => {
      const inputContainer = parent.querySelector(`.inputContainer[input_id="${inputData.input_id}"]`);
      const rect = inputContainer.getBoundingClientRect();
      const start = {
        x: rect.left + rect.width / 2 - parentRect.left + scrollLeft
        , y: rect.bottom - parentRect.top + scrollTop
      };
      const control = {
        y: start.y + stepHalfHeight - 20
      };

      const svgColor = {
        primary: 'blue'
        , primary_light: '#add8e6'
      };

      // 開始地点の丸を描画
      pathmap.append(createSvg('circle', {
        'cx': start.x
        , 'cy': start.y
        , 'r': 5
        , 'fill': svgColor.primary
        , 'stroke': svgColor.primary_light
        , 'stroke-width': 2
      }));

      // next_input_id ごとに線を引く
      inputData.content?.map(x => x.next_input_id).forEach(next_input_id => {
        const next_input_data = data.find(x => x.input_id == next_input_id);
        if (!next_input_data) return;

        const pathColor = svgColor.primary;

        const target = parent.querySelector(`.inputContainer[input_id="${next_input_id}"]`);
        const targetRect = target.getBoundingClientRect();
        const end = {
          x: targetRect.left + targetRect.width / 2 - parentRect.left + scrollLeft
          , y: targetRect.top - 5 - parentRect.top + scrollTop
        };

        // パスの定義
        let d = []
        if (nextStepNum == next_input_data.step) {
          d = [
            'M'
            , start.x, start.y
            , 'C'
            , start.x, control.y
            , end.x, control.y
            , end.x, end.y
          ];
        } else {
          // 段飛ばし
          // 以降のコンテナのうち、対象のステップより手前のコンテナを取得
          const between = overStepContainers.filter(x => x.getAttribute('step') < next_input_data.step);
          // 最終inputのrightを取得、一番大きいものを使う。
          const maxWidth = Math.max(...between.map(stepContainer => {
            const lastInputContainer = [...stepContainer.getElementsByClassName('inputContainer')].at(-1);
            const lastRect = lastInputContainer.getBoundingClientRect();
            return lastRect.right;
          }));

          const over = {
            x: maxWidth + 20 - parentRect.left + scrollLeft
            , y: end.y - stepHalfHeight
          }

          d = [
            'M'
            , start.x, start.y
            , 'C'
            , start.x, control.y
            , over.x - 20, control.y - 20
            , over.x, control.y
            , 'V'
            , over.y
            , 'C'
            , over.x, end.y - stepHalfHeight
            , end.x, end.y - stepHalfHeight
            , end.y, end.y
          ];
        }

        // パスの作成と属性設定

        const path = createSvg('path', {
          'd': d.join(' ')
          , 'stroke': pathColor
          , 'fill': 'none'
        });

        // 矢印部分のパス定義
        const arrow = createSvg('path', {
          'd': [
            'M'
            , end.x, end.y
            , 'L'
            , end.x - 15, end.y - 10
            , 'H'
            , end.x + 15
            , 'Z'
          ].join(' ')
          , 'stroke': pathColor
          , 'fill': pathColor
        });

        pathmap.append(path, arrow);
      });
    });
  });
}