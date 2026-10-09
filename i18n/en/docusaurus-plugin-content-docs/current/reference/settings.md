---
id: settings
title: Settings
sidebar_position: 2
---

# Settings

**After reading this page** you will know which values in the window are remembered until the next time you open it, which are lost with the session, and what each value is when nothing has been saved yet.

The defaults are the initial values set in the 1.0 source. They are used when no value has been saved.

## What is remembered and what is lost

Most window settings are stored in the **Unity Editor's EditorPrefs**. They stay the same when you close and reopen the project, and when you open another project.

The exception is the **key lock state**, which is stored in the project's EditorUserSettings, one entry per mesh GUID.

Editing state (selection, mask, hidden elements, undo history, shape key values, and painted regions) belongs to the session. It is lost when the session ends with `Save Mesh` or `Discard edits`. → [Session and undo](/internals/session-and-undo)

## Window

| Item | Description | Default |
|---|---|---|
| Language | English, 한국어, or 日本語. At first it follows the system language of the Unity Editor | System language |
| Easy start / Expert | The view mode of the window. Edit values do not change | Easy start |
| Active tab | Remembers the tab you used last | First tab |
| Shortcut sheet (`Keys`) | Remembers whether it is open | Closed |

## Shape

| Item | Range | Default |
|---|---|---|
| Brush | Pull · Smooth · Flatten · Gather · Inflate | Pull |
| `Radius` | 0.001 to 2 | 0.05 |
| `Strength` | 0 to 1 | 0.5 |
| `Falloff` | `Smooth` · `Sphere` · `Sharp` · `Constant` | Smooth |
| `Range display` | 0.05 to 1 | 0.9 |
| Pressure size / Pressure strength | 0 to 100% each | 0% / 100% |
| `Symmetry` X / Y / Z | On / off | Off |
| `Show symmetry plane` | On / off | On |
| Mask method | `Island` · `Brush` · `Box` | Island |
| Brush presets | 3 slots | Empty |
| X-Ray | On / off | Off |

## Select & Move

| Item | Range | Default |
|---|---|---|
| Element mode | Vertex · edge · face | Vertex |
| Gizmo | View · Move · Rotate · Scale | Move |
| `Proportional editing` | On / off | Off |
| Proportional `Radius` | Remembered as a value | 0.2 |
| `Connected Only` | On / off | On |
| `Symmetry` X / Y / Z | On / off | Off |
| `Pivot` | Median point · Individual origins · Active element · Bounding box center | Median point |
| `Per-mesh pivot` | On / off | Off |
| `Show normals`, normal length | On / off, length value | Off, 0.02 |
| `Merge distance` | 0 or more | 0.0001 |
| X-Ray | On / off | Off |

## Shape Keys

| Item | Description | Default |
|---|---|---|
| `Group` | Folds the list by prefix | On |
| `Extended range` (-100 to 200) | Widens the slider range | Off |
| `Heatmap` | Turns the delta heatmap on | Off |
| Mirror axis | The axis used when you create a mirror key | X |
| Key lock (`L`) | Stored in the project, one entry per mesh GUID | No lock |

## Bone Weights

| Item | Range | Default |
|---|---|---|
| Brush | Add · Subtract · Smooth · Blur · Average | Add |
| `Radius` / `Strength` / `Falloff` | Same kinds as Shape | 0.05 / 0.5 / Smooth |
| `Show weights`, `Display strength` | On / off, 0 to 1 | On, 0.6 |
| `Show bones in Scene` | On / off | On |
| `Only bones with weights` | On / off | On |
| `Auto Normalize` | On / off | On |
| `Maximum bone influences` | 1 to 4 | 4 |
| `Symmetric Paint` | On / off | Off |
| `Iterations` (smooth checked bones) | 1 to 20 | 3 |
| `Strength` (smooth checked bones) | 0 to 1 | 0.5 |
| `Max distance` (transfer weights) | Distance value | 0.02 |
| `Apply to` (transfer weights) | Whole mesh · Weights of checked bones only · Vertices without weights only | Whole mesh |
| `Ignore source transform` | On / off | Off |
| Bone lock (`L`) | Per bone | No lock |

## Resetting settings

Reset each item in the window individually. There is no single button that resets everything. If you really need to, delete the keys that start with `StudioRaming.EasyMeshEditor.` in Unity's EditorPrefs.
