<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const foxInit = () => {
    const scene = new THREE.Scene();
    scene.background = null; // 设置为透明背景

    const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
    camera.position.set(2, 1.5, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); // 启用 alpha
    renderer.setSize(300, 300); // 设置固定大小
    document.querySelector('.fox-wrapper')!.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    let mixer: THREE.AnimationMixer | null = null;

    const loader = new GLTFLoader();
    loader.load(
        '/gltf/Fox.gltf',
        function (gltf: any) {
            const model = gltf.scene;
            model.scale.set(0.023, 0.023, 0.023);
            scene.add(model);

            mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip: THREE.AnimationClip) => {
                mixer!.clipAction(clip).play();
            });
        },
        undefined,
        function (error: any) {
            console.error('加载模型出错:', error);
        }
    );

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);

        renderer.render(scene, camera);
    }

    animate();

    let angle = 0; // 初始角度（弧度）
    const radius = 3; // 半径（离模型距离）
    const target = new THREE.Vector3(0, 1, 0); // 模型中心点

    function rotateCameraTo(angleInRadians: number) {
        angle = angleInRadians;
        camera.position.x = target.x + radius * Math.sin(angle);
        camera.position.z = target.z + radius * Math.cos(angle);
        camera.lookAt(target); // 始终看向模型
    }
    rotateCameraTo(Math.PI / 2.2);
}

onMounted(() => {
    foxInit();
})
</script>

<template>
    <div class="fox-wrapper"></div>
</template>

<style lang="scss" scoped>
.fox-wrapper {
    width: 300px;
    height: 300px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 888;
}
</style>