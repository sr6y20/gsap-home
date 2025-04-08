<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

// 鱼轨迹
const fish = useTemplateRef('fish');
const path = [
    // 1
    { x: 800, y: 200 },
    { x: 900, y: 20 },
    { x: 1100, y: 100 },
    // 2
    { x: 1000, y: 200 },
    { x: 900, y: 20 },
    { x: 10, y: 500 },
    // 3
    { x: 100, y: 300 },
    { x: 500, y: 400 },
    { x: 1000, y: 200 },
    // 4
    { x: 1100, y: 300 },
    { x: 400, y: 400 },
    { x: 200, y: 250 },
    // 5
    { x: 100, y: 300 },
    { x: 500, y: 450 },
    { x: 1100, y: 500 }
];
const scaledPath = path.map(({ x, y }) => {
    return {
        x: x * (window.innerWidth < 1000 ? window.innerWidth / 1200 : 1),
        y: y * (window.innerHeight < 700 ? window.innerHeight / 1200 : 1)
    }
});
const fishPathInit = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            scrub: 1.5,
        },
    })
    tl.to(fish.value, {
        motionPath: {
            path: scaledPath,
            align: 'self',
            alignOrigin: [0.5, 0.5],
            autoRotate: true
        },
        duration: 10,
        immediateRender: true,
    })
    tl.to(fish.value, {
        rotateX: 180
    }, 1)
    tl.to(fish.value, {
        rotateX: 0
    }, 2.5)
    tl.to(fish.value, {
        z: -500,
        duration: 2,
    }, 2.5)
    tl.to(fish.value, {
        rotateX: 180
    }, 4)
    tl.to(fish.value, {
        rotateX: 0
    }, 5.5)
    tl.to(fish.value, {
        z: -50,
        duration: 2,
    }, 5)
    tl.to(fish.value, {
        rotate: 0,
        duration: 1,
    }, '-=1')
};

// 鱼转向
let lastScrollTop = 0;
let directionChanged = '';
const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

    if (scrollDirection !== directionChanged) {
        directionChanged = scrollDirection;
        if (scrollDirection === 'down') {
            gsap.to(fish.value, { rotationY: 0, duration: 0.4 })
        } else {
            gsap.to(fish.value, { rotationY: 180, duration: 0.4 })
        }

        directionChanged = '';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

onMounted(() => {
    fishPathInit();
    window.addEventListener('scroll', handleScroll);
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
})
</script>

<template>
    <div class="fish-wrapper">
        <div class="fish" ref="fish">
            <div class="fish__inner">
                <!--body-->
                <div class="fish__body"></div>
                <div class="fish__body"></div>
                <div class="fish__body"></div>
                <div class="fish__body"></div>

                <!--head-->
                <div class="fish__head"></div>
                <div class="fish__head fish__head--2"></div>
                <div class="fish__head fish__head--3"></div>
                <div class="fish__head fish__head--4"></div>

                <div class="fish__tail-main"></div>
                <div class="fish__tail-fork"></div>

                <div class="fish__fin"></div>
                <div class="fish__fin fish__fin--2"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fish-wrapper {
    --mask: linear-gradient(180deg, rgba(0, 0, 0, 1.0), transparent);
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    perspective: 100rem;
    perspective-origin: center center;
    transform-style: preserve-3d;
    pointer-events: none;
    -webkit-mask-image: var(--mask);
    mask-image: var(--mask);
    z-index: 12;

    .fish {
        --bodyW: 2rem;
        --o: 0.95;
        --l: 100%;
        --c: hsla(250deg, 50%, var(--l), var(--o, 0.6));
        --size: 10rem;
        position: relative;
        width: var(--size);
        height: var(--size);
        transform-style: preserve-3d;
        transform-origin: center;

        @media (min-width: 1000px) {
            --size: 20rem;
            --bodyW: 4rem;
        }

        .fish__inner {
            --a: 9.5deg;
            width: calc(var(--bodyW) * 1.5);
            height: var(--size);
            transform-style: preserve-3d;
            transform: rotate(90deg);
        }

        .fish__body {
            --l: 75%;
            --c: hsla(250deg, 50%, var(--l), var(--o, 0.6));
            position: absolute;
            top: var(--bodyW);
            left: 0;
            width: var(--bodyW);
            height: calc(3 * var(--bodyW));
            background: var(--c);
            clip-path: polygon(0 0, 100% 0, 50% 100%);
            transform: translateZ(calc(var(--bodyW) / -2)) rotateX(var(--a));
            transform-origin: center top;

            &:nth-child(2) {
                --i: 2;
                --l: 75%;
                transform: translateZ(calc(var(--bodyW) / 2)) rotateX(calc(var(--a) * -1));
            }

            &:nth-child(3) {
                --i: 3;
                --l: 95%;
                transform: rotateY(90deg) translate3d(calc(var(--bodyW) / -2), 0, 0) rotateX(var(--a));
                transform-origin: left top;
            }

            &:nth-child(4) {
                --i: 4;
                --l: 50%;
                transform: rotateY(90deg) translate3d(calc(var(--bodyW) / 2), 0, 0) rotateX(calc(var(--a) * -1));
                transform-origin: right top;
            }
        }

        .fish__head {
            --a: 23.5deg;
            --l: 85%;
            --c: hsla(250deg, 50%, var(--l), var(--o, 0.6));
            position: absolute;
            top: 0;
            left: 0;
            width: var(--bodyW);
            height: var(--bodyW);
            background: var(--c);
            clip-path: polygon(40% 0, 60% 0, 100% 100%, 0 100%);
            transform: translateZ(calc(var(--bodyW) / 2)) rotateX(var(--a));
            transform-origin: center bottom;

            &--2 {
                --i: 2;
                --l: 80%;
                transform: translateZ(calc(var(--bodyW) / -2)) rotateX(calc(var(--a) * -1));
            }

            &--3 {
                --i: 3;
                --l: 90%;
                transform: rotateY(90deg) translate3d(calc(var(--bodyW) / -2), 0, 0) rotateX(calc(var(--a) * -1));
                transform-origin: left bottom;
            }

            &--4 {
                --l: 55%;
                transform: rotateY(90deg) translate3d(calc(var(--bodyW) / 2), 0, 0) rotateX(var(--a));
                transform-origin: right bottom;
            }
        }

        .fish__tail-main {
            --o: 0.9;
            --l: 90%;
            --c: hsla(250deg, 50%, var(--l), var(--o, 0.6));
            width: var(--bodyW);
            height: var(--bodyW);
            background-color: var(--c);
            position: absolute;
            left: 0;
            bottom: var(--bodyW);
            clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }

        .fish__tail-fork {
            --o: 0.9;
            --l: 95%;
            --c: hsla(250deg, 50%, var(--l), var(--o, 0.6));
            width: var(--bodyW);
            height: var(--bodyW);
            background-color: var(--c);
            position: absolute;
            left: 0;
            bottom: 0;
            clip-path: polygon(0 0, 100% 0, 100% 70%, 90% 100%, 70% 70%, 50% 30%, 30% 70%, 10% 100%, 0 70%);
            transform-origin: top center;
            transform: rotateX(-45deg);
            animation: tail 1000ms infinite alternate;
        }

        .fish__fin {
            width: calc(var(--bodyW) / 8 * 3);
            height: var(--bodyW);
            background-color: var(--c);
            position: absolute;
            top: calc(var(--bodyW) * 1.5);
            left: calc(var(--bodyW) / 8 * 3);
            clip-path: polygon(50% 0, 100% 30%, 100% 60%, 50% 100%, 0 60%, 0 30%);
            transform-origin: top center;
            transform: translateZ(calc(var(--bodyW) / 2)) rotateY(0deg) rotateX(5deg) rotate(10deg);
            animation: fin 1500ms infinite alternate linear;

            &--2 {
                transform: translateZ(calc(var(--bodyW) / -2)) rotateY(0deg) rotateX(-5deg) rotate(10deg);
                animation: fin2 1500ms infinite alternate linear;
            }
        }

        @keyframes tail {
            to {
                transform: rotateX(45deg);
            }
        }

        @keyframes fin {
            100% {
                transform: translateZ(calc(var(--bodyW) / 2)) rotateY(10deg) rotateX(20deg) rotate(-10deg);
            }
        }

        @keyframes fin2 {
            100% {
                transform: translateZ(calc(var(--bodyW) / -2)) rotateY(-10deg) rotateX(-20deg) rotate(-10deg);
            }
        }

    }
}
</style>