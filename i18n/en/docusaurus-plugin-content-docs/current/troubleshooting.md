---
id: troubleshooting
title: Troubleshooting
sidebar_position: 90
---

# Troubleshooting

Search by symptom. Most issues boil down to **one of three: "session didn't open," "wrong tab," or "transaction is open."**

## Window Opens but Nothing Works

| Check | Fix |
|---|---|
| Target line shows `No target — select an object and Load` | Select a mesh renderer in the Hierarchy |
| Stuck at `Selected: {0} renderer(s) (press Load)` | Haven't pressed `Load` yet |
| `Editing is temporarily off.` | Press `Tab` or `Resume Editing` |
| See only guide text, no tab content | That tab is for `SkinnedMeshRenderer` only |

## `Load` Fails

| Cause | Message / Indicator | Fix |
|---|---|---|
| No mesh renderer | `No editable mesh renderer found in the selected objects.` | Check if renderer exists, including children |
| Read/Write off | `Mesh is not Read/Write enabled.` · candidate row shows `[no Read/Write]` | Press window's `Enable Read/Write` button |
| Renderer shares source mesh | Candidate row shows `[shared source]` | Automatically loads one only |

## `BlendShape` / `Weight` Tab Inactive

Both tabs are `SkinnedMeshRenderer` only.

- `BlendShape is for SkinnedMeshRenderer only.`
- `Weight Paint is for SkinnedMeshRenderer only.`

If you opened multiple meshes, **all** must be SMR — `All selected targets must be SkinnedMeshRenderer to edit blend shapes together.`

## `Bake` Button Won't Click

Check if the badge is `IN TRANSACTION`. Uncommitted blend shape edits block both `Save as New Key` and `Bake`.

> `'{0}' shape is still being edited. Commit or cancel the current changes, then save the asset.`

Press `Enter` (commit) or `Esc` (cancel) in the Scene view pinned bar first. → [BlendShape](/guides/blendshape#기존-키-편집)

## Scene View Draws Nothing

| Cause | Fix |
|---|---|
| **Two shaders missing** | Install `Editor/Shaders/EmeOverlay.shader` and `EmeSceneGL.shader` together → [Installation](/getting-started/installation) |
| Edit is off | Press `Tab` |
| Trying to see occluded elements | `Alt+Z` for X-Ray |

## `Alt+click` Rotates Camera Instead of Edge Loop

Intended behavior. Loop selection only happens on **click without dragging.** Release without moving from where you pressed. → [Edit](/guides/edit#엣지-루프와-엣지-링)

## `R` Is Scale Gizmo, Not Rotation Modal

`R` is rotation modal only when **you have a selection and cursor is over the Scene view.** With empty selection or cursor on the window, Unity's `R` = Scale gizmo applies.

## Pressing `X` `Y` `Z` Doesn't Toggle Symmetry

Symmetry shortcuts for both `Sculpt` and `Edit` are `Shift+Alt+X` / `Y` / `Z`. Solo keys are reserved for Unity's tool handles. Use the window's `Symmetry` checkbox too. → [Shortcuts](/reference/shortcuts)

## Symmetry Doesn't Affect the Other Side

| Cause | Fix |
|---|---|
| Wrong axis chosen | Turn on `Show Symmetry Plane` and verify its position |
| Asymmetric edit happened | Symmetry map updates at each stroke start. Try once more |
| Mesh is inherently asymmetric | Unmatched vertices just skip |

## Weight Painting Does Nothing

| Cause | Message | Fix |
|---|---|---|
| No active bone | `No active bone — click the radio button on the left of the list to select a bone to paint.` | Use radio to select |
| Bone locked | `Target bone is locked; skipping {0} vertices` | Unlock with `L` in row |
| Slots full | `Skipping {0} vertices with 4 full slots (weak influence cut)` | Lower another bone's weight first or check `Max Bone Influences` |

## Weight Transfer Results Are Completely Off

Different transforms between source and target. The window warns — enable `Ignore Source Transform (match in bind-pose local space)` and retry. → [Weight Paint](/guides/weight-paint#전송-공간)

If only some vertices are off, raise `Max Distance` slightly. `out of range {1}` count should drop.

## Edited Key But Other Frames Look Wrong

Multi-frame keys edit only the final frame (100%), and intermediate frames **proportionally** update to match.

> `This key has {0} frames. Only the final frame (100%) will be edited`

No feature to edit individual frames. → [Limitations](/limitations)

## Deleted Faces But Polygon Count Didn't Drop

Vertex cleanup happens only at `Bake`. During edit, live mesh indices stay tied to selection/mask/undo snapshots. → [Orphan Vertex Cleanup](/internals/bake#고아-정점-정리)

If count still didn't drop after `Bake`, it was skipped. Check the console for `Skipped orphan vertex cleanup: the mesh has non-triangle submeshes…` or `…duplicate blend shape names…`

## `Merge by Distance` Merges Nothing

`No vertices to merge` means **different UV0** even if positions match. Intentional — keeps UV seams safe. → [Edit](/guides/edit#거리로-병합)

Vertices with significantly different blend shape deltas also skip for the same reason.

## Script Saved and Window Reset

Session auto-restores. Check the console:

- `Easy Mesh Editor: restored auto-saved edit sessions ({0})`
- `Easy Mesh Editor: failed to restore {0} auto-saved session(s). The files were kept at: {1}`

If you had two windows open, only one restores. → [Autosave and Restore](/internals/session-and-undo#자동-저장과-복원)

## Baked but a Different File Appeared

Possibly multiple renderers using the same source mesh with unsaved scene.

> `The scene is not saved yet, so the renderer cannot be identified.`

Save the scene then `Bake` again. → [Provenance and Owner](/reference/output-files#provenance와-owner)

Or a different asset with the same name already existed, and we deliberately created a new path to avoid overwriting it.

## `Ctrl+Z` Cancelled the Edit

During a blend shape transaction, undo went past the edit start point.

> `Undo went back before '{0}' edit started, invalidating changes. Cancelled for safety.`

The baseline disappeared, so silent continuation would save wrong deltas. We cancel instead.

## Compile Error

Likely both DLL and source versions installed. Same class defined twice. Keep only one. → [Installation](/getting-started/installation)

## Still Not Working

Email `studioraming@gmail.com` with Unity version, render pipeline, product version, full Console log, and reproduction steps.
