---
id: bake
title: Bake Details
sidebar_position: 2
---

# Bake Details

**After reading this document**, you'll know what `Bake` does in what order, when it cleans vertices and when it skips, and how meshes with 5+ bone influences are preserved.

## Steps

1. If a transaction is open, abort.
2. If work was done without auto-normalize, normalize weights once.
3. Make a copy of the Work Mesh (don't touch the live one).
4. [Clean orphan vertices](#고아-정점-정리) from the copy.
5. Validate data — NaN/Infinity, topology, array lengths.
6. Use `provenance` to determine the output path and write the asset.
7. Make the renderer use the new asset and end the session.

Large meshes show progress bars — `Baking mesh` · `Cleaning unused vertices...` · `Saving mesh asset...`

## Orphan Vertex Cleanup {#고아-정점-정리}

`Delete Selection (X · {0} faces)` deletes only triangles, leaving the vertex buffer intact. The live Work Mesh's indices are tied to selections, masks, undo snapshots. Recompacting during edit would break them all.

So cleanup happens **once at `Bake` time, on the copy.** It removes vertices that no submesh triangle references, then remaps the rest.

Result: `Cleaned up {0} unused vertices`.

Preserved: normals, tangents, UV0~UV7, colors, bone weights (including variable influences), bindpose, all blend shape frames.

Cleanup is performed entirely on a staging copy and copied to the target only when completely successful. Half-rewritten meshes don't survive.

### Cases Skipped

| Condition | Message |
|---|---|
| Non-triangle submeshes (Quad/Line/Point) exist | `Skipped orphan vertex cleanup: the mesh has non-triangle submeshes (quads/lines/points).` |
| Duplicate blend shape names exist | `Skipped orphan vertex cleanup: the mesh has duplicate blend shape names.` |
| Cleanup itself fails | `Orphan vertex cleanup failed; the mesh was left unchanged.` |

Skipping doesn't stop `Bake`. Vertices just won't be reduced.

## Normals

`Bake` doesn't arbitrarily recalculate normals. Only explicitly created ones during editing are reflected.

- `Recalculate Normals` — recalculates normals for selected vertices using area-weighted smooth.
- `Flip Normals` — reverses winding of selected faces and also reverses normals and tangent deltas in blend shapes and vertex tangents.
- When creating or editing blend shape keys, that key's normal deltas are recalculated area-weighted. All three paths (existing key save, new key save, `Save as New Key`) use the same route.

## Variable Bone Weight {#가변-본-웨이트}

From Unity 2020.1, meshes can have 5+ bone influences per vertex. The legacy `BoneWeight` API only handles 4, so using it alone **cuts the entire mesh to 4-slot, even unpainted vertices.**

So the session stores the original's variable weight data separately at `Load` time.

- Paint a weight and **only the weld groups you touched** convert to 4-slot.
- The rest stay as the preserved original.
- When saving, both are merged and written at once.

Result: paint one arm's weights and the leg's 5-influence vertices stay intact.

Undo snapshots, delete/separate, and final sync all go through this path. Unity 2019.4 has no variable weights, so it stays legacy 4-slot.

:::caution[Separated parts are an exception]
`Separate Selection (P)`'s `_Part.asset` is limited to 4-slot. → [Limitations](/limitations)
:::

## Name Matching

Unity warns if the main object's name inside an asset differs from the filename. `Bake` matches the mesh object's name to the filename right before saving.

## On Failure

If `Bake` fails, **the session stays open.**

> `Bake failed ({0} succeeded / {1} failed): {2} — failed sessions were kept so you can retry.`

If multiple meshes were baked, only successful ones become assets. Failed sessions stay open so you can fix and retry. Results are arranged in a `Bake results ({0}/{1} succeeded)` table. → [Using the Window](/guides/window)

## Color Buffer

If a mesh's color channel is imported as 8-bit (UNorm8), float colors can't be used directly. Snapshots, cleanup, separate, and session sync all go through one read/write path and follow the original mesh's format.
