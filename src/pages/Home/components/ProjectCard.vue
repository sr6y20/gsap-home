<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let timer: ReturnType<typeof setTimeout> | null = null;
let styleEl: HTMLStyleElement | null = null;

const updateStyle = (css: string) => {
    if (!styleEl) return;
    styleEl.textContent = css;
};

const handleMove = (e: MouseEvent | TouchEvent, card: HTMLElement) => {
    e.preventDefault();

    let l = 0, t = 0;
    if (e instanceof TouchEvent) {
        l = e.touches[0].clientX - card.getBoundingClientRect().left;
        t = e.touches[0].clientY - card.getBoundingClientRect().top;
    } else {
        l = e.offsetX;
        t = e.offsetY;
    }

    const w = card.offsetWidth;
    const h = card.offsetHeight;

    const px = Math.abs(Math.floor((100 / w) * l) - 100);
    const py = Math.abs(Math.floor((100 / h) * t) - 100);
    const pa = (50 - px) + (50 - py);
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const px_spark = 50 + (px - 50) / 7;
    const py_spark = 50 + (py - 50) / 7;
    const p_opc = 20 + Math.abs(pa) * 1.5;
    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;

    card.classList.remove('animated');
    card.style.transform = `rotateX(${ty}deg) rotateY(${tx}deg)`;

    const styleText = `
    .card:hover:before { background-position: ${lp}% ${tp}%; }
    .card:hover:after { background-position: ${px_spark}% ${py_spark}%; opacity: ${p_opc / 100}; }
  `;
    updateStyle(styleText);

    if (timer) clearTimeout(timer);
};

const handleLeave = (card: HTMLElement) => {
    updateStyle('');
    card.removeAttribute('style');
    timer = setTimeout(() => {
        card.classList.add('animated');
    }, 2500);
};

const bindCardEvents = () => {
    const cards = document.querySelectorAll<HTMLElement>('.card');

    cards.forEach(card => {
        const moveHandler = (e: Event) => handleMove(e as MouseEvent | TouchEvent, card);
        const leaveHandler = () => handleLeave(card);

        card.addEventListener('mousemove', moveHandler);
        card.addEventListener('touchmove', moveHandler, { passive: false });

        card.addEventListener('mouseout', leaveHandler);
        card.addEventListener('touchend', leaveHandler);
        card.addEventListener('touchcancel', leaveHandler);

        card.dataset.listeners = JSON.stringify({ moveHandler, leaveHandler });
    });
};

const unbindCardEvents = () => {
    const cards = document.querySelectorAll<HTMLElement>('.card');
    cards.forEach(card => {
        try {
            const { moveHandler, leaveHandler } = JSON.parse(card.dataset.listeners || '{}');
            card.removeEventListener('mousemove', moveHandler);
            card.removeEventListener('touchmove', moveHandler);
            card.removeEventListener('mouseout', leaveHandler);
            card.removeEventListener('touchend', leaveHandler);
            card.removeEventListener('touchcancel', leaveHandler);
        } catch (e) { }
    });
};

onMounted(() => {
    styleEl = document.createElement('style');
    document.head.appendChild(styleEl);

    gsap.to(".description", {
        scrollTrigger: {
            trigger: ".description",
            start: "top top",
            end: "+=200",
            pin: true,
            scrub: 0.5
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bindCardEvents();
                console.log('绑定事件')
            } else {
                unbindCardEvents();
                console.log('解绑事件')
            }
        });
    });
    observer.observe(document.querySelector('.description') as Element);
});
</script>


<template>
    <div class="description">
        <section class="cards">
            <div class="three-d-wrapper">
                <div class="card charizard animated">
                    <p style="text-align: center;margin: 10px 0;">法国火山口</p>
                    <v-img :width="220" cover :rounded="10" src="/layer-1.png"></v-img>
                    <p style="margin: 10px 0;">Design an impressive settings page with Vuetify Snippets, utilizing
                        Setting components for a polished and intuitive user experience.</p>
                </div>
            </div>
            <div class="three-d-wrapper">
                <div class="card pika animated" />
            </div>
            <div class="three-d-wrapper">
                <div class="card eevee animated" />
            </div>
            <div class="three-d-wrapper">
                <div class="card mewtwo animated" />
            </div>
        </section>

        <div class="gradient-bg">
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div class="gradients-container">
                <div class="g1"></div>
                <div class="g2"></div>
                <div class="g3"></div>
                <div class="g4"></div>
                <div class="g5"></div>
                <div class="interactive"></div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.description {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    min-height: 100vh;
}

.description {
    padding: 50px 0;
    --color-bg1: rgb(108, 0, 162);
    --color-bg2: rgb(0, 17, 82);
    --color1: 18, 113, 255;
    --color2: 221, 74, 255;
    --color3: 100, 220, 255;
    --color4: 200, 50, 50;
    --color5: 180, 180, 50;
    --color-interactive: 140, 100, 255;
    --circle-size: 80%;
    --blending: hard-light;

    @keyframes moveInCircle {
        0% {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(180deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes moveVertical {
        0% {
            transform: translateY(-50%);
        }

        50% {
            transform: translateY(50%);
        }

        100% {
            transform: translateY(-50%);
        }
    }

    @keyframes moveHorizontal {
        0% {
            transform: translateX(-50%) translateY(-10%);
        }

        50% {
            transform: translateX(50%) translateY(10%);
        }

        100% {
            transform: translateX(-50%) translateY(-10%);
        }
    }

    .gradient-bg {
        width: 100vw;
        height: 100%;
        position: absolute;
        overflow: hidden;
        background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
        top: 0;
        left: 0;

        svg {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
        }


        .gradients-container {
            filter: url(#goo) blur(40px);
            width: 100%;
            height: 100%;
        }

        .g1 {
            position: absolute;
            background: radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%) no-repeat;
            mix-blend-mode: var(--blending);

            width: var(--circle-size);
            height: var(--circle-size);
            top: calc(50% - var(--circle-size) / 2);
            left: calc(50% - var(--circle-size) / 2);

            transform-origin: center center;
            animation: moveVertical 30s ease infinite;

            opacity: 1;
        }

        .g2 {
            position: absolute;
            background: radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%) no-repeat;
            mix-blend-mode: var(--blending);

            width: var(--circle-size);
            height: var(--circle-size);
            top: calc(50% - var(--circle-size) / 2);
            left: calc(50% - var(--circle-size) / 2);

            transform-origin: calc(50% - 400px);
            animation: moveInCircle 20s reverse infinite;

            opacity: 1;
        }

        .g3 {
            position: absolute;
            background: radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%) no-repeat;
            mix-blend-mode: var(--blending);

            width: var(--circle-size);
            height: var(--circle-size);
            top: calc(50% - var(--circle-size) / 2 + 200px);
            left: calc(50% - var(--circle-size) / 2 - 500px);

            transform-origin: calc(50% + 400px);
            animation: moveInCircle 40s linear infinite;

            opacity: 1;
        }

        .g4 {
            position: absolute;
            background: radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%) no-repeat;
            mix-blend-mode: var(--blending);

            width: var(--circle-size);
            height: var(--circle-size);
            top: calc(50% - var(--circle-size) / 2);
            left: calc(50% - var(--circle-size) / 2);

            transform-origin: calc(50% - 200px);
            animation: moveHorizontal 40s ease infinite;

            opacity: 0.7;
        }

        .g5 {
            position: absolute;
            background: radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%) no-repeat;
            mix-blend-mode: var(--blending);

            width: calc(var(--circle-size) * 2);
            height: calc(var(--circle-size) * 2);
            top: calc(50% - var(--circle-size));
            left: calc(50% - var(--circle-size));

            transform-origin: calc(50% - 800px) calc(50% + 200px);
            animation: moveInCircle 20s ease infinite;

            opacity: 1;
        }

        .interactive {
            position: absolute;
            background: radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
            mix-blend-mode: var(--blending);

            width: 100%;
            height: 100%;
            top: -50%;
            left: -50%;

            opacity: 0.7;
        }
    }
}

.cards {
    --color1: rgb(0, 231, 255);
    --color2: rgb(255, 0, 231);
    --charizard1: #fac;
    --charizard2: #ddccaa;
    --pika1: #54a29e;
    --pika2: #a79d66;
    --eevee1: #efb2fb;
    --eevee2: #acc6f8;
    --mewtwo1: #efb2fb;
    --mewtwo2: #acc6f8;
}

.card {

    width: 71.5vw;
    height: 100vw;
    padding: 20px;

    // width: clamp(200px, 61vh, 18vw);
    // height: clamp(280px, 85vh, 25.2vw);
    @media screen and (min-width: 600px) {
        // width: 61vh;
        // height: 85vh;
        // max-width: 500px;
        // max-height: 700px;
        width: clamp(12.9vw, 61vh, 18vw);
        height: clamp(18vw, 85vh, 25.2vw);
    }

    position: relative;
    overflow: hidden;
    margin: 20px;
    overflow: hidden;
    z-index: 10;
    touch-action: none;
    isolation: isolate;

    border-radius: 5% / 3.5%;
    box-shadow: -5px -5px 5px -5px var(--color1),
    5px 5px 5px -5px var(--color2),
    -7px -7px 10px -5px transparent,
    7px 7px 10px -5px transparent,
    0 0 5px 0px rgba(255, 255, 255, 0),
    0 55px 35px -20px rgba(0, 0, 0, 0.5);

    transition: transform 0.5s ease,
    box-shadow 0.2s ease;
    will-change: transform,
    filter;

    background-color: #040712;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    transform-origin: center;

}

.card:hover {
    box-shadow:
        -20px -20px 30px -25px var(--color1),
        20px 20px 30px -25px var(--color2),
        -7px -7px 10px -5px var(--color1),
        7px 7px 10px -5px var(--color2),
        0 0 13px 4px rgba(255, 255, 255, 0.3),
        0 55px 35px -20px rgba(0, 0, 0, 0.5);
}

.card.charizard {
    --color1: var(--charizard1);
    --color2: var(--charizard2);
}

.card.pika {
    --color1: var(--pika1);
    --color2: var(--pika2);
}

.card.mewtwo {
    --color1: var(--mewtwo1);
    --color2: var(--mewtwo2);
}

.card.eevee {
    --color1: #ec9bb6;
    --color2: #ccac6f;
    --color3: #69e4a5;
    --color4: #8ec5d6;
    --color5: #b98cce;
}

.card:before,
.card:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-repeat: no-repeat;
    opacity: .5;
    mix-blend-mode: color-dodge;
    transition: all .33s ease;
}

.card:before {
    background-position: 50% 50%;
    background-size: 300% 300%;
    background-image: linear-gradient(115deg,
            transparent 0%,
            var(--color1) 25%,
            transparent 47%,
            transparent 53%,
            var(--color2) 75%,
            transparent 100%);
    opacity: .5;
    filter: brightness(.5) contrast(1);
    z-index: 1;
}

.card:after {
    background: #e4e4e4;
    opacity: 1;
    background-image: url("/sparkles.gif"),
        url(/holo.png),
        linear-gradient(125deg, #ff008450 15%, #fca40040 30%, #ffff0030 40%, #00ff8a20 60%, #00cfff40 70%, #cc4cfa50 85%);
    background-position: 50% 50%;
    background-size: 160%;
    background-blend-mode: overlay;
    z-index: 2;
    filter: brightness(1) contrast(1);
    transition: all .33s ease;
    mix-blend-mode: color-dodge;
    opacity: .75;
}

.card.active:after,
.card:hover:after {
    filter: brightness(1) contrast(1);
    ;
    opacity: 1;
}

.card.active,
.card:hover {
    animation: none;
    transition: box-shadow 0.1s ease-out;
}

.card.active:before,
.card:hover:before {
    animation: none;
    background-image: linear-gradient(110deg,
            transparent 25%,
            var(--color1) 48%,
            var(--color2) 52%,
            transparent 75%);
    background-position: 50% 50%;
    background-size: 250% 250%;
    opacity: .88;
    filter: brightness(.66) contrast(1.33);
    transition: none;
}

.card.active:before,
.card:hover:before,
.card.active:after,
.card:hover:after {
    animation: none;
    transition: none;
}

.card.animated {
    transition: none;
    animation: holoCard 12s ease 0s 1;

    &:before {
        transition: none;
        animation: holoGradient 12s ease 0s 1;
    }

    &:after {
        transition: none;
        animation: holoSparkle 12s ease 0s 1;
    }
}

@keyframes holoSparkle {

    0%,
    100% {
        opacity: .75;
        background-position: 50% 50%;
        filter: brightness(1.2) contrast(1.25);
    }

    5%,
    8% {
        opacity: 1;
        background-position: 40% 40%;
        filter: brightness(.8) contrast(1.2);
    }

    13%,
    16% {
        opacity: .5;
        background-position: 50% 50%;
        filter: brightness(1.2) contrast(.8);
    }

    35%,
    38% {
        opacity: 1;
        background-position: 60% 60%;
        filter: brightness(1) contrast(1);
    }

    55% {
        opacity: .33;
        background-position: 45% 45%;
        filter: brightness(1.2) contrast(1.25);
    }
}

@keyframes holoGradient {

    0%,
    100% {
        opacity: 0.5;
        background-position: 50% 50%;
        filter: brightness(.5) contrast(1);
    }

    5%,
    9% {
        background-position: 100% 100%;
        opacity: 1;
        filter: brightness(.75) contrast(1.25);
    }

    13%,
    17% {
        background-position: 0% 0%;
        opacity: .88;
    }

    35%,
    39% {
        background-position: 100% 100%;
        opacity: 1;
        filter: brightness(.5) contrast(1);
    }

    55% {
        background-position: 0% 0%;
        opacity: 1;
        filter: brightness(.75) contrast(1.25);
    }
}

@keyframes holoCard {

    0%,
    100% {
        transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
    }

    5%,
    8% {
        transform: rotateZ(0deg) rotateX(6deg) rotateY(-20deg);
    }

    13%,
    16% {
        transform: rotateZ(0deg) rotateX(-9deg) rotateY(32deg);
    }

    35%,
    38% {
        transform: rotateZ(3deg) rotateX(12deg) rotateY(20deg);
    }

    55% {
        transform: rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg);
    }
}

.card.eevee:hover {
    box-shadow:
        0 0 30px -5px white,
        0 0 10px -2px white,
        0 55px 35px -20px rgba(0, 0, 0, 0.5);
}

.card.eevee:hover:before,
.card.eevee.active:before {
    background-image: linear-gradient(115deg,
            transparent 20%,
            var(--color1) 36%,
            var(--color2) 43%,
            var(--color3) 50%,
            var(--color4) 57%,
            var(--color5) 64%,
            transparent 80%);
}

.cards .three-d-wrapper {
    perspective: 750px;
    isolation: isolate;
    transform: translate3d(0.1px, 0.1px, 0.1px)
}

.cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    z-index: 1;
}

@media screen and (min-width: 600px) {
    .cards {
        flex-direction: row;
    }
}

.cards .card {
    &:nth-child(2) {

        &,
        &:before,
        &:after {
            animation-delay: 0.25s;
        }
    }

    &:nth-child(3) {

        &,
        &:before,
        &:after {
            animation-delay: 0.5s;
        }
    }

    &:nth-child(4) {

        &,
        &:before,
        &:after {
            animation-delay: 0.75s;
        }
    }
}
</style>