<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/plugins/effect/lenis.min.js';
import { onMounted, ref, useTemplateRef } from "vue";

declare let Lenis: any;
gsap.registerPlugin(ScrollTrigger);


const lenisRunning = ref(true);
const firstBackgroundInit = () => {
    document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: "0% 0%",
                end: "100% 0%",
                scrub: 0
            }
        });
        const layers = [
            { layer: "1", yPercent: 70 },
            { layer: "2", yPercent: 55 },
            { layer: "3", yPercent: 40 },
            { layer: "4", yPercent: 10 }
        ];
        layers.forEach((layerObj, idx) => {
            tl.to(
                triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
                {
                    yPercent: layerObj.yPercent,
                    ease: "none",
                    willChange: "transform",
                },
                idx === 0 ? undefined : "<"
            );
        });
    });

    // Lenis
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        if (lenisRunning.value) {
            lenis.raf(time * 1000);
        }
    });
    gsap.ticker.lagSmoothing(0);
}
const startLenis = () => {
    lenisRunning.value = true;
};

const stopLenis = () => {
    lenisRunning.value = false;
};
// 暴露给父组件使用
defineExpose({
    startLenis,
    stopLenis
})

const range = 40;
const calcValue = function calcValue(a: number, b: number) {
    return ((a / b) * range - range / 2).toFixed(1);
};

const layer4Ref = useTemplateRef("layer4Ref")
let timeout: any;
const mousemoveEvent = (_ref: any) => {
    let x = _ref.x,
        y = _ref.y;
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(function () {
        let xValue = calcValue(x, window.innerWidth) as unknown as number;
        let yValue = calcValue(y, window.innerHeight) as unknown as number;
        layer4Ref.value!.style.transform = `translate3d(${xValue * 0.2}px, ${yValue * 0.2}px, 0)`;
    });
};

let timeout2: any;
const imgAnimate = (event: DeviceOrientationEvent) => {

    if (timeout2) {
        window.cancelAnimationFrame(timeout2);
    }

    timeout2 = window.requestAnimationFrame(function () {
        let xValue = calcValue((innerWidth / 2 + (event.gamma!) * 20), window.innerWidth) as unknown as number;
        let yValue = calcValue((innerHeight / 2 + (event.beta!) * 20), window.innerHeight) as unknown as number;
        layer4Ref.value!.style.transform = `translate3d(${xValue * 0.2}px, ${yValue * 0.2}px, 0)`;
    });
}


onMounted(() => {
    firstBackgroundInit()

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document.addEventListener('mousemove', mousemoveEvent);
                if (window.DeviceOrientationEvent)
                    window.addEventListener('deviceorientation', imgAnimate);
            } else {
                document.removeEventListener('mousemove', mousemoveEvent);
                if (window.DeviceOrientationEvent)
                    window.removeEventListener('deviceorientation', imgAnimate);
            }
        });
    });
    observer.observe(document.querySelector('.parallax__header')!);
})
</script>

<template>
    <div class="parallax">
        <section class="parallax__header">
            <div class="parallax__visuals">
                <div class="parallax__black-line-overflow"></div>
                <div data-parallax-layers class="parallax__layers">
                    <img src="/layer-1.png" loading="eager" width="800" data-parallax-layer="1" alt=""
                        class="parallax__layer-img">
                    <img src="/layer-2.png" loading="eager" width="800" data-parallax-layer="2" alt=""
                        class="parallax__layer-img">
                    <div data-parallax-layer="3" class="parallax__layer-title">
                        <h2 class="parallax__title" data-text="SR6Y20">SR6Y20</h2>
                    </div>
                    <img src="/layer-3.png" loading="eager" width="800" data-parallax-layer="4" alt=""
                        class="parallax__layer-img">
                    <img src="/layer-4.png" ref="layer4Ref" loading="eager" width="800" alt=""
                        class="parallax__layer-img">
                </div>
                <div class="parallax__fade"></div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.parallax__fade {
    --color-dark-rgb: 0, 0, 0;
    background: linear-gradient(to top, rgba(var(--color-dark-rgb), 1) 0%, rgba(var(--color-dark-rgb), 0.738) 19%, rgba(var(--color-dark-rgb), 0.541) 34%, rgba(var(--color-dark-rgb), 0.382) 47%, rgba(var(--color-dark-rgb), 0.278) 56.5%, rgba(var(--color-dark-rgb), 0.194) 65%, rgba(var(--color-dark-rgb), 0.126) 73%, rgba(var(--color-dark-rgb), 0.075) 80.2%, rgba(var(--color-dark-rgb), 0.042) 86.1%, rgba(var(--color-dark-rgb), 0.021) 91%, rgba(var(--color-dark-rgb), 0.008) 95.2%, rgba(var(--color-dark-rgb), 0.002) 98.2%, transparent 100%);
}

.osmo-icon-svg {
    width: 8em;
    position: relative;
}

.parallax__header {
    z-index: 2;
    padding: calc(3.5em + (var(--gap)* 2)) 2em;
    justify-content: center;
    align-items: center;
    min-height: 100svh;
    display: flex;
    position: relative;
}

.parallax {
    width: 100%;
    position: relative;
    overflow: hidden;
}

.parallax__content {
    padding: calc(3.5em + (var(--gap)* 2)) 2em;
    justify-content: center;
    align-items: center;
    min-height: 100svh;
    display: flex;
    position: relative;
}

.cover {
    object-fit: cover;
    width: 100%;
    max-width: none;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.parallax__visuals {
    object-fit: cover;
    width: 100%;
    max-width: none;
    height: 120%;
    position: absolute;
    top: 0;
    left: 0;
}

.parallax__placeholder {
    z-index: 0;
    opacity: 0;
    object-fit: cover;
    width: 100%;
    max-width: none;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.parallax__layers {
    object-fit: cover;
    width: 100%;
    max-width: none;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}

.cover-copy {
    object-fit: cover;
    width: 100%;
    max-width: none;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.parallax__fade {
    z-index: 30;
    object-fit: cover;
    width: 100%;
    max-width: none;
    height: 20%;
    position: absolute;
    bottom: 0;
    left: 0;
}

.parallax__black-line-overflow {
    z-index: 20;
    background-color: var(--color-black);
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: -1px;
    left: 0;
}

.parallax__title {
    pointer-events: auto;
    text-align: center;
    text-transform: none;
    margin-top: 0;
    margin-bottom: .1em;
    margin-right: .075em;
    font-family: PP Neue Corp Wide, sans-serif;
    font-size: 11vw;
    font-weight: 800;
    line-height: 1;
    position: relative;
    color: transparent;
    background-image: linear-gradient(to bottom, #53fcff, #3dfcff, #27A8FC, #9F67C1, #FE275C, #ED2D36);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 12px -12px #ffffff;
}

.parallax__radial-gradient {
    z-index: 10;
    background-image: radial-gradient(circle farthest-corner at 50% 50%, transparent, var(--color-black));
    opacity: .5;
    pointer-events: none;
    mix-blend-mode: multiply;
    position: fixed;
    inset: 0;
}

.parallax__layer-title {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100svh;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
}

.parallax__layer-img {
    pointer-events: none;
    object-fit: cover;
    width: 100%;
    max-width: none;
    height: 117.5%;
    position: absolute;
    top: -17.5%;
    left: 0;
}

.parallax__layer-img.is-third {
    top: -20%;
}

@font-face {
    font-family: 'PP Neue Corp Wide';
    src: url('../../../assets/fonts/6717e399d30a606fed425914_PPNeueCorp-WideUltrabold.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
}
</style>