"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Generate shape positions
function generateSphere(count: number): Float32Array {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 4 + Math.random() * 0.5;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
}

function generateTorus(count: number): Float32Array {
    const positions = new Float32Array(count * 3);
    const R = 3.5; // major radius
    const r = 1.5; // minor radius
    for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        positions[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
        positions[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
        positions[i * 3 + 2] = r * Math.sin(v);
    }
    return positions;
}

function generateHeart(count: number): Float32Array {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const t = Math.random() * Math.PI * 2;
        const s = Math.random() * Math.PI;
        const scale = 0.25;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const z = (Math.random() - 0.5) * 3;
        positions[i * 3] = x * scale;
        positions[i * 3 + 1] = y * scale;
        positions[i * 3 + 2] = z;
    }
    return positions;
}

function generateStar(count: number): Float32Array {
    const positions = new Float32Array(count * 3);
    const spikes = 5;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spikeAngle = (Math.floor(angle / (Math.PI * 2 / spikes)) + 0.5) * (Math.PI * 2 / spikes);
        const diff = Math.abs(angle - spikeAngle);
        const outerR = 4;
        const innerR = 1.8;
        const r = innerR + (outerR - innerR) * Math.max(0, 1 - diff * spikes / Math.PI);
        const randomR = r * (0.8 + Math.random() * 0.4);
        positions[i * 3] = randomR * Math.cos(angle);
        positions[i * 3 + 1] = randomR * Math.sin(angle);
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return positions;
}

export default function ParticleBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const PARTICLE_COUNT = 5000;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 12;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle texture
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext("2d")!;
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(100, 70, 10, 1)");
        gradient.addColorStop(0.3, "rgba(80, 55, 5, 0.6)");
        gradient.addColorStop(1, "rgba(60, 40, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
        const texture = new THREE.CanvasTexture(canvas);

        // Create particle system
        const geometry = new THREE.BufferGeometry();
        const positions = generateSphere(PARTICLE_COUNT);
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        // Store per-particle sizes for variation
        const sizes = new Float32Array(PARTICLE_COUNT);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            sizes[i] = 0.03 + Math.random() * 0.04;
        }
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            map: texture,
            size: 0.08,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexColors: false,
            color: new THREE.Color("#5a4008"),
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Shape targets for morphing
        const shapes = [
            generateSphere(PARTICLE_COUNT),
            generateTorus(PARTICLE_COUNT),
            generateHeart(PARTICLE_COUNT),
            generateStar(PARTICLE_COUNT),
        ];
        let currentShape = 0;
        let targetShape = 1;
        let morphProgress = 0;
        const morphSpeed = 0.008;
        const holdTime = 3000; // ms to hold each shape
        let holdTimer = 0;
        let isMorphing = false;

        // Mouse interaction
        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };
        container.addEventListener("mousemove", handleMouseMove);

        let lastTime = Date.now();

        // Animation loop
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);
            const now = Date.now();
            const delta = now - lastTime;
            lastTime = now;

            const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
            const pos = posAttr.array as Float32Array;
            const from = shapes[currentShape];
            const to = shapes[targetShape];

            if (!isMorphing) {
                holdTimer += delta;
                if (holdTimer >= holdTime) {
                    isMorphing = true;
                    holdTimer = 0;
                }
            }

            if (isMorphing) {
                morphProgress += morphSpeed;
                // Smooth easing
                const t = morphProgress < 0.5
                    ? 4 * morphProgress * morphProgress * morphProgress
                    : 1 - Math.pow(-2 * morphProgress + 2, 3) / 2;

                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    const i3 = i * 3;
                    pos[i3] = from[i3] + (to[i3] - from[i3]) * t;
                    pos[i3 + 1] = from[i3 + 1] + (to[i3 + 1] - from[i3 + 1]) * t;
                    pos[i3 + 2] = from[i3 + 2] + (to[i3 + 2] - from[i3 + 2]) * t;
                }

                if (morphProgress >= 1) {
                    morphProgress = 0;
                    isMorphing = false;
                    currentShape = targetShape;
                    targetShape = (targetShape + 1) % shapes.length;
                }
            }

            posAttr.needsUpdate = true;

            // Rotate based on mouse + auto rotation
            particles.rotation.y += 0.002;
            particles.rotation.y += mouse.x * 0.003;
            particles.rotation.x = mouse.y * 0.3;

            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("mousemove", handleMouseMove);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            texture.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 pointer-events-auto"
            style={{ opacity: 0.7 }}
        />
    );
}
