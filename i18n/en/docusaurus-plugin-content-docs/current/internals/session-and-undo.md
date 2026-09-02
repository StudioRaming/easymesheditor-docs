---
id: session-and-undo
title: Session and Undo
sidebar_position: 1
---

# Session and Undo

**After reading this document**, you'll understand what `Load` actually changes, why undo works in clean strokes, what transactions are and why they block `Bake`, and how your work survives script compilation.

## Work Mesh {#work-mesh}

Press `Load` and the tool **clones** the original mesh to create a temporary mesh, then changes the renderer's mesh reference to that copy. This copy is the Work Mesh.

- The original asset file is never opened or written.
- All edits — brushes, gizmos, weights, blend shape structure changes — happen on the Work Mesh.
- When the session ends (`Revert`, close window, enter Play Mode), the renderer goes back to referencing the original, and the Work Mesh is discarded.

Only `Bake` exports this copy to a file. → [Bake Details](/internals/bake)

## Weld Groups {#웰드-그룹}

Unity meshes **split vertices at the same position** at UV seams, normal seams, and material boundaries. On screen it looks like one point, but the data has several.

The tool groups vertices at the same local-space position into one **weld group.**

- Selection grabs the whole group.
- Brush and gizmo transforms write the same value to the entire group.
- Weight paint results are recorded identically across the whole group.

This is why "moving one vertex doesn't tear the UV seam" works.

Symmetry also relies on this concept. Left-right correspondence is found by group matching of local bind-pose positions, not indices — so it works even if left/right vertex counts aren't exactly the same.

## Undo {#되돌리기}

Uses Unity's `Ctrl+Z` directly. The tool doesn't maintain its own undo stack; it sits on top of Unity's.

**One intent = one undo step** is the rule.

| Operation | Undo Unit |
|---|---|
| Brush stroke | Entire stroke from press to release = one step |
| Gizmo transform | One drag = one step |
| `G`/`R`/`S` modal | One confirm = one step |
| Weight brush | One stroke = one step |
| `Smooth Selected Bones` slider | Release = one step |
| Delete, separate, merge, key structure change | One operation = one step |
| Multi-mesh batch operation | Entire batch = one compound step |

Mask changes are undo targets. **Hide is not** — it's a session display state, not mesh data (same rule as Blender).

### Structural Snapshots

Operations that change vertex count or indices (delete, separate, merge, add/remove keys) can't be recovered by undoing a single value. These operations **snapshot the entire mesh before the operation**, and undo restores from that snapshot.

Snapshot contents: vertices, normals, tangents, UV0~UV7, colors, triangle and submesh topology, bindpose, bone weights (including variable), all blend shape frames.

Snapshots consume memory and have a limit. When exceeded, the oldest are dropped — `Structural undo history exceeded its memory budget; dropped {0} of the oldest records.`

## Transaction {#트랜잭션}

Blend shape **new shape sculpting** and **editing existing keys** span multiple steps and intermediate states shouldn't be saved as-is. So they're wrapped in an explicit transaction.

- Starting a transaction makes the badge `IN TRANSACTION` and a pinned bar appears in the Scene view.
- `Enter` = commit, `Esc` = cancel. Same keys work even if the window has focus.
- While open, both `Save as New Key` and `Bake` are blocked.

You can switch to `Sculpt` or `Edit` tabs during a transaction to work. But operations that change vertex count can't be saved as keys — `Vertex count changed; cannot save as blend shape. Undo structural changes and retry.`

### When Undo Invalidates a Transaction

If `Ctrl+Z` goes past the transaction start point, the edit baseline disappears. The tool doesn't silently continue; it cancels the edit.

> `Undo went back before '{0}' edit started, invalidating changes. Cancelled for safety.`

Redo follows the same rule. The decision is deterministic, based on a value recorded at transaction start, not observation.

## Autosave and Restore {#자동-저장과-복원}

Unity reloads the domain every time you save a script. Most editor window state resets. Sessions would silently lose unsaved work.

So right before reload:

1. Silently commit any open transaction (no modal — can't show during reload). Cancel if commit fails.
2. Serialize the Work Mesh to `Library/EmeAutoSave/<renderer ID>.asset`.
3. After reload finishes, automatically reload and restore the session — `Easy Mesh Editor: restored auto-saved edit sessions ({0})`

Known limits:

- No dirty check. `Load` alone triggers save/restore even if nothing changed.
- If two windows are open, only one restores.
- Editor crashes are not handled.

Closing or entering Play Mode doesn't auto-save — it asks — `Bake` / `Discard` (Play Mode adds `Cancel`). → [Output Files](/reference/output-files#자동-저장-폴더)

## Ways Sessions End

| Method | Result |
|---|---|
| `Bake` | Save to asset, end |
| `Revert` | Restore original, end |
| Close window | Ask first, then end |
| Enter Play Mode | Ask first, then end |
| Switch target | `'{0}' unsaved. Discard edits and switch?` |

`Tab` is not here. It only turns off edit input; the session stays alive.

If a renderer or mesh disappears from the scene during a session, only that session is quietly cleaned up; others stay.
