---
id: third-party-credits
title: 第三者表記
sidebar_position: 92
---

# 第三者表記

**このドキュメントを読むと**、このプロダクトに他のコードが含まれているか、アルゴリズムはどこから参照したか が理解できます。

## 含まれる第三者コード

**ありません。**

Easy Mesh Editor `0.1.1`パッケージには、外部ライブラリ、オープンソースコード、第三者アセットが含まれていません。配布されるのは以下の3つです。

- `Editor/EasyMeshEditor.Editor.dll` — Studio Ramingが作成したコード
- `Editor/Shaders/EmeOverlay.shader` · `Editor/Shaders/EmeSceneGL.shader` — Studio Ramingが作成したシーンビュー表示シェーダー
- `README.md`

Unityエンジン APIはUnity Technologiesのものであり、このプロダクトには再配布されません。

## アルゴリズム参考

`スカルプト`タブの`エラスティック（1）`ブラシは以下の論文の変形モデルを実装しています。コードを引用したのではなく、公開された式を参照して直接実装したため、ライセンス義務ではなく**出典表記**です。

> Fernando de Goes, Doug L. James. *Regularized Kelvinlets: Sculpting Brushes based on Fundamental Solutions of Elasticity.* ACM Transactions on Graphics (SIGGRAPH), 2017.

ウィンドウの説明が述べている動作はここから来ています — `正規化Kelvinletとc2ソフトテールで境界が途切れなく広がります。`→ [スカルプト](/guides/sculpt#엘라스틱)

## このプロダクトのライセンス

含まれるDLL、シェーダー、アセットファイルの再配布・再販売・流出を禁止します。

問い合わせ：`studioraming@gmail.com`
