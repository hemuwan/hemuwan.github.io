// カレンダー用のデータを作成
// 一周目には前月の日付、最終週には翌月の日付も含まれる
const createCalenderData = (year, month) => {
  const fullYear = year || new Date().getFullYear();
  const monthNum = month || new Date().getMonth();
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const day_MS = 24 * 60 * 60 * 1000;
  const currentMonthFirstDay_MS = new Date(fullYear, monthNum, 1).getTime(); // 該当月初めのミリ秒
  const startDay_MS = currentMonthFirstDay_MS - (new Date(fullYear, monthNum, 1).getDay() * day_MS); // カレンダーの開始日のミリ秒
  const itelateNum = weekdays.length * 5; // 5週間分
  const data = Array.from({ length: itelateNum }, (_, i) => {
    const targetDate = new Date(startDay_MS + (i * day_MS));
    return {
      year: targetDate.getFullYear()
      , month: targetDate.getMonth() + 1
      , day: targetDate.getDate()
      , weekday: weekdays[targetDate.getDay()]
      , weekNum: targetDate.getDay()
      , isCurrentMonth: targetDate.getMonth() === monthNum
      , isToDay: (
        targetDate.getFullYear() === new Date().getFullYear()
        && targetDate.getMonth() === new Date().getMonth()
        && targetDate.getDate() === new Date().getDate()
      )
    };
  });
  return data;
}