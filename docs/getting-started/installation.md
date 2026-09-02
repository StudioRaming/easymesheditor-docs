---
id: installation
title: 설치
sidebar_position: 1
---

# 설치

**이 문서를 읽으면** 지원되는 Unity 버전, `.unitypackage`와 폴더 복사 두 가지 설치 방법, 반드시 함께 들어가야 하는 파일, DLL판과 소스판을 겹쳐 넣었을 때 나는 오류를 알 수 있습니다.

## 1. 지원 범위

| 항목 | 내용 |
|---|---|
| 제품 버전 | `0.1.1` |
| 지원 Unity | **2019.4.31f1 ~ 2022.3.22f1** |
| 직접 컴파일을 검증한 버전 | `2019.4.31f1` · `2021.3.45f2` · `2022.3.22f1` |
| 렌더 파이프라인 | Built-in Render Pipeline · URP |
| 실행 범위 | Unity Editor 전용 |

코드는 Unity 2019.4 공개 API와 C# 7.3을 하한선으로 씁니다. 정점당 5개 이상의 본 영향을 다루는 [가변 본 웨이트](/internals/bake#가변-본-웨이트) API는 2020.1 이상에서만 제공되므로 전처리 분기로 갈라져 있습니다. 2019.4에서는 레거시 4슬롯만 다룹니다.

:::note[셰이더가 아닙니다]
Easy Mesh Editor는 메쉬 데이터를 편집하는 에디터 도구입니다. 아바타에 쓰는 셰이더나 머티리얼은 그대로 두며, BRP·URP 어느 쪽이든 동작합니다.
:::

## 2. `.unitypackage`로 설치

1. Unity에서 `Assets > Import Package > Custom Package`를 고르고 제공된 `.unitypackage`를 엽니다.
2. `Assets/StudioRaming/EasyMeshEditor` 아래 파일을 **모두** Import합니다.
3. 메뉴에서 `StudioRaming > Easy Mesh Editor`를 엽니다.

## 3. 폴더를 직접 복사해서 설치

`Assets/StudioRaming/EasyMeshEditor` 폴더 전체를 프로젝트의 같은 위치로 복사합니다. 아래 파일은 반드시 함께 있어야 합니다.

- `README.md`
- `Editor/EasyMeshEditor.Editor.dll` 과 그 `.meta`
- `Editor/Shaders/EmeOverlay.shader`
- `Editor/Shaders/EmeSceneGL.shader`

:::caution[셰이더 두 개를 빠뜨리면 화면에 아무것도 안 보입니다]
두 셰이더는 씬뷰 오버레이, X-Ray, 정점·본·웨이트 히트맵 표시에 쓰입니다. DLL만 복사하면 도구는 로드되지만 씬뷰 표시가 정상 동작하지 않습니다.
:::

## 4. DLL판과 소스판을 함께 넣지 마세요

소스 `.cs`가 남아 있는 프로젝트에 DLL판을 같이 넣으면 **같은 클래스가 두 번 정의되어 컴파일 오류**가 납니다. 둘 중 하나만 설치하세요.

이전 버전 위에 덮어쓰는 대신, 기존 `Assets/StudioRaming/EasyMeshEditor` 폴더를 지우고 새로 임포트하는 쪽이 안전합니다. 폴더 안에 직접 만든 파일이 있다면 먼저 밖으로 옮겨 두세요.

`Bake`로 만들어진 `_Edit.asset`·`_Part.asset`은 원본 메쉬 옆에 생기므로 이 삭제 대상이 아닙니다. → [생성되는 파일](/reference/output-files)

## 5. 창 열기

`StudioRaming > Easy Mesh Editor`

창은 도킹할 수 있습니다. 열자마자 `대상 없음 — 오브젝트를 선택하고 Load` 상태로 시작하며, Hierarchy에서 오브젝트를 고르면 대상 행이 채워집니다. → [첫 편집 세션](/getting-started/first-session)

## 6. 메쉬가 Read/Write 꺼짐이라면

임포트된 FBX의 메쉬는 기본적으로 Read/Write가 꺼져 있는 경우가 있습니다. 그런 메쉬를 `Load`하려고 하면 창이 `메쉬가 Read/Write 비활성 상태입니다. 임포트 설정에서 Read/Write를 켜주세요.` 를 보여 주고, 그 자리에 `Read/Write 켜기` 버튼이 함께 나옵니다. 버튼을 누르면 모델 임포터의 설정을 켜고 다시 임포트합니다.

## 7. 언어 바꾸기

창 오른쪽 위에서 한국어 / English / 日本語를 고릅니다. 처음 열 때는 Unity 에디터의 시스템 언어를 따라갑니다 — 한국어면 한국어, 일본어면 일본어, 그 밖에는 영어입니다.
