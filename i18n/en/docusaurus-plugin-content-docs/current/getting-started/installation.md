---
id: installation
title: Installation
sidebar_position: 1
---

# Installation

**After reading this page** you will know the supported Unity versions, the two ways to install (`.unitypackage` or copying the folder), the files that must be present together, the error you get when the DLL edition and the source edition are both installed, and how to move up from 0.1.x.

## 1. Supported versions

| Item | Details |
|---|---|
| Product version | `1.0.0` |
| Supported Unity | **Unity 2019.4 ~ Unity 6 (6000.0, 6000.3 LTS)** |
| Versions checked with a direct compile | `2019.4.31f1` · `2021.3.45f2` · `2022.3.22f1` (builds with warnings treated as errors) |
| Render pipeline | Built-in Render Pipeline · URP |
| Scope | Unity Editor only |

One DLL works on all of the versions above. There are no per-version branches, and the same file is used everywhere. The code uses the Unity 2019.4 public API and C# 7.3 as its lower bound.

Bone influences beyond four per vertex (variable bone weights) are read and written with the public API that also exists in 2019.4 (`GetAllBoneWeights` / `SetBoneWeights`). See [Bake internals](/internals/bake#가변-본-웨이트) for details.

:::note[Not a shader]
Easy Mesh Editor is an editor tool that edits mesh data. Leave the shaders and materials used on your avatar as they are. It works with both BRP and URP.
:::

## 2. Install with `.unitypackage`

1. In Unity, choose `Assets > Import Package > Custom Package` and open `EasyMeshEditor_v1.0.0.unitypackage`.
2. Import **all** files under `Assets/StudioRaming/EasyMeshEditor`.
3. Open `StudioRaming > Easy Mesh Editor` from the menu.

## 3. Install by copying the folder

Copy the whole `Assets/StudioRaming/EasyMeshEditor` folder to the same location in your project. The following files must be present together.

- `README.md`
- `Editor/EasyMeshEditor.Editor.dll` and its `.meta`
- `Editor/Shaders/EmeOverlay.shader`
- `Editor/Shaders/EmeSceneGL.shader`

:::caution[Without the two shaders, nothing shows in the Scene view]
The two shaders are used for the Scene view overlay, X-Ray, and the vertex, bone, and weight display. If you copy only the DLL, the tool loads, but the Scene view display does not work.
:::

## 4. Do not install the DLL edition and the source edition together {#4-dll판과-소스판을-함께-넣지-마세요}

If a project still has the source `.cs` files and you also add the DLL edition, **the same class is defined twice, and you get compile errors.** Install only one of them.

`_Edit.asset` and `_Part.asset` files made by `Save Mesh` are created next to the source mesh, so they are not files to delete here. → [Generated files](/reference/output-files)

## 5. Upgrading from 0.1.x {#0-1x에서-올리기}

**Buyers of 0.1.x update to 1.0.0 for free.**

Do not update while an editing session is open. Save the open edits with `Save Mesh` or throw them away with `Discard edits`, close the Easy Mesh Editor window, and then update.

Import 1.0.0 over the existing `Assets/StudioRaming/EasyMeshEditor` folder. You do not need to delete any other file when you upgrade from 0.1.x. The exception is a project that installed the source (`.cs`) edition. In that case, delete the source edition first, as the README says. If you put your own files inside that folder, move them out first.

If a renderer that uses an `_Edit.asset` is loaded again and you press `Save Mesh`, a 1.0 output is updated in the same file and keeps its GUID. An `_Edit.asset` made by 0.1.x has no owner record, so it is not updated. A new file, `<source name>_Edit 1.asset`, is written next to it with a new GUID. The `_Edit.asset` you saved in 0.1.x stays and keeps working. Prefabs and animations that refer to the old file must be re-linked to the new one.

## 6. Open the window

`StudioRaming > Easy Mesh Editor`

The window can be docked. When it opens, it shows that no target is selected. Select an object in the Hierarchy to fill in the target row. → [First editing session](/getting-started/first-session)

## 7. The mesh has Read/Write turned off {#7-메쉬가-readwrite-꺼짐이라면}

Meshes in imported FBX files often have Read/Write turned off by default. If you try to `Load` such a mesh, the window says that Read/Write is disabled, and an `Enable Read/Write` button appears in the status line. Pressing it turns on the model importer setting and re-imports the model. If the model cannot be changed automatically, turn Read/Write on by hand in the source's Import Settings.

Turning the setting on does not open an editing session by itself. Press **Load** again after the setting is on.

## 8. Change the language

In the window, choose 한국어 / English / 日本語. When you first open it, the window follows the system language of the Unity Editor. Korean gives Korean, Japanese gives Japanese, and any other language gives English.
