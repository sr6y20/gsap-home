<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted, useTemplateRef } from "vue";
import Marquee from "./Marquee.vue";
import PixeledLoader from "./PixeledLoader.vue";


const contactRef = useTemplateRef('contact');

let tl: gsap.core.Timeline, tl2: gsap.core.Timeline;

const textAnimate = (event: DeviceOrientationEvent) => {
    tl.pause()
    tl2.pause()
    gsap.to([tl, tl2], {
        duration: 2,
        ease: 'power4',
        progress: (innerWidth / 2 - (event.gamma!) * 10) / innerWidth
    })
}

const initTimeLine = () => {
    tl = gsap.timeline({
        defaults: {
            duration: 2,
            yoyo: true,
            ease: 'power2.inOut'
        }
    })
        .fromTo('.left, .right', {
            svgOrigin: '640 500',
            skewY: (i) => [-30, 15][i],
            scaleX: (i) => [0.6, 0.85][i],
            x: 200
        }, {
            skewY: (i) => [-15, 30][i],
            scaleX: (i) => [0.85, 0.6][i],
            x: -200
        })
        .play(.5)


    tl2 = gsap.timeline()

    document.querySelectorAll('text').forEach((t, i) => {
        tl2.add(
            gsap.fromTo(t, {
                xPercent: -100,
                x: 700
            }, {
                duration: 1,
                xPercent: 0,
                x: 575,
                ease: 'sine.inOut'
            })
            , i % 3 * 0.2)
    })
}

const createObserve = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (window.DeviceOrientationEvent) {
                    // 手机传感器移动
                    window.addEventListener('deviceorientation', textAnimate);
                } else {
                    // 电脑鼠标移动
                    contactRef.value!.onpointermove = (e) => {
                        tl.pause()
                        tl2.pause()
                        gsap.to([tl, tl2], {
                            duration: 2,
                            ease: 'power4',
                            progress: e.x / innerWidth
                        })
                    }
                }
            } else {
                if (window.DeviceOrientationEvent) {
                    window.removeEventListener('deviceorientation', textAnimate);
                } else {
                    contactRef.value!.onpointermove = null;
                }
            }
        });
    });
    observer.observe(document.querySelector('.contact') as Element);
}

onMounted(() => {
    initTimeLine();
    createObserve();

})

</script>

<template>
    <div class="contact" ref="contact">
        <svg viewBox="0 0 1280 720" class="big-text">
            <mask id="maskLeft">
                <rect x="-50%" width="100%" height="100%" fill="#fff" />
            </mask>
            <mask id="maskRight">
                <rect x="50%" width="100%" height="100%" fill="#fff" />
            </mask>
            <g font-size="150">
                <g mask="url(#maskLeft)" fill="#fff" class="left">
                    <text y="120">LET'S</text>
                    <text y="250">CONTACT</text>
                    <text y="380">SR6Y20</text>
                </g>
                <g mask="url(#maskRight)" fill="#aaa" class="right">
                    <text y="120">LET'S</text>
                    <text y="250">CONTACT</text>
                    <text y="380">SR6Y20</text>
                </g>
            </g>
        </svg>

        <!-- <PixeledLoader /> -->
        <Marquee />

    </div>
</template>

<style lang="scss" scoped>
.contact {
    height: calc(100vh + 80px);
    font-optical-sizing: auto;
    font-weight: bold;
    font-style: normal;
    background: #000;
    overflow: hidden;
    color: white;
    position: relative;

    .big-text {
        width: 100%;
        height: 70vh;
        margin-top: 100px;
    }
}
</style>