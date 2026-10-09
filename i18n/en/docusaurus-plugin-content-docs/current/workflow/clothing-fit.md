---
id: clothing-fit
title: Clothing fit
sidebar_position: 1
---

# Clothing fit

**After reading this page** you will be able to follow the full sequence for putting clothing made for another avatar onto your avatar, from transferring weights to `Save Mesh`.

Assumptions: the clothing object is attached to the avatar, and the avatar's bones are already in place. The clothing cuts into the body, does not follow the pose, or has no shape keys.

## Sequence

1. [Transfer weights](#1-웨이트-전송)
2. [Correct with symmetric painting](#2-대칭-페인트로-보정)
3. [Merge unused bones](#3-안-쓰는-본-합치기)
4. [Import shape keys](#4-표정-키-가져오기)
5. [Shape](#5-모양-다듬기)
6. [Save Mesh](#6-메쉬-저장)

## 1. Transfer weights {#1-웨이트-전송}

Select the clothing object, press `Load`, and go to the `Bone Weights` tab.

Under `Transfer weights from another mesh`, set:

- `Source mesh`: the avatar body's `SkinnedMeshRenderer`
- `Scope`: `Whole mesh`
- `Max distance`: start from the default, and raise it a little at a time if many vertices are reported as out of range

Press `Transfer Weights` and read the result. It reports how many vertices were applied, how many are out of range, and how many were skipped.

Rather than raising the distance until nothing is out of range, it is better to paint the few remaining vertices by hand in the next step. A distance that is too large pulls in the wrong bones.

:::caution[If the whole result is off, the cause is the space]
If the transforms of the source and target renderers differ, the window shows a warning. In that case turn on `Ignore source transform (match in bind-pose local space)` and run the transfer again. → [Bone Weights](/guides/weight-paint#전송-공간)
:::

If the source mesh has bones whose names do not match, their influence is discarded, and the window lists them. If you need those bones, it is faster to rename the avatar's bones to match and try again.

## 2. Correct with symmetric painting {#2-대칭-페인트로-보정}

Transfer uses surface proximity, so parts that stand away from the body, such as sleeve ends, collars, and skirt hems, come out looking odd.

1. Turn on the heatmap (`Show Weights`) and see where the problem is.
2. Turn on `Symmetric Paint`. Check that the matching bones are found.
3. Hold the arm or leg bent, and paint with `Add` (1), `Subtract` (2), and `Smooth` (3).
4. To even out a wide area, `Blur` (4) and `Average` (5) are faster.

If a bone is treated as a center bone, but it should be a left or right bone, the rig's naming does not match the supported forms. → [Name rules](/guides/weight-paint#대칭-페인트)

Check several bones and run `Smooth Checked Bones` to smooth them in one pass. The boundaries around joints are cleaned up together.

## 3. Merge unused bones {#3-안-쓰는-본-합치기}

If the garment still has stray bones from the original avatar, move their weights to a parent before you delete them.

Use `Merge active bone into parent (parent name)` under `Merge Bone Weights`. After the move, the bone's weight is zero, and you can safely remove it from the hierarchy.

To clean up several bones at once, make the target bone active, check the bones to remove, and press `Merge N checked bone(s) into the active bone`.

## 4. Import shape keys {#4-표정-키-가져오기}

If the garment has a part that covers the face, such as a hood or a mask, it needs shape keys.

On the `Shape Keys` tab, use `Transfer keys from another mesh`.

- `Source mesh`: the avatar's face mesh
- Check only the keys you need. `Select all` is usually too much.
- Set `Max distance`, then press `Import`.

Vertices with no matching point stay where they are. If a key with the same name already exists, the tool asks whether to replace it. Lock the keys you want to keep, with `L`, before you import. Locked keys are skipped.

## 5. Shape {#5-모양-다듬기}

At this point the movement matches. What remains is the places where the clothing cuts into the body.

On the `Shape` tab:

- Use `Pull` (1) to push the part that cuts through back inside.
- Turn on `Symmetry`, and check the axis with `Plane`.
- Protect the parts you must not change: press `M` for mask mode, then use `Island` to click them.

You can also remove the body inside the clothing. On the `Select & Move` tab, select faces that the garment fully covers, then delete them. The polygon count goes down as well. Vertices left unused by the deletion are cleaned up automatically during `Save Mesh`.

Turn on X-Ray (`Alt+Z`) to see and select the body surface inside the clothing.

## 6. Save Mesh {#6-메쉬-저장}

If you loaded the clothing and the body together, one `Save Mesh` creates an `_Edit.asset` for each. Check the result table to confirm that every target succeeded.

If the badge shows `EDITING KEY` before `Save Mesh`, confirm or cancel the shape key edit first.

## Coming back to edit later

Load a renderer that already uses an `_Edit.asset` and continue working. If the output came from the same source, `Save Mesh` updates **the same file and keeps its GUID**, so references from prefabs and animations do not break. → [Generated files](/reference/output-files)
