---
id: third-party-credits
title: サードパーティの表記
sidebar_position: 92
---

# サードパーティの表記

**このページを読むと** この製品に他所のコードが含まれているかどうか、そして参照したアルゴリズムの出典がわかります。

## 含まれているサードパーティのコード

**ありません。**

Easy Mesh Editor `1.0.0` パッケージには、外部ライブラリ、オープンソースのコード、サードパーティの告知ファイルは含まれていません。配布されるのは次のとおりです。

- `Editor/EasyMeshEditor.Editor.dll`: Studio Raming が作成したコード（難読化されたビルド）
- `Editor/Shaders/EmeOverlay.shader` · `Editor/Shaders/EmeSceneGL.shader`: Studio Raming が作成した、シーンビューの表示用のシェーダー
- エディターのアイコン画像（PNG ファイル）
- `README.md`

<!-- CONFIRM: the package file list is checked against the dry-run package (no third-party notice file, no license strings in the EME sources). Whether the obfuscated DLL contains third-party code is not verified (S1). -->

Unity エンジンの API は Unity Technologies のものであり、この製品に再配布されません。

## アルゴリズムの参照

`形を整える` タブの `引っぱる (1)` ブラシは、下の論文の変形モデルに基づいています。コードを取り込んだわけではなく、公開されている数式を参照して独自に実装しているため、ライセンス上の義務ではなく**出典の表記**です。

> Fernando de Goes, Doug L. James. *Regularized Kelvinlets: Sculpting Brushes based on Fundamental Solutions of Elasticity.* ACM Transactions on Graphics (SIGGRAPH), 2017.

ウィンドウの説明が示す動作は、ここから来ています。正規化 Kelvinlet と C2 のソフトテールにより、境界で途切れずに広がります。→ [形を整える](/guides/sculpt#엘라스틱)

## この製品のライセンス

同梱の DLL、シェーダー、アセットファイルの再配布、再販売、流出は禁止されています。

お問い合わせ: `studioraming@gmail.com`
