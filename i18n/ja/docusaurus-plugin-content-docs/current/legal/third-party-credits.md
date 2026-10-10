---
id: third-party-credits
title: サードパーティの表記
sidebar_position: 92
---

# サードパーティの表記

**このページを読むと** パッケージの内容と、参照したアルゴリズムの出典がわかります。

## パッケージの内容

Easy Mesh Editor `1.0.0` パッケージには次のものが入っています。

- `Editor/EasyMeshEditor.Editor.dll`（難読化されたビルド）
- `Editor/Shaders/EmeOverlay.shader` · `Editor/Shaders/EmeSceneGL.shader`: シーンビューの表示用のシェーダー
- エディターのアイコン画像（PNG ファイル）
- `README.md`

Unity エンジンの API は Unity Technologies のものであり、この製品に再配布されません。

## アルゴリズムの参照

`形を整える` タブの `引っぱる（1）` ブラシは、下の論文の変形モデルに基づいています。これは**出典の表記**です。

> Fernando de Goes, Doug L. James. *Regularized Kelvinlets: Sculpting Brushes based on Fundamental Solutions of Elasticity.* ACM Transactions on Graphics (SIGGRAPH), 2017.

ウィンドウの説明が示す動作は、ここから来ています。正規化 Kelvinlet と C2 のソフトテールにより、境界で途切れずに広がります。→ [形を整える](/guides/sculpt#엘라스틱)

次の手法は、以下の文献に記載された方法を使用しています。これも**出典の表記**です。

- 三角形上の最近接点の計算: Christer Ericson, *Real-Time Collision Detection*, 2004.
- 光線と三角形の交差判定: Tomas Möller, Ben Trumbore, *Fast, Minimum Storage Ray/Triangle Intersection*, 1997.
- 二次誤差メトリクス（quadric error metrics）によるメッシュの簡略化: Michael Garland, Paul Heckbert, *Surface Simplification Using Quadric Error Metrics*, SIGGRAPH 1997.

## この製品のライセンス

同梱の DLL、シェーダー、アセットファイルの再配布、再販売、流出は禁止されています。

お問い合わせ: `studioraming@gmail.com`
