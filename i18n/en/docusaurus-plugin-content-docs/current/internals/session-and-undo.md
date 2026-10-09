---
id: session-and-undo
title: Session and undo
sidebar_position: 1
---

# Session and undo

**After reading this page** you will know what `Load` actually changes, why undo works in clean per-operation steps, what a shape key edit is and why it blocks `Save Mesh`, and why work survives script compilation and Play Mode.

## Work Mesh {#work-mesh}

When you press `Load`, the tool **copies** the source mesh into a temporary mesh, and it points the renderer's mesh reference at that copy. The copy is the Work Mesh.

- The source asset file is never opened or written.
- Every edit (brushes, gizmos, weights, and structural changes to shape keys) happens on the Work Mesh.
- When the session ends (`Discard edits`, or switching to another target), the renderer points back to the source, and the Work Mesh is thrown away.

Only `Save Mesh` writes this copy to a file. → [Save Mesh internals](/internals/bake)

## Weld groups {#웰드-그룹}

Unity meshes split vertices at UV seams, normal seams, and material borders, so **several vertices sit at the same position**. On screen it looks like one point, but the data holds two to four of them.

The tool treats vertices with the same local-space position as one **weld group**.

- A selection takes the whole group.
- Brushes and gizmo transforms write the same value to the whole group.
- Weight painting also writes the same value to the whole group.

This is why moving one vertex does not split a UV seam.

Symmetry uses the same idea. Left and right partners are found from the local-space bind positions, not from indexes. That is why it works even when the left and right vertex counts are not exactly equal.

## Undo {#되돌리기}

The tool uses Unity's `Ctrl+Z` directly. It does not keep its own undo stack. It adds its steps to Unity's.

**One intent = one undo step** is the rule.

| Operation | Undo unit |
|---|---|
| Brush stroke | One stroke, from mouse down to mouse up |
| Gizmo transform | One drag |
| `G`/`R`/`S` modal | One confirmation |
| Weight brush | One stroke |
| Smooth checked bones slider | One step, confirmed when you release |
| Delete, separate, merge, shape key structure change | One operation |
| Painted region tools | One application |
| Multi-mesh batch operation | The whole operation as one composite step |

Mask changes are undo steps too. **Hiding is not**, because hiding is display state of the session, not mesh data.

### Structure snapshots

Operations that change the vertex count or the indexes (delete, separate, merge, adding and deleting keys) cannot be undone by restoring a single value. For these operations, the tool takes a **snapshot of the whole mesh before the operation**, and restores it when undo runs.

Snapshots use memory, so there is a limit. When the limit is reached, the oldest snapshots are dropped, and the tool tells you.

## Shape key edit {#트랜잭션}

Creating a new key and editing an existing key both take several steps, and the intermediate state must not be saved. So each one is wrapped in a clear start and end. This wrapper is called a transaction.

- When it starts, the badge changes to `In transaction`, and a bar is pinned in the Scene view and the window.
- `Enter` confirms, and `Esc` cancels the stroke. `Esc` does not discard the key edit.
- While the edit is open, both `Save Mesh` and `Save as New Key` are blocked.

You can move to `Shape` and `Select & Move` while the edit is open. However, you cannot save a key from an operation that changes the vertex count.

### When undo makes the edit invalid {#되돌리기가-편집을-무효로-만들-때}

If `Ctrl+Z` goes back earlier than the start of the edit, the edit loses its reference point. In that case the tool does not continue quietly. It cancels the edit. Redo follows the same rule. The decision is based on a value recorded when the edit started, so the result is always the same.

The window then shows: `Undo stepped back past the start of the '{edit name}' edit, invalidating its preview. The edit was cancelled for safety.`

## Automatic keeping and restore {#자동-보존과-복원}

When you save a script, Unity reloads the domain, and most of the window state is reset at that point. If the editing session were left alone, unsaved work would disappear without any warning.

So the tool keeps the Work Mesh being edited in `Library/EmeAutoSave/` at these moments.

- Just before a domain reload
- Just before entering Play Mode
- When the window is closed, and when the scene is closed
- When Unity quits

A kept edit is restored automatically within the same editor run (including after a domain reload), or after Unity quit in an orderly way and is opened again. Vertices, shape keys, weights, and the unsaved state all come back as they were. In Play Mode the source mesh is shown.

- If keeping fails, Play Mode entry and quitting are stopped, and the reason appears in the status line.
- A scene that has never been saved cannot keep its objects, so the window asks you to save the scene first. Use the `Save Scene` and `Discard edits` buttons in the window to handle it right away.
- If several windows are open, only one of them is restored.
- A file that cannot be restored is not deleted.

After a restore, the status line shows `Restored {N} preserved edit(s). Edits made before the restore cannot be undone with Ctrl+Z.`

## Crash checkpoints {#크래시-대비}

While there are unsaved edits, and only when the content has changed, the tool writes a checkpoint between edits, at least 60 seconds apart. If Unity closes unexpectedly or is forced to quit, nothing is restored automatically. The window shows a banner the next time it opens.

- `Restore`: returns the session to the checkpoint.
- `Discard`: needs two presses within 5 seconds to run.

A file that cannot be restored is not deleted.

## How a session ends {#세션이-끝나는-방법}

| Method | Result |
|---|---|
| `Save Mesh` | Saves to an asset and ends |
| `Discard edits` | Returns to the source and ends. It asks for confirmation |
| Switch to another target | If there are unsaved edits, the tool shows a notice and does not switch |

`Tab` is not on this list. It only turns off edit input, and the session stays alive.

If a renderer or mesh disappears from the scene during a session, only that session is cleaned up quietly. The others stay open.
