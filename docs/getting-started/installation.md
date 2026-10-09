---
id: installation
title: 설치
sidebar_position: 1
---

# 설치

**이 문서를 읽으면** 지원되는 Unity 버전, `.unitypackage`와 폴더 복사 두 가지 설치 방법, 반드시 함께 들어가야 하는 파일, DLL판과 소스판을 겹쳐 넣었을 때 나는 오류, 그리고 0.1.x에서 올라오는 방법을 알 수 있습니다.

## 1. 지원 범위

| 항목 | 내용 |
|---|---|
| 제품 버전 | `1.0.0` |
| 지원 Unity | **Unity 2019.4 ~ Unity 6 (6000.0, 6000.3 LTS)** |
| 직접 컴파일을 검증한 버전 | `2019.4.31f1` · `2021.3.45f2` · `2022.3.22f1` (경고를 오류로 처리한 빌드) |
| 렌더 파이프라인 | Built-in Render Pipeline · URP |
| 실행 범위 | Unity Editor 전용 |

하나의 DLL이 위 버전 모두에서 동작합니다. 버전별 분기 없이 같은 파일을 씁니다. 코드는 Unity 2019.4 공개 API와 C# 7.3을 하한선으로 씁니다.

정점당 4개를 넘는 본 영향(가변 본 웨이트)은 2019.4에도 있는 공개 API(`GetAllBoneWeights` / `SetBoneWeights`)로 읽고 씁니다. 자세한 내용은 [Bake 내부](/internals/bake#가변-본-웨이트)를 보세요.

:::note[셰이더가 아닙니다]
Easy Mesh Editor는 메쉬 데이터를 편집하는 에디터 도구입니다. 아바타에 쓰는 셰이더나 머티리얼은 그대로 두며, BRP·URP 어느 쪽이든 동작합니다.
:::

## 2. `.unitypackage`로 설치

1. Unity에서 `Assets > Import Package > Custom Package`를 고르고 제공된 `EasyMeshEditor_v1.0.0.unitypackage`를 엽니다.
2. `Assets/StudioRaming/EasyMeshEditor` 아래 파일을 **모두** Import합니다.
3. 메뉴에서 `StudioRaming > Easy Mesh Editor`를 엽니다.

## 3. 폴더를 직접 복사해서 설치

`Assets/StudioRaming/EasyMeshEditor` 폴더 전체를 프로젝트의 같은 위치로 복사합니다. 아래 파일은 반드시 함께 있어야 합니다.

- `README.md`
- `Editor/EasyMeshEditor.Editor.dll` 과 그 `.meta`
- `Editor/Shaders/EmeOverlay.shader`
- `Editor/Shaders/EmeSceneGL.shader`

:::caution[셰이더 두 개를 빠뜨리면 씬뷰 표시가 동작하지 않습니다]
두 셰이더는 씬뷰 오버레이, X-Ray, 정점·본·웨이트 표시에 쓰입니다. DLL만 복사하면 도구는 로드되지만 씬뷰 표시가 정상 동작하지 않습니다.
:::

## 4. DLL판과 소스판을 함께 넣지 마세요 {#4-dll판과-소스판을-함께-넣지-마세요}

소스 `.cs`가 남아 있는 프로젝트에 DLL판을 같이 넣으면 **같은 클래스가 두 번 정의되어 컴파일 오류**가 납니다. 둘 중 하나만 설치하세요.

`메쉬 저장`으로 만들어진 `_Edit.asset`·`_Part.asset`은 원본 메쉬 옆에 생기므로 이 삭제 대상이 아닙니다. → [생성되는 파일](/reference/output-files)

## 5. 0.1.x에서 올리기 {#0-1x에서-올리기}

**0.1.x 구매자는 1.0.0을 무료로 업데이트할 수 있습니다.**

편집 세션을 연 채로 업데이트하지 마세요. 열려 있는 편집은 `메쉬 저장`으로 저장하거나 `편집 버리기`로 버린 뒤, Easy Mesh Editor 창을 닫고 업데이트합니다.

기존 `Assets/StudioRaming/EasyMeshEditor` 폴더 위에 1.0.0을 덮어쓰기 임포트하면 됩니다. 0.1.x에서 올릴 때 따로 지워야 할 파일은 없습니다. 예외는 소스(`.cs`) 판을 설치했던 프로젝트입니다. 이 경우에는 먼저 소스 판을 지우세요. 폴더 안에 직접 만든 파일이 있다면 먼저 밖으로 옮겨 두세요.

이미 만든 `_Edit.asset`을 쓰는 렌더러를 다시 `불러오기` 하고 `메쉬 저장`을 누르면, 1.0이 만든 출력은 같은 파일을 GUID를 유지한 채 갱신합니다. 0.1.x가 만든 `_Edit.asset`에는 소유 표식이 없어서 갱신하지 않고, 옆에 `<원본명>_Edit 1.asset`을 새로 만듭니다. 0.1.x가 저장한 `_Edit.asset`은 그대로 남고 계속 동작합니다. 새 파일은 새 GUID를 가지므로, 이전 파일을 참조하는 프리팹이나 애니메이션은 새 파일로 다시 연결해야 합니다.

## 6. 창 열기

`StudioRaming > Easy Mesh Editor`

창은 도킹할 수 있습니다. 열자마자 대상이 없다는 안내와 함께 시작하며, Hierarchy에서 오브젝트를 고르면 대상 행이 채워집니다. → [첫 편집 세션](/getting-started/first-session)

## 7. 메쉬가 Read/Write 꺼짐이라면 {#7-메쉬가-readwrite-꺼짐이라면}

임포트된 FBX의 메쉬는 기본적으로 Read/Write가 꺼져 있는 경우가 있습니다. 그런 메쉬를 `불러오기`하려고 하면 창이 Read/Write가 꺼져 있다는 안내를 보여 주고, 상태줄에 `Read/Write 켜기` 버튼이 나옵니다. 버튼을 누르면 모델 임포터의 설정을 켜고 다시 임포트합니다. 자동으로 바꿀 수 없는 모델이라면 안내에 따라 원본의 Import Settings에서 직접 켜 주세요.

켜는 것만으로는 편집 세션이 열리지 않습니다. 설정을 켠 뒤 **불러오기**를 한 번 더 눌러야 합니다.

## 8. 언어 바꾸기

창에서 한국어 / English / 日本語를 고릅니다. 처음 열 때는 Unity 에디터의 시스템 언어를 따릅니다. 한국어면 한국어, 일본어면 일본어, 그 밖에는 영어입니다.
