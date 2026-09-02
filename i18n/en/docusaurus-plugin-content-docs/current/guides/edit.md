---
id: edit
title: Edit
sidebar_position: 3
---

# Edit

**After reading this document**, you'll know how to select vertices/edges/faces, the difference between gizmos and Blender-style modal transforms, how to select edge loops with Alt+click, and all Edit tab operations: hiding, pivot, normals, merge, and separate.

## Element Mode {#요소-모드}

| Button | Key |
|---|---|
| `Vertex (1)` | `1` |
| `Edge (2)` | `2` |
| `Face (3)` | `3` |

Selection state displays as `Selection — {0} verts · {1} edges · {2} faces`.

## Selection {#선택}

| Operation | Result |
|---|---|
| Click | Replace selection |
| `Shift`+click or `Ctrl`+click | Toggle |
| Double-click or `L` | Select entire connected component under cursor (`Linked Select (L)`) |
| `Shift+L` | Deselect connected component |
| `B` or drag in empty space | Box select (`Shift`=add, `Ctrl`=remove) |
| `A` / `Alt+A` | `Select All (A)` / `Deselect (Esc)` |
| `Ctrl+I` | `Invert (Ctrl+I)` |

Press `B` and the window tells you: `Ready for box select — drag in Scene view · Shift=add · Ctrl/Cmd=remove · Esc/B=cancel`. Box select also catches triangles that intersect the rectangle's edge.

:::note[UV seam vertices are selected together]
Unity meshes are split into multiple vertices at the same position at UV boundaries. Selection grabs the whole group based on position, so when you click one point on screen, several vertices actually move together behind the scenes. → [Weld Groups](/internals/session-and-undo#웰드-그룹)
:::

When X-Ray (`Alt+Z`) is off, occluded elements don't show or select. When on, it penetrates and selects through to the back.

### Edge Loops and Edge Rings {#엣지-루프와-엣지-링}

- `Alt+click` (release without dragging) — edge loop
- `Ctrl+Alt+click` — edge ring
- Both add to selection with `Shift`

:::caution[`Alt+drag` still rotates the scene as usual]
To preserve Unity's scene rotation, loop selection only happens on **click without dragging.** If you hold `Alt` and drag even a little, the camera rotates normally.
:::

Loops and rings stop at poles and boundaries.

### Expand and Shrink Selection

- `Ctrl` + `+` — `Expand Selection (Ctrl++)`
- `Ctrl` + `-` — `Shrink Selection (Ctrl+-)`

Numpad `+` `-` also work.

## Gizmo {#기즈모}

| Button | Key |
|---|---|
| `View (Q)` | `Q` |
| `Move (W)` | `W` |
| `Rotate (E)` | `E` |
| `Scale (R)` | `R` |

Same layout as Unity's default tools. Even on skinned meshes with bones, it safely applies inverse skin deformation, so you can drag the pose-locked mesh as it appears on screen.

If you select elements from multiple meshes, a single shared gizmo in world space transforms them together. → [Multiple Meshes](/guides/multi-mesh)

## Modal Transform {#모달-변형}

Blender-style `G` / `R` / `S`. Press in the Scene view with a selection and the transform starts with the mouse alone.

| Key | Operation |
|---|---|
| `G` | `Move (G)` |
| `R` | `Rotate (R)` |
| `S` | `Scale (S)` |

During modal: `X/Y/Z=axis (twice=world) · Shift+axis=plane · number=exact value · Enter/LMB=confirm · Esc/RMB=cancel`

- Press the same axis key again to switch from local to world axis (`Local` / `World` displayed).
- `Shift+X` constrains to the plane excluding X (`Plane excluding {0}({1})`).
- Type a number for exact values. Rotation is in degrees.
- With multiple meshes, local axis isn't well-defined, so it falls back to `Multiple meshes → world axis`.

:::note[`R` does two things]
`R` is a rotation modal only when **you have a selection and the cursor is over the Scene view.** Otherwise, it works normally as Unity's `R` = Scale gizmo.
:::

One modal transform is one undo step. Symmetry and proportional editing apply exactly like gizmo transforms.

## Proportional Editing {#프로포셔널-편집}

Turn on `Proportional Editing (O)` and unselected nearby vertices smoothly follow within `Radius`. Falloff is a smooth curve.

- `Connected only` **on** — Uses topology distance. Overlapping other parts won't be pulled along.
- `Connected only` **off** — Uses spatial distance.

Adjust radius with `[` `]` (when proportional is off, the same keys adjust vertex display size).

Vertices darkened by [Mask Mode](/guides/sculpt#마스크-모드) are excluded from proportional influence.

## Symmetry

Combine `Symmetry` X / Y / Z. Scene view toggles are `Shift+Alt+X` · `Shift+Alt+Y` · `Shift+Alt+Z`.

Edit tab symmetry **does not expand selection.** It applies the transformation result of selected elements mirrored across the local axis. Central vertices on the mirror plane stay locked to the plane.

## Pivot {#피벗}

Choose the reference point for rotation and scale in `Pivot`. Applies to both gizmos and `G`/`R`/`S` modals.

| Mode | Reference |
|---|---|
| `Median Point` | Average position of selected elements |
| `Individual Origins` | Each element uses its own position |
| `Active Element` | The last selected element |
| `Bounding Box Center` | Center of the box containing the selection |

When handling multiple meshes, turn on `Per-mesh Uniform Pivot` and each mesh uses its own pivot.

## Hide {#숨기기}

| Button | Key |
|---|---|
| `Hide (H)` | `H` |
| `Hide Others (Shift+H)` | `Shift+H` |
| `Show All (Alt+H)` | `Alt+H` |

Hidden count displays as `Hidden {0} — Alt+H to show all`.

:::note[Hiding is not an undo target]
Hiding is a display state of the edit session, not mesh data. Like Blender, it's not a `Ctrl+Z` target, and automatically clears when structure changes (delete/separate/merge).
:::

## Normals {#노멀}

| Item | What it does |
|---|---|
| `Display Normals` | Draws normal directions in the Scene view. Adjust length with `Normal Length` |
| `Flip Normals` | Reverses the winding of selected faces |
| `Recalculate Normals` | Recalculates normals for selected vertices smoothly |

Results are reported as `Flipped {0} face(s)` · `Recalculated {0} vertex group(s)`.

Flipping also reverses normals and tangent deltas in blend shapes, so the inside surface won't get misaligned even on meshes with expression keys.

## Delete {#삭제}

`Delete Selection (X · {0} faces)` — `X`, `Delete`, `Backspace` all work. Removes selected faces.

After deletion, vertices used only by those faces remain in the vertex buffer. These orphan vertices are cleaned up when you `Bake`. → [Orphan Vertex Cleanup](/internals/bake#고아-정점-정리)

## Separate {#분리}

| Button | Key | Result |
|---|---|---|
| `Separate Selection (P)` | `P` | Detaches selected elements to a new object |
| `Separate by Islands (Shift+P)` | `Shift+P` | Separates selection into connected components and detaches each |

A `<original>_Part.asset` is created next to the original along with the separated object. → [Output Files](/reference/output-files)

Preserved: vertices, normals, tangents, UV0~UV3, colors, submesh·material correspondence, bindpose, bone weights, blend shape frames.

The entire separation is one undo step. If it fails midway, it rolls back to the original state with `Separate failed, reverted: {0}` and deletes any partially created `_Part.asset`.

:::caution[Separated parts are limited to 4 bone influences]
In Unity 2020.1+, if you separate a mesh with 5+ bone influences per vertex, the **detached part is limited to legacy 4-slot weights.** The original stays as is. → [Limitations](/limitations)
:::

## Merge by Distance {#거리로-병합}

In the `Vertex Merge` section, `Merge by Distance` combines duplicate vertices within `Merge Distance` into one. Use it to clean up duplicates left after delete or separate.

Results are reported as one of: `Merged {0} vertices` · `No vertices to merge` · `Merge failed, mesh unchanged`.

:::note[Different UVs won't merge]
Even if positions match, if UV0 differs, the vertex skips merge candidates. This keeps UV seams alive and textures from breaking. For the same reason, vertices with blend shape deltas noticeably different relative to mesh size also don't merge.
:::

Bone weights and blend shapes are preserved. The group's attributes use the vertex with the smallest index.
