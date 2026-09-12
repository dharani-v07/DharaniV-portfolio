import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const Ambient3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene & Camera setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 14, 28)
    camera.rotation.x = -0.45

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Fluid Undulating Topography Wave Grid
    const cols = window.innerWidth < 768 ? 40 : 70
    const rows = window.innerWidth < 768 ? 35 : 55
    const numPoints = cols * rows

    const positions = new Float32Array(numPoints * 3)
    const originalY = new Float32Array(numPoints)
    const colors = new Float32Array(numPoints * 3)

    const gridWidth = 70
    const gridDepth = 55

    // Color definitions: Deep Dark, Ruby / Crimson Accent, and Soft Slate
    const colorDark = new THREE.Color(0x18181b)
    const colorRed = new THREE.Color(0xe52d2d)
    const colorMuted = new THREE.Color(0x71717a)

    let idx = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const u = c / (cols - 1)
        const v = r / (rows - 1)

        const x = (u - 0.5) * gridWidth
        const z = (v - 0.5) * gridDepth
        const y = 0

        positions[idx * 3] = x
        positions[idx * 3 + 1] = y
        positions[idx * 3 + 2] = z
        originalY[idx] = y

        // Gradient coloring: subtle crimson highlights in the center/ripples
        const distFromCenter = Math.sqrt((u - 0.5) ** 2 + (v - 0.5) ** 2)
        const mixedColor = colorDark.clone()
        if (distFromCenter < 0.35) {
          mixedColor.lerp(colorRed, (0.35 - distFromCenter) * 1.6)
        } else {
          mixedColor.lerp(colorMuted, 0.15)
        }

        colors[idx * 3] = mixedColor.r
        colors[idx * 3 + 1] = mixedColor.g
        colors[idx * 3 + 2] = mixedColor.b

        idx++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Wave Points Material with vertex colors
    const material = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 0.3 : 0.38,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending
    })

    const pointMesh = new THREE.Points(geometry, material)
    scene.add(pointMesh)

    // Secondary subtle connecting line wave for mesh texture
    const lineGeometry = new THREE.WireframeGeometry(
      new THREE.PlaneGeometry(gridWidth, gridDepth, cols - 1, rows - 1)
    )
    lineGeometry.rotateX(Math.PI / 2)

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xe52d2d,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending
    })
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lineMesh)

    // Interaction tracking (Mouse & Touch with smooth spring physics)
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.5
        targetMouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 1.5
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    // Smooth Scroll Integration
    let scrollY = window.scrollY
    let targetScrollY = window.scrollY
    const onScroll = () => {
      targetScrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      const time = clock.getElapsedTime()

      // Smooth lerping for mouse & scroll
      mouseX += (targetMouseX - mouseX) * 0.04
      mouseY += (targetMouseY - mouseY) * 0.04
      scrollY += (targetScrollY - scrollY) * 0.05

      // Camera responds gently to mouse and scroll
      camera.position.x = mouseX * 5
      camera.position.y = 14 + mouseY * 3 - (scrollY * 0.005)
      camera.position.z = 28 + (scrollY * 0.003)
      camera.lookAt(mouseX * 1.5, 0, 0)

      // Undulate Wave Topology Points smoothly
      const posArray = geometry.attributes.position.array as Float32Array
      let pIdx = 0

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = posArray[pIdx * 3]
          const z = posArray[pIdx * 3 + 2]

          // Multi-frequency organic wave harmonics
          const wave1 = Math.sin(x * 0.18 + time * 1.2) * 1.6
          const wave2 = Math.cos(z * 0.22 + time * 0.9) * 1.4
          const wave3 = Math.sin((x + z) * 0.1 + time * 1.5) * 1.0

          // Interactive mouse wave disturbance
          const distToMouse = Math.hypot(x - mouseX * 20, z - mouseY * 15)
          const mouseRipple = Math.sin(distToMouse * 0.5 - time * 3) * Math.max(0, (1 - distToMouse / 22) * 2.2)

          posArray[pIdx * 3 + 1] = wave1 + wave2 + wave3 + mouseRipple

          pIdx++
        }
      }

      geometry.attributes.position.needsUpdate = true

      // Synchronize wireframe plane with wave movement
      lineMesh.position.y = Math.sin(time * 0.5) * 0.5 - 0.2
      lineMesh.rotation.y = time * 0.02 + mouseX * 0.1

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
    }
  }, [])

  return <div className="ambient-3d-scene" ref={mountRef} aria-hidden="true" />
}
