---
id: third-party-credits
title: Third-party credits
sidebar_position: 92
---

# Third-party credits

**After reading this page** you will know what the package contains, and where the algorithms it references come from.

## Package contents

The Easy Mesh Editor `1.0.0` package contains the following.

- `Editor/EasyMeshEditor.Editor.dll` (obfuscated build)
- `Editor/Shaders/EmeOverlay.shader` and `Editor/Shaders/EmeSceneGL.shader`: shaders for Scene view display
- Editor icon images (PNG files)
- `README.md`

The Unity Engine API belongs to Unity Technologies and is not redistributed with this product.

## Algorithm reference

The `Pull (1)` brush on the `Shape` tab is based on the deformation model in the paper below. This is a **source credit**.

> Fernando de Goes, Doug L. James. *Regularized Kelvinlets: Sculpting Brushes based on Fundamental Solutions of Elasticity.* ACM Transactions on Graphics (SIGGRAPH), 2017.

The behavior described in the window is here. A regularized Kelvinlet with a C2 soft tail spreads the deformation without a hard boundary. → [Shape](/guides/sculpt#엘라스틱)

The following methods are used as described in the works below. This is also a **source credit**.

- Closest point on a triangle: Christer Ericson, *Real-Time Collision Detection*, 2004.
- Ray-triangle intersection: Tomas Möller and Ben Trumbore, *Fast, Minimum Storage Ray/Triangle Intersection*, 1997.
- Mesh simplification with quadric error metrics: Michael Garland and Paul Heckbert, *Surface Simplification Using Quadric Error Metrics*, SIGGRAPH 1997.

## License of this product

Redistribution, resale, and leakage of the included DLL, shaders, and asset files are prohibited.

Contact: `studioraming@gmail.com`
