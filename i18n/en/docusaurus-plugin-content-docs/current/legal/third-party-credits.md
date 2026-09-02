---
id: third-party-credits
title: Third-Party Credits
sidebar_position: 92
---

# Third-Party Credits

**After reading this document**, you'll know whether this product includes code from elsewhere and which algorithms it references.

## Included Third-Party Code

**None.**

Easy Mesh Editor `0.1.1` package includes no external libraries, open-source code, or third-party assets. What's distributed:

- `Editor/EasyMeshEditor.Editor.dll` — code written by Studio Raming
- `Editor/Shaders/EmeOverlay.shader` · `Editor/Shaders/EmeSceneGL.shader` — Scene view shaders written by Studio Raming
- `README.md`

Unity Engine API belongs to Unity Technologies and is not redistributed with this product.

## Algorithm References

The `Elastic (1)` brush in the `Sculpt` tab implements the deformation model from the paper below. We didn't take code — we directly implemented the published math — so this is **attribution, not a license obligation.**

> Fernando de Goes, Doug L. James. *Regularized Kelvinlets: Sculpting Brushes based on Fundamental Solutions of Elasticity.* ACM Transactions on Graphics (SIGGRAPH), 2017.

The window description's behavior comes from here — `Normalized Kelvinlet with C2 soft tail for seamless gradation.` → [Sculpt](/guides/sculpt#엘라스틱)

## License of This Product

Redistribution, resale, and disclosure of included DLLs, shaders, and asset files are prohibited.

Contact: `studioraming@gmail.com`
