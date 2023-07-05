---
marp: true

---

## JSCAD and CSG

---

### Constructive Solid Geometry

- CSG stands for Constructive Solid Geometry.
- Create complex 3D shapes by combining simple shapes using set operations such as union, intersection, and difference.

![bg right:40% contain](https://upload.wikimedia.org/wikipedia/commons/8/8b/Csg_tree.png)

---
### What is JSCAD?

- JSCAD is a JavaScript-based solid modeling tool that allows users to create 3D models programmatically.
- JSCAD is open source and runs entirely in the browser.
---

### What are the benefits of using JSCAD and CSG?

- JSCAD can be entirely browser-based
- JSCAD and CSG are also highly programmable, which means that users can write scripts to automate repetitive tasks or create custom shapes and models.

---

### Examples of JSCAD and CSG in Action

![](https://JSCAD.org/images/examples.png)

- JSCAD includes many examples of how to use CSG to create complex 3D models.
- Users can also share their own models on the JSCAD website.

---

### Getting Started with JSCAD

- To get started with JSCAD, simply visit the [JSCAD website](https://openjscad.xyz/).
- The website includes an interactive editor where users can create and edit 3D models.
- The website also includes detailed documentation and tutorials to help users get started with JSCAD and CSG.

---

## Major CSG Operations in JSCAD

### Union

- The union operation combines two or more shapes into a single shape.
- In JSCAD, the union operation is performed using the `union` function.
- Example:
  
  ```javascript
  const shape1 = sphere({radius: 10})
  const shape2 = cube({size: 20})
  const shape3 = union(shape1, shape2)
  ```

---

### Intersection

- The intersection operation combines two or more shapes into a single shape.
- In JSCAD, the intersection operation is performed using the `intersect` function.
- Example:
  
  ```javascript
  const shape1 = sphere({radius: 10})
  const shape2 = cube({size: 20})
  const shape3 = intersect(shape1, shape2)
  ```

---

### Difference

- The difference operation combines two or more shapes into a single shape.
- In JSCAD, the difference operation is performed using the `subtract` function.
- Example:
  
  ```javascript
  const shape1 = sphere({radius: 100})
  const shape2 = cube({size: 150})
  const shape3 = subtract(shape2, shape1)
  ```