---
id: bake
title: Save Mesh internals
sidebar_position: 2
---

# Save Mesh internals

**After reading this page** you will know what `Save Mesh` (Bake) does and in what order, when it cleans up vertices and when it skips the cleanup, and how meshes with more than four bone influences per vertex are preserved.

## Order

1. If a shape key edit is open, stop and ask you to finish the edit first.
2. If you worked with auto normalize off, normalize the weights once.
3. Make a copy of the Work Mesh. The live mesh is not touched.
4. [Clean up unused vertices](#고아-정점-정리) on the copy.
5. Validate the data: NaN, Infinity, topology, and array lengths.
6. Choose the output path from the provenance record, and write the asset.
7. Switch the renderer to the new asset, and end the session.

Large meshes show a progress bar.

## Cleaning up unused vertices {#고아-정점-정리}

`Delete` on `Select & Move` removes only the triangles and leaves the vertex buffer as it is. If vertices were reordered during editing, the indexes used by the selection, the masks, and the undo snapshots would all go out of step.

So the cleanup runs **once, on the copy, during `Save Mesh`**. It removes vertices that no submesh triangle uses, and it remaps the rest.

Preserved: normals, tangents, UV0 to UV7, colors, bone weights (including variable influences), bindposes, and all blend shape frames.

The cleanup runs through the whole process on the staging copy, and the result is copied to the target only when every step succeeds. A half-rewritten mesh is never left behind.

### Cases where the cleanup is skipped

| Condition | Result |
|---|---|
| A non-triangle submesh (Quad, Line, Point) is present | The cleanup is skipped. Nothing appears in the window; the reason goes to the console only when the diagnostics switch (EditorPrefs `StudioRaming.EasyMeshEditor.Diag`) is on |
| A blend shape with the same name exists | The blend shape channels are copied as they are and the cleanup runs. Only when they cannot be copied exactly is the cleanup skipped, and then the reason goes to the diagnostic log only |
| The cleanup itself fails | The mesh is left unchanged and the tool tells you |


A skipped cleanup does not stop `Save Mesh`. Only the vertex count stays the same.

## Normals

`Save Mesh` does not recalculate normals on its own. Only the normals you explicitly created during editing are written.

- `Recalculate normals`: recalculates the normals of the selected vertices with area-weighted smoothing.
- `Flip normals`: reverses the winding of the selected faces, and also reverses the blend shape normal and tangent deltas and the vertex tangents.
- When you create or edit a shape key, the normal deltas of that key are recalculated with area weighting. This applies to saving a key edit, saving a new key, and `Save as New Key` alike.

## Variable bone weights {#가변-본-웨이트}

A mesh can have more than four bone influences per vertex. The legacy `BoneWeight` API handles only four, so if it were used alone, **the whole mesh would be cut to four slots, including the vertices that were never painted.**

So the session keeps the source's variable weight data aside when you `Load`.

- When you paint weights, only the **painted weld groups** are rewritten into four slots.
- Everything else is kept from the stored source data.
- When saving, the two are merged and written in one pass.

As a result, painting one arm leaves the five-influence vertices in the leg as they were.

Undo snapshots, delete and separate, and the final synchronization all go through this path.
:::caution[Separated pieces are the exception]
A `_Part` piece separated on `Select & Move` keeps the source's bone influence count and is not cut down to four slots. → [Limitations](/limitations)
:::

## Matching the name {#이름-맞추기}

Unity warns when the main object inside an asset file has a different name from the file. Just before saving, `Save Mesh` renames the mesh object to match the file name.

## When saving fails

When `Save Mesh` fails, the **session stays open.** Fix the cause and try again.

If you saved several meshes together, only the ones that succeeded are written as assets. The failed sessions stay open so you can try again. The result appears in a per-target table. → [Using the window](/guides/window#저장-결과표)

## Color buffers

If a mesh's color channel is imported as 8-bit (UNorm8), float colors cannot be written to it directly. Snapshots, cleanup, separation, and session sync all go through the same read and write path, and they follow the format of the source mesh.
