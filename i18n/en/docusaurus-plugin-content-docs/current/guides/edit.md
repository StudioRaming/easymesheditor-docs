---
id: edit
title: Select & Move
sidebar_position: 3
---

# Select & Move

**After reading this page** you will know how to select vertices, edges, and faces, how the gizmo differs from the Blender-style G/R/S transform, how to pick an edge loop with Alt+click, how to clean up painted regions, and how hide, pivot, normals, merge, and separate work on this tab.

## Element mode {#요소-모드}

| Button | Key |
|---|---|
| Vertex | `1` |
| Edge | `2` |
| Face | `3` |

## Selection {#선택}

| Operation | Result |
|---|---|
| Click | Replace the selection |
| `Shift` or `Ctrl` + click | Add or remove (toggle) |
| Double-click or `L` | Select the whole connected element under the cursor |
| `Shift+L` | Deselect the connected element |
| `B` or drag on empty space | Box select (`Shift` adds, `Ctrl` removes) |
| `A` / `Alt+A` | Select all / clear the selection |
| `Ctrl+I` | Invert the selection |
| `Esc` | Clear the selection |

:::note[UV seam vertices are selected together]
A Unity mesh splits vertices at UV borders, so several vertices share one position. Selection takes the whole group at that position together. You click one point on screen, but two to four vertices move together. → [Weld group](/internals/session-and-undo#웰드-그룹)
:::

When X-Ray (`Alt+Z`) is off, hidden elements are neither shown nor selectable. When it is on, selection goes through to the back side.

### Edge loops and edge rings {#엣지-루프와-엣지-링}

- `Alt+click` (click without moving the pointer, then release): edge loop
- `Ctrl+Alt+click`: edge ring
- Hold `Shift` with either one to add to the current selection

:::caution[`Alt+drag` still rotates the Scene view]
So that Unity's Scene view rotation is not taken away, the loop selection happens only on a click that moved less than 3 px. If you hold `Alt` and drag further than that, the camera rotates as usual.
:::

### Growing and shrinking the selection

- `Ctrl` + `+`: grow the selection
- `Ctrl` + `-`: shrink the selection

The numpad `+` and `-` work the same way.

## Gizmo {#기즈모}

| Tool | Key |
|---|---|
| View | `Q` |
| Move | `W` |
| Rotate | `E` |
| Scale | `R` |

These match Unity's default tool layout. On a skinned mesh that has bones, the drag is applied with the pose you see, so you drag what you see on screen.

If you selected elements in several meshes, one shared world-space gizmo moves them together. → [Multiple meshes](/guides/multi-mesh)

## Modal transform (G / R / S) {#모달-변형}

These are the Blender-style `G` (move), `R` (rotate), and `S` (scale). With a selection in place, press the key while the cursor is in the Scene view, and the transform starts with the mouse alone.

While the modal is active:

- `X` / `Y` / `Z`: constrain to an axis. Press the same key again to switch from the local axis to the world axis.
- `Shift` + axis: constrain to the plane that excludes that axis.
- Number keys: type an exact value. Rotation is in degrees.
- `Enter` or left click: confirm
- `Esc` or right click: cancel

One modal transform is one undo step. When several meshes are edited together, there is no single local axis, so the world axis is used.

:::note[`R` does two things]
`R` opens the rotate modal only when something is selected and the cursor is over the Scene view. Otherwise `R` is Unity's scale gizmo.
:::

## Proportional editing {#프로포셔널-편집}

Press `O` to turn on proportional editing. Unselected vertices around the selection follow smoothly within the radius.

- `Connected Only` on: the distance is measured along the topology. Other parts that overlap do not come along.
- `Connected Only` off: the distance is measured in space.

Adjust the radius with `[` and `]`. The `Connected Only` setting is also in the Scene view overlay and under `Detailed settings` in Easy start.

Vertices masked in [mask mode](/guides/sculpt#마스크-모드) are left out of proportional influence.

## Symmetry

Turn on X / Y / Z in `Symmetry`. The Scene view shortcuts are `Alt+Shift+X`, `Alt+Shift+Y`, and `Alt+Shift+Z`.

Symmetry on this tab does **not add to the selection.** It applies the result of transforming the selected elements to the opposite side of the local axis. Center vertices on the mirror plane stay fixed on that plane.

## Pivot {#피벗}

Choose the reference point for rotation and scale. It applies to both the gizmo and the `G` / `R` / `S` modal.

| Mode | Reference |
|---|---|
| Median point | The average position of the selected elements |
| Individual origins | Each element uses its own position |
| Active element | The element you selected last |
| Bounding box center | The center of the box that encloses the selection |

When several meshes are edited together, turn on `Per-mesh pivot` to give each mesh its own pivot.

## Hide {#숨기기}

| Button | Key |
|---|---|
| Hide selected | `H` |
| Hide unselected | `Shift+H` |
| Show all | `Alt+H` |

:::note[Hiding is not an undo step]
Hiding is a display state of the editing session, not mesh data. It is not part of `Ctrl+Z`. It clears automatically when the structure changes (delete, separate, or merge).
:::

## Normals {#노멀}

| Item | What it does |
|---|---|
| Show normals | Draws the normal directions in the Scene view. You can change the length |
| Flip normals | Reverses the winding of the selected faces |
| Recalculate normals | Recalculates the normals of the selected vertices |

Flip also reverses the normal and tangent deltas of the blend shapes, so inside faces do not come out wrong on a mesh that has shape keys.

## Delete {#삭제}

`X` or `Delete` removes the selected faces. A vertex used only by those faces stays in the buffer until `Save Mesh`, when it is cleaned up once. → [Cleanup of unused vertices](/internals/bake#고아-정점-정리)

## Separate {#분리}

| Operation | Key | Result |
|---|---|---|
| Separate selection | `P` | Splits the selected elements off |
| Separate islands | `Shift+P` | Splits the selection into separate connected pieces |
| Separate by group | Groups G0 to G9 | Assign faces to groups, then split them all at once |

When you separate by group, G0 stays in the source, and each of G1 to G9 becomes a separate piece.

A separated piece appears in the scene as an **unsaved piece**, and `Save Mesh` writes it next to the source as `<name>_Part….asset`. If you press `Discard edits` before saving, the source is restored and the unsaved pieces are deleted.

Preserved: vertices, normals, tangents, UV0 to UV3, colors, submesh and material mapping, bindposes, the number of bone influences per vertex with exact weight values (including more than four influences), and all blend shape frames.

The whole separation is one undo step. If it fails partway, the tool restores the original state and deletes the partial `_Part.asset`.

:::caution[Bone influences of a separated piece]
A separated `_Part` piece keeps the source's bone influence count and is not cut down to four slots. The source keeps its influences. → [Limitations](/limitations)
:::

Combinations that include `Ctrl` or `Cmd` (`Ctrl+P`, `Ctrl+R`, `Ctrl+X`, and so on) stay as Unity shortcuts and do not run a Select & Move action. The exceptions are `Ctrl+A`, `Ctrl+I`, and `Ctrl` + `+` / `-`.

## Merge by Distance {#거리로-병합}

`Merge by Distance` combines duplicate vertices within the `Merge distance`. Use it to clean up duplicates left after a delete or a separation.

:::note[Vertices with different UVs are not merged]
Even at the same position, vertices with different UVs are not merged. This keeps the UV seam intact so the texture does not break. For the same reason, vertices whose blend shape deltas differ noticeably are not merged either.
:::

Bone weights and blend shapes are kept.

## Painted region tools {#칠한-영역-정리}

Open **Painted region tools** under `Select & Move` to work on the selected targets. The panel lists the targets that will be affected.

1. Paint the area you want to change or protect, or apply a strength to the existing vertex, edge, or face selection.
2. Blue marks the area to change, and green marks the area to protect. In delete mode, orange faces are the ones that will actually be removed.
3. Hold `Ctrl` to erase, and hold `Shift` to smooth the strength of the area. Press `Esc` to cancel the current stroke.

You can do three things with a painted area.

- **Delete painted faces**: removes the painted triangles and cleans up vertices that are no longer used.
- **Hide the painted part with a Shrink key**: creates a new shape key that moves the area inside the garment or hair. The base vertices stay as they are, and the preview is at 100%.
- **Partial reduction**: reduces the vertex count using the painted strength and the protect strength. You can then make a Shrink key on the same area of the reduced topology.

Keep these points in mind.

- A separate option protects vertices that existing expressions move. It is on by default. Face names and head bones do not protect or exclude a vertex.
- UV seams, material boundaries, open borders, and large bone weight differences are preserved. The reduction can therefore fall short of the target, so check both the target and the actual vertex count.
- Each remaining vertex keeps its original UV8, color, normal, tangent, bone influences, and every shape frame.
- The painted region is session state. It does not overwrite the mesh's color channels. Keep the result with `Save Mesh`.
