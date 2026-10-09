---
id: intro
title: Introduction
sidebar_label: Introduction
slug: /
---

# Easy Mesh Editor

**A mesh editing tool that works inside the Unity Scene view.**

:::info[Buyers of 0.1.x update for free]
Before updating, save any open edits with `Save Mesh` or discard them with `Discard edits`, and close the Easy Mesh Editor window. If you installed the source (.cs) edition before, delete it first. Then import the new `.unitypackage` over the existing `Assets/StudioRaming/EasyMeshEditor` folder. Your `_Edit.asset` files from 0.1.x stay and keep working. Saving the same mesh again in 1.0 creates a new `<source name>_Edit 1.asset`. → [Upgrading from 0.1.x](/getting-started/installation#0-1x에서-올리기)
:::

You do not need to leave the project to fix a mesh. Push surfaces, move vertices, make shape keys, and paint skin weights on the pose you are looking at, with the avatar already dressed. The round trip of re-exporting the FBX, re-importing it, and re-linking materials, physics, and prefab references goes away.

It is built for people who make VRChat and WARUDO avatars and clothing. Pressing in the spot where clothing cuts into the body, moving weights onto new parts, and mirroring shape keys left and right are the tasks that take real time, and they all live in this one window.

Unity Editor only. It is not a runtime feature that goes into a player build.

## Four work tabs

| Tab | What it does | Target |
|---|---|---|
| `Shape` | Pull, smooth, flatten, gather, and inflate the surface with five brushes | SkinnedMeshRenderer, MeshRenderer |
| `Select & Move` | Select, move, delete, separate, and merge vertices, edges, and faces | SkinnedMeshRenderer, MeshRenderer |
| `Shape Keys` | Create and edit shape keys, make mirrored keys, and import keys from another mesh | SkinnedMeshRenderer only |
| `Bone Weights` | Paint bone weights, merge them, and transfer them from another mesh | SkinnedMeshRenderer only |

The four tabs share one editing session. Selection, masks, and undo history stay when you switch tabs.

## The source asset is not touched

The safety model of this tool fits in one sentence: **the source mesh asset does not change until you press `Save Mesh` (Bake).**

1. `Load` creates a temporary copy of the source mesh (the Work Mesh), and the renderer uses that copy.
2. Every edit happens on the Work Mesh.
3. `Save Mesh` creates `<source name>_Edit.asset` next to the source, and the renderer switches to that asset.
4. `Discard edits` throws away the edits, and the renderer goes back to the source.

Recompiling scripts or entering Play Mode does not make your work disappear. The Work Mesh being edited is kept in `Library/EmeAutoSave/` and restored when you return to edit mode. → [Session and undo](/internals/session-and-undo)

:::note[`Save Mesh` ends the session]
Do not press it as you work. Press it once, when you are done. To keep only one expression as a shape key during editing, use `Save as New Key`. That does not change the asset yet. → [Quick capture and Save Mesh](/guides/blendshape#빠른-캡처와-bake)
:::

## If this is your first time

[Installation](/getting-started/installation) → [First editing session](/getting-started/first-session) → [Using the window](/guides/window)

Section 1 of the installation page lists the supported Unity versions. If the two shaders in `Editor/Shaders` are missing, the Scene view display does not work, so read that section first.

## Where to start reading

| Situation | Page |
|---|---|
| **Fitting clothing to an avatar** | [Clothing fit](/workflow/clothing-fit) |
| Making a shape key | [Making shape keys](/workflow/expression-keys) |
| Clothing cuts into the body | [Shape](/guides/sculpt) |
| Deleting vertices or separating parts | [Select & Move](/guides/edit) |
| A new part does not follow the pose | [Bone Weights](/guides/weight-paint) |
| Working on several meshes at once | [Multiple meshes](/guides/multi-mesh) |
| Finding what a key does | [Shortcuts](/reference/shortcuts) |
| Knowing what a saved file is | [Generated files](/reference/output-files) |
| Something looks wrong | [Troubleshooting](/troubleshooting) |
| Understanding why it works this way | [Session and undo](/internals/session-and-undo) |

## How the docs are organized

The **Tab guides** section matches the four tabs of the window one to one. You can find a page by the tab name you see on screen.

| Tab in the window | Page |
|---|---|
| Common to the window (header, target, save) | [Using the window](/guides/window) |
| `Shape` | [Shape](/guides/sculpt) |
| `Select & Move` | [Select & Move](/guides/edit) |
| `Shape Keys` | [Shape Keys](/guides/blendshape) |
| `Bone Weights` | [Bone Weights](/guides/weight-paint) |

:::note[Labels are the text shown on screen]
Text in backticks (`Load`, `Auto Normalize`, `Merge by Distance`, and so on) is the label the UI actually shows. If you use the window in Korean or Japanese, read the page for that language.
:::

## Reporting problems

Bugs, questions, and feedback: `studioraming@gmail.com`

When you report a problem, these details help us reproduce it quickly.

1. Unity version (for example `2022.3.22f1`)
2. Render pipeline (BRP / URP)
3. Easy Mesh Editor version (the version badge in the window header, or the badge at the top of this site)
4. The full Console log
5. Steps to reproduce: which mesh you loaded, and what you pressed on which tab
