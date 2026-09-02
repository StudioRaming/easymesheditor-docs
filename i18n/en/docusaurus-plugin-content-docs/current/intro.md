---
id: intro
title: Easy Mesh Editor Introduction
sidebar_label: Introduction
slug: /
---

# Easy Mesh Editor

**A mini Blender inside Unity's Scene view.**

You don't need to leave your project to fix meshes. With the avatar in place and the pose showing exactly what you're looking at, push surfaces, delete vertices, create expression keys, and paint skin weights — all inside the editor. No more round trips of exporting FBX, re-importing, and re-setting materials, physics, and prefab references.

A tool for VRChat and WARUDO avatar creators. Pushing in places where clothing pierces the body, moving weights to new parts, and mirroring expression keys — the work that actually eats up your time all fits in this single window.

Unity Editor only. Not a runtime feature for player builds.

## Four Tabs

| Tab | What it does | Target |
|---|---|---|
| `Sculpt` | Push and pull surfaces with 5 brush types and smooth/flatten them | SkinnedMeshRenderer · MeshRenderer |
| `Edit` | Select vertices/edges/faces, transform with gizmos, delete/separate/merge | SkinnedMeshRenderer · MeshRenderer |
| `BlendShape` | Create, fix, and mirror expression keys; import from other meshes | SkinnedMeshRenderer only |
| `Weight` | Paint bone weights, smooth, and import from other meshes | SkinnedMeshRenderer only |

All four tabs share one edit session. When you switch tabs, your selections, masks, and undo history stay put.

## The Original Mesh Stays Safe

This tool's safety model is one sentence: **The original mesh asset does not change until you press `Bake`.**

1. Press `Load` and a temporary mesh (Work Mesh) is created from the original. The renderer switches to it.
2. All edits happen on the Work Mesh.
3. Press `Bake` and `<original>_Edit.asset` is created next to the original. The renderer switches to that asset.
4. Press `Revert` or close the window and the renderer goes back to the original.

Even if the editor recompiles scripts or you enter Play Mode, your work doesn't just vanish. The Work Mesh is serialized to `Library/EmeAutoSave/` right before the reload, and automatically restored when the reload finishes. → [Session and Undo](/internals/session-and-undo)

:::note[`Bake` ends the session]
It's not a button you press while working. It's a button you press once at the end. If you want to save just one expression key during editing, use `Save as New Key` instead — it doesn't write to the asset yet. → [Quick capture vs Bake](/guides/blendshape#빠른-캡처와-bake)
:::

## First Steps

[Installation](/getting-started/installation) → [Your First Session](/getting-started/first-session) → [Using the Window](/guides/window)

Installation section 1 specifies the supported Unity versions. If the `Editor/Shaders` folder is missing, the Scene view display won't work at all, so check that section first.

## Where to Read

| Situation | Document |
|---|---|
| **Fit clothing to an avatar** | [Clothing Fit](/workflow/clothing-fit) |
| Create expression keys | [Making Expression Keys](/workflow/expression-keys) |
| Clothing pierces the body | [Sculpt](/guides/sculpt) |
| Delete vertices or detach parts | [Edit](/guides/edit) |
| New parts don't follow the pose | [Weight Paint](/guides/weight-paint) |
| Handle multiple meshes at once | [Multiple Meshes](/guides/multi-mesh) |
| Find out what a key does | [Shortcuts](/reference/shortcuts) |
| Want to know what files were created | [Output Files](/reference/output-files) |
| Something seems wrong | [Troubleshooting](/troubleshooting) |
| Curious about why it works this way | [Session and Undo](/internals/session-and-undo) |

## Document Structure

**Tab usage guides** correspond 1:1 with the four tabs in the window. You can find the document by the exact tab name shown on screen.

| Tab in window | Document |
|---|---|
| Window common (header, target, save) | [Using the Window](/guides/window) |
| `Sculpt` | [Sculpt](/guides/sculpt) |
| `Edit` | [Edit](/guides/edit) |
| `BlendShape` | [BlendShape](/guides/blendshape) |
| `Weight` | [Weight Paint](/guides/weight-paint) |

:::note[Labels are exactly as they appear on screen]
Phrases in backticks in this document (`Load`, `Auto Normalize`, `Merge by Distance`, ...) are **labels actually displayed in the Korean UI.** If you're using the English or Japanese window, see the documentation for that language.
:::

## Feedback

Bug reports, questions, feedback: `studioraming@gmail.com`

When you submit, including the following speeds up reproduction:

1. Unity version (e.g., `2022.3.22f1`)
2. Render pipeline (BRP / URP)
3. Easy Mesh Editor version (badge at top right of window, or version badge at top of this site)
4. Full Console log
5. Reproduction steps — what mesh you `Load`ed and what you clicked in which tab
