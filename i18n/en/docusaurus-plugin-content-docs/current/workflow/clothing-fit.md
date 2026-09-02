---
id: clothing-fit
title: Clothing Fit
sidebar_position: 1
---

# Clothing Fit

**After reading this document**, you can follow the entire process of fitting clothing made for a different avatar to your current avatar — from weight transfer through `Bake` — in one go.

Assumption: you've attached the clothing object to the avatar, and the avatar bones are already rigged. The clothing pierces the body, doesn't follow the pose, and has no expression keys yet.

## Steps

1. [Transfer weights](#1-웨이트-전송)
2. [Refine with symmetric paint](#2-대칭-페인트로-보정)
3. [Merge unused bones](#3-안-쓰는-본-합치기)
4. [Import expression keys](#4-표정-키-가져오기)
5. [Refine shape](#5-형태-다듬기)
6. [Bake](#6-bake)

## 1. Transfer Weights {#1-웨이트-전송}

Select the clothing object and `Load` → `Weight` tab.

In `Import Weights from Another Mesh`:

- `Source Mesh` = avatar body's `SkinnedMeshRenderer`
- `Scope` = `Entire Mesh`
- `Max Distance` = start at default; if many `out of range` vertices are reported, raise it gradually

Press `Import Weights` and check the result.

> `Imported weights — applied {0} vertices · out of range {1} · skipped {2}.`

Rather than raising distance until `out of range` is 0, leaving a few remaining and hand-painting them in the next step usually gives better results. Raising distance too much pulls in unintended bones.

:::caution[If results are completely off, it's a space issue]
If source and target renderer transforms differ, the window warns. Then enable `Ignore Source Transform (match in bind-pose local space)` and try again. → [Weight Paint](/guides/weight-paint#전송-공간)
:::

If source bones can't be matched by name, you see a list: `{0} source bones found no match, their influence (sum {2}) dropped: {1}`. If those bones are actually needed, it's faster to go back and fix the bone rigging names to match.

## 2. Refine with Symmetric Paint {#2-대칭-페인트로-보정}

Transfer uses surface-proximity matching, so parts far from the body like sleeve cuffs, collars, and skirt hems end up awkward.

1. Turn on `Show Weights` and use the heatmap to see what's off.
2. Turn on `Symmetric Paint`. Check that `Symmetric bone: {0}` is correct.
3. Pose with arm or leg bent and paint with `Add (1)` · `Subtract (2)` · `Smooth (3)`.
4. For smooth areas, `Blur (4)` and `Average (5)` are fast.

If you see `No symmetric bone — treating as center bone, painting both sides with this one,` that bone is treated as central. If it's a left/right bone and you see this, your rig's naming convention differs from supported patterns. → [Name matching rules](/guides/weight-paint#대칭-페인트)

Check multiple bones and use `Smooth Selected Bones` at once to clean up edges around joints in one pass.

## 3. Merge Unused Bones {#3-안-쓰는-본-합치기}

If the clothing has stub bones from its original avatar, move their weights before deleting them.

Use `Merge Bone Weights` with `Merge Active into Parent ({0})`. After moving, that bone's weight becomes 0 and it can be safely deleted from the hierarchy.

To clean up multiple bones at once, make the target bone active, check the bones to remove, then press `Merge {0} checked bones into active`.

## 4. Import Expression Keys {#4-표정-키-가져오기}

If the clothing has parts covering the face like hoods or masks, you need expression keys.

`BlendShape` tab → `Import Keys from Another Mesh`.

- `Source Mesh` = avatar face mesh
- Check only the keys you need (`Select All` is usually overkill)
- Set `Max Distance` and `Import`

Vertices with no match stay as-is and don't move — `{1} vertices found no match — try increasing max distance.`

If a key with the same name already exists, you're asked to replace. Lock keys you want to keep first with `L`. Locked keys are skipped in transfer.

## 5. Refine Shape {#5-형태-다듬기}

By now, movement is correct. What's left is where the clothing pierces the body.

In the `Sculpt` tab:

- Use `Elastic (1)` to push piercing parts inward.
- Turn on symmetry and use `Show Symmetry Plane` to verify the axis.
- Lock areas that shouldn't move using `Mask Mode (M)` with `Island` — click to lock.

You can also remove body by cutting. In the `Edit` tab, select faces completely hidden by clothing and press `Delete Selection (X · {0} faces)` to remove them and reduce polygons. Orphan vertices left after deletion are automatically cleaned up at `Bake`.

Turn on `Alt+Z` X-Ray to see and select through the clothing to the body surface underneath.

## 6. Bake {#6-bake}

If you loaded the clothing and body together, one `Bake` creates each `_Edit.asset`. Check the result table — all should be `OK`.

Before `Bake`, if the badge says `IN TRANSACTION`, first commit or cancel blend shape edits.

## When You Need to Revisit

Reload the renderer using the `_Edit.asset` and continue working. If output comes from the same source, `Bake` **updates the same file while keeping its GUID**, so prefab and animation references don't break. → [Output Files](/reference/output-files)
