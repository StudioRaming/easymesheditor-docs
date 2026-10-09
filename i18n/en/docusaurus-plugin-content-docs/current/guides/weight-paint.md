---
id: weight-paint
title: Bone Weights
sidebar_position: 5
---

# Bone Weights

**After reading this page** you will know the two ways to choose the bone to paint, the five brushes and the normalization rules, the name rules for symmetric painting, how to merge a bone's weights, and how to transfer weights from another mesh.

:::note[`SkinnedMeshRenderer` only]
This tab cannot be used with a plain mesh.
:::

## Choose a bone {#본-고르기}

The bone list on the `Bone Weights` tab shows the bone hierarchy as a tree. The radio button on each row is the **active bone**, the bone you paint now. Click the bone name or its radio button to choose it. The root of the tree is `SkinnedMeshRenderer.rootBone` when it is set.

If no bone is chosen, the tab tells you that you cannot paint yet.

| Tool | What it does |
|---|---|
| Search | Filters by name |
| Expand / Collapse | Expands or collapses the whole tree |
| Show bones in Scene | Draws the bones in the Scene view |
| Only bones with weights | Keeps only the bones that actually have weights |

You can also choose bones in the Scene view.

- `Ctrl` + click a bone: set or clear the active bone.
- `Ctrl+Shift` + click a bone: turn the smoothing target check on or off.

### Checked bones {#체크된-본}

Each row also has a checkbox, separate from the radio button. Checked bones define the scope of `Smooth Checked Bones`, `Merge Bone Weights`, and `Transfer Weights`. The count appears as `Checked bones: {n}`.

### Lock {#본-잠금}

Press the `L` button on a row to lock that bone's weights. Locked bones are left out of painting, normalizing, and transfers. If you try to paint a locked bone, the Scene view tells you why.

## Brushes {#브러시}

| Brush | Key | What it does |
|---|---|---|
| Add | `1` | Raises the weight of the active bone |
| Subtract | `2` | Lowers the weight of the active bone |
| Smooth | `3` | Evens the weight with its surroundings |
| Blur | `4` | Mixes the weight with its surroundings |
| Average | `5` | Evens out the weight over the brush area |

`Ctrl` reverses Add and Subtract. `Shift` switches to Smooth only while held.

You can adjust the radius, the strength, and the falloff (`Smooth` · `Sphere` · `Sharp` · `Constant`). `[` and `]` change the radius, and `,` and `.` change the strength. `F` and `Shift+F` open mouse-driven modals.

The deformation updates on every stroke in the current pose. If you paint with the arm bent, you see the result right away.

## Heatmap {#히트맵}

Turn on the heatmap to see the weights as vertex colors. The colors run from blue through green to red as the value rises. If bones are checked, the heatmap shows the sum of the checked bones. Otherwise it shows the value of the active bone. You can adjust the display strength, and a legend appears with it.

## Auto normalize and maximum bone influences {#자동-정규화와-최대-영향-본-수}

- **Auto Normalize**: when on, the weight sum of each vertex is set back to 1 after every stroke. It is on by default.
- **Maximum bone influences**: limits how many bones one vertex can have.

With auto normalize off, the tool adds and subtracts without normalizing. The sum may then not be 1, so press `Normalize All` when you finish. Even if you turn it off and save anyway, the tool normalizes any vertex whose sum is not 1 just before `Save Mesh`, and tells you how many it fixed.

`Normalize All` (`N`) normalizes the whole mesh at once. A vertex attached to no bone is attached to the **nearest bone**, not to the first bone in the list. If no nearby bone is found, it is attached to the root bone.

If a vertex already has four influences and a weak value comes in, that value is skipped. The Scene view shows the reason.

## Symmetric painting {#대칭-페인트}

With `Symmetric Paint` on, painting also paints the **matching left and right bone** on the opposite vertices. The name of the matching bone is shown.

The name rules are as follows.

| Form | Example |
|---|---|
| Suffix | `Arm_L` ↔ `Arm_R`, `Arm.L` ↔ `Arm.R`, `Arm-L` ↔ `Arm-R` (lowercase `_l` and `_r` work the same way) |
| Prefix | `L_Arm` ↔ `R_Arm`, `L.Arm` ↔ `R.Arm`, `L-Arm` ↔ `R-Arm` |
| Word | `Left Arm` ↔ `Right Arm`, `left` ↔ `right`, `LEFT` ↔ `RIGHT` |
| Japanese | `左腕` ↔ `右腕` |

A pair counts only when the bone generated from the name actually exists. Center bones such as `Hips` or `Spine` have no partner, so they are painted as themselves, and the tool tells you so.

:::caution[The `(X)` in the label is not a key]
The `Symmetric Paint` label includes `(X)`, but this option is turned on and off only with the checkbox in the window. Pressing `X` in the Scene view does not toggle it.
:::

## Smooth checked bones {#선택-본-스무딩}

Check several bones, then run a batch smoothing.

- `Iterations`: 1 to 20
- `Strength`
- `Apply Smooth` (Scene view shortcut `K`)

While you move the slider, the result is recalculated in real time from the reference snapshot. When you release the slider, it is confirmed as one undo step. If no bone is checked, `K` does nothing.

## Merge bone weights {#본-웨이트-합치기}

Move all weights of bone A to bone B. After the move, A has zero weight, so you can safely delete that bone.

| Button | What it does |
|---|---|
| Merge active bone into parent | Moves the active bone's weights to its parent |
| Merge checked bones into active bone | Moves the checked bones' weights to the active bone |

The target is either the parent bone or another bone. If the source and the target are the same, or the bone is locked, the merge does not happen.

Use this to clean up stray bones that a garment does not need. → [Clothing fit](/workflow/clothing-fit)

## Transfer weights from another mesh {#다른-메쉬에서-웨이트-가져오기}

If you set a mesh that already has weights as the source, such as an avatar body, the tool copies the weights of the nearest surface point onto the current mesh. This is the basic step of clothing fit.

1. Put a `SkinnedMeshRenderer` that already has weights into `Source mesh`.
2. Set `Max distance`.
3. Choose `Apply to`.
4. Press `Transfer Weights`.

| `Apply to` | Target |
|---|---|
| Whole mesh | All vertices |
| Weights of checked bones only | Only the influence of the checked bones |
| Vertices without weights only | Only vertices not attached to any bone yet |

The result reports how many vertices were applied, how many were out of range, and how many were skipped. The tool does not transfer when the source mesh has Read/Write turned off or has no weights.

### When the spaces do not match {#전송-공간}

Weights are bind pose data, so the two meshes must be in the same space for the matching points to line up. If the transforms of the source and target renderers differ, the window warns you. If the result is off, turn on `Ignore source transform (match in bind pose local space)` and run it again. This option matches in bind pose local space instead of world transforms.

## How weights are stored

A painted value is written to every vertex in the same [weld group](/internals/session-and-undo#웰드-그룹), and the sum is normalized to 1.

Direct painting works within Unity's legacy four-slot range. The bone influences of **unpainted** vertices beyond five are kept as they are. → [Variable bone weights](/internals/bake#가변-본-웨이트)

If the bone influences exceed the slot count, the weakest ones are cut, and the tool tells you how many vertices were affected.
