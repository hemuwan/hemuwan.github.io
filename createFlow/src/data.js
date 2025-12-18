const sampleData = [
  {
    input_id: 1
    , title: "フローの作成を開始する"
    , step: 1
    , col_num: 1
    , type: "text"
    , name: "text_input"
    , content: [
      {
        display: "テキスト入力フィールド"
        , value: ""
        , next_input_id: 2
      }
    ]
  },
  {
    input_id: 2
    , title: "選択肢を選んでください"
    , step: 2
    , col_num: 1
    , type: "radio"
    , name: "radio_input"
    , content: [
      {
        display: "選択肢A"
        , value: "A"
        , next_input_id: 3
      },
      {
        display: "選択肢B"
        , value: "B"
        , next_input_id: 4
      }
    ]
  },
  {
    input_id: 3
    , title: "選択肢Aが選ばれました"
    , step: 3
    , col_num: 1
    , type: "checkbox"
    , name: "checkbox_input"
    , content: [
      {
        display: "チェックボックス1"
        , value: "1"
        , next_input_id: null
      },
      {
        display: "チェックボックス2"
        , value: "2"
        , next_input_id: null
      }
    ]
  },
  {
    input_id: 4
    , title: "選択肢Bが選ばれました"
    , step: 3
    , col_num: 2
    , type: "select"
    , name: "select_input"
    , content: [
      {
        display: "セレクトオプション1"
        , value: "option1"
        , next_input_id: null
      },
      {
        display: "セレクトオプション2"
        , value: "option2"
        , next_input_id: null
      }
    ]
  }
]