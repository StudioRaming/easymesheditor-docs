---
id: first-session
title: Your First Session
sidebar_position: 2
---

# Your First Session

**After reading this document**, you can go from selection through `Bake` in one loop, learn how to temporarily turn off editing with `Tab`, and how to undo everything with `Revert`.

## 1. Select and `Load`

1. In the Hierarchy, select one or more objects to edit. It also finds `SkinnedMeshRenderer` and `MeshFilter + MeshRenderer` on children.
2. Open `StudioRaming > Easy Mesh Editor`.
3. Check that the target line shows `Selected: {0} renderer(s) (press Load)` and press `Load`.

If you want to see which renderers got picked up before `Load`, expand the `Load candidates` list. Each row shows vertex count, blend shape count, and warnings like `[shared source]` and `[no Read/Write]`. Click one row to load just that renderer. → [Using the Window](/guides/window#불러올-후보)

When `Load` finishes, the status under the header changes to `Editing: {0}`. From this moment on, the renderer is using the Work Mesh instead of the original.

## 2. Edit

Pick a tab and start working.

| What you want to do | Tab |
|---|---|
| Push or puff the surface | `Sculpt` → [docs](/guides/sculpt) |
| Move vertices or delete faces | `Edit` → [docs](/guides/edit) |
| Create expression keys | `BlendShape` → [docs](/guides/blendshape) |
| Paint bone weights | `Weight` → [docs](/guides/weight-paint) |

You can freely switch between tabs. Selections, masks, and undo history stay with you when you move tabs.

Undo is Unity's `Ctrl+Z` as usual. Each brush stroke, each gizmo transform, each weight edit, each structural change is one step. → [Session and Undo](/internals/session-and-undo)

## 3. `Tab` — Temporarily Turn Off Editing

Sometimes when you just want to rotate the camera in the Scene view, clicks keep registering as selection. Press `Tab` to turn off edit input only. The session stays alive.

While editing is off, the window tells you this:

> `Editing is temporarily off. Your work is preserved — use the 'Edit' toggle or the Scene-view 'Resume Editing' button to continue.`

To turn it back on, press `Tab` again, or press the `Resume Editing` button in the Scene view or the `Edit (Tab)` toggle in the window.

:::note[`Tab` does not discard the session]
The session only ends with `Bake` or `Revert`. `Tab` is an input switch.
:::

## 4. Check the Unsaved Badge

The badge in the header tells you the current state.

| Badge | Means |
|---|---|
| `SAVED` | Nothing has changed since `Load` |
| `UNSAVED` | There are edits that haven't been saved |
| `IN TRANSACTION` | Blend shape edits are still open and uncommitted |

If it says `IN TRANSACTION`, `Bake` is blocked. Use `Enter` (save) or `Esc` (cancel) in the pinned bar at the top to close it first. → [BlendShape](/guides/blendshape#기존-키-편집)

## 5. `Bake` to Save

Press `Bake` in the `Save All Changes` section.

- `<original>_Edit.asset` is created next to the original and the renderer switches to that asset.
- If any unreferenced orphan vertices remain, they are cleaned up at this point.
- The session ends. To continue working, you need to `Load` again.

If you edited multiple meshes together, a `Bake results ({0}/{1} succeeded)` table appears. Failed sessions are kept, so you can fix the cause and try again. → [Output Files](/reference/output-files)

:::caution[`Bake` once at the end]
The window will tell you to run it just once after you've finished your work. If you need intermediate saves, use `Save as New Key` (quick blend shape capture) instead — it doesn't end the session and hasn't written to the asset yet.
:::

## 6. `Revert` — Discard Everything

`Revert` asks `Discard all edits and restore the original. Continue?` then puts the renderer back on the original mesh. It doesn't delete the asset you already made with `Bake`.

If you just close the window or try to enter Play Mode without saving, and there are unsaved edits, it will ask you to `Bake` / `Discard` (or `Cancel` for Play Mode).
