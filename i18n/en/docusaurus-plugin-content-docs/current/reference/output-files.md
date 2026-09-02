---
id: output-files
title: Output Files
sidebar_position: 3
---

# Output Files

**After reading this document**, you'll understand what this tool creates in your project, why it updates existing files in some cases and creates new ones in others, and how it never overwrites someone else's assets.

## Three Types

| Path | When | Version Control |
|---|---|---|
| `<original>_Edit.asset` | `Bake` | Commit this |
| `<original>_Part.asset` | `Separate Selection (P)` · `Separate by Islands (Shift+P)` | Commit this |
| `Library/EmeAutoSave/<id>.asset` | Auto-saved right before domain reload | Don't commit |

The first two are created **next to the original mesh asset.** The third is under `Library/`, so Unity treats it as cache and excludes it from version control.

## `_Edit.asset`

The final mesh asset created by `Bake`. Once created, the renderer switches to this asset.

Contents: vertices, normals, tangents, UV0~UV7, colors, submesh·material correspondence, bindpose, bone weights (including variable bone weights on 2020.1+), all blend shape frames.

During `Bake`, any unreferenced orphan vertices are cleaned up — `Cleaned up {0} unused vertices`. → [Bake Details](/internals/bake)

The mesh object's name inside the asset is matched to the filename.

## `_Part.asset`

Created when you separate in the `Edit` tab. A new GameObject appears in the scene, and its renderer uses this asset.

If separation fails midway, the partial `_Part.asset` is deleted and the original stays intact — `Separate failed, reverted: {0}`

## Provenance and Owner {#provenance와-owner}

Output assets carry a **marker of where they came from.** This marker decides two things:

1. Whether to **update the same file or create a new one** on next `Bake`
2. **Never touch anyone else's asset** even if the name overlaps

The marker is in the form `<source mesh GUID>:<localId>@<renderer owner token>`.

| Situation | Result |
|---|---|
| `Bake` again from same source, same renderer | **Update the existing `_Edit.asset` while keeping its GUID** |
| Different renderer using the same source mesh | Creates a separate output file |
| Someone else's asset with the same name exists | Won't overwrite; creates a unique new path |

Keeping the GUID is important. Prefabs, animations, and other scenes that reference that mesh don't break.

Reloading a renderer using an already-`Baked` asset and continuing work updates the output and syncs any other loaded renderers using the same asset with the new data.

:::caution[Can't identify renderers if the scene isn't saved]
The owner token comes from the renderer's global ID. If the scene has never been saved, that ID doesn't exist, and the window tells you:

> `The scene is not saved yet, so the renderer cannot be identified. Renderers that share the same source mesh will share one output asset until the scene is saved.`

If you have multiple renderers sharing the same mesh, save the scene first.
:::

## `Library/EmeAutoSave/` {#자동-저장-폴더}

Right before the editor recompiles scripts, the Work Mesh is serialized here, and auto-restored when reload finishes.

- On restore: `Easy Mesh Editor: restored auto-saved edit sessions ({0})`
- On failure: `Easy Mesh Editor: failed to restore {0} auto-saved session(s). The files were kept at: {1}` — files aren't deleted, so you can investigate the cause.

This is a **safety net, not the result of your work.** Final saving is always `Bake`. → [Session and Undo](/internals/session-and-undo#자동-저장과-복원)

## Filtered Before Save

Invalid data is caught before it becomes a file.

- NaN / Infinity coordinates
- Topology mismatch
- Weight array length mismatch

Failed sessions are **kept open**, so you can fix the cause and `Bake` again.

## What's Safe to Delete

| File | Safe to Delete |
|---|---|
| `_Edit.asset` | No if the renderer is using it. Revert to original first, then delete. |
| `_Part.asset` | Yes after you delete that part object |
| `Library/EmeAutoSave/` | Anytime. Just loses the session it could restore |
