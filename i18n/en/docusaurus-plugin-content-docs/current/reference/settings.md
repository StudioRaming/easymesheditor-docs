---
id: settings
title: Settings
sidebar_position: 2
---

# Settings

**After reading this document**, you'll know which window values are remembered for next time, and which ones vanish with the session.

## Remembered and Forgotten

Almost all operation settings are saved to **Unity Editor's EditorPrefs.** They persist across closing and reopening projects, even when you switch projects.

Conversely, **edit states** (selection, mask, hide, undo history, blend shape values) belong to the session. They disappear when the session ends with `Bake` or `Revert`. → [Session and Undo](/internals/session-and-undo)

Key lock state is exceptional — saved per-project (EditorUserSettings).

## Window Common

| Item | Default |
|---|---|
| Language | Editor system language (Korean if Korean, Japanese if Japanese, English otherwise) |
| `Keys` sheet open | Closed |
| Active tab | Sculpt |

## Sculpt

| Item | Range | Default |
|---|---|---|
| Brush | Elastic · Smooth · Flatten · Pinch · Inflate | `Elastic (1)` |
| `Radius` | 0.001 ~ 2 | 0.05 |
| `Strength` | 0 ~ 1 | 0.5 |
| `Falloff` | `Smooth` · `Sphere` · `Sharp` · `Constant` | `Smooth` |
| `Tablet Pressure` | on/off | On |
| `Range Display` | 0.05 ~ 1 | 0.9 |
| `Symmetry` X / Y / Z | on/off | All off |
| `Show Symmetry Plane` | on/off | On |
| Mask sub-mode | `Island` · `Brush` · `Box` | `Island` |
| `Brush Presets` slots 1~3 | — | `Empty` |
| X-Ray | on/off | Off |

## Edit

| Item | Range | Default |
|---|---|---|
| Element mode | Vertex · Edge · Face | Vertex |
| Gizmo | View · Move · Rotate · Scale | `Move (W)` |
| `Proportional Editing (O)` | on/off | Off |
| `Radius` (proportional) | — | 0.2 |
| `Connected only` | on/off | On |
| `Symmetry` X / Y / Z | on/off | All off |
| `Pivot` | `Median Point` · `Individual Origins` · `Active Element` · `Bounding Box Center` | `Median Point` |
| `Per-mesh Uniform Pivot` | on/off | Off |
| `Vertex Size` | 0.35 ~ 3 | 1 |
| `Vertex Color` | RGBA | White · alpha 0.30 |
| `Display Normals` | on/off | Off |
| `Normal Length` | 0.001 ~ 0.5 | 0.02 |
| `Merge Distance` | 0+ | 0.0001 |
| X-Ray | on/off | Off |

## BlendShape

| Item | Default |
|---|---|
| `Group` | On |
| `Expand Range` (-100~200) | Off |
| `Heatmap` | Off |
| `Mirror Axis` | X |
| Collapsed groups | Empty |
| Key locks (`L`) | Remembered per-project |

## Weight

| Item | Range | Default |
|---|---|---|
| Brush | Add · Subtract · Smooth · Blur · Average | `Add (1)` |
| `Radius` | — | 0.05 |
| `Strength` | 0 ~ 1 | 0.5 |
| `Falloff` | `Smooth` · `Sphere` · `Sharp` · `Constant` | `Smooth` |
| `Show Weights` | on/off | On |
| `Display Intensity` | 0 ~ 1 | 0.6 |
| `Show Bones in Scene` | on/off | On |
| `Show Only Bones With Weight` | on/off | Off |
| `Auto Normalize` | on/off | **On** |
| `Max Bone Influences` | 1 ~ 4 | 4 |
| `Symmetric Paint` | on/off | Off |
| `Iterations` (smooth checked bones) | 1 ~ 20 | 3 |
| `Strength` (smooth checked bones) | 0 ~ 1 | 0.5 |
| `Max Distance` (weight transfer) | — | 0.02 |
| `Scope` (weight transfer) | `Entire Mesh` · `Only Checked Bones' Weights` · `Unweighted Vertices Only` | `Entire Mesh` |
| `Ignore Source Transform (bind-pose local space matching)` | on/off | Off |
| Bone locks (`L`) | — | All unlocked |
| X-Ray | on/off | Off |

## To Reset Settings

Individual items can be reset in the window. There's no "reset all" button. If needed, clear keys starting with `StudioRaming.EasyMeshEditor.` from Unity's EditorPrefs.
