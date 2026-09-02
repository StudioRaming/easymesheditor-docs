---
id: window
title: Using the Window
sidebar_position: 1
---

# Using the Window

**After reading this document**, you'll understand what each line in the window does, what status badges mean, why the display changes when docked narrow, and how to check shortcuts with the `Keys` sheet right there.

The window goes from top to bottom: **header → tabs → target line → save line → tab content → status bar.** No matter which tab you're in, this structure stays the same.

## Header

On the left: product name and subtitle `In-scene mesh editing — StudioRaming`. On the right: version badge and language popup.

The version badge shows the installed product version as-is. Please use this number when reporting. The language popup has three: Korean / English / 日本語, and when you switch, the Scene view overlay and hint bar instantly redraw in the new language.

## Tabs

Four of them: `Sculpt` · `Edit` · `BlendShape` · `Weight`. `Ctrl+Tab` cycles to the next, `Ctrl+Shift+Tab` to the previous.

`BlendShape` and `Weight` only work on `SkinnedMeshRenderer`. If you load a plain `MeshRenderer` and enter one of them, you'll see `BlendShape is for SkinnedMeshRenderer only.` instead.

## Target Line

One line tells you what you're editing right now.

| Display | State |
|---|---|
| `No target — select an object and Load` | No renderer selected |
| `Selected: {0} renderer(s) (press Load)` | Found candidates, haven't opened yet |
| `Editing: {0}` | Editing one mesh |
| `Editing {0} meshes together` | Editing multiple meshes at once |

On the same line are `Load` · `Bake` · `Revert` · `Edit (Tab)` · `X-Ray (Alt+Z)`.

If you've opened multiple meshes, an `Active target` selector appears too. → [Multiple Meshes](/guides/multi-mesh)

### Load Candidates {#불러올-후보}

Expand the candidate list before `Load` to see which renderers got picked. The title is `Load candidates`, and each row shows `{name} · {n} verts · {n} keys`.

| Warning | Means |
|---|---|
| `[shared source]` | More than one renderer is using this source mesh. Loading together will exclude all but one automatically. |
| `[no Read/Write]` | You need to enable Read/Write in the importer to edit this mesh |

Click a row to load just that renderer. Clear the selection to load all candidates together. Many candidates collapse to `+{0} more`.

## Save Line

Two save actions sit on one line. They do different things.

| Button | Section | What it does |
|---|---|---|
| `Save as New Key` | `Quick BlendShape Capture` | Records only the changes you added to the base as a new key. The session continues |
| `Bake` | `Save All Changes` | Saves the entire current Work Mesh to a mesh asset and ends the session |

The `Key name` field on the left is the name `Save as New Key` will use.

The window notes below: — `Execute this only after you're completely done. Quick capture is not Bake and has not yet changed the asset.` And: `Committed blend shape adds, edits, deletions, and reordering are saved together with both methods.`

Both buttons are disabled while blend shape edits are uncommitted. → [BlendShape](/guides/blendshape#기존-키-편집)

## Status Badge {#상태-배지}

| Badge | Means |
|---|---|
| `SAVED` | Nothing has changed since the target was loaded |
| `UNSAVED` | There are edits that have not been saved |
| `IN TRANSACTION` | Blend shape edits are in progress and still uncommitted |

:::note[`SAVED` means "you didn't do anything"]
The badge watches the session's change counter. Right after `Load` it's `SAVED`, but the moment you use a brush, it becomes `UNSAVED`.
:::

## Compact Mode {#컴팩트-모드}

When the window height leaves less than 200px for content after the header, tabs, target line, save line, and status bar, it automatically switches to **compact mode.** It's not a toggle — it's automatic based on size.

What changes in compact mode:

- The subtitle in the header collapses and the header gets shorter.
- The `How to use` guide blocks inside tabs are hidden.
- The `Key name` label on the save line disappears and the whole row is used by the field and buttons.

Make the window taller vertically to go back to normal.

## Shortcut Sheet {#단축키-시트}

The `Keys` button in the Scene view hint bar opens and closes the shortcuts panel. The open state is remembered by the editor.

The panel shows two groups: **this tab's shortcuts + `Global` shortcuts.** The title is like `Sculpt · Shortcuts` with the tab name first.

The `BlendShape` tab has no registered rows, so you see `This tab has no registered shortcuts.` That tab's keys are in the `Global` group and the [Shortcuts](/reference/shortcuts#블렌드쉐이프) table in this documentation.

## Bake Result Table

When you `Bake` multiple meshes together, a `Bake results ({0}/{1} succeeded)` table stays in the window. Each row shows a mesh name and `OK` / `FAIL`.

If any fail, `Bake failed ({0} succeeded / {1} failed) … failed sessions were kept so you can retry.` appears too. Only the successful ones become assets, and failed sessions stay open.

## Scene View Hint Bar

A one-line hint bar floats at the top of the Scene view showing what operations you can do in this tab. The common part is `Tab=toggle edit · Ctrl+Tab=tool tab`, and the rest varies by tab.

When editing is off, a `Resume Editing` button appears instead.
