---
id: third-party-credits
title: 제3자 표기
sidebar_position: 92
---

# 제3자 표기

**이 문서를 읽으면** 패키지에 무엇이 들어 있는지, 알고리즘을 어디서 참조했는지 알 수 있습니다.

## 패키지 구성

Easy Mesh Editor `1.0.0` 패키지에 들어 있는 것은 다음과 같습니다.

- `Editor/EasyMeshEditor.Editor.dll`(난독화된 빌드)
- `Editor/Shaders/EmeOverlay.shader`, `Editor/Shaders/EmeSceneGL.shader`: 씬뷰 표시용 셰이더
- 에디터 아이콘 이미지(PNG 파일)
- `README.md`

Unity 엔진 API는 Unity Technologies의 것이며 이 제품에 재배포되지 않습니다.

## 알고리즘 참조

`모양 다듬기` 탭의 `잡아당기기 (1)` 브러시는 아래 논문의 변형 모델을 바탕으로 합니다. 이 항목은 **출처 표기**입니다.

> Fernando de Goes, Doug L. James. *Regularized Kelvinlets: Sculpting Brushes based on Fundamental Solutions of Elasticity.* ACM Transactions on Graphics (SIGGRAPH), 2017.

창의 설명이 말하는 동작이 여기서 나옵니다. 정규화 Kelvinlet과 C2 소프트 테일로 경계가 끊기지 않고 퍼집니다. → [모양 다듬기](/guides/sculpt#엘라스틱)

## 이 제품의 라이선스

포함된 DLL, 셰이더, 에셋 파일의 재배포, 재판매, 유출을 금지합니다.

문의: `studioraming@gmail.com`
