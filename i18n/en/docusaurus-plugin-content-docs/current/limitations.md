---
id: limitations
title: Current limitations
sidebar_position: 91
---

# Current limitations

This applies to Easy Mesh Editor `1.0.0`. What is listed here is not a bug. It is **work this version does not do yet**.

## Missing features

| Feature | Status |
|---|---|
| Extrude | Not implemented |
| Inset | Not implemented |
| Bevel | Not implemented |

All three create new faces, so they are separate work and are not in this version. The `Select & Move` tab in this version can select, move, delete, separate, and merge existing faces. Topology changes are limited to delete, separate, and Merge by Distance. → [Select & Move](/guides/edit)

## Target limits

- `Shape Keys` and `Bone Weights` tabs work **only with `SkinnedMeshRenderer`**. A plain `MeshRenderer` supports `Shape`, `Select & Move`, and `Save Mesh` only.
- When several meshes are edited together, every target must be an SMR for `Shape Keys`.
- Meshes that cannot be read or written, non-triangle topology, and damaged mesh data are not guaranteed to edit correctly.

## Bone weights

- Direct painting works within Unity's legacy **four-slot** range.
- Bone influences of **unpainted** vertices beyond five are kept. → [Variable bone weights](/internals/bake#가변-본-웨이트)

## Shape keys

- A key with several frames has **only its last frame (100%) edited**. When you save, the middle frames are updated in proportion to that change. There is no way to shape the middle frames one by one.
- If several keys share a name, only the one you clicked in the list is edited.
- During a shape key edit, you cannot save an operation that changes the vertex count (delete or separate) as a key.

## Scene view behavior

- `Alt+click` edge loop works only on a **click without movement**. This keeps Unity's `Alt+drag` Scene view rotation intact. → [Select & Move](/guides/edit#엣지-루프와-엣지-링)
- The axis symmetry shortcuts are `Alt+Shift+X` / `Y` / `Z`. Plain `X` `Y` `Z` and `Alt+Z` stay as Unity's tool handles and X-Ray, so this tool does not capture them.
- Scene view shortcuts do not work while you type in a text field, and they do not change Unity's global Shortcut profile.
- The `Symmetric Paint (X)` option on `Bone Weights` has `(X)` in its label, but it is turned on and off **only with the checkbox** in the window.

## Window and automatic keeping

- If you have two or more windows open and scripts recompile, automatic keeping restores only one of them.
- Automatic keeping has no check for whether anything changed. Even if you only pressed `Load` and did nothing else, the session is kept and restored.
- If the editor closes unexpectedly, automatic keeping does not run. Instead, a checkpoint is saved at least every 60 seconds while there are unsaved edits, and the next time the window opens, a recovery banner offers to restore it.

## Performance

- High-density meshes increase the cost of the Scene view overlay, exact box picking, skin pose calculation, and brush processing.
- Opening several meshes together adds those costs. Load only what you need. → [Multiple meshes](/guides/multi-mesh)
- The snapshots that support structural undo have a memory limit. When the limit is reached, the oldest snapshots are dropped.

## Runtime environment

- **Unity Editor only.** It is not a runtime feature for player builds.
- Supported versions: **Unity 2019.4 ~ Unity 6 (6000.0, 6000.3 LTS)**, Built-in RP and URP.
- Installing the DLL edition and the source edition in the same project causes compile errors.
- A source mesh outside the `Assets` folder (Unity built-in meshes, package meshes) is read-only and cannot be saved by `Save Mesh`. The window says so from `Load` on. 1.0 does not copy it for you, so copy the mesh into the `Assets` folder, assign the copy to the renderer, then load it again.

## Recommendation

Keep version control or a separate backup for important projects. `Save Mesh` does not overwrite the source asset, but the mesh that the renderer points to does change.

## Reporting

`studioraming@gmail.com`

1. Unity version
2. Render pipeline (BRP / URP)
3. Easy Mesh Editor version (`1.0.0`)
4. The full Console log
5. Steps to reproduce
