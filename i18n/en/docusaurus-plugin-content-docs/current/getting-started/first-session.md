---
id: first-session
title: First editing session
sidebar_position: 2
---

# First editing session

**After reading this page** you can go all the way from choosing a target to `Save Mesh`. You will also know how to pause edit input with `Tab` and how to undo everything with `Discard edits`.

## 1. Select and `Load`

1. In the Hierarchy, select one or more objects to edit. Child `SkinnedMeshRenderer` and `MeshFilter + MeshRenderer` components are found too.
2. Open `StudioRaming > Easy Mesh Editor`.
3. The start card shows the order `Pick target → Load → Choose mode → Save Mesh`. When the target row shows the number of renderers found, press `Load`.

To see which renderers were found before you load, expand the `Load candidates` list. Each row shows the name, the vertex count, the key count, and any warnings. Click a row to load only that renderer. Clear the selection to load every candidate. → [Using the window](/guides/window#불러올-후보)

When loading finishes, the editing state starts. From this point the renderer uses the Work Mesh, not the source asset.

## 2. Edit

Pick a tab and work.

| What you want to do | Tab |
|---|---|
| Pull or inflate the surface | `Shape` → [page](/guides/sculpt) |
| Move vertices or delete faces | `Select & Move` → [page](/guides/edit) |
| Make a shape key | `Shape Keys` → [page](/guides/blendshape) |
| Paint bone weights | `Bone Weights` → [page](/guides/weight-paint) |

You can move between tabs freely. Use `Ctrl+Tab` for the next tab and `Ctrl+Shift+Tab` for the previous one. Selection, masks, and undo history stay when you switch tabs.

Undo uses `Ctrl+Z`. One brush stroke, one gizmo drag, one weight operation, and one structural change are each one undo step. → [Session and undo](/internals/session-and-undo)

## 3. `Tab`: pause editing

Sometimes you want only to move the camera in the Scene view, but clicks keep selecting things. Press `Tab` to turn off edit input. The session stays alive.

To turn editing back on, press `Tab` again, or press the start editing button shown in the Scene view.

:::note[`Tab` does not discard the session]
Only `Save Mesh` or `Discard edits` end the editing session. `Tab` is an input switch.
:::

## 4. Check the unsaved badge

The badge on the target row shows the current state.

| Badge | Meaning |
|---|---|
| `SAVED` | Nothing has changed since `Load` |
| `UNSAVED` | There are unsaved edits |
| `EDITING KEY` | A shape key edit is not confirmed yet |

While the badge shows `EDITING KEY`, `Save Mesh` is blocked. Use the bar pinned at the top of the window to press `Save` (confirm the key edit) or `Cancel Key Edit` first. → [Shape Keys](/guides/blendshape#기존-키-편집)

## 5. Finish with `Save Mesh`

When you are done, press `Save Mesh`.

- `<source name>_Edit.asset` is created next to the source, and the renderer switches to that asset.
- Vertices that no face uses are cleaned up once at this point.
- Only meshes that changed are saved. A mesh with no changes is skipped, and the confirmation names how many are skipped. If no mesh changed, the window says `Nothing to save: no mesh was changed. The session stays open.` and the session stays open.
- The session ends. To keep working, press `Load` again.

If you edited several meshes together, a result table appears for each target. A session whose save failed stays open, so you can fix the cause and try again. → [Generated files](/reference/output-files)

:::caution[`Save Mesh` is for the last step]
If you need an intermediate save, use `Save as New Key`. It does not end the session, and it does not change the asset yet. → [Quick capture in Shape Keys](/guides/blendshape#빠른-캡처와-bake)
:::

## 6. `Discard edits`: throw everything away

`Discard edits` throws away the whole current edit and returns the renderer to the source mesh. It asks for confirmation first. In the confirmation dialog, `Enter` and `Esc` both keep your work. Only the button that names the action runs it. A mesh already written by `Save Mesh` is not deleted.

Closing the window or entering Play Mode does not ask about unsaved edits. They are kept. In Play Mode the source mesh is shown, and the edits come back when you return to edit mode. → [Session and undo](/internals/session-and-undo#자동-보존과-복원)
