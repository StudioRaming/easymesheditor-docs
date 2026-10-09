---
id: troubleshooting
title: Troubleshooting
sidebar_position: 90
---

# Troubleshooting

Look up the symptom. Most cases come down to one of three things: the session is not open yet, the tab does not match the target, or a shape key edit is still open.

## The window opens but you cannot do anything

| Check | What to do |
|---|---|
| The target row says no target is selected | Select an object that has a mesh renderer in the Hierarchy |
| You selected a target but editing has not started | You have not pressed `Load` yet |
| The window says that edit input is off | Press `Tab`, or press the start editing button in the Scene view |
| A notice appears instead of the tab body | That tab works only with `SkinnedMeshRenderer` |

## `Load` does not work

| Cause | What to do |
|---|---|
| No mesh renderer | Check that a renderer exists, including on child objects |
| Read/Write is off | Press `Enable Read/Write` in the status line, then press `Load` again |
| Renderers share one source mesh | They are now loaded and edited separately. Remove the ones you do not need from the candidate list |
| The source mesh is outside the `Assets` folder | Unity built-in meshes and package meshes are read-only, so `Save Mesh` cannot save them. Copy the mesh into the `Assets` folder, assign the copy to the renderer, then load it again |

## `Shape Keys` and `Bone Weights` tabs are disabled

Both tabs work only with `SkinnedMeshRenderer`. If you loaded several meshes together, **all** of them must be SMR for shape keys to be edited together.

## The `Save Mesh` button does not respond

Check whether the badge says `EDITING KEY`. If a shape key edit is not confirmed, both `Save Mesh` and `Save as New Key` are blocked. Press `Save` (confirm) or `Cancel Key Edit` on the pinned bar at the top of the window first. → [Shape Keys](/guides/blendshape#기존-키-편집)

## Nothing is drawn in the Scene view

| Cause | What to do |
|---|---|
| **Both shaders are missing** | Install `Editor/Shaders/EmeOverlay.shader` and `EmeSceneGL.shader` together. → [Installation](/getting-started/installation) |
| Edit input is off | Press `Tab` |
| You are trying to see hidden elements | Turn on X-Ray with `Alt+Z` |

## `Alt+click` rotates the camera instead of selecting an edge loop

This is intended. Loop selection happens only on a click that does **not move**. Press the mouse button where you want and release it with almost no movement. → [Select & Move](/guides/edit#엣지-루프와-엣지-링)

## `R` does a scale gizmo instead of rotate

`R` opens the rotate modal only when something is selected and the cursor is over the Scene view. If nothing is selected, or the cursor is over the window, `R` is Unity's scale gizmo.

## Pressing `X` `Y` `Z` in the Scene view does not turn on symmetry

Both `Shape` and `Select & Move` use `Alt+Shift+X` / `Y` / `Z` for the axis symmetry shortcuts. The plain keys stay as Unity's tool handle shortcuts. You can also turn symmetry on with the `Symmetry` checkboxes in the window. → [Shortcuts](/reference/shortcuts)

## Symmetry does not work on the opposite side

| Cause | What to do |
|---|---|
| The wrong axis is selected | Turn on `Plane` and check the plane position |
| The mesh is not symmetric to begin with | Vertices with no partner are left out of symmetry |

## Painting weights does nothing

| Cause | Message | What to do |
|---|---|---|
| No active bone | The tab asks you to choose a bone | Choose the bone with the radio button in the list |
| The bone is locked | The Scene view says the vertices were skipped because the target bone is locked | Release the `L` on the row |
| All four slots are full | Weak values are skipped, and the count is shown | Remove weight from another bone first, or check `Max Influences` |

## A weight transfer result is off everywhere

The transforms of the source and target differ. If the window shows a warning, turn on `Ignore source transform (match in bind-pose local space)` and run the transfer again. → [Bone Weights](/guides/weight-paint#전송-공간)

If only some vertices are off, raise `Max distance` a little. The out-of-range count goes down.

## A shape key's other frames look wrong after an edit

On a key with several frames, only the last frame (100%) is edited. The middle frames are updated **in proportion** to that change. There is no way to edit the middle frames one by one. → [Limitations](/limitations)

## Deleting faces did not reduce the polygon count

The vertex cleanup runs once, during `Save Mesh`. The live mesh's indexes are not changed while you edit. If the count does not drop after saving, the cleanup was skipped. Search the Console for the message about a non-triangle submesh or a blend shape with the same name. → [Cleanup of unused vertices](/internals/bake#고아-정점-정리)

## `Merge by Distance` merges nothing

If the message says there are no vertices to merge, the vertices in question have **different UV0 values**, even though their positions match. This is intended. It keeps the UV seams intact. Vertices whose blend shape deltas differ a lot are excluded for the same reason. → [Select & Move](/guides/edit#거리로-병합)

## The window was reset after saving a script

The edit session is restored automatically. Check the Console for the restore message. A file that could not be restored stays in `Library/EmeAutoSave/`. If you had two windows open, only one of them is restored. → [Automatic keeping and restore](/internals/session-and-undo#자동-보존과-복원)

## `Save Mesh` created a different file than you expected

Several renderers may share the same source mesh while the scene was never saved. The tool then cannot tell the renderers apart.

> The scene has not been saved, so the renderers cannot be identified.

Save the scene and run `Save Mesh` again. → [Provenance and owner](/reference/output-files#provenance와-owner)

If an asset with the same name already existed, the tool created a new path on purpose so it would not overwrite that asset.

## `Ctrl+Z` cancelled the edit

During a shape key edit, undo went back earlier than the start of the edit. The reference point is gone, and continuing would save a wrong delta, so the tool cancels the edit instead. → [Session and undo](/internals/session-and-undo#되돌리기가-편집을-무효로-만들-때)

## Compile errors

The DLL edition and the source edition are probably installed together, so the same class is defined twice. Keep only one of them. → [Installation](/getting-started/installation#4-dll판과-소스판을-함께-넣지-마세요)

## Still not working?

Email `studioraming@gmail.com` with your Unity version, render pipeline, product version, the full Console log, and the steps to reproduce.
