const data = [
  {
    id: 1
    , title: 'タイトルA'
    , type: 'text'
    , step: 1
    , row: 1
    , content: [
      {
        label: '作業者を記入'
        , next_id: 2
      }
    ]
  }
  , {
    id: 2
    , title: 'タイトルB'
    , type: 'radio'
    , step: 2
    , row: 1
    , content: [
      {
        label: '右の選択肢を選ぶ'
        , next_id: 3
      }
      , {
        label: '上の選択肢を選ぶ'
        , next_id: 4
      }
    ]
  }
  , {
    id: 3
    , title: 'タイトルC'
    , type: 'text'
    , step: 3
    , row: 1
    , content: [
      {
        label: '状況を記入'
        , next_id: 5
      }
    ]
  }
  , {
    id: 4
    , title: 'タイトルD'
    , type: 'text'
    , step: 3
    , row: 2
    , content: [
      {
        label: 'ランプの状態を記入'
        , next_id: 6
      }
    ]
  }
  , {
    id: 5
    , title: 'タイトルE'
    , type: 'text'
    , step: 4
    , row: 1
    , content: [
      {
        label: '現在の日時を記入'
        , next_id: 0
      }
    ]
  }
  , {
    id: 6
    , title: 'タイトルF'
    , type: 'text'
    , step: 4
    , row: 2
    , content: [
      {
        label: 'ダブルチェック者を記入'
        , next_id: 0
      }
    ]
  }
]

export default data;