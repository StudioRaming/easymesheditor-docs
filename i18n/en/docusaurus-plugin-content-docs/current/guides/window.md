---
id: window
title: Using the window
sidebar_position: 1
---

# Using the window

**After reading this page** you will know what each part of the window does, what the status badges mean, how to use the candidate list before loading, how to open the hint bar and the shortcut sheet in the Scene view, and how to read the save result table.


From top to bottom the window has the **header, tabs, target row, save row, and tab body**. The frame stays the same on every tab.

## Header and language

The header shows the product name and the version badge. When you report a problem, include this version number.

Choose the language from English / 한국어 / 日本語. When you change it, the window, the Scene view hints, and the tooltips are redrawn in the new language. When you first open the window, it follows the system language of the Unity Editor.

## Tabs

There are four tabs. Their names are the same as on screen.

| Tab | Page |
|---|---|
| `Shape` | [Shape](/guides/sculpt) |
| `Select & Move` | [Select & Move](/guides/edit) |
| `Shape Keys` | [Shape Keys](/guides/blendshape) |
| `Bone Weights` | [Bone Weights](/guides/weight-paint) |

`Ctrl+Tab` goes to the next tab, and `Ctrl+Shift+Tab` goes to the previous one.

`Shape Keys` and `Bone Weights` work only on `SkinnedMeshRenderer`. If you open them while only a plain `MeshRenderer` is loaded, the tab shows a notice that it cannot be used.

## Start card

Before you start editing, the window shows a start card with four steps.

1. Pick a target (select an object in the Hierarchy)
2. Load
3. Choose a mode (pick a tab)
4. Save Mesh

While Play Mode holds your edits, the start card says `Your edits are kept`; they come back when Play stops, and `Load` is unavailable in Play Mode.

## Easy start and Expert views

The window has two views: **Easy start** and **Expert**. Easy start shows the settings you use most often first. Expert opens the detailed settings too. Edit values and work stay the same in either view. You can open the detailed settings from `Detailed settings`.

When you first open the window, **Easy start** is shown.

## Target row and Load candidates {#불러올-후보}

The `SkinnedMeshRenderer` and `MeshFilter + MeshRenderer` components inside the object you select in the Hierarchy are found as **Load candidates**. Each row of the list shows the name, the vertex count, the key count, and any warnings.

- Click a row to load only that renderer.
- Clear the selection and press `Load` to load all candidates.
- A mesh with Read/Write turned off appears greyed out in its candidate row. Turn on the importer setting with the `Enable Read/Write` button in the status line, then press `Load`. → [Installation](/getting-started/installation#7-메쉬가-readwrite-꺼짐이라면)
- Renderers that share one source mesh are each loaded and edited separately. Each renderer's result is saved separately.

If you loaded several meshes, use the `Active target` selector to choose the target that `Shape Keys` and `Bone Weights` apply to. → [Multiple meshes](/guides/multi-mesh#활성-대상)

## Status badges {#상태-배지}

| Badge | Meaning |
|---|---|
| `SAVED` | Nothing has changed since `Load` |
| `UNSAVED` | There are unsaved edits |
| `EDITING KEY` | A shape key edit is in progress and not confirmed yet |

In a narrow window the badge is shortened. The full text stays in the tooltip.

## Save row

The save row has two save actions. They do different things.

| Button | What it does |
|---|---|
| `Save as New Key` | Stores only the change you added to the base shape as a new shape key. The session continues. Enter the key name in `Shape key name (optional)` |
| `Save Mesh` | Saves the whole Work Mesh as a mesh asset and ends the session |

`Save Mesh` is the button to press once, when all the work is done. `Save as New Key` does not change the asset yet. Both buttons are disabled while a shape key edit is not confirmed. → [Shape Keys](/guides/blendshape#빠른-캡처와-bake)

For a mesh with no shape keys, the key name field and the `Save as New Key` button are hidden.

## Shape key edit bar

While you create or edit a shape key, a bar fixed at the top of the window appears. Use it to press `Save` (confirm the key edit) or `Cancel Key Edit`. The bar is visible on every tab.

- `Enter` saves the key edit, but only while the tab that owns the edit is active.
- `Esc` cancels only the current stroke or size change. It does not discard the key edit.
- `Cancel Key Edit` asks for confirmation once if you have sculpted something.

## Status line

The status line at the bottom of the window shows the result of the last action and any guidance. The `Enable Read/Write` button also appears here.

## Recovery banner

If Unity closed unexpectedly, the window shows a recovery banner the next time it opens. Press `Restore` to return the session to the last checkpoint. `Discard` needs two presses within 5 seconds. A file that cannot be restored is not deleted. → [Session and undo](/internals/session-and-undo#크래시-대비)

The recovery banner tells the cases apart. If the scene file the edits were made in cannot be found (deleted, or not imported yet), the recovery files are kept and checked again when importing finishes. If the target objects are not in the open scenes, the edits cannot be restored and can only be removed with `Delete N edit(s)`, which needs a second press within 5 seconds and changes no scene or asset.

If the original mesh changed after the edit was preserved (a reimport or another tool changed its vertex count, vertex positions or weights), the edit is not restored over the changed mesh. It is saved as `<mesh name>_recovered.asset` beside the original, and the current mesh is left as it is. If it cannot be saved, the edit stays in the recovery files.

## Save options when the scene is unsaved

If the scene you are editing has never been saved, the window shows a notice. Press `Save Scene` in the notice to save the scene. Press `Discard edits` to throw the edit away. Objects in a scene that was never saved cannot keep their edits, so save the scene first. → [Session and undo](/internals/session-and-undo#자동-보존과-복원)

## Scene view hints and shortcut sheet {#단축키-시트}

A line of hints for the current tab appears at the top of the Scene view. Press `Keys` at the right end of the hint bar to open the full shortcut table for the current tab and the common shortcuts. Press it again to close the table. The window also has a button that opens the same shortcut sheet.

Shortcuts do not work while you type in a text field, and they do not change Unity's global Shortcut profile. The full list is on the [Shortcuts](/reference/shortcuts) page.

The hints, the tool panels, and the shortcut sheet are drawn above the Unity 2021.2 and newer Scene view overlay. On 2019.4 and 2020 they are drawn the older way.

## Save result table {#저장-결과표}

When you run `Save Mesh` on several meshes together, a foldable result table lists the success or failure and the save path for each target. A target that failed keeps its session open, so you can try again. Only the targets that succeeded are written as assets.

## Brush presets and Frame Selection

Below the brush settings on `Shape` and `Bone Weights` there are preset slots. Click an empty slot to save the current brush. Click a saved slot to load it. `Frame Selection` (numpad `.`) fits the mesh being edited into the Scene view.
