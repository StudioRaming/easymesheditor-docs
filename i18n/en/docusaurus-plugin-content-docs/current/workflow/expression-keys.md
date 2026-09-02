---
id: expression-keys
title: Making Expression Keys
sidebar_position: 2
---

# Making Expression Keys

**After reading this document**, you can create new expression keys through symmetric mirroring, manage the list with groups and locks, and follow the steps to verify they're made correctly.

Assumption: you've `Load`ed a `SkinnedMeshRenderer` and are on the `BlendShape` tab.

## Steps

1. [Set base state](#1-기준-상태-만들기)
2. [Sculpt one side only](#2-한쪽만-조형)
3. [Make the other side with Mirror Key](#3-미러-키로-반대쪽-만들기)
4. [Organize with groups and locks](#4-그룹과-잠금으로-정리)
5. [Verify](#5-확인)
6. [Save](#6-저장)

## 1. Set Base State {#1-기준-상태-만들기}

New keys start from **the absolute shape now visible on screen.** If other keys are on, you sculpt on top of that shape.

Press `Reset All to 0` to zero out all keys before starting. Only intentionally turn some on if you're making a key on top of a specific expression.

## 2. Sculpt One Side Only {#2-한쪽만-조형}

`+ New Shape (N)` or press `N` in the Scene view.

When you see the `Sculpting new shape: {0}` banner, start sculpting.

- Drag = grab, `Shift` = smooth
- `F` = radius, `Shift+F` = strength

Put a left/right-marked name in the `Name` field. The mirror step next will flip this name.

| Name Example | Mirror Result |
|---|---|
| `eye_close_L` | `eye_close_R` |
| `L_brow_up` | `R_brow_up` |
| `smileLeft` | `smileRight` |
| `cheek_puff` | `cheek_puff_Mirror` |

Press `Enter` for `Commit New Shape (Enter)`, or `Esc` if you don't like it.

:::note[Committing here doesn't write the asset yet]
Committing here **commits to the session only.** The mesh asset gets it at `Bake`. → [BlendShape](/guides/blendshape#기존-키-편집)
:::

If you don't like the sculpt, you can touch it up. Press the edit button for that key in the list to load its 100% shape and continue sculpting. You can switch to `Sculpt` or `Edit` tabs to work (`multi-tab edit`), then return and press `Commit Changes to '{0}' (Enter)`. However, **operations that change vertex count (delete, separate) cannot be saved.**

## 3. Mirror Key for the Other Side {#3-미러-키로-반대쪽-만들기}

Press `M` in the row of the key you just made. `Mirror Axis` is usually X.

> `Created mirrored key '{0}' across {1} axis.`

Left-right topology doesn't need to be perfect. It finds pairs by spatial position, and only vertices on the symmetry plane are reflected if they have no pair.

If it doesn't create, symmetry pairing failed — `Could not create mirrored key for '{0}'.` If the mesh is inherently asymmetric, sculpt the other side by hand.

## 4. Organize with Groups and Locks {#4-그룹과-잠금으로-정리}

Once you have 20+ keys, the list gets long.

- Turn on `Group` to collapse by name prefix. Stick to prefixes like `eye_`, `mouth_`, `brow_` and management becomes easy.
- Lock completed keys with `L` in the row. Locked keys are excluded from batch value changes, deletion, and transfer to other meshes.

Select multiple keys with `Ctrl`/`Shift` click and lock them all at once with `Lock` — `Locked {0} keys.`

To reorder, select and use `^` / `v`. Moving multiple keys is one undo step.

## 5. Verify {#5-확인}

Check that your keys move only where intended.

1. Press `S` in the row for [Solo Preview](/guides/blendshape#솔로-프리뷰). That key alone shows at 100.
2. Turn on `Heatmap` and click that key. Vertices with actual delta show colored — `Heatmap: '{0}' · max movement {1}`
3. If unintended areas lit up, your brush radius was too wide during sculpting. Go back to edit and refine.
4. Press `Esc` to clear solo.

Turn on `Expand Range` to push to `-100~200`. Use this to see if the shape breaks when exaggerated; don't save those values as-is.

## 6. Save {#6-저장}

Two paths:

- **`Bake`** — bake the entire mesh with key structure to `<original>_Edit.asset` and end the session.
- **`Save as New Key`** — keep the base and save only the changes added this time as a new key, continue session.

Key-making usually uses `Bake`. `Save as New Key` is for "I sculpted to change the shape, want to keep the base as-is, and save only this change as a key." → [Quick capture vs Bake](/guides/blendshape#빠른-캡처와-bake)

## Recover an Original Expression

After changing the base, you sometimes need the original face back. The `Revert` button in that key's row creates a reversed key (`_Revert`).

To lock in the current look of multiple keys turned on, use `Merge Applied Values`. The result of keys now non-zero becomes a new 100% key, and the keys used get their values reset to 0.
