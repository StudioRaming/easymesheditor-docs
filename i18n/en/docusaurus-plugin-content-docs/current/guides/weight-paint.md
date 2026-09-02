---
id: weight-paint
title: Weight Paint
sidebar_position: 5
---

# Weight Paint

**After reading this document**, you'll know two ways to select which bone to paint, the 5 brush types and normalization rules, name-matching rules for left-right symmetric painting, bone merging, and how to import weights from another mesh.

:::note[SkinnedMeshRenderer only]
On regular meshes: `Weight Paint is for SkinnedMeshRenderer only.`
:::

## Select Bone {#본-고르기}

The `Bone List` section shows the bone hierarchy as a tree. The radio button on the left of each row is the **active bone** — the one you're painting now. Once chosen, it displays as `Active bone: {0}`.

If none chosen: `No active bone — click the radio button on the left of the list to select a bone to paint.` The Scene view hint says the same.

| Tool | What it does |
|---|---|
| `Search` | Filter by name |
| `Expand` / `Collapse` | Expand or collapse the entire tree |
| `Show Bones in Scene` | Draw bones in the Scene view |
| `Show Only Bones With Weight` | Show only bones that actually have weight |

You can also select in the Scene view:

- `Ctrl` + bone click — set/unset active bone
- `Ctrl+Shift` + bone click — toggle smooth target checkbox

### Checked Bones

Separate from the radio, each row has a checkbox. Checked bones are used to specify scope for `Smooth Selected Bones`, `Merge Bone Weights`, and `Import Weights`. Count displays as `{0} bones checked`.

### Bone Lock {#본-잠금}

Press `L` in a row to lock that bone's weight. Locked bones are excluded from painting, normalization, and transfer. Attempting to paint a locked bone shows: `Target bone is locked; skipping {0} vertices (unlock to paint).`

## Brushes {#브러시}

| Button | Key | What it does |
|---|---|---|
| `Add (1)` | `1` | Raise active bone weight |
| `Subtract (2)` | `2` | Lower it |
| `Smooth (3)` | `3` | Even out with neighbors |
| `Blur (4)` | `4` | Blend with neighbors |
| `Average (5)` | `5` | Equalize the brush area |

`Ctrl` reverses add/subtract. `Shift` temporarily smooths while held.

Settings: `Radius` · `Strength` · `Falloff` (`Smooth` · `Sphere` · `Sharp` · `Constant`). Adjust radius with `[` `]`, strength with `,` `.`, modal with `F` / `Shift+F`.

Painting instantly reflects the deformation in the current pose, so if you paint with the arm bent, you see the result right away.

## Heatmap {#히트맵}

Turn on `Show Weights` in the `Heatmap` section and weights appear as vertex colors. Adjust intensity with `Display Intensity`.

Colors go blue → green → red as values rise. If there are checked bones, it shows **their sum**; otherwise it shows the active bone's value.

## Auto Normalize and Max Bone Influences {#자동-정규화와-최대-영향-본-수}

In the `Paint Options` section:

- `Auto Normalize` (on by default) — after each paint stroke, resets the vertex's weight sum to 1.
- `Max Bone Influences` — 1~4. Limits how many bones one vertex can have.

Turn off `Auto Normalize` for pure add/subtract, and the window warns: `Auto Normalize is off. Weight sum may not equal 1; after finishing, press 'Normalize All' below.`

Even if you save with it off, there's a last defense line. Right before `Bake`, any vertex with sum ≠ 1 is normalized and reported: `Auto Normalize was off; normalized {0} vertices with sum ≠ 1 before saving.`

`Normalize All (N)` normalizes the entire mesh at once. Vertices not attached to any bone are handled here.

| Message | Means |
|---|---|
| `Bound {0} unassigned vertices to closest bone.` | Attached to the nearest bone |
| `Bound {0} unassigned vertices to root bone.` | Couldn't find nearest, used root |
| `No bone info; left {0} unassigned vertices.` | No bones to attach to |

If slots are full: `Skipping {0} vertices with 4 full slots (weak influence cut).`

## Symmetric Paint {#대칭-페인트}

Turn on `Symmetric Paint (X)` and when you paint, the **corresponding bone on the opposite side** is painted too. The matching bone displays as `Symmetric bone: {0}`.

Name-matching rules, checked in order: suffix/prefix single-char first, then word form.

| Form | Examples |
|---|---|
| Suffix | `Arm_L` ↔ `Arm_R` · `Arm.L` ↔ `Arm.R` · `Arm-L` ↔ `Arm-R` (lowercase `_l`/`_r` etc. too) |
| Prefix | `L_Arm` ↔ `R_Arm` · `L.Arm` ↔ `R.Arm` · `L-Arm` ↔ `R-Arm` |
| Word | `Left Arm` ↔ `Right Arm` · `left`/`right` · `LEFT`/`RIGHT` |
| Japanese | `左腕` ↔ `右腕` |

Only matches if the derived name actually exists as a bone. Center bones like `Hips` or `Spine` have no pair, so they fall back to themselves. The window tells you: `No symmetric bone — treating as center bone, painting both sides with this one.`

:::caution[The `(X)` in the label is not a key hint]
In the current version, this option is **toggled only by the window checkbox.** Pressing `X` in the Scene view doesn't toggle it.
:::

## Smooth Selected Bones {#선택-본-스무딩}

Batch smoothing after checking multiple bones.

- `Iterations` — 1~20
- `Strength`
- `Apply Smoothing (K)` — Scene view shortcut is `K`

While dragging the slider, it recalculates and shows live from a base snapshot. When you release, it commits as one undo step.

If no bones are checked, `K` does nothing.

## Merge Bone Weights {#본-웨이트-합치기}

The `Merge Bone Weights` section. The window explains: `Move all weight from bone A to bone B. After moving, A's weight becomes 0, so you can safely delete that bone.`

| Button | What it does |
|---|---|
| `Merge Active into Parent ({0})` | Merge active bone to its parent |
| `Merge {0} Checked Bones into Active` | Merge checked bones to active |
| `M` (row button) | Designate that bone as target |

Choose the target from `Parent: {0}` / `Another bone`. If no candidates: `No target bone to merge into.`

Result: `Merged weights from {0} bones into '{1}' ({2} vertices changed).`

| Blocking case | Message |
|---|---|
| Source and target are the same | `Source and target bone are the same. Choose another.` |
| Bone is locked | `Bone '{0}' is locked; cannot merge. Unlock it first.` |

Use this to clean up unused stub bones in clothing. → [Clothing Fit](/workflow/clothing-fit)

## Import Weights From Another Mesh {#다른-메쉬에서-웨이트-가져오기}

The `Import Weights from Another Mesh` section. The window explains: `Specify a SkinnedMeshRenderer with weight already set (like an avatar body), and the closest-point weight on that surface is transferred to the current mesh. Basic clothing fitting procedure.`

1. Put an already-weighted `SkinnedMeshRenderer` in `Source Mesh`.
2. Set `Max Distance`.
3. Choose `Scope`.
4. Press `Import Weights`.

| `Scope` | Targets |
|---|---|
| `Entire Mesh` | All vertices |
| `Only Checked Bones' Weights` | Only influence from bones checked in the list |
| `Unweighted Vertices Only` | Only vertices not yet bound to any bone |

Result: `Imported weights — applied {0} vertices · out of range {1} · skipped {2}.`

| Situation | Message |
|---|---|
| No source chosen or specifying self | `Specify a different SkinnedMeshRenderer, not the currently editing mesh.` |
| Read/Write off | `Cannot read source mesh. Enable Read/Write Enabled in the model importer.` |
| Source has no weights | `Source mesh has no bone weights.` |
| Scope is checked but no checks | `No bones checked. Check the bones you want to import from the list.` |
| Source bones with no match | `{0} source bones found no match, their influence (sum {2}) dropped: {1}` |

### When Space Doesn't Align {#전송-공간}

Weights are bind-pose data, so both meshes need to be in the same space for matching to work. If the source and target renderers have different transforms, the window warns:

> `Source and target renderers have different transforms. Weights are bind-pose data, so both meshes must be in the same space to match — if results are off, enable the option below.`

Below that, turn on `Ignore Source Transform (match in bind-pose local space)` to match in local bind-pose space instead of world transform.

## How Weights Are Saved

Painted values are recorded identically across the entire [weld group](/internals/session-and-undo#웰드-그룹) at the same position, and the sum is normalized to 1.

Direct painting operates within Unity's legacy 4-slot range. In Unity 2020.1+, 5+ bone influences on **unpainted** vertices are preserved as-is. → [Variable Bone Weight](/internals/bake#가변-본-웨이트)

If influence bones exceed slot count: `Influence bones exceed slots; {0} vertices had weak influences cut.`
