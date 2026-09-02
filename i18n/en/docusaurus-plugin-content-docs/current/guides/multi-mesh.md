---
id: multi-mesh
title: Multiple Meshes
sidebar_position: 6
---

# Multiple Meshes

**After reading this document**, you'll understand what gets applied together and what applies only to the active target when handling multiple meshes in one session, how the shared gizmo works, and what happens to the rest if one fails.

## Open Multiple Meshes Together

Select multiple objects in the Hierarchy and press `Load`. The window tells you first: `Pressing Load will open all {0} selected meshes together.` After opening: `Editing {0} meshes together`.

Renderers that share the same source mesh are automatically filtered out — `({0} skipped: same source mesh)`. Editing the same mesh twice would cause them to overwrite each other.

Different topology and vertex counts are fine. Each mesh calculates from its own data separately.

## Active Target {#활성-대상}

Use the `Active target` selector to change which mesh has focus. What gets applied together and what applies only to the active target is divided.

> `Sculpt and Edit apply to all loaded meshes. BlendShape and Weight apply to the active target.`

| Tab | Scope |
|---|---|
| `Sculpt` | All loaded meshes |
| `Edit` | Keeps selection across all meshes, transforms together with shared gizmo |
| `BlendShape` | All meshes simultaneously for keys with names in common |
| `Weight` | One active target only |

## Shared Gizmo in Edit Tab

When you select elements from different meshes, the status changes to: `Multiple meshes — {0} selected in {1} · transforms with shared gizmo (delete/separate apply to active mesh)`.

- Transform is applied **with one gizmo in world space** to all meshes together.
- Local axis for `G`/`R`/`S` [modal transforms](/guides/edit#모달-변형) can't be well-defined, so it falls back to `Multiple meshes → world axis`.
- `A` (select all), `Alt+A` (deselect), `Ctrl+I` (invert) apply to all targets.
- **Delete and separate apply only to the active mesh.**

The `Per-mesh Uniform Pivot` option in [Pivot](/guides/edit#피벗) makes each mesh use its own pivot.

Symmetry matching, selection, and brush influence always calculate independently for each mesh.

## Name Intersection in BlendShape

All targets must be `SkinnedMeshRenderer`. The list shows only **keys with the same name on every target.**

> `Shows only keys present on all {0} meshes. Values, editing, and management apply to all meshes simultaneously.`

Indices can differ — only names matter. If there are no common keys, the list is empty. New keys created have the same name added to all meshes. → [BlendShape](/guides/blendshape#다중-메쉬-키)

## Atomic Rollback {#원자적-롤백}

Operations that change structure on multiple meshes (batch delete, reorder, key transfer, separate, …) **either all succeed or all roll back.** If one fails, snapshots of all targets are restored.

> `Batch failed, reverted all meshes to pre-operation state. Check the console log.`

Undo works the same way. Multi-mesh operations are bundled as one compound undo step. → [Session and Undo](/internals/session-and-undo)

## Bake Is Per-mesh

`Bake` creates its own `<original>_Edit.asset` for each target. Unlike rollback rules, only successful ones are written and failed sessions stay open.

Results organize in a `Bake results ({0}/{1} succeeded)` table in the window. → [Using the Window](/guides/window#상태-배지)

## Performance

Opening multiple high-density meshes increases the cost of Scene view overlay, box picking, skin pose calculation, and brush processing. If it feels noticeably heavy, pick only the meshes you need and open them one by one from the `Load candidates` list. → [Using the Window](/guides/window#불러올-후보)
