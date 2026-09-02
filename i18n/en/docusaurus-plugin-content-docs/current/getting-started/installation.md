---
id: installation
title: Installation
sidebar_position: 1
---

# Installation

**After reading this document**, you'll know the supported Unity versions, the two ways to install (`.unitypackage` or folder copy), which files must come together, and what error you get if you put the DLL and source versions on top of each other.

## 1. Supported Versions

| Item | Content |
|---|---|
| Product version | `0.1.1` |
| Supported Unity | **2019.4.31f1 ~ 2022.3.22f1** |
| Directly tested versions | `2019.4.31f1` · `2021.3.45f2` · `2022.3.22f1` |
| Render pipeline | Built-in Render Pipeline · URP |
| Scope | Unity Editor only |

The code uses Unity 2019.4 public API and C# 7.3 as the floor. The [variable bone weight](/internals/bake#가변-본-웨이트) API for handling 5+ bone influences per vertex is only available in 2020.1+, so it's split by preprocessor. In 2019.4, only the legacy 4-slot weights are handled.

:::note[Not a shader]
Easy Mesh Editor is an editor tool for editing mesh data. The shaders and materials on your avatar stay as they are, and it works with both BRP and URP.
:::

## 2. Install with `.unitypackage`

1. In Unity, choose `Assets > Import Package > Custom Package` and open the provided `.unitypackage`.
2. Import **all** files under `Assets/StudioRaming/EasyMeshEditor`.
3. From the menu, open `StudioRaming > Easy Mesh Editor`.

## 3. Copy the Folder Directly

Copy the entire `Assets/StudioRaming/EasyMeshEditor` folder to the same location in your project. These files must come with it:

- `README.md`
- `Editor/EasyMeshEditor.Editor.dll` and its `.meta`
- `Editor/Shaders/EmeOverlay.shader`
- `Editor/Shaders/EmeSceneGL.shader`

:::caution[Leaving out the two shaders means you see nothing on screen]
The two shaders are used for the Scene view overlay, X-Ray, and vertex/bone/weight heatmap display. If you copy just the DLL, the tool loads but the Scene view display won't work properly.
:::

## 4. Don't Put Both the DLL and Source Versions Together

If you put the DLL version in a project where source `.cs` files still exist, you'll get **a compile error from the same class defined twice.** Install only one.

Instead of overwriting on top of an older version, it's safer to delete the existing `Assets/StudioRaming/EasyMeshEditor` folder and re-import fresh. If there are files you created directly inside that folder, move them out first.

The `_Edit.asset` and `_Part.asset` files created by `Bake` appear next to the original mesh, so they're not a deletion target. → [Output Files](/reference/output-files)

## 5. Open the Window

`StudioRaming > Easy Mesh Editor`

The window can be docked. When it opens, it starts in the `No target — select an object and Load` state. When you choose an object in the Hierarchy, the target line fills in. → [Your First Session](/getting-started/first-session)

## 6. If Your Mesh Has Read/Write Off

Imported FBX meshes sometimes have Read/Write off by default. When you try to `Load` such a mesh, the window shows `Mesh is not Read/Write enabled. Enable Read/Write in the import settings.` and a `Enable Read/Write` button appears right there. Press the button and it toggles the model importer setting and re-imports.

## 7. Change Language

From the top right of the window, choose Korean / English / 日本語. When it opens for the first time, it follows the editor's system language — Korean if Korean, Japanese if Japanese, English otherwise.
