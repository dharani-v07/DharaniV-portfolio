import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const Hero3DVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 14)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Dynamic 3D Objects Group
    const coreGroup = new THREE.Group()

    // 1. Central Complex 3D Holographic Wireframe (Torus Knot)
    const knotGeo = new THREE.TorusKnotGeometry(2.4, 0.7, 100, 16, 2, 3)
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xe52d2d,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    })
    const knotMesh = new THREE.Mesh(knotGeo, knotMat)
    coreGroup.add(knotMesh)

    // Inner glowing sphere
    const sphereGeo = new THREE.SphereGeometry(1.4, 32, 32)
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.1,
      metalness: 0.95,
      transparent: true,
      opacity: 0.9
    })
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat)
    coreGroup.add(sphereMesh)

    // 2. Surrounding 3D Orbiting Quantum Rings
    const ringGeo1 = new THREE.RingGeometry(4.2, 4.3, 64)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xe52d2d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    })
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1)
    ringMesh1.rotation.x = Math.PI / 3
    coreGroup.add(ringMesh1)

    const ringGeo2 = new THREE.RingGeometry(3.6, 3.7, 64)
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x333333,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    })
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2)
    ringMesh2.rotation.y = Math.PI / 4
    coreGroup.add(ringMesh2)

    // 3. Floating Mini Prisms / Cubes
    const miniCubes: any[] = []
    const cubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    for (let i = 0; i < 8; i++) {
      const cubeMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xe52d2d : 0x222222,
        roughness: 0.3,
        metalness: 0.8,
        wireframe: true
      })
      const cube = new THREE.Mesh(cubeGeo, cubeMat)
      const angle = (i / 8) * Math.PI * 2
      const radius = 3.5 + Math.random() * 0.8
      cube.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 3,
        Math.sin(angle) * radius
      )
      coreGroup.add(cube)
      miniCubes.push(cube)
    }

    scene.add(coreGroup)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const light1 = new THREE.PointLight(0xe52d2d, 3, 30)
    light1.position.set(5, 5, 8)
    scene.add(light1)

    const light2 = new THREE.PointLight(0xffffff, 2, 30)
    light2.position.set(-5, -5, 6)
    scene.add(light2)

    // Mouse / Touch Tilt Interaction
    let targetRotationX = 0
    let targetRotationY = 0
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect()
        mouseX = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 2
        mouseY = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * 2
      }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('touchmove', handleTouchMove)

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      const time = clock.getElapsedTime()

      // Smooth interpolation for mouse tilt
      targetRotationY += (mouseX * 1.2 - targetRotationY) * 0.08
      targetRotationX += (mouseY * 1.2 - targetRotationX) * 0.08

      coreGroup.rotation.y = time * 0.35 + targetRotationY
      coreGroup.rotation.x = Math.sin(time * 0.25) * 0.2 + targetRotationX
      coreGroup.rotation.z = Math.cos(time * 0.2) * 0.15

      ringMesh1.rotation.z = time * 0.4
      ringMesh2.rotation.x = time * 0.3

      miniCubes.forEach((cube, idx) => {
        cube.rotation.x += 0.02 * (idx + 1)
        cube.rotation.y += 0.015 * (idx + 1)
        cube.position.y += Math.sin(time * 2 + idx) * 0.005
      })

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      knotGeo.dispose()
      knotMat.dispose()
      sphereGeo.dispose()
      sphereMat.dispose()
      ringGeo1.dispose()
      ringMat1.dispose()
      ringGeo2.dispose()
      ringMat2.dispose()
      cubeGeo.dispose()
    }
  }, [])

  return (
    <div className="hero-3d-visual-container" ref={containerRef}>
      <canvas ref={canvasRef} className="hero-3d-canvas" />
      <div className="hero-3d-overlay-card">
        <div className="hero-3d-portrait">
          <img src="/assets/dharani-portrait.png" alt="Dharani V" />
          <div className="hero-3d-portrait-glow" />
        </div>
        <div className="hero-3d-tag">
          <span className="tag-dot" />
          <span>INTERACTIVE 3D CORE</span>
        </div>
      </div>
      <div className="hero-3d-caption">
        <span>3D COMPUTING × RESEARCH</span>
        <small>ROTATE · DRAG TO EXPLORE</small>
      </div>
    </div>
  )
}
