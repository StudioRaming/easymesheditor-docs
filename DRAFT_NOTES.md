# DRAFT NOTES: Easy Mesh Editor 1.0.0 docs (local draft, not published)

- task_id: MM-EME-PR-INTEG-RELEASE-20261009
- branch: docs/eme-1.0-draft-20261009 (from origin/main b0696a7)
- status: LOCAL DRAFT. No commit, no push, no deploy. Publishing waits for 라밍 approval.
- build: `npm run build` passes for ko, en, ja (0 broken links, 0 broken anchors). See the report.
- sources: EME README 1.0 (commit cea3669, KO/EN/JA), Editor/Core/EasyMeshVersion.cs (1.0.0),
  EasyMeshLang*.cs label tables, UI/EmeSceneOverlayHost.cs, Ops patch-notes-mm-2.0-eme-1.0.md,
  open-questions.md.

## 0. Page map (0.1.1 to 1.0.0)

Action: K = kept and updated, R = rewritten, N = new, H = history (not changed, except link fixes noted below).
Each locale (ko, en, ja) follows the same map.

| File | 0.1.1 title | Action | Note |
|---|---|---|---|
| docs/intro.md | 소개 | K | 1.0 tab names and terms |
| docs/getting-started/installation.md | 설치 | K | 1.0.0 Unity table, update section (CONFIRM) |
| docs/getting-started/first-session.md | 첫 편집 세션 | R | 1.0 flow: Load, four tabs, Save Mesh, Discard edits |
| docs/guides/window.md | 창 사용법 | R | start card, candidates, save row, badges, recovery banner (layout CONFIRM) |
| docs/guides/sculpt.md | 스컬프트 | K | title 모양 다듬기; brush names; pen pressure size/strength |
| docs/guides/edit.md | 편집 | K | title 선택·이동; painted region tools; group separation G0-G9 |
| docs/guides/blendshape.md | 블렌드쉐이프 | K | title 표정 키; file name kept for links and anchors |
| docs/guides/weight-paint.md | 웨이트 페인트 | K | title 뼈 연결; file name kept |
| docs/guides/multi-mesh.md | 다중 메쉬 | K | same-source renderers are now edited separately (0.1.1 excluded them) |
| docs/workflow/clothing-fit.md | 의상 맞추기 | K | 1.0 labels and steps |
| docs/workflow/expression-keys.md | 표정 키 만들기 | K | Save as New Key, Save Mesh |
| docs/reference/shortcuts.md | 단축키 | R | rebuilt from the README 1.0 shortcut table |
| docs/reference/settings.md | 설정 항목 | K | defaults not in README: CONFIRM |
| docs/reference/output-files.md | 생성되는 파일 | K | _Part.asset, Library/EmeAutoSave |
| docs/internals/session-and-undo.md | 세션과 되돌리기 | K | Discard edits, autosave scope, crash checkpoint |
| docs/internals/bake.md | Bake 내부 | K | title "메쉬 저장 내부"; Save Mesh = Bake |
| docs/troubleshooting.md | 문제 해결 | K | |
| docs/limitations.md | 현재 제한 | K | 1.0.0; Extrude, Inset, Bevel still missing |
| docs/legal/third-party-credits.md | 제3자 표기 | K | version text only (CONFIRM: package file list) |
| docs/changelog/1.0.0.md | (none) | N | from the patch-notes draft, ko/en/ja |
| docs/changelog/0.1.1.md | 0.1.1 | H | unchanged except 4 link targets (see section 4) |
| docs/changelog/0.1.0.md | 0.1.0 | H | unchanged |
| docs/changelog/_template.md | template | H | unchanged |

No page is removed. Compact mode is no longer documented, because the 1.0 README does not list it.
The 0.1.1 changelog link to it now points to the window page.

## 1. Terms changed in 1.0 (UI labels from EasyMeshLang*.cs, ko / en / ja)

| 0.1.1 term | 1.0 label (ko / en / ja) |
|---|---|
| 스컬프트 tab | 모양 다듬기 / Shape / 形を整える |
| 편집 tab | 선택·이동 / Select & Move / 選択・移動 |
| 블렌드쉐이프 tab | 표정 키 / Shape Keys / 表情キー |
| 웨이트 tab | 뼈 연결 / Bone Weights / ボーン接続 |
| Load | 불러오기 / Load / 読み込み |
| Bake (final button) | 메쉬 저장 / Save Mesh / メッシュ保存 |
| Revert | 편집 버리기 / Discard edits / 編集を破棄 |
| 새 쉐이프로 저장 | 새 키로 저장 / Save as New Key / 新規キーとして保存 |
| 키 편집 취소 (bar) | 키 편집 취소 / Cancel Key Edit / キー編集を取消 |
| Elastic brush | 잡아당기기 / Pull / 引っぱる |
| Gather brush (Pinch) | 모으기 / Gather / 寄せる |
| Inflate brush | 부풀리기 / Inflate / ふくらませる |

Bake stays in the docs as the name of the final-save step, and 메쉬 저장 is the button label.
Bone wording: the UI and code use 본 (bone). Only the tab name 뼈 연결 keeps 뼈.

## 2. CONFIRM items (open markers in the pages)

Open after round 3. These are the only `<!-- CONFIRM: -->` markers left in ko, en and ja (15 lines, 4 items):

| # | Item | Where | Owner |
|---|---|---|---|
| D2 | Release date (the date line is left out) | changelog (ko, en, ja) | 라밍 |
| D4 | Package file name `EasyMeshEditor_v1.0.0.unitypackage` | installation (ko, en, ja) | 라밍 |
| F4 | MingToon Face Proxy: public status and link. Kept out of visible text | blendshape, changelog (ko, en, ja) | MingToon status |
| S1 | Third-party credits: the DLL is obfuscated, so source cannot prove it has no third-party code. Kept open although round 3 asked to keep only D2, D4, F4 | third-party-credits (ko, en, ja) | 라밍 |

Not in the pages, still open: S4 (snapshot memory limit numbers, not documented), S5 (price, store, release date).

### 2a. Settled in round 3 (marker removed, basis in code)

| # | Result | Basis |
|---|---|---|
| L1 | First open shows Easy start. The page says so. Language popup position is not stated in the page | `EasyMeshWindow.Guided.cs:9` `guidedWorkspace = true` |
| L2 | Defaults column added to settings (all four tables and the window table) | `SculptMode.cs:529-556`, `EditMode.Panel.cs:11-32`, `WeightPaintMode.cs:68-86`, `BlendShapeMode.cs:314-319`, `BlendShapeMode.Groups.cs:135-136`, `BlendShapeMode.Mirror.cs:81`, `SculptMode.MaskBrush.cs:31`, `SculptMode.SymmetryViz.cs:26` |
| L3 | Overlay: 2021.2+ draws over the Unity overlay, 2019.4 uses camera IMGUI. Stated as the code split only | `EasyMeshWindow.SceneOverlay.cs:34-41` |
| L4, L5 | Root statements applied (Enter keeps, Esc cancels; Ctrl+Z notice only after a cleanup). No marker | root decision |
| L7 | Switching target with unsaved edits is refused with `Window.SwitchBlockedUnsaved` | `EasyMeshWindow.cs:468` (`KeepUnsaved`) |
| L8 | JA label is `Read/Writeを有効化` (the page used a translation; fixed) | `EasyMeshLang.cs:331` |
| L9 | Vertex-count change on key save: the multi-mesh path refuses with `Shape.MultiEditTopologyError`. The single-key path shows a different message, not quoted in the page | `BlendShapeMode.CrossEdit.cs:272`, `BlendShapeMode.NewSculpt.cs:195` |
| L10 | Undo past the edit start: `Shape.PendingCancelledByUndo` text quoted in session-and-undo | `EasyMeshLang.ShapeWeightUtil.cs:165` |
| L11 | Restore: `Window.AutoSaveRestored` followed by `Undo.RestoreBoundary`, one status line | `EasyMeshWindow.Recovery.cs:162` |
| L12 | Non-triangle and duplicate-name skips are diagnostic-only (console, only when `StudioRaming.EasyMeshEditor.Diag` is on). `Edit.CompactFailed` is visible. Bake table rewritten | `EmeVertexCompactor.cs:46`, `:69`, `:87`, `EmeDiagnostics.cs:10-17` |
| S2 | Separated pieces copy each vertex's influence count exactly (no 4-slot cut). The 0.1.1 claim is removed from edit, limitations and bake | `EmeMeshPartition.Weights.cs` `CopyWeightsExact`, called at `EmeMeshPartition.cs:89` and `EmeMeshPartition.Reindexed.cs:34` |
| S3 | Owner token comes from the renderer's stable ID; unsaved scene and unreadable owner notices quoted | `EmeBakeAssetStore.cs:16-18, 380-381`, `EasyMeshLang.DataSafety.cs:18-47`, `EasyMeshWindow.DataSafety.cs:41-63` |
| U1-U3 | Round 1 decisions. U3 changed by the code: see section 3, item 9 | root decision, `EmeBakeAssetStore.cs:124-126, 325-336` |

## 3. Review of the README and draft against the code (report only, product sources not changed)

1. The 1.0 README says variable bone weights work on every supported version (2019.4 included) through
   `GetAllBoneWeights` / `SetBoneWeights`. The 0.1.1 docs said 2019.4 has only four slots. This draft follows
   the README, so the 0.1.1 wording is gone from the 1.0 pages. Please confirm with the code owner.
2. The README uses "Bake" for the final save in the body text and "메쉬 저장" as the button. The docs use "메쉬 저장 (Bake)" in
   the first mention. Consider one name in the README.
3. The Ops patch-note draft says G/R/S modal transforms are new in 1.0. 0.1.1 already had them (0.1.1 changelog,
   "새 기능"). The 1.0 changelog does not list them as new.
4. The Ops patch-note draft lists "3 languages" and "Connected Only" as new. 3 languages existed in 0.1.0. Connected Only existed
   in 0.1.1; the 1.0 change is only the extra places it can be turned on (overlay and Easy start details).
5. The patch-note draft's "Fixed" section (4 items) cannot be checked against 0.1.x from this worktree. It is kept as a
   comment in the changelog, not visible text (L5, L6).
6. README EN: "Read/Write" button label is not in the label table in the same form as the README wording. The docs use
   the README wording.
7. The README's Face Proxy section and the draft's MingToon link depend on the MingToon public version (F4).
8. The 0.1.1 changelog links to shortcuts `#스컬프트`, `#편집`, the window `#컴팩트-모드`, and the session `#자동-저장과-복원`.
   Those anchors no longer exist, so they were repointed (section 4).

9. Upgrade path changes the 0.1.x promise. A 0.1.x `_Edit.asset` has no owner record, so `EmeBakeAssetStore.cs:124-126`
   and `:325-336` never treat it as owned. `Save Mesh` writes a new file next to it with a new GUID (the test
   `LegacyUnknownOwnerSaveAlwaysUsesANewSafeOutput` covers this). The round-1 plan said the GUID is kept. The pages
   now say a new file with a new GUID is written and prefabs or animations must be re-linked (installation section 5).
   Decision for the lead: keep this, or make 1.0 adopt legacy outputs. The README's "이 도구가 만든 동일 원본 출력만
   GUID를 유지" line matches the current code.
10. Skip messages are not visible. The non-triangle and duplicate-name skips in `EmeVertexCompactor.cs:46, :87` go through
   `EmeDiagnostics.Log`, which prints only when the diagnostics switch is on. The 0.1.1 docs said the tool "알립니다".
   The 1.0 page now says so. Whether a silent skip meets R1/R7 is a product call.
11. Separated pieces are no longer limited to four slots in code (see S2). The README is silent on this point. The 0.1.1
   docs and the old draft said four. Consistent with README point 1 (variable weights supported).

## 4. Changes outside the docs pages (needed for the build)

- `src/remark/auto-link-terms.mjs` (glossary, applies to all locales): `자동 저장` became `자동 보존`
  (`#자동-보존과-복원`), `새 쉐이프로 저장` became `새 키로 저장` (`/guides/blendshape#빠른-캡처와-bake`), and `컴팩트 모드` was
  removed. Without this the build failed on the old anchors.
- `docs/changelog/0.1.1.md` and the en/ja copies: 4 link targets repointed to existing anchors (no text change):
  `/guides/window#컴팩트-모드` -> `/guides/window`; `/reference/shortcuts#스컬프트` -> `#모양-다듬기`;
  `/reference/shortcuts#편집` -> `#선택-이동`; `/internals/session-and-undo#자동-저장과-복원` -> `#자동-보존과-복원`.
- `i18n/{ko,en,ja}/docusaurus-theme-classic/navbar.json`: the label key `item.label.v0.1.1` was replaced by
  `item.label.v1.0.0` (value `v1.0.0`). Done by hand, not with `npm run write-translations`.
- `docusaurus.config.js`: `EME_VERSION` = `1.0.0`.
- Stubs created by `node scripts/new-patch-note.mjs 1.0.0`: `sidebar_position` -10000, filled in all three locales.
- `build/` output (gitignored) was created by the build check.

## 4a. Status after the facts-eme check (F10-F13, F17, C7, extras) and the update decision

Settled and applied to ko/en/ja pages:
- U1: no manual deletion when upgrading from 0.1.x (tested on 2022.3, dry packages). Source (.cs) edition: delete first.
- U2 (open edit session during update): pages now say bake or discard the edits and close the window before updating.
  The post-update behavior is not documented, because it is not tested.
- L4: discard dialogs. Enter = 그대로 두기 (Keep), Esc = 취소 (Cancel). Both keep the work. Only the action button runs it.
- L5 (F12): the Ctrl+Z notice appears only when the position moved and no recorded step exists. No notice when nothing changed.
  Kept out of visible text until the 0.1.x delta is checked.
- L3 (F10): 2021.2+ draws the scene panels above Unity's overlay (EmeSceneOverlayHost). 2019.4 uses camera IMGUI.
  Real on-screen overlap is still not verified by capture.
- L11 (F17): auto-restore happens in the same editor run (domain reload included) or after an orderly quit. After a crash, the
  recovery banner offers Restore / Discard. Discard needs two presses within 5 seconds. Checkpoints happen only when content changed,
  at least 60 s apart. The restore notice text is still not checked.
- S1 (F13): the package has no third-party notice file. Icon PNGs are listed. Whether the obfuscated DLL contains third-party code
  is still not verified.
- C7: the window is a dockable EditorWindow. The scene view has its own shortcut-sheet button, and the window has one too.
- Extras: menu item, version 1.0.0, language list checked.

Still open: L1, L2, L6, L7, L8, L9, L10, L12, F4, S2, S3, S4, D2, U3, and the on-screen overlap capture (L3).

Changes requested for the Ops drafts (Ops files were not edited by this worktree):
- patch-notes 78, 156, 234 (ko/en/ja): the "[확인 필요: 기본 버튼]" marker can be removed. Enter keeps the work (the default is 그대로 두기), Esc cancels.
  The save dialog ("메쉬 저장" confirm) is different: Enter runs the save.
- patch-notes 84 (ko): change "이유를 한 줄로 안내해요" to "이미 정리된 편집 단계를 누르면 한 줄로 알려줘요". The notice only appears when a moved position has no recorded step.
- booth and patch-note scene-view lines: keep "Unity 2021.2 이상" and add that 2019.4 draws with camera IMGUI. Overlap is unverified until capture.
- booth 59, 161 (third-party [확인 필요]): settled as "no third-party notice file" (see S1).
- patch-note "편집 중인 메쉬는 ... 돌아오면 복원해요": automatic restore only in the same run or after an orderly quit. After a crash, choose Restore / Discard in the recovery banner.
- Use "복구 배너" instead of "Resume 패널". There is no Resume panel in the code.
- open-questions F10-F13, F17: closed by the code reading above. Left for runtime checks: F10 capture, F11 Complex dialog Esc mapping, F17 0.1.x format read.

## 5. Checks run

- `npm run build`: exit 0. ko, en, ja all generated.
- `node scripts/check-translations.mjs en`: 0 missing, 0 problems (22 expected).
- `node scripts/check-translations.mjs ja`: rerun after the last edit (see the report).
- Self-check grep on the changed pages: no `0.1.1`, `0.2.0`, price, or date words outside CONFIRM comments and
  history pages. No em dash in the changed pages (the `_template.md` has one, and it is not changed).

### Round 3 checks (CONFIRM settlement)

- `npm run build`: exit 0, "[SUCCESS] Generated static files" for `build`, `build\en`, `build\ja` (log: scratchpad `build6.log`).
- `node scripts/check-translations.mjs en`: 22 expected, 0 missing, 0 problem(s).
- `node scripts/check-translations.mjs ja`: 22 expected, 0 missing, 0 problem(s).
- CONFIRM markers left: 15 lines in ko, en, ja (D2 x3 changelog, F4 x3 changelog, F4 x3 blendshape, D4 x3 installation, S1 x3 third-party).

## 5. i18n pass 2026-10-10 (task MM-EME-PR-INTEG-RELEASE-20261009, decisions G3/D14)

- UI names in ko/en/ja were checked against the product Lang tables (EasyMeshLang*.cs at 4ffb28c). Wrong names fixed (badges EDITING KEY / キー編集中 / 키 편집 중,
  Reset All to 0, Commit as New Key, Max Influences, Scope, Overlay Blend, ja ウェイトを取得 / 距離でマージ / 球形 / 反復回数 and more).
- ko particle bugs from an old bone rename fixed (본를, 본가, 본로, 본는 ...). "Equal weight per mesh" was described as a per-mesh pivot; it weights the shared pivot per mesh (Edit.PivotMultiEqual.tip). Fixed in 3 languages.
- Decisions applied: D4 (package name), D7 (notice on intro and install pages), D11/D12 (Unity 2019.4 ~ Unity 6, BRP and URP, "support included"), D13 (latest MingToon; Face Proxy now documented),
  D16 and the RC2 README items (unchanged meshes skipped on Save Mesh, recovery banner cases, Play mode card, Separate/Delete selection buttons, read-only source meshes, _Edit 1.asset).
- README finding: the shipped README names the third badge "트랜잭션 중", but the product label is "키 편집 중" / EDITING KEY / キー編集中 (Window.TransactionBadge). The site follows the Lang table.
- Remaining CONFIRM comment: third-party credits (S1). D2 release date is left out of the changelog.
