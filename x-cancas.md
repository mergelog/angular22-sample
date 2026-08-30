TODO: feature/sample/pages/a-sample に移動する
      ng コマンド使って コンポーネント作成する
TODO:
- 表示、ボタン操作、セレクト、チェックボックス
- effect、その他の標準あるある

TODO: Signalを使用して理解する

---

RxDBは不要

---

/Users/yasu/work/mergelog/angular22-sample/90_samples/src/app/feature/p00-ngrx/novice

共通カードコンポーネントを作って
それを継承した、
・カード追加ボタンUIがあるカード
・カード名を変更できるカード
の二つを配置する

カード追加をクリックすると画面にカードが追加される

状態管理は、
/Users/yasu/work/mergelog/angular22-sample/90_samples/src/app/feature/p00-ngrx/store
に P00.novice.store.ts を作成し、その位置ファイルに状態管理を記載する

Classicな @ngrx/store を使う。createFeature() も createReducer() も使わず、昔ながらの「普通のReducer関数」を自分で書けばStoreを作れます。NgRxの本質としてはReducer自体は必要ですが、createReducer() という補助APIを使う必要はありません。公式ドキュメントでも、Reducerは「現在のstateとactionを受け取り、新しいstateを返す純粋関数」とされている

