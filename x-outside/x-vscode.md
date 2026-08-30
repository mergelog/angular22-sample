コマンドパレット（Cmd+Shift+P）で Claude Code: Open in Side Bar を実行。これだけで claudeCode.preferredLocation が sidebar に自動更新されます。

あとは Cmd+Opt+B で開け閉め。ただし Codex と同居するので「最後に開いた方」が出ます。Claude を名指しで開くキーが欲しければ、keybindings.json にこれを追加します:


{
  "key": "cmd+alt+c",
  "command": "workbench.view.extension.claude-sidebar-secondary"
}
このキーバインドの追加、やっておきましょうか？（~/Library/Application Support/Code/User/keybindings.json への追記になります）



