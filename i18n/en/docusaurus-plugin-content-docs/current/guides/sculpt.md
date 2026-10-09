---
id: sculpt
title: Shape
sidebar_position: 2
---

# Shape

**After reading this page** you will know what each of the five brushes does, how to adjust radius, strength, falloff, and pen pressure, how to turn on symmetry and check it, and how to use masks to keep areas from being changed.

The `Shape` tab is where the surface follows your drag in the Scene view. It works on the pose you see now, so on a skinned mesh it grabs the position on screen with the animation applied.

## Brushes {#브러시}

| Brush | Key | What it does |
|---|---|---|
| `Pull (1)` | `1` | Pulls the surface elastically in the direction you drag |
| `Smooth (2)` | `2` | Softens the surface by averaging neighboring vertices |
| `Flatten (3)` | `3` | Flattens the surface toward the weighted plane of the brush area |
| `Gather (4)` | `4` | Gathers the surface toward the brush center along the tangent plane. It does not push into the body |
| `Inflate (5)` | `5` | Inflates the surface along the vertex normals |

Hold `Ctrl` to reverse the direction. Flatten goes to the other side, Gather spreads outward, and Inflate shrinks. Hold `Shift` to switch to Smooth for that moment only.

Smooth, Flatten, Gather, and Inflate stamp once with a single click, without dragging. Pull moves the surface only while you drag.

### Pull {#엘라스틱}

This is the basic brush for pushing and pulling while keeping volume. It pulls the surface elastically in the direction you drag. A higher strength widens the soft tail outside the brush radius, which reaches up to about `2.5 × radius`.

Use this brush to push in the spot where clothing cuts into the body, or to inflate a whole silhouette. → [Clothing fit](/workflow/clothing-fit)

### Smooth and Flatten

`Smooth (2)` removes bumps, and `Flatten (3)` makes the surface closer to a plane. Both stamp once with a single click.

## Brush settings {#브러시-설정}

| Item | Range | Description |
|---|---|---|
| `Radius` | 0.001 to 2 | Brush size. You can also adjust it with `[` and `]` |
| `Strength` | 0 to 1 | Amount of one application. You can also adjust it with `,` and `.` (`<` and `>`) |
| `Range display` | 0.05 to 1 | Opacity of the brush influence drawn in the Scene view |
| `Falloff` | `Smooth` · `Sphere` · `Sharp` · `Constant` | The shape of the influence from the center to the edge |

Press `F` to open a modal in which moving the mouse left and right changes the radius. Click to confirm, and press `Esc` to cancel. `Shift+F` adjusts the strength the same way.

### Pen pressure {#필압-적용량}

If you use a pen tablet, set how pressure applies in the `Advanced` settings.

- Set **Pressure size** and **Pressure strength** separately, each from `0%` to `100%`.
- `0%` keeps that value fixed. `100%` follows the pen pressure directly.
- You can use size only, strength only, or both. The **Size** and **Strength** values you set stay unchanged.
- A mouse, or a device without pressure support, uses the radius and strength you set.
- Pen input uses the pressure that reaches Unity, so the Windows tablet driver must send pressure.
- This setting applies to `Shape` only. Other tabs keep their behavior.

### Brush presets {#브러시-프리셋}

Below the brush settings there are three preset slots. Click an empty slot to save the current brush type, radius, strength, and falloff. Click a saved slot to load those settings again. Right-click a slot, or turn on the save toggle and click a slot, to overwrite it.

## Symmetry {#대칭}

Turn on symmetry by combining X / Y / Z in `Symmetry`. The Scene view shortcuts are `Alt+Shift+X`, `Alt+Shift+Y`, and `Alt+Shift+Z`. Plain `X`, `Y`, and `Z` stay as Unity's tool handle shortcuts, so this tool does not capture them. → [Shortcuts](/reference/shortcuts#모양-다듬기)

:::note[Symmetry works even when the vertex counts do not match exactly]
The left and right topology does not have to be identical. The tool finds matching points by spatial position. A vertex with no match is left out of the symmetric edit.
:::

Turn on `Plane` to draw the mirror plane and the brush cursor on the opposite side in the Scene view. Check which axis the symmetry uses before you start.

## Mask mode {#마스크-모드}

Press `M` to enter. Masked vertices are drawn darker and are left out of Shape brushes and of [proportional editing](/guides/edit#프로포셔널-편집) on the `Select & Move` tab.

There are three methods.

| Method | Operation |
|---|---|
| `Island` | Click to add or remove the whole connected piece |
| `Brush` | Drag to paint with the radius. Hold `Ctrl` to erase |
| `Box` | Drag a rectangle on screen. `Shift` adds, `Ctrl` removes |

While hovering, cyan means the area will be added to the mask, and red means it will be removed.

- `Ctrl+I`: invert the mask
- `Alt+M`: clear the whole mask

Mask changes can also be undone with `Ctrl+Z`.

## X-Ray

Turn it on with `Alt+Z`. When it is off, hidden vertices cannot be hit by the brush. When it is on, the brush goes through to the back side. Turn it on when you need to work on the inside of a thin piece of clothing.

## Saving the result of Shape

Shape changes the base mesh directly. When you finish, you have two choices.

- **`Save Mesh`**: saves the changed shape as a mesh asset as it is.
- **`Save as New Key`**: stores only the change you added as a blend shape key, and keeps the base mesh as it is.

If you press `Save Mesh` after changing the base mesh with no key selected, the window asks whether to confirm the change as a new key or to bake it into the base mesh. → [Shape Keys](/guides/blendshape#기본형-직접-수정)
