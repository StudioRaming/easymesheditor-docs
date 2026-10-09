---
id: output-files
title: Generated files
sidebar_position: 3
---

# Generated files

**After reading this page** you will know what this tool creates in your project, why it updates an existing file in some cases and creates a new one in others, and why it never overwrites someone else's asset.

## Three kinds

| Path | When | Version control |
|---|---|---|
| `<source name>_Edit.asset` | `Save Mesh` | Commit it |
| `<source name>_Part….asset` | Pieces split off during `Save Mesh` | Commit it |
| `Library/EmeAutoSave/` | Edits kept on reload, Play, window close, and so on | Do not commit |

The first two are created **next to the source mesh asset**. The third is under `Library/`, so Unity treats it as a cache, and version control ignores it.

## `_Edit.asset`

This is the final mesh asset that `Save Mesh` creates. The renderer switches to this asset as soon as it is created.

It holds: vertices, normals, tangents, UV0 to UV7, colors, submesh and material mapping, bindposes, bone weights (including variable bone weights), and all blend shape frames.

During saving, vertices that no triangle uses are cleaned up once. → [Save Mesh internals](/internals/bake)

The mesh object inside the asset is renamed to match the file name.

A `<source name>_Edit.asset` made by 0.1.x is not treated as an output of 1.0. Saving the same mesh again with `Save Mesh` in 1.0 does not overwrite it. It creates `<source name>_Edit 1.asset`, and the renderer uses the new file.

## `_Part.asset`

When you separate pieces on `Select & Move` and then run `Save Mesh`, one `_Part` asset is created for each piece. Each piece becomes a new GameObject in the scene, and that renderer uses the asset.

If saving fails partway, the partial `_Part.asset` is deleted, and the source stays as it was.

## Provenance and owner {#provenance와-owner}

Each output asset stores a record of **where it came from**. This record decides two things.

1. Whether a new `Save Mesh` **updates the same file or creates a new one**
2. Whether the tool **avoids overwriting someone else's asset** that has the same name

The record holds the source mesh GUID and the renderer's owner token.

| Situation | Result |
|---|---|
| Same source, same renderer, `Save Mesh` again | The existing `_Edit.asset` is **updated and keeps its GUID** |
| Another renderer that uses the same source mesh | A separate output file is created |
| An asset with the same name already belongs to someone else | It is not overwritten. A unique path is created |

Keeping the GUID matters. Prefabs, animations, and other scenes that reference the mesh do not break.

If you load a renderer that already uses an output asset from this tool and keep working, the output is updated. Other loaded renderers that use the same asset are synchronized with the new data.

:::caution[Save the scene, or the renderer cannot be identified]
The owner token comes from the renderer's global ID. If the scene has never been saved, that ID does not exist, and the window tells you so. If several renderers use the same source mesh, save the scene once before you start.
:::

## `Library/EmeAutoSave/` {#자동-저장-폴더}

This folder holds the Work Mesh that is being edited. Edits are saved here on domain reload, entering Play Mode, closing the window, closing the scene, and quitting Unity. They are restored when you return to edit mode or reopen the window or the scene.

This is a **safety net, not the result of your work**. The final save is always `Save Mesh`. → [Session and undo](/internals/session-and-undo#자동-보존과-복원)

If the save fails, Play Mode and quitting stop, and the reason appears in the status line. The file is not deleted, so you can check the cause.

## Things that block saving

Invalid data is filtered out before it reaches a file.

- NaN or Infinity coordinates
- Topology mismatch
- Weight array length mismatch

A session whose save failed **stays open**, so you can fix the cause and press `Save Mesh` again.

## What you can delete

| File | Safe to delete? |
|---|---|
| `_Edit.asset` | Not while a renderer uses it. Return the renderer to the source first, then delete |
| `_Part.asset` | Yes, after you delete the piece's GameObject |
| `Library/EmeAutoSave/` | Yes, at any time. You only lose the session that would have been restored |
