// <!-- <td id="backlog">backlog</td>
// <!-- priority　優先度は並び順がそのままそう、後で動かせるように -->
const taskListData = [
	{
		title: "要件整理",
		status: "todo",
		plannedStart: "2026/07/14",
		plannedHours: "8",
		actualStart: "",
		actualEnd: "",
		assignee: "佐藤",
		dueDate: "2026/07/18",
		progress: 0,
		description: "要件を整理して仕様をまとめる"
	},
	{
		title: "画面レイアウト作成",
		status: "doing",
		plannedStart: "2026/07/15",
		plannedHours: "12",
		actualStart: "2026/07/15",
		actualEnd: "",
		assignee: "鈴木",
		dueDate: "2026/07/22",
		progress: 35,
		description: "タスク一覧画面のUIを作成する"
	},
	{
		title: "ログインAPI実装",
		status: "doing",
		plannedStart: "2026/07/16",
		plannedHours: "16",
		actualStart: "2026/07/16",
		actualEnd: "",
		assignee: "田中",
		dueDate: "2026/07/25",
		progress: 60,
		description: "JWT認証を実装する"
	},
	{
		title: "ガントチャート作成",
		status: "review",
		plannedStart: "2026/07/10",
		plannedHours: "20",
		actualStart: "2026/07/10",
		actualEnd: "",
		assignee: "高橋",
		dueDate: "2026/07/20",
		progress: 90,
		description: "CSSのみでガントチャートを実装する"
	},
	{
		title: "バグ修正",
		status: "done",
		plannedStart: "2026/07/05",
		plannedHours: "5",
		actualStart: "2026/07/05",
		actualEnd: "2026/07/06",
		assignee: "山田",
		dueDate: "2026/07/06",
		progress: 100,
		description: "一覧画面の表示崩れを修正"
	},
	{
		title: "単体テスト作成",
		status: "todo",
		plannedStart: "2026/07/20",
		plannedHours: "10",
		actualStart: "",
		actualEnd: "",
		assignee: "伊藤",
		dueDate: "2026/07/28",
		progress: 0,
		description: "主要機能のテストケースを追加"
	},
	{
		title: "Socket.IO接続確認",
		status: "doing",
		plannedStart: "2026/07/12",
		plannedHours: "6",
		actualStart: "2026/07/12",
		actualEnd: "",
		assignee: "中村",
		dueDate: "2026/07/17",
		progress: 75,
		description: "WebSocket通信の動作確認"
	},
	{
		title: "Redis連携検証",
		status: "review",
		plannedStart: "2026/07/08",
		plannedHours: "14",
		actualStart: "2026/07/08",
		actualEnd: "",
		assignee: "小林",
		dueDate: "2026/07/19",
		progress: 95,
		description: "Socket.IOアダプタとの連携を確認"
	},
	{
		title: "README整備",
		status: "done",
		plannedStart: "2026/07/01",
		plannedHours: "4",
		actualStart: "2026/07/01",
		actualEnd: "2026/07/01",
		assignee: "加藤",
		dueDate: "2026/07/01",
		progress: 100,
		description: "セットアップ手順を追記"
	},
	{
		title: "リリース準備",
		status: "todo",
		plannedStart: "2026/07/30",
		plannedHours: "18",
		actualStart: "",
		actualEnd: "",
		assignee: "渡辺",
		dueDate: "2026/08/05",
		progress: 0,
		description: "リリースチェックリストを作成する"
	}
];