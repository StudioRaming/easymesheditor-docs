---
id: third-party-credits
title: Third-party credits
sidebar_position: 92
---

# Third-party credits

**After reading this page** you will know whether this product contains code from elsewhere, and where the algorithms it references come from.

## Third-party code included

**None.**

The Easy Mesh Editor `1.0.0` package contains no external libraries, open-source code, or third-party notice files. The package ships the following.

- `Editor/EasyMeshEditor.Editor.dll`: code written by Studio Raming (obfuscated build)
- `Editor/Shaders/EmeOverlay.shader` and `Editor/Shaders/EmeSceneGL.shader`: shaders written by Studio Raming for Scene view display
- Editor icon images (PNG files)
- `README.md`

<!-- CONFIRM: the package file list is checked against the dry-run package (no third-party notice file, no license strings in the EME sources). Whether the obfuscated DLL contains third-party code is not verified (S1). -->

The Unity Engine API belongs to Unity Technologies and is not redistributed with this product.

## Algorithm reference

The `Pull (1)` brush on the `Shape` tab is based on the deformation model in the paper below. The code was not copied. The brush was implemented from the published equations, so this is a **source credit**, not a licensing obligation.

> Fernando de Goes, Doug L. James. *Regularized Kelvinlets: Sculpting Brushes based on Fundamental Solutions of Elasticity.* ACM Transactions on Graphics (SIGGRAPH), 2017.

The behavior described in the window is here. A regularized Kelvinlet with a C2 soft tail spreads the deformation without a hard boundary. → [Shape](/guides/sculpt#엘라스틱)

## License of this product

Redistribution, resale, and leakage of the included DLL, shaders, and asset files are prohibited.

Contact: `studioraming@gmail.com`
