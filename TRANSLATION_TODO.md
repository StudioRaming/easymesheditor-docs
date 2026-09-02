# TRANSLATION TODO — Easy Mesh Editor Docs

한국어 원본은 `docs/` 아래에 완성되어 있습니다. 영어·일본어는 아직 번역되지 않았습니다.

번역 대상 로케일 디렉터리:

- 영어 — `i18n/en/docusaurus-plugin-content-docs/current/`
- 일본어 — `i18n/ja/docusaurus-plugin-content-docs/current/`

원본과 **같은 경로·같은 파일명**으로 만들어야 합니다. 파일이 없으면 그 페이지는 한국어로 폴백되어, 번역된 것처럼 보이면서 실제로는 안 된 상태가 됩니다.

## 번역할 파일 (20개)

| # | 원본 | en | ja |
|---|---|---|---|
| 1 | `docs/intro.md` | ☐ | ☐ |
| 2 | `docs/getting-started/installation.md` | ☐ | ☐ |
| 3 | `docs/getting-started/first-session.md` | ☐ | ☐ |
| 4 | `docs/guides/window.md` | ☐ | ☐ |
| 5 | `docs/guides/sculpt.md` | ☐ | ☐ |
| 6 | `docs/guides/edit.md` | ☐ | ☐ |
| 7 | `docs/guides/blendshape.md` | ☐ | ☐ |
| 8 | `docs/guides/weight-paint.md` | ☐ | ☐ |
| 9 | `docs/guides/multi-mesh.md` | ☐ | ☐ |
| 10 | `docs/workflow/clothing-fit.md` | ☐ | ☐ |
| 11 | `docs/workflow/expression-keys.md` | ☐ | ☐ |
| 12 | `docs/reference/shortcuts.md` | ☐ | ☐ |
| 13 | `docs/reference/settings.md` | ☐ | ☐ |
| 14 | `docs/reference/output-files.md` | ☐ | ☐ |
| 15 | `docs/internals/session-and-undo.md` | ☐ | ☐ |
| 16 | `docs/internals/bake.md` | ☐ | ☐ |
| 17 | `docs/troubleshooting.md` | ☐ | ☐ |
| 18 | `docs/limitations.md` | ☐ | ☐ |
| 19 | `docs/legal/third-party-credits.md` | ☐ | ☐ |
| 20 | `docs/changelog/0.1.0.md` · `docs/changelog/0.1.1.md` | 한국어 사본만 있음 | 한국어 사본만 있음 |

`docs/changelog/_template.md` 는 템플릿이므로 번역하지 않습니다.

## 반드시 지킬 것

1. **제목 앵커(`{#...}`)는 한국어 원본 그대로 복사합니다.** 앵커는 언어와 무관하게 고정입니다. 번역하면 다른 언어에서 오는 링크가 전부 깨지고 빌드가 실패합니다(`onBrokenAnchors: throw`).

   ```
   한국어:  ## 빠른 캡처와 Bake {#빠른-캡처와-bake}
   영어:    ## Quick capture vs Bake {#빠른-캡처와-bake}   ← 앵커 동일
   ```

2. **내부 링크 URL도 그대로 복사합니다.** `→ [문서](/guides/edit#엣지-루프와-엣지-링)` 의 경로와 앵커는 건드리지 않고 라벨만 번역합니다.

3. **frontmatter 의 `id` · `sidebar_position` · `slug` 는 원본과 같아야 합니다.** `title` 과 `description` 만 번역합니다.

4. **제품 라벨은 그 언어판 UI 문구를 씁니다.** 백틱으로 감싼 문구는 창에 실제로 표시되는 라벨입니다. 대조표는 제품 소스의
   `Assets/StudioRaming/EasyMeshEditor/Editor/EasyMeshLang*.cs` — 배열의 두 번째 값이 영어, 세 번째가 일본어입니다.

   ```
   한국어:  `자동 정규화`      영어: `Auto Normalize`     일본어: 일본어 테이블 값
   ```

   임의로 번역하지 말고 반드시 테이블 값을 그대로 옮기세요.

5. **Admonition 은 v3 문법만 씁니다.** `:::caution[제목]` — 대괄호 필수. 종류(`note` / `caution` / `warning`)와 개수는 원본과 같아야 합니다.

6. **표의 행 수와 순서를 유지합니다.**

## 다 쓴 뒤

```
npm run build
node scripts/check-translations.mjs en
node scripts/check-translations.mjs ja
```

세 명령이 모두 통과해야 배포합니다.

앵커나 링크가 번역되어 버렸다면 위치 기준으로 되돌릴 수 있습니다.

```
node scripts/repair-translations.mjs en          # 보고만
node scripts/repair-translations.mjs en --write  # 실제 수정
```

## 테마 문자열

`i18n/<locale>/docusaurus-theme-classic/navbar.json` · `footer.json` 과
`i18n/<locale>/docusaurus-plugin-content-docs/current.json` 은 이미 세 언어 모두 채워져 있습니다.
사이드바 카테고리 라벨을 추가하면 세 파일을 함께 갱신하세요.
