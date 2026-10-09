---
id: blendshape
title: Shape Keys
sidebar_position: 4
---

# Shape Keys

**After reading this page** you will know how to work with the shape key list, how to create a new key and edit an existing one, how to use the management tools such as mirror keys, importing keys, and merging applied values, and how `Save as New Key` differs from `Save Mesh`.

:::note[`SkinnedMeshRenderer` only]
This tab cannot be used with a plain `MeshRenderer` target. A notice appears instead.
:::

## List {#목록}

Each row has a name, a value slider, and a number field.

- Values run from `0` to `100`, and the preview updates in real time.
- Drag the name or the value left and right to change the value. Hold `Shift` for fine adjustment.
- `Set all values to 0` resets every key at once.

Use the search box above the list to filter by name.

### Row buttons

| Button | What it does |
|---|---|
| `S` | Solo preview. Shows only that key at 100. Press `Esc` to clear |
| `L` | Lock, to prevent accidental changes |
| `M` | Create a mirror key |

### Prefix groups {#접두사-그룹}

Turn on `Group` to fold the list by name prefix. `eye_blink` and `eye_wide` are grouped under `eye`. Prefixes such as `vrc.v_` and `mouth_` are detected automatically.

### Extended range {#확장-범위}

Turn on `Extended range` to open the slider up to `-100` to `200`. This is extrapolation, so the shape can break. Use it to check how far a shape can be pushed, and do not save the extreme value.

### Delta heatmap {#델타-히트맵}

Turn on `Heatmap`, then click a key name in the list. The vertices that key actually moves are shown in color. If no key is selected, the window shows a hint to select one.

### Solo preview {#솔로-프리뷰}

Press `S` on a row to view that key alone at 100. The other keys are only set aside on screen for the moment. Press `Esc` to clear.

While solo is on, you cannot change several key values at once. Clear solo first.

### Lock {#잠금}

Press `L` on a row to lock the key. Locked keys are left out of editing, value changes, batch operations, and key import. To change the key, press `L` again to unlock it. The lock state is stored per project.

## Several keys at once {#다중-선택}

Click a name to select it. Hold `Ctrl` or `Shift` while you click to select several keys. Batch operations on the selected keys include:

- Set the same value, or set them to 0
- Lock and unlock
- Move up or down in the order
- Delete

A batch operation is one undo step in Unity. If you press the wrong button, `Ctrl+Z` undoes all of it. If every selected key is locked, nothing changes.

## Create a new key {#새-쉐이프-조형}

Press the new-key button on the Shape Keys tab, or press `N` in the Scene view. Sculpting starts from the absolute shape you see now, and a bar shows that a key is being created.

- Drag: grab
- `Shift`: Smooth
- `F`: radius, `Shift+F`: strength
- `Enter`: save the new key, `Esc`: cancel the stroke

Set the name in the key name field. A `/` or a line break in a key name is replaced with `_` when it is saved.

## Edit an existing key {#기존-키-편집}

Edit a key in the list, and the tool loads that key's **shape at 100% on its last frame** as a solo preview. The badge changes to `In transaction`, and a bar pinned to the window appears.

You can move to `Shape` and `Select & Move` while the edit is open. When you finish, choose one of these in the pinned bar.

- `Save`: confirm the key edit in the session.
- `Cancel Key Edit`: discard the edit. If you have sculpted something, the tool asks once more.

:::caution[Confirming here does not change the asset yet]
A key edit that you save is confirmed only inside the session. It reaches the mesh asset when you press `Save Mesh`.
:::

If you press `Save Mesh` or `Save as New Key` without confirming the key edit, the save is blocked, and the window asks you to finish the edit first. Operations that change the vertex count (delete and separate) cannot be saved while a key edit is open.

`Esc` cancels only the current stroke and keeps the key edit. After you save or cancel a key edit, the stroke steps from that edit are removed from the `Ctrl+Z` list, so no empty undo step is left behind.

### Multi-frame keys {#다중-프레임}

If a key has two or more frames, the window warns you when you edit it. Only the last frame (100%) is edited.

When you save, the middle frames are updated in proportion to the change in the last frame. There is no way to edit the middle frames one by one. → [Limitations](/limitations)

### When undo goes back before the edit started

If `Ctrl+Z` goes back earlier than the point where the key edit started, the edit loses its reference point. In that case the tool cancels the edit automatically and tells you. This prevents a wrong delta from being saved.

## Base shape edited directly {#기본형-직접-수정}

If you change the mesh in `Shape` or `Select & Move` with no key selected, you have edited the base shape. The Shape Keys tab offers two choices.

- `Confirm as new key`: turns the change into a new key.
- `Revert base shape edits`: restores the base shape to its state before the edit.

If you press `Save Mesh` in this state, the window asks again whether to bake into the base shape or to confirm as a new key.

## Management {#관리}

| Button | What it does |
|---|---|
| Name | Renames the key |
| Duplicate | Creates a copy of the key (`_Copy`) |
| Reverse | Creates a reversed key (`_Revert`). Use it to get back an original expression after the base shape changed |
| Delete | Deletes the key. `Ctrl+Z` brings it back |
| `^` / `v` | Moves the key up or down |

If several keys share the same name, only the one you clicked in the list is edited.

### Merge applied values {#적용값-합치기}

`Merge applied values` combines the **visible result** of all keys that are not 0 into one new key at 100. The source keys are set back to 0. It also calculates the interpolation and extrapolation of keys that have several frames.

### Mirror key {#미러-키}

Press `M` on a row, choose the mirror axis (usually X), and run it. The tool creates the opposite-side key.

The name is made by flipping the left and right marker in the original name.

| Original name | Mirror name |
|---|---|
| `...Left...` | `...Right...` (case-insensitive matching is also tried) |
| `xxx_L` | `xxx_R` |
| `L_xxx` | `R_xxx` |
| `xxx.L` | `xxx.R` |
| No left/right marker | `xxx_Mirror` |

Vertex pairs are found with the same spatial matching as symmetry on `Shape`. A vertex with no partner is mirrored only if it lies on the symmetry plane. Other vertices do not move. Normal deltas are mirrored the same way, and when a key has several frames, every frame is mirrored.

If no pair is found, no mirror key is created. If the mesh is asymmetric from the start, you must sculpt the other side by hand.

### Import keys from another mesh {#키-전송}

Use this section to move the shape keys of a face mesh to another mesh, such as a new hair or prop. It uses proximity mapping to find matching points.

1. Choose `Source mesh`. Its key list appears.
2. Check the keys to import. `Select all` and `Clear all` are available.
3. Set `Max distance`. Matching points are searched within this distance.
4. Press `Import`.

Vertices that find no match stay where they are. If many vertices are left out, increase the max distance. Locked keys are skipped. If a key with the same name already exists, the tool asks whether to replace it.

If the import fails, the tool restores every mesh to its state before the operation.

## Quick capture and Save Mesh {#빠른-캡처와-bake}

Both are saves, but they do different things.

| | `Save as New Key` | `Save Mesh` (Bake) |
|---|---|---|
| What is saved | **Only the change added** to the base shape, as a new key | The **whole** Work Mesh (vertices, weights, key structure) |
| Asset | Not changed yet | Creates `<source name>_Edit.asset` |
| Session | Continues | Ends |
| Base shape | Left as it is | Saved as it is now |

`Save as New Key` does not mix the shape you see through the current blend shape values into the key. The saved key is turned on at 100, so the current look is kept. The capture baseline is updated, so the same change is not saved twice.

If there is no change to capture, nothing is saved.

## Several meshes {#다중-메쉬-키}

When several meshes are edited together, every target must be a `SkinnedMeshRenderer`.

The list shows **only the keys whose names match on every target**. Indexes may differ. Values, editing, and management apply to all meshes at the same time. If there are no common keys, the list is empty, and a new key is added to every mesh under the same name. → [Multiple meshes](/guides/multi-mesh)

<!-- CONFIRM: MingToon Face Proxy is described in the 1.0 README but kept out of public copy until the MingToon public version and link status are confirmed (DRAFT_NOTES F4). -->
