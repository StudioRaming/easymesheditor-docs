---
id: limitations
title: Current Limitations
sidebar_position: 91
---

# Current Limitations

Easy Mesh Editor `0.1.1` baseline. What's here is **not a bug but what we don't do yet** this version.

## Unimplemented Features

| Feature | Status |
|---|---|
| Extrude | Not implemented |
| Inset | Not implemented |
| Bevel | Not implemented |

All three are topological operations that create new faces, so we set them aside for now. This version's `Edit` tab goes as far as selecting existing faces, moving them, deleting, separating, and merging. → [Edit](/guides/edit)

## Target Limits

- `BlendShape` and `Weight` tabs are **`SkinnedMeshRenderer` only.** Regular `MeshRenderer` works up to `Sculpt` · `Edit` · `Bake` only.
- When handling multiple meshes, `BlendShape` requires **all** targets to be SMR.
- Read/write-disabled meshes, non-triangle topology, corrupt mesh data are not guaranteed to edit correctly.

## Bone Weights

- Direct painting operates within Unity's legacy **4-slot** range.
- In Unity 2020.1+, 5+ bone influences on **unpainted** vertices are preserved. → [Variable Bone Weight](/internals/bake#가변-본-웨이트)
- Unity 2019.4 lacks the variable bone weight API entirely. Only 4-slot handled.
- Parts detached with `Separate Selection (P)` are **limited to 4-slot**, even if the original had 5+.

## BlendShape

- Keys with multiple frames edit **only the final frame (100%).** Intermediate frames update proportionally when saved. No per-frame sculpting.
- If multiple keys share a name, the list item you clicked is the one edited.
- During a transaction, operations that change vertex count (delete, separate) can't be saved as keys.

## Scene View Controls

- `Alt+click` edge loop works only on **click without dragging.** We preserve Unity's `Alt+drag` scene rotation. → [Edit](/guides/edit#엣지-루프와-엣지-링)
- Symmetry shortcuts are `Shift+Alt+X` / `Y` / `Z`. Solo `X` `Y` `Z` and `Alt+Z` are reserved for Unity tool handles and X-Ray, not intercepted.
- Scene view shortcuts don't work during text input and don't modify Unity's global Shortcut profile.
- `Weight` tab's `Symmetric Paint (X)` has `(X)` in the label but toggles **only via the window checkbox.**

## Window and Docking

- If window height is insufficient, [Compact Mode](/guides/window#컴팩트-모드) auto-engages, hiding subtitle and `How to use` guide blocks. Can't toggle.
- Opening **2+ windows** and recompiling only restores one from autosave.
- Autosave has no dirty check. `Load` alone triggers save/restore even if nothing changed.
- Editor crashes are not autosave targets.

## Performance

- High-density meshes increase Scene view overlay, precise box picking, skin pose calculation, and brush processing costs.
- Multiple open meshes add those costs together. Pick only what you need. → [Multiple Meshes](/guides/multi-mesh)
- Structural undo snapshots have a memory limit. Oldest are dropped when exceeded.

## Runtime Environment

- **Unity Editor only.** Not a player build feature.
- Support range: **Unity 2019.4.31f1 ~ 2022.3.22f1.**
- Putting DLL and source versions in the same project causes compile error.

## Recommendation

Back up important projects with version control or separate backup. `Bake` won't overwrite the original, but the renderer's mesh reference changes.

## Report Issues

`studioraming@gmail.com`

Include:

1. Unity version
2. Render pipeline (BRP / URP)
3. Easy Mesh Editor version (`0.1.1`)
4. Full Console log
5. Reproduction steps
