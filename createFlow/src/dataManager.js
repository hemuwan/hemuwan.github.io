  // {
  //   input_id: 1
  //   , title: "フローの作成を開始する"
  //   , step: 1
  //   , type: "text"
  //   , name: "text_input"
  //   , content: [
  //     {
  //       display: "テキスト入力フィールド"
  //       , value: ""
  //       , next_input_id: 2
  //     }
  //   ]
  // },
const dataManager = (init) => {
    const data = Array.isArray(init) ? init : [];
    return {
      get value () {
        return data;
      },
      set value (val) {
        const found = data.find(x => x.input_id == val.input_id);
        if (found) {
          found.title = val.title;
          found.step = val.step;
          found.type = val.type;
          found.name = val.name;
          found.content = val.content;
        } else {
          // 見つからない-> 新規データ
          data.push({
            input_id: val.input_id
            , title: val.title
            , step: val.step
            , type: val.type
            , name: val.name
            , content: val.content
          });
        }
      }
    }
}