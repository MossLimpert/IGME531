const { prepareRender, drawCommands, cameras, controls, entitiesFromSolids } = jscadReglRenderer

const centeredAndScaled = (models) => {
  const {measureAggregateBoundingBox} = jscadModeling.measurements;
  const bb = measureAggregateBoundingBox(...models);
  
  const center = [
    (bb[0][0] + bb[1][0]) / 2,
    (bb[0][1] + bb[1][1]) / 2,
    (bb[0][2] + bb[1][2]) / 2
  ];

  // If it's not already centered (within small delta)
  if (Math.abs(center[0]) > 0.1 || Math.abs(center[1]) > 0.1 || Math.abs(center[2]) > 0.1) {
    const {translate} = jscadModeling.transforms;

    models = translate([-center[0], -center[1], -center[2]], ...models);
    models = Array.isArray(models) ? models : [models];
  }

  const maxBBDimension = Math.max(bb[1][0] - bb[0][0], bb[1][1] - bb[0][1], bb[1][2] - bb[0][2]);

  const {scale} = jscadModeling.transforms;
  const scaleFactor = 500 / maxBBDimension;
  models = scale([scaleFactor, scaleFactor, scaleFactor], ...models);

  return Array.isArray(models) ? models : [models];
};

const render = (containerElement, models) => {
  const width = containerElement.clientWidth
  const height = containerElement.clientHeight
  
  const state = {}
  
  // prepare the camera
  state.camera = Object.assign({}, cameras.perspective.defaults)
  cameras.perspective.setProjection(state.camera, state.camera, { width, height })
  cameras.perspective.update(state.camera, state.camera)
  
  // prepare the controls
  state.controls = controls.orbit.defaults
  
  // prepare the renderer
  const setupOptions = {
    glOptions: { container: containerElement },
  }
  const renderer = prepareRender(setupOptions)
  
  const axisOptions = {
    visuals: {
      drawCmd: 'drawAxis',
      show: true
    },
    size: 300,
    alwaysVisible: false,
    // xColor: [0, 0, 1, 1],
    // yColor: [1, 0, 1, 1],
    // zColor: [0, 0, 0, 1]
  }
  
  const scaleAdjusted = centeredAndScaled(models);
  const entities = entitiesFromSolids({}, ...scaleAdjusted)
  
  // assemble the options for rendering
  const renderOptions = {
    camera: state.camera,
    drawCommands: {
      drawAxis: drawCommands.drawAxis,
      drawLines: drawCommands.drawLines,
      drawMesh: drawCommands.drawMesh
    },
    rendering: {
      background: [0.7, 0.7, 0.7, 1],
    },
    // define the visual content
    entities: [
      axisOptions,
      ...entities
    ]
  }
  
  // the heart of rendering, as themes, controls, etc change
  let updateView = true
  
  const doRotatePanZoom = () => {
    if (rotateDelta[0] || rotateDelta[1]) {
      const updated = controls.orbit.rotate({ controls: state.controls, camera: state.camera, speed: rotateSpeed }, rotateDelta)
      state.controls = { ...state.controls, ...updated.controls }
      updateView = true
      rotateDelta = [0, 0]
    }
  
    if (panDelta[0] || panDelta[1]) {
      const updated = controls.orbit.pan({ controls:state.controls, camera:state.camera, speed: panSpeed }, panDelta)
      state.controls = { ...state.controls, ...updated.controls }
      panDelta = [0, 0]
      state.camera.position = updated.camera.position
      state.camera.target = updated.camera.target
      updateView = true
    }
  
    if (zoomDelta) {
      const updated = controls.orbit.zoom({ controls:state.controls, camera:state.camera, speed: zoomSpeed }, zoomDelta)
      state.controls = { ...state.controls, ...updated.controls }
      zoomDelta = 0
      updateView = true
    }
  }
  
  const updateAndRender = (timestamp) => {
    doRotatePanZoom()
  
    if (updateView) {
      const updates = controls.orbit.update({ controls: state.controls, camera: state.camera })
      state.controls = { ...state.controls, ...updates.controls }
      updateView = state.controls.changed // for elasticity in rotate / zoom
  
      state.camera.position = updates.camera.position
      cameras.perspective.update(state.camera)
  
      renderer(renderOptions)
    }
    window.requestAnimationFrame(updateAndRender)
  }
  window.requestAnimationFrame(updateAndRender)
  
  // convert HTML events (mouse movement) to viewer changes
  let lastX = 0
  let lastY = 0
  
  const rotateSpeed = 0.002
  const panSpeed = 1
  const zoomSpeed = 0.08
  let rotateDelta = [0, 0]
  let panDelta = [0, 0]
  let zoomDelta = 0
  let pointerDown = false
  
  const moveHandler = (ev) => {
    if(!pointerDown) return
    const dx = lastX - ev.pageX 
    const dy = ev.pageY - lastY 
  
    const shiftKey = (ev.shiftKey === true) || (ev.touches && ev.touches.length > 2)
    if (shiftKey) {
      panDelta[0] += dx
      panDelta[1] += dy
    } else {
      rotateDelta[0] -= dx
      rotateDelta[1] -= dy
    }
  
    lastX = ev.pageX
    lastY = ev.pageY
  
    ev.preventDefault()
  }
  const downHandler = (ev) => {
    pointerDown = true
    lastX = ev.pageX
    lastY = ev.pageY
    containerElement.setPointerCapture(ev.pointerId)
  }
  
  const upHandler = (ev) => {
    pointerDown = false
    containerElement.releasePointerCapture(ev.pointerId)
  }
  
  const wheelHandler = (ev) => {
    zoomDelta += ev.deltaY
    ev.preventDefault()
  }
  
  containerElement.onpointermove = moveHandler
  containerElement.onpointerdown = downHandler
  containerElement.onpointerup = upHandler
  containerElement.onwheel = wheelHandler
}

export {
  render
};