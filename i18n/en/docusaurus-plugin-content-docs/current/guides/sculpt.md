---
id: sculpt
title: Sculpt
sidebar_position: 2
---

# Sculpt

**After reading this document**, you'll know what each of the 5 brushes does, how to adjust radius, strength, falloff, and pressure, how to turn on and see symmetry, and how to use mask mode to protect areas you shouldn't touch.

The `Sculpt` tab is the one where dragging in the Scene view makes the surface follow. It works based on the pose you see right now, so on a skinned mesh, it grabs the screen-space position with animation already applied.

## Brushes {#브러시}

| Brush | Key | What it does |
|---|---|---|
| `Elastic (1)` | `1` | Pulls the surface elastically in the drag direction |
| `Smooth (2)` | `2` | Smooths the surface by averaging neighboring vertices |
| `Flatten (3)` | `3` | Pushes the brush area toward a weighted plane to flatten it |
| `Pinch (4)` | `4` | Gathers vertices toward the brush center |
| `Inflate (5)` | `5` | Puffs outward along the normal |

On all brushes, holding `Ctrl` reverses the direction (shrink, opposite plane, spread instead of gather), and holding `Shift` temporarily switches to the Smooth brush.

### Elastic {#엘라스틱}

The default brush for pushing and pulling while preserving volume. It fixes the influence set at the moment of click, then applies a normalized Kelvinlet deformation, so areas outside the brush radius smoothly follow along with a soft tail.

As the window explains — `Normalized Kelvinlet with C2 soft tail for seamless gradation at boundaries. Higher strength increases both influence range and gradient.` Raising strength can extend the tail influence to roughly 2.5× the radius at maximum.

Use this brush to push in places where clothing pierces the body, or to puff the entire silhouette. → [Clothing Fit](/workflow/clothing-fit)

### Smooth and Flatten

`Smooth (2)` removes bumps, `Flatten (3)` brings surfaces close to flat. Both work with a single click (no dragging).

## Brush Settings {#브러시-설정}

| Item | Range | Description |
|---|---|---|
| `Radius` | 0.001 ~ 2 | Brush size. Also adjust with `[` `]` |
| `Strength` | 0 ~ 1 | Effect per stroke. Also adjust with `,` `.` (same as `<` `>`) |
| `Tablet Pressure` | on/off | Multiplies tablet pressure into strength. Pressure holds within one stroke |
| `Range Display` | 0.05 ~ 1 | Opacity of the brush influence indicator drawn in the Scene view |
| `Falloff` | `Smooth` · `Sphere` · `Sharp` · `Constant` | How influence decreases from center to edge |

Press `F` to open a modal where you move the mouse left/right to adjust radius. Click to confirm, `Esc` to cancel. `Shift+F` does the same for strength.

### Brush Presets {#브러시-프리셋}

The `Brush Presets` section has 3 slots. Press `Save` and the current brush type, radius, strength, falloff, and pressure settings go into that slot. Press a slot to restore them exactly. Unused slots show `Empty`.

Presets are saved to the editor, so they survive closing and re-opening the project.

## Symmetry {#대칭}

Turn on `Symmetry` by combining X / Y / Z. Scene view shortcuts are `Shift+Alt+X` · `Shift+Alt+Y` · `Shift+Alt+Z`, same notation as the `Edit` tab. Solo `X` `Y` `Z` are left for Unity's tool handle shortcuts and not intercepted. → [Shortcuts](/reference/shortcuts#스컬프트)

:::note[Symmetry works even if vertex counts don't match exactly]
Left-right topology doesn't need to be perfect. It finds matching points in space based on local bind-pose position. Vertices with no match just skip symmetry processing.
:::

Turn on `Show Symmetry Plane` to see the mirror plane and opposite-side brush position drawn in the Scene view. Check visually which axis symmetry is locked to before you start.

## Mask Mode {#마스크-모드}

Press `M` to enter. Masked vertices are drawn darker and are excluded from both the Sculpt brush and [Proportional Editing](/guides/edit#프로포셔널-편집) in the `Edit` tab.

Three sub-modes:

| Sub-mode | Operation |
|---|---|
| `Island` | Click = toggle mask for that connected component |
| `Brush` | Drag = paint in radius, `Ctrl` = erase |
| `Box` | Drag rectangle on screen, `Shift` = add, `Ctrl` = remove |

Hover preview shows cyan for pending apply, red for pending erase.

- `Ctrl+I` — `Invert Mask (Ctrl+I)`
- `Alt+M` — `Clear All Mask (Alt+M)`

When symmetry is on, island masks also process the matching island on the other side. Mask changes can be undone with `Ctrl+Z`.

## X-Ray

Turn on with `Alt+Z`. When off, occluded vertices don't get caught by the brush. When on, it penetrates through to the back side. Use it when you need to work on the inside of thin clothing.

## Save Sculpt Results

Sculpt directly changes the base mesh. When you're done, you have two paths:

- **`Bake`** — Bake the changed shape straight into the mesh asset.
- **`Save as New Key`** — Keep the base mesh and save only the changes you added as a blend shape key.

If the base mesh is changed and you press `Bake`, the window asks: `There are edits made without a selected key. Commit them as a new key before baking, or bake them into the base mesh?` → [BlendShape](/guides/blendshape#기본형-직접-수정)
