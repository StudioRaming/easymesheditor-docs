---
id: blendshape
title: BlendShape
sidebar_position: 4
---

# BlendShape

**After reading this document**, you'll know how to manage the expression key list, how to sculpt new keys and edit existing ones using transactions, how to use management features like mirroring and transferring keys, and the difference between `Save as New Key` and `Bake`.

:::note[SkinnedMeshRenderer only]
On regular `MeshRenderer` targets, you'll see `BlendShape is for SkinnedMeshRenderer only.` instead.
:::

## Key List {#목록}

The heading is `{0} blend shapes`. Each row has a name, value slider, and numeric input.

- Values range from `0~100` and update the preview in real-time.
- Drag the name or value left/right to change the value. Hold `Shift` for fine adjustment.
- `Reset All to 0` initializes everything at once.

Use the search box above the list to filter by name. `×` clears the search.

If no keys are shown: `No blend shapes to display. Try creating one with '+ New Shape'.`

### Row Buttons (Three Per Row)

| Button | What it does |
|---|---|
| `S` | Solo preview — show only this key at 100 (clear with `Esc`) |
| `L` | Lock against accidental changes |
| `M` | Generate mirrored key |

### Prefix Groups {#접두사-그룹}

Turn on `Group` to collapse the list by name prefix. `_` is the primary separator — `eye_blink` and `eye_wide` group under `eye`. Group headings are `{name} ({count})`.

### Expand Range {#확장-범위}

Turn on `Expand Range` to open the slider to `-100~200`. This is extrapolation and may break the shape — use it to preview, not to save as-is.

### Delta Heatmap {#델타-히트맵}

Turn on `Heatmap`, then click a key name in the list to see which vertices actually move for that key, color-coded. Status shows `Heatmap: '{0}' · max movement {1}`.

If no key is chosen: `To see heatmap, click a key name in the list to select it.`

### Solo Preview {#솔로-프리뷰}

Press `S` in a row to see only that key at 100. Other key values recede visually. Clear with `Esc`.

While in solo, you can't batch-change multiple keys: `Cannot batch-change weights during solo preview. Clear the solo first.`

### Lock {#잠금}

Press `L` in a row to lock that key. Attempting to change a locked key shows: `'{0}' key is locked. Press 'L' in its row to unlock and change it.` Locks are respected in batch operations and key transfers.

## Batch Select Multiple Keys {#다중-선택}

Click a name to select it. `Ctrl`/`Shift`+click to select multiple. `Shift`+range select is based on visible rows. Selection count displays as `{0} selected`.

| Button | What it does |
|---|---|
| `Set Value` | Apply the same value to all selected keys |
| `Set to 0` | Set selected keys to 0 |
| `Lock` / `Unlock` | Lock or unlock selected keys |
| `^` / `v` | Move order up/down |
| `Delete` | Delete selected keys |
| `Deselect` | Clear selection only |

Delete asks: `Delete {0} selected key(s)? One `Ctrl+Z` undoes everything.` Batch structural changes are one undo step.

If all selected keys are locked: `All selected keys are locked; nothing changed.` If it fails midway: `Batch failed, reverted all meshes to pre-operation state.`

## Sculpt New Shape {#새-쉐이프-조형}

`+ New Shape (N)` or press `N` in the Scene view.

Sculpting starts from the current absolute form. A `Sculpting new shape: {0}` banner appears over the Scene view.

- Drag = grab, `Shift` = smooth
- `F` = radius, `Shift+F` = strength
- `Enter` = `Commit New Shape (Enter)`, `Esc` = `Cancel (Esc)`

Set the name in the `Name` field. If there are invalid characters, it sanitizes them: `Replaced unusable characters (/ \ newline tab) with '_' and saved as '{0}'.`

## Edit Existing Key {#기존-키-편집}

Press the edit button in a row to load that key's **100% end-frame form** in solo preview and start an edit transaction. The window badge becomes `IN TRANSACTION` and a `Editing shape: {0}` bar pins to the Scene view.

During a transaction, you can move to `Sculpt` or `Edit` tabs to work (`multi-tab edit`). The window guides: `Switch to Sculpt or Edit tab to modify, then return here to save. Operations that change vertex count (like delete or separate) cannot be committed.`

To finish, choose one from the pinned bar:

- `Commit Changes to '{0}' (Enter)` — commit to the session
- `Cancel (Esc)` — discard

:::caution[Committing here doesn't write the asset yet]
As the window says: `Commitment here saves shape changes to the work session only. After finishing all work, press Bake at the top to write to the mesh asset.`
:::

Pressing save without committing returns you to the BlendShape tab with: `'{0}' shape is still being edited. Commit or cancel the current changes, then save the asset.`

### Keys With Multiple Frames {#다중-프레임}

Editing a key with 2+ frames shows a warning: `This key has {0} frames. Only the final frame (100%) will be edited.`

Saving reports: `{0} intermediate frame(s) updated proportionally to the final frame's change. There's no per-frame edit feature.` → [Limitations](/limitations)

### Undo Goes Before Edit Start

If `Ctrl+Z` goes past the point where editing started, the transaction fails. The tool auto-cancels and tells you: `Undo went back before '{0}' edit started, invalidating changes. Cancelled for safety.` Redo follows the same rule.

## Direct Edits to the Base {#기본형-직접-수정}

Changing the mesh in `Sculpt` or `Edit` without selecting a key is a base edit. The BlendShape tab shows `Detected direct base edits — save as new key` and gives you two buttons:

- `Commit as New Key` — make that change into a new key
- `Revert Base Edits` — asks `Undo all edits made without a selected key?`

Pressing `Bake` in this state asks you to choose between `Bake into Base` and committing as a new key.

## Management {#관리}

| Button | What it does |
|---|---|
| `Rename` | Change the name |
| `Duplicate` | Create another key with the same content (`_Copy`) |
| `Revert` | Create a reversed key (`_Revert`). Use when recovering the original expression on an avatar whose base changed |
| `Delete` | Asks `Delete '{0}' shape? Undo with Ctrl+Z.` |
| `^` / `v` | Move order |

If multiple keys have the same name: `Multiple keys with that name exist in this mesh (e.g., '{0}'). Editing affects only the item you clicked.`

### Merge Applied Values {#적용값-합치기}

`Merge Applied Values` combines the **visible result** of all non-zero keys into a single new 100% key, then resets the original keys used to 0. It calculates interpolation and extrapolation of multi-frame keys.

### Mirror Key {#미러-키}

Press `M` in a row, or set `Mirror Axis` and execute. Result: `Created mirrored key '{0}' across {1} axis.`

The name flips left/right notation in the original. Rules in order:

| Original | Mirrored |
|---|---|
| `...Left...` | `...Right...` (case-insensitive match too) |
| `xxx_L` | `xxx_R` |
| `L_xxx` | `R_xxx` |
| `xxx.L` | `xxx.R` |
| No L/R marker | `xxx_Mirror` |

Vertex pairing uses the same spatial matching as `Sculpt`/`Edit` symmetry. Unmatched vertices are only reflected if on the symmetry plane; otherwise they don't move. Normal deltas get the same reflection, and all frames are mirrored if there are multiple.

If no match is found: `Could not create mirrored key for '{0}'. Symmetry match not found or mesh is invalid.`

### Import Keys From Another Mesh {#키-전송}

The `Import Keys from Another Mesh` section. Use when transferring expression keys from an avatar face to newly made hair or accessories.

1. Specify a `Source Mesh` — a list of its keys appears.
2. Check which keys to import. `Select All` / `Clear All` available.
3. Set `Max Distance` — pairs are found within this distance.
4. Press `Import`.

Result: `Imported {0} keys. {1} vertices found no match — try increasing max distance.`

| Situation | Message |
|---|---|
| Specifying the mesh you're editing as source | `Cannot use the currently editing mesh as source. Specify another mesh.` |
| Source has Read/Write off | `Source mesh has Read/Write disabled; cannot read vertices.` |
| Source has no keys | `This source mesh has no blend shapes.` |
| Same name already exists | `{0} keys with that name exist already. Replace with imported content?` |
| Mix of locked keys | `Skipped {0} locked key(s).` |

If it fails: `Import failed, reverted all meshes to pre-operation state.`

## Quick Capture vs Bake {#빠른-캡처와-bake}

Both save, but do different things.

| | `Save as New Key` | `Bake` |
|---|---|---|
| Saves | Changes added to base only as new key | Entire Work Mesh (vertices, weights, key structure) |
| Asset | Unchanged | Creates `<original>_Edit.asset` |
| Session | Continues | Ends |
| Base | Preserved | Current state as-is |

`Save as New Key` doesn't mix the currently played blend shape values. The saved key stays at 100, preserving the current look, and the next capture baseline updates so the previous change isn't saved twice.

As the window explains: `Base stays intact. New key is set to 100 to keep the current look, and won't be included in the next capture.`

If there's nothing to capture: `No additional base deformation to capture.`

## Multiple Meshes {#다중-메쉬-키}

All targets must be `SkinnedMeshRenderer` — otherwise: `All selected targets must be SkinnedMeshRenderer to edit blend shapes together.`

The list shows only **keys with the same name on every target** (`{0} common blend shapes · {1} meshes`). Indices can differ. Values, editing, and management apply to all meshes simultaneously.

If there are no common keys: `No blend shapes common to all selected meshes. New shapes are added with the same name to all.` → [Multiple Meshes](/guides/multi-mesh)
