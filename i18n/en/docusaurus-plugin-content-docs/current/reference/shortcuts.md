---
id: shortcuts
title: Shortcuts
sidebar_position: 1
---

# Shortcuts

**After reading this page** you will be able to find, in one table per tab, which key does what. To see the same content inside the window, press the `Keys` button on the Scene view hint bar. → [Shortcut sheet](/guides/window#단축키-시트)

:::note[Works in the Scene view only]
The keys listed here are handled while the mouse is over the Scene view. They are not captured while you type in a text field, and they do not change Unity's global Shortcut profile.
:::

## Common {#공통}

These work on every tab.

| Key | What it does |
|---|---|
| `Tab` | Turn edit input on or off. The session stays alive |
| `Ctrl+Tab` / `Ctrl+Shift+Tab` | Next / previous tab |
| `Ctrl+Z` / `Ctrl+Y` | Undo / redo |
| `Enter` | Save the shape key edit (Cancel Key Edit is the button on the pinned bar) |
| `Alt+Z` | Turn X-Ray on or off |

## Shape {#모양-다듬기}

| Key | What it does |
|---|---|
| `1` / `2` / `3` / `4` / `5` | Pull / Smooth / Flatten / Gather / Inflate |
| `[` / `]` | Brush radius smaller / larger (×0.9) |
| `,` / `.` (`<` / `>`) | Brush strength lower / higher (±0.05) |
| `F` / `Shift+F` | Change radius / strength with the mouse (click to confirm, `Esc` to cancel) |
| `Shift` (hold) | Smooth for as long as you hold it |
| `Ctrl` (hold) | Reverse the brush direction |
| Numpad `.` | Frame selection (fit the mesh being edited to the view) |
| `Alt+Shift+X` / `Y` / `Z` | Turn axis symmetry on or off |
| `M` | Mask mode |
| `Ctrl+I` | Invert the mask |
| `Alt+M` | Clear the whole mask |

:::caution[Pressing `X` `Y` `Z` alone does not turn on symmetry]
The symmetry shortcuts are `Alt+Shift+X` / `Y` / `Z`. Plain `X` `Y` `Z` stay as Unity's tool handle shortcuts, so this tool does not capture them. You can also use the `Symmetry` checkboxes in the window.
:::

## Select & Move {#선택-이동}

| Key | What it does |
|---|---|
| `1` / `2` / `3` | Vertex / edge / face mode |
| `A` / `Alt+A` / `Ctrl+I` | Select all / clear / invert |
| `B` | Box select (`Shift` adds, `Ctrl` removes) |
| `L` / `Shift+L` | Select / deselect the connected element |
| `Alt+click` | Edge loop (only on a click without dragging) |
| `Ctrl+Alt+click` | Edge ring (hold `Shift` as well to add) |
| `Ctrl` + `+` / `-` | Grow / shrink the selection |
| `Esc` | Clear the selection |
| `Q` / `W` / `E` / `R` | View / Move / Rotate / Scale gizmo |
| `G` / `R` / `S` | Modal move / rotate / scale with the mouse (requires a selection) |
| `X` `Y` `Z` during the modal | Constrain to an axis. Press again for the world axis |
| `Shift` + axis during the modal | Constrain to a plane |
| Numbers / `Enter` / `Esc` during the modal | Type an exact value / confirm / cancel |
| `O` | Turn proportional editing on or off |
| `[` / `]` | Proportional radius (vertex display size when proportional editing is off) |
| `Alt+Shift+X` / `Y` / `Z` | Turn axis symmetry on or off |
| `H` / `Shift+H` / `Alt+H` | Hide selected / hide unselected / show all |
| `P` / `Shift+P` | Separate selection / separate islands |
| `X` or `Delete` | Delete the selection |

:::caution[`R` does one of two things, depending on context]
`R` opens the rotate modal only when something is selected and the cursor is over the Scene view. Otherwise `R` is Unity's scale gizmo.
:::

:::caution[`Alt+drag` still rotates the Scene view]
Loop selection with `Alt` happens only on a click that moved less than 3 px. If you drag further, the camera rotates as usual.
:::

Combinations that include `Ctrl` or `Cmd` (`Ctrl+P`, `Ctrl+R`, `Ctrl+X`, and so on) stay as Unity shortcuts and do not run a Select & Move action. The exceptions are `Ctrl+A`, `Ctrl+I`, and `Ctrl` + `+` / `-`.

## Shape Keys {#표정-키}

| Key | What it does |
|---|---|
| `N` | Start sculpting a new key |
| `Enter` | Save the key edit |
| `Esc` | Cancel the stroke or clear solo. The key edit is not discarded |
| `F` / `Shift+F` / `[` / `]` / `,` / `.` | Radius and strength while sculpting a key |
| `Shift` (hold) | Smooth for as long as you hold it |

## Bone Weights {#뼈-연결}

| Key | What it does |
|---|---|
| `1` / `2` / `3` / `4` / `5` | Add / Subtract / Smooth / Blur / Average |
| `N` | Normalize all |
| `K` | Smooth the checked bones (does nothing if no bone is checked) |
| `Ctrl+click` | Set or clear the active bone in the Scene view |
| `Ctrl+Shift+click` | Turn the smoothing check on or off in the Scene view |
| `[` / `]` / `,` / `.` / `F` / `Shift+F` | Radius and strength (same as Shape) |
| `Shift` (hold) | Temporary Smooth |
| `Ctrl` (hold) | Reverse Add and Subtract |

:::note[`Symmetric Paint` has no key]
The label includes `(X)`, but in this version the option is turned on and off only with the checkbox in the window. → [Symmetric painting](/guides/weight-paint#대칭-페인트)
:::
