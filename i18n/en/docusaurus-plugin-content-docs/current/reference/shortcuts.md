---
id: shortcuts
title: Shortcuts
sidebar_position: 1
---

# Shortcuts

**After reading this document**, you can find what each key does in one table per tab. To see the same content in the window, press the `Keys` button in the Scene view hint bar. → [Shortcut Sheet](/guides/window#단축키-시트)

:::note[Works only in the Scene view]
Keys listed here are processed when the mouse is over the Scene view. They're not intercepted during text input, and don't change Unity's global Shortcut profile.
:::

## Global {#공통}

Works in all tabs.

| Key | What it does |
|---|---|
| `Tab` | `Toggle Editing` |
| `Ctrl+Tab` | `Cycle Tool Tabs` (next tab) |
| `Ctrl+Shift+Tab` | Previous tab |
| `Ctrl+Z` / `Ctrl+Y` | `Undo / Redo` |
| `Enter` / `Esc` | `Commit / Cancel Transaction` |
| `[` / `]` | `Brush Radius` |
| `<` `>` `,` `.` | `Brush Strength` |
| `Alt+Z` | X-Ray toggle |

`<` `>` are the same key as `,` `.`. `Shift` works the same.

## Sculpt {#스컬프트}

| Key | What it does |
|---|---|
| `1` / `2` / `3` | `Brush Elastic / Smooth / Flatten` |
| `4` / `5` | `Brush Pinch / Inflate` |
| `[` / `]` | `Decrease / Increase Radius` |
| `,` / `.` | `Lower / Raise Strength` |
| `F` / `Shift+F` | `Adjust Radius / Strength with Mouse (click confirm, Esc cancel)` |
| `Shift` (held) | `Smooth Brush While Held` |
| `Ctrl` (held) | `Reverse Brush Direction While Held` |
| `Shift+Alt+X` / `Y` / `Z` | Toggle axis symmetry |
| `M` | `Toggle Mask Mode` |
| `Ctrl+I` | `Invert Mask` |
| `Alt+M` | `Clear All Mask` |
| `Alt+Z` | `X-Ray Toggle` |

:::caution[`Keys` sheet symmetry notation differs from actual]
The 0.1.1 `Keys` sheet lists symmetry as `X / Y / Z` and `Alt+X / Y / Z`, but the actual working keys are `Shift+Alt+X` / `Y` / `Z` like the `Edit` tab. Solo `X` `Y` `Z` and `Alt+Z` are left for Unity's tool handle shortcuts and X-Ray, not intercepted. You can also toggle with the `Symmetry` checkbox in the window.
:::

## Edit {#편집}

| Key | What it does |
|---|---|
| `1` / `2` / `3` | `Vertex / Edge / Face Mode` |
| `Q` / `W` / `E` / `R` | `View / Move / Rotate / Scale Gizmo` |
| `G` / `R` / `S` | `Mouse Modal Transform (requires selection)` |
| `X` / `Y` / `Z` (during modal) | `Constrain to Axis During Modal (twice=world, Shift+axis=plane, number=exact)` |
| `Alt+click` (no drag) | `Edge Loop` |
| `Ctrl+Alt+click` | `Edge Ring` (`Shift` together = add) |
| `Ctrl` + `+` / `-` | `Expand / Shrink Selection` |
| `H` / `Alt+H` / `Shift+H` | `Hide / Show All / Hide Others` |
| `A` / `Alt+A` / `Ctrl+I` | `Select All / Deselect / Invert` |
| `B` / `L` / `O` | `Box Select / Linked Select / Proportional` |
| `Shift+L` | `Deselect Linked` |
| `X` / `Delete` / `Backspace` | Delete selection |
| `P` / `Shift+P` | `Separate Selection / Separate by Islands` |
| `Esc` | Clear box select mode or deselect |
| `Alt+Z` | X-Ray |
| `Shift+Alt+X` / `Y` / `Z` | Toggle axis symmetry |
| `[` / `]` | If proportional on: radius; if in vertex mode: vertex display size |

:::caution[`R` does two things depending on context]
`R` is a rotation modal only when **you have a selection and the cursor is over the Scene view.** Otherwise it works normally as Unity's `R` = Scale gizmo.
:::

:::caution[`Alt+drag` still rotates the scene]
Edge loop selection only happens when you **don't move while holding `Alt`.** If you drag even a little, the camera rotates normally.
:::

## BlendShape {#블렌드쉐이프}

This tab doesn't register its own list on the `Keys` sheet, so you see `This tab has no registered shortcuts.` The actual working keys are below.

| Key | What it does | Condition |
|---|---|---|
| `N` | Start sculpting new shape | When not sculpting or editing |
| `Esc` | Clear solo preview | When no transaction and solo is on |
| `Enter` | Save sculpt | During sculpt |
| `Esc` | Cancel sculpt | During sculpt |
| `F` / `Shift+F` | Radius / Strength modal | During sculpt |
| `[` / `]` · `,` / `.` | Radius / Strength | During sculpt |
| `Shift` (held) | Smooth brush | During sculpt |
| `Alt+Z` | X-Ray | |

## Weight {#웨이트}

| Key | What it does |
|---|---|
| `1` / `2` / `3` | `Brush Add / Subtract / Smooth` |
| `4` / `5` | `Brush Blur / Average` |
| `[` / `]` | `Decrease / Increase Radius` |
| `,` / `.` | `Lower / Raise Strength` |
| `F` / `Shift+F` | `Adjust Radius / Strength with Mouse (click confirm, Esc cancel)` |
| `Shift` (held) | `Smooth Brush While Held` |
| `Ctrl` (held) | `Reverse Add / Subtract While Held` |
| `N` | `Normalize All` |
| `K` | `Apply Smooth to Checked Bones` |
| `Ctrl+click` | `Set / Unset Active Bone in Scene` |
| `Ctrl+Shift+click` | `Toggle Smooth Target Checkbox in Scene` |
| `Alt+Z` | `X-Ray Toggle` |

:::note[`Symmetric Paint (X)` is not a key]
The label says `(X)` but in the current version this option is toggled only by the window checkbox. → [Symmetric Paint](/guides/weight-paint#대칭-페인트)
:::

`K` does nothing if there are no checked bones.
