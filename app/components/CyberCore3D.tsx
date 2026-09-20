'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export default function CyberCoreCanvas({ style, className }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Performance gating ─────────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    // ── Scene setup ────────────────────────────────────────────
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100);
    const cameraZ = isMobile ? 5.2 : 4.6;
    camera.position.set(0, 0, cameraZ);

    // ── Lighting ───────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xdc2626, 4.0, 14);
    redLight.position.set(2.5, 2.5, 2.5);
    scene.add(redLight);

    const backAccentLight = new THREE.PointLight(0xef4444, 2.2, 10);
    backAccentLight.position.set(-2.5, -2, 2);
    scene.add(backAccentLight);

    // ── Master Group for clamped translation ───────────────────
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // ── Rotatable Group for full 360 user drag rotation ───────
    const rotatableGroup = new THREE.Group();
    masterGroup.add(rotatableGroup);

    // ── Dynamic Topographic Contour Lines (Poster Aesthetic) ───
    const contourCount = 3;
    const contourSegments = 90;
    const contourMeshes: THREE.LineLoop[] = [];
    const contourBaseRadii = [1.95, 2.35, 2.75];

    for (let c = 0; c < contourCount; c++) {
      const cGeo = new THREE.BufferGeometry();
      const pos = new Float32Array((contourSegments + 1) * 3);
      cGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const cMat = new THREE.LineBasicMaterial({
        color: c % 2 === 0 ? 0xdc2626 : 0x71717a,
        transparent: true,
        opacity: c === 0 ? 0.18 : c === 1 ? 0.13 : 0.08,
      });

      const cLoop = new THREE.LineLoop(cGeo, cMat);
      cLoop.position.z = -0.35;
      masterGroup.add(cLoop);
      contourMeshes.push(cLoop);
    }

    // ── Central Sphere Core ─────────────────────────────────────
    const coreGroup = new THREE.Group();
    rotatableGroup.add(coreGroup);

    // 1. Polished jet black faceted crystal core
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111115,
      emissive: 0x220505,
      emissiveIntensity: 0.35,
      roughness: 0.18,
      metalness: 0.95,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // 2. Crimson red wireframe lattice
    const wireGeo = new THREE.IcosahedronGeometry(0.89, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 3. Inner glowing ruby energy nucleus
    const nucleusGeo = new THREE.OctahedronGeometry(0.42, 0);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // 4. Soft atmospheric halo
    const glowGeo = new THREE.SphereGeometry(1.02, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    coreGroup.add(glowMesh);

    // ── ATOMIC ORBIT SYSTEM ─────────────────────────────────────
    // Two rings crossed at 90° to each other — classic atomic electron orbit look.
    // The whole system tilts like Saturn (hor ~25° tilt) and flips 90° on each click.
    const orbitSystemGroup = new THREE.Group();
    rotatableGroup.add(orbitSystemGroup);

    // Starting orientation: tilted horizontal (Saturn-like)
    const TILT_HOR_X = 0.44;  // ~25° tilt
    const TILT_HOR_Z = 0.08;
    const TILT_VER_X = 0.44 + Math.PI / 2; // 90° flip to vertical polar
    const TILT_VER_Z = 0.08;

    let isVerticalOrientation = false;
    let targetTiltX = TILT_HOR_X;
    let targetTiltZ = TILT_HOR_Z;
    let currentTiltX = TILT_HOR_X;
    let currentTiltZ = TILT_HOR_Z;

    orbitSystemGroup.rotation.x = currentTiltX;
    orbitSystemGroup.rotation.z = currentTiltZ;

    // ── Ring A: Primary outer orbital ring (equatorial, lies in XZ plane) ────
    const ORBIT_RADIUS = 1.42;
    const ringAGeo = new THREE.TorusGeometry(ORBIT_RADIUS, 0.008, 12, 120);
    const ringAMat = new THREE.MeshBasicMaterial({ color: 0xdc2626, transparent: true, opacity: 0.9 });
    const ringA = new THREE.Mesh(ringAGeo, ringAMat);
    ringA.rotation.x = Math.PI / 2;
    orbitSystemGroup.add(ringA);

    // ── Ring B: Outer perpendicular ring (polar, stands in YZ plane) ────────
    const ringBGeo = new THREE.TorusGeometry(ORBIT_RADIUS, 0.006, 12, 120);
    const ringBMat = new THREE.MeshBasicMaterial({ color: 0x27272a, transparent: true, opacity: 0.75 });
    const ringB = new THREE.Mesh(ringBGeo, ringBMat);
    ringB.rotation.y = Math.PI / 2; // 90° to ring A
    orbitSystemGroup.add(ringB);

    // ── Ring C: Smaller inner equatorial ring (same plane as ringA, smaller) ─
    const INNER_RADIUS = 0.95;
    const ringCGeo = new THREE.TorusGeometry(INNER_RADIUS, 0.006, 12, 100);
    const ringCMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.65 });
    const ringC = new THREE.Mesh(ringCGeo, ringCMat);
    ringC.rotation.x = Math.PI / 2; // Same plane as ringA
    orbitSystemGroup.add(ringC);

    // ── Ring D: Smaller inner perpendicular ring (same plane as ringB, smaller) ─
    const ringDGeo = new THREE.TorusGeometry(INNER_RADIUS, 0.005, 12, 100);
    const ringDMat = new THREE.MeshBasicMaterial({ color: 0x52525b, transparent: true, opacity: 0.6 });
    const ringD = new THREE.Mesh(ringDGeo, ringDMat);
    ringD.rotation.y = Math.PI / 2; // Same plane as ringB — perpendicular to ringC
    orbitSystemGroup.add(ringD);

    // ── Circular Particle Texture ──────────────────────────────
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 48;
      canvas.height = 48;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(24, 24, 0, 24, 24, 24);
        grad.addColorStop(0, 'rgba(220, 38, 38, 0.9)');
        grad.addColorStop(0.35, 'rgba(24, 24, 27, 0.6)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 48, 48);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };
    const circleTexture = createCircleTexture();

    // ── Background star particle cloud ─────────────────────────
    const particleCount = isMobile ? 100 : 180;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const colorPalette = [
      new THREE.Color(0xdc2626),
      new THREE.Color(0xef4444),
      new THREE.Color(0x27272a),
      new THREE.Color(0x71717a),
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3]     = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      map: circleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // ── Orbital satellites: 4 revolving in ring A plane, 4 in ring B plane ─
    // Satellites on ring A orbit in the XZ plane (ringA is flat)
    // Satellites on ring B orbit in the YZ plane (ringB is perpendicular)
    interface Satellite {
      mesh: THREE.Mesh;
      orbitSpeed: number;
      angle: number;
      rotSpeed: number;
      ring: 'A' | 'B';
    }

    const satellites: Satellite[] = [];
    const satMatRuby = new THREE.MeshStandardMaterial({
      color: 0x1f0606,
      emissive: 0xdc2626,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const satMatOnyx = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.25,
      metalness: 0.95,
    });

    const shardGroup = new THREE.Group();
    orbitSystemGroup.add(shardGroup);

    for (let i = 0; i < 6; i++) {
      const ring = i < 3 ? 'A' : 'B';
      const size = 0.07 + (i % 3) * 0.02;
      const sGeo = i % 2 === 0
        ? new THREE.OctahedronGeometry(size, 0)
        : new THREE.TetrahedronGeometry(size, 0);
      const sMat = i % 2 === 0 ? satMatRuby : satMatOnyx;
      const sMesh = new THREE.Mesh(sGeo, sMat);

      satellites.push({
        mesh: sMesh,
        orbitSpeed: 0.35 + (i % 3) * 0.09,
        angle: (i / 3) * Math.PI * 2,  // spread evenly per ring
        rotSpeed: 0.9 + (i % 3) * 0.4,
        ring,
      });

      shardGroup.add(sMesh);
    }

    // ── Interactive Drag to Rotate ─────────────────────────────
    let isDragging = false;
    let startX = 0, startY = 0;
    let lastX = 0, lastY = 0;
    let targetRotX = 0, targetRotY = 0;
    let currentRotX = 0, currentRotY = 0;
    let velRotX = 0, velRotY = 0;

    let mouseTargetX = 0, mouseTargetY = 0;
    let mouseCurrentX = 0, mouseCurrentY = 0;

    let horizontalSpinVelocity = 0;
    let clickImpulseStart = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      velRotX = 0;
      velRotY = 0;
      mount.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        targetRotY += dx * 0.008;
        targetRotX += dy * 0.008;
        velRotY = dx * 0.004;
        velRotX = dy * 0.004;
        lastX = e.clientX;
        lastY = e.clientY;
      } else {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * -2;
        mouseTargetX = nx * 0.18;
        mouseTargetY = ny * 0.08;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        mount.style.cursor = 'grab';
        const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
        if (dist < 8) {
          triggerClickAction();
        }
      }
    };

    const triggerClickAction = () => {
      // Toggle 90° gyroscopic flip: horizontal <-> vertical
      isVerticalOrientation = !isVerticalOrientation;
      targetTiltX = isVerticalOrientation ? TILT_VER_X : TILT_HOR_X;
      targetTiltZ = isVerticalOrientation ? TILT_VER_Z : TILT_HOR_Z;
      horizontalSpinVelocity = 5.8;
      clickImpulseStart = performance.now();
    };

    mount.style.cursor = 'grab';
    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    // ── Responsive Resize ──────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.position.z = window.innerWidth < 768 ? 5.2 : 4.6;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── Visibility Pause ───────────────────────────────────────
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(mount);

    const onVisibility = () => { isVisible = !document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    // ── Animation Loop ─────────────────────────────────────────
    let rafId: number;
    const startTime = performance.now();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible || prefersReducedMotion) return;

      const now = performance.now();
      const t = (now - startTime) * 0.001;

      // 1. Mouse parallax
      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.045;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.045;

      // 2. Click impulse
      let clickSwayX = 0;
      let clickPulse = 0;
      if (clickImpulseStart > 0) {
        const elapsed = (now - clickImpulseStart) * 0.001;
        if (elapsed < 2.0) {
          clickSwayX = Math.sin(elapsed * 5.0) * Math.exp(-elapsed * 2.2) * 0.14;
          clickPulse = Math.sin(elapsed * Math.PI) * Math.exp(-elapsed * 1.5);
        }
      }

      masterGroup.position.x = mouseCurrentX + clickSwayX;
      masterGroup.position.y = mouseCurrentY;

      // 3. Drag + inertia rotation
      if (!isDragging) {
        targetRotY += 0.003;
        targetRotX += velRotX;
        targetRotY += velRotY;
        velRotX *= 0.92;
        velRotY *= 0.92;
      }

      currentRotX += (targetRotX - currentRotX) * 0.12;
      currentRotY += (targetRotY - currentRotY) * 0.12;

      if (horizontalSpinVelocity > 0.01) {
        targetRotY += horizontalSpinVelocity * 0.018;
        horizontalSpinVelocity *= 0.935;
      }

      rotatableGroup.rotation.x = currentRotX;
      rotatableGroup.rotation.y = currentRotY;

      // 4. Smooth 90° orbital flip on click
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltZ += (targetTiltZ - currentTiltZ) * 0.08;
      orbitSystemGroup.rotation.x = currentTiltX;
      orbitSystemGroup.rotation.z = currentTiltZ;

      // 5. Undulating topographic contours
      contourMeshes.forEach((mesh, idx) => {
        const baseR = contourBaseRadii[idx];
        const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        const speed = (idx + 1) * 0.45;
        for (let i = 0; i <= contourSegments; i++) {
          const theta = (i / contourSegments) * Math.PI * 2;
          const wave = Math.sin(theta * 3 + t * speed) * 0.09 + Math.cos(theta * 4 - t * (speed * 0.6)) * 0.05;
          const r = baseR + wave;
          arr[i * 3] = Math.cos(theta) * r;
          arr[i * 3 + 1] = Math.sin(theta) * (r * 0.82);
          arr[i * 3 + 2] = 0;
        }
        posAttr.needsUpdate = true;
      });

      // 6. Core animations
      nucleusMesh.rotation.y = t * 1.6;
      nucleusMesh.rotation.z = t * 0.8;

      // All 4 rings counter-rotate for visual life
      ringA.rotation.z = t * 0.28;
      ringB.rotation.z = t * 0.22;
      ringC.rotation.z = -t * 0.34; // inner rings counter-rotate their own axis
      ringD.rotation.z = -t * 0.26;

      // Breathing core
      const breathe = 1 + Math.sin(t * 1.5) * 0.02 + clickPulse * 0.08;
      coreMesh.scale.setScalar(breathe);
      wireMesh.scale.setScalar(breathe * 1.03);
      glowMesh.scale.setScalar(breathe * 1.06);
      wireMat.opacity = 0.42 + clickPulse * 0.35;

      // 7. Satellites revolving in their respective atomic orbital planes
      satellites.forEach((s) => {
        s.mesh.rotation.x += s.rotSpeed * 0.015;
        s.mesh.rotation.y += s.rotSpeed * 0.015;
        s.angle += s.orbitSpeed * 0.014;

        const r = ORBIT_RADIUS + clickPulse * 0.1;

        if (s.ring === 'A') {
          // Ring A lies in XZ plane (y=0), so orbit is cos/sin in x/z
          s.mesh.position.set(
            Math.cos(s.angle) * r,
            Math.sin(s.angle * 2) * 0.025,
            Math.sin(s.angle) * r
          );
        } else {
          // Ring B lies in YZ plane (x=0), so orbit is cos/sin in y/z
          s.mesh.position.set(
            Math.sin(s.angle * 2) * 0.025,
            Math.cos(s.angle) * r,
            Math.sin(s.angle) * r
          );
        }
      });

      // Ambient particle cloud
      particleCloud.rotation.y = t * 0.02;

      // Light pulsing
      redLight.intensity = 4.0 + Math.sin(t * 1.5) * 0.6 + clickPulse * 2.5;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();

      coreGeo.dispose(); coreMat.dispose();
      wireGeo.dispose(); wireMat.dispose();
      nucleusGeo.dispose(); nucleusMat.dispose();
      glowGeo.dispose(); glowMat.dispose();
      ringAGeo.dispose(); ringAMat.dispose();
      ringBGeo.dispose(); ringBMat.dispose();
      ringCGeo.dispose(); ringCMat.dispose();
      ringDGeo.dispose(); ringDMat.dispose();
      circleTexture.dispose();
      particleGeo.dispose(); particleMat.dispose();
      satMatRuby.dispose(); satMatOnyx.dispose();
      satellites.forEach((s) => s.mesh.geometry.dispose());
      contourMeshes.forEach((c) => {
        c.geometry.dispose();
        (c.material as THREE.Material).dispose();
      });
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        touchAction: 'none',
        userSelect: 'none',
        ...style,
      }}
    />
  );
}
