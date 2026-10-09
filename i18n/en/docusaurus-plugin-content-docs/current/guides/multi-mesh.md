---
id: multi-mesh
title: Multiple meshes
sidebar_position: 6
---

# Multiple meshes

**After reading this page** you will know what applies to every mesh and what applies only to the active target when you edit several meshes in one session, how the shared gizmo works, and what happens when one operation fails.

## Loading together

Select several objects in the Hierarchy and press `Load`. All of them join the same session.

Renderers that share one source mesh are also loaded and edited **separately**. They are not excluded. Each renderer's result is saved on its own, and the output is split per renderer so that files do not overwrite each other. → [Generated files](/reference/output-files#provenance와-owner)

The meshes may have different topology and different vertex counts. Each one is calculated with its own data.

## Active target {#활성-대상}

The `Active target` selector changes which mesh has focus. Some operations apply to every mesh, and others apply only to the active target.

| Tab | Scope |
|---|---|
| `Shape` | Every loaded mesh |
| `Select & Move` | Keeps the selection on every mesh, and transforms them together with the shared gizmo |
| `Shape Keys` | Keys with the same name apply to every mesh at the same time |
| `Bone Weights` | The active target only |

Delete and separate apply only to the active mesh.

## The shared gizmo on Select & Move

When you select elements in several meshes, one **world-space gizmo** transforms all of them together.

- `G` / `R` / `S` [modal transforms](/guides/edit#모달-변형) use world axes. Several meshes do not have one shared local axis.
- `A` (select all), `Alt+A` (clear), and `Ctrl+I` (invert) apply to every target.

Turn on `Per-mesh pivot` under [Pivot](/guides/edit#피벗) to give each mesh its own pivot.

Symmetry partners, selection, and brush influence are always calculated for each mesh separately.

## Shape key name intersection {#표정-키}

To edit shape keys across several meshes, every target must be a `SkinnedMeshRenderer`. The list shows **only the keys that have the same name on every target**.

Indexes can differ, because matching is by name only. Values, editing, and management apply to all meshes at the same time. If there are no common keys, the list is empty, and a new key is added to every mesh under the same name. → [Shape Keys](/guides/blendshape#다중-메쉬-키)

## Atomic rollback {#원자적-롤백}

Operations that change the structure of several meshes (batch delete, reorder, importing keys, separate) either **all succeed or all roll back.** If one step fails, every target goes back to its state before the operation.

Undo works the same way. A multi-mesh operation is grouped into one undo step. → [Session and undo](/internals/session-and-undo)

## Save Mesh works per mesh

`Save Mesh` creates a separate `<source name>_Edit.asset` for each target. Unlike the rollback rule, here only the targets that succeed are written, and a failed target keeps its session open.

The result appears as a foldable table that shows success or failure for each target. → [Using the window](/guides/window#저장-결과표)

## Performance

Opening several high-density meshes increases the cost of the Scene view overlay, box picking, skin pose calculation, and brush processing. If it feels heavy, load only the meshes you need. You can load them one row at a time from the candidate list. → [Using the window](/guides/window#불러올-후보)
