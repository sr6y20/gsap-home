<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, ref, useTemplateRef } from "vue";

import Loading from "@/components/Loading.vue";
import ParallaxPlot from '@/views/Home/components/ParallaxPlot.vue';
import FlowerColor from "@/views/Home/components/FlowerColor.vue";
import FoxGLTF from "@/views/Home/components/FoxGLTF.vue";
import Contact from "@/views/Home/components/Contact.vue";
import BallSimulation from "./components/BallSimulation.vue";
import TimeLine from "./components/TimeLine.vue";
import MarsSun from '@/assets/svgs/MarsSun.svg'

gsap.registerPlugin(ScrollTrigger);

const completeScale = ref(1);

// const foxRef = useTemplateRef('fox');
const contentScreen = () => {
    const sections = gsap.utils.toArray<HTMLElement>(".panel");
    const sectionCount = sections.length;
    const step = 1 / (sectionCount - 1);

    gsap.to(sections, {
        xPercent: -100 * (sectionCount - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".link-container",
            pin: true,
            scrub: 0.1,
            end: "+=3000",
            snap: {
                snapTo: (rawProgress) => {
                    const page = rawProgress / step;
                    const pageIndex = Math.floor(page);
                    const remainder = page - pageIndex;
                    return (remainder > 1 / 3 ? pageIndex + 1 : pageIndex) * step;
                },
                duration: 0.3,
                delay: 0.05,
            },
        },
    });
};

// loadingState控制Loading组件的显示与隐藏
const loadingState = ref(true);

const parallaxPlotRef = useTemplateRef('parallaxPlot');

// parallaxPlotRef传递给Loading组件，用于控制Lenis动画的开启和关闭
const startLenis = () => {
    if (parallaxPlotRef.value) {
        parallaxPlotRef.value.startLenis();
    }
}
const stopLenis = () => {
    if (parallaxPlotRef.value) {
        parallaxPlotRef.value.stopLenis();
    }
}

// 检查parallax中的图片是否加载完成，如果加载完成则隐藏loading组件
const checkParallaxImagesLoaded = (callback: () => void) => {
    const container = document.querySelector('.parallax');
    if (!container) return;

    const images = container.querySelectorAll('img');
    const total = images.length;
    let loadedCount = 0;

    if (total === 0) {
        callback(); // 没有图片也算完成
        return;
    }

    images.forEach((img) => {
        if (img.complete && img.naturalHeight !== 0) {
            loadedCount++;
            if (loadedCount === total) callback();
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === total) callback();
            });
            img.addEventListener('error', () => {
                loadedCount++;
                if (loadedCount === total) callback(); // 也可视为加载完成
            });
        }
    });
}

const onResizeScale = () => {
    completeScale.value = Math.min(window.innerWidth, window.innerHeight) / 1440;
}

onMounted(() => {
    contentScreen();

    completeScale.value = Math.min(window.innerWidth, window.innerHeight) / 1440;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                window.addEventListener('resize', onResizeScale)
            } else {
                window.removeEventListener('resize', onResizeScale)
            }
        });
    });
    observer.observe(document.querySelector('.red')!);

    setTimeout(() => {
        checkParallaxImagesLoaded(() => {
            loadingState.value = false;
        })
    }, 1000)
})
</script>

<template>
    <div class="app-wrapper">
        <Loading v-if="loadingState" @start-lenis="startLenis" @stop-lenis="stopLenis" />
        <ParallaxPlot ref="parallaxPlot" />
        <FlowerColor />

        <!-- <FoxGLTF ref="fox" /> -->

        <div class="link-container">

            <section class="panel red">
                <!-- <TimeLine /> -->
                <MarsSun :style="{ scale: `${completeScale}` }" />
            </section>

            <section class="panel purple">
                <BallSimulation />
            </section>
        </div>

        <Contact />
    </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
    width: 100%;
    overflow-x: hidden;

    .link-container {
        width: 200%;
        display: flex;
        flex-wrap: nowrap;
        position: relative;

        .panel {
            font-weight: 300;
            height: 100vh;
            width: 100vw;
        }

        .red {
            background-color: #0a0e26;
            background-image:
                radial-gradient(circle at 30% 40%, rgba(100, 150, 255, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 70% 60%, rgba(150, 120, 255, 0.1) 0%, transparent 30%),
                linear-gradient(165.72deg,
                    #0d1330 21.15%,
                    #1a2456 50%,
                    #0c112b 81.93%);
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                // scale: 0.65;
                flex-shrink: 0;
                animation: twinkle 5s infinite;
                transition: all 0.5s ease-in-out;
            }

            @keyframes twinkle {
                0% {
                    opacity: 1;
                }

                50% {
                    opacity: 0.6;
                }

                100% {
                    opacity: 1;
                }
            }
        }

        .purple {
            background: radial-gradient(ellipse at 30% 30%, #b07fff 0%, transparent 60%),
                radial-gradient(ellipse at 70% 70%, #4238ff 0%, transparent 60%),
                linear-gradient(160deg, #1f0036 0%, #180030 100%);
            background-color: #120026;
            background-blend-mode: lighten;
        }
    }
}
</style>