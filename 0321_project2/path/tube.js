const { geometries, maths, extrusions } = jscadModeling

const { circle } = jscadModeling.primitives
const { slice } = jscadModeling.extrusions
const { bezier } = jscadModeling.curves

const rotationMatrixFromVectors = (srcVector, targetVector) => {
  // From https://gist.github.com/kevinmoran/b45980723e53edeb8a5a43c49f134724
  srcVector = maths.vec3.normalize(maths.vec3.create(), srcVector)
  targetVector = maths.vec3.normalize(maths.vec3.create(), targetVector)

  const axis = maths.vec3.cross(maths.vec3.create(), targetVector, srcVector)
  const cosA = maths.vec3.dot(targetVector, srcVector)
  const k = 1 / (1 + cosA)

  return maths.mat4.fromValues(
    (axis[0] * axis[0] * k) + cosA, (axis[1] * axis[0] * k) - axis[2], (axis[2] * axis[0] * k) + axis[1], 0,
    (axis[0] * axis[1] * k) + axis[2], (axis[1] * axis[1] * k) + cosA, (axis[2] * axis[1] * k) - axis[0], 0,
    (axis[0] * axis[2] * k) - axis[1], (axis[1] * axis[2] * k) + axis[0], (axis[2] * axis[2] * k) + cosA, 0,
    0, 0, 0, 1
  )
};

const tube = ({radius = 1, circumferenceSegments = 16, numSamplePoints = 32}, bezierControlPoints) => {
  // Create the initial slice
  const circ = circle({ radius, segments: circumferenceSegments });
  const circPoints = geometries.geom2.toPoints(circ)
  let tubeSlice = slice.fromPoints(circPoints)

  const l = bezierControlPoints.length - 1

  console.log(bezierControlPoints.slice(-1)[0]);
  // Rotate it close to the direction we are going in.  Rotation gets funky around 180˚
  const bezierDelta = maths.vec3.clone([
    bezierControlPoints[l][0] - bezierControlPoints[0][0],
    bezierControlPoints[l][1] - bezierControlPoints[0][1],
    bezierControlPoints[l][2] - bezierControlPoints[0][2]
  ])
  let thisTubeSlice = slice.transform(rotationMatrixFromVectors(maths.vec3.clone([0, 0, 1]), bezierDelta), tubeSlice)

  // Create the bezier function
  const tubeCurve = bezier.create(bezierControlPoints)

  // ...and extrude.
  return extrusions.extrudeFromSlices({
    numberOfSlices: numSamplePoints,
    capStart: true,
    capEnd: true,
    callback: function (progress, count, base) {
      const positionArray = bezier.valueAt(progress, tubeCurve)
      const tangentArray = bezier.tangentAt(progress, tubeCurve)
      const rotationMatrix = rotationMatrixFromVectors(bezierDelta, maths.vec3.clone(tangentArray))
      const translationMatrix = maths.mat4.fromTranslation(maths.mat4.create(), positionArray)
      return slice.transform(maths.mat4.multiply(translationMatrix, translationMatrix, rotationMatrix), base)
    }
  }, thisTubeSlice)
}

export {
  tube
}