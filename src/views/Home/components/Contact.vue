<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted, useTemplateRef } from "vue";
const contactRef = useTemplateRef('contact');

onMounted(() => {
    const tl = gsap.timeline({
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



    const tl2 = gsap.timeline()

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

    contactRef.value!.onpointermove = (e) => {
        tl.pause()
        tl2.pause()
        gsap.to([tl, tl2], {
            duration: 2,
            ease: 'power4',
            progress: e.x / innerWidth
        })
    }


    const textAnimate = (event: DeviceOrientationEvent) => {
        tl.pause()
        tl2.pause()
        gsap.to([tl, tl2], {
            duration: 2,
            ease: 'power4',
            progress: (innerWidth / 2 - (event.gamma!) * 10) / innerWidth
        })
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (window.DeviceOrientationEvent)
                    window.addEventListener('deviceorientation', textAnimate);
            } else {
                if (window.DeviceOrientationEvent)
                    window.removeEventListener('deviceorientation', textAnimate);
            }
        });
    });
    observer.observe(document.querySelector('.contact') as Element);
})


</script>

<template>
    <div class="contact" ref="contact">
        <svg viewBox="0 0 1280 720">
            <mask id="maskLeft">
                <rect x="-50%" width="100%" height="100%" fill="#fff" />
            </mask>
            <mask id="maskRight">
                <rect x="50%" width="100%" height="100%" fill="#fff" />
            </mask>
            <g font-size="150">
                <g mask="url(#maskLeft)" fill="#fff" class="left">
                    <text y="120">NEXT</text>
                    <text y="250">SEE IN</text>
                    <text y="380">SR6Y20</text>
                </g>
                <g mask="url(#maskRight)" fill="#aaa" class="right">
                    <text y="120">NEXT</text>
                    <text y="250">SEE IN</text>
                    <text y="380">SR6Y20</text>
                </g>
            </g>
        </svg>

        <div class="link">
            <a href="https://www.instagram.com/sr6y20/" target="_blank">INSTAGRAM</a>
            <a href="https://www.facebook.com/sr6y20/" target="_blank">FACEBOOK</a>
            <a href="https://www.youtube.com/channel/UCr2YwQX6Y2Y4j0q5qX8j0WQ" target="_blank">YOUTUBE</a>
            <a href="https://www.tiktok.com/@sr6y20" target="_blank">TIKTOK</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.contact {
    height: calc(100vh + 80px);
    background-color: #000;
    font-optical-sizing: auto;
    font-weight: bold;
    font-style: normal;
    background: #000;
    overflow: hidden;

    svg {
        width: 100%;
        height: 70vh;
        margin-top: 100px;
    }

    .link {
        display: flex;
        gap: 10px;
        justify-content: center;
    }
}
</style>