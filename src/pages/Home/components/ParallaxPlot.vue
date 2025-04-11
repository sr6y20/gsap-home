<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/plugins/effect/lenis.min.js';

declare let Lenis: any;
gsap.registerPlugin(ScrollTrigger);

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
                    ease: "none"
                },
                idx === 0 ? undefined : "<"
            );
        });
    });
    /* Lenis */
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
}

onMounted(() => {
    firstBackgroundInit()
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
                        <h2 class="parallax__title">SR6Y20</h2>
                    </div>
                    <img src="/layer-3.png" loading="eager" width="800" data-parallax-layer="4" alt=""
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
    src: url('https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717e399d30a606fed425914_PPNeueCorp-WideUltrabold.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
}
</style>