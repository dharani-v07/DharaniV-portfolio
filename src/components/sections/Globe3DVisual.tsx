import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export const Globe3DVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeNode] = useState('COIMBATORE, INDIA (BASE)')

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 15)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const radius = 4.6

    // 1. Dotted Globe Sphere (Fibonacci Grid with continent clusters)
    const dotCount = 2200
    const positions = new Float32Array(dotCount * 3)
    const colors = new Float32Array(dotCount * 3)
    const sizes = new Float32Array(dotCount)

    const baseColor = new THREE.Color(0x888888)
    const landColor = new THREE.Color(0xefefef)

    const phi = Math.PI * (Math.sqrt(5) - 1) // Golden ratio angle

    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2 // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y) // radius at y
      const theta = phi * i // golden angle increment

      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      positions[i * 3] = x * radius
      positions[i * 3 + 1] = y * radius
      positions[i * 3 + 2] = z * radius

      // Approximate continent clusters by latitude/longitude density
      const lat = Math.asin(y) * (180 / Math.PI)
      const lon = Math.atan2(z, x) * (180 / Math.PI)

      // Landmass approximation
      const isLand =
        (lat > -10 && lat < 55 && lon > -20 && lon < 140) || // Eurasia & Africa
        (lat > 10 && lat < 70 && lon > -165 && lon < -50) || // North America
        (lat > -55 && lat < 12 && lon > -85 && lon < -35) || // South America
        (lat > -40 && lat < -10 && lon > 110 && lon < 155) // Australia

      if (isLand) {
        colors[i * 3] = landColor.r
        colors[i * 3 + 1] = landColor.g
        colors[i * 3 + 2] = landColor.b
        sizes[i] = 0.08 + Math.random() * 0.04
      } else {
        colors[i * 3] = baseColor.r * 0.4
        colors[i * 3 + 1] = baseColor.g * 0.4
        colors[i * 3 + 2] = baseColor.b * 0.4
        sizes[i] = 0.04
      }
    }

    const dotGeometry = new THREE.BufferGeometry()
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    dotGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const dotMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    })

    const globeDots = new THREE.Points(dotGeometry, dotMaterial)
    globeGroup.add(globeDots)

    // 2. Translucent Inner Core Sphere
    const innerGeo = new THREE.SphereGeometry(radius * 0.98, 48, 48)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.9
    })
    const innerSphere = new THREE.Mesh(innerGeo, innerMat)
    globeGroup.add(innerSphere)

    // 3. Orbiting Satellite Rings with Constellation Dots
    const orbitCount = 140
    const orbitPositions = new Float32Array(orbitCount * 3)
    const orbitRadius = radius * 1.25

    for (let i = 0; i < orbitCount; i++) {
      const angle = (i / orbitCount) * Math.PI * 2
      orbitPositions[i * 3] = Math.cos(angle) * orbitRadius
      orbitPositions[i * 3 + 1] = Math.sin(angle * 2) * 0.8
      orbitPositions[i * 3 + 2] = Math.sin(angle) * orbitRadius
    }

    const orbitGeometry = new THREE.BufferGeometry()
    orbitGeometry.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3))
    const orbitMaterial = new THREE.PointsMaterial({
      color: 0xe52d2d,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })
    const orbitPoints = new THREE.Points(orbitGeometry, orbitMaterial)
    globeGroup.add(orbitPoints)

    // 4. Polar Outer Ring of Satellites
    const polarCount = 80
    const polarPositions = new Float32Array(polarCount * 3)
    for (let i = 0; i < polarCount; i++) {
      const angle = (i / polarCount) * Math.PI * 2
      polarPositions[i * 3] = Math.cos(angle) * (radius * 1.15)
      polarPositions[i * 3 + 1] = Math.sin(angle) * (radius * 1.15)
      polarPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.6
    }
    const polarGeometry = new THREE.BufferGeometry()
    polarGeometry.setAttribute('position', new THREE.BufferAttribute(polarPositions, 3))
    const polarMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    })
    const polarPoints = new THREE.Points(polarGeometry, polarMaterial)
    polarPoints.rotation.x = Math.PI / 4
    globeGroup.add(polarPoints)

    // 5. Connecting Great Circle Arcs between Global Hubs
    const latLonToVector3 = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + 180) * (Math.PI / 180)
      const x = -(r * Math.sin(phi) * Math.cos(theta))
      const z = r * Math.sin(phi) * Math.sin(theta)
      const y = r * Math.cos(phi)
      return new THREE.Vector3(x, y, z)
    }

    // Coordinates: Coimbatore (11.0, 76.9), SF (37.7, -122.4), London (51.5, -0.1), Tokyo (35.6, 139.6)
    const hubs = [
      { name: 'COIMBATORE, INDIA (HOME)', lat: 11.0, lon: 76.9, isHome: true },
      { name: 'SAN FRANCISCO (TECH)', lat: 37.7, lon: -122.4 },
      { name: 'LONDON (RESEARCH)', lat: 51.5, lon: -0.1 },
      { name: 'TOKYO (SYSTEMS)', lat: 35.6, lon: 139.6 },
      { name: 'SINGAPORE (GLOBAL)', lat: 1.35, lon: 103.8 }
    ]

    const hubVectors = hubs.map(h => ({
      ...h,
      vec: latLonToVector3(h.lat, h.lon, radius)
    }))

    // Draw Arcs from Coimbatore (Hub 0) to all other hubs
    const homeVec = hubVectors[0].vec

    // Glowing Pulse Beacon at Coimbatore
    const beaconGeo = new THREE.SphereGeometry(0.18, 16, 16)
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xe52d2d })
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat)
    beaconMesh.position.copy(homeVec)
    globeGroup.add(beaconMesh)

    // Pulse wave ring around Coimbatore
    const beaconRingGeo = new THREE.RingGeometry(0.25, 0.35, 32)
    const beaconRingMat = new THREE.MeshBasicMaterial({
      color: 0xe52d2d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    })
    const beaconRing = new THREE.Mesh(beaconRingGeo, beaconRingMat)
    beaconRing.position.copy(homeVec)
    beaconRing.lookAt(0, 0, 0)
    globeGroup.add(beaconRing)

    for (let i = 1; i < hubVectors.length; i++) {
      const destVec = hubVectors[i].vec

      // Calculate middle arc point with elevation
      const midVec = homeVec.clone().add(destVec).multiplyScalar(0.5)
      const distance = homeVec.distanceTo(destVec)
      midVec.setLength(radius + distance * 0.28)

      const curve = new THREE.QuadraticBezierCurve3(homeVec, midVec, destVec)
      const curvePoints = curve.getPoints(40)
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints)
      const curveMat = new THREE.LineBasicMaterial({
        color: 0xe52d2d,
        transparent: true,
        opacity: 0.45,
        linewidth: 1
      })
      const curveLine = new THREE.Line(curveGeo, curveMat)
      globeGroup.add(curveLine)
    }

    // Interactive Drag & Parallax Mechanics
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let rotVelX = 0
    let rotVelY = 0.003
    let targetTiltX = 0
    let targetTiltY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const mouseRelX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const mouseRelY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      targetTiltX = mouseRelY * 0.3
      targetTiltY = mouseRelX * 0.3

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        rotVelY = deltaX * 0.005
        rotVelX = deltaY * 0.005
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        const deltaX = e.touches[0].clientX - prevMouseX
        const deltaY = e.touches[0].clientY - prevMouseY
        rotVelY = deltaX * 0.006
        rotVelX = deltaY * 0.006
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const onTouchEnd = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      const time = clock.getElapsedTime()

      // Continuous auto rotation with user inertia damping
      if (!isDragging) {
        rotVelY = THREE.MathUtils.lerp(rotVelY, 0.0025, 0.03)
        rotVelX = THREE.MathUtils.lerp(rotVelX, 0, 0.04)
      }

      globeGroup.rotation.y += rotVelY
      globeGroup.rotation.x += rotVelX

      // Orbiting particles rotation
      orbitPoints.rotation.y = time * 0.3
      polarPoints.rotation.z = -time * 0.2

      // Beacon pulsing
      const pulseScale = 1 + Math.sin(time * 5) * 0.4
      beaconRing.scale.set(pulseScale, pulseScale, pulseScale)
      beaconRingMat.opacity = 0.8 - Math.sin(time * 5) * 0.4

      // Camera tilt follow
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetTiltY * 2, 0.05)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -targetTiltX * 2, 0.05)
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      dotGeometry.dispose()
      dotMaterial.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      orbitGeometry.dispose()
      orbitMaterial.dispose()
      polarGeometry.dispose()
      polarMaterial.dispose()
      beaconGeo.dispose()
      beaconMat.dispose()
      beaconRingGeo.dispose()
      beaconRingMat.dispose()
    }
  }, [])

  return (
    <div className="cyber-globe-wrapper" ref={containerRef}>
      {/* 4 Glowing Corner Reticles from Dribbble Reference */}
      <div className="corner-reticle corner-tl" aria-hidden="true">
        <span className="reticle-dot" />
      </div>
      <div className="corner-reticle corner-tr" aria-hidden="true">
        <span className="reticle-dot" />
      </div>
      <div className="corner-reticle corner-bl" aria-hidden="true">
        <span className="reticle-dot" />
      </div>
      <div className="corner-reticle corner-br" aria-hidden="true">
        <span className="reticle-dot" />
      </div>

      {/* Background Cyber Frame Lines */}
      <div className="cyber-frame-border" aria-hidden="true" />

      {/* Top Meta Header */}
      <div className="cyber-globe-header">
        <div className="cyber-live-indicator">
          <span className="cyber-radar-ping" />
          <span className="cyber-mono">GLOBAL NETWORK · ACTIVE</span>
        </div>
        <div className="cyber-tag-mono">DV / 2026 RESEARCH NODE</div>
      </div>

      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="cyber-globe-canvas" />

      {/* Center Holographic Title from Reference */}
      <div className="cyber-center-focus">
        <h3 className="cyber-focus-text">building useful products</h3>
        <p className="cyber-focus-sub">RESEARCH · WEB · MOBILE · SYSTEMS</p>
      </div>

      {/* Bottom Node Bar */}
      <div className="cyber-globe-footer">
        <div className="cyber-node-chip">
          <span className="chip-beacon" />
          <span>{activeNode}</span>
        </div>
        <div className="cyber-hint">DRAG TO ROTATE 3D EARTH</div>
      </div>
    </div>
  )
}
