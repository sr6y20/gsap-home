<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { onMounted, reactive } from 'vue';

const threeOption = reactive({
    camera: null as THREE.PerspectiveCamera | null,
})

const foxInit = () => {
    const scene = new THREE.Scene();
    scene.background = null;

    // const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
    threeOption.camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
    threeOption.camera.position.set(2, 1.5, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(300, 300);
    document.querySelector('.fox-wrapper')!.appendChild(renderer.domElement);

    const controls = new OrbitControls(threeOption.camera, renderer.domElement);
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

        renderer.render(scene, threeOption.camera as THREE.PerspectiveCamera);
    }

    animate();

    // rotateCameraTo(Math.PI / 0.29);
}

let angle = 0;
const radius = 3;
const target = new THREE.Vector3(0, 1, 0);
const rotateCameraTo = (angleInRadians: number) => {
    angle = angleInRadians;
    if (!threeOption.camera) return;
    threeOption.camera.position.x = target.x + radius * Math.sin(angle);
    threeOption.camera.position.z = target.z + radius * Math.cos(angle);
    threeOption.camera.lookAt(target);
}

defineExpose({
    rotateCameraTo
})
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
    position: absolute;
    top: 2600px;
    right: 0px;
    z-index: 888;
}
</style>