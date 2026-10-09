---
id: expression-keys
title: Making shape keys
sidebar_position: 2
---

# Making shape keys

**After reading this page** you will be able to sculpt a new shape key, extend it left and right with a mirror key, organize the list with groups and locks, and check that the key was made correctly.

Assumptions: a `SkinnedMeshRenderer` is loaded, and you are on the `Shape Keys` tab.

## Sequence

1. [Set the base state](#1-기준-상태-만들기)
2. [Sculpt one side](#2-한쪽만-조형)
3. [Make the other side with a mirror key](#3-미러-키로-반대쪽-만들기)
4. [Organize with groups and locks](#4-그룹과-잠금으로-정리)
5. [Check](#5-확인)
6. [Save](#6-저장)

## 1. Set the base state {#1-기준-상태-만들기}

A new key starts from the **absolute shape you see on screen now**. If other keys are on, you sculpt on top of that shape.

Press `Set all values to 0` to bring every key down to 0 before you start. Leave keys on only when you want to build a key on top of a specific expression.

## 2. Sculpt one side {#2-한쪽만-조형}

Press the new-key button, or press `N` in the Scene view.

When a bar shows that a key is being sculpted, the sculpting has started.

- Drag: grab
- `Shift`: Smooth
- `F`: radius, `Shift+F`: strength

Enter a name in the `Shape key name` field that shows left and right clearly. The mirror step in the next section flips this name.

| Example name | Mirror result |
|---|---|
| `eye_close_L` | `eye_close_R` |
| `L_brow_up` | `R_brow_up` |
| `smileLeft` | `smileRight` |
| `cheek_puff` | `cheek_puff_Mirror` |

Press `Enter` to confirm the new key, or `Esc` to cancel if you are not happy with it.

:::note[Confirming does not change the asset yet]
Confirming here is a **session** confirmation. The mesh asset is updated only when you press `Save Mesh`. → [Shape Keys](/guides/blendshape#기존-키-편집)
:::

If you are not happy with the sculpt, you can edit it again. Press the edit button on the key's row to load its 100% shape, and continue sculpting. You can also move to `Shape` or `Select & Move` while you work (multi-tab editing), then come back and finish with `Save`. You cannot save an edit that changes the vertex count (delete or separate).

## 3. Make the other side with a mirror key {#3-미러-키로-반대쪽-만들기}

Press `M` on the row of the key you just made. The mirror axis is usually X.

The left and right topology does not have to match exactly. The tool finds pairs by spatial matching. A vertex with no partner is mirrored only if it lies on the symmetry plane.

If the mirror key is not created, the tool could not find a symmetric partner. If the mesh is asymmetric from the start, you must sculpt the opposite side by hand.

## 4. Organize with groups and locks {#4-그룹과-잠금으로-정리}

When you have more than about twenty keys, the list gets long.

- Turn on `Group` to fold the list by name prefix. If you decide on prefixes such as `eye_`, `mouth_`, or `brow_`, the list is easier to manage.
- Lock a finished key with `L` on its row. Locked keys are left out of bulk value changes, deletion, and key import from another mesh.

You can also select several keys with `Ctrl` or `Shift` + click, and lock them all at once.

To reorder, select the keys and press `^` / `v`. Moving several keys is also one undo step.

## 5. Check {#5-확인}

Check that the key moves only where you intended.

1. Press `S` on the row to turn on the [solo preview](/guides/blendshape#솔로-프리뷰). Only that key is shown at 100.
2. Turn on `Heatmap` and click the key. The vertices that actually move are shown in color.
3. If a wrong area is colored, the brush radius was probably too wide when you sculpted. Go back to editing and refine it.
4. Press `Esc` to clear solo.

Turn on `Extended range` to push the slider to `-100` to `200`. Use it to check that the shape does not collapse when exaggerated. Do not save at those extreme values.

## 6. Save {#6-저장}

There are two choices.

- **`Save Mesh`**: bakes the whole mesh, including the key structure, to `<source name>_Edit.asset`, and ends the session.
- **`Save as New Key`**: stores only the change you added to the base shape as a new key, and continues the session.

When you are making keys, `Save Mesh` is usually the one to press. `Save as New Key` is for when you changed the shape with `Shape`, want to keep the base mesh as it is, and want to keep only this change as a key. → [Quick capture and Save Mesh](/guides/blendshape#빠른-캡처와-bake)

## Restoring an existing expression

After you change the base shape, you may need the original face again. The `Reverse` button on that key's row creates a reversed key (`_Revert`).

To lock the current look into one key, use `Merge applied values`. The results of all keys that are not 0 become one new key at 100, and the source keys return to 0.
